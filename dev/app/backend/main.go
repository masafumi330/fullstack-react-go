package main

import (
	"net/http"

	"github.com/labstack/echo"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, masafumi!")
	})
	e.GET("/api/hello/backend", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"message": "backend"})
	})
	e.Logger.Fatal(e.Start(":4000"))
}
