/* config-overrides.js */

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.watchOptions = {
        poll: 100
    };

    return config;
}