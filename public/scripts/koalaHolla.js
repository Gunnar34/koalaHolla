console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
    for (var i = 0; i < data.length; i++) {

      $('#viewKoalas').append('<p> name: ' + data[i].koala_name + ' age: ' + data[i].age + ' sex: ' + data[i].sex + ' notes: ' + data[i].notes + '</p>');
      if(data[i].ready4transfer){
        $('#viewKoalas').append('<p>'+ data[i].koala_name + ' is ready to be transfered</p> <br>');
      }
      else {
        $('#viewKoalas').append('<p>' + data[i].koala_name + ' is not ready to be transfered</p> <br>');
      }
    }
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
}; // end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      $('#viewKoalas').append('<p> name: ' + newKoala.name + ' age: ' + newKoala.age + ' sex: ' + newKoala.sex + ' notes: ' + newKoala.notes + '</p>');
      if(newKoala.readyForTransfer){
        $('#viewKoalas').append('<p>'+ newKoalaname + ' is ready to be transfered</p> <br>');
      }
      else {
        $('#viewKoalas').append('<p>' + newKoala.name + ' is not ready to be transfered</p> <br>');
    }
    // end success
  } //end ajax
});
};
