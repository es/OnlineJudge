[![Build Status](https://travis-ci.org/EmilS/OnlineJudge.png?branch=master)](https://travis-ci.org/EmilS/OnlineJudge)
# Programming Contest Judge

Online Judge is a programming contest judge built with Node.js (Express), AngularJS, PostgreSQL, and Docker.


## Development
4 steps to begin hacking on Online Judge:

1. Download [Vagrant](http://www.vagrantup.com/) and make sure it's hooked up to a provider.
2. Clone the repository to your machine.
3. Run `vagrant up` from the root of your clone (takes about 10min for everything to get up and running).
4. Run `vagrant ssh` to access the newly provisioned development server.
5. Run `npm start` from the root of your clone to start Online Judge.
 
Visit [localhost:3000](http://localhost:3000) in your browser to see your locally running version of Online Judge.

You can stop Online Judge by typing Control-C in the terminal.

### Testing
To test Online Judge run `npm test` from the root of your clone.