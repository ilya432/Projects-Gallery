var gTodos = [], gNextID = 1, gStatusFilter = 'all', gsortParam = 'text';

function createTodo(title, importance, importanceNum) {
    var todo = {
        title,
        isDone: false,
        id: gNextID++,
        createdAt: Date.now(),
        timeToshow: getCurrentTime(),
        timestamp: getTimestamp(),
        importance: importance,
        importanceLvl: importanceNum
    }
    saveToStorage('gNextID', gNextID);
    return todo;
}
function saveTodos() {
    saveToStorage('todos', gTodos);
}
function loadData() {
    gTodos = loadFromStorage('todos', []);
    gNextID = loadFromStorage('gNextID', 1)

    // if (gTodos.length === 0) createTodos();
    if (gTodos.length === 0) {

    }
}
function getTodosToRender() {

    var filteredTodos = gTodos.filter(function (todo) {
        return ((gStatusFilter === 'all') ||
            (gStatusFilter === 'active' && !todo.isDone) ||
            (gStatusFilter === 'done' && todo.isDone))
    });
    return filteredTodos;
}
function sortTodos() {
    if (gsortParam === 'text') {
        gTodos.sort(sortByText);
    }
    else if (gsortParam === 'created') {
        gTodos.sort(sortByDate);
    }
    else if (gsortParam === 'importance') {
        gTodos.sort(sortByImportance);
    }
    saveTodos();
    loadData();
    renderTodos(gStatusFilter);
}
function findTodoById(todoID) {
    return gTodos.find(function (todo) {
        return todo.id === todoID
    });
}
function findTodoIndexById(todoID) {
    return gTodos.findIndex(function (todo) {
        return todo.id === todoID
    });
}
function toggleDone(todoID) {
    var todo = findTodoById(todoID);
    todo.isDone = !todo.isDone;
    saveTodos()
}
function addTodo(title, importance, importanceNum) {
    var newTodo = createTodo(title, importance, importanceNum);
    gTodos.push(newTodo);
    saveTodos();
}
function onDeleteClick(todoID, event) {
    var isConfirm = false;
    if (confirm("Are you sure?")) {
        isConfirm = true;
    } else {
        event.stopPropagation();
        return;
    }
    if (isConfirm) {
        event.stopPropagation();
        deleteTodo(todoID);
        renderTodos(gStatusFilter);
    }
}
function deleteTodo(todoID) {
    var todoIndex = findTodoIndexById(todoID);
    gTodos.splice(todoIndex, 1);
    saveTodos()
}
function setFilterStatus(statusFilter) {
    gStatusFilter = statusFilter;
}
function setSortParam(sortByParamStatus) {
    gsortParam = sortByParamStatus;
}
function getActiveTodosCount() {
    return gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count++;
        return count;
    }, 0);
}
function getTotalTodosCount() {
    return gTodos.length;
}
function getCelectedValue(strId) {
    var filterDropDown = document.getElementById(strId);
    var value = filterDropDown.options[filterDropDown.selectedIndex].text;
    return value.toLowerCase();
}
function moveTodo(elBtn, todosIdx, event) {//this, todosIdx, event
    if (elBtn.classList.contains('moveUpBtn')) {
        gTodos.move(todosIdx, todosIdx - 1);
    }
    else if (elBtn.classList.contains('moveDownBtn')) {

        gTodos.move(todosIdx, todosIdx + 1);
    }
    saveTodos();
    loadData();
    renderTodos(gStatusFilter);
}
