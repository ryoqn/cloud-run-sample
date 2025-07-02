package config

import (
	"os"
	"strconv"
	"time"
)

type Config struct {
	Server struct {
		Port         string
		ReadTimeout  time.Duration
		WriteTimeout time.Duration
		IdleTimeout  time.Duration
	}
	Environment string
}

func NewConfig() *Config {
	cfg := &Config{}

	// サーバー設定
	cfg.Server.Port = getEnv("PORT", "8000")
	cfg.Server.ReadTimeout = getDurationEnv("SERVER_READ_TIMEOUT", 5*time.Second)
	cfg.Server.WriteTimeout = getDurationEnv("SERVER_WRITE_TIMEOUT", 10*time.Second)
	cfg.Server.IdleTimeout = getDurationEnv("SERVER_IDLE_TIMEOUT", 60*time.Second)

	// 環境設定
	cfg.Environment = getEnv("ENVIRONMENT", "development")

	return cfg
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func getDurationEnv(key string, defaultValue time.Duration) time.Duration {
	if value, exists := os.LookupEnv(key); exists {
		if intVal, err := strconv.Atoi(value); err == nil {
			return time.Duration(intVal) * time.Second
		}
	}
	return defaultValue
}
