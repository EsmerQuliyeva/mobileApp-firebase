import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
const appSettings = {
  databaseURL: "https://mobileapp-ccfda-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const addBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

addBtn.addEventListener("click", () => {
  const inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
  console.log(`${inputValue} added to cart`);
  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    const itemsArr = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < itemsArr.length; i++) {
      let currentItem = itemsArr[i];
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here ... yet";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}
function clearInputFieldEl() {
  inputField.value = "";
}
function appendItemToShoppingListEl(item) {
  let itemId = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.addEventListener("dblclick", () => {
    let exactLocation = ref(database, `shoppingList/${itemId}`);
    remove(exactLocation);
  });
  shoppingListEl.append(newEl);
}
