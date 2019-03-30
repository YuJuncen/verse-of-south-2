# 南方之诗

### 简述

这个网站是我的个人网站。  
总体上来讲，没有什么有趣的故事。  
  
最开始的时候，这是个“实验室”，我想要用它去尝试各种各样的技术；
它伴随我一起成长——并不是通过日记，而是通过代码。  
但是我却给了他一个过高的起点：我试着用前端框架和 UI 库去开发前端；后端则仅仅是基于 Flask 的简单的 CRUD（遇到的最大挑战则是分页）；
事实上，它可能根本就没有使用上真正的数据库。  
  
或许应该重新思考一下这些事情。
- 是否真的需要一个管理后台？
    - 其中一个替代计划是控制台接口，仅仅在服务器上提供通信。
- 命令式和响应式的界限究竟在哪里？
    - 纯响应式绘制 UI 不太理智，重要的或许在“信息”，就是说，用户的点击和 ajax 请求得到的那些东西；`subscribe` 他们之后使用命令式风格去挂载 UI 试试看吧。

### 文件结构

现在，这个仓库里面大体上是前端部分。  
<del>我试着使用原生 ECMAScript 来完成这个项目；使用 `<template>` 标签和一些特殊函数去生成页面；</del>  
现在，使用了 `angular` 来进行了重构；`angular` 里面有太多我向往的东西了：TypeScript 也好， RxJS 也好。  
另一方面的原因则是我找不到几乎任何用原生 js 来完成 ssr 的组件——我可能需要为此寻找或者发明一套工具（包括服务端的 DOM 实现、静态资源自动构建的脚本等）；
如果要这样做，要付出的代价实在太大了……  
我可能不会为它写测试了（也有可能单纯地为了练习来写一些测试，但是意义并不大就对了）。  
不写测试完全是我个人的任性：如果要使用测试驱动开发那一套，问题在于我到现在还是不知道我究竟想要什么。每次的功能都是在开发时才突然想到的……  
另一方面呢，测试在重构上也有意义。但是我到现在仍旧没有真正大规模“重构”过（切换到 `Angular` 那一次更加像是重写）；学习这套测试套件也需要很多额外的时间，而且实在颇为无趣（其实这才是最主要的原因）；之后也许会认真重新考虑这些，但是现在暂且如是吧——如果测试对于南方之诗真的有必要，在某个日子一定会相遇的。


---

*以下是 `Angular CLI` 自动生成的。*
# VosFntNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
