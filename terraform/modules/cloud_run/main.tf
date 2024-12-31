/**
 * DO NOT EDIT Cloud Run params.
 * Cloud Run is handled by Terraform only for initial resource creation.
 * After that, it will be managed by helm and gcloud API.
 */
resource "google_cloud_run_v2_service" "bff" {
  project  = var.project_id
  name     = format("%s-%s", var.service_name, "bff")
  location = var.region

  template {
  }

  lifecycle {
    ignore_changes = [
      client,
      client_version,
      name,
      template,
      traffic,
    ]
  }
}

/**
 * DO NOT EDIT Cloud Run params.
 * Cloud Run is handled by Terraform only for initial resource creation.
 * After that, it will be managed by helm and gcloud API.
 */
resource "google_cloud_run_v2_service" "api" {
  project  = var.project_id
  name     = format("%s-%s", var.service_name, "api")
  location = var.region

  template {
  }

  lifecycle {
    ignore_changes = [
      client,
      client_version,
      name,
      template,
      traffic,
    ]
  }
}
