[![Deploy](https://assets.digitalocean.com/blog/sammy-cleaning-up.png)](https://www.digitalocean.com)
[![Deploy](http://backbonejs.org/docs/images/backbone.png)](https://www.digitalocean.com)

http://backbonejs.org/docs/images/backbone.png
# Backbone skeleton project for quick and easy deployment to digitalocean
This project is for easy deployment of a Backbone.js application for DigitalOcean accounts.

## Getting Started
1. Clone the repository on your local environment
2. Login to your digital ocean account.
3. Verify that you have an ssh key in your digital ocean account. If you don't have one, add a new one
4. Create Digital Ocean Droplet

** Application selection for Backbone Project ->  Ubuntu node v4.1.0 on 14.04


### Setup your droplet
1. connect to you droplet via ssh
```
    $ssh root@<droplet IP address> (use your droplet IP address)
```
2. Setup the git repo
```
    $ apt-get install git
    $ npm install bower -g
    $ cd /home/
    $ mkdir repo backbone_project
    $ cd repo
    $ git init --bare
    $ cd hooks
```
3. * edit post-receive with the script below

```
nano post-receive
```
```
    #!/bin/sh
    git --work-tree=/home/backbone_project/ --git-dir=/home/repo checkout -f

    cd /home/backbone_project

    npm install
    bower install --allow-root

    PORT=80 pm2 reload server.js
```
4. Make the hook executable
```
    $ chmod +x post-receive
```
5. Add production remote to local environment
```
    $ git remote add production ssh://root@<Droplet Ip adrees>/home/repo
```
6. Push code to new production remote
```
    $ git push production master
```


## Force the Push to Master
```
        $ git push production master --force
```

*  Once you push you project to production set the project server as pm2 task.
    This will register a pm2 task that will  work as deamon, and we can then reload this with every deploy.
```
    $ cd /home/backbone_project
    $ npm install -g pm2
    $ PORT=80 pm2 start server.js
```
