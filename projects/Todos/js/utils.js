'use strict'
var gIsConfirmPop = false;
function getImgName(src) {
    var filename = src.replace(/^.*[\\\/]/, '');//with extension
    var name = filename.split('.').slice(0, -1);//remove extension
    return name.toString();
}
function removeFocusOnImportance() {
    var importanceDiv = document.querySelector('.importance');
    var images = importanceDiv.getElementsByTagName('img');//all img in div
    for (var i = 0; i < images.length; i++) {//loop all images and remove .focus
        if (images[i].classList.contains('focus')) {
            images[i].classList.remove('focus');
        }
    }
}
function getCurrentTime() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();// if less than 10 add '0'
    var seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    var monthDateYear = date + "/" + (month + 1) + "/" + year + " - " + hours + ":" + minutes + ":" + seconds;
    return monthDateYear;
}
function getTimestamp() {
    var date = new Date();
    var timestamp = date.getTime();
    return timestamp;
}
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

function sortByText(a, b) {
    var x = a.title.toLowerCase();
    var y = b.title.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
function sortByDate(a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
}
function sortByImportance(a, b) {
    // debugger;
    return b.importanceLvl - a.importanceLvl;
}
function getImportanceNumber(gImportanceLevel) {
    // debugger;
    var LvlNum;
    switch (gImportanceLevel) {
        case 'low':
            LvlNum = 1;
            break;
        case 'important':
            LvlNum = 2;
            break;
        case 'urgent':
            LvlNum = 3;
            break;

        default:
            break;
    }
    return LvlNum;
}



