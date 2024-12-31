variable "bucket_name" {
  description = "The name of the Google Cloud Storage bucket"
  type        = string
}

variable "location" {
  description = "The location of the bucket"
  type        = string
  default     = "US"
}

variable "force_destroy" {
  description = "When deleting a bucket, this boolean option will delete all contained objects"
  type        = bool
  default     = false
}

variable "cors_origins" {
  description = "List of origins for CORS configuration"
  type        = list(string)
  default     = ["*"]
}