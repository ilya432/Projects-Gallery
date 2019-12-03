'use strict'

function init() {
    loadPortfolioItems();
    renderPortfolio();
}

// $(document).ready(function () {
//     loadPortfolioItems();
//     renderPortfolio();
// });

function renderPortfolio() {
    var elPortfolio = document.querySelector('.portfolioItems');
    var items = getItemsToRender();
    var strHtml = items.map(function (item) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal('${item.id}')">
              <div clasportfolio-links="portfolio-hover">
                <div class="portfolio-hover-content">                  
                </div>
              </div>
              <img class="img-fluid" src="${item.imgSrc}" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>${item.title}</h4>
              <p class="text-muted">>${item.shortDiscription}</p>
            </div>
          </div>`
    });
    elPortfolio.innerHTML = strHtml.join('');
}
function renderModal(itemId) {

    var PortfolioItem = findPortfolioItemById(itemId);

    var elModalDiv = document.querySelector('.modal-body');
    var strHtml = `<h2>${PortfolioItem.title}</h2>
          <p class="item-intro text-muted">${PortfolioItem.shortDiscription}</p>
          <img class="img-fluid d-block mx-auto" src="${PortfolioItem.imgSrc}" alt="">
          <p>${PortfolioItem.longDescription}</p>
          <ul class="list-inline">
            <li>${PortfolioItem.creationDate}</li>
            <li>${PortfolioItem.category}</li>
            <a target="_blank" href="${PortfolioItem.url}">Check it out </a>
          </ul>
          <button class="btn btn-primary" data-dismiss="modal" type="button">
              <i class="fa fa-times"></i>Close Project</button>`;
    elModalDiv.innerHTML = strHtml;
}
function sendMessage() {

    var URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=ilya432@gmail.com&su=SUBJECT&body=BODY';
    window.location.assign(URL);
}

