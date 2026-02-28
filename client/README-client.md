# IERG4210-Project client

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

You may likely have to edit apiConfig.js in src > api to have relative paths instead:
``export const CATEGORIES_BASE_URL = "/api/categories";``
``export const PRODUCTS_BASE_URL = "/api/products"; ``