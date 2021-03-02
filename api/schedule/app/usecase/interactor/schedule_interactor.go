package interactor

import (
	"api/domain/model"
	"api/module"
	"api/pb"
	"api/usecase/repository"
	"context"
	"time"

	log "github.com/sirupsen/logrus"
	"golang.org/x/xerrors"
)

type ScheduleInteractor struct {
	scheduleRepository repository.ScheduleRepository
}

func NewScheduleInteractor(scheduleRepository repository.ScheduleRepository) *ScheduleInteractor {
	return &ScheduleInteractor{
		scheduleRepository: scheduleRepository,
	}
}

func (it *ScheduleInteractor) Index(userID string, month time.Time) ([]model.Schedule, error) {
	schedules, err := it.scheduleRepository.FindList(userID, &month)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedules, nil
}

func (it *ScheduleInteractor) Show(id string) (*model.Schedule, error) {
	schedule, err := it.scheduleRepository.FindByID(id)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (it *ScheduleInteractor) Create(userID, title string, time time.Time, location, description string) (*model.Schedule, error) {
	schedule := model.NewSchedule(
		userID, title, time, location, description,
	)
	err := it.scheduleRepository.Store(schedule)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (it *ScheduleInteractor) Update(id, userID, title string, time time.Time, location, description string) (*model.Schedule, error) {
	schedule, err := it.scheduleRepository.FindByID(id)
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
	err = it.scheduleRepository.Update(schedule)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return schedule, nil
}

func (it *ScheduleInteractor) Delete(ctx context.Context, req *pb.DeleteRequest) (*pb.DeleteResponse, error) {
	userID := module.GetUserID(ctx)
	schedule, err := it.scheduleRepository.FindByID(req.Id)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	if !schedule.IsOwner(userID) {
		err := xerrors.New("The user is not owner")
		log.Error(err)
		return nil, err
	}
	it.scheduleRepository.Delete(schedule)
	res := &pb.DeleteResponse{}
	return res, nil
}
