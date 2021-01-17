protoc \
  -I=proto \
  --go_out=plugins=grpc:server/pb \
  proto/*.proto