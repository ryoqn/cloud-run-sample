resource "google_firebase_hosting_site" "static_contents" {
  provider = google-beta
  project  = var.project_id
  site_id  = var.site_id
}

resource "google_firebase_hosting_version" "static_contents" {
  provider = google-beta
  site_id  = var.site_id
}

resource "google_firebase_hosting_release" "static_contents" {
  provider     = google-beta
  site_id      = google_firebase_hosting_site.static_contents.site_id
  version_name = google_firebase_hosting_version.static_contents.name
  message      = "Cloud Run Integration"
}

