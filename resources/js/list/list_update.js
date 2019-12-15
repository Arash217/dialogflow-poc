const serialize = require('form-serialize');
const {request} = require('../utils');
const {saveListBtn, formQuestions, renderErrors} = require('./form');

const submitForm = async formData => {
    try {
        const listId = window.location.href.split("/").pop();
        await request(listId, {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: {"Content-Type": "application/json"}
        });
        window.location.href = "/lijsten";
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