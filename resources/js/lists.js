const tingle = require("tingle.js");
const serialize = require('form-serialize');

const addQuestionBtn = document.getElementById('form_add_question');
const questionsInput = document.getElementById('questions_input');
const formQuestions = document.getElementById('form_questions');
const saveListBtn = document.getElementById('button_save_list');

const createQuestionNode = index => {
    return `<div id="question_${index}" class="form__row">
                <div class="form__column form__input-group">
                    <label for="questions[${index}][question]" class="form__label">Vraag</label>
                    <input id="questions[${index}][question]" name="questions[${index}][question]" type="text" class="form__input" placeholder="Bijv. Wat is 5 + 5">
                </div>
                <div class="form__column form__input-group">
                    <label for="questions[${index}][answer]" class="form__label">Antwoord</label>
                    <input id="questions[${index}][answer]" name="questions[${index}][answer]" type="text" class="form__input" placeholder="Bijv. 10">
                </div>
                <div class="form__column form__input-group">
                    <button class="button button--no-padding-left-right form__button-delete" value="${index}">
                        <img src="/images/remove.svg" alt="remove" class="button__image">
                    </button>
                </div>
            </div>`
};

const addQuestion = e => {
    e.preventDefault();
    const questionNode = createQuestionNode(questionsInput.childElementCount);
    questionsInput.insertAdjacentHTML('beforeend', questionNode);
};

const deleteQuestion = e => {
    if (e.target.classList.contains('form__button-delete')) {
        e.preventDefault();
        if (questionsInput.childElementCount > 1) {
            const question = document.getElementById(`question_${e.target.value}`);
            questionsInput.removeChild(question);
        }
    }
};

addQuestionBtn.addEventListener('click', addQuestion);
formQuestions.addEventListener('click', deleteQuestion);

const choices = new Choices('#form_channels', {
    removeItemButton: true,
    placeholderValue: 'Kies een kanaal...',
    loadingText: 'Laden...',
    noResultsText: 'Geen resultaten gevonden',
    noChoicesText: 'Geen kanalen',
    itemSelectText: '',
});

const formInputsPathMap = [
    {
        input: 'list_name',
        path: 'list_name'
    },
    {
        input: 'list_subject',
        path: 'list_subject'
    },
    {
        input: 'questions_input',
        path: 'questions'
    },
    {
        input: 'questions_input',
        path: 'question'
    },
    {
        input: 'questions_input',
        path: 'answer'
    }
];

const removeErrors = () => {
    const elements = document.getElementsByClassName('form__error');
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};

const getErrorElement = error => {
    return `<div class="form__error">${error}</div>`
};

const renderErrors = errors => {
    removeErrors();
    errors.forEach(error => {
        let {path} = error;
        path = path.includes('.') ? path.split('.')[1] : path;
        const {input} = formInputsPathMap.find(input => input.path === path);
        const element = document.getElementById(input);
        element.insertAdjacentHTML('afterend', getErrorElement(error.message))
    })
};

export const request = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
};

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