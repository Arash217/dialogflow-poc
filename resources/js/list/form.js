const addQuestionBtn = document.getElementById('form_add_question');
const questionsInput = document.getElementById('questions_input');
export const formQuestions = document.getElementById('form_questions');
export const saveListBtn = document.getElementById('button_save_list');

const getTextAnswerType = (index) => {
    return `<input id="questions[${index}][answer]" name="questions[${index}][answer]" type="text" class="form__input" placeholder="Bijv. 10">`
};

const getBinaryAnswerType = (index) => {
    return `<select id="questions[${index}][answer]" name="questions[${index}][answer]" class="form__input">
                <option value="Ja">Ja</option>
                <option value="Nee">Nee</option>
            </select>`
};

const createQuestionNode = index => {
    return `<div id="question_${index}">
          <div class="form__row">
                <div class="form__column form__input-group">
                    <label for="questions[${index}][question]" class="form__label">Vraag</label>
                    <input id="questions[${index}][question]" name="questions[${index}][question]" type="text" class="form__input" placeholder="Bijv. Wat is 5 + 5">
                </div>
                <div class="form__column form__input-group">
                    <label for="questions_${index}_answer_type" class="form__label">Type antwoord</label>
                    <select name="questions_${index}_answer_type" class="form__input form__select-answer-type">
                        <option value="text:${index}" selected>Tekst</option>
                        <option value="binary:${index}">Ja / nee</option>
                    </select>
                </div>
                <div class="form__column form__input-group">
                    <button class="button button--no-padding-left-right form__button-delete" value="${index}">
                        <img src="/images/remove.svg" alt="remove" class="button__image">
                    </button>
                </div>
           </div>
           <div class="form__row">
                <div class="form__column form__input-group">
                    <label for="questions[${index}][answer]" class="form__label">Antwoord</label>
                    ${getTextAnswerType(index)}
                </div>
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

const handleAnswerTypeChange = e => {
    if (e.target.classList.contains('form__select-answer-type')) {
        const { value } = e.target;
        const [answerType, index] = value.split(':');

        const answerInput = document.getElementById(`questions[${index}][answer]`);
        let newAnswerInput = null;

        switch (answerType) {
            case 'text':
                newAnswerInput = getTextAnswerType(index);
                break;
            case 'binary':
                newAnswerInput = getBinaryAnswerType(index);
                break;
        }

        const div = document.createElement('div');
        div.innerHTML = newAnswerInput;
        answerInput.parentNode.replaceChild(div, answerInput)
    }
};

addQuestionBtn.addEventListener('click', addQuestion);
formQuestions.addEventListener('click', deleteQuestion);
formQuestions.addEventListener('change', handleAnswerTypeChange);

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

export const renderErrors = errors => {
    removeErrors();
    errors.forEach(error => {
        let {path} = error;
        path = path.includes('.') ? path.split('.')[1] : path;
        const {input} = formInputsPathMap.find(input => input.path === path);
        const element = document.getElementById(input);
        element.insertAdjacentHTML('afterend', getErrorElement(error.message))
    })
};