# MindYoMaintenance
A react native app that helps keep track of what maintenance needs to be done for you vehicle.

## This repository contains the full stack of the code you need.
frontend - contains react native
backend - contains node express server


# Installation
## Backend Installation

First you need to clone this repository.
You need to run these commands to run the backend.
```
cd backend
npm install
```
After you are done installing the node modules. Open 2 extra terminals
- For the first step, run:
```
docker-compose up --build
```
or 
```
docker-compose up
```

- After that, in a separate terminal, run the command:
```
npm run localtunnel
```
- This will set up a proxy for localhost:3000 will run on https://mindyomaintenance.loca.lt
- Once the localtunnel is set, run the command
```
npm run startserver
```

The backend should be running after that on localhost:3000 which proxies into https://mindyomaintenance.loca.lt.

## Frontend Installation
Navigate back to the main directory
Then run:
```
cd frontend
npm install
expo start
```
This will start expo to run the React Native suite. Here you can run the app in Web Browser.
If all the steps went through successfully, the app should be running locally now.



