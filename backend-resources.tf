resource "google_artifact_registry_repository" "backend_repo" {
  location      = var.region
  repository_id = "backend-repo"
  description   = "Docker repository for Backend"
  format        = "DOCKER"
}

resource "google_cloud_run_service" "backend" {
  name     = "todo-backend"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.backend_repo.repository_id}/api:latest"
        
        ports {
          container_port = 8080
        }
        
        # Environment variable standard
        env {
            name = "ALLOWED_ORIGIN"
            value = "*" 
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  
}

resource "google_cloud_run_service_iam_member" "backend_public" {
  service  = google_cloud_run_service.backend.name
  location = google_cloud_run_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}