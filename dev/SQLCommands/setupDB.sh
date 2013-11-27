#!/bin/bash

echo
if [ "$2" == "test" ] ; then
	echo "=== Setting up Test DB ==="
	cd /vagrant/dev/SQLCommands/test/
else
	echo "=== Setting up Dev DB ==="
	cd /vagrant/dev/SQLCommands/development/
fi

sudo -u postgres psql --dbname=postgres -a -f makeDB.sql
sudo -u postgres psql --dbname=template1 -a -f makeUSER.sql