"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  if (e.target.classList.contains('form__button-delete')) {
    e.preventDefault();

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

var submitForm =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(formData) {
    var res, content;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('/lists', {
              method: 'POST',
              body: JSON.stringify(formData)
            });

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            content = _context.sent;
            console.log(content);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function submitForm(_x) {
    return _ref.apply(this, arguments);
  };
}();

saveListBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var formData = formToObject(formQuestions);
  console.log(formData);
});