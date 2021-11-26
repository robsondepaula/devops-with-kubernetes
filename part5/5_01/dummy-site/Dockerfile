FROM golang:1.17.3

WORKDIR /app/go-dummy-site

COPY go.mod .
# COPY go.sum .

# RUN go mod download

COPY . .

RUN go build -o ./out/go-dummy-site .

EXPOSE 8080

CMD ["./out/go-dummy-site"]