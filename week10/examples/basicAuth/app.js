'use strict';

const Bcrypt = require('bcryptjs');
const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');

const server = new Hapi.Server();
server.connection({
    port: 3000
});

const users = {
    john: {
        username: 'john',
        password: 'hello', // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validate = function (request, username, password, callback) {
    console.log("...Validating");
    const user = users[username];
    console.log(user);
    if (!user) {
        return callback(null, false);
        console.log("wrong");
    } else {
        if (password == user.password) {
            console.log("correct");
            return callback(null, true, {
                name: user.name

            });
        }
    }

    //
    //    if(password == user.password){
    //         return callback(null, true, {username: user.username});
    //    }
    //
    //
    //
    //        Bcrypt.compare(password, user.password, (err, isValid) => {
    //            console.log(password);
    //            console.log(user.password);
    //            callback(err, isValid, { id: user.id, name: user.name });
    //
    //            console.log("...comparing");
    //
    //        });
};

server.register(Basic, (err) => {

    if (err) {
        throw err;
    }

    server.auth.strategy('simple', 'basic', {
        validateFunc: validate
    });
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('server running at: ' + server.info.uri);
    });
});
