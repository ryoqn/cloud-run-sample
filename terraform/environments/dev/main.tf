locals {
  location     = var.region
  service_name = var.service_name
}

module "artifact_registry" {
  source = "../../modules/artifact_registry"

  service_name = local.service_name
  region       = "asia-northeast2"
}

module "cloud_run" {
  source = "../../modules/cloud_run"

  service_name = local.service_name
  region       = "asia-northeast2"
  project_id   = var.project_id
}

module "cloud_build" {
  source                            = "../../modules/cloud_build"
  region                            = local.location
  project_id                        = var.project_id
  project_number                    = var.project_number
  cloud_build_service_account_id    = module.iam.cloud_build_service_account_id
  github_app_installation_id        = var.github_app_installation_id
  github_oauth_token_secret_version = var.github_oauth_token_secret_version
  github_repository_remote_uri      = var.github_repository_remote_uri
  trigger_branch                    = "^main$"
  build_trigger_filename            = "cloudbuild.yaml"
  artifact_repository_image_name    = "${local.location}-docker.pkg.dev/${var.project_id}/${local.service_name}"
  firebase_project_id               = var.firebase_project_id
  firebase_api_key                  = var.firebase_api_key
  firebase_auth_domain              = var.firebase_auth_domain
  firebase_storage_bucket           = var.firebase_storage_bucket
  firebase_messaging_sender_id      = var.firebase_messaging_sender_id
  firebase_app_id                   = var.firebase_app_id
  firebase_measurement_id           = var.firebase_measurement_id
  api_server_url                    = var.api_server_url
}

module "firebase_hosting" {
  source       = "../../modules/firebase_hosting"
  project_id   = var.project_id
  site_id      = var.project_id
  service_name = module.cloud_run.bff_service_name
  region       = module.cloud_run.bff_location
}

module "iam" {
  source         = "../../modules/iam"
  project_id     = var.project_id
  project_number = var.project_number
}
