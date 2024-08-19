"use strict";

import { post } from "./get_post.js";

export default class Product {
    constructor(product) {
        this.id = product.id;
        this.category_id = product.category.id;
        this.category_name = product.category.name;
        this.description = product.description;
        this.image = product.image;
        this.likes_count = product.likes_count;
        this.name = product.name;
        this.price = product.price;
        this.sku = product.sku;

        this.element = document.createElement('article');
        this.popup = document.createElement('article');

        this.createPopup();
    }

    addElement(productElement) {
        this.element.className = 'resources__products__cards';
        this.element.dataset.id = this.id;
        let htmlString = '';
        htmlString += `
            <p class="resources__products__cards__category">${this.category_name}</p>
            <div class="resources__products__cards__image">
                <img  alt="${this.name}" src="${this.image}">
            </div>
            <p class="resources__products__cards__name">${this.name}</p>
            <p class="resources__products__cards__number">${this.sku}</p>
            <p class="resources__products__cards__description">${this.description}</p>
            <p class="resources__products__cards__price">${this.price} CHF</p>
            <div class="resources__products__cards__like">
                <button class="resources__products__cards__like__button"><i class="fa fa-thumbs-o-up"></i></button>
                <span>${this.likes_count}</span>
            </div>`;

        this.element.innerHTML = htmlString.trim();
        productElement.appendChild(this.element);
    }

    addEventListenerLike(callback) {
        this.element.querySelector('.resources__products__cards__like__button')
            .addEventListener('click', callback);
    }

    addEventListenerPopup(callback) {
        this.element.addEventListener('click', callback);
    }

    createPopup() {
        this.popup.className = ("resourcesPopup");
        let htmlString = '';
        htmlString = `
            <p class="resourcesPopup__category">${this.category_name}</p>
            <i id="resource-popup-close" class="resourcesPopup__icon fa fa-times fa-lg"></i>
            <div class="resourcesPopup__image">
                <img class="resourcesPopup__image__img" src="${this.image}" alt="">
            </div>
            <p class="resourcesPopup__name">${this.name}</p>
            <p class="resourcesPopup__number">${this.sku}</p>
            <p class="resourcesPopup__description">${this.description}</p>
            <p class="resourcesPopup__price">${this.price} CHF</p>
            <div class="resourcesPopup__like">
                <button class="resourcePopup__button"><i class="material-icons fa fa-thumbs-o-up"></i></button>
                <span>${this.likes_count}</span>
            </div>
        `;
        this.popup.innerHTML = htmlString.trim();
    }

    addPopup(parentElement) {
        parentElement.appendChild(this.popup);
    }

    addEventlistenerPopupLike() {
        this.popup.querySelector('.resourcePopup__button')
            .addEventListener('click', () => {
                post('https://web-modules.dev/api/v1/like', {type: 'product', id: this.id})
                    .then(result => {
                        this.likes_count = result.amount;
                        this.popup.querySelector('.resourcesPopup__like').lastElementChild.innerText = this.likes_count;
                        this.popup.querySelector('.resourcesPopup__like').firstElementChild.setAttribute('disabled', true);
                        this.popup.querySelector('.resourcesPopup__like').firstElementChild.firstElementChild.className = 'fa fa-thumbs-up';
                    })
                    .catch(error => {
                        let errorElement = document.createElement('div');
                        errorElement.className = 'error--http';
                        errorElement.innerHTML =
                            `
                            <h2>Fehler beim Senden des Likes</h2>
                            <p>Folgender Fehler ist aufgetreten
                            </br>Error Status: ${error.status}`;
                        this.popup.appendChild(errorElement);
                    });
            });
    }

    addEventListenerPopupClose(callback) {
        this.popup.querySelector('.resourcesPopup__icon')
            .addEventListener('click', callback);
    }
}
