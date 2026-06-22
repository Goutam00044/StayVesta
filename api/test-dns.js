const dns = require('dns').promises;
dns.resolveSrv('_mongodb._tcp.stay-vesta.otlfdad.mongodb.net')
  .then(r => console.log('SRV result:', r))
  .catch(err => console.error('SRV error:', err));