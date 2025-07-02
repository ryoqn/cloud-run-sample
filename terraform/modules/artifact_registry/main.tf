resource "google_artifact_registry_repository" "bff_repo" {
  location      = var.region
  repository_id = format("%s-%s", var.service_name, "bff")
  description   = "Docker repository for BFF service"
  format        = "DOCKER"
}

resource "google_artifact_registry_repository" "api_repo" {
  location      = var.region
  repository_id = format("%s-%s", var.service_name, "api")
  description   = "Docker repository for API service"
  format        = "DOCKER"
}
