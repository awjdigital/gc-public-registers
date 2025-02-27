var config = require('./config');
const sql = require('mssql');


async function sanctionsRegisterData(query) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let all = getAllSanctions(query);
    let q = searchSanctions(query);    
    let set = getAllSettlements(query);

    sqlResult['allSanctions'] = await all;
    sqlResult['searchedSanctions'] = await q;
    sqlResult['allSettlements'] = await set;


    sql.close()
    return sqlResult;
}

async function getAllSanctions(query) {
    try {

        console.log('get sanctions all');

        if(query === 'all')
        {
        return await sql.query("SELECT sa.Id, ss.status, pr.AccountNo, sa.decidedon, pr.account, pr.Applicantfirstname, sa.Details, pr.Applicantsurname, pr.remotestatus " +
            "FROM [Sanctions] as sa  " + 
            "INNER JOIN [PublicRegisterReporting] as pr  " + 
            "ON pr.AccountNo = sa.AccountNumber  " + 
            "INNER JOIN [SanctionStatus] as ss  " + 
            "ON sa.[Status] = ss.Id  " + 
            "where sa.Enabled = 1 order by sa.decidedon desc");
        }
        else{
            return await sql.query("SELECT sa.Id, ss.status, pr.AccountNo, sa.decidedon, pr.account, pr.Applicantfirstname, pr.Applicantsurname, pr.remotestatus " +
            "FROM [Sanctions] as sa " +
            "INNER JOIN [PublicRegisterReporting] as pr " +
            "ON pr.AccountNo = sa.AccountNumber " +
            "INNER JOIN [SanctionStatus] as ss " +
            "ON sa.[Status] = ss.Id " +
            "where sa.Enabled = 1 " +
            "and (sa.AccountNumber) like'%" + query + "%' " +
            "or (sa.Status) like'%" + query + "%' " +
            "or (pr.account) like'%" + query + "%' " +
            "or (pr.Applicantfirstname) like'%" + query + "%' ");
        }



    } catch (err) {
        console.log(err + "Get all sanctions");
    }
}

async function getAllSettlements(query) {
    try {

        console.log('get settlements all');


        if(query === 'all')
        {
        return await sql.query("SELECT pr.AccountNo, n.decidedon, pr.account, pr.Applicantfirstname, pr.Applicantsurname, pr.remotestatus, n.details "+
        "FROM [dbo].[Notes] as n "+
        "inner join [dbo].[PublicRegisterReporting] as pr "+
        "on pr.AccountNo = n.AccountNumber order by n.decidedon desc");
        }
        else{
            return await sql.query("SELECT pr.AccountNo, n.decidedon, pr.account, pr.Applicantfirstname, pr.Applicantsurname, pr.remotestatus, n.details "+
            "FROM [dbo].[Notes] as n "+
            "inner join [dbo].[PublicRegisterReporting] as pr "+
            "on pr.AccountNo = n.AccountNumber "+
            "where pr.AccountNo like'%" + query + "%' " +
            "or pr.account like'%" + query + "%' " +
            "or pr.Applicantfirstname like'%" + query + "%'  order by n.decidedon desc");
        }

    } catch (err) {
        console.log(err + "Get all notes");
    }
}

async function searchSanctions(query) {
    try {

        console.log('get sanctions query');
        console.log(query);

        // Make the string an array
        var nameArray = query.split(' ');
        console.log(nameArray);
        console.log(nameArray.length);
        if (nameArray.length === 1) {

            return await sql.query("SELECT sa.Id, ss.status, pr.AccountNo, sa.decidedon, pr.account, pr.Applicantfirstname, pr.Applicantsurname, pr.remotestatus " +
                "FROM [Sanctions] as sa " +
                "INNER JOIN [PublicRegisterReporting] as pr " +
                "ON pr.AccountNo = sa.AccountNumber " +
                "INNER JOIN [SanctionStatus] as ss " +
                "ON sa.[Status] = ss.Id " +
                "where sa.Enabled = 1 " +
                "and (sa.AccountNumber) like'%" + query + "%' " +
                "or (sa.Status) like'%" + query + "%' " +
                "or (pr.account) like'%" + query + "%' " +
                "or (pr.Applicantfirstname) like'%" + query + "%' ");
        }


    } catch (err) {
        console.log(err + "search all sanctions");
    }
}


module.exports = sanctionsRegisterData;