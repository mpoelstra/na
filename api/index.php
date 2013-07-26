<?php
/* Let op: Rewrite rules in .htaccess belangrijk om slim framework te laten werken */


/*
/depot/pasnummer/
GET retourneert alles

/depot/pasnummer/{id}
GET retourneert pasnummer met id id
POST = new
PUT = aanpassen
DELETE = juist...

/depot/pasnummer/init
Reset alle pasnummers op depot


/studiezaal/mededeling
GET retourneert mededeling
POST/PUT voegt toe / bewerkt

/studiezaal/pasnummer/
GET retourneert alle pasnummers

/studiezaal/pasnummer/id
GET haalt op
PUT past aan (body: {"ingeschakeld": true/false})

/studiezaal/pasnummer/init
Reset alle pasnummers op studiezaal

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
require 'Redbean/rb.php';

\Slim\Slim::registerAutoloader();
R::setup('mysql:host=localhost;dbname=attendering', 'root', '');

$app = new \Slim\Slim();


/****** STUDIEZAAL MEDEDELING **********/

$app->get('/studiezaal/mededeling', function () use ($app) {
    $algemeen = R::findOne('algemeen', 'mededelingid=1');

    if ($algemeen) {
    	$app->response()->header('Content-Type', 'application/json');
    	echo json_encode(R::exportAll($algemeen));
	}
});

$app->map('/studiezaal/mededeling', function() use ($app) {

    $request = $app->request();
    $body = $request->getBody();
    $input = json_decode($body); 

    $algemeen = R::findOne('algemeen', 'mededelingid=1');

    if (!$algemeen) {
    	$algemeen = R::dispense('algemeen');
    }

	$algemeen->mededeling = (string) $input->mededeling;
	$algemeen->mededelingid = 1;
	R::store($algemeen);

})->via('PUT', 'POST');

/****** STUDIEZAAL MEDEDELING **********/


/********** STUDIEZAAL PASNUMMERS ************/

$app->get('/studiezaal/pasnummer/', function() use ($app) {

	$pasnummers = R::find('studiezaal');

	$app->response()->header('Content-Type', 'application/json');

	echo json_encode(R::exportAll($pasnummers));
});

// Initialiseer de studiezaal pasnummers (alles leeg, geen pasnummers op het studiezaal bord)
$app->get('/studiezaal/pasnummer/init', function() use ($app) {

	$pasnummers = R::find('studiezaal');

	foreach($pasnummers as $pasnummer) {
		R::trash($pasnummer);
	}

	for ($nummer = 1; $nummer <= 200; $nummer++) {
		   	$pasnummer = R::dispense('studiezaal');
		   	$pasnummer->pasnummer = (int) $nummer;
		   	$pasnummer->ingeschakeld = false;
 			R::store($pasnummer);
	}
});

$app->put('/studiezaal/pasnummer/:id', function($id) use ($app) {
	// get and decode JSON request body
    $request = $app->request();
    $body = $request->getBody();
    $input = json_decode($body); 

	$pasnummer = R::findOne('studiezaal', 'pasnummer=?', array($id));

	if ($pasnummer) {
		$pasnummer->ingeschakeld = (bool) $input->ingeschakeld;
		R::store($pasnummer);
	}
});


/********** STUDIEZAAL PASNUMMERS ************/


/********** DEPOT PASNUMMERS ************/

$app->get('/depot/pasnummer', function() use ($app) {

	$pasnummers = R::findAll('depot', 'ORDER BY modificationtime');
	$app->response()->header('Content-Type', 'application/json');

	echo json_encode(R::exportAll($pasnummers));

});

$app->map('/depot/pasnummer/:id', function($id) use ($app) {

    $request = $app->request();
    $body = $request->getBody();
    $input = json_decode($body); 

    $pasnummer = R::findOne('depot', 'pasnummer=?', array($id));

    if (!$pasnummer) {
    	$pasnummer = R::dispense('depot');
    } 
	
	$pasnummer->pasnummer = (int) $id;
	$pasnummer->mededeling = (string) $input->mededeling;
	$pasnummer->modificationtime = R::isoDateTime();
	R::store($pasnummer);
})->via('PUT', 'POST');


$app->delete('/depot/pasnummer/:id', function($id) use ($app) {
	  $pasnummer = R::findOne('depot', 'pasnummer=?', array($id));

	  if ($pasnummer) {
	  	R::trash($pasnummer);
	  }
});


// Initialiseer de depot pasnummers (alles leeg, geen pasnummers op het depot bord)
$app->get('/depot/pasnummer/init', function() use ($app) {

	$pasnummers = R::find('depot');

	foreach($pasnummers as $pasnummer) {
		R::trash($pasnummer);
	}
});




/********** DEPOT PASNUMMERS ************/






/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
