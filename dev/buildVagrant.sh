#!/usr/bin/env bash
apt-get update
apt-get install -y nginx vim make g++ git-core

# Setting up Node.js
wget http://nodejs.org/dist/v0.10.21/node-v0.10.21.tar.gz
tar -xvf node-v0.10.21.tar.gz
rm node-v0.10.21.tar.gz
cd node-v0.10.21/
./configure
make
make install
cd ..

# Setup MongoDB
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install mongodb-10gen
mkdir -p /data/db/
mongod --config /vagrant/dev/mongodb.conf

# Setup docker
#wget --output-document=docker https://get.docker.io/builds/Linux/x86_64/docker-latest
#chmod +x docker
#sudo ./docker -d &

# check your docker version
#sudo ./docker version

# run a container and open an interactive shell in the container
#sudo ./docker run -i -t ubuntu /bin/bash


# Setting up nginx
cp /vagrant/dev/nginxConfig /etc/nginx/sites-enabled/
service nginx restart

# Install dependencies
cd /vagrant
npm install