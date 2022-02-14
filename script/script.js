const welcome = document.querySelector(".welcome");
const main = document.querySelector("main");
const buttonPeoplesHeader = document.querySelector("header ion-icon");
const sideBar = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const planeFooter = document.querySelector("footer ion-icon");
let inputUsername = document.querySelector(".welcome input");
let interval = null;
let intervalMessages = null;
let username = "";
let newMessage = "";
let oldMessage = "";

function acessChat() {
  username = inputUsername.value;
  document.querySelector(".input").classList.add("hidden");
  document.querySelector(".welcome button").classList.add("hidden");
  document.querySelector(".loading").classList.remove("hidden");

  let promiseEnterChat = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/participants",
    { name: username }
  );
  promiseEnterChat.then(sucessEnterChat);
  promiseEnterChat.catch(failedEnterChat);
}

function sucessEnterChat(code) {
  welcome.classList.toggle("hidden");
  getMessages();
  getUsers();
  intervalMessages = setInterval(getMessages, 3000);
  interval = setInterval(keepConnection, 5000);
  setInterval(getUsers, 10000);
}

function failedEnterChat(erro) {
  const alertIcon = document.querySelector(".input ion-icon");
  const alertText = document.querySelector(".welcome h3");
  if (erro.response.status === 400) {
    inputUsername.value = "";
    alertIcon.classList.remove("hidden");
    alertText.classList.remove("hidden");
    alertIcon.parentElement.classList.toggle("shake");
    document.querySelector(".input").classList.remove("hidden");
    document.querySelector(".welcome button").classList.remove("hidden");
    document.querySelector(".loading").classList.add("hidden");
  }
}

function keepConnection() {
  let promiseKeepConnection = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/status",
    { name: username }
  );
  promiseKeepConnection.catch(stopConnection);
}

function getMessages() {
  let promiseGetMessages = axios.get(
    "https://mock-api.driven.com.br/api/v4/uol/messages"
  );
  promiseGetMessages.then(renderMessages);
  promiseGetMessages.catch(unRenderMessages);
}

function renderMessages(response) {
  let messageStatusFactory = "";
  let messageFactory = "";
  let arrayMessages = [];
  arrayMessages = response.data;
  main.innerHTML = "";
  for (let i = 0; i < arrayMessages.length; i++) {
    if (arrayMessages[i].type === "status") {
      main.innerHTML += `<article data-identifier="message" class="${arrayMessages[i].type}">
        <p>
          <span class="time">${arrayMessages[i].time}</span>
          <span>${arrayMessages[i].from}</span>
          ${arrayMessages[i].text}
        </p>
      </article>`;
    } else if (arrayMessages[i].type === "message") {
      main.innerHTML += `<article data-identifier="message" class="${arrayMessages[i].type}">
        <p>
          <span class="time">${arrayMessages[i].time}</span>
          <span>${arrayMessages[i].from}</span> para 
          <span>${arrayMessages[i].to}</span>: 
          ${arrayMessages[i].text}
        </p>
      </article>`;
    } else if (arrayMessages[i].type === "private_message") {
      main.innerHTML += `<article data-identifier="message" class="${arrayMessages[i].type}">
        <p>
          <span class="time">${arrayMessages[i].time}</span>
          <span>${arrayMessages[i].from}</span> reservadamente para 
          <span>${arrayMessages[i].to}</span>: 
          ${arrayMessages[i].text}
        </p>
      </article>`;
    }
  }
  newMessage = document.querySelector("article:last-child");
  if (newMessage.innerHTML !== oldMessage.innerHTML) {
    newMessage.scrollIntoView();
    oldMessage = newMessage;
  }
}

function unRenderMessages(error) {
  alert("Error to render the messages");
  console.log(error.response);
}

function sendMessage() {
  let text = document.querySelector("footer input");
  let objMessage = {
    from: username,
    to: "Todos",
    text: text.value,
    type: "message",
  };
  const promiseSendMessage = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/messages",
    objMessage
  );
  text.value = "";
  promiseSendMessage.catch(errorSendMessage);
}

function errorSendMessage(error) {
  alert("Failed to send the message");
}

function stopConnection() {
  clearInterval(interval);
}
function openAndCloseSideBar() {
  toggleHiddenClass([buttonPeoplesHeader, sideBar, overlay, planeFooter]);
}

function toggleHiddenClass(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].classList.toggle("hidden");
  }
}
let fatherElement = null;

function checkChoice(element) {
  const check = element.querySelector(".check");
  fatherElement = element.parentNode;
  unselectOption(fatherElement);
  check.classList.remove("hidden");
  check.classList.add("selected");
}

function unselectOption(element) {
  const elementSelected = element.querySelector(".selected");
  if (elementSelected !== null) {
    elementSelected.classList.remove("selected");
    elementSelected.classList.add("hidden");
  }
}

function getUsers() {
  const promiseUsers = axios.get(
    "https://mock-api.driven.com.br/api/v4/uol/participants"
  );
  promiseUsers.then(showUsers);
  promiseUsers.catch(errorUsers);
}

let arrayUsers = [];
function showUsers(response) {
  arrayUsers = response.data;
  let usersOnline = document.querySelector(".person-send-message");
  usersOnline.innerHTML = `
        <h3>Escolha um contato para enviar mensagem:</h3>
        <div class="person check" onclick="checkChoice(this)">
          <span>
            <ion-icon name="people-sharp"></ion-icon>
            <p>Todos</p></span>
          <ion-icon name="checkmark-sharp" class="check hidden"></ion-icon>
        </div>`;

  for (let i = 0; i < arrayUsers.length; i++) {
    usersOnline.innerHTML += `
      <div class="person" onclick="checkChoice(this)">
        <span>
        <ion-icon name="person-circle-sharp"></ion-icon>
        <p>${arrayUsers[i].name}</p></span>
        <ion-icon name="checkmark-sharp" class="check hidden"></ion-icon>
      </div>`;
  }
}

function errorUsers(erro) {
  alert("Error to loading users");
}
