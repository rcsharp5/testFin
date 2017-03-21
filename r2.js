exports = function () {
    this.launchOpenfin = function (config) {

        var openfinLauncher = require('openfin-launcher');

        console.log(configPath);
        return openfinLauncher.launchOpenFin({
            configPath: config ? config : configPath
        }).then(function () {
            console.log('success!');
        })
            .fail(function (error) {
                console.log('error!', error);
            });
    };
}
