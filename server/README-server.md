# IERG4210-Project server

Shopping website project

## Run the website

### Locally
Install dependencies with ``npm install``

To setup, edit db.js to your actual information.

To run, cd inside the IERG4210-Project/server folder ``node index.js``

Make sure to copy .env.example and rename it to .env and put your own secrets in .env

Don't add any / in your .env URL, it'll break the links because stuff will have double //

## Create the tables

This project uses MariaDB. 

```sql
CREATE DATABASE ierg;
USE ierg;

CREATE TABLE categories (
  catid INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  UNIQUE (name)
);

CREATE TABLE products (
  pid INT AUTO_INCREMENT PRIMARY KEY,
  catid INT NOT NULL,
  name VARCHAR(200),
  price DECIMAL(10,2),
  description VARCHAR(1000),
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  sessionid VARCHAR(200),
  isadmin BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (username),
  UNIQUE (email)
);

CREATE TABLE orders (
  orderid INT AUTO_INCREMENT PRIMARY KEY,
  userid INT,
  currency VARCHAR(20),
  merchantemailaddress VARCHAR(200),
  randomsalt VARCHAR(200),
  cartcontent VARCHAR(2000),
  totalprice DECIMAL(10,2),
  status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  stripe_session_id VARCHAR(255) NULL,
  stripe_payment_intent_id VARCHAR(255) NULL,
  processed_at DATETIME NULL;
);
```