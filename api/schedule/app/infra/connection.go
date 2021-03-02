package infra

import (
	"os"
	"strings"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type (
	Connection struct {
		DBMS   string
		User   string
		Pass   string
		Host   string
		Port   string
		DBName string
		Option string
	}
	Option func(*Connection)
)

func WithDBName(dbName string) Option {
	return func(conn *Connection) {
		conn.DBName = dbName
	}
}

func NewConnection(ops ...Option) *gorm.DB {
	conn := &Connection{
		User:   os.Getenv("SCHEDULER_MYSQL_USER"),
		Pass:   os.Getenv("SCHEDULER_MYSQL_PASSWORD"),
		Host:   "localhost",
		Port:   "3306",
		DBName: os.Getenv("SCHEDULER_MYSQL_DATABASE"),
		Option: "parseTime=true&loc=Asia%2FTokyo",
	}
	for _, option := range ops {
		option(conn)
	}
	dsn := strings.Join([]string{
		conn.User, ":", conn.Pass, "@", "tcp", "(", conn.Host, ":", conn.Port, ")", "/", conn.DBName, "?", conn.Option,
	}, "")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Panicln(err)
	}
	return db
}
