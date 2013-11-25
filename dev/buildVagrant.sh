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

#Setting up Backends

# Setup Redis
apt-get install -y redis-server
redis-server

# Setup MongoDB
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install mongodb-10gen
mkdir -p /data/db/
mongod --config /vagrant/dev/mongodb.conf

# Setting up nginx
cp /vagrant/dev/nginxConfig /etc/nginx/sites-enabled/
service nginx restart

# Install dependencies
cd /vagrant
npm install

# Install AUFS filesystem support
cd ~/
sudo apt-get update
sudo apt-get install -y linux-image-extra-`uname -r`

# Add the Docker repository key to your local keychain
# using apt-key finger you can check the fingerprint matches 36A1 D786 9245 C895 0F96 6E92 D857 6A8B A88D 21E9
sudo sh -c "wget -qO- https://get.docker.io/gpg | apt-key add -"

# Add the Docker repository to your apt sources list.
sudo sh -c "echo deb http://get.docker.io/ubuntu docker main\
> /etc/apt/sources.list.d/docker.list"

# update
sudo apt-get update

# install
sudo apt-get install -y lxc-docker

# Build java docker container
cd /vagrant/judge/docker/images/ubuntu-java7
sudo docker build -t="judge/java7" .

# check your docker version
#sudo ./docker version

# run a container and open an interactive shell in the container
#sudo ./docker run -i -t ubuntu /bin/bash