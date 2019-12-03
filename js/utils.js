
function getCurrentDateTime() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();// if less than 10 add '0'
    var seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    var customDatetime = date + "/" + (month + 1) + "/" + year + " - " + hours + ":" + minutes + ":" + seconds;
    return customDatetime;
}