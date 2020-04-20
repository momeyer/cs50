var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
var curUsername = "Anonymous"
var curColor = "#a9dc76ff"

var message = $("#message")
var sendMessage = $("#send_message")
var username = $("#username")
var sendUsername = $("#send_username")
var changeUsername = $("#username")
var chatRoom = $("#chatroom")
var feedback = $('#feedback')
var listOfMessages = ""

$(document).ready(initAll
);

function initAll() {
    handleRadioButtons();
}

function handleRadioButtons() {
    $("input[type='radio']").click(function () {
        console.log("Here");
        var radioValue = $("input[name='color']:checked").val();
        if (radioValue) {
            curColor = radioValue;
            console.log("Color is now " + curColor)
        }
    });
}

function hideLogonWindow() {
    var registration = document.getElementById("registration");
    var m = document.getElementById("m");
    var i = document.getElementById("message");
    var s = document.getElementById("send_message");
    var info = document.getElementById("info");
    m.style.display = "block";
    info.style.display = "block";
    i.style.display = "block";
    s.style.display = "block";
    registration.style.display = "none";
}

socket.on('connect', () => {
    console.log("Connected");


    socket.on('message', (data) => {
        listOfMessages += "<p class='message' style='color:" + curColor + ";'>" + data.username + ": " + data.message + "</p>";
        feedback.html(listOfMessages);
    })

    sendUsername.click(function () {
        
        console.log("sendUsername");
        curUsername = username.val();
 
        if (curUsername.trim() !== '') {
            socket.emit('change_username', { new_username: username.val() });
            username.val('');

            hideLogonWindow();

        }
        
    })

    sendMessage.click(function () {
        console.log("sendMessage")
        socket.emit('message', { username: curUsername, message: message.val() })
        message.val('')
    })

});