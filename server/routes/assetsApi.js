var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');

var register = function (plugin, options, next) {

    // ASSETS, JS, CSS, ETC.
    plugin.route({
      method: 'GET',
      path: '/scr/{path*}',
      config: controller.scriptAssets.scripts
    });

    plugin.route({
      method: 'GET',
      path: '/views/{path*}',
      config: controller.scriptAssets.views
    });

    plugin.route({
      method: 'GET',
      path: '/bower_components/{path*}',
      config: controller.scriptAssets.bower
    });

    next();
};


register.attributes = {
	name : 'assetsApi',
	version : '0.0.1'
}

module.exports = register;
