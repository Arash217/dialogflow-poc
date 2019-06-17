const addQuestionBtn = document.getElementById('form_add_question');
const questionsInput = document.getElementById('questions_input');
const formQuestions = document.getElementById('form_questions');
const saveListBtn = document.getElementById('button_save_list');

const createQuestionNode = index => {
    return `<div id="question_${index}" class="form__row">
                <div class="form__column form__input-group">
                    <label for="" class="form__label">Vraag</label>
                    <input name="questions[${index}][question]" type="text" class="form__input">
                </div>
                <div class="form__column form__input-group">
                    <label for="" class="form__label">Antwoord</label>
                    <input name="questions[${index}][answer]" type="text" class="form__input">
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

const submitForm = async formData => {
    const res = await fetch('/lijsten', {
        method: 'POST',
        body: JSON.stringify(formData)
    });

    const content = await res.json();

    console.log(content);
};

saveListBtn.addEventListener('click', e => {
    e.preventDefault();
    const formData = formToObject(formQuestions);
    submitForm(formData)
});