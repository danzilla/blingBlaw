/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */

//  config.pageInfo | flashData |
const config = require("../../../modules/config");

// // TODO:
// // TODO: ALL DATABASE - USE JOIN and COMBINE ALL into ONE TABLE - for view
module.exports = {
  // GET - viewUser
  clickSearch: function(req, res, next) {
    // get session info
    config.pageInfo.sessionName = req.session.user;
    config.pageInfo.request = "get";
    config.pageInfo.active = "active";
    config.pageInfo.page = "Search:ALL:";
    console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");
    // if session user is empty
    if (!req.session.user) {
      // if session empty // redirect login page
      res.redirect('/');
      console.log("\nSession incorrect - going Home\n");
    } else { // else
      console.log("Active session: " + req.session.user);


      // OEED - query all naics
      const oeedDB = require("../../../modules/oeedDB");
      // import from QI - /search/naics
      console.log("query classtitle")
      var classtitle = req.query.classtitle;
      if (!classtitle) {
        res.send("classtitle undefined");
      } else {
        let query = "select * from naics where classtitle= '" + classtitle + "';"
        oeedDB.pool.query(query, function(err, result) {
          console.log(query);
          if (err) {
            res.send(err);
          } else {
    
            var responses = getLatLong(result.rows);
            responses.then(function(result) {
              console.log("clickSearch: ", result)
              //flatten nested array
              var response = [].concat.apply([], result);
              console.log("clickSearch response: ", response);
              res.send(response);
    
            }, function(error) {
              console.log("clickSearch: ", error)
              res.send(error)
            })
          }
    
        });
      }

    }
  },

  getLatLong: function(rows) {
    return new Promise(async function(resolve, reject) {
      allResolved = true;
      responses = [];
      let error;
      queryArray = [];
      for (let row of rows) {
        query = "select * from primary_producers where naics ='" + row.code + "';"
        queryArray.push(query);
      }
  
      const promises = queryArray.map(queryLatLong);
      await Promise.all(promises).then(function(result) {
        console.log("getLatLong: ", result);
        resolve(result)
      }, function(err) {
        console.log("getLatLong: ", err);
        reject(err)
      });
  
    })
  
  },
  queryLatLong: function(query) {
    console.log(query);
    return new Promise(function(resolve, reject) {
      pool.query(query, function(err, result) {
  
        if (err) {
          reject(err)
        } else {
          response = []
  
          if (result && result.rows) {
  
            for (let prow of result.rows) {
              if (prow.lat) {
                if (!response.includes(JSON.stringify({
                    "lat": prow.lat,
                    "long": prow.long
                  }))) {
                  response.push(JSON.stringify({
                    "lat": prow.lat,
                    "long": prow.long
                  }));
                }
              }
            }
          }
          console.log("queryLatLong: ", response)
          resolve(response)
        }
      })
    });
  },
  
  /* get address**********************************/
  getAdresses: function(rows) {
    return new Promise(async function(resolve, reject) {
      allResolved = true;
      responses = [];
      let error;
      queryArray = [];
      for (let row of rows) {
        query = "select * from primary_producers where naics ='" + row.code + "';"
        queryArray.push(query);
      }
  
      const promises = queryArray.map(queryAdress);
      await Promise.all(promises).then(function(result) {
        console.log("getAddresses: ", result);
        resolve(result)
      }, function(err) {
        console.log("getAddresses: ", err);
        reject(err)
      });
  
    })
  
  },
  queryAdress: function(query) {
    console.log(query);
    return new Promise(function(resolve, reject) {
      pool.query(query, function(err, result) {
  
        if (err) {
          reject(err)
        } else {
          response = []
  
          if (result && result.rows) {
  
            for (let prow of result.rows) {
              if (prow.mailingfulladdress) {
                if (!response.includes(prow.mailingfulladdress)) {
                  response.push(prow.mailingfulladdress);
                }
  
              }
            }
          }
          console.log("queryAddress: ", response)
          resolve(response)
        }
      })
    });
  }
  /*get address end ********************************/


// end of EXPORT
}
