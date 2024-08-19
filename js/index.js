"use strict";

import {get, post} from "./get_post.js";

/* --------------------------------------------------------------------------------- */
/* get testimonials from API */
/* --------------------------------------------------------------------------------- */

//event listener
document.addEventListener('DOMContentLoaded', () => {
    getTestimonials();
});

//get testimonials if the site is loaded
function getTestimonials() {
    get('https://web-modules.dev/api/v1/testimonials/3')
        .then(result => showTestimonials(result))
        .catch(error => {
            if (error.headers.get('content-type').includes('application/json')) {
                (error.json()).then(errorMessage => showError(error.status, errorMessage.message));
            } else {
                showError(error.status, error.text());
            }
        });
}

//show categories
function showTestimonials(testimonials) {
    let htmlString = '';
    for(let key in testimonials.testimonials) {
        htmlString += `
            <article class="testimonial__article" data-id="${testimonials.testimonials[key].id}">
            <img src="${testimonials.testimonials[key].avatar}" alt="${testimonials.testimonials[key].firstname}">
            <div class="testimonial__article__textBox">
                <p class="testimonial__article__textBox__zitat">"${testimonials.testimonials[key].quote}"</p>
                <p class="testimonial__article__textBox__name">${testimonials.testimonials[key].firstname} ${testimonials.testimonials[key].lastname}</p>
                <p class="testimonial__article__textBox__company">${testimonials.testimonials[key].company}</p>
                <div class="testimonial__article__textBox__like">
                <button class="testimonial__article__textBox__like__button"><i class="fa fa-thumbs-o-up"></i></button>
                <span>${testimonials.testimonials[key].likes_count}</span>
                </div>
            </div>
    </article>`;
    }
    document.getElementById("testimonials").innerHTML = htmlString.trim();
    addTestimonialListener();
}

function showError(errorStatus, errorMessage) {
    let htmlString = `
        <div class="error--http">
            <h2>Fehler beim Laden der Testimonials</h2>
            <p>Error Status: ${errorStatus}</p>
            <p>Error Message: ${errorMessage}</p>
        </div>
        `;
    document.getElementById("testimonials").innerHTML = htmlString.trim();
}

/* --------------------------------------------------------------------------------- */
/* like tesimonials */
/* --------------------------------------------------------------------------------- */

//event listener
function addTestimonialListener() {
    const btnsTestimonial = document.getElementsByClassName("testimonial__article__textBox__like__button");
    for (let element of btnsTestimonial) {
        element.addEventListener('click', () => {
            element.setAttribute('disabled', 'true');
            element.firstChild.className = 'fa fa-thumbs-up';
            let testimonialId = element.parentElement.parentElement.parentElement.dataset.id;
            postTestimonialLike(testimonialId, element);
        });
    }
}

//post the like and update the element to show number of likes
function postTestimonialLike(id, element) {
    post('https://web-modules.dev/api/v1/like', {type: 'testimonial', id: id})
        .then(result => {
            const numberElement = element.parentElement.getElementsByTagName('span')[0];
            numberElement.innerText = result.amount;
        })
        .catch(error => {
            element.parentElement.parentElement.innerHTML =
                `<div class="error--http">
                    <h2>Beim Senden des Likes ist ein Fehler aufgetreten</h2>
                    <p>Error Status: ${error.status}</p>
                </div>`;
        });

}

