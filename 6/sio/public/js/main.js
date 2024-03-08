var username = "unknown"
function myfunction(){
	username = prompt("Please enter your name","unknown")
}

let socket = io()

socket.on("connect", () => {
	//console.log("connected to server")
	msg = `<span class="text-success">${username} has connected</span>`
	socket.emit("chat", msg)
})

socket.on("message", (msg) => {
	printMessage(msg)
})

socket.on("clientChange", (clients) => {
	document.querySelector("#number").innerHTML = clients + " clients connected"
})

document.getElementById("discon").onclick = function(){
	socket.emit('chat', `<span class="text-danger">${username} has disconnected</span>`)
	socket.close()
}

function sub(){
	let input = document.getElementById("message")
	let msg = `<b>${username}</b>: ${input.value}`
	socket.emit("chat", msg)
}

document.forms[0].onsubmit = sub

function printMessage(message){
	var p = document.createElement("p")
	p.innerHTML = message
	document.querySelector("div#messages").appendChild(p)
}