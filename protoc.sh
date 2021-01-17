CLIENT_DIR=client/src/pb
SERVER_DIR=server/pb

protoc \
  -I=proto \
  --js_out=import_style=commonjs:${CLIENT_OUTPUT_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_OUTPUT_DIR} \
  --go_out=plugins=grpc:${SERVER_DIR} \
  proto/*.proto