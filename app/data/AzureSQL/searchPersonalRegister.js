var config = require('../../data/AzureSQL/config');
const sql = require('mssql');


async function searchPersonalRegister(query) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = getAccount(query);


    sqlResult['registerData'] = await q;

    sql.close()
    return sqlResult;
}

async function getAccount(query) {
    try {

        // console.log('Query filter: ' + statusFilter)
        console.log('GetAccount query');
        console.log(query);

        // Make the string an array
        var nameArray = query.split(' ');
        console.log(nameArray);
        console.log(nameArray.length);
        if (nameArray.length === 1) {
       
            console.log("query single")
            return await sql.query("SELECT pr.accountno, pr.account, pr.towncity, pr.Applicantfirstname, ProcessEndDate, pr.Applicantsurname, al.product " +
                "FROM PublicRegisterReporting pr " +
                "inner join AccountProductsList al on pr.accountno = al.accountno and al.DeterminationStatus = 'Granted' " + 
                "WHERE Applicantfirstname like '%" + nameArray[0] + "%' " +
                "or pr.Applicantsurname like '" + nameArray[0] + "%' " +
                "or pr.accountno like '" + nameArray[0] + "%' " +
                "and pr.RemoteStatus = 'Personal' " +
                "order by pr.Applicantfirstname asc");
        } else if (nameArray.length > 1) {
            console.log("query multiple")
            return await sql.query("SELECT pr.accountno, pr.account, pr.towncity, pr.Applicantfirstname,ProcessEndDate, pr.Applicantsurname, al.product " +
                "FROM PublicRegisterReporting pr " +  
                "inner join AccountProductsList al on pr.accountno = al.accountno and al.DeterminationStatus = 'Granted' " + 
                "WHERE Applicantfirstname like '%" + nameArray[0] + "%' " +
                "and Applicantsurname like '" + nameArray[1] + "%' " +
                "and pr.RemoteStatus = 'Personal' " +     
                "or pr.accountno like '" + nameArray[0] + "%' " +
                "or pr.accountno like '" + nameArray[1] + "%' " +      
                "order by pr.Applicantfirstname asc");
        } else {
            console.log("query any")
            return await sql.query("SELECT pr.accountno, pr.account, pr.towncity, pr.Applicantfirstname,ProcessEndDate, pr.Applicantsurname, al.product " +
                "FROM PublicRegisterReporting pr " +
                "inner join AccountProductsList al on pr.accountno = al.accountno and al.DeterminationStatus = 'Granted' " + 
                "WHERE Applicantfirstname like '%" + nameArray[0] + "%' " +
                "and Applicantsurname like '" + nameArray[1] + "%' " +
                "and pr.RemoteStatus = 'Personal' " +
                "or pr.accountno like '" + nameArray[0] + "%' " +
                "or pr.accountno like '" + nameArray[1] + "%' " +
                "order by pr.Applicantfirstname asc");
        }


    } catch (err) {
        console.log(err);
    }
}




module.exports = searchPersonalRegister;