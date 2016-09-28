function showMessages(message) {
    $(".error-messages").text(message).fadeIn();
    $(".error-messages").delay(5000).fadeOut('slow');
}

function hideMessages() {
    $(".error-messages").empty().fadeOut();
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}