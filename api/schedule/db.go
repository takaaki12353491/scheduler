package main

import (
	"api/module"
	"time"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func NewDB() *Repository {
	return &Repository{module.NewConnection(
		module.WithDBName("schedule"),
	)}
}

func (repo *Repository) FindList(month *time.Time) ([]Schedule, error) {
	start := time.Date(month.Year(), month.Month(), 1, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 1, -1)
	schedules := []Schedule{}
	err := repo.db.Where("date BETWEEN ? AND ?", start.String(), end.String()).Find(&schedules).Error
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedules, nil
}

func (repo *Repository) FindByID(id string) (*Schedule, error) {
	schedule := &Schedule{}
	schedule.ID = id
	err := repo.db.First(schedule).Error
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (repo *Repository) Store(schedule *Schedule) error {
	err := repo.db.Create(schedule).Error
	if err != nil {
		log.Error(err)
		return err
	}
	return nil
}

func (repo *Repository) Update(schedule *Schedule) error {
	err := repo.db.Save(schedule).Error
	if err != nil {
		log.Error(err)
		return err
	}
	return nil
}

func (repo *Repository) Delete(schedule *Schedule) {
	repo.db.Delete(schedule)
}
