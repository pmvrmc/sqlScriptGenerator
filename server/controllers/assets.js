// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    partials: {
        handler: {
            directory: { path: './public/partials' }
        },
        app: {
            name: 'partials'
        }
    },
    css: {
        handler: {
            directory: { path: './public/css' }
        },
        app: {
            name: 'css'
        }
    },
    js: {
        handler: {
            directory: { path: './public/js' }
        },
        app: {
            name: 'js'
        }
    },
    bower: {
        handler: {
            directory: { path: './public/bower_components' }
        },
        app: {
            name: 'bower'
        }
    }
}
