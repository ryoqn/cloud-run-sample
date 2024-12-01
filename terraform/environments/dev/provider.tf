provider "google" {
  default_labels = {
    service-name = local.service_name
  }
  project = var.project_id
  region  = local.location
}
provider "google-beta" {
  project = var.project_id
  region  = local.location
}

terraform {
  required_version = "1.9.5"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.42.0"
    }
  }
  cloud {
    organization = "ryoqn-company"
    workspaces {
      name = "cloud-run-sample"
    }
  }
}
