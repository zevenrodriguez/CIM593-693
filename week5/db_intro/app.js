'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');

const fs = require("fs");

const Sequelize = require('sequelize');



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


var sequelize = new Sequelize('db', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: 'db.sqlite'
});


var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});


server.register([Blipp, Inert, Vision], () => {});

server.views({
    engines: {
        html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    helpersPath: 'views/helpers',
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
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: './',
            listing: false,
            index: false
        }
    }
});

server.route({

    method: 'POST',
    path: '/form',
    handler: function (request, reply) {
        var formresponse = JSON.stringify(request.payload);
        //console.log(formresponse.length);


        reply.view('formresponse', {
            formresponse: formresponse
        });
    }
});


server.route({
    method: 'GET',
    path: '/createDB',
    handler: function (request, reply) {
        // force: true will drop the table if it already exists
        User.sync({
            force: true
        }).then(function () {
            // Table created
            return User.create({
                firstName: 'John',
                lastName: 'Hancock'
            });
        });
        reply("saved")
    }
});

server.route({
    method: 'GET',
    path: '/addDB/{first}/{last}',
    handler: function (request, reply) {

        User.create({
            firstName: encodeURIComponent(request.params.first),
            lastName: encodeURIComponent(request.params.last)
        });

        User.sync();

        reply("saved first last");
    }
});

server.route({
    method: 'GET',
    path: '/displayAll',
    handler: function (request, reply) {

        //console.log(typeof(User.findAll()));


        //        var displayAll = JSON.stringify(User.findAll({limit: 10}));
        //        console.log(displayAll);

        User.findAll().then(function (users) {
            // projects will be an array of all Project instances
            //console.log(users[0].firstName);

            users.forEach(function (display) {

                console.log(display.firstName);
            });


        });

        reply("saved first last");
    }
});


server.route({
    method: 'GET',
    path: '/destroyAll',
    handler: function (request, reply) {

        User.drop();

        reply("destroy all");
    }
});



server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
