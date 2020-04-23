var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
var curUsername = "Anonymous"
var curGroupName = "lastChatAccessed"
var curColor = ""
var curIcon = ""

var message = $("#message")
var sendMessage = $("#send_message")
var username = $("#username")
var sendUsername = $("#send_username")
var changeUsername = $("#username")
var chatRoom = $("#chatroom")
var feedback = $('#feedback')
var listOfMessagesPerGroup = {}
var groupName = $("#chatname")
var newGroup = $("#new_group")
var sendGroupChatName = $("#send_group_chat_name")
var newGroupName = ''



$(document).ready(initAll
);

function initAll() {
    handleRadioButtons();
    handleGroupCreationWindow();
    // disableTextarea();
}


function disableTextarea() {
    console.log('disable')
    document.getElementById("message").disabled = true;
}

function accessChatroom(selected, icon) {
    console.log(">>>>>> this is my id: " + selected)
    document.getElementById("chat_name").innerHTML = selected
    curGroupName = selected
    if (selected in listOfMessagesPerGroup) {
        console.log("messages on group: " + selected + listOfMessagesPerGroup[selected])
        // feedback.html(listOfMessagesPerGroup[selected]);
    }
    else {
        console.log("no message")
        
    }
}


function handleRadioButtons() {
    $("input[type='radio']").click(function () {
        console.log("Here");
        var radioValue = $("input[name='color']:checked").val();
        var icon = $("input[name='icon']:checked").val();
        if (radioValue) {
            curColor = radioValue;
            console.log("Color is now " + curColor)
        }
        if (icon) {
            curIcon = icon;
            console.log("icon is : " + curIcon)
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

function hideGroupCreationWindow() {
    var createGroup = document.getElementById("chat_creation");
    var chatroom = document.getElementById("m");
    createGroup.style.display = "none"
    chatroom.style.display = "block"
}

function handleGroupCreationWindow() {
    newGroup.click(function () {
        var createGroup = document.getElementById("chat_creation");
        var divMessage = document.getElementById("m");
        console.log('clicked ' + createGroup.style.display)
        if (!createGroup.style.display || createGroup.style.display == "none") {
            createGroup.style.display = "block";
            divMessage.style.display = "none";
        }
        else {
            createGroup.style.display = "none";
        }
    }
    )

    sendGroupChatName.click(function () {

        console.log("sending group name");
        newGroupName = groupName.val();

        if (newGroupName.trim() !== '') {
            socket.emit('create_new_group', { group_name: newGroupName, icon: curIcon, group_color: curColor });
            groupName.val('');

            console.log("group name:" + newGroupName)

            hideGroupCreationWindow();

            return false;
        }
    })
}

function sendMessageFun() {


    sendMessage.click(function () {
        const timeZone = "UTC"
        const curTime = new Date().toLocaleTimeString("en-GB", { timeZone: timeZone, hour: "numeric", minute: "numeric", second: "numeric" })
        console.log("sendMessage")
        console.log(curTime)
        socket.emit('message', { username: curUsername, message: message.val(), time: curTime, timeZone: timeZone, group: curGroupName })
        message.val('')
    })
}

socket.on('connect', () => {
    console.log("Connected");

    socket.on('message', (data) => {

        console.log("data" + data.username, data.message)
        console.log("on message now")
        const curMessage = "<p class='message'><span style='color: rgb(68, 67, 67)';>" + data.time + "  " + "</span><span style='color:" + data.color + ";'>" + data.username + " <span style='color: white';> $ </span> " + data.message + " </span></p>"
        if (data.group in listOfMessagesPerGroup) {
            console.log("group already accessed: " + listOfMessagesPerGroup[data.group])
            listOfMessagesPerGroup[data.group] += curMessage;
        }
        else {
            console.log("new to group")
            listOfMessagesPerGroup[data.group] = curMessage;
        }
        console.log(listOfMessagesPerGroup[data.group]);
        feedback.html(listOfMessagesPerGroup[data.group]);
    })


    sendUsername.click(function () {

        console.log("sendUsername");
        curUsername = username.val();

        if (curUsername.trim() !== '') {
            socket.emit('change_username', { username: curUsername, color: curColor });
            username.val('');

            hideLogonWindow();
        }
        var span = "<span id='terminal_username' style='color:" + curColor + ";'> ~/" + curUsername + "/</span><span id='chat_name'>" + curGroupName + "</span><span style='color: white;' > $</span>"
        document.querySelector("#info").innerHTML = span
    })

    sendMessageFun();

    socket.on('announce', data => {
        const li = document.createElement('li');
        li.innerHTML = "<button class='chat_link chats' style='color:" + data.group_color + ";' id='" + data.group_name + "' value='" + data.icon + "' ><img src='../static/project_images/" + data.icon + ".png' height='20px' alt=''>" + " " + data.group_name + "</button>";
        document.querySelector('#chats').append(li);

        var a = $(`#${data.group_name}`)
        a.click(function () {
            accessChatroom(this.id, this.value);
            listOfMessagesPerGroup[selected] += "<h5 style='color: white;'><img src='../static/project_images/" + icon + ".png' height='30px' alt=''>  " + selected + "</h5>"
            feedback.html(listOfMessagesPerGroup[selected])
        })
    });
});








// var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
// var curUsername = "Anonymous"
// var curGroupName = "---"
// var curColor = ""
// var curIcon = ""

// var message = $("#message")
// var sendMessage = $("#send_message")
// var username = $("#username")
// var sendUsername = $("#send_username")
// var changeUsername = $("#username")
// var chatRoom = $("#chatroom")
// var feedback = $('#feedback')
// var listOfMessages = ""
// var groupName = $("#chatname")
// var newGroup = $("#new_group")
// var sendGroupChatName = $("#send_group_chat_name")

// $(document).ready(initAll
// );

// function initAll() {
//     handleRadioButtons();
//     handleGroupCreationWindow();
// }

// function handleRadioButtons() {
//     $("input[type='radio']").click(function () {
//         console.log("Here");
//         var radioValue = $("input[name='color']:checked").val();
//         var icon = $("input[name='icon']:checked").val();
//         if (radioValue) {
//             curColor = radioValue;
//             console.log("Color is now " + curColor)
//         }
//         if (icon) {
//             curIcon = icon;
//             console.log("icon is : " + curIcon)
//         }
//     });
// }

// function hideLogonWindow() {
//     var registration = document.getElementById("registration");
//     var m = document.getElementById("m");
//     var i = document.getElementById("message");
//     var s = document.getElementById("send_message");
//     var info = document.getElementById("info");
//     m.style.display = "block";
//     info.style.display = "block";
//     i.style.display = "block";
//     s.style.display = "block";
//     registration.style.display = "none";
// }

// function hideGroupCreationWindow() {
//     var createGroup = document.getElementById("chat_creation");
//     createGroup.style.display = "none"
// }


// function handleGroupCreationWindow() {

//     newGroup.click(function () {
//         console.log('clicked')
//         var createGroup = document.getElementById("chat_creation");
//         var divMessage = document.getElementById("m");
//         if (createGroup.style.display == "none") {
//             createGroup.style.display = "block";
//             divMessage.style.display = "none";

//         }
//         else {
//             createGroup.style.display = "none";
//         }
//     }
//     )

//     sendGroupChatName.click(function () {

//         console.log("sending group name");
//         curGroupName = groupName.val();

//         if (curGroupName.trim() !== '') {
//             groupName.val('');

//             console.log("group name:" + curGroupName)

//             hideGroupCreationWindow();

//             const li = document.createElement('li');
//             li.innerHTML = "<a href='' style='color:" + curColor + ";'><img src='../static/" + curIcon + ".png' height='20px' alt=''>" + curGroupName + "</a>";
//             document.querySelector('#chats').append(li);

//             return false;
//         }
//     })
// }





// socket.on('connect', () => {
//     console.log("Connected");

//     socket.on('message', (data) => {
//         listOfMessages += "<p class='message' style='color:" + curColor + ";'>" + data.username + ": " + data.message + "</p>";
//         feedback.html(listOfMessages);
//     })


//     sendUsername.click(function () {

//         console.log("sendUsername");
//         curUsername = username.val();


//         if (curUsername.trim() !== '') {
//             socket.emit('change_username', { new_username: username.val() });
//             username.val('');

//             hideLogonWindow();

//         }
//         var span = "<span id='terminal_username' style='color:" + curColor + ";'> ~/" + curUsername + "/</span><span id='chat_name'>chat_name $</span>"
//         document.querySelector("#info").innerHTML = span
//     })

//     sendMessage.click(function () {
//         console.log("sendMessage")
//         socket.emit('message', { username: curUsername, message: message.val() })
//         message.val('')
//     })

// });