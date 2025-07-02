package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ryoqn/cloud-run-sample-api/config"
	"github.com/ryoqn/cloud-run-sample-api/handlers"
)

func main() {
	// 設定の読み込み
	cfg := config.NewConfig()

	// サーバーの設定
	mux := http.NewServeMux()

	// ハンドラーの初期化
	healthHandler := handlers.NewHealthHandler()
	userHandler := handlers.NewUserHandler()

	// ルートの設定
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API server is running!"))
	})

	// エンドポイントの登録
	mux.HandleFunc("/health", healthHandler.Check)
	mux.HandleFunc("/api/sample/", userHandler.Get)

	// サーバーの作成
	server := &http.Server{
		Addr:         ":" + cfg.Server.Port,
		Handler:      mux,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
		IdleTimeout:  cfg.Server.IdleTimeout,
	}

	// グレースフルシャットダウンの設定
	done := make(chan bool, 1)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-quit
		log.Println("Server is shutting down...")

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		server.SetKeepAlivesEnabled(false)
		if err := server.Shutdown(ctx); err != nil {
			log.Fatalf("Could not gracefully shutdown the server: %v", err)
		}
		close(done)
	}()

	// サーバー起動
	log.Printf("Server starting on port %s", cfg.Server.Port)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Could not listen on %s: %v", cfg.Server.Port, err)
	}

	<-done
	log.Println("Server stopped")
}
