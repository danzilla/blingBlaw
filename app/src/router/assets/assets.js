/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it simple
 */
const express = require('express');
const router = express.Router();

// User - Dashboard
// GET - user page
const viewAssets = require('./assetsConfig/viewAssets');
router.route('/').get(viewAssets.viewAssets);

module.exports = router;
