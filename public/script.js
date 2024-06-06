const socket = io();

// This will hide the chat-box for the new User
document.querySelectorAll(".chat-container")[1].style.display = "none";

const inputBox = document.querySelector(".input-box");
const sendButton = document.querySelector(".send-btn");
const chat = document.querySelector(".chat");

sendButton.addEventListener("click", () => {
  const textMessage = inputBox.value;
  inputBox.value = "";

  // Emitting an event using socket
  socket.emit("send-msg", { msg: textMessage });
});

// Showing the msg in chat-box, we sent via chat-box

socket.on("received-msg", (data) => {
  // console.log(data);
  const div = document.createElement("div");

  if (data.id === socket.id) {
    div.classList.add("message", "sender");
  } else {
    div.classList.add("message", "receiver");
  }

  div.innerHTML = `<strong>${data.username}</strong> - <span>${data.msg}</span>`;

  //After creating the div of the user msg now we need to append it in chat-box
  chat.append(div);
});

// If the user set the Username then the Chat-box will be visible and set Username will be hidden for the user

const loginName = document.querySelector("#login-name");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", () => {
  const username = loginName.value;
  loginName.value = "";

  // Handling a case if user put nothing in the username input
  if (username === "") {
    return;
  }

  //   Sending the username to backend
  socket.emit("login", { username });
  //   Hiding the Set-Username and showing the Chat-box
  document.querySelectorAll(".chat-container")[0].style.display = "none";
  document.querySelectorAll(".chat-container")[1].style.display = "block";
});
