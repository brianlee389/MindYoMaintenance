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

## WARNING!
- If localtunnel is not running the path https://mindyomaintenance.loca.lt then switch to the branch "localhost-3000" in this repository
- If this is the case, you only need to run
```
docker-compose up
```
then
```
npm run startserver
```
on your local machine.

## Frontend Installation
Install the backend before you start doing the installation process for the frontend.
Navigate back to the main directory.
Then run:
```
cd frontend
npm install
expo start
```
This will start expo to run the React Native suite. Here you can run the app in Web Browser.
If all the steps went through successfully, the app should be running locally now.



## Signing In
In order to sync the mobile app, you need to enter the code from https://localhost:3000/?state=123&code=eyJraWQiOiI2cjIzQ2FTeTF4cFdUUFBxYVRtX01Vc2RKZGo1RWlDTnRtME4yVTAxNTdFIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.LzukSqFHtyVZ7C2QrIdL3zomfuDmnvl07dMqhYshpk-1iJXdQiQ_jDVeAPi5G1xX2arczUBCskk6MxKr4gRfS8Gw1TecmBtPlTJ-1rDiiVg-4AsvTvV0mQqN-Fkv_agijrpj4X9SJVKK4n08UHBV91fhYWQpA6xsnBN2FgbaVDsAOPGGBWoqXgfgwSy7E7hgzfB378rbiDIEs2sCFwCK2sa6fC_KqOuWTth502-TjF1ol9JDGORwcfVyPZ6YTckvICB-K39qDwXyg45-ze-4Tlb2FjK4xw-mTmSuKHPDd9nE9Kbh6EghCa5orWJH_sbZDQkOdvrzCByYL9p2NedLaA.q2dim3xCWlajLVVb.qs8901-tNA8va1y0dB5kCxz42qMYK1dU4ZDbe0OpzFepYUrs-g_Q9kH2-fP8BDFs1F3XqaaeXp9g_lfB2YlU_7qfTnR__VUmcSyEt8epnXJolpq1jFPQJ1gTb5Fgxuz2J0hTCJ9mrqfedRnIQQTQI0SvyEoEDq2ERzyHDuyUISZeG1t9xSuDNzJ727NQeHJ1R13w1t6iuDGGH4FYX6DAKK3YmDSPAK5HXPUI_Uhj8EfYpeWvOpCbw2eRauVc83PBrGz2ZWminfjP1HeIhqscMFU_ru-d_t_zV1jkMssTDZedp3QK7JVW0F8cn9F8d12JmLKojdgVc8DWbz_p7iHSvoFKpJvvzDvfSH6_wVcmqlS7Qcv3eCe1EQYuHs6JAcfB_lfni8X3SqH31TSiYPakW_EZuUUzbBYo1Z5XM0IJkCvHH89iwe4YU6ar-himWNkOjoOhgxpBSg6y_u6RUfgctBft7VQU4VentulvTpSXmUdjBIjsHxn98BAtfslwkriWDWt2aoBRdVxm5jt1bs5poOn2IHC7pWV6hWvg8UgyJYf3fVVvhxtZF2QlwrOUUdwk9zrun30RG0AbVCZXxcO1PNaRqQYhM4pYWi76gVVenaHAHwqqq3ZtdyRo6OZPRK6Ktz2LWzVPGmMurkFlZvClExK1_9aVQt4s_GRMPWJgJON8PGKlbhi7PaqPqvqIdj2jw7d3tgmId5LJVYwFxQOdFb5k8rK6w9HwwxId5LF65MbXAFvi4Wa7_u5LVY8V_UlMz5XGhKNC69q1G7jfCplRljHDb4fNgqqAjMWR0yE_2oF24CJVEAOjldnbXt8H6R943QkilfpXkWU.tghE_7DvTfH0Lmo2X56UnA

