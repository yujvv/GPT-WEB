# GPT-WEB


## Usage
* UmiJS：https://umijs.org
* DvaJS：https://dvajs.com
* React：https://reactjs.org
* Sass：http://sass.bootcss.com/docs/sass-reference
* Redux-Devtools（本地开发利器/时间旅行器）：https://github.com/gaearon/redux-devtools
* 脚手架市场：http://scaffold.ant.design

## Structure
```
├── package.json       # 项目依赖包及scripts
├── config             # 全局配置入口 - UmiJS
│ ├── config           # 构建及webpack等配置
│ ├── router.config.js # 路由配置
│ ├── plugin.config.js # 插件配置（三方、封装的插件配置）
├── dist               # 打包静态目录(npm run build)
├── src                # 项目业务代码
│ ├── /assets/         # 静态文件
│ ├── /components/     # 公共组件
│ ├── /locales/        # 系统数据配置（Language Data）等配置
│ ├── /layout/         # 平台布局 => header + content + footer + sidebar(可选)
│ ├── /models/         # model数据层 => DvaJS
│ ├── /pages/          # 路由及页面层 => routes + document.ejs(首页模板)
│ ├── /services/       # 服务api
│ ├── /styles/         # 全局样式 => core + mixin + function + theme...
│ ├── /utils/          # 全局工具函数
│ │──global.js         # 全局Index
│ │──global.scss       # 全局Style

