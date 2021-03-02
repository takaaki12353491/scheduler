package controller

import (
	"context"
	"schedule/consts"
)

func getUserID(ctx context.Context) string {
	return ctx.Value(consts.USER_ID_KEY).(string)
}
