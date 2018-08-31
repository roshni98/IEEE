var netid= document.getElementById('net');
var fst= document.getElementById('first');
var lst=document.getElementById('last');
var email=document.getElementById('mail');
var grads=document.getElementById('grad');
var submitQuery = document.querySelector('input[type="submit"]');
//var url = "http://localhost:5000"
 var url = "https://emails-ieee.herokuapp.com"

submitQuery.addEventListener('click',function(){
  // Sending and receiving data in JSON format using POST method
//
json = {netid: netid.value,fname: fst.value,lname: lst.value,email:email.value,year:grads.value};

$.ajax({
  type: "POST",
  crossDomain: true,
  url: url+"/new_subscriber",
  data: json,
  success: function(jsondata){
    console.log('success')
  }
});


// $.post(url+"/new_subscriber", data)
//                           .done(function( data ) {
//                             alert( "Data Loaded: " + data );
//                           });

  // var xhr = new XMLHttpRequest();
  // var url = "http://localhost:5000/new_subscriber";
  // xhr.open("POST", url, true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //         var json = JSON.parse(xhr.responseText);
  //         console.log(json.email + ", " + json.password);
  //     }
  // };
  // var data = JSON.stringify({"netid": netid.value,
  //                           "fname": fst.value,
  //                           "lname": lst.value,
  //                           "email": email.value,
  //                           "year": grads.value,
  //                           });
  // xhr.send(data);
});
