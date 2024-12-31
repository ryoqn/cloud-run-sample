resource "google_storage_bucket" "static_contents" {
  name          = var.bucket_name
  location      = var.location
  force_destroy = var.force_destroy

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  uniform_bucket_level_access = true

  cors {
    origin          = var.cors_origins
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_member" "public_read" {
  bucket = google_storage_bucket.static_contents.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}
