"use strict";

/* Toogle to show or hide the Top Navigation */
const btnTopnav = document.getElementById("topnav-button");
btnTopnav.addEventListener('click', toggleTopnav);

function toggleTopnav() {
    let topnavElement = document.getElementById("topnav");
    if (topnavElement.className === "topnav") {
        topnavElement.className += " responsive";
    } else {
        topnavElement.className = "topnav";
    }
}

