const express = require('express')
const router = express.Router()
const version = "v1"

var core_Controller = require('./controllers/coreController.js')
var hub_Controller = require('./controllers/' + version + '/hubController.js')
var operator_Controller = require('./controllers/' + version + '/operatorController.js')

router.get('/', core_Controller.home_get);
router.get('/core/changelog', core_Controller.changelog_get);


// Hub
router.get('/' + version + '/hub/', hub_Controller.home_get);
router.post('/' + version + '/hub/journey', hub_Controller.journey_post);
router.post('/' + version + '/hub/results', hub_Controller.hub_results_post);


// Operator
router.get('/' + version + '/operator/summary', operator_Controller.operator_summary_get);
router.get('/' + version + '/operator/search', operator_Controller.operator_search_get);
router.post('/' + version + '/operator/results', operator_Controller.operator_results_post);
router.get('/' + version + '/operator/results', operator_Controller.operator_results_post);
router.get('/' + version + '/operator/detail/:id', operator_Controller.operator_detail_get);

module.exports = router
