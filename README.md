# test1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

``` bash
# vue version 2.9.6
# 创建项目
vue init webpack 项目名称
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


一、安装 vuecli
   须知：4.0 的cli安装需要，卸载之前的cli 不论是3.0 还是2.0的，都需要卸载
   卸载旧版本的cli命令：npm uninstall vue-cli -g 或 yarn global remove vue-cli
二、Node 版本要求
    Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。
    你可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本。
三、安装新的cli 4.0版本
   npm install -g @vue/cli
    # or
   yarn global add @vue/cli
安装之后，用这个命令来检查其版本是否正确：
    vue --version
这样的提示是正确的：
    $ vue --version
    @vue/cli 4.0.5
四、快速原型开发
   使用 vue serve 和 vue build 命令对单个 *.vue 文件进行快速原型开发，
   不过这需要先额外安装一个全局的扩展：命令如下：
    npm install -g @vue/cli-service-global
vue serve 的缺点：
   就是它需要安装全局依赖，
   这使得它在不同机器上的一致性不能得到保证。因此这只适用于快速原型开发

你所需要的仅仅是一个 App.vue 文件：

<template>
  <h1>Hello!</h1>
</template>
然后在这个 App.vue 文件所在的目录下运行：

vue serve
vue serve 使用了和 vue create 创建的项目相同的默认设置 (webpack、Babel、PostCSS 和 ESLint)。
它会在当前目录自动推导入口文件——入口可以是 main.js、index.js、App.vue 或 app.vue 中的一个。
你也可以显式地指定入口文件：

vue serve MyComponent.vue
如果需要，你还可以提供一个 index.html、package.json、
安装并使用本地依赖、甚至通过相应的配置文件配置 Babel、PostCSS 和 ESLint。



五、创建一个项目
#vue create
运行以下命令来创建一个新项目：
   vue create hello-world 
六、使用图形化界面
你也可以通过 vue ui 命令以图形化界面创建和管理项目：
    vue ui

vue项目需要安装的插件：
1. 安装elment ui   
     $  npm i element-ui -S
2. 安装axios
     $  npm install axios -S
3. 安装vuex
     $  npm install vuex --save
4. 安装 vue router
     $  npm install vue-router
5.安装node-sass
      $ npm install node-sass --save-dev
      $ npm install sass-loader -D
      $ npm install node-sass -D