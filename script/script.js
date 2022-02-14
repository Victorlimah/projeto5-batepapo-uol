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
  intervalMessages = setInterval(getMessages, 1500);
  interval = setInterval(keepConnection, 5000);
}

function failedEnterChat(erro) {
  if (erro.response.status === 400) {
    inputUsername.value = "";
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
      main.innerHTML += `<article class="${arrayMessages[i].type}">
        <p>
          <span class="time">${arrayMessages[i].time}</span>
          <span>${arrayMessages[i].from}</span>
          ${arrayMessages[i].text}
        </p>
      </article>`;
    } else {
      main.innerHTML += `<article class="${arrayMessages[i].type}">
        <p>
          <span class="time">${arrayMessages[i].time}</span>
          <span>${arrayMessages[i].from}</span> para 
          <span>${arrayMessages[i].to}</span>: 
          ${arrayMessages[i].text}
        </p>
      </article>`;
    }
    newMessage = document.querySelector("article:last-child");
    if (newMessage.innerHTML !== oldMessage.innerHTML) {
      newMessage.scrollIntoView();
      oldMessage = newMessage;
    }
  }
  getMessages();
}

function unRenderMessages(error) {
  alert("Error to render the messages");
  console.log(error.response);
}

function stopConnection() {
  clearInterval(interval);
}
function openAndCloseSideBar() {
  buttonPeoplesHeader.classList.toggle("hidden");
  sideBar.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  planeFooter.classList.toggle("hidden");
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
