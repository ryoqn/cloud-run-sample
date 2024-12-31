output "bff_service_name" {
  value = google_cloud_run_v2_service.bff.name
}

output "bff_location" {
  value = google_cloud_run_v2_service.bff.location
}

output "api_service_name" {
  value = google_cloud_run_v2_service.api.name
}

output "api_location" {
  value = google_cloud_run_v2_service.api.location
}
