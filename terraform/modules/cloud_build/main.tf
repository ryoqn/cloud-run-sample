resource "google_cloudbuildv2_connection" "github_connection" {
  location = var.region
  name     = "github-connection"

  github_config {
    app_installation_id = var.github_app_installation_id
    authorizer_credential {
      oauth_token_secret_version = var.github_oauth_token_secret_version
    }
  }
}

resource "google_cloudbuildv2_repository" "github_repository" {
  name              = "github-repository"
  parent_connection = google_cloudbuildv2_connection.github_connection.id
  remote_uri        = var.github_repository_remote_uri
}

resource "google_cloudbuild_trigger" "build_trigger" {
  location = var.region
  repository_event_config {
    repository = google_cloudbuildv2_repository.github_repository.id
    push {
      branch = var.trigger_branch
    }
  }
  filename = var.build_trigger_filename

  service_account = var.cloud_build_service_account_id

  substitutions = {
    _FIREBASE_PROJECT_ID = var.firebase_project_id
  }
}
