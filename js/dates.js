"use strict";

const btnExercise = document.getElementById("dates-button-exercise");
const btnTestDrive = document.getElementById("dates-button-testdrive");
const sectionExercise = document.getElementById("exercises");
const sectionTestDrive = document.getElementById("testDrive");

const cbCadre = document.getElementById("exercise-cadre");
const cbAs = document.getElementById("exercise-as");
const cbLz1 = document.getElementById("exercise-lz1");
const cbLz2 = document.getElementById("exercise-lz2");
const tableExercise = document.getElementById("exercise-table");
const trExercise = tableExercise.getElementsByTagName("tr");

const searchTestDrive = document.getElementById("testDrive-input");
const tableTestDrive = document.getElementById("testDrive-table");
const trTestDrive = tableTestDrive.getElementsByTagName("tr");

/* --------------------------------------------------------------------------------- */
/* Toggle between table exercise and testDrive */
/* --------------------------------------------------------------------------------- */

/* eventListener */
btnExercise.addEventListener('click', showExerciseTable);
btnTestDrive.addEventListener('click', showTestDriveTable);

//initialise
showExerciseTable();

/* functions to show the table exercise or the table test Drive */
function showExerciseTable() {
    sectionExercise.className = 'exercise';
    sectionTestDrive.className = 'testDrive--hidden';
}

function showTestDriveTable() {
    sectionExercise.className = 'exercise--hidden';
    sectionTestDrive.className = 'testDrive';
}

/* --------------------------------------------------------------------------------- */
/* filter for table exercise */
/* --------------------------------------------------------------------------------- */

cbCadre.addEventListener('click', filterTableExercise);
cbAs.addEventListener('click', filterTableExercise);
cbLz1.addEventListener('click', filterTableExercise);
cbLz2.addEventListener('click', filterTableExercise);

/* function to filter the table */
function filterTableExercise() {
    let i, td, textColumnDescription;
    for (i = 0; i < trExercise.length; i++) {
        td = trExercise[i].getElementsByTagName("td")[3];
        if (td) {
            textColumnDescription = td.textContent.toLowerCase();
            if (
                (textColumnDescription.includes("kader") && cbCadre.checked) ||
                (textColumnDescription.includes("as") && cbAs.checked) ||
                (textColumnDescription.includes("lz1") && cbLz1.checked) ||
                (textColumnDescription.includes("lz2") && cbLz2.checked) ||
                (!cbCadre.checked && !cbAs.checked && !cbLz1.checked && !cbLz2.checked)
            ) {
                trExercise[i].style.display = "";
            } else {
                trExercise[i].style.display = "none";
            }
        }
    }
}

/* --------------------------------------------------------------------------------- */
/* filter for table testDrive */
/* --------------------------------------------------------------------------------- */

searchTestDrive.addEventListener('input', filterTableTestDrive);

/* function to filter the table */
function filterTableTestDrive() {
    let i, td, search, textColumnName;
    search = searchTestDrive.value.toLowerCase();
    for (i = 0; i < trTestDrive.length; i++) {
        td = trTestDrive[i].getElementsByTagName("td")[1];
        if (td) {
            textColumnName = td.textContent.toLowerCase();
            trTestDrive[i].style.display = textColumnName.includes(search) ? "" : "none";
        }
    }
}

