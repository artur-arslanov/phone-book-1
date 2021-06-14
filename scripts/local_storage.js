/*
Date of creation: 20.09.2020
Version: 1.0
Description: None
*/

console.log('SCRIPT "local_storage" loaded!');

initLocalStorage();

function initLocalStorage() {

    if (localStorage.yes == undefined) {
        localStorage.setItem("contacts", JSON.stringify({}));
        localStorage.setItem("notes", JSON.stringify({}));
        localStorage.yes = true;
        alert("localStorage was empty, but now it's fill!");
    }
}