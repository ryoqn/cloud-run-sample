variable "region" {
  description = "The region to deploy resources"
  type        = string
  default     = "asia-northeast2"
}

variable "project_id" {
  type        = string
  description = "The ID of the Google Cloud project"
}

variable "project_number" {
  type        = string
  description = "The number of the Google Cloud project"
}

variable "cloud_build_service_account_id" {
  description = "The id of the Cloud Build service account"
  type        = string
}

variable "github_app_installation_id" {
  description = "The GitHub App installation ID"
  type        = string
}

variable "github_oauth_token_secret_version" {
  description = "The version of the secret containing the GitHub OAuth token"
  type        = string
}

variable "github_repository_remote_uri" {
  description = "The URI of the GitHub repository"
  type        = string
}

variable "trigger_branch" {
  description = "The branch to trigger the build"
  type        = string
}

variable "build_trigger_filename" {
  description = "The filename of the Cloud Build trigger"
  type        = string
  default     = "cloudbuild.yaml"
}

variable "artifact_repository_image_name" {
  description = "The name of the artifact repository image"
  type        = string
}

variable "firebase_project_id" {
  description = "The ID of the Firebase project"
  type        = string
}

variable "firebase_api_key" {
  description = "The Firebase API key"
  type        = string
}

variable "firebase_auth_domain" {
  description = "The Firebase auth domain"
  type        = string
}

variable "firebase_storage_bucket" {
  description = "The Firebase storage bucket"
  type        = string
}

variable "firebase_messaging_sender_id" {
  description = "The Firebase messaging sender ID"
  type        = string
}

variable "firebase_app_id" {
  description = "The Firebase app ID"
  type        = string
}

variable "firebase_measurement_id" {
  description = "The Firebase measurement ID"
  type        = string
}

variable "api_server_url" {
  description = "The URL of the API server"
  type        = string
}
