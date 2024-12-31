resource "google_artifact_registry_repository" "bff_repo" {
  location      = var.region
  repository_id = format("%s-%s", var.service_name, "bff")
  description   = "Docker repository for BFF service"
  format        = "DOCKER"
}
