<!-- markdownlint-disable MD033 MD036 MD041 -->

<div align="center">
  <img src="https://raw.githubusercontent.com/lgc-LLSEDev/readme/main/LLBlackBEEx/icon.png" height="256px" width="256px"/>

# LLBlackBEEx

_✨ 支持本地云端双名单、功能**更**完善的黑名单插件 ✨_

云端黑名单由 [BlackBE](https://blackbe.work) 提供强力支持

</div>

## 介绍

本插件是 [LxlBlackBE](https://www.minebbs.com/threads/lxlblackbe.7482/) 的改进版

新版插件对比 [v0](./v0/) 版，弥补了部分原来插件的缺陷，也加入了一些易用的功能，请接着往下看吧！

## 截图

材质：方纹淡彩 _~~XK 打钱！~~_

- 插件命令列表  
  ![i](https://raw.githubusercontent.com/lgc-LLSEDev/readme/main/LLBlackBEEx/1.png)
- 本地黑名单列表  
  ![i](https://raw.githubusercontent.com/lgc-LLSEDev/readme/main/LLBlackBEEx/2.png)
- 本地黑名单列表项详细信息  
  ![i](https://raw.githubusercontent.com/lgc-LLSEDev/readme/main/LLBlackBEEx/3.png)
- 黑名单查询页面  
  ![i](https://raw.githubusercontent.com/lgc-LLSEDev/readme/main/LLBlackBEEx/4.png)
- 黑名单查询结果  
  ![i](https://raw.githubusercontent.com/lgc-LLSEDev/readme/main/LLBlackBEEx/5.png)
- BlackBE 私有库记录详细信息  
  ![i](https://raw.githubusercontent.com/lgc-LLSEDev/readme/main/LLBlackBEEx/6.png)

## 安装

### 使用 Lip

```shell
lip i llblackbeex
```

### 手动打包

将 `dist` 文件夹中内容打包成 `llplugin` 安装即可

## 指令

### `blackbe`

- `ban`
  - 介绍：
    - 打开封禁 UI  
      仅 OP 可执行
- `ban <player: string> [reason: string] [duration: int]`
  - 介绍：
    - 本地封禁玩家  
      仅 OP 和控制台可执行
  - 参数：
    - `player`：要封禁玩家的 XboxID/XUID/IP
    - `reason` _(可选)_：封禁理由
    - `duration` _(可选)_：封禁时长，单位分钟
- `local`
  - 介绍：
    - 打开本地封禁列表表单  
      仅 OP 可执行
- `query [queryString: string]`
  - 介绍：
    - 本地 & 云端黑名单查询指令  
      默认所有玩家可执行，可在配置文件中修改权限  
      只有 OP 能在查询结果中看到 本地黑名单中记录的 IP、设备 ID 信息、封禁结束时间 以及 云端私有库中记录的 玩家电话
  - 参数：
    - `queryString` _(可选)_：要查询的内容，不填写会打开查询表单
- `reload`
  - 介绍：
    - 重载配置文件  
      仅 OP 和控制台可执行  
      某些配置项需要重启服务器才能生效
- `unban <player: string>`
  - 介绍：
    - 解封本地黑名单玩家  
       仅 OP 可执行
  - 参数：
    - `player`：要解封玩家的 XboxID/XUID/IP

### `ban <player: string> [reason: string] [duration: int]`

当配置项中的 `registerBanCommand` 打开时，才会注册此命令

参数与用途同 `blackbe ban ...`

### `unban <player: string>`

当配置项中的 `registerBanCommand` 打开时，才会注册此命令

参数与用途同 `blackbe unban ...`

## 配置文件

配置文件路径 `plugins/LLBlackBEEx/config.json`

实际的配置文件中请勿含有注释

```jsonc
{
  // BlackBE OpenAPI Token
  // 可以在用户中心获取
  "apiToken": "...",

  // 是否开启 IP 封禁
  "banIp": true,

  // 是否开启设备识别码封禁
  "banDevice": true,

  // 是否隐藏没有查询到记录的日志
  "hidePassMessage": false,

  // 是否关闭 BlackBE 云端黑名单功能
  "disableBlackBE": false,

  // 当玩家存在 BlackBE 云端黑名单记录时，玩家被踢出时显示的信息
  // 可用变量：
  // - %UUID% (记录 UUID)
  // - %NAME% (记录玩家名)
  // - %BLACK_ID% (云黑库 ID)
  // - %XUID% (记录玩家 XUID)
  // - %INFO% (封禁原因)
  // - %LEVEL% (封禁等级编号)
  // - %LEVEL_DESC% (封禁等级描述)
  // - %LEVEL_COLOR% (封禁等级格式化颜色代码 (带 §))
  // - %QQ% (记录玩家 QQ)
  "kickByCloudMsg": "§c您已被BlackBE云端黑名单封禁§r\n\n详情请访问 §ghttps://blackbe.work/",

  // 当玩家存在本地黑名单记录时，玩家被踢出时显示的信息
  // 可用变量：
  // - %NAME% (被记录的玩家 XboxID)
  // - %XUID% (被记录的玩家 XUID)
  // - %ENDTIME% (解封时间)
  // - %REASON% (封禁原因)
  "kickByLocalMsg": "§c您已被服务器封禁§r\n\n解封时间: §g%ENDTIME%§r\n封禁原因: §g%REASON%",

  // 服务器名称（该配置项暂时没用，准备做私有库管理但是没做）
  "serverName": "服务器",

  // 请求 BlackBE API 使用的代理
  // 格式类似 http://127.0.0.1:7890，填写 false 为不使用
  // 填写之后会自动解析为对象结构
  "proxy": false,

  // BlackBE API 域名
  "apiHost": "https://api.blackbe.work/",

  // 清除 BlackBE 缓存的间隔，单位毫秒（重启服务器生效）
  "clearCacheInterval": 3600000,

  // 是否单独注册 ban 与 unban 指令（重启服务器生效）
  "registerBanCommand": true,

  // 检查本地黑名单封禁时间的间隔，单位毫秒（重启服务器生效）
  "checkLocalListInterval": 5000,

  // 是否在 onPreJoin 时就开始检查玩家的封禁信息
  // 副作用是被踢出的玩家只会显示 正在与服务器断开连接 而不是自定义的显示信息
  "processOnPreJoin": true,

  // 是否只有 OP 能使用 blackbe query 指令
  "onlyOpCanQuery": false,

  // 赦免 BlackBE 违规记录检查的玩家列表
  // 可以填 玩家名或 XUID 字符串
  "pardonBlackBE": []
}
```

## To Do

- 游戏内云端私有库的管理

## 联系我

QQ：3076823485  
吹水群：[1105946125](https://jq.qq.com/?_wv=1027&k=Z3n1MpEp)  
邮箱：<lgc2333@126.com>

## 赞助

### BlackBE

本插件的诞生离不开 [BlackBE](https://blackbe.work)！  
如果你喜欢本插件，不妨去 [赞助一下云黑](https://afdian.net/@BlackBE)~

### 作者

感谢大家的赞助！你们的赞助将是我继续创作的动力！

- [爱发电](https://afdian.net/@lgc2333)
- <details>
    <summary>赞助二维码（点击展开）</summary>

  ![讨饭](https://raw.githubusercontent.com/lgc2333/ShigureBotMenu/master/src/imgs/sponsor.png)

  </details>

## 更新日志

### 1.0.1

- 把文件日志记录加回来了
- BlackBE 踢出原因支持一些变量
- 支持赦免指定玩家 BlackBE 违规记录的检查

旧版更新日志见 [这里](./v0/README.md#更新日志)
