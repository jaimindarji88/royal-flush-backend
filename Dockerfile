FROM amazonlinux:latest
dokc
RUN /bin/bash -c "yum install -y tar make wget gcc-c++ gzip"

WORKDIR /tmp/cmake
RUN wget http://www.cmake.org/files/v3.2/cmake-3.2.2.tar.gz && tar xf cmake-3.2.2.tar.gz && cd cmake-3.2.2 && ./configure && make && make install

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
RUN /bin/bash -c "source /root/.nvm/nvm.sh; nvm install 8.10.0"
