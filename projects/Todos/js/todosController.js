'use strict'
var gImportanceLevel = '';

function init() {
    loadData();
    renderTodos('all')
}
function renderTotals() {
    var elTotalSpan = document.querySelector('#total-todos');
    var elActiveSpan = document.querySelector('#active-todos');
    var TotalTodosCount = getTotalTodosCount();
    var ActiveTodosCount = getActiveTodosCount();
    if (TotalTodosCount > 0) {
        elTotalSpan.innerHTML = 'Total: ' + TotalTodosCount;
    }
    if (ActiveTodosCount > 0) {
        elActiveSpan.innerHTML = ' Active: ' + ActiveTodosCount;
    }
    else {
        elTotalSpan.innerHTML = 'No todos / No Active Todos, No Done Todos';
        elActiveSpan.innerHTML = '';
    }
}
function renderTodosList(todosStatus) {
    var elTodos = document.querySelector('.todos');

    var todos = getTodosToRender(); //filtered
    var strLis = todos.map(function (todo, idx, array) {
        var up = '', down = '';
        var moveUpBtn = `<button class="moveUpBtn" onclick="onMoveButtonClicked(this, ${idx}, event)">&#9650;</button>`;
        var moveDownBtn = `<button class="moveDownBtn" onclick="onMoveButtonClicked(this, ${idx}, event)">&#9660;</button>`;

        if (todosStatus === 'all' && todos.length > 1) { //top item - only up arrow
            if (idx === 0) {
                up = '';
                down = moveDownBtn;
            } else if (idx !== array.length - 1) { //middle item - both arrows  
                up = moveUpBtn;
                down = moveDownBtn;
            } else { //bottom item - only down arrow
                up = moveUpBtn;
                down = '';
            }
        }

        return `<li class="todo " onclick="onTodoClicked(${todo.id})">` +
            `<div class="todoTopDiv">` +
            // `<span class="importanceSpan ${todo.importance}"></span>` +
            `<span class="delete" onclick="onDeleteClick(${todo.id} , event)">⌧</span>` +
            `<span class="createDate">${todo.timeToshow}</span>` +
            `</div>` +
            `<div class="todoBottomDiv">` +
            `<p class="todoText ${todo.isDone ? 'done' : ''}">${todo.title}</p>` +
            `<div class="todoBottomDivButtons">` +
            `${up}` +
            `<img class="importanceImg" src="./img/importance/${todo.importance}.png">` +
            `${down}` +
            `</div>` +
            `</div>` + //todoBottomDiv End

            `</li>`;
    })
    // console.log(strLis.join(''));
    console.log(gTodos);
    elTodos.innerHTML = strLis.join('');
}
function renderTodos(todosStatus) {
    renderTodosList(todosStatus);
    renderTotals();
}
function onTodoClicked(todoID) {
    toggleDone(todoID);
    var status = getCelectedValue("status-filter");//.filterBy div
    renderTodos(status.toLowerCase());
}
function onImportanceToggle(elImg) {
    if (gImportanceLevel !== '') {
        gImportanceLevel = '';
    }
    var importancelevelName = getImgName(elImg.src);
    removeFocusOnImportance();

    elImg.classList.add("focus");//add .focus (outline) to clicked img
    gImportanceLevel = importancelevelName;
}
function onAddClick() {
    var contenteditable = document.querySelector('#todo-title'),
        text = contenteditable.textContent;
    debugger;
    var newTodoTitle = text;
    if (gImportanceLevel !== '' && text !== '') {

        var importanceNum = getImportanceNumber(gImportanceLevel);
        addTodo(newTodoTitle, gImportanceLevel, importanceNum);
        contenteditable.textContent = '';
        gImportanceLevel = '';
        removeFocusOnImportance();
        renderTodos('all');
        return;
    } else {
        removeFocusOnImportance();
        if (text === '') {
            text = 'Type some text'
            setTimeout(function () {
                text = ''
            }, 1000)
        } else {
            if (text !== 'Type some text') {
                var importanceDiv = document.querySelector('.importance');
                importanceDiv.classList.add("flip-scale-2-hor-top");
                setTimeout(function () {
                    importanceDiv.classList.remove("flip-scale-2-hor-top");
                }, 500)
            }
        }
    }
}
function onStatusButtonmClicked(elDiv) {
    var text = elDiv.innerText;
    var filterByStatus = text;//All/Active/Done
    setFilterStatus(filterByStatus);
    renderTodos(filterByStatus);
}
function onSortByParamChange(elSortByParam) {
    var sortParam = elSortByParam.value;//Text/Created/Importance
    setSortParam(sortParam);
    sortTodos()
}
function onMoveButtonClicked(elBtn, idx, event) {
    moveTodo(elBtn, idx, event);
    event.stopPropagation();
}