/**
 * Created by aaflalo on 14/09/16.
 */


module.exports = function (RED) {

    var CloudScrapper = require('cloudscraper');

    function CloudFareGetNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var url = this.url;
        this.on('input', function (msg) {
            url = msg.url ? msg.url : url;
            var headers = {} || msg.headers;
            var options = {
              uri: url,
              headers : headers
            };
            CloudScrapper.get(options).then(function (response) {
                msg.payload = response;
                node.send(msg);
            }).catch(function (reason) {
                node.error(reason);
            });
        });
    }

    RED.nodes.registerType("cloudfare-get", CloudFareGetNode);
};