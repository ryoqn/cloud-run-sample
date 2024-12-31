variable "project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
}

variable "project_number" {
  description = "The number of the Google Cloud project"
  type        = string
}

variable "region" {
  description = "The region to deploy resources to"
  type        = string
  default     = "asia-northeast2"
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "app_url" {
  description = "The URL of the Cloud Run service"
  type        = string
  default     = "localhost:3000"
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

variable "firebase_project_id" {
  description = "The ID of the Firebase project"
  type        = string
}
