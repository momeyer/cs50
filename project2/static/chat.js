$(document).ready(initAll);


function initAll() {
    console.log("InitAll")
    var socket = new SocketConnector();
    socket.io.on(SocketEvents.Connect, () => {
        var user = new User(socket);
        var chat = new Chat(socket, user);

        window.addEventListener("beforeunload", () => {
            // var confirmationMessage = "---";

            // (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            // return confirmationMessage;                            //Webkit, Safari, Chrome
            console.log('disconected', user.username)
            socket.io.emit(SocketEvents.ChangeOfStatus, { username: user.username, color: user.color, status: false })
        });

    })

}

var curChatroom = ''

class SocketEvents {
    static Connect = 'connect'
    static SendUserName = 'send_username'
    static Message = 'message'
    static SendGroupName = 'send_group_name'
    static RequestUpdates = 'request_updates'
    static NewUser = 'new_user'
    static ChangeOfStatus = 'change_of_status'
}

class SocketConnector {
    constructor() {
        this.io = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    }
}

class User {
    constructor(socket) {
        this.socket = socket;

        this.createNewGroupButton = $("#new_group_button");
        this.sendUsernameButton = $("#save_username_button");
        this.usernameInputField = $("#username_input_field");
        this.registrationModal = $('#registration_modal');
        this.username = '';
        this.color = '';
        this.status = '';

        this.checkAndRegister();
    }


    requestExistentGroups() {
        this.socket.io.emit(SocketEvents.RequestUpdates);
        console.log('request')
    }

    registerUser() {
        this.username = this.usernameInputField.val();
        this.status = true;
        console.log(this.username, this.color, this.status)

        if (this.username.trim() !== '' && this.username.length > 0) {

            this.socket.io.emit(SocketEvents.SendUserName, { username: this.username, color: this.color, status: this.status });
        } else {
            HTMLUtils.createAlert('warning', 'Oooops', 'you need a username :)', 'orange')
        }

        this.socket.io.on(SocketEvents.SendUserName, (data) => {
            if (data.available) {
                console.log('available')
                localStorage.setItem('username', this.username);
                localStorage.setItem('color', this.color);
                this.status = data.status
                this.requestExistentGroups();
                this.socket.io.emit(SocketEvents.ChangeOfStatus, { username: this.username, color: this.color, status: this.status })
            } else {
                HTMLUtils.createAlert('warning', 'Holy guacamole!', 'username is not avalible, please try again :)', data.color)
            }
        })
    }

    checkAndRegister() {
        if (!localStorage.getItem("username")) {
            this.registrationModal.modal('show')
            this.handleColorRadioButtons();
            this.sendUsernameButton.click(() => {
                this.registerUser()
            })
        }
        else {
            this.username = localStorage.getItem('username')
            this.color = localStorage.getItem('color')
            this.status = true
            this.requestExistentGroups();

            HTMLUtils.createAlert('success', 'Welcome back', `${this.username}!`, this.color)
            this.socket.io.emit(SocketEvents.ChangeOfStatus, { username: this.username, color: this.color, status: this.status })
        }
    }

    handleColorRadioButtons() {
        $("input[type='radio']").click(() => {
            var color = $("input[name='color']:checked").val();
            if (color) {
                this.color = color;
            }
        });
    }
}


class HTMLUtils {
    static createUserLiElement(username, color, status) {
        const userLiElement = document.createElement('li')
        userLiElement.innerHTML = `<a class="nav-link" onclick="accessPrivateChat('${username}')" id="${username}" data-toggle="pill" href="#${username}_div" role="tab" aria-controls="${username}_div" aria-selected="false"><span class='status'><svg  id='${username}_status' class="bi bi-circle-fill online_sign" width="0.5em" height="0.5em" viewBox="0 0 16 16" fill="${status}" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8"/></svg></span><span style="color:${color};" >${username}</span></a>`
        return userLiElement
    }
    static createGroupLiElement(groupName, color, icon) {
        const groupLiElement = document.createElement('li')
        console.log('group name', groupName)
        groupLiElement.innerHTML = `<a class="nav-link" onclick="accessChatroom('${groupName}')" id="${groupName}" data-toggle="pill" href="#${groupName}_div" role="tab" aria-controls="${groupName}_div" aria-selected="false"><span style="color:${color};" ><img src="../static/project_images/${icon}.png" height="20vh">  ${groupName}</span></a>`
        return groupLiElement
    }

    static createTabDiv(name, icon) {
        return `<div class="tab-pane fade" id="${name}_div" role="tabpanel" aria-labelledby="${name}"><h6><img src="../static/project_images/${icon}.png" height="35vh"> - ${name}<h6></div>`
    }
    static createPrivateTabDiv(name) {
        return `<div class="tab-pane fade" id="${name}_div" role="tabpanel" aria-labelledby="${name}">...</div>`
    }

