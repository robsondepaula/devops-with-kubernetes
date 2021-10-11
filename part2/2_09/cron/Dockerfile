FROM alpine:latest

WORKDIR /usr/src/app

RUN apk --no-cache add curl

COPY ./random_todo.sh ./random_todo.sh

RUN adduser -D appuser && \
    chmod +x random_todo.sh

USER appuser

ENTRYPOINT ["./random_todo.sh"]