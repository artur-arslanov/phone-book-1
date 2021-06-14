/*
Date of creation: 20.09.2020
Version: 1.0
Description: None
*/

console.log('SCRIPT "contacts" loaded!');

function contacts() {

    if (contacts.check == true) {
        return;
    }

    notes.check = false;
    
    const NAME_COL_ARR = ["Department", "Name", "Ex. number", "Mob. number", "Email", "Position"];
    const NAME_COL_FOR_OBJ = ["department", "name", "ex_number", "mob_number", "email", "position"];
    
    let $inputArr = [];
    let $main = document.querySelector(".main");
    $main.innerHTML = "";
    let $header = document.createElement("div");
    $header.setAttribute("class", "header");
    let $blockActions = document.createElement("div");
    $blockActions.setAttribute("class", "block_actions");
    let $buttonAddContactBlockActions = document.createElement("button");
    $buttonAddContactBlockActions.innerHTML = "Add contact";
    let $table = document.createElement("div");
    $table.setAttribute("class", "table");
    let $spanHeader = document.createElement("span");
    $spanHeader.innerHTML = "Contacts";

    $header.appendChild($spanHeader);
    $main.appendChild($header);
    $main.appendChild($blockActions);
    $blockActions.appendChild($buttonAddContactBlockActions);
    $main.appendChild($table);

    $buttonAddContactBlockActions.addEventListener("click", addContactWindow);

    buildTable();

    contacts.check = true;



    function buildTable() {

        $table.innerHTML = "";
        let $contacts = document.createElement("table"); // на самом деле, это нода таблицы.
        let $rowHeader = document.createElement("tr");
        let $delete = document.createElement("th");
        $delete.setAttribute("class", "delete");
        let $svgDelete = document.createElement("img");
        $svgDelete.setAttribute("src", "images/delete.svg");

        for (item of NAME_COL_ARR) {
            let $header = document.createElement("th");
            $header.innerHTML = item;
            $rowHeader.appendChild($header);
        }

        $delete.appendChild($svgDelete);
        $table.appendChild($contacts);
        $contacts.appendChild($rowHeader);
        $rowHeader.appendChild($delete);

        sortLocalStorage();
        let cpLocalStorageContacts = JSON.parse(localStorage.getItem("contacts"));

        for (item in cpLocalStorageContacts) {
            let $rowCont = document.createElement("tr");
            for (value in JSON.parse(cpLocalStorageContacts[item])) {
                if (value == "description") {
                    continue;
                }
                let $dataCont = document.createElement("td");
                $dataCont.innerHTML = JSON.parse(cpLocalStorageContacts[item])[value];
                
                $rowCont.appendChild($dataCont);

            }
            addDeleteCol($rowCont);
            $rowCont.addEventListener("click", editDescription);
            $rowCont.addEventListener("mouseenter", (event) => {
                event.currentTarget.style.backgroundColor = "#617073";
            })
            $rowCont.addEventListener("mouseleave", (event) => {
                event.currentTarget.style.backgroundColor = "";
            })
            $rowCont.addEventListener("click", editContact);
            $contacts.appendChild($rowCont);
            
        }

        function sortLocalStorage() {

            let cpLocalStorageContacts = JSON.parse(localStorage.getItem("contacts"));
            let arrKeys = [];

            for (item in cpLocalStorageContacts) {
                item = JSON.parse(cpLocalStorageContacts[item]);
                arrKeys.push(item);
            }

            arrKeys.sort((a, b) => {

                if (a.department > b.department) {
                    return 1;
                }
                if (b.department > a.department) {
                    return -1;
                }

                return 0;
            })

            let contacts = {};

            for (item of arrKeys) {
                contacts[item.name] = JSON.stringify(item);
            }

            localStorage.setItem("contacts", JSON.stringify(contacts));
            
        }

        function addDeleteCol($row) {

            let $delete = document.createElement("td");
            $delete.setAttribute("class", "delete");
            let $svgDelete = document.createElement("img");
            $svgDelete.setAttribute("src", "images/delete.svg");
            
            $delete.appendChild($svgDelete);
            $row.appendChild($delete);
            
            $delete.addEventListener("click", toDeleteRow);

            function toDeleteRow(event) {
                
                let $row;

                if (!(event.target.getAttribute("class") == "delete" || event.target.nodeName == "IMG")) {
                    return;
                }
                if (event.target.nodeName == "TD") {
                    $row = event.target.parentNode;
                } else {
                    $row = event.target.parentNode.parentNode;
                }

                if (confirm(`Вы действительно желаете удалить: ${$row.childNodes[1].innerHTML}?`)) {
                    let cpLocalStorageContacts = JSON.parse(localStorage.getItem("contacts"));
                    delete cpLocalStorageContacts[$row.childNodes[1].innerHTML];
                    localStorage.setItem("contacts", JSON.stringify(cpLocalStorageContacts));
                    buildTable();
                }

                console.log(`Contact: ${$row.childNodes[1].innerHTML} был удалён`);

            }
        }
    }

    function editContact(event) {

        if (!event.ctrlKey) {
            return;
        }

        if (editContact.check == true) {
            return;
        }

        if (editDescription.check || addContactWindow.check || event.target.getAttribute("class") || event.target.nodeName == "IMG") {
            return;
        }
        
        let thatCalled = event.currentTarget;
        let oldName = thatCalled.childNodes[1].innerHTML;
        $inputArr = [];
        let $editContact = document.createElement("div");
        $editContact.setAttribute("class", "add_edit_window");
        let $header = document.createElement("div");
        $header.setAttribute("class", "add_edit_window_header");
        let $spanHeader = document.createElement("span");
        $spanHeader.innerHTML = "Edit contact";
        let $inputBlock = document.createElement("div");
        $inputBlock.setAttribute("class", "input_block_add_edit");
        NAME_COL_FOR_OBJ.number = 0;

        for (item of NAME_COL_FOR_OBJ) {
            
            let $div = document.createElement("div");
            $div.id = item;
            let $span = document.createElement("span");
            let $input = document.createElement("input");
            $span.innerHTML = NAME_COL_ARR[NAME_COL_FOR_OBJ.number];
            NAME_COL_FOR_OBJ.number++
            $input.id = item;

            $div.appendChild($span);
            $div.appendChild($input);
            $inputBlock.appendChild($div);

            $inputArr.push($input);
        }

        let $button = document.createElement("div");
        $button.setAttribute("class", "button_block_add_edit");
        let $buttonSave = document.createElement("button");
        $buttonSave.innerHTML = "Save";
        $buttonSave.id = "save";
        let $buttonClose = document.createElement("button");
        $buttonClose.innerHTML = "Close";
        $buttonClose.id = "close";


        $buttonClose.addEventListener("click", closeEditContactWindow);
        $buttonSave.addEventListener("click", saveEditContact);

        document.body.appendChild($editContact);
        $header.appendChild($spanHeader);
        $editContact.appendChild($header);
        $editContact.appendChild($inputBlock);
        $editContact.appendChild($button);
        $button.appendChild($buttonSave);
        $button.appendChild($buttonClose);

        fillEditContact();

        function saveEditContact() {

            let HTMLcurNode = thatCalled.childNodes[1].innerHTML;
            let cpLocalStorageContacts = JSON.parse(JSON.parse(localStorage.getItem("contacts"))[HTMLcurNode]);

            let person = {
                department: $inputArr[0].value,
                name: $inputArr[1].value,
                ex_number: $inputArr[2].value,
                mob_number: $inputArr[3].value,
                email: $inputArr[4].value,
                position: $inputArr[5].value,
                description: cpLocalStorageContacts.description,
            }
    
            cpLocalStorageContacts = JSON.parse(localStorage.getItem("contacts"));
            delete cpLocalStorageContacts[HTMLcurNode];

            if (!/[?!,.а-яА-ЯёЁ0-9\s]+/.test(person.name)) {
                alert("Please, verify the name input!");
                return;
            }
            cpLocalStorageContacts
            person = JSON.stringify(person);
            cpLocalStorageContacts[$inputArr[1].value] = person;
            localStorage.setItem("contacts", JSON.stringify(cpLocalStorageContacts));
            console.group(`Data's contact: ${$inputArr[1].value} were edited`);
            console.log("The data's contact except description were edited!");
            console.dir(person);
            console.groupEnd();
    
            closeEditContactWindow();
            buildTable();
        }

        function fillEditContact() {
            
            let HTMLcurNode = thatCalled.childNodes[1].innerHTML;
            let cpLocalStorageContactsHTMLcurNode = JSON.parse(JSON.parse(localStorage.getItem("contacts"))[HTMLcurNode]);
            
            for ($item of $inputArr) {
                $item.value = cpLocalStorageContactsHTMLcurNode[$item.id];
            }
        }

        function closeEditContactWindow() {
            $editContact.remove();
            editContact.check = false;
        }

    }

    function editDescription(event) {   

        if(event.ctrlKey) {
            return;
        }

        if (editDescription.check == true) {
            console.log("!");
            return;
        }

        if (editContact.check || addContactWindow.check || event.target.getAttribute("class") || event.target.nodeName == "IMG") {
            return;
        }

        let thatCalled = event.currentTarget;
        let $editDescription = document.createElement("div");
        $editDescription.setAttribute("class", "add_edit_window");
        let $header = document.createElement("div");
        $header.setAttribute("class", "add_edit_window_header");
        let $spanHeader = document.createElement("span");
        $spanHeader.innerHTML = "Edit description";
        let $inputBlock = document.createElement("div");
        $inputBlock.setAttribute("class", "input_block_add_edit");
        let $textarea = document.createElement("textarea");
        $textarea.id = "edit_description";
        fillDescription();
        let $button = document.createElement("div");
        $button.setAttribute("class", "button_block_add_edit");
        let $buttonSave = document.createElement("button");
        $buttonSave.innerHTML = "Save";
        $buttonSave.id = "save";
        let $buttonClose = document.createElement("button");
        $buttonClose.innerHTML = "Close";
        $buttonClose.id = "close";

        document.body.appendChild($editDescription);
        $header.appendChild($spanHeader);
        $editDescription.appendChild($header);
        $editDescription.appendChild($inputBlock);
        $inputBlock.appendChild($textarea);
        $editDescription.appendChild($button);
        $button.appendChild($buttonSave);
        $button.appendChild($buttonClose);

        $buttonSave.addEventListener("click", editDescriptionSave);
        $buttonClose.addEventListener("click", closeEditDescriptiontWindow);

        editDescription.check = true;

        function fillDescription() {

            let HTMLcurNode = thatCalled.childNodes[1].innerHTML;
            let des = JSON.parse(JSON.parse(localStorage.getItem("contacts"))[HTMLcurNode]).description
            $textarea.value = des;

        }
        
        function editDescriptionSave() {

            let cpLocalStorageContacts = JSON.parse(localStorage.getItem("contacts"));
            let HTMLcurNode = thatCalled.childNodes[1].innerHTML;
            let person = JSON.parse(cpLocalStorageContacts[HTMLcurNode]);
            person.description = $textarea.value;
            cpLocalStorageContacts[HTMLcurNode] = JSON.stringify(person);
            localStorage.setItem("contacts", JSON.stringify(cpLocalStorageContacts));

            console.group(`Contact ${HTMLcurNode} was edited`);
            console.log(`Description's contact ${HTMLcurNode} was edited!`);
            console.dir(JSON.parse(cpLocalStorageContacts[HTMLcurNode]));
            console.groupEnd();

            closeEditDescriptiontWindow();

        }

        function closeEditDescriptiontWindow() {
            $editDescription.remove();
            editDescription.check = false;
        }


    }

    function addContactWindow(event) {
        
        if (addContactWindow.check == true) {
            return;
        }

        
        if (editContact.check || editDescription.check || event.target.getAttribute("class") || event.target.nodeName == "IMG") {
            return;
        }
        
        $inputArr = [];
        let $addContact = document.createElement("div");
        $addContact.setAttribute("class", "add_edit_window");
        let $header = document.createElement("div");
        $header.setAttribute("class", "add_edit_window_header");
        let $spanHeader = document.createElement("span");
        $spanHeader.innerHTML = "Add new contact";
        let $inputBlock = document.createElement("div");
        $inputBlock.setAttribute("class", "input_block_add_edit");
        NAME_COL_FOR_OBJ.number = 0;

        for (item of NAME_COL_FOR_OBJ) {

            let $div = document.createElement("div");
            $div.id = item;
            let $span = document.createElement("span");
            let $input = document.createElement("input");
            $span.innerHTML = NAME_COL_ARR[NAME_COL_FOR_OBJ.number];
            NAME_COL_FOR_OBJ.number++

            $div.appendChild($span);
            $div.appendChild($input);
            $inputBlock.appendChild($div);

            $inputArr.push($input);
        }

        let $button = document.createElement("div");
        $button.setAttribute("class", "button_block_add_edit");
        let $buttonSave = document.createElement("button");
        $buttonSave.innerHTML = "Save";
        $buttonSave.id = "save";
        let $buttonClose = document.createElement("button");
        $buttonClose.innerHTML = "Close";
        $buttonClose.id = "close";

        $buttonSave.addEventListener("click", addContact);
        $buttonClose.addEventListener("click", closeAddContactWindow);
        

        document.body.appendChild($addContact);
        $header.appendChild($spanHeader);
        $addContact.appendChild($header);
        $addContact.appendChild($inputBlock);
        $addContact.appendChild($button);
        $button.appendChild($buttonSave);
        $button.appendChild($buttonClose);
        
        function addContact() {

            let person = {
                department: $inputArr[0].value,
                name: $inputArr[1].value,
                ex_number: $inputArr[2].value,
                mob_number: $inputArr[3].value,
                email: $inputArr[4].value,
                position: $inputArr[5].value,
                description: "",
            }
    
            cpLocalStorageContacts = JSON.parse(localStorage.getItem("contacts"));

            if (!/[?!,.а-яА-ЯёЁ0-9\s]+/.test(person.name)) {
                alert("Please, verify the name input!");
                return;
            }
            if (cpLocalStorageContacts[person.name] !== undefined) {
                alert(`The contact ${person.name} has already existed!`);
                return;
            }

            person = JSON.stringify(person);
            cpLocalStorageContacts[$inputArr[1].value] = person;
            localStorage.setItem("contacts", JSON.stringify(cpLocalStorageContacts));
            console.group(`New contact: ${$inputArr[1].value}`);
            console.log("The new contact was added!");
            console.dir(person);
            console.groupEnd();
    
            closeAddContactWindow();
            buildTable();
    
        }
    
        function closeAddContactWindow() {
            $addContact.remove();
            addContactWindow.check = false;
        }
    }
}