package schedule

import (
	"context"
	"server/pb"
)

type Server struct {
	pb.UnimplementedScheduleServiceServer
}

func (s *Server) Index(ctx context.Context, r *pb.IndexRequest) (*pb.IndexResponse, error) {
	return nil, nil
}

func (s *Server) Show(ctx context.Context, r *pb.ShowRequest) (*pb.IndexResponse, error) {
	return nil, nil
}

func (s *Server) Create(ctx context.Context, r *pb.CreateRequest) (*pb.CreateResponse, error) {
	return nil, nil
}

func (s *Server) Update(ctx context.Context, r *pb.CreateRequest) (*pb.CreateResponse, error) {
	return nil, nil
}

func (s *Server) Delete(ctx context.Context, r *pb.DeleteRequest) (*pb.DeleteResponse, error) {
	return nil, nil
}
