output "service_name" {
  value = google_cloud_run_v2_service.default.name
}

output "location" {
  value = google_cloud_run_v2_service.default.location
}
