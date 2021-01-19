docker-compose exec db bash -c "chmod 775 ./scripts/*"
docker-compose exec db bash -c "./scripts/login.sh"