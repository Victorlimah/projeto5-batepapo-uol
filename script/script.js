const welcome = document.querySelector(".welcome");
const buttonPeoplesHeader = document.querySelector("header ion-icon");
const sideBar = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const planeFooter = document.querySelector("footer ion-icon");
let inputUsername = document.querySelector(".welcome input");

function acessChat() {
  const username = inputUsername.value;
  const objName = { name: username };
  let promisseEnterChat = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/participants",
    objName
  );
  promisseEnterChat.then(sucessEnterChat);
  promisseEnterChat.catch(failedEnterChat);
}

function sucessEnterChat(code) {
  welcome.classList.toggle("hidden");
}

function failedEnterChat(erro) {
  if (erro.response.status === 400) {
    inputUsername.value = "";
  }
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
