package main

import (
	"time"

	"gorm.io/gorm"
)

type Model struct {
	ID        string `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type Schedule struct {
	Model
	UserID      string
	Title       string
	Date        time.Time
	Location    string
	Description string
}
