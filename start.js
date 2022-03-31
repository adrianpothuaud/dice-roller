const liveServer = require('live-server');

const params = {
  logLevel: 2,
  open: false,
  port: 3000,
  watch: ['./js/', './index.html'],
};

liveServer.start(params);
