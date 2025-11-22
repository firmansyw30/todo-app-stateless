resource "google_artifact_registry_repository" "frontend_repo" {
  location      = var.region
  repository_id = "frontend-repo"
  description   = "Docker repository for Frontend"
  format        = "DOCKER"
}

resource "google_cloud_run_service" "frontend" {
  name     = "todo-frontend"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.frontend_repo.repository_id}/web:latest"

        ports {
          container_port = 8080
        }

        # Inject Backend URL automatically
        env {
          name  = "BACKEND_URL"
          value = google_cloud_run_service.backend.status[0].url
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Frontend must wait for Backend to be ready
  depends_on = [google_cloud_run_service.backend]
}

# To make frontend publicly accessible
resource "google_cloud_run_service_iam_member" "frontend_public" {
  service  = google_cloud_run_service.frontend.name
  location = google_cloud_run_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}