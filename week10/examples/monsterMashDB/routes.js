'use strict';

module.exports =[


   {
        method: 'GET',
        path: '/',
        handler: {
            view: {
                template: 'index'
            }
        }
    },

    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './',
                listing: false,
                index: false
            }
        }
    },


    {
        method: 'GET',
        path: '/createDB',
        handler: function (request, reply) {
            // force: true will drop the table if it already exists
            Monster.sync({
                force: true
            })
            reply("Database Created")
        }
    },


    {
        method: 'GET',
        path: '/createMonster',
        handler: {
            view: {
                template: 'createmonster'
            }
        }
    },

    {

        method: 'POST',
        path: '/formMonster',
        handler: function (request, reply) {
            var formresponse = JSON.stringify(request.payload);
            var parsing = JSON.parse(formresponse);
            //console.log(parsing);

            Monster.create(parsing).then(function (currentMonster) {
                Monster.sync();
                console.log("...syncing");
                console.log(currentMonster);
                return (currentMonster);
            }).then(function (currentMonster) {

                reply.view('formresponse', {
                    formresponse: currentMonster
                });
            });
        }
    },

    {
        method: 'GET',
        path: '/displayAll',
        handler: function (request, reply) {
            Monster.findAll().then(function (users) {
                // projects will be an array of all User instances
                //console.log(users[0].monsterName);
                var allUsers = JSON.stringify(users);
                reply.view('dbresponse', {
                    dbresponse: allUsers
                });
            });
        }
    },

    {
        method: 'GET',
        path: '/destroyAll',
        handler: function (request, reply) {

            Monster.drop();

            reply("destroy all");
        }
    },

    {
        method: 'GET',
        path: '/delete/{id}',
        handler: function (request, reply) {


            Monster.destroy({
                where: {
                    id: encodeURIComponent(request.params.id)
                }
            });

            reply().redirect("/displayAll");
        }
    },

    {
        method: 'GET',
        path: '/find/{monsterName}',
        handler: function (request, reply) {
            Monster.findOne({
                where: {
                    monsterName: encodeURIComponent(request.params.monsterName),
                }
            }).then(function (user) {
                var currentUser = "";
                currentUser = JSON.stringify(user);
                //console.log(currentUser);
                currentUser = JSON.parse(currentUser);
                console.log(currentUser);
                reply.view('find', {
                    dbresponse: currentUser
                });

            });
        }
    },


    {
        method: 'GET',
        path: '/update/{id}',
        handler: function (request, reply) {
            var id = encodeURIComponent(request.params.id);


            reply.view('updatemonster', {
                routeId: id
            });
        }

    },

    {
        method: 'POST',
        path: '/update/{id}',
        handler: function (request, reply) {
            var cm = "";
            var id = encodeURIComponent(request.params.id);
            var formresponse = JSON.stringify(request.payload);
            var parsing = JSON.parse(formresponse);
            //console.log(parsing);

            Monster.update(parsing, {
                where: {
                    id: id
                }
            });

            reply().redirect("/displayAll");

        }

    }


];
