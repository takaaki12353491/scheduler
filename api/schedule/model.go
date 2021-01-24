package main

import (
	"api/module"
	"api/pb"
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type Schedule struct {
	module.Model
	UserID      string
	Title       string
	Date        time.Time
	Location    string
	Description string
}

func NewSchedule(
	userID string, title string, date time.Time, location string, description string,
) *Schedule {
	schedule := &Schedule{
		UserID:      userID,
		Title:       title,
		Date:        date,
		Location:    location,
		Description: description,
	}
	schedule.ID = module.GenerateID()
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

func (schedule *Schedule) ToPB() *pb.Schedule {
	return &pb.Schedule{
		Id:          schedule.ID,
		UserId:      schedule.UserID,
		Title:       schedule.Title,
		Date:        timestamppb.New(schedule.Date),
		Location:    schedule.Location,
		Description: schedule.Description,
	}
}
