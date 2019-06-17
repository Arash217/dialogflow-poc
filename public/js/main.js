// const createQuestionNode = index => {
//     return `                <li>
//                                 <span>
//                                     <input type="text" name="questions[${index}][question]">
//                                 </span>
//                                 <span>
//                                     <input type="text" name="questions[${index}][answer]">
//                                 </span>
//                             </li>`
// };
//
// const addQuestion = listId => {
//     const questionsList = document.getElementById(listId);
//     const questionNode = createQuestionNode(questionsList.childElementCount);
//     questionsList.insertAdjacentHTML('beforeend', questionNode);
// };
//
// const deleteQuestion = questionId => {
//     const question = document.getElementById(questionId);
//     question.parentElement.removeChild(question);
// };