variable "region" {
  description = "The region to deploy resources"
  type        = string
  default     = "asia-northeast2"
}

variable "service_name" {
  type        = string
  description = "The name of the Cloud Run service"
}
