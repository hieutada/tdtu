var connected = false
var socket = io('http://localhost:8080')

socket.emit('setup', getID)

socket.on('connected', ()=>{
    connected = true
    
})

function emitNoti(noti){
    socket.emit('create noti', noti)
}

socket.on('show noti', noti =>{
    showNoti(noti)
})