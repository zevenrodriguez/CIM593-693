#Week 1 Notes

##About the Internet

##Unix

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


###WHAT IS GIT?

Git is a free and open source version control system/software. Once you initialize git in a directory, it tracks changes in your code. This is called initializing a repository.

Their are severial ways you can use git:

* command line
* gui interface / Github Desktop for Mac/PC
 * Note: When installing Github Desktop make sure you install command line tools.
 * Under the programs preferences you will need to add your github credentials.
* [Brackets Git](https://github.com/zaggino/brackets-git) - Install as a plugin on brackets

###WHAT IS GITHUB?

Github is a service that hosts git repositories remotely. It is like a Dropbox or Google Drive for code. Once you initialize your repository you can link it with a github repository. The easiest way to create a repository and link it is with the Github Desktop app. Below you’ll see how to create a local repo and upload it to Github.

###CREATING A REPO

[Creating a repository with Github Desktop from Zeven Rodriguez on Vimeo.](https://vimeo.com/179796579 )

Also see https://help.github.com/articles/create-a-repo/

###WHAT IS A GIST?

Gists are part of github. They are a quick way to share code with out having to create a repository. They are hosted on github but are not local to your computer. Gists are useful for quickly sending code when something is not working or sharing/working on snippets of code

 

###Common Git Terminal Commands

####git init

When creating a repository from scratch you need to call git init to start git

####git status

Tells you the current status of you repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

If you have already created a repository you can use git clone to copy that repository from github to your computer
Your general workflow when using git, will be navigating to your repo folder and executing these commands.

####git add .

Will add all the changes you have made since your last commit.

####git commit -m “your commit”

This will save your changes

####git push origin master

If configured correctly, will upload your changes to github.


##Intro to Forms

####[Form Input Types](http://www.w3schools.com/html/html_form_input_types.asp)

####[Understanding Response Headers](http://learn.onemonth.com/understanding-http-basics)

In UNIX

Command >> telnet google.com 80

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