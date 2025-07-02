package handlers

import (
	"fmt"
	"net/http"
	"time"
)

type HealthHandler struct {
	StartTime time.Time
}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{
		StartTime: time.Now(),
	}
}

func (h *HealthHandler) Check(w http.ResponseWriter, r *http.Request) {
	uptime := time.Since(h.StartTime).String()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, `{"status":"OK","uptime":"%s"}`, uptime)
}
