'use strict';

var nconf = require('nconf');
nconf.argv().env().file({ file: 'local.json' });

module.exports = nconf;
