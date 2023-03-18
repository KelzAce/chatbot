// Socket connection to the server
const socket = io();

// Query DOM elements
const inputField = document.getElementById("input");
const chatBox = document.getElementById("chatContainer");
const sendButton = document.getElementById("send");

// Helper function to append a message to the chat box
function appendMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = "message-text";
  messageElement.id = sender;
  messageElement.textContent = message;

  const timestamp = new Date().toLocaleTimeString(); // create timestamp
  const timestampElement = document.createElement("span"); // create span element for timestamp
  timestampElement.className = "timestamp";
  timestampElement.textContent = timestamp;

  const messageContainer = document.createElement("div");
  const messageOuterContainer = document.createElement("div");
  messageContainer.className = "message-container " + sender;
  messageOuterContainer.className = "message-outer-container " + sender;
  messageElement.innerHTML = message.replace(/\n/g, "<br>");
  messageOuterContainer.appendChild(messageContainer);
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(timestampElement);
  chatBox.appendChild(messageOuterContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handling sending messages
function sendMessage() {
  const message = inputField.value;
  if (message === "") {
    return;
  }
  appendMessage(message, "user");
  socket.emit("user-message", message);
  inputField.value = "";
}

// Handling receiving messages from the server
socket.on("bot-message", (message) => {
  appendMessage(message, "bot");
});

// Attaching event listeners
sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
