# wp5v3-fly-template

易于修改的基于 vue3 开箱即用的 webpack 模板, 且提供命令行接口.

# intro

`wp5v3-fly-template` 是一个易于定制的 `webpack` 模板, 适合在原有基础上进行修改. 且做了针对性优化有着不错的编译速度.

本项目集成了常用的模块:

- vue3
- vuex
- vue-router
- sass
- postcss
- tailwindcss
- @icon-park
- axios

另外还集成了两个业务中最常见的需求插件:

- webpack-tomlenv-plugin - 运行时和编译时环境变量注入工具
- axios-pluginify - 插件化 axios 工具和拦截器

另外还提供了命令行工具而不是传统的 npm 脚本, 现在可以使用更多参数选项.

# feature

## 命令行脚本

启动帮助:

```
npx . --help
```

启动本地服务:

```
npx . serve
npx . serve -D // 不使用 dllPlugin
npx . serve -C // 不使用文件系统缓存
npx . serve --cdn // 使用 webpack-cdn-plugin
```

打包:

```
npx . build
npx . build -c // 同时输出 gz 格式的文件
npx . build -D // 不使用 dllPlugin
npx . build -C // 不使用文件系统缓存
npx . build --cdn // 使用 webpack-cdn-plugin
```

重写生成 dll (基于 dllPlugin):

```
npx . gen-dll
```

清除全部缓存:

```
npx . clean
```

你可以修改 `/bin/index.js` 来实现更多命令行功能.

## 命令行全局启用

首先修改当前的 `package.json` 的 `name` 属性改为一个合适的项目名称.

然后执行:

```
npm link
```

原有的 `npx . serve` 现在成为了:

```
<修改后的项目名称> serve
<修改后的项目名称> build
<修改后的项目名称> gen-dll
```

你可以在任何一个位置来执行这个命令.

## sass 和 css-module 支持

本模板支持 `css-module`, 默认情况下 `css` 和 `scss` 都是开启了 `css-module` 支持的.

当然这个行为不会对 `node_modules` 下的模块生效.

你可以在扩展名称前加入 `.pure` 来避免这个行为:

```
app.pure.css
app.pure.scss
```

在单文件组件中则通过在 `style` 标签上使用 `module` 来开启这个功能, 通过 `$style.[类名称]` 来在模板中使用:

```html
<style module>
  .app {
    color: red;
  }
</style>

<template>
  <h1 :class="$style.app">{{ message }}</h1>
  <router-link to="/home">go to home</router-link>
</template>
```

在 `setup` 函数中还可以使用 `useCssModule` 来达到同样的目的:

```html
<script>
  import { h, useCssModule } from "vue";

  export default {
    setup() {
      const style = useCssModule();

      return () =>
        h(
          "div",
          {
            class: style.success,
          },
          "Task complete!"
        );
    },
  };
</script>

<style module>
  .success {
    color: #090;
  }
</style>
```

当然你也可以直接导入 `scss` 和 `css` 文件, 换句话说你不使用 `style` 标签:

```javascript
import { defineComponent } from "vue";
import style from "./App.css";

// style.app = 哈希过后的类名
console.log(style);

export default defineComponent(function index() {
  return {
    message: "hello world!",
  };
});
```

App.css:

```css
.app {
  color: red;
}
```

> 规范与教程
>
> > http://www.ruanyifeng.com/blog/2016/06/css_modules.html > https://github.com/css-modules/css-modules  
> > https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95

> vue3 API
>
> > https://v3.vuejs.org/api/global-api.html#usecssmodule

> loader
>
> > https://github.com/webpack-contrib/css-loader#modules  
> > https://github.com/webpack-contrib/style-loader#modules

## 静态文件托管

你可以在项目目录下新建 `static` 目录, 所有该目录下的文件都会以 `/static/` 作为 url 前缀.

`webpack` 不会去处理 `static` 目录下的任何内容, 也就是说从 `static` 中引入 jpg 文件会导致错误.

你可以新建 `src/assets` 目录来存放那些需要被 `webpack` 处理的静态资源文件.

## axios-pluginify 和 webpack-tomlenv-plugin

- [webpack-tomlenv-plugin](https://github.com/uioz/webpack-tomlenv-plugin)
- [axios-pluginify](https://github.com/uioz/axios-pluginify)

# 技术细节

在开发模式下同时使用了 `webpack-cdn-plugin` 和 `webpack.dllPlugin` 这两个插件的确做了重复的工作, 都是排除掉了某些模块, 你可以选择性使用.

我的建议是在开发模式下使用 `webpack.dllPlugin` 然后在开发模式下使用 `webpack-cdn-plugin` 很不幸我需要在开发时候使用这两个, 这也是为什么我没有进行调整的原因.

`babel` 在开发模式下只会启动辅助性质的插件, 而不会做语法格式转换.

默认的 `.browserslistrc` 不支持 IE 浏览器, 当然使用 Vue3 你不大可能在支持 IE 了是时候抛弃它了.

postcss 只使用了 `autoprefixer`.

`css-module` 是基于 `css-loader` 实现的.

`babel` 以及 `webpack` 和 `dllPlugin` 输出的内容都放置到了 `.cache` 目录下执行 `npx . clean` 会把这个目录清空, 当出现编译问题的时候我建议你使用这条命令试试.

使用了 `webpack` 的文件系统缓存而不是内存缓存, 这样做可以加快 `webpack` 的首次启动编译时间, 尤其是在使用 SSD 的情况下.

# 如何定制

你可以配置 `build/constants.js` 来修改诸如端口之类的简单配置.

我通过 `build/base.js` 来存放公用配置, 然后使用 `build/build.js` 和 `build/serve.js` 来继承它, 结构非常清晰修改起来非常容易, 也区分开了开发和部署的不同, 虽然代码上目前有些冗余但是目前我不想修改了.

脚本的启动入口在 `bin/index.js` 中, 它会执行 `build` 目录下的脚本, 可以修改它来实现额外的参数传入.

# known issue(必读)

`@icon-park` 与 `webpack.externals` 配置冲突, 如果你不喜欢这个类库那么直接移除就好, 否则就需要按照下面的 issues 手动修改才可以运行.

> https://github.com/bytedance/IconPark/issues/227

> https://github.com/bytedance/IconPark/issues/228

# TODO LIST

1. https://github.com/vusion/icon-font-loader
2. https://github.com/webpack-contrib/thread-loader
3. https://webpack.js.org/plugins/dll-plugin/

- [x] dev support
- [ ] prod support

4. https://webpack.js.org/plugins/automatic-prefetch-plugin/
5. https://webpack.js.org/guides/build-performance/
6. ~~disable babel in dev mode~~ (can't do this cuz we need use plugins)
