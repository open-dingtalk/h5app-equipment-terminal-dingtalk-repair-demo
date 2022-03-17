# 代码模板——制造业设备报修集成到钉钉

## 1. 背景介绍
制造业企业的设备终端用户对于使用中的设备需要进行定期巡查、报修、维保等工作，通过对设备进行智能监测，设备异常时可主动发出告警并通知用户。当使用设备发生故障时，需要及时向设备供应商提交报修信息，并实时跟进维修进度。

## 2. 项目结构

> **fronted**：前端模块，使用vue构建，主要功能有：接入钉钉JSAPI获取authCode、构建工单、获取部门列表。
>
> **backend**：后端模块，使用springboot构建，主要功能有：使用authCode获取access_token、使用access_token获取用户信息、jsapi鉴权、发送工作通知等。

以下为目录结构与部分核心代码文件：

```
.
├── README.md     ----- 说明文档
├── backend
│   ├── dingBoot-linux.sh     ----- 启动脚本（linux）
│   ├── dingBoot-mac.sh    ----- 启动脚本（mac）
│   ├── dingBoot-windows.bat     ----- 启动脚本（windows）
│   ├── pom.xml
│   └── src
│     └── main
│         ├── java
│         │   └── com
│         │       └── dingtalk
│         │           ├── Application.java     ----- 启动类
│         │           ├── config
│         │           │   └── AppConfig.java     ----- 应用配置类
│         │           ├── controller
│         │           │   └── BizController.java     ----- 核心业务接口
│         │           └── service
│         │               └── BizManager.java     ----- 核心业务代码
│         └── resources
│             └── application.yml     ----- 应用配置文件
├── frontend
│   └── src     ----- 前端展示页面和交互代码
└── pom.xml
```

## 研发环境准备

1. 需要有一个钉钉注册企业，如果没有可以创建：https://oa.dingtalk.com/register_new.htm#/

2. 成为钉钉开发者，参考文档：https://developers.dingtalk.com/document/app/become-a-dingtalk-developer

3. 登录钉钉开放平台后台创建一个H5应用： https://open-dev.dingtalk.com/#/index

4. 配置应用

   配置开发管理，参考文档：https://developers.dingtalk.com/document/app/configure-orgapp

   - **此处配置“应用首页地址”需公网地址，若无公网ip，可使用钉钉内网穿透工具：**

     https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration

![image-20210706171740868](https://img.alicdn.com/imgextra/i4/O1CN01C9ta8k1L3KzzYEPiH_!!6000000001243-2-tps-953-517.png)



配置相关权限：https://developers.dingtalk.com/document/app/address-book-permissions

本demo使用接口相关权限：

-  “通讯录部门成员读权限”
-  “成员信息读权限”

![image-20210706172027870](https://img.alicdn.com/imgextra/i3/O1CN016WCr6428wDdBhkWi6_!!6000000007996-2-tps-1358-571.png)

## 脚本启动（推荐）

### 脚本说明

脚本中内置了内网穿透工具，不需要再额外启动

```shell
dingBoot-linux.sh     # linux版本
dingBoot-mac.sh       # mac版本
dingBoot-windows.bat  # windows版本
```

### 启动命令

执行时将其中参数替换为对应的应用参数，在backend目录下执行（脚本同级目录），参数获取方法：

1. 获取corpId——开发者后台首页：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

- **启动linux脚本**

```shell
./dingBoot-linux.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **mac系统(mac m1芯片暂不支持)**

```shell
./dingBoot-mac.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **windows系统 使用cmd命令行启动**

```shell
./dingBoot-windows.bat {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```

- **示例（linux脚本执行）**

```sh
 ./dingBoot-linux.sh start h5-demo 8080 ding1jmkwa4o19bxxxx ua2qNVhleIx14ld6xgoZqtg84EE94sbizRvCimfXrIqYCeyj7b8QvqYxxx 122549400 ding9f50b15bccd1000
```

### 启动后配置

1. **配置地址**

启动完成会自动生成临时域名，配置方法：进入开发者后台->进入应用->开发管理->应用首页地址和PC端首页地址

2. **发布应用**

配置好地址后进入“版本管理与发布页面”，发布应用，发布后即可在PC钉钉或移动钉钉工作台访问应用

## 手动启动

### 下载本项目至本地

```shell
git clone https://github.com/open-dingtalk/h5app-user-repair-demo.git
```

### 获取相应参数

获取到以下参数，修改后端application.yaml

```yaml
app:
  app_key: *****
  app_secret: *****
  agent_id: *****
  corp_id: *****
```

参数获取方法：登录开发者后台

1. 获取corpId：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

### 修改前端页面

**打开项目，命令行中执行以下命令，编译打包生成build文件**

```shell
cd front-end
npm install
npm run build
```

**将打包好的静态资源文件放入后端**

![image-20210706173224172](https://img.alicdn.com/imgextra/i2/O1CN01QLp1Qw1TCVrPddfjZ_!!6000000002346-2-tps-322-521.png)

### 启动项目

- 启动springboot
- 移动端钉钉点击工作台，找到应用，进入应用

### 页面展示

启动页面 ![](https://img.alicdn.com/imgextra/i4/O1CN01fpJaoh1h3GXUQILvf_!!6000000004221-2-tps-800-463.png)
创建工单 ![](https://img.alicdn.com/imgextra/i3/O1CN01oLzIOO1wyG3ZcG889_!!6000000006376-2-tps-800-461.png)
查看设备 ![](https://img.alicdn.com/imgextra/i3/O1CN01jUbBiA1iV2ATt1Ryk_!!6000000004417-2-tps-800-459.png)
工单通知 ![](https://img.alicdn.com/imgextra/i1/O1CN01yCRzZJ1EiNEG63Jiq_!!6000000000385-2-tps-429-133.png)

### **参考文档**

1. 获取企业内部应用access_token，文档链接：https://open.dingtalk.com/document/orgapp-server/obtain-orgapp-token
2. 通过免登码获取用户信息，文档链接：https://open.dingtalk.com/document/orgapp-server/obtain-the-userid-of-a-user-by-using-the-log-free
3. 获取部门用户基础信息：https://open.dingtalk.com/document/orgapp-server/queries-the-simple-information-of-a-department-user
4. 发送消息通知，文档链接：https://open.dingtalk.com/document/orgapp-server/asynchronous-sending-of-enterprise-session-messages