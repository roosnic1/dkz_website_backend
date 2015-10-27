#!/bin/bash
set -ev
if [ "${TRAVIS_BRANCH}" = "master" ]; then
	echo "Master Branch"
fi