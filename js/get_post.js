"use strict";

async function handleErrors(response) {
    if (response.ok) {
        return response.json();
    }
    throw response;
}

export function get(url) {
    const url_inside = new URL(url);
    const options = {
        headers: {
            Authorization: 'Bearer 213|xFhFusz5JClbjUdD14XadZNZ2i7VcaVmM8G0Y7VJ',
            accept: 'application/json'
        }
    };
    return fetch(url_inside, options)
        .then(handleErrors);
}

export function post(url, data) {
    const url_inside = new URL(url);
    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer 213|xFhFusz5JClbjUdD14XadZNZ2i7VcaVmM8G0Y7VJ',
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(url_inside, options)
        .then(handleErrors);
}