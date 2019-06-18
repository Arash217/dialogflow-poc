"use strict";

var addQuestionBtn = document.getElementById('form_add_question');
var questionsInput = document.getElementById('questions_input');
var formQuestions = document.getElementById('form_questions');
var saveListBtn = document.getElementById('button_save_list');

var createQuestionNode = function createQuestionNode(index) {
  return "<div id=\"question_".concat(index, "\" class=\"form__row\">\n                <div class=\"form__column form__input-group\">\n                    <label for=\"\" class=\"form__label\">Vraag</label>\n                    <input name=\"questions[").concat(index, "][question]\" type=\"text\" class=\"form__input\">\n                </div>\n                <div class=\"form__column form__input-group\">\n                    <label for=\"\" class=\"form__label\">Antwoord</label>\n                    <input name=\"questions[").concat(index, "][answer]\" type=\"text\" class=\"form__input\">\n                </div>\n                <div class=\"form__column form__input-group\">\n                    <button class=\"button button--no-padding-left-right form__button-delete\" value=\"").concat(index, "\">\n                        <img src=\"/images/remove.svg\" alt=\"remove\" class=\"button__image\">\n                    </button>\n                </div>\n            </div>");
};

var addQuestion = function addQuestion(e) {
  e.preventDefault();
  var questionNode = createQuestionNode(questionsInput.childElementCount);
  questionsInput.insertAdjacentHTML('beforeend', questionNode);
};

var deleteQuestion = function deleteQuestion(e) {
  e.preventDefault();

  if (e.target.classList.contains('form__button-delete')) {
    if (questionsInput.childElementCount > 1) {
      var question = document.getElementById("question_".concat(e.target.value));
      questionsInput.removeChild(question);
    }
  }
};

addQuestionBtn.addEventListener('click', addQuestion);
formQuestions.addEventListener('click', deleteQuestion);
var choices = new Choices('#form_channels', {
  removeItemButton: true,
  placeholderValue: 'Kies een kanaal...',
  loadingText: 'Laden...',
  noResultsText: 'Geen resultaten gevonden',
  noChoicesText: 'Geen kanalen',
  itemSelectText: ''
});
saveListBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var formData = formToObject(formQuestions);
  console.log(formData);
});