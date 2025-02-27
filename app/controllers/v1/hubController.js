const version = "v1";
const _ = require('lodash');
var mobileDetect = require('mobile-detect')

exports.hub_access_get = function (req, res) {

        req.session.data['ab'] = process.env.journey

        if (req.session.data['ab'] === undefined) {

        } else {

                const d = require('../../data/register.json')

                var qs1 = d.Accounts.Account.filter(function (value) {
                        return value.RemoteStatus === 'Operator';
                });
                var qs2 = d.Accounts.Account.filter(function (value) {
                        return value.RemoteStatus === 'Personal';
                });

                var countOL = qs1.length;
                var countPL = qs2.length;
                var countActions = 79;

                var r = req.session.data['ab']

                if (r === 'A') {
                        res.render(version + '/hub/accessibility-statement', {
                                version,
                                countOL,
                                countPL,
                                countActions
                        })
                } else {


                        var news;
                        var consultations;

                        Promise.all([
                                        client.getEntries({
                                                'content_type': 'news'
                                        }),
                                        client.getEntries({
                                                'content_type': 'consultation'
                                        })
                                ])
                                .then(([n, c]) => {

                                        news = n,
                                                consultations = c,

                                                res.render(version + '/hub/accessibility-statement', {
                                                        version,
                                                        countOL,
                                                        countPL,
                                                        countActions,
                                                        news,
                                                        consultations,
                                                })
                                })
                                .catch(error => {
                                        console.log(error);
                                });

                }
        }
}


exports.home_get = function (req, res) {

        req.session.data['ab'] = process.env.journey

        if (req.session.data['ab'] === undefined) {
                 
        } else {

                const d = require('../../data/register.json')

                var qs1 = d.Accounts.Account.filter(function (value) {
                        return value.RemoteStatus === 'Operator';
                });
                var qs2 = d.Accounts.Account.filter(function (value) {
                        return value.RemoteStatus === 'Personal';
                });

                var countOL = qs1.length;
                var countPL = qs2.length;
                var countActions = 79;

                var r = req.session.data['ab']

                if (r === 'A') {
                        res.render(version + '/hub/index', {
                                version,
                                countOL,
                                countPL,
                                countActions
                        })
                } else {
                        res.render(version + '/hub/index-b', {
                                version,
                                countOL,
                                countPL,
                                countActions
                        })
                }
        }
}

exports.journey_post = function (req, res) {

        
                req.session.data['ab'] = process.env.journey
        

        res.redirect('/' + version + '/hub/');
}

exports.hub_results_get = function (req, res) {

        var r = req.session.data['ab']
        const searchRegister = require('../../data/AzureSQL/searchFullRegister');
        let query = req.session.data['search']

        var statusFilter = req.session.data['status']
        var sectorFilter = req.session.data['sector']

        var emptySearch = 'false';
        let registerData = "";

        if (query === '') {
                emptySearch = 'true';
                res.render(version + '/operator/results-b', {
                        version,
                        emptySearch
                })
        } else {
                registerData = searchRegister(query, sectorFilter, statusFilter);

                registerData.then(result => {

                        if (r === 'A') {
                                res.render(version + '/hub/results', {
                                        version,
                                        registerData,
                                        result,
                                        emptySearch
                                })
                        } else {
                                var md = new mobileDetect(req.headers['user-agent']);

                                if (md.mobile() !== null) {

                                        res.render(version + '/hub/results', {
                                                version,
                                                registerData,
                                                result,
                                                emptySearch
                                        })
                                } else {
                                        res.render(version + '/hub/results', {
                                                version,
                                                registerData,
                                                result,
                                                emptySearch
                                        })
                                }
                        }


                }).catch(err => {
                        //  console.log(err);
                });
        }

}

exports.hub_results_post = function (req, res) {

        var r = req.session.data['ab']
        const searchRegister = require('../../data/AzureSQL/searchFullRegister');
        let query = req.session.data['search']

        var statusFilter = req.session.data['status']
        var sectorFilter = req.session.data['sector']

        var emptySearch = 'false';
        let registerData = "";

        if (query === '') {
                emptySearch = 'true';
                res.render(version + '/operator/results-b', {
                        version,
                        emptySearch
                })
        } else {
                registerData = searchRegister(query, sectorFilter, statusFilter);

                registerData.then(result => {

                        if (r === 'A') {
                                res.render(version + '/hub/results', {
                                        version,
                                        registerData,
                                        result,
                                        emptySearch
                                })
                        } else {
                                var md = new mobileDetect(req.headers['user-agent']);

                                if (md.mobile() !== null) {

                                        res.render(version + '/hub/results', {
                                                version,
                                                registerData,
                                                result,
                                                emptySearch
                                        })
                                } else {
                                        res.render(version + '/hub/results', {
                                                version,
                                                registerData,
                                                result,
                                                emptySearch
                                        })
                                }
                        }


                }).catch(err => {
                        //  console.log(err);
                });
        }

}