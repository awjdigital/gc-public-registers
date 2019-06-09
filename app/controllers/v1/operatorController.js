const version = "v1"
const registerData = require('../../data/register.json')

exports.operator_summary_get = function (req, res) {

    res.render(version + '/operator/summary', {
        version
    })
}

exports.operator_search_get = function (req, res) {

    var r = Math.random();
    console.log(r)

    if (r > 0.5) {
        res.render(version + '/operator/search', {
            version,
            registerData
        })
    } else {
        res.render(version + '/operator/search-b', {
            version,
            registerData
        })
    }
}

exports.operator_results_get = function (req, res) {

    // Value from the form
    var query = req.body.search;
    var count = 0;

    // Query the file

    res.render(version + '/operator/results', {
        version,
        count,
        registerData
    })
}