    static createAlert(type, message1, message2, color) {
        const alert = `<div class="alert alert-${type} alert-dismissible fade show" role="alert"><strong style="color: ${color};" >   ${message1} </strong>${message2}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
        $('#chatroom_div').append(alert)
    }

    static updateStatus(status) {
        if (status) {
            return '#a9dc76'
        }
        else {
            return '#222222';
        }
    }
}

class Chat {
    constructor(socket, user) {
        this.socket = socket
        this.user = user;

        this.sendMessageButton = $("#send_message_button");
        this.saveGroupNameButton = $("#save_group_name_button");
        this.groupNameInput = $('#group_name_input');
        this.messageTextArea = $("#message_textarea");
        this.groupChatList = $('#group_chats_list');
        this.navTabsDiv = $('#nav-tab');
        this.chatroomDiv = $('#chatroom_div');
        this.privateChatsList = $('#private_chats_list')

        this.timeZone = "UTC";
        this.icon = '';

        this.createReceiveMessageHandler();
        this.createSendMessageHandler();
        this.createNewGroupChatHandler();
        this.createReceiveNewGroupHandler();
        this.createReceiveExistenteGroupsHandler();
        this.createUserStatusHandler();
        this.createReceiveNewUserHandler();
    }

    createReceiveExistenteGroupsHandler() {

        this.socket.io.on(SocketEvents.RequestUpdates, (updates) => {
            console.log('requested data', updates)
            for (var key in updates) {
                if (key == 'groups') {
                    for (var group in updates[key]) {
                        console.log(updates[key][group].groupName)
                        var groupLiElement = HTMLUtils.createGroupLiElement(updates[key][group].groupName, updates[key][group].groupColor, updates[key][group].groupIcon)
                        this.groupChatList.append(groupLiElement)
                        console.log(groupLiElement)
                        var groupTabDiv = HTMLUtils.createTabDiv(updates[key][group].groupName, updates[key][group].groupIcon)
                        this.chatroomDiv.append(groupTabDiv)
                        console.log("access by id: ", updates[key][group].groupName)
                        $(`#${updates[key][group].groupName}_div`).append(updates[key][group].messages)
                    }
                }
                else if (key == 'users') {
                    for (var user in updates[key]) {
                        var status = HTMLUtils.updateStatus(updates[key][user].status)

                        const userLiElement = HTMLUtils.createUserLiElement(updates[key][user].username, updates[key][user].color, status)
                        this.privateChatsList.append(userLiElement)

                        const userDiv = HTMLUtils.createPrivateTabDiv(updates[key][user].username)
                        this.chatroomDiv.append(userDiv)

                    }
                }
            }
        })
    }

    createUserStatusHandler() {
        this.socket.io.on('disconect', (data) => {
            var status = HTMLUtils.updateStatus(data.status)
            console.log("disocnected", data)
            document.getElementById(`${data.username}_status`).setAttribute("fill", "#222222")

        })
    }

    createReceiveNewUserHandler() {
        this.socket.io.on(SocketEvents.NewUser, (data) => {
            if (data.status) {
                var status = '#a9dc76'
                console.log('true')
            }
            else {
                console.log('false')

                var status = '#222222'
            }
            const userLiElement = HTMLUtils.createUserLiElement(data.username, data.color, status)
            this.privateChatsList.append(userLiElement)
            console.log('new ', data)
        })
    }

    createReceiveMessageHandler() {
        this.socket.io.on(SocketEvents.Message, (data) => {
            $(`#${data.group}`).append(data.message)
        })
    }

    createSendMessageHandler() {
        this.sendMessageButton.click(() => {
            var message = this.messageTextArea.val()
            const curTime = new Date().toLocaleTimeString("en-GB", { timeZone: this.timeZone, hour: "numeric", minute: "numeric", second: "numeric" })
            var str_msg = `<p class='message'><span style='color: rgb(68, 67, 67)';>${curTime}  </span><span style='color:${this.user.color};'>${this.user.username}<span style='color: white';> $ </span> ${message}</span></p>`
            this.socket.io.emit(SocketEvents.Message, { message: str_msg, group: curChatroom })
            this.messageTextArea.val('')
        })
    }

    createReceiveNewGroupHandler() {
        this.socket.io.on(SocketEvents.SendGroupName, data => {
            if (data.available) {
                var groupLiElement = HTMLUtils.createGroupLiElement(data.groupName, data.groupColor, data.groupIcon)
                this.groupChatList.append(groupLiElement)
                console.log(groupLiElement)
                var groupTabDiv = HTMLUtils.createTabDiv(data.groupName, data.groupIcon)
                this.chatroomDiv.append(groupTabDiv)

            } else {
                HTMLUtils.createAlert('success', 'Ooops', 'sorry, name is not available, try again', data.groupColor)
            }
        })
    }

    createNewGroupChatHandler() {
        this.handleIconRadioButtons();
        this.saveGroupNameButton.click(() => {
            let newGroupName = this.groupNameInput.val()

            if (newGroupName.trim() !== '') {
                this.socket.io.emit(SocketEvents.SendGroupName, { groupName: newGroupName, groupColor: this.user.color, groupIcon: this.icon })
                this.groupNameInput.val('');
            } else {
                HTMLUtils.createAlert('warning', 'Holy guacamole!', 'Ooops, please enter group name ', 'orange')
            }
        })
    }

    handleIconRadioButtons() {
        $("input[type='radio']").click(() => {
            var icon = $("input[name='icon']:checked").val();
            if (icon) {
                this.icon = icon;
            }
        });
    }

}

function accessChatroom(clicked_id) {
    curChatroom = `${clicked_id}_div`
}


function accessPrivateChat(clicked_id) {
    a = `${clicked_id}_div`
}