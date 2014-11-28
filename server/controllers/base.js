module.exports = {
    
    index: {
        handler: function(request, reply){
            reply.view('index');
        }
    },
    
    postTax: {
        handler: function(request, reply){
            console.log("LOGGIN REQUEST " + request.payload)
            reply(request.payload);
        }
    },

    missing: {
        handler: function(request, reply){
            reply.view('404', {
                title: 'You found a missing page, but won the 404 error!'
            }).code(404);
        },
        app: {
            name: '404'
        }
    }
}
