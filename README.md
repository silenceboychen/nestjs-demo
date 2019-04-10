# nest-demo

## 项目结构

```
.
├── commitlint.config.js
├── config                          // 配置文件
│   └── dev.json
├── .gitignore
├── LICENSE
├── nest-cli.json
├── nodemon-debug.json
├── nodemon.json
├── package.json
├── .prettierrc
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts               // 根模块
│   ├── app.service.ts
│   ├── filters                     // 过滤器
│   │   └── error.filter.ts         // 全局异常过滤器
│   ├── interceptors                // 拦截器
│   │   ├── logging.interceptor.ts  // 日志拦截器
│   │   └── result.interceptor.ts   // 响应结果拦截器
│   ├── main.ts                     // 入口文件
│   ├── middlewares                 // 中间件
│   │   └── cors.middleware.ts      // 跨域处理中间件
│   └── pipes                       // 管道
│       └── validation.pipe.ts      // 数据验证管道
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
├── tslint.json
└── yarn.lock
```

```
.
├── commitlint.config.js
├── config                          // 配置文件
│   ├── development.env
│   └── production.env
├── .gitignore
├── nest-cli.json
├── nodemon-debug.json
├── nodemon.json
├── ormconfig.json
├── package.json
├── .prettierrc
├── README.md
├── src
│   ├── app.module.ts               // 根模块
│   ├── config
│   │   ├── config.module.ts
│   │   └── config.service.ts
│   ├── decorators                  // 自定义装饰器
│   │   └── roles.decorator.ts
│   ├── entities                    // 数据库表结构实体
│   │   ├── strategy.entity.ts
│   │   └── user.entity.ts
│   ├── filters                     // 过滤器
│   │   └── error.filter.ts         // 全局异常过滤器
│   ├── guards                      // 守卫
│   │   └── roles.guard.ts          // 角色守卫
│   ├── interceptors                // 拦截器
│   │   ├── logging.interceptor.ts  // 日志拦截器
│   │   └── result.interceptor.ts   // 响应结果拦截器
│   ├── interfaces
│   │   └── result.interface.ts
│   ├── main.ts                     // 入口文件
│   ├── middlewares                 // 中间件
│   │   └── cors.middlewares.ts     // 跨域处理中间件
│   ├── modules                     // 功能模块
│   │   └── user                    // 用户模块
│   │       ├── user.controller.ts
│   │       ├── user.module.ts
│   │       └── user.service.ts
│   ├── pipes                       // 管道
│   │   └── validation.pipe.ts      // 数据验证管道
│   └── utils                       // 工具
│       └── crypto.util.ts          // 加密工具
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
├── tslint.json
└── yarn.lock
```

## 自动化脚本

| 命令 | 描述信息 |
|:-----|:---------|
| npm run changelog | 更新 CHANGELOG 文件 |
| npm run start | 开发环境启动项目 |
| npm run start:dev | 开发环境启动项目并开启watch模式 |
| npm run start:prod | 生成环境启动项目 |
| npm run lint | eslint 检查 |
| npm run test | 运行单元测试 |
| npm run test:e2e | e2e测试  |
| npm run test:cov | 测试覆盖率 |


## 代码提交规范

1.  安装 [Commitizen](https://github.com/commitizen/cz-cli) 工具

    ```
    $ npm install -g commitizen
    ```

2.  替换 `git commit` 命令

    ```
    $ git cz
    ```
3.  git cz以后会出现选项框用于选择本次提交的内容类型
```
    feat：新功能（feature）
    fix：修补bug
    docs：文档（documentation）
    style： 格式（不影响代码运行的变动）
    refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    perf: 提高性能的代码
    test：增加测试
    build: 影响构建系统或外部依赖项的更改
    ci: 修改ci配置文件或者脚本
    chore：构建过程或辅助工具的变动 
    revert: 恢复之前的提交
```
4.  选择以后会出现Denote the scope of this change ($location, $browser, $compile, etc.) 用于输入本次提交改变的功能范围 
5.  然后出现Write a short, imperative tense description of the change 用于输入本次提交内容的概要
6.  Provide a longer description of the change，用于输入本次提交内容的详细    描述
7.  List any breaking changes，用于输入本次提交的重要变更内容
8.  List any issues closed by this change 用于输入本次提交解决的问题
