# disqusjs-proxy

一个使用 Node.js 编写的 Disqus API Proxy 的示例。

## 本地运行
```
npm install
npm start
```

## 部署到 Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ysc3839/disqusjs-proxy) 👈点此直接部署

或
```
heroku create
git push heroku master
heroku open
```

## 自定义
自定义参数在 `config.json` 文件中。

- `refererHost`: 检查请求来源 ([Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer)) 的主机名。  
  该选项会检查请求头中的 `Referer` 可以阻止他人使用你的代理。  
  可以是单个域名 `"disqus.example.com"` 也可以是域名数组 `["test.example.com", "disqus.example.com"]`。  
  设为 `false` 可禁用检查。
  > 开启该选项后若检查不通过会返回 404，不返回 403 是因为这么做可以让 Firebase 缓存该结果。
    开启后无法直接在地址栏中访问，因为直接访问时浏览器不会发送 `Referer`。
- `resHeaders`: 添加或修改响应头，可以设置 `Cache-Control` 让 Firebase 缓存反代的结果。
- `proxyOpt`: 传递给 http-proxy-middleware 的[选项](https://github.com/chimurai/http-proxy-middleware#options)。
  - `pathRewrite`: 设置子目录重写。默认的子目录是 `/disqus/`，如果你想修改，需要同时修改 `config.json` 和 `firebase.json`。
