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

CREATE TABLE `categories` (
  `catid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`catid`)
)

CREATE TABLE `products` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `catid` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`pid`)
)

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `sessionid` varchar(200) DEFAULT NULL,
  `isadmin` tinyint(1) NOT NULL DEFAULT 0,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) 

CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `currency` varchar(20) DEFAULT NULL,
  `merchantemailaddress` varchar(200) DEFAULT NULL,
  `randomsalt` varchar(200) DEFAULT NULL,
  `cartcontent` varchar(2000) DEFAULT NULL,
  `totalprice` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','paid','failed') DEFAULT 'pending',
  `stripe_session_id` varchar(255) DEFAULT NULL,
  `stripe_payment_intent_id` varchar(255) DEFAULT NULL,
  `processed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`orderid`)
)
```