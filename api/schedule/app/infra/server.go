package infra

import (
	"log"
	"net"
	"schedule/interface/controller"
	"schedule/pb"
	"schedule/usecase"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func NewServer() {
	lis, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_auth.UnaryServerInterceptor(AuthFunc),
		),
	)
	scheduleController := controller.NewScheduleController(
		usecase.NewScheduleUsecase(
			NewScheduleRepository(),
		),
	)
	pb.RegisterScheduleServiceServer(s, scheduleController)
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
