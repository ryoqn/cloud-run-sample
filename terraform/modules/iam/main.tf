resource "google_service_account" "cloudrun_service_account" {
  account_id   = "cloud-run"
  display_name = "Cloud Run service account"
  description  = "Service account for Cloud Run"
}

resource "google_project_iam_member" "cloudrun_iam" {
  for_each = toset([
    "roles/run.admin",
    "roles/logging.logWriter",
    "roles/firebase.sdkAdminServiceAgent",
  ])
  role    = each.key
  member  = "serviceAccount:${google_service_account.cloudrun_service_account.email}"
  project = var.project_id
}

resource "google_service_account" "cloudbuild_service_account" {
  account_id   = "cloud-build"
  display_name = "Cloud Build service account"
  description  = "Service account for Cloud Build"
}

resource "google_project_iam_custom_role" "cloud_build_custom_role" {
  role_id     = "cloudBuildCustomRole"
  title       = "Cloud Build Custom Role"
  description = "Custom role for Cloud Build"
  permissions = ["iam.serviceAccounts.actAs", "serviceusage.services.use", "storage.buckets.get", "storage.buckets.list", "storage.objects.create"]
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
