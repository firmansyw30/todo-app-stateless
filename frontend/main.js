const BACKEND_URL = window.env?.BACKEND_URL || "http://localhost:8080";

console.log("Connecting to Backend:", BACKEND_URL);

const api = (path) => (BACKEND_URL.replace(/\/$/, "") + path);

const $list = document.getElementById("list");
const $form = document.getElementById("addForm");
const $title = document.getElementById("title");

async function fetchTodos() {
  try {
    const res = await fetch(api("/todos"));
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();
    render(data);
  } catch (e) {
    console.error("fetchTodos error:", e);
    $list.innerHTML = `<div class="error-msg">Gagal memuat data: ${escapeHtml(e.message)}.<br>Pastikan Backend URL (${BACKEND_URL}) benar.</div>`;
  }
}

function render(todos) {
  if (!Array.isArray(todos) || todos.length === 0) {
    $list.innerHTML = `<div class="empty-state">Belum ada tugas. Tambahkan satu di atas!</div>`;
    return;
  }
  
  $list.innerHTML = todos.map(t => `
    <div class="todo ${t.completed ? "completed" : ""}" data-id="${t.id}">
      <input type="checkbox" ${t.completed ? "checked" : ""} data-action="toggle" />
      <div class="title">${escapeHtml(t.title)}</div>
      <button class="delete-btn" data-action="del">✕</button>
    </div>
  `).join("");
}

function escapeHtml(s) {
  return String(s).replaceAll(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// Event Delegation
$list.addEventListener("click", async (ev) => {
  const el = ev.target;
  const row = el.closest(".todo");
  if (!row) return;
  const id = row.dataset.id;

  if (el.dataset.action === "del") {
    row.remove();
    try {
      await fetch(api(`/todos/${id}`), { method: "DELETE" });
    } catch (e) {
      console.error("delete error", e);
      fetchTodos(); // Rollback/Refresh
    }
    if($list.children.length === 0) render([]); // Show empty state
  }
});

$list.addEventListener("change", async (ev) => {
  const cb = ev.target;
  const row = cb.closest(".todo");
  if (!row || cb.dataset.action !== "toggle") return;
  
  const id = row.dataset.id;
  
  // UI Feedback
  row.classList.toggle("completed", cb.checked);

  try {
    await fetch(api(`/todos/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: cb.checked })
    });
  } catch (e) {
    console.error("toggle error", e);
    fetchTodos(); // Revert on error
  }
});

$form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const v = $title.value.trim();
  if (!v) return;

  const originalText = $title.value;
  $title.value = ""; // Clear input
  
  try {
    const res = await fetch(api("/todos"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: v })
    });
    if (!res.ok) throw new Error("Failed to add");
    
    // Refresh list
    await fetchTodos();
  } catch (e) {
    console.error("post error", e);
    $title.value = originalText; 
    alert("Gagal menambah todo");
  }
});

document.addEventListener('DOMContentLoaded', fetchTodos);