var q = require('q'),
    pg = require('pg');

module.exports.configure = function(config) {
    module.config = config;
}

module.exports.connect = function(queryCallback) {
    pg.connect(module.config, function(err, client, done) {
        queryCallback(err, client, done);
    });
}

module.exports.query = function(sqlQuery, queryParams) {
    var deferred = q.defer();

    if (sqlQuery == null) {
        var paramError = new Error('sqlQuery is null');

        errorHandler('Pg-promise query error:', paramError, deferred);
        return;
    }

    var params = queryParams || [];

    pg.connect(module.config, function(err, client, done) {
        if (err) {
            errorHandler('Pg-promise connection error:', err, deferred);
            return;
        }

        if(params.length < 1) {
            client.query(sql, function(error, result) {
                normalQueryHandler(error, result, deferred, done);
            });
        } else {
            client.query(sql, p, function(error, result) {
                normalQueryHandler(error, result, deferred, done);
            });
        }
    });

    return deferred.promise;
}

function normalQueryHandler (error, result, deferred, done) {
    done();

    if (error) {
        errorHandler('Pg-promise query error:', error, deferred);
        return;
    }

    deferred.resolve(result.rows);
}

function errorHandler(errorString, error, deferred) {
    console.error(errorString, error);
    deferred.reject(error);
}
