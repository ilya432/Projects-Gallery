'use strict'
//Exercise in-picture

var gNextQId = -1;
var gQuestions = [];

function initGame() {
    if(gNextQId == -1){
        createQuestions();
    }
    renderQuestions();
}
function createQuestion(opts, correctOptIdx, isHiddenClass) {
    var question = {
        id: gNextQId++,
        opts: opts,
        correctOptIdx: correctOptIdx,
        isHiddenClass: isHiddenClass
    }
    return question;
}
function createQuestions() {
    gQuestions.push(createQuestion(['Mobius strip', 'Some elastic thing'], 0, false));
    gQuestions.push(createQuestion(['Bat Yam', 'New York'], 1, true));
    gQuestions.push(createQuestion(['React', 'Vue'], 0, true));
}
function renderQuestions() {
    var div = document.getElementById('questionsContainer');
    var strHTML = '';
    div.innerHTML = strHTML;
    for (var i = 0; i < gQuestions.length; i++) {
        var questionId = i;
        var question = gQuestions[i];
        var HiddenClass = '';
        HiddenClass = (question.isHiddenClass) ? ' hidden' : '';

        strHTML +=
        '<div id="question-' + questionId + '" class="question' + HiddenClass + '">' +
           '<img id="img-' + questionId + '" class="questionImg" src="./img/' + questionId + '.png"></img>' +
           '<div class="options" >' +
             '<p class="optParagraph" onclick="checkAnswer(' + questionId + ', 0, ' + question.correctOptIdx + ')" >' + question.opts[0] + '</p>' +
             '<p class="optParagraph" onclick="checkAnswer(' + questionId + ', 1, ' + question.correctOptIdx + ')" >' + question.opts[1] + '</p>' +
          '</div>' +
        '</div>';
    }
    div.innerHTML += strHTML; 
}

function checkAnswer(questionID, correctOptIdx, optIdx) {
    for (var i = 0; i < gQuestions.length; i++) {
        if (i == questionID) {
            if (i == gQuestions.length-1) {//last
                if (correctOptIdx == optIdx) {//Compare question.correctOptIdx to question.opts[0]/[1] - equal=correct
                    victory();
                } else {
                    console.log('Incorrect!');
                }
                return;
            } else if(i < gQuestions.length){
                var question = gQuestions[i];
                var nextQuestion = (gQuestions[i + 1] == 'undefined') ? gQuestions[i] : gQuestions[i + 1];
                if (correctOptIdx == optIdx) {//Compare question.correctOptIdx to question.opts[0]/[1] - equal=correct
                    console.log('Correct!');
                    question.isHiddenClass = true;
                    nextQuestion.isHiddenClass = false;
                    renderQuestions();
                } else {
                    console.log('Incorrect!');
                    // renderQuestions();
                }
            }

        }
    }
}
function victory() {
    gQuestions = [];
    var div = document.getElementById('questionsContainer');
    div.innerText = 'Victorious!';
    var strHTML = '';
    strHTML += '<img id="victoryImg" src="./img/Victorious.gif" />';
    div.innerHTML += strHTML;
    console.log('Victorious!');
}