<?php 
/*
/depot/pasnummer/
POST = new
DELETE = juist...
GET retourneert alles

/depot/pasnummer/{id}
GET retourneert pasnummer met id id

/studiezaal/mededeling
GET retourneert medeling
POST/PUT voegt toe / bewerkt

/studiezaal/pasnummer/
GET retourneert alle pasnummers

/studiezaal/pasnummer/id
DELETE verwijdert
POST voegt toe

--------------
Table studiezaal
int id autonummer 
int pasnummer unique
bit ingeschakeld

Table depot
int id autonummer
int pasnummer unique
nvarchar(255) mededeling

Table Algemeen
int id autonummer
nvarchar(255) studiezaalmededeling 
---------------



*/

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

$app->get("/", function() {
	echo "Hello, World!";
});

$app->get("/studiezaal/medeling", function() {
	echo "Studiezaal mededeling";
});




?>


