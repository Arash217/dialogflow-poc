const addQuestionBtn = document.getElementById('form_add_question');
const formQuestions = document.getElementById('form_questions');

const createQuestionNode = index => {
    return `<div id="question_${index}" class="form__row">
                <div class="form__column form__input-group">
                    <label for="" class="form__label">Vraag</label>
                    <input type="text" class="form__input">
                </div>
                <div class="form__column form__input-group">
                    <label for="" class="form__label">Antwoord</label>
                    <input type="text" class="form__input">
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
    const questionsList = document.getElementById('form_questions');
    const questionNode = createQuestionNode(questionsList.childElementCount);
    questionsList.insertAdjacentHTML('beforeend', questionNode);
};

const deleteQuestion = e => {
    e.preventDefault();
    if (e.target.classList.contains('form__button-delete')) {
        if (formQuestions.childElementCount > 1) {
            const question = document.getElementById(`question_${e.target.value}`);
            formQuestions.removeChild(question);
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