'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');

var fs = require('fs');
var imgur = require('imgur');



const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
    port: 3000
});


server.register([Blipp, Inert, Vision], () => {});

server.views({
    engines: {
        html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    //helpersPath: 'views/helpers',
    //partialsPath: 'views/partials'
});


server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: {
            template: 'index'
        }
    }
});

server.route({

    method: 'POST',
    path: '/imageUpload',
    config: {

        payload: {
            output: 'file',
            parse: true,
            //allow: 'multipart/form-data'
        }
    },
    handler: function (request, reply) {
        var data = request.payload;
       // if (data.file) {
            var name = data.file.filename;
            var path = __dirname + "/uploads/" + name;
            var file = fs.createWriteStream(path);

            file.on('error', function (err) {
                console.error(err)
            });

            data.file.pipe(file);

            data.file.on('end', function (err) {
                    var ret = {
                        filename: data.file.hapi.filename,
                        headers: data.file.hapi.headers
                    }
                    reply(JSON.stringify(ret));
                })
                //        console.log(data);
                //        if (data["fileUpload"].filename != "") {
                //            var name = data["fileUpload"].filename;
                //            console.log(name);
                //            var path = __dirname + "/public/uploads/" + name;
                //            var file = fs.createWriteStream(path);
                //
                //            file.on('error', function (err) {
                //                console.error(err)
                //            });
                //
                //            data.file.pipe(file);
                //
                ////            file.on('finish', function () {
                ////                console.log('file has been written');
                ////                var uploadInfo = {
                ////                        filename: data["fileUpload"].filename,
                ////                        headers: data["fileUpload"].headers,
                ////                        link: path
                ////                    }
                ////                    //reply(JSON.stringify(ret));
                ////
                ////                reply.view('imageuploaded', {
                ////                    uploaded: uploadInfo
                ////                })
                ////            });


       // };
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
