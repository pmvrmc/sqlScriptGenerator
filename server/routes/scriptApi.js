var Joi = require('joi');
var ScriptController = require('../controllers/scriptController')();

var register = function (plugin, options, next) {

    plugin.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply){
        reply.view('index');
      }
    });

    plugin.route({
      method: 'POST',
      path: '/scripts/{fileName}',
      handler: ScriptController.createScript,
      config: {
        validate:{
          params: {
            fileName : Joi.string().regex(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]_.+\.sql$/)
          },
          payload:{
            name: Joi.string().required(),
            schema: Joi.string().required(),
            env: Joi.string().required(),
            query: Joi.string().required(),
            date: Joi.date().required(),
            commit: Joi.number().min(0).max(100).required()
          }
        }
      }
    });

    plugin.route({
      method: 'GET',
      path: '/scripts/{fileName}',
      handler: ScriptController.getScript,
      config: {
        validate:{
          params: {
            fileName : Joi.string().regex(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]_.+\.sql$/)
          }
        }
      }
    });

    next();
};


register.attributes = {
	name : 'scriptApi',
	version : '0.0.1'
}

module.exports = register;
