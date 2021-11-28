FROM golang:1.17.3

RUN go get github.com/robsondepaula/goclone@v1.2.1
WORKDIR $GOPATH/pkg/mod/github.com/robsondepaula/goclone@v1.2.1/cmd/goclone
RUN go install

WORKDIR /app/go-dummy-site

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

RUN go build -o ./out/go-dummy-site .

EXPOSE 8080
EXPOSE 5000

CMD ["./out/go-dummy-site"]