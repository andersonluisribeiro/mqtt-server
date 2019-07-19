var mosca = require('mosca');

var connectedCounter = 0;
var publishedCounter = 0;

console.log('before alcatore');

// var ascoltatore = {
//     //using ascoltatore
//     type: 'mongo',
//     url: 'mongodb://172.17.0.2:27017/mqtt',
//     pubsubCollection: 'ascoltatori',
//     mongo: {}
//   };
   
//   var moscaSettings = {
//     port: 1883,
//     backend: ascoltatore
//   };

var ascoltatore = {
    type: 'redis',
    redis: require('redis'),
    db: 12,
    port: 6379,
    return_buffers: true,
    host: "redis"
  };

  console.log('before mosca settings');
  
  var moscaSettings = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
      factory: mosca.persistence.Redis,
      host:  "redis"
    }
  };

  console.log('before server');

var server = new mosca.Server(moscaSettings);

console.log('before callbacks');

server.on('clientConnected', function (client) {
    connectedCounter++;

    console.log(`${connectedCounter} users connected`);

    if(connectedCounter % 200 == 0){
        console.log(`${connectedCounter} users connected`);
    }

});

// fired when a message is received
server.on('published', function (packet, client) {
    publishedCounter++;

    console.log(`${publishedCounter} published messages`);

    if(publishedCounter % 200 == 0){
        console.log(`${publishedCounter} published messages`);
    }
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}
