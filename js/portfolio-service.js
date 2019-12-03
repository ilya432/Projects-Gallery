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
    gPortfolioItems.push(createPortfolioItem('InPicture', 'In picture', 'Changing questions with pictures', './img/portfolio/inPicture.png', 'A small survey with changing pictures and optional answers', './projects/in-picture/index.html'))
    gPortfolioItems.push(createPortfolioItem('Minesweeper', 'The minesweeper game', './img/portfolio/minesweeper.png', 'A minesweeper game - clear cells & avoid bombs', './projects/mineSweeper/index.html'))
    gPortfolioItems.push(createPortfolioItem('Todos', 'Todos', 'Keep your TODOs in order', './ img / portfolio / Todos.png', 'A place to put your TODO notes', './ projects / todos / index.html'))
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
