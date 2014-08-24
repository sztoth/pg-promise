pg-promise
==========

Promise based postgres querying. You can also connect directly to postgres without the use of promises.

Examples:

Promise based:

var pg = require('pg-promise');

db.configure(someConfig);

pg.query('SELECT * FROM employees WHERE emp_id = $1', [employee_id])
  .then(function(results) {
      // do something with the results
  })
  .fail(function(error) {
      // do something with the error
  });


Direct access to pg client pool:

var pg = require('pg-promise');

db.configure(someConfig);

req.database.connect(function(error, client, done) {
  // do something useful
}

