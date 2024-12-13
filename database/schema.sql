/* Create database */
CREATE DATABASE kasuat20;

/* Admin User and Admin */
CREATE TABLE administration(

  administration_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  fname VARCHAR(100) NOT NULL,
  lname VARCHAR(100) NOT NULL,
  acc_lock BOOLEAN DEFAULT 0,
  acc_level VARCHAR(100) ,
  whoare_u varchar(100),
  email VARCHAR(100) NOT NULL,
  mobile VARCHAR(100) NOT NULL,
  passwrd VARCHAR(100) NOT NULL,
  token VARCHAR(200) NOT NULL,
  ID INT,
  stateoforigin VARCHAR(100),
  insertDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  usertype VARCHAR(100) NOT NULL,
  check_in_out VARCHAR(100) ,
);





CREATE TABLE configRoute(
       configroute_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
       usertype VARCHAR(100),
       user_token VARCHAR(100),
       insertDate DATETIME DEFAULT CURRENT_TIMESTAMP
);


/* sign up */

CREATE TABLE audiance(

     audiance_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
     fullname  VARCHAR(100) NOT NULL,
     email  VARCHAR(100) ,
     mobile  VARCHAR(100) NOT NULL,
     stateoforigin VARCHAR(100),
     paid_for VARCHAR(100),
     ticketType VARCHAR(100),
     registr_fee FLOAT DEFAULT 0.0 ,
     ref_id_pay VARCHAR(300) ,
     payment_status VARCHAR(300) DEFAULT 'notpaid',
     bussines_name VARCHAR(200),
     a_id INT,
     user_token  VARCHAR(100) NOT NULL,
     checkin_out BOOLEAN DEFAULT 0,
     ownertype VARCHAR(100),
     checkin_time VARCHAR(100),
     checkout_time VARCHAR(100),
     insertDate DATETIME DEFAULT CURRENT_TIMESTAMP

);

/* add ticket */

CREATE TABLE add_ticket(
       
       add_ticket INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
       ticket_type VARCHAR(100) NOT NULL,
       price FLOAT DEFAULT 0.0 NOT NULL ,
       limt int NOT NULL NOT NULL,
       token VARCHAR(200) NOT NULL,
       doorOpen VARCHAR(200) NOT NULL,
       holdDate VARCHAR(200) NOT NULL,
       insertDate DATETIME DEFAULT CURRENT_TIMESTAMP

);

// Log
CREATE TABLE log_tbl(
       
         log_tbl_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
         user_id VARCHAR(100),
         phone VARCHAR(100),
         fullname VARCHAR(100),
          insertDate DATETIME DEFAULT CURRENT_TIMESTAMP

);



// count visitors
 CREATE TABLE IF NOT EXISTS visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45),
    visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

// watch checkin_time

CREATE TABLE wtach_checked_in_out(
       wtach_checked_in_out_id INT AUTO_INCREMENT PRIMARY KEY,
       fullname VARCHAR(200) NOT NULL,
       ticket_id VARCHAR(100) NOT NULL,
       mobile VARCHAR(100) NOT NULL,
       check_status VARCHAR(100) NOT NULL,
       insertDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);