package infra

import (
	"schedule/domain/model"
	"schedule/domain/repository"
	"time"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ScheduleRepository struct {
	db *gorm.DB
}

func NewScheduleRepository() repository.ScheduleRepository {
	return &ScheduleRepository{NewConnection(
		WithDBName("schedule"),
	)}
}

func (repo *ScheduleRepository) FindList(userID string, month *time.Time) ([]model.Schedule, error) {
	//TODO
	start := time.Date(month.Year(), month.Month(), 1, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 1, -1)
	schedules := []model.Schedule{}
	err := repo.db.Where("userID = ? AND date BETWEEN ? AND ?", userID, start.String(), end.String()).Find(&schedules).Error
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedules, nil
}

func (repo *ScheduleRepository) FindByID(id string) (*model.Schedule, error) {
	schedule := &model.Schedule{}
	schedule.ID = id
	err := repo.db.First(schedule).Error
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (repo *ScheduleRepository) Store(schedule *model.Schedule) error {
	err := repo.db.Create(schedule).Error
	if err != nil {
		log.Error(err)
		return err
	}
	return nil
}

func (repo *ScheduleRepository) Update(schedule *model.Schedule) error {
	err := repo.db.Save(schedule).Error
	if err != nil {
		log.Error(err)
		return err
	}
	return nil
}

func (repo *ScheduleRepository) Delete(schedule *model.Schedule) {
	repo.db.Delete(schedule)
}
