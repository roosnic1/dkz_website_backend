# Backend for the "Die Kulisse Zug" Website

[Frontend](https://github.com/roosnic1/dkz_website)

Startcommand
```sh
NODE_ENV="DEV" nodemon --debug bin/www
``


Mongodb Commands
mongodump --host=127.0.0.1 --db dkz_website_prod --out dkz.dump
mongo dkz_website_prod --eval "db.dropDatabase()"
mongorestore --host=localhost dkzdump

