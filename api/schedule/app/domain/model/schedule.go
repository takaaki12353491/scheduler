package model

import (
	"time"

	"gorm.io/gorm"
)

type Schedule struct {
	ID          string `gorm:"primarykey"`
	UserID      string
	Title       string
	Date        time.Time
	Location    string
	Description string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

func NewSchedule(
	userID, title string, date time.Time, location, description string,
) *Schedule {
	schedule := &Schedule{
		ID:          generateID(),
		UserID:      userID,
		Title:       title,
		Date:        date,
		Location:    location,
		Description: description,
	}
	return schedule
}

func (schedule *Schedule) Update(
	title string, date time.Time, location string, description string,
) {
	schedule.Title = title
	schedule.Date = date
	schedule.Location = location
	schedule.Description = description
}

func (schedule *Schedule) IsOwner(userID string) bool {
	return schedule.UserID == userID
}
