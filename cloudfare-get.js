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
            CloudScrapper.get(url, function (error, response, body) {
                if(error) {
                    node.error(error);
                    return;
                }

                msg.payload = body;
                node.send(msg);
            }, headers);
        });
    }

    RED.nodes.registerType("cloudfare-get", CloudFareGetNode);
};