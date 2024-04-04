var instantsearch = require('instantsearch.js');
var header = require('./header.js');
var infiniteScrollWidget = require('../search/widgets/infinite_scroll.js');

module.exports = function (indexName) {
  return [
    instantsearch.widgets.searchBox({
      container: '#search-input'
    }),
    instantsearch.widgets.refinementList({
      container: '#tags',
      attributeName: 'tags',
      limit: 10,
      operator: 'or',
      templates: {
        // items: document.querySelector('#facet-template').innerHTML,
      }
    }),
    // instantsearch.widgets.refinementList({
    //   container: '#brand',
    //   attributeName: 'brand',
    //   limit: 10,
    //   operator: 'or',
    //   templates: {
    //     header: header('Brand')
    //   }
    // }),
    // instantsearch.widgets.rangeSlider({
    //   container: '#price',
    //   attributeName: 'price',
    //   templates: {
    //     header: header('Price')
    //   }
    // }),
    // instantsearch.widgets.menu({
    //   container: '#type',
    //   attributeName: 'type',
    //   limit: 10,
    //   templates: {
    //     header: header('Type')
    //   }
    // }),
    infiniteScrollWidget({
      container: '#hits',
      templates: {
        items: document.querySelector('#hits-template').innerHTML,
        empty: document.querySelector('#no-results-template').innerHTML
      },
      offset: 850
    })
  ];
};
