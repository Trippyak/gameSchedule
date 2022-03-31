# Video Game Calendar

The purpose of this application is to have a simple way to schedule video games on a given day and time, while being able to share the schedule.

## Services

This application follows a service oriented architecture (SOA). The following services are reflected in the docker-compose file:
    - auth
    - app
    - share-app
    - web
    - nginx

The docker-compose does contain other supporting containers:
    - certbot
    - auth-postgres
    - app-postgres
    - share-redis

## Services Continued

### Auth

The auth service provides a standalone application to register, login, and authenticate the user. 

### App

The app service provides a standalone application to handle the game schedule APIs and commit data and fetch data to the app databas. Before any API call starts, the users JWT is authenticated by the auth service.

### Share App

The share app servie provides a standalone application to allow users to share their schedules. The service returns a base 64 URL hash corresponding to the content. This hash needs to be appended to the host and endpoint to view / load the content.

### Web

The web service is a standalone application to act as a proxy for app and doubles as a file server.

### Nginx

The nginx service is used as a reverse proxy to forward all traffic to the web service. This is also leveraged by opening port 80 and serving up /temp/index.html to allow certbot to run in --webroot mode.

## UI
The UI folder has two different configs for build the "admin" or "main" site, and one for the share view. Two different views were made for the control of adding only needed APIs and remove the need to switch view "modes" for readonly and edit given authentication.

# Setup

## Installing Build Dependencies and Building
The apps are written in Typescript or Svelte, and can be problematic if the image is node based. TSC needs to run as a script, rather than as a node module. At the moment, Dockerfile does not install tsc and build. They need to be built on the local dev machine or a build server, then the respecting Dockerfile for the app will copy the build.

Applicable for auth and ui

To install the nodejs dependencies:
```
npm i
```

To build UI dists:
```
npm run build && npm run buildShared
```

To build auth:
```
npm run build
```

## Delphi-Hellman Key
A Delphi-Hellman Key is needed to finish the SSL/TLS setup. To create a key:
```
mkdir dhparam
openssl dhparam -out <project_location>/dhparam/dhparam-2048.pem 2048
```

## Automatic Certificate Renewal
The ssl_renew.sh runs a script to renew the ssl certs.

To make executable:
```
chmod +x ssl_renew.sh
```

To run script on cron job (linux system):
```
sudo crontab -e
0 12 * * * /home/sammy/node_project/ssl_renew.sh >> /var/log/cron.log 2>&1
```

Referece for nginx and certbot setup / guide:
https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose 