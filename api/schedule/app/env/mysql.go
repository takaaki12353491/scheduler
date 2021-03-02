package env

import "os"

var (
	SCHEDULER_MYSQL_USER     = os.Getenv("SCHEDULER_MYSQL_USER")
	SCHEDULER_MYSQL_PASSWORD = os.Getenv("SCHEDULER_MYSQL_PASSWORD")
	SCHEDULER_MYSQL_HOST     = os.Getenv("SCHEDULER_MYSQL_HOST")
	SCHEDULER_MYSQL_DATABASE = os.Getenv("SCHEDULER_MYSQL_DATABASE")
)