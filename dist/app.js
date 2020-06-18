"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const GOOGLE_API_KEY = "AIzaSyCo7OMIBl0lklSm1IM-TuImdiDpzA-L8aw";
const form = document.querySelector('form');
const addressInput = document.getElementById('address');
function searchAddressHandler(e) {
    e.preventDefault();
    const enteredAddress = addressInput.value;
    axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
        if (response.data.status !== "OK") {
            throw new Error('Could not fetch location!');
        }
        const coordinates = response.data.results[0].geometry.location;
        console.log(coordinates);
    })
        .catch(err => {
        alert(err.message);
        console.log(err);
    });
}
form.addEventListener('submit', searchAddressHandler);
//# sourceMappingURL=app.js.map