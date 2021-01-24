package main

import (
	"api/module"
	"api/pb"
	"net"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	module.Initialize()
	lis, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_auth.UnaryServerInterceptor(module.AuthFunc),
		),
	)
	db := NewDB()
	server := NewServer(db)
	pb.RegisterScheduleServiceServer(s, server)
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
