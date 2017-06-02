var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var port = process.env.PORT || 8080;
var config = {
  dataBase: 'test',
  host: 'localhost',
  port: 5432,
  max: 12
};
var pool = new pg.Pool( config );
// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/koalas', function( req, res ){
  console.log( 'GET koalas route hit' );
  pool.connect( function( err , connection , done ){
  var koalasData = [];
    if (err){
      console.log('error in connection', err);
      done();
      res.send( 400 );
    }
    else {
      console.log('successful connection to DB');

      var dataResult = connection.query( "SELECT * FROM koalas");

      dataResult.on( 'row', function(row){
        console.log(row);
        koalasData.push(row);
      });
      dataResult.on( 'end', function(){
        done();
        res.send(koalasData);
      });

    }
  });
});

// add koala
app.post( '/koalas', urlencodedParser, function( req, res ){
  console.log( 'POST koalas route hit' );
  console.log(req.body);
  var koala = req.body;
  pool.connect( function( err , connection , done ){
    if (err){
      console.log('error in connection', err);
      done();
      res.send( 400 );
    }
    else {
        var dataPush = connection.query("INSERT INTO Koalas (koala_name, Sex, Age, Ready4Transfer, Notes ) Values" +
      "('" + koala.name + "', '"+ koala.sex + "', '" + koala.age + "', '" + koala.readyForTransfer + "', '" + koala.notes + "')");
      res.send('success');
}
    });

});

// add koala
app.put( '/koalas', urlencodedParser, function( req, res ){
  console.log( 'PUT koalas route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from PUT koalas route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});
