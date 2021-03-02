package repository

import (
	"schedule/domain/model"
	"time"
)

type ScheduleRepository interface {
	FindList(userID string, month *time.Time) ([]model.Schedule, error)
	FindByID(id string) (*model.Schedule, error)
	Store(schedule *model.Schedule) error
	Update(schedule *model.Schedule) error
	Delete(schedule *model.Schedule)
}
