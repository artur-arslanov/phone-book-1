/*
Date of creation: 20.09.2020
Version: 1.0
Description: None
*/

console.log('SCRIPT "sidebar_change_color_button" loaded!');


sidebarChangeColorButton();


function sidebarChangeColorButton() {

    let $main = document.querySelector(".main");

    const SIDEBAR_SECONDARY_COLOR_BUTTON = "rgb(122, 147, 172)";

    let $divSideBar = document.querySelectorAll(".sidebar div");
    let $prevSidebarButton = $divSideBar[0];
    
    $divSideBar[0].style.backgroundColor = SIDEBAR_SECONDARY_COLOR_BUTTON;

    $divSideBar.forEach(value => {
        value.addEventListener("click", (event) => {
            if (event.currentTarget.style.backgroundColor !== SIDEBAR_SECONDARY_COLOR_BUTTON) {
                event.currentTarget.style.backgroundColor = SIDEBAR_SECONDARY_COLOR_BUTTON;
                if ($prevSidebarButton == undefined) {
                    $prevSidebarButton = event.currentTarget;
                } else {
                    $prevSidebarButton.style.backgroundColor = "";
                    $prevSidebarButton = event.currentTarget;
                }
            }
        });
    });

}