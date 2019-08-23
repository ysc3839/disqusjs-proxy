const functions = require('firebase-functions');
const URL = require('url').URL;
const config = require('./config.json');

const option = {
  target: 'https://disqus.com/api/',
  secure: true,
  changeOrigin: true,
  ...config.proxyOpt
};

if (config.resHeaders) {
  option.onProxyRes = (proxyRes, req, res) => {
    Object.assign(proxyRes.headers, config.resHeaders);
  };
}

const proxy = require('http-proxy-middleware')(option);

exports.disqus = functions.https.onRequest((req, res) => {
  if (config.refererHost) {
    var pass = false;
    try {
      const hostname = new URL(req.header('referer')).hostname;
      if (typeof config.refererHost === 'string') {
        pass = (hostname === config.refererHost);
      } else if (config.refererHost instanceof Array) {
        pass = config.refererHost.includes(hostname);
      }
    } catch (e) {}
    if (!pass) {
      res.set('cache-control', 'public, max-age=86400, s-maxage=86400').json({});
      return;
    }
  }

  proxy(req, res);
});
