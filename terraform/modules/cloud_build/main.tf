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
    _FIREBASE_PROJECT_ID                      = var.firebase_project_id
    _NEXT_PUBLIC_FIREBASE_API_KEY             = var.firebase_api_key
    _NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN         = var.firebase_auth_domain
    _NEXT_PUBLIC_FIREBASE_PROJECT_ID          = var.firebase_project_id
    _NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET      = var.firebase_storage_bucket
    _NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = var.firebase_messaging_sender_id
    _NEXT_PUBLIC_FIREBASE_APP_ID              = var.firebase_app_id
    _NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID      = var.firebase_measurement_id
    _API_SERVER_URL                           = var.api_server_url
  }
}
