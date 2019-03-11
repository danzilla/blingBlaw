/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();

// Search - Dashboard
// GET - search page
const viewSearch = require('./searchConfig/viewSearch');
router.route('/').get(viewSearch.viewSearch);

//
// GET - /search/naics
const naicsSearch = require('./searchConfig/naicsSearch');
router.route('/naics').get(naicsSearch.naicsSearch);
//
// GET - /search/naics/classtitle
const classtitleSearch = require('./searchConfig/classtitleSearch');
router.route('/naics/classtitle').get(classtitleSearch.classtitleSearch);
//
// GET - /search/clickSearch
const clickSearch = require('./searchConfig/clickSearch');
router.route('/clickSearch').get(clickSearch.clickSearch);



module.exports = router;
