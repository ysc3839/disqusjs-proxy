# disqusjs-proxy-firebase

一个使用 [Firebase](https://firebase.google.com/) 部署 Disqus API Proxy 的示例。

## 简介

Firebase 提供 Serverless 部署服务，支持包括静态网页、微服务等。在这里我们使用 Firebase 的微服务功能部署一个 Disqus API 的反代。

## 使用教程

1. [创建 Firebase 项目](https://firebase.google.com/docs/web/setup#create-project)并[安装 Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)。
2. clone 此项目，前往 `functions` 目录下执行 `npm install` 安装运行时所必须的依赖。
   ```
   cd functions
   npm install
   cd ..
   ```
3. 参见[自定义](#自定义)配置相关参数。
4. 执行 `firebase deploy` 部署项目。

## 自定义
自定义参数在 `functions/config.json` 文件中。

- `refererHost`: 检查请求来源 ([Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer)) 的主机名。  
  该选项会检查请求头中的 `Referer` 可以阻止他人使用你的代理。  
  可以是单个域名 `"disqus.example.com"` 也可以是域名数组 `["test.example.com", "disqus.example.com"]`。  
  设为 `false` 可禁用检查。
  > 开启该选项后若检查不通过会返回 404，不返回 403 是因为这么做可以让 Firebase 缓存该结果。
    开启后无法直接在地址栏中访问，因为直接访问时浏览器不会发送 `Referer`。
- `resHeaders`: 添加或修改响应头，可以设置 `Cache-Control` 让 Firebase 缓存反代的结果。
- `proxyOpt`: 传递给 http-proxy-middleware 的[选项](https://github.com/chimurai/http-proxy-middleware#options)。
  - `pathRewrite`: 设置子目录重写。默认的子目录是 `/disqus/`，如果你想修改，需要同时修改 `config.json` 和 `firebase.json`。

## 注意事项

- Firebase 需要绑定银行卡 (不可使用银联，但可使用中国大陆发行的 Visa 或 MasterCard) 才能开启互联网出站访问 (访问 Disqus API)。如无此条件建议使用别的免费服务商。
- 绑定后选择 Blaze 方案，每月有 10GB 免费的流量，以及 5GB 免费的出站流量 (访问 Disqus API 的流量)。
