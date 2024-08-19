"use strict";

import Product from "./Products.js";
import {get} from "./get_post.js";
import {post} from "./get_post.js";

//DOM
const backgroundDark = document.getElementById("resource-dark-background");
const listCategories = document.getElementById("resources-categories");
const divProducts = document.getElementById("resources-products");

const mediaQuery = window.matchMedia("(width >= 600px)");

/* --------------------------------------------------------------------------------- */
/* popup */
/* --------------------------------------------------------------------------------- */


//add eventListener to show popup after loaded the dynamic html
function addListenerPopup() {
    productArr.forEach((product) => {
        product.addEventListenerPopup(() => showPopup(product));
    });
}

//show popup and gray background
function showPopup(product) {
    product.addPopup(document.getElementById('main'));
    backgroundDark.style.setProperty("visibility", "visible");
    product.addEventListenerPopupClose(() => closePopup());
    product.addEventlistenerPopupLike();
}

//hide popup and gray background
function closePopup() {
    document.querySelectorAll('.resourcesPopup').forEach((element) => element.remove());
    backgroundDark.style.setProperty("visibility", "hidden");
}

/* --------------------------------------------------------------------------------- */
/* get products from API */
/* --------------------------------------------------------------------------------- */

//event listener
document.addEventListener('DOMContentLoaded', () => {
    getCategories();
    getAllProducts();
});

function getCategories() {
    get('https://web-modules.dev/api/v1/products/categories')
        .then(result => showCategories(result))
        .catch(error => showErrorCategories(error.status));
}

//get all product if the site is loaded
function getAllProducts() {
    get('https://web-modules.dev/api/v1/products/20')
        .then(result => showProducts(result))
        .catch(error => showProductsError(error.status));
}

//show categories
function showCategories(categories) {
    let htmlString = '';
    for (let key in categories.product_categories) {
        htmlString += `<li><button class="resources__tabs__list__button" data-id="${categories.product_categories[key].id}">
                        ${categories.product_categories[key].name}</button></li>`;
    }
    listCategories.innerHTML = htmlString;
}

function showErrorCategories(errorStatus) {
    listCategories.innerHTML = `
        <div class="error--http">
            <h2>Die Kategorien für die Filter konnten nicht geladen werden</h2>
            <p>Folgender Fehler ist aufgetreten
            </br>Error Status: ${errorStatus}
        </div>`;
}

//Array to store products from API
let productArr = [];

//show products
function showProducts(products) {
    for (let key in products.products) {
        productArr.push(new Product(products.products[key]));
        productArr[productArr.length - 1].addElement(divProducts);
    }
    addListener();
}

function showProductsError(errorStatus) {
    divProducts.innerHTML = `
        <div class="error--http">
            <h2>Die Produkte konnten nicht geladen werden</h2>
            <p>Folgender Fehler ist aufgetreten
            </br>Error Status: ${errorStatus}
        </div>`;
}

//function to add listener
function addListener() {
    if (mediaQuery.matches) {
        addListenerPopup();
    }//add only on desktop screen
    else {
        addListenerLikeMobile();
    }//add only on mobile screen
    addCategoriesListener();
}

/* --------------------------------------------------------------------------------- */
/* like products on mobile*/
/* --------------------------------------------------------------------------------- */

//event listener
function addListenerLikeMobile() {
    productArr.forEach((product) => {
            product.addEventListenerLike(() => {
                const btn = product.element.querySelector('.resources__products__cards__like__button');
                btn.setAttribute('disabled', true);
                btn.firstChild.className = 'fa fa-thumbs-up';
                postProductsLike(product);
            });
        }
    );
}

//get id from products where the button is pressed
function getProductsId(element) {
    return element.parentElement.parentElement.dataset.id;
}

//post the like and update the element to show number of likes
function postProductsLike(product) {
    post('https://web-modules.dev/api/v1/like', {type: 'product', id: product.id})
        .then(result => {
            const numberElement = product.element.getElementsByTagName('span')[0];
            numberElement.innerText = result.amount;
        })
        .catch(error => {
            let errorElement = document.createElement('div');
            errorElement.className = 'error--http';
            errorElement.innerHTML = `
                <h2>Fehler beim Senden des Likes</h2>
                <p>Folgender Fehler ist aufgetreten
                </br>Error Status: ${error.status}`;
            product.element.appendChild(errorElement);
        });
}

/* --------------------------------------------------------------------------------- */
/* filter for categories */
/* --------------------------------------------------------------------------------- */

//event listener
function addCategoriesListener() {
    for (let element of document.getElementsByClassName("resources__tabs__list__button")) {
        element.addEventListener('click', () => {
            productArr.forEach((product) => {
                if (Number(product.category_id) === Number(element.dataset.id)) {
                    product.element.classList.remove('resources__products__cards--hidden');
                } else {
                    product.element.classList.add('resources__products__cards--hidden');
                }
            });
        });
    }
}






