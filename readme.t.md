# how to use command

```
npx . [command] [options]
```

# css modules support


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

业务组件使用 css modules 编写.
复用组件使用 BEM 方式编写.

vue-loader 集成了 `css modules` 效果:

```html
<template>
  <h1 :class="$style.app">{{ message }}</h1>
  <router-link to="/home">go to home</router-link>
</template>

<script src="./App.js"></script>

<style module>
  .app {
    color: red;
  }
</style>
```

也可以在 JavaScript 中读取类名, 这样做需要将 css 存放到单独的文件中:

```html
<template>
  <h1 :class="$style.app">{{ message }}</h1>
  <router-link to="/home">go to home</router-link>
</template>

<script src="./App.js"></script>

<style module src="./App.css"></style>
```

```css
.app {
  color: red;
}
```

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

## 纯 css 支持

默认 `src` 下的 css 都开启了 `css modules` 支持, 可以通过添加扩展名称的形式要求不提供 `css modules` 支持, 对于 BEM 的编写是非常实用的.

这意味着你需要将 style 分离为单独的文件:

```html
<template>
  <h1 class="app">{{ message }}</h1>
  <router-link to="/home">go to home</router-link>
</template>

<script src="./App.js"></script>

<style src="./App.pure.css"></style>
```

```css
.app {
  color: red;
}
```

## vue3 语法

在 vue3 中基于 vue-loader 针对 setup 语法做了专门的扩展支持:

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
