output "bucket_name" {
  description = "The name of the bucket"
  value       = google_storage_bucket.static_contents.name
}

output "bucket_url" {
  description = "The URL of the bucket"
  value       = "https://storage.googleapis.com/${google_storage_bucket.static_contents.name}"
}
