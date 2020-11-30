console.log("It works");

$(document).ready(function () {
  $('.submit').click(function (event) {

    console.log('clicked button');

    var name = $('.fullName').val();
    var email = $('.email').val();
    var message = $('.message').val();
    var statusElm = $('.status');
    statusElm.empty();
    if (email.length > 5 && email.includes('@') && email.includes('.')){
      statusElm.append('<div style="color: green">Email is valid</div>');
    }else {
      event.preventDefault();
      statusElm.append('<div style="color: red">Email is no valid</div>');
    }

    if (name.length > 2){
      statusElm.append('<div style="color: green">Full name is valid</div>');
    }else {
      event.preventDefault();
      statusElm.append('<div style="color: red">Full name is no valid</div>');
    }
    if (message.length > 2){
      statusElm.append('<div style="color: green">Message is valid</div>');
    }else {
      event.preventDefault();
      statusElm.append('<div style="color: red">Message is no valid</div>');
    }

  })
})