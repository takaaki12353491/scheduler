package module

import (
	"context"
	"os"

	"github.com/dgrijalva/jwt-go"
	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	log "github.com/sirupsen/logrus"
	"golang.org/x/xerrors"
)

func AuthFunc(ctx context.Context) (context.Context, error) {
	tokenString, err := grpc_auth.AuthFromMD(ctx, "bearer")
	jwtToken, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			err := xerrors.Errorf("unexpected signing method: %v", token.Header["alg"])
			log.Error(err)
			return "", err
		}
		return []byte(os.Getenv(SIGNIN_KEY)), nil
	})
	if err != nil {
		log.Error(err)
		return ctx, err
	}
	claims, ok := jwtToken.Claims.(jwt.MapClaims)
	if !ok {
		err := xerrors.Errorf("not found claims in %s", tokenString)
		log.Error(err)
		return ctx, err
	}
	userID, ok := claims["sub"].(string)
	if !ok {
		err := xerrors.Errorf("not found %s in %s", "sub", tokenString)
		log.Error(err)
		return ctx, err
	}
	return context.WithValue(ctx, USER_ID, userID), nil
}

func GetUserID(ctx context.Context) string {
	return ctx.Value(USER_ID).(string)
}
