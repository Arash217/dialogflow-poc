"use strict";

var addListBtn = document.getElementById('add_list_btn');
var addQuestionBtn = document.getElementById('form_add_question');
var formQuestions = document.getElementById('form_questions');

var createQuestionNode = function createQuestionNode(index) {
  return "<div id=\"question_".concat(index, "\" class=\"form__row\">\n                <div class=\"form__column form__input-group\">\n                    <label for=\"\" class=\"form__label\">Vraag</label>\n                    <input type=\"text\" class=\"form__input\">\n                </div>\n                <div class=\"form__column form__input-group\">\n                    <label for=\"\" class=\"form__label\">Antwoord</label>\n                    <input type=\"text\" class=\"form__input\">\n                </div>\n                <div class=\"form__column form__input-group\">\n                    <button class=\"button button--no-padding-left-right form__button-delete\" value=\"").concat(index, "\">\n                        <img src=\"/images/remove.svg\" alt=\"remove\" class=\"button__image\">\n                    </button>\n                </div>\n            </div>");
};

var addQuestion = function addQuestion(e) {
  e.preventDefault();
  var questionsList = document.getElementById('form_questions');
  var questionNode = createQuestionNode(questionsList.childElementCount);
  questionsList.insertAdjacentHTML('beforeend', questionNode);
};

var deleteQuestion = function deleteQuestion(e) {
  e.preventDefault();

  if (e.target.classList.contains('form__button-delete')) {
    if (formQuestions.childElementCount > 1) {
      var question = document.getElementById("question_".concat(e.target.value));
      formQuestions.removeChild(question);
    }
  }
};

addListBtn.addEventListener('click', function () {
  MicroModal.show('modal-1');
});
addQuestionBtn.addEventListener('click', addQuestion);
formQuestions.addEventListener('click', deleteQuestion);
var choices = new Choices('#form_channels', {
  removeItemButton: true,
  choices: [{
    value: 'Option 1',
    label: 'Option 1'
  }, {
    value: 'Option 2',
    label: 'Option 2'
  }, {
    value: 'Option 2',
    label: 'Option 2'
  }, {
    value: 'Option 2',
    label: 'Option 2'
  }],
  placeholderValue: 'Kies een kanaal...',
  loadingText: 'Laden...',
  noResultsText: 'Geen resultaten gevonden',
  noChoicesText: 'Geen kanalen',
  itemSelectText: ''
});