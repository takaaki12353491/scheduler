package module

import (
	"time"

	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

func Initialize() {
	godotenv.Load()
	const LOCATION = "Asia/Tokyo"
	loc, err := time.LoadLocation(LOCATION)
	if err != nil {
		loc = time.FixedZone(LOCATION, 9*60*60)
	}
	time.Local = loc
	// Log settings
	log.SetFormatter(&log.JSONFormatter{
		PrettyPrint: true,
	})
	log.SetReportCaller(true)
}
