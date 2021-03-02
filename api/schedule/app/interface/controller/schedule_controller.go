package controller

import (
	"context"
	"schedule/domain/model"
	"schedule/pb"
	"schedule/usecase"

	log "github.com/sirupsen/logrus"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ScheduleController struct {
	us usecase.ScheduleUsecase
}

func NewScheduleController(us usecase.ScheduleUsecase) *ScheduleController {
	return &ScheduleController{
		us: us,
	}
}

func (ctrl *ScheduleController) Index(ctx context.Context, req *pb.IndexRequest) (*pb.IndexResponse, error) {
	userID := getUserID(ctx)
	month := req.Month.AsTime()
	schedules, err := ctrl.us.Index(userID, month)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.IndexResponse{}
	for _, schedule := range schedules {
		res.Schedules = append(res.Schedules, ctrl.convert(&schedule))
	}
	return res, nil
}

func (ctrl *ScheduleController) Show(ctx context.Context, req *pb.ShowRequest) (*pb.ShowResponse, error) {
	schedule, err := ctrl.us.Show(req.Id)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.ShowResponse{
		Schedule: ctrl.convert(schedule),
	}
	return res, nil
}

func (ctrl *ScheduleController) Create(ctx context.Context, req *pb.CreateRequest) (*pb.CreateResponse, error) {
	userID := getUserID(ctx)
	schedule, err := ctrl.us.Create(userID, req.Title, req.Date.AsTime(), req.Location, req.Description)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.CreateResponse{
		Schedule: ctrl.convert(schedule),
	}
	return res, nil
}

func (ctrl *ScheduleController) Update(ctx context.Context, req *pb.UpdateRequest) (*pb.UpdateResponse, error) {
	userID := getUserID(ctx)
	schedule, err := ctrl.us.Update(req.Id, userID, req.Title, req.Date.AsTime(), req.Location, req.Description)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.UpdateResponse{
		Schedule: ctrl.convert(schedule),
	}
	return res, nil
}

func (ctrl *ScheduleController) Delete(ctx context.Context, req *pb.DeleteRequest) (*pb.DeleteResponse, error) {
	userID := getUserID(ctx)
	err := ctrl.us.Delete(req.Id, userID)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.DeleteResponse{}
	return res, nil
}

func (s *ScheduleController) convert(schedule *model.Schedule) *pb.Schedule {
	return &pb.Schedule{
		Id:          schedule.ID,
		UserId:      schedule.UserID,
		Title:       schedule.Title,
		Date:        timestamppb.New(schedule.Date),
		Location:    schedule.Location,
		Description: schedule.Description,
	}
}
