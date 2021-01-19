package main

import (
	"os"
	"strings"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type ScheduleDB struct {
	*gorm.DB
}

func NewScheduleDB() *ScheduleDB {
	user := os.Getenv("SCHEDULER_MYSQL_USER")
	pass := os.Getenv("SCHEDULER_MYSQL_PASSWORD")
	host := "localhost"
	port := "3306"
	dbName := os.Getenv("SCHEDULER_MYSQL_DATABASE")
	option := "?parseTime=true&loc=Asia%2FTokyo"
	dsn := strings.Join([]string{
		user, ":", pass, "@", "tcp", "(", host, ":", port, ")", "/", dbName, option,
	}, "")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Panicln(err)
	}
	return &ScheduleDB{db}
}

func (db *ScheduleDB) FindByID(id string) (*Schedule, error) {
	schedule := new(Schedule)
	schedule.ID = id
	err := db.First(schedule).Error
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (db *ScheduleDB) Store(schedule *Schedule) error {
	err := db.Create(schedule).Error
	if err != nil {
		log.Error(err)
		return err
	}
	return nil
}

func (db *ScheduleDB) Update(schedule *Schedule) error {
	err := db.Save(schedule).Error
	if err != nil {
		log.Error(err)
		return err
	}
	return nil
}
