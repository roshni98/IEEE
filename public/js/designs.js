var netid= document.getElementById('net');
var fst= document.getElementById('first');
var lst=document.getElementById('last');
var email=document.getElementById('mail');
var grads=document.getElementById('grad');
var submitQuery = document.querySelector('input[type="submit"][value="Submit"]');
var unsubscribeQuery = document.querySelector('input[type="submit"][value="Unsubscribe"]');

//var url = "http://localhost:5000"
 var url = "https://emails-ieee.herokuapp.com"

function handle_form_submission(){
    console.warn('TEST');
    alert('Submit button pressed');
    return false; //do not submit the form
 }

function valid(){
  var missing = "";
  var isValid = true;
  if (!(netid.checkValidity())) {
      $('#net').css({ "background": '#FFFF00'});
      missing +="NetID,";
      isValid = false;
    }
  if (!(fst.checkValidity())) {
      $('#first').css({ "background": '#FFFF00'});
      missing +="First Name,";
      isValid = false;
  }
   if (!(lst.checkValidity())) {
        $('#last').css({ "background": '#FFFF00'});
        missing +="Last Name,";
        isValid = false;
    }
    if (!(mail.checkValidity())) {
         $('#mail').css({ "background": '#FFFF00'});
         missing +="Email,";
         isValid = false;

     }
     if (!(grads.checkValidity())) {
          $('#grad').css({ "background": '#FFFF00'});
          missing +="Graduation Year,";
          isValid = false;
      }

      if(!isValid){
        alert("Missing:" + missing);
        return false;
      }
  return true;
}
function reset(){
  console.log("clicked");
  $('#myForm')[0].reset()


}



submitQuery.addEventListener ('click',function(){
  // Sending and receiving data in JSON format using POST method
//
  json = {netid: netid.value,fname: fst.value,lname: lst.value,email:email.value,year:grads.value};
  if(valid()){
    $.ajax({
      type: "POST",
      crossDomain: true,
      url: url+"/new_subscriber",
      data: json,
      success: function(jsondata){
        alert('success');
        console.log('success');
        reset();
      }
    });
 }
});



unsubscribeQuery.addEventListener ('click',function(){
  // Sending and receiving data in JSON format using POST method
//

  json = {netid: netid.value,fname: fst.value,lname: lst.value,email:email.value,year:grads.value};
  if(valid()){
    $.ajax({
      type: "POST",
      crossDomain: true,
      url: url+"/delete_subscriber",
      data: json,
      success: function(jsondata){
        alert('success');
        console.log('success');
        reset();
      }
    });
 }

});
