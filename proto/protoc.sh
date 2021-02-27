SCRIPT_DIR=$(cd $(dirname $0); pwd)

CLIENT_DIR=${SCRIPT_DIR}/../client/src/pb
API_DIR=${SCRIPT_DIR}/../api/pb

protoc \
  -I=${SCRIPT_DIR} \
  --js_out=import_style=commonjs:${CLIENT_DIR} \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${CLIENT_DIR} \

for FILE in `ls *.proto`; do
  API_DIR=${SCRIPT_DIR}/../server/api/${FILE%.*}
  protoc \
    -I=${SCRIPT_DIR} \
    --go_out=plugins=grpc:${API_DIR}/app/pb \
    ${SCRIPT_DIR}/${FILE}
done