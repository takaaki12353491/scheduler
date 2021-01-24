package module

import (
	"api/consts"
	"api/env"
	"context"
	"encoding/json"
	"net/http"

	"github.com/form3tech-oss/jwt-go"
	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	log "github.com/sirupsen/logrus"
	"golang.org/x/xerrors"
)

type Response struct {
	Message string `json:"message"`
}

type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}

func AuthFunc(ctx context.Context) (context.Context, error) {
	tokenString, err := grpc_auth.AuthFromMD(ctx, "bearer")
	jwtToken, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(env.AUTH0_AUDIENCE, false); !checkAud {
			err := xerrors.Errorf("Invalid audience")
			log.Error(err)
			return ctx, err
		}
		if checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(env.AUTH0_DOMAIN, false); !checkIss {
			err := xerrors.Errorf("Invalid issuer")
			log.Error(err)
			return token, err
		}
		cert, err := getPemCert(token)
		if err != nil {
			panic(err.Error())
		}
		token.Method = jwt.SigningMethodRS256
		result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
		return result, nil
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
	return context.WithValue(ctx, consts.USER_ID_KEY, userID), nil
}

func getPemCert(token *jwt.Token) (string, error) {
	cert := ""
	res, err := http.Get(env.AUTH0_DOMAIN + "/.well-known/jwks.json")
	if err != nil {
		return cert, err
	}
	defer res.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(res.Body).Decode(&jwks)

	if err != nil {
		return cert, err
	}

	for k, _ := range jwks.Keys {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + jwks.Keys[k].X5c[0] + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		err := xerrors.New("Unable to find appropriate key.")
		return cert, err
	}

	return cert, nil
}

func GetUserID(ctx context.Context) string {
	return ctx.Value(consts.USER_ID_KEY).(string)
}
