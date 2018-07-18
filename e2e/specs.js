// test heartbeat

function httpGet(siteUrl) {
    var http = require('http');
    var defer = protractor.promise.defer();

    http.get(siteUrl, function(response) {

        // var bodyString = '';

        response.setEncoding('utf8');

        // response.on("data", function(chunk) {
        //     bodyString += chunk;
        // });

        response.on('end', function() {
            defer.fulfill({
                statusCode: response.statusCode
                // bodyString: bodyString
            });
        });

    }).on('error', function(e) {
        defer.reject("Got http.get error: " + e.message);
    });

    return defer.promise;
}

it('should return 200 and contain proper body', function() {
    httpGet("http://localhost:8080/").then(function(result) {
        expect(result.statusCode).toBe(200);
        // expect(result.bodyString).toContain('Apache');
    });
});