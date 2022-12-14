console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()

  $('#viewKoalas').on('click', '.transferBtn', onTransfer )



  // load existing koalas on page load
  getKoalas();

}); // end doc ready

let gender = 'M';
let transfer = 'FALSE';


function onTransfer(){
  let koalaID = $(this).data('id');
  console.log(koalaID);



  
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaID}`,
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
  $( 'body' ).on( 'click', '#genderInM', function(){gender = 'M';});
  $( 'body' ).on( 'click', '#genderInF', function(){gender = 'F';});
  $( 'body' ).on( 'click', '#transferY', function(){transfer = 'TRUE';});
  $( 'body' ).on( 'click', '#transferN', function(){transfer = 'FALSE';});
  $( 'body' ).on('click', '.deleteBtn', deleteKoala);


  $( '#addButton' ).on('click', function(){
    console.log( 'in addButton on click' );
    
  if (isNaN($('#ageIn').val()) || $('#ageIn').val() === ''||
    $('#nameIn').val() === '' ||
    $('#notesIn').val() === '') {
      alert('please fill in all inputs')
      return;
    }
    ;
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

    render(response)
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


function deleteKoala(){
  console.log('in delete koala function')
  let koalaDelete = $(this).data('id');

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaDelete}`
  })
    .then((res) =>{
      console.log('the koala was deleted');
      getKoalas();
    })
    .catch((err) => {
      console.log('error in deleting koala', err);
    })
} // end of delete koala function



function render(listOfKoalas){
  $('#viewKoalas').empty();
  for (let koala of listOfKoalas){
    if (koala.transfer == false){
    // console.log('rendering list of koalas...', koala);
    // console.log('the koala id is...', koala.id)
    $('#viewKoalas').append(`
    <tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.notes}</td>
      <td>${koala.transfer}</td>
      <td>
        <button class = "transferBtn" data-id = ${koala.id}>Mark as Transferred</button>
      </td>
      <td>
        <button class = "deleteBtn" data-id = ${koala.id}>Delete</button>
      </td>
    </tr>`)
    } else {
    $('#viewKoalas').append(`
    <tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.notes}</td>
      <td>${koala.transfer}</td>
      <td>
      <button class = "deleteBtn" data-id = ${koala.id}>Delete</button>
    </td>
     </tr>`)
    }
  }  

}

