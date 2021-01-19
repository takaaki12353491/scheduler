SCRIPT_DIR=$(cd $(dirname $0); pwd)

CLIENT_DIR=${SCRIPT_DIR}/../client/src/pb
SERVER_DIR=${SCRIPT_DIR}/../server/pb

protoc \
  -I=${SCRIPT_DIR} \
  --js_out=import_style=commonjs:${CLIENT_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_DIR} \
  --go_out=plugins=grpc:${SERVER_DIR} \
  ${SCRIPT_DIR}/*.proto