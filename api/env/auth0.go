package env

import (
	"os"
)

var (
	AUTH0_AUDIENCE = os.Getenv("AUTH0_AUDIENCE")
	AUTH0_DOMAIN   = os.Getenv("AUTH0_DOMAIN")
)
