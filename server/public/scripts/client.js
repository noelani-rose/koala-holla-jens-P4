console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

let gender = 'M';
let transfer = 'FALSE';

function setupClickListeners() {
  $( 'body' ).on( 'click', '#genderInM', function(){gender = 'M';});
  $( 'body' ).on( 'click', '#genderInF', function(){gender = 'F';});
  $( 'body' ).on( 'click', '#transferY', function(){transfer = 'TRUE';});
  $( 'body' ).on( 'click', '#transferN', function(){transfer = 'FALSE';});

  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // using a test object

    
    console.log('radio value', $('#genderInM').val());
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: gender,
      transfer: transfer,
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas

  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
  .then((response) => {
    // making the response the lost of koalas coming in
    console.log('getting koalas response from server', response)
    const listOfKoalas = response;
    for (let koala of listOfKoalas){
      $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.notes}</td>
        <td>${koala.transfer}</td>
        </tr>`)
    }
    // render(response)
  })
  .catch ((err) => {
    console.log('error in getting koala table', err);
  })
  
} // end getKoalas

function saveKoala( newKoala ){

  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas/',
    data: newKoala
  })
    .then(function (response){
      console.log('koala added');

      $('#nameIn').val(''),
      $('#ageIn').val(''),
      $('#notesIn').val('')
      getKoalas();
    })
    .catch((err) => {
      console.log('POST error', err);
    });
} // end saveKoala
