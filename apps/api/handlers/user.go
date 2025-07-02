package handlers

import (
	"encoding/json"
	"net/http"
)

// UserHandler は、ユーザー関連のリクエストを処理するハンドラーです
type UserHandler struct{}

// NewUserHandler は、新しいUserHandlerインスタンスを作成します
func NewUserHandler() *UserHandler {
	return &UserHandler{}
}

// Get は、ユーザー情報を取得するハンドラーです
func (h *UserHandler) Get(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// サンプルのユーザーデータ
	user := map[string]interface{}{
		"id":          "1",
		"name":        "サンプル",
		"description": "サンプルの説明",
		"createdAt":   "2025-01-01T00:00:00Z",
		"updatedAt":   "2025-01-02T00:00:00Z",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

// List は、ユーザー一覧を取得するハンドラーです
func (h *UserHandler) List(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// サンプルのユーザーリスト
	users := []map[string]interface{}{
		{
			"id":         "1",
			"name":       "サンプルユーザー1",
			"email":      "sample1@example.com",
			"created_at": "2025-01-01T00:00:00Z",
		},
		{
			"id":         "2",
			"name":       "サンプルユーザー2",
			"email":      "sample2@example.com",
			"created_at": "2025-01-02T00:00:00Z",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}
