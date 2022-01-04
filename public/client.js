const socket = io()
const messageBox = document.getElementById('message-box')
const messageArea = document.querySelector('.message-area')
const notificationSound = document.getElementById('notification-sound')

// take user name
let username;
do{
    username = prompt('Enter your username').trim()
}while(!username)


messageBox.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        // call send msg method
        sendMessage(e.target.value)
        // clear text
        messageBox.value = ''
    }
})


// send msg
function sendMessage(message){
    let msg = {
        user: username,
        message: message.trim()
    }
    // append into html
    appendMessage(msg, 'outgoing')
    // scrool to bottom
    scrollToBottom()
    
    // send to server
    socket.emit('message', msg)
}


// append msg
function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    mainDiv.classList.add(type, 'message')

    let markup
    if(type === 'outgoing'){
        markup = `
            <h4></h4>
            <p>${msg.message}</p>
        `
    }
    else{
        markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
        `
    }

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// receive msg
socket.on('message', msg => {
    notificationSound.play()
    appendMessage(msg, 'incoming')
})


// scroll to bottom when msg arrives or sent
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}