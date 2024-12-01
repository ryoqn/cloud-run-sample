/**
 * DO NOT EDIT Cloud Run params.
 * Cloud Run is handled by Terraform only for initial resource creation.
 * After that, it will be managed by helm and gcloud API.
 */
resource "google_cloud_run_v2_service" "default" {
  project  = var.project_id
  name     = var.service_name
  location = var.region

  template {
  }

  lifecycle {
    ignore_changes = [
      name,
      template,
      traffic,
    ]
  }
}
