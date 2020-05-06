$(document).ready(initAll);


function initAll() {
    console.log("InitAll")
    var socket = new SocketConnector();
    socket.io.on(SocketEvents.Connect, () => {
        var user = new User(socket);
        var chat = new Chat(socket, user);
    })
}

var curChatroom = ''

class SocketEvents {
    static Connect = 'connect'
    static SendUserName = 'send_username'
    static Message = 'message'
    static SendGroupName = 'send_group_name'
    static RequestUpdates = 'request_updates'

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
        this.alertDiv = $('#alert_div');
        this.username = '';
        this.color = '';

        this.checkAndRegister();
    }

    requestExistentGroups() {
        this.socket.io.emit(SocketEvents.RequestUpdates);
    }
    
    registerUser() {
        this.username = this.usernameInputField.val();
        console.log(this.username, this.color)

        if (this.username.trim() !== '' && this.username.length > 0) {
            this.socket.io.emit(SocketEvents.SendUserName, { username: this.username, color: this.color});
        } else {
            let alert = '<div class="alert alert-warning alert-dismissible fade show" role="alert" style="font-weight:bolder;"><strong style="color:#fb9767;">Oooops</strong> you need a username :) <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"  style="color: #fb9767;">&times;</span></button></div>'
            this.alertDiv.append(alert)
        }

        this.socket.io.on(SocketEvents.SendUserName, (data) => {
            if (data['available']) {
                localStorage.setItem('username', this.username);
                localStorage.setItem('color', this.color);
                this.requestExistentGroups();
            } else {
                let alert = '<div class="alert alert-success alert-dismissible fade show" role="alert" style="font-weight:bolder;"><strong style="color:#fb9767;">Holy guacamole!</strong> username is not avalible, please try again :) <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"  style="color: #fb9767;">&times;</span></button></div>'
                this.alertDiv.append(alert)
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
            this.requestExistentGroups();
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
    static createLiElement(data)
    {
        // // return element
        // const groupLiElement = document.createElement('li')
        // groupLiElement.innerHTML = `<a><span style="color:${updates[key][group]['groupColor']};" ><img src="../static/project_images/${updates[key][group]['groupIcon']}.png" height="20vh">  ${updates[key][group]['groupName']}</span></a>`
        // groupLiElement.setAttribute('class', "nav-item")
        // groupLiElement.setAttribute('id', `${updates[key][group]['groupName']}_li`)
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
    }

    createReceiveExistenteGroupsHandler() {

        this.socket.io.on(SocketEvents.RequestUpdates, (updates) => {
            for (var key in updates) {
                if (key == 'groups') {
                    for (var group in updates[key]) {
                        const groupLiElement = document.createElement('li')
                        groupLiElement.innerHTML = `<a><span style="color:${updates[key][group]['groupColor']};" ><img src="../static/project_images/${updates[key][group]['groupIcon']}.png" height="20vh">  ${updates[key][group]['groupName']}</span></a>`
                        groupLiElement.setAttribute('class', "nav-item")
                        groupLiElement.setAttribute('id', `${updates[key][group]['groupName']}_li`)
                        this.groupChatList.append(groupLiElement)

                        const groupTab = `<a class="nav-item nav-link btn-dark" id="${updates[key][group]['groupName']}" data-toggle="tab" href="#${updates[key][group]['groupName']}_div" role="tab" aria-controls="${updates[key][group]['groupName']}" aria-selected="false" onclick="accessChatroom(this.id)"><span><img src="../static/project_images/${updates[key][group]['groupIcon']}.png" height="25vh"> ${updates[key][group]['groupName']}</span></a>`
                        const group_div = `<div class="tab-pane fade" id="${updates[key][group]['groupName']}_div" role="tabpanel" aria-labelledby="${updates[key][group]['groupName']}"></div>`
                        this.navTabsDiv.append(groupTab)
                        this.chatroomDiv.append(group_div)
                        $(`#${updates[key][group]['groupName']}_div`).append(updates[key][group]['messages'])
                    }
                }
                else if (key == 'users') {
                    for (var user in updates[key]) {
                        const userLiElement = document.createElement('li')
                        userLiElement.innerHTML = `<a><span style="color:${updates[key][user]['color']};" >${updates[key][user]['username']}</span></a>`
                        userLiElement.setAttribute('class', "nav-item")
                        userLiElement.setAttribute('id', `${updates[key][user]['username']}_li`)
                        this.privateChatsList.append(userLiElement)

                        // TODO create open tab system and generate divs and tabs for private chats
                    }
                }
            }
        })
    }

    createReceiveMessageHandler() {
        this.socket.io.on(SocketEvents.Message, (data) => {
            $(`#${data['group']}`).append(data['message'])
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

            if (data['available']) {
                const groupLiElement = document.createElement('li')
                groupLiElement.innerHTML = `<a><span style="color:${data['groupColor']};" ><img src="../static/project_images/${data['groupIcon']}.png" height="20vh">  ${data['groupName']}</span></a>`
                groupLiElement.setAttribute('class', "nav-item")
                groupLiElement.setAttribute('id', `${data['groupName']}_li`)
                this.groupChatList.append(groupLiElement)

                const groupTab = `<a class="nav-item nav-link btn-dark" id="${data['groupName']}" data-toggle="tab" href="#${data['groupName']}_div" role="tab" aria-controls="${data['groupName']}" aria-selected="false" onclick="accessChatroom(this.id)"><span><img src="../static/project_images/${data['groupIcon']}.png" height="25vh"> ${data['groupName']}</span></a>`
                const group_div = `<div class="tab-pane fade" id="${data['groupName']}_div" role="tabpanel" aria-labelledby="${data['groupName']}"></div>`
                this.navTabsDiv.append(groupTab)
                this.chatroomDiv.append(group_div)
            } else {
                var alert = '<div class="alert alert-info alert-dismissible fade show" role="alert"><strong>Holy guacamole!</strong> Ooops, there is a group with that name, please try again <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                $('#chatroom_div').append(alert)
            }
        })
    }

    createNewGroupChatHandler() {
        this.handleIconRadioButtons();
        this.saveGroupNameButton.click(() => {
            let newGroupName = this.groupNameInput.val()

            if (newGroupName.trim() !== '') {
                this.socket.io.emit(SocketEvents.SendGroupName, { groupName: newGroupName, groupColor: this.user.color, groupIcon: this.icon})
                this.groupNameInput.val('');
            }else {
                var alert = '<div class="alert alert-info alert-dismissible fade show" role="alert"><strong>Holy guacamole!</strong> Ooops, please enter group name <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                $('#chatroom_div').append(alert)
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
    curChatroom = `${clicked_id}_div`;
}
