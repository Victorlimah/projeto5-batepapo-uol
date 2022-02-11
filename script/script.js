// TESTE PARA TENTAR COMMIT NO LINUX

const buttonPeoplesHeader = document.querySelector("header ion-icon");
const sideBar = document.querySelector("nav");

function openAndCloseSideBar() {
  buttonPeoplesHeader.classList.toggle("hidden");
  sideBar.classList.toggle("hidden");
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
