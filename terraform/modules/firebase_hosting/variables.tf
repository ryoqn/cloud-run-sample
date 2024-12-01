variable "project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
}

variable "site_id" {
  description = "The ID of the Firebase Hosting site"
  type        = string
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "region" {
  description = "The region of the Cloud Run service"
  type        = string
  default     = "asia-northeast2"
}
