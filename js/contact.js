"use strict";

import { get } from "./get_post.js";
import { post } from "./get_post.js";

//DOM
const main = document.getElementById("main");

//contact form
const contactName = document.getElementById("contact-form-name");
const contactMail = document.getElementById("contact-form-mail");
const contactErrorName = document.getElementById("contact-form-errorName");
const contactErrorMail = document.getElementById("contact-form-errorMail");
const contactButton = document.getElementById("contact-form-btn");

//feedback form
const feedbackName = document.getElementById("feedback-form-name");
const feedbackMail = document.getElementById("feedback-form-mail");
const feedbackSliderDesign = document.getElementById("feedback-form-ratingDesign");
const feedbackSliderComponents = document.getElementById("feedback-form-ratingComponents");
const feedbackErrorName = document.getElementById("feedback-form-error-name");
const feedbackErrorMail = document.getElementById("feedback-form-error-mail");
const feedbackComment = document.getElementById("feedback-comment");
const feedbackButton = document.getElementById("feedback-form-btn");


/* --------------------------------------------------------------------------------- */
/* Validation the forms contact and feedback */
/* --------------------------------------------------------------------------------- */
//declaration variables
let resultContactNameTest = [false, ""];
let resultContactMailTest = [false, ""];
let resultFeedbackNameTest = [false, ""];
let resultFeedbackMailTest = [false, ""];
let resultFeedbackSliderDesignTest = [false, ""];
let resultFeedbackSliderComponentsTest = [false, ""];


contactName.addEventListener('change',  testContactName);
contactMail.addEventListener('change', testContactMail);
feedbackName.addEventListener('change', testFeedbackName);
feedbackMail.addEventListener('change', testFeedbackMail);
feedbackSliderComponents.addEventListener('change', testSliderComponents);
feedbackSliderDesign.addEventListener('change', testSliderDesign);

//--------- function for contact form
//function to test the name field from contact form
function testContactName(){
    resultContactNameTest = validateName(contactName.value); //test name
    if (!(resultContactNameTest[0])) {
        contactErrorName.textContent = resultContactNameTest[1];
        contactName.style.backgroundColor = "#ffa1a1";
    } else {
        contactErrorName.textContent = "";
        contactName.style.backgroundColor = "#c4f68a";
    }
    enableContactButton();
}

//function to test the mail field from contact form
function testContactMail() {
    resultContactMailTest = validateMail(contactMail.value);
    if (!(resultContactMailTest[0])) {
        contactErrorMail.textContent = resultContactMailTest[1];
        contactMail.style.backgroundColor = "#ffa1a1";
    } else {
        contactErrorMail.textContent = "";
        contactMail.style.backgroundColor = "#c4f68a";
    }
    enableContactButton();
}

//function to enabled button from contact form if all passed
function enableContactButton () {
    contactButton.disabled = !(resultContactNameTest[0] && resultContactMailTest[0]);
}

//function if send button clicked from contact form
contactButton.addEventListener('click', (event) => {
    event.preventDefault();
});

//--------- function for feedback form
//function to test the name field from feedback form

function testFeedbackName() {
    resultFeedbackNameTest = validateName(feedbackName.value);
    if (!(resultFeedbackNameTest[0])) {
        feedbackErrorName.textContent = resultFeedbackNameTest[1];
        feedbackName.style.backgroundColor = "#ffa1a1";
    } else {
        feedbackErrorName.textContent = "";
        feedbackName.style.backgroundColor = "#c4f68a";
    }
    enableFeedbackButton();
}

//function to test the mail field from feedback form

function testFeedbackMail(){
    resultFeedbackMailTest = validateMail(feedbackMail.value);
    if (!(resultFeedbackMailTest[0])) {
        feedbackErrorMail.textContent = resultFeedbackMailTest[1];
        feedbackMail.style.backgroundColor = "#ffa1a1";
    } else {
        feedbackErrorMail.textContent = "";
        feedbackMail.style.backgroundColor = "#c4f68a";
    }
    enableFeedbackButton();
}

//function to test the slider from feedback form
function testSliderComponents() {
    resultFeedbackSliderComponentsTest = validateSlider(feedbackSliderComponents.value);
    enableFeedbackButton();
}

function testSliderDesign(){
    resultFeedbackSliderDesignTest = validateSlider(feedbackSliderDesign.value);
    enableFeedbackButton();
}

//function to enabled button from feedback form if all passed
function enableFeedbackButton () {
    feedbackButton.disabled = !(resultFeedbackNameTest[0] &&
        resultFeedbackMailTest[0] &&
        resultFeedbackSliderComponentsTest[0] &&
        resultFeedbackSliderDesignTest[0]);
}


//function to validate the name
function validateName (name) {
    /* Tests: notEmpty / lenght >= 3 / lenght <= 100 / include not a number */
    let arrFailure =[];
    if (name.trim() === "") {arrFailure.push("Name muss ausgefüllt werden");}
    if (name.length < 3){arrFailure.push("Name zu kurz");}
    if (name.length > 100) {arrFailure.push("Name zu lang");}
    if (/\d/.test(name)) {arrFailure.push("Name darf keine Zahlen enthalten");}
    if(arrFailure.length === 0) {return [true, ""];}
    return [false, arrFailure.toString().replace(',', ' / ')];
}

//function to validate the email adress
function validateMail (mail) {
    //Regular Expression to validate Emailadress RFC2822
    const regExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "g");
    let arrFailure = [];
    if (mail.trim() === "") {arrFailure.push("Feld muss ausgefüllt werden");}
    if (mail.length > 200) {arrFailure.push("Eingabe zu lang");}
    if (!(regExp.test(mail))) {arrFailure.push("Keine gültige Email-Adresse");}
    if (arrFailure.length === 0) {return [true, ""];}
    return [false, arrFailure.toString().replace(',', ' / ')];
}

