package main

import (
	"api/module"
	"api/pb"
	"context"

	log "github.com/sirupsen/logrus"
	"golang.org/x/xerrors"
)

type Server struct {
	pb.UnimplementedScheduleServiceServer
	repo *Repository
}

func NewServer(repo *Repository) *Server {
	return &Server{
		repo: repo,
	}
}

func (s *Server) Index(ctx context.Context, req *pb.IndexRequest) (*pb.IndexResponse, error) {
	month := req.Month.AsTime()
	schedules, err := s.repo.FindList(&month)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.IndexResponse{}
	for _, schedule := range schedules {
		res.Schedules = append(res.Schedules, schedule.ToPB())
	}
	return res, nil
}

func (s *Server) Show(ctx context.Context, req *pb.ShowRequest) (*pb.ShowResponse, error) {
	schedule, err := s.repo.FindByID(req.Id)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.ShowResponse{
		Schedule: schedule.ToPB(),
	}
	return res, nil
}

func (s *Server) Create(ctx context.Context, req *pb.CreateRequest) (*pb.CreateResponse, error) {
	userID := module.GetUserID(ctx)
	schedule := NewSchedule(
		userID, req.Title, req.Date.AsTime(), req.Location, req.Description,
	)
	err := s.repo.Store(schedule)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.CreateResponse{
		Schedule: schedule.ToPB(),
	}
	return res, nil
}

func (s *Server) Update(ctx context.Context, req *pb.UpdateRequest) (*pb.UpdateResponse, error) {
	userID := module.GetUserID(ctx)
	schedule, err := s.repo.FindByID(req.Id)
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
		req.Title, req.Date.AsTime(), req.Location, req.Description,
	)
	err = s.repo.Update(schedule)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	res := &pb.UpdateResponse{
		Schedule: schedule.ToPB(),
	}
	return res, nil
}

func (s *Server) Delete(ctx context.Context, req *pb.DeleteRequest) (*pb.DeleteResponse, error) {
	userID := module.GetUserID(ctx)
	schedule, err := s.repo.FindByID(req.Id)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	if !schedule.IsOwner(userID) {
		err := xerrors.New("The user is not owner")
		log.Error(err)
		return nil, err
	}
	s.repo.Delete(schedule)
	res := &pb.DeleteResponse{}
	return res, nil
}
