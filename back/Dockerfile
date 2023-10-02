FROM ubuntu:latest

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y \
    build-essential \
    cmake \
    git \
    clang \
    pkg-config \
    libssl-dev \
    libpthread-stubs0-dev \
    libmicrohttpd-dev \
    make && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Clone and install cJSON
RUN git clone https://github.com/DaveGamble/cJSON.git && \
    cd cJSON && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make && \
    make install && \
    cd ../.. && \
    rm -rf cJSON

ENV LD_LIBRARY_PATH /usr/local/lib:$LD_LIBRARY_PATH

WORKDIR /app

COPY back/backend.c /app/login_server.c

RUN gcc login_server.c -o login_server -lmicrohttpd -lcjson

EXPOSE 8080

CMD ["./login_server"]
