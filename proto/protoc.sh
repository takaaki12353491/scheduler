SCRIPT_DIR=$(cd $(dirname $0); pwd)

CLIENT_DIR=${SCRIPT_DIR}/../client/src/pb
WEB_DIR=${SCRIPT_DIR}/../server/bff/web/pb

protoc \
  -I=${SCRIPT_DIR} \
  --js_out=import_style=commonjs:${CLIENT_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_DIR} \
  --go_out=plugins=grpc:${WEB_DIR} \
  ${SCRIPT_DIR}/*.proto

for FILE in `ls *.proto`; do
  API_DIR=${SCRIPT_DIR}/../server/api/${FILE%.*}
  protoc \
    -I=${SCRIPT_DIR} \
    --go_out=plugins=grpc:${API_DIR}/pb \
    ${SCRIPT_DIR}/${FILE}
done