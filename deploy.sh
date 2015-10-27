#!/bin/bash
set -ev
if [ "${TRAVIS_BRANCH}" = "master" ]; then
	echo "Master Branch"
	scp -i deploy -r dist/* deploy@vsg-xebaci.cyoncloud.com:/var/www/html/diekulissezug.ch
	ssh -i deploy deploy@vsg-xebaci.cyoncloud.com 'cd /var/www/html/diekulissezug.ch && npm install --production'
fi