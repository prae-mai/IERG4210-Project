# IERG4210-Project server

Shopping website project

## Run the website

### Locally
Install dependencies with ``npm install``

Start the website with ``npm start``

### Production build (on a VM)

To start running production build:

``sudo npm install -g serve``

``npm run build``

``serve -s -n build >> ~/IERG4210-Project/production.log & ``

To stop running production build:

``ps aux`` and find the one with node, note its process id (PID)

``kill -HUP 98064`` where 98064 is the actual PID

Also, rename db-sample.js to db.js and replace the information with your actual settings.