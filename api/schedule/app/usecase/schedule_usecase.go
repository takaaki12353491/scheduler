package usecase

import (
	"schedule/domain/model"
	"schedule/domain/repository"
	"time"

	log "github.com/sirupsen/logrus"
	"golang.org/x/xerrors"
)

type ScheduleUsecase interface {
	Index(userID string, month time.Time) ([]model.Schedule, error)
	Show(id string) (*model.Schedule, error)
	Create(userID, title string, time time.Time, location, description string) (*model.Schedule, error)
	Update(id, userID, title string, time time.Time, location, description string) (*model.Schedule, error)
	Delete(id, userID string) error
}

type scheduleUsecase struct {
	scheduleRepository repository.ScheduleRepository
}

func NewScheduleUsecase(scheduleRepository repository.ScheduleRepository) ScheduleUsecase {
	return &scheduleUsecase{
		scheduleRepository: scheduleRepository,
	}
}

func (us scheduleUsecase) Index(userID string, month time.Time) ([]model.Schedule, error) {
	schedules, err := us.scheduleRepository.FindList(userID, &month)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedules, nil
}

func (us *scheduleUsecase) Show(id string) (*model.Schedule, error) {
	schedule, err := us.scheduleRepository.FindByID(id)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (us *scheduleUsecase) Create(userID, title string, time time.Time, location, description string) (*model.Schedule, error) {
	schedule := model.NewSchedule(
		userID, title, time, location, description,
	)
	err := us.scheduleRepository.Store(schedule)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (us *scheduleUsecase) Update(id, userID, title string, time time.Time, location, description string) (*model.Schedule, error) {
	schedule, err := us.scheduleRepository.FindByID(id)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	if !schedule.IsOwner(userID) {
		err := xerrors.New("The user is not owner")
		log.Error(err)
		return nil, err
	}
	schedule.Update(
		title, time, location, description,
	)
	err = us.scheduleRepository.Update(schedule)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (us *scheduleUsecase) Delete(id, userID string) error {
	schedule, err := us.scheduleRepository.FindByID(id)
	if err != nil {
		log.Error(err)
		return err
	}
	if !schedule.IsOwner(userID) {
		err := xerrors.New("The user is not owner")
		log.Error(err)
		return err
	}
	us.scheduleRepository.Delete(schedule)
	return nil
}
