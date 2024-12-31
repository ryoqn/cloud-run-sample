resource "google_service_account" "cloudbuild_service_account" {
  account_id   = "cloud-build"
  display_name = "Cloud Build service account"
  description  = "Service account for Cloud Build"
}

resource "google_project_iam_custom_role" "cloud_build_custom_role" {
  role_id     = "cloudBuildCustomRole"
  title       = "Cloud Build Custom Role"
  description = "Custom role for Cloud Build"
  permissions = ["serviceusage.services.use", "storage.buckets.get", "storage.buckets.list", "storage.objects.create"]
}

resource "google_project_iam_member" "cloudbuild_builtin_iam" {
  for_each = toset([
    "roles/run.admin",
    "roles/cloudbuild.builds.builder",
    "roles/firebasehosting.admin",
  ])
  role    = each.key
  member  = "serviceAccount:${google_service_account.cloudbuild_service_account.email}"
  project = var.project_id
}

resource "google_project_iam_member" "cloudbuild_custom_iam" {
  role    = google_project_iam_custom_role.cloud_build_custom_role.id
  member  = "serviceAccount:${google_service_account.cloudbuild_service_account.email}"
  project = var.project_id
}

resource "google_service_account_iam_member" "cloudbuild_compute_user" {
  ## This is the default service account for Compute Engine
  ## TODO: Create a custom service account and grant permissions to that service account
  service_account_id = "projects/${var.project_id}/serviceAccounts/${var.project_number}-compute@developer.gserviceaccount.com"
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.cloudbuild_service_account.email}"
}
