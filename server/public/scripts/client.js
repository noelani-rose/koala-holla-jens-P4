const { on } = require("nodemon");

console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()

  $('#viewKoalas').on('click', '.transferBtn', onTransfer )



  // load existing koalas on page load
  getKoalas();

}); // end doc ready


function onTransfer(){
  let koalaID = $(this).data('id');
  
  $.ajax({
    method: 'PUT',
    url: '/koala',
    data: {readyForTransfer: koalaID} 
  })
  .then((response)=>{
    console.log('mark as ready for transfer', koalaID);
    getKoalas();
  })
  .catch((error)=>{
    console.log('Transfer status change failed', error);
  });

};



function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
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
 
}
