const tingle = require("tingle.js");
const serialize = require('form-serialize');
const {request} = require('../utils');
const {saveListBtn, formQuestions, renderErrors} = require('./form');

const modal = new tingle.modal({
    closeMethods: [],
});

const setModalContent = (code, counter) => {
    const modalMessage = `<div>
        <p class="modal__text">Lijst is aangemaakt. De lijstcode is: 
            <span class="modal__bold-text modal__bold-text--highlighted">${code}</span>
        </p>
        <p class="modal__text modal__text--small">Je wordt automatisch doorgestuurd naar lijsten overzicht pagina in 
            <span class="modal__bold-text">${counter}</span> 
        seconden</p>
    </div>`;
    modal.setContent(modalMessage);
};

const startModalCountdown = code => {
    let counter = 5;
    setModalContent(code, counter);
    modal.open();
    const countDownInterval = setInterval(() => {
        setModalContent(code, counter);
        if (counter-- === 0) {
            clearInterval(countDownInterval);
            modal.close();
            window.location.href = "/lijsten";
        }
    }, 1000);
};

const submitForm = async formData => {
    try {
        const {code} = await request('/lijsten', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {"Content-Type": "application/json"}
        });
        startModalCountdown(code);
    } catch (e) {
        if (e.inner) {
            renderErrors(e.inner)
        }
    }
};

saveListBtn.addEventListener('click', e => {
    e.preventDefault();
    const formData = serialize(formQuestions, {hash: true});
    submitForm(formData)
});