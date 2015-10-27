#!/bin/bash
set -ev
if [ "${TRAVIS_BRANCH}" = "master" ]; then
	echo "Master Branch"
	scp -i deploy -r . deploy@vsg-xebaci.cyoncloud.com:/var/www/html/dkz.gifstr.io/
fi