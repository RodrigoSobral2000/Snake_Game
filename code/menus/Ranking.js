"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let backBtn = document.getElementById("backBtn")
    let head_row = document.getElementById("head_row")
    let table= document.getElementById("main_table")

    //  LOAD PLAYERS
    let players_array= new Array(localStorage.length-1)
    for (let i_storage = 0, i_array=0; i_storage < localStorage.length; i_storage++) {
        if (localStorage.key(i_storage)!="__playing__") players_array[i_array++] = JSON.parse(localStorage.getItem(localStorage.key(i_storage)))
    }
    orderBy(undefined, table, players_array)

    head_row.addEventListener("mouseup", goOrder)
    head_row.addEventListener("mouseenter", playSound)

    backBtn.addEventListener("mouseup", backToMenu)
    backBtn.addEventListener("mouseenter", playSound)
    addEventListener("keydown", keyboardInteraction)

    function goOrder(ev) { orderBy(ev.target, table, players_array) }
}

function orderBy(argument, table, players_array) {
    // the argument will be the type of ordering that will be done
    for (let i = 0; i < players_array.length; i++) {
        const new_row= document.createElement("tr")
        if (localStorage.key(i)!="__playing__") {
            addcolumn(new_row, undefined, i+1)
            addcolumn(new_row, undefined, localStorage.key(i))
            addcolumn(new_row, players_array[i], "creation_date")
            addcolumn(new_row, players_array[i], "points_record")
            addcolumn(new_row, players_array[i], "record_date")
            addcolumn(new_row, players_array[i], "apples_eaten")
            addcolumn(new_row, players_array[i], "special_apples_eaten")
            table.appendChild(new_row)
        }
    }
}

function addcolumn(row, player, argument) {
    const new_column= document.createElement("td")
    if (player==undefined) new_column.innerHTML= argument
    else new_column.innerHTML= player[argument]
    row.appendChild(new_column)
}

function keyboardInteraction(ev) {
    if (ev.code=="Backspace") backToMenu()
}

function backToMenu() { location.replace("../../index.html") }

function playSound() {
    let sound = new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}