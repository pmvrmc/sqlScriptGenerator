// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    scripts: {
        handler: {
            directory: { path: './public/scr' }
        },
        id : 'scripts'
    },
    views: {
      handler: {
        directory: { path: './public/views' }
      },
      id : 'views'
    },
    bower: {
        handler: {
            directory: { path: './public/bower_components' }
        },
        id : 'bower'
    }
}