//function to validate the slider value
function validateSlider (value) {
    if (value >= 1 && value <= 10) {return [true, ""];}
    return [false, "Auswahl ausserhalb des Bereichs!"];
}

/* --------------------------------------------------------------------------------- */
/* Send feedback form data to API */
/* --------------------------------------------------------------------------------- */

//eventListener
feedbackButton.addEventListener('click', (event) => {
    event.preventDefault();
    postFeedback();
});

//function: get feedback data and post it to the server
function postFeedback () {
    let comment = feedbackComment.value === '' ? '-' : feedbackComment.value;
    const data = {
        name: feedbackName.value,
        email: feedbackMail.value,
        rating_design: feedbackSliderDesign.value,
        rating_components: feedbackSliderComponents.value,
        comment: comment
    };

    feedbackName.value = '';
    feedbackMail.value = '';
    feedbackSliderDesign.value = '';
    feedbackSliderComponents.value = '';
    feedbackComment.value = '';

    post('https://web-modules.dev/api/v1/feedback', data)
        .then(result => onFeedbackSucces(result))
        .catch(error => {
            if (error.headers.get('content-type').includes('application/json')) {
                (error.json()).then(errorMessage => onFeedbackError(error.status, errorMessage.message));
            } else {
                onFeedbackError(error.status, error.text());
            }
        });
}

//function show result of feedback post
function onFeedbackSucces(result) {
    main.innerHTML =    `<h2>Feedback erfolgreich übermittelt!</h2>
                        <div class="feedback__sent__diagramm">
                            <div>
                                <h3>Bewertung Design</h3>
                                <p>In folgendem Diagramm sehen Sie die Verteilung der Bewertungen für das Design</p>
                                <div id="feedback-diagramm-design"></div>
                            </div>
                            <div>
                                <h3>Bewertung Komponenten</h3>
                                <p>In folgendem Diagramm sehen Sie die Verteilung der Bewertungen für die Komponenten</p>
                                <div id="feedback-diagramm-components"></div>
                            </div>
                        </div>`;
    getFeedbackSubmissions();
}

//function on Error
function onFeedbackError (errorStatus, errorMessage) {
    main.innerHTML = `
        <div class="error--http">
            <h2>Das Feedback konnte nicht übermittelt werden</h2>
            <p>Folgender Fehler ist aufgetreten
            </br>Status: ${errorStatus}
            </br>Message: ${errorMessage}</p>
        </div>`;
}

/* --------------------------------------------------------------------------------- */
/* feedback diagramm for users */
/* --------------------------------------------------------------------------------- */

//function to create diagramm
function createDiagramm (elementId, objFeedback) {
    let chartDesign = new dimple.chart(dimple.newSvg(elementId, 500, 500), objFeedback);
    chartDesign.setBounds(20, 20, 460, 360);
    chartDesign.addMeasureAxis("p", "number");
    chartDesign.addSeries("categorie", dimple.plot.pie);
    chartDesign.addLegend(410, 40, 100, 300, "left");
    chartDesign.draw();
}

//function to count number of feedbacks from 1 to 10
function countFeedbacks (result, typeFeedback) {
    //generate empty object
    let objFeedback = [
        {"categorie": "1", "number": 0},
        {"categorie": "2", "number": 0},
        {"categorie": "3", "number": 0},
        {"categorie": "4", "number": 0},
        {"categorie": "5", "number": 0},
        {"categorie": "6", "number": 0},
        {"categorie": "7", "number": 0},
        {"categorie": "8", "number": 0},
        {"categorie": "9", "number": 0},
        {"categorie": "10", "number": 0}
    ];

    for(let i = 0; i < result.feedbacks.length; i++) {
        switch (typeFeedback === 1 ? result.feedbacks[i].rating_components : result.feedbacks[i].rating_design) {
            case 1: objFeedback[0].number += 1;
                break;
            case 2: objFeedback[1].number += 1;
                break;
            case 3: objFeedback[2].number += 1;
                break;
            case 4: objFeedback[3].number += 1;
                break;
            case 5: objFeedback[4].number += 1;
                break;
            case 6: objFeedback[5].number += 1;
                break;
            case 7: objFeedback[6].number += 1;
                break;
            case 8: objFeedback[7].number += 1;
                break;
            case 9: objFeedback[8].number += 1;
                break;
            case 10: objFeedback[9].number += 1;
                break;
        }
    }
    return objFeedback;
}

//get all feedback submissions
function getFeedbackSubmissions() {
    get('https://web-modules.dev/api/v1/feedback')
        .then(result => showFeedbackSubmissions(result))
        .catch(error => {
            if (error.headers.get('content-type').includes('application/json')) {
                (error.json()).then(errorMessage => onSubmissionError(error.status, errorMessage.message));
            } else {
                onSubmissionError(error.status, error.text());
            }
        });
}

//function on Error
function onSubmissionError (errorStatus, errorMessage) {
    main.innerHTML += `
        <div class="error--http">
            <h2>Die Daten für die Anzeige der Resultate konnte nicht geladen werden.</h2>
            <p>Folgender Fehler ist aufgetreten
            </br>Status: ${errorStatus}
            </br>Message: ${errorMessage}</p>
        </div>`;
}

//function to show feedback submissions
function showFeedbackSubmissions(result) {
    //count number of feedbacks
    const objFeedbackDesign = countFeedbacks(result, 0);
    const objFeedbackComponents = countFeedbacks(result, 1);

    //create diagrams
    createDiagramm("#feedback-diagramm-design", objFeedbackDesign);
    createDiagramm("#feedback-diagramm-components", objFeedbackComponents);
}

















