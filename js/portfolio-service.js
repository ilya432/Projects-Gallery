'use strict'

var gPortfolioItems;

function loadPortfolioItems() {
    gPortfolioItems = loadFromStorage('PortfolioItems', []);
    // gNextID = loadFromStorage('gNextID', 1);

    if (gPortfolioItems.length === 0) {
        createPortfolioItems();

    }
    console.log(gPortfolioItems);
}
function createPortfolioItems() {
    gPortfolioItems.push(createPortfolioItem('InPicture', 'In picture', 'work work work', './img/portfolio/inPicture.png', 'loooooooong', './projects/in-picture/index.html'))
    gPortfolioItems.push(createPortfolioItem('Minesweeper', 'Minesweeper', 'work work work', './img/portfolio/minesweeper.png', 'loooooooong', './projects/mineSweeper/index.html'))
    gPortfolioItems.push(createPortfolioItem('Todos', 'Todos', 'work work work', './img/portfolio/Todos.png', 'loooooooong', './projects/todos/index.html'))
    savePortfolioItems();
}
function createPortfolioItem(id, title, description, imgSrc, longDescription, url) {
    var PortfolioItem = {
        id: id,
        title: title,
        shortDiscription: description,
        imgSrc: imgSrc,
        longDescription: longDescription,
        creationDate: getCurrentDateTime(),
        category: 'Course projects',
        url: url
    }
    return PortfolioItem;
}
function getItemsToRender() {
    return gPortfolioItems;
}
function savePortfolioItems() {
    saveToStorage('PortfolioItems', gPortfolioItems);
}
function findPortfolioItemById(itemId) {
    return gPortfolioItems.find(function (PortfolioItem) {
        return PortfolioItem.id === itemId;
    });
}
