#!/bin/bash
cd /vagrant/dev/SQLCommands/
echo ""
if [ "$2" == "test" ] ; then
	echo "=== Tearing down Test DB ==="
	sudo -u postgres psql --dbname=postgres -a -f destroyTestDB.sql
else
	echo "=== Tearing down Dev DB ==="
	sudo -u postgres psql --dbname=postgres -a -f destroyDevDB.sql
fi

sudo ./setupDB.sh -c "$2"