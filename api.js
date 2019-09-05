/**
 * @typedef {import('express').Request} request
 * @typedef {import('express').Response} response
 */
'use strict';
const {URL} = require('url');

module.exports = function(config) {
  /** @type {import('http-proxy-middleware').Config} */
  const option = {
    target: 'https://disqus.com/api/',
    secure: true,
    changeOrigin: true,
    ...config.proxyOpt,
  };

  if (config.resHeaders) {
    option.onProxyRes = (proxyRes, req, res) => {
      if (proxyRes.statusCode === 200) {
        Object.assign(proxyRes.headers, config.resHeaders);
      }
    };
  }

  const proxy = require('http-proxy-middleware')(option);

  /**
   * @param {request} req
   * @param {response} res
   */
  return function(req, res) {
    if (config.refererHost) {
      let pass = false;
      try {
        const hostname = new URL(req.header('referer')).hostname;
        if (typeof config.refererHost === 'string') {
          pass = (hostname === config.refererHost);
        } else if (config.refererHost instanceof Array) {
          pass = config.refererHost.includes(hostname);
        }
      } catch (e) {}
      if (!pass) {
        res.status(404)
            .set('vary', 'Referer')
            .set('cache-control', 'public, max-age=604800, s-maxage=604800')
            .end();
        return;
      }
    }

    proxy(req, res);
  };
};
