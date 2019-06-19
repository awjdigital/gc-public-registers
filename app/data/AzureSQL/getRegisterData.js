var config = require('../../data/AzureSQL/config');
const sql = require('mssql');


async function getRegisterData(query) {
    let sqlResult = {};
    sql.close()
    await sql.connect(config)

    let q = getOLDetail(query);
    let tn = getOLTradingNames(query);
    let dn = getOLDomainNames(query);
    let san = getOLSanctions(query);
    let act = getOLActivities(query);    
    let newlics = getNewLicences(query);
    let newacts = getNewLicenceActivities(query);

    sqlResult['registerData'] = await q ;
    sqlResult['tradingNames'] = await tn ;
    sqlResult['domainNames'] = await dn ;
    sqlResult['activities'] = await act ;    
    sqlResult['sanctions'] = await san ;    
    sqlResult['newLicenceInfo'] = await newlics ;    
    sqlResult['newLicenceActivityInfo'] = await newacts ;

    sql.close()
    return sqlResult;
}

async function getOLDetail(query) {
 
        try {

            return await sql.query("SELECT * from publicregisterreporting where accountno = "+query);
        } catch (err) {
          
            // console.log(err);
        }

    
}

async function getOLTradingNames(query) {
    try {

        return await sql.query("SELECT * from AllTradingNames where accountno = "+query +" order by status");
    } catch (err) {
      
        // console.log(err);
    }
}

async function getOLDomainNames(query) {
    try {

        return await sql.query("SELECT * from AllDomainNames where accountnumber = "+query + " order by AccountStatus, DomainName asc");
    } catch (err) {
              console.log(err);
    }
}

async function getOLActivities(query) {
    try {

        return await sql.query("SELECT * from AccountProductsList where accountno = "+query);
    } catch (err) {
      
        // console.log(err);
    }
}

async function getOLSanctions(query) {
    try {

        return await sql.query("SELECT sanctions.details, sanctions.decidedon, sanctionstatus.status from sanctions inner join sanctionstatus on sanctionstatus.id = sanctions.status where accountnumber = "+query);
    } catch (err) {
      
        console.log(err);
    }
}



async function getNewLicences(query) {
    try {

        return await sql.query("SELECT * from Licenses where accountno = "+query + " and start > '2016-06-18' and status in ('Active','Suspended', 'Surrendered', 'Revoked','Lapsed') order by start desc" );
    } catch (err) {
      
        // console.log(err);
    }
}

async function getNewLicenceActivities(query) {
    try {

        return await sql.query("SELECT distinct(Product), licenceid from Licenses inner join licenceactivities on Licenses.licencerowid = licenceactivities.licencerowid where accountno = " + query + " and [status] in('Active', 'Superseded', 'Revoked', 'Surrendered', 'Lapsed')");
    } catch (err) {
      
         console.log(err);
    }
}

module.exports = getRegisterData;