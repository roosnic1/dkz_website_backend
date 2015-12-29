#!/bin/bash
set -ev
if [ "${TRAVIS_BRANCH}" = "master" ]; then
	echo "Master Branch"
	scp -i deploy -r dist/* deploy@vsg-xebaci.cyoncloud.com:/var/www/html/www.diekulissezug.ch
	ssh -i deploy deploy@vsg-xebaci.cyoncloud.com 'cd /var/www/html/www.diekulissezug.ch && npm install --production'
fi

if [ "${TRAVIS_BRANCH}" = "development" ]; then
	echo "Development Branch"
	scp -i deploy -r dist/* deploy@vsg-xebaci.cyoncloud.com:/var/www/html/dkz.gifstr.io
	ssh -i deploy deploy@vsg-xebaci.cyoncloud.com 'cd /var/www/html/dkz.gifstr.io && rm -rf node_modules'
	ssh -i deploy deploy@vsg-xebaci.cyoncloud.com 'cd /var/www/html/dkz.gifstr.io && npm install --production'
fi