/*
Date of creation: 26.09.2020
Version: 1.0
Description: None
*/

console.log('SCRIPT "notes" loaded!');


function notes() {

    if (notes.check == true) {
        return;
    }

    contacts.check = false;

    let $main = document.querySelector(".main");
    $main.innerHTML = "";
    let $header = document.createElement("div");
    $header.setAttribute("class", "header");
    let $blockActions = document.createElement("div");
    $blockActions.setAttribute("class", "block_actions");
    let $buttonAddNoteBlockActions = document.createElement("button");
    $buttonAddNoteBlockActions.innerHTML = "Add note";
    let $spanHeader = document.createElement("span");
    $spanHeader.innerHTML = "Notes";
    let $table = document.createElement("div");
    $table.setAttribute("class", "table");


    $header.appendChild($spanHeader);
    $main.appendChild($header);
    $main.appendChild($blockActions);
    $blockActions.appendChild($buttonAddNoteBlockActions);
    $main.appendChild($table);

    $buttonAddNoteBlockActions.addEventListener("click", addNoteWindow);

    function addNoteWindow(event) {
        
        if (addNoteWindow.check == true) {
            return;
        }

        /*
        if (editContact.check || addNote.check || event.target.getAttribute("class") || event.target.nodeName == "IMG") {
            return;
        }
        */
        
       let thatCalled = event.currentTarget;
       let $addNote = document.createElement("div");
       $addNote.setAttribute("class", "add_edit_window");
       let $header = document.createElement("div");
       $header.setAttribute("class", "add_edit_window_header");
       let $spanHeader = document.createElement("span");
       $spanHeader.innerHTML = "Add new note";
       let $inputBlock = document.createElement("div");
       $inputBlock.setAttribute("class", "input_block_add_edit");
       let $textarea = document.createElement("textarea");
       $textarea.id = "add_note";
       let $button = document.createElement("div");
       $button.setAttribute("class", "button_block_add_edit");
       let $buttonSave = document.createElement("button");
       $buttonSave.innerHTML = "Save";
       $buttonSave.id = "save";
       let $buttonClose = document.createElement("button");
       $buttonClose.innerHTML = "Close";
       $buttonClose.id = "close";

       document.body.appendChild($addNote);
       $header.appendChild($spanHeader);
       $addNote.appendChild($header);
       $addNote.appendChild($inputBlock);
       $inputBlock.appendChild($textarea);
       $addNote.appendChild($button);
       $button.appendChild($buttonSave);
       $button.appendChild($buttonClose);

       $buttonSave.addEventListener("click", addNote());

       function addNote() {
        let date = new Date();
        let cpLocalStorageNotes = JSON.parse(localStorage.getItem("notes"));
        let newNote = {};
        newNote.time = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        newNote.description = $textarea.value;
        cpLocalStorageNotes[date.getTime()] = JSON.stringify(newNote);
        localStorage.setItem("notes", JSON.stringify(cpLocalStorageNotes));

        console.log(`New node was added!`);
       }
    
    }

    notes.check = true;
}
