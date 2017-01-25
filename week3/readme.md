#Getting started with Node

##Basic Linux Commands

#####In UNIX

Commands
* telnet google.com 80
* Then type GET / HTTP/1.1
* Examin
* Press ESC and Enter to exit

####[Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

#####Typical Status Codes
* 200 - OK
* 302 - Found
 * URL redirection
* 400 - Bad Request
* 401 - Unauthorized
* 403 - Forbidden
* 404 - Not Found
* 500 - Internal Server Error
* 502 - Bad Gateway


Developer Tools
* Network > Headers


##Basic Unix Commands 

* Common commands
 * ls - List directory items
 * pwd - Current directory path
 * cd - Change directory
 * cd . - Goes to root directory
 * cd .. - Move up a directory
 * chmod - Change permission
  * chmod 777 file.txt
 * mkdir <directory name> - Make Directory
 * rm <filename> - Remove file
 * rmdir <directory name> - Remove directory


###About chmod

Every file and directory has nine permissions associated with it Files and directories have three types of permissions (or none): 

_r (read) w (write) x (execute) - (no permission)_

The above permissions occur for each of the following classes or users: 

_u (user/owner) g (group) o (other/world)_



## Installing Node

[Install NVM](https://github.com/creationix/nvm)

Install script 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash


To start a node project

npm init

Basic node code

```
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Save application as index.js

To run code in terminal type node app.js


