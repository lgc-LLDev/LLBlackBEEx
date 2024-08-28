"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// ../FormAPIEx/lib/FormAPIEx.cjs
var require_FormAPIEx = __commonJS({
  "../FormAPIEx/lib/FormAPIEx.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export(src_exports, {
      AUTHOR: /* @__PURE__ */ __name(() => AUTHOR, "AUTHOR"),
      CustomFormEx: /* @__PURE__ */ __name(() => CustomFormEx4, "CustomFormEx"),
      FormClose: /* @__PURE__ */ __name(() => FormClose4, "FormClose"),
      LICENSE: /* @__PURE__ */ __name(() => LICENSE, "LICENSE"),
      NAME: /* @__PURE__ */ __name(() => NAME, "NAME"),
      SimpleFormAsync: /* @__PURE__ */ __name(() => SimpleFormAsync, "SimpleFormAsync"),
      SimpleFormEx: /* @__PURE__ */ __name(() => SimpleFormEx4, "SimpleFormEx"),
      SimpleFormOperational: /* @__PURE__ */ __name(() => SimpleFormOperational, "SimpleFormOperational"),
      VERSION: /* @__PURE__ */ __name(() => VERSION, "VERSION"),
      buildCustomForm: /* @__PURE__ */ __name(() => buildCustomForm, "buildCustomForm"),
      deepClone: /* @__PURE__ */ __name(() => deepClone, "deepClone"),
      formatError: /* @__PURE__ */ __name(() => formatError3, "formatError"),
      sendFormAsync: /* @__PURE__ */ __name(() => sendFormAsync, "sendFormAsync"),
      sendModalFormAsync: /* @__PURE__ */ __name(() => sendModalFormAsync2, "sendModalFormAsync"),
      wrapAsyncFunc: /* @__PURE__ */ __name(() => wrapAsyncFunc2, "wrapAsyncFunc")
    });
    module2.exports = __toCommonJS(src_exports);
    var version2 = "0.5.2";
    var NAME = "FormAPIEx";
    var VERSION = version2.split(".").map((v) => Number(v));
    var AUTHOR = "student_2333 <lgc2333@126.com>";
    var LICENSE = "Apache-2.0";
    var FormClose4 = Symbol(`${NAME}_FormClose`);
    function formatError3(e) {
      return e instanceof Error ? `${e.message}
${e.stack}` : String(e);
    }
    __name(formatError3, "formatError");
    function wrapAsyncFunc2(func) {
      return (...args) => {
        setTimeout(() => func(...args).catch((e) => logger.error(formatError3(e))), 0);
      };
    }
    __name(wrapAsyncFunc2, "wrapAsyncFunc");
    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    __name(deepClone, "deepClone");
    function sendFormAsync(player, form) {
      return new Promise((resolve) => {
        player.sendForm(
          form,
          (_, data2) => setTimeout(
            () => resolve(data2 === null || data2 === void 0 ? FormClose4 : data2),
            0
          )
        );
      });
    }
    __name(sendFormAsync, "sendFormAsync");
    function buildCustomForm(formTitle, objects) {
      const form = mc.newCustomForm();
      form.setTitle(formTitle);
      for (const obj of objects) {
        switch (obj.type) {
          case "label": {
            form.addLabel(obj.text);
            break;
          }
          case "input": {
            const { title, placeholder, defaultVal } = obj;
            form.addInput(title, placeholder ?? "", defaultVal ?? "");
            break;
          }
          case "switch": {
            const { title, defaultVal } = obj;
            form.addSwitch(title, defaultVal ?? false);
            break;
          }
          case "dropdown": {
            const { title, items, defaultVal } = obj;
            form.addDropdown(title, items, defaultVal ?? 0);
            break;
          }
          case "slider": {
            const { title, min, max, step, defaultVal } = obj;
            form.addSlider(title, min, max, step ?? 1, defaultVal ?? min);
            break;
          }
          case "stepSlider": {
            const { title, items, defaultVal } = obj;
            form.addStepSlider(title, items, defaultVal ?? 0);
            break;
          }
        }
      }
      return form;
    }
    __name(buildCustomForm, "buildCustomForm");
    var _objects, _a;
    var CustomFormEx4 = (_a = class {
      /**
       * @param title 表单标题
       */
      constructor(title = "") {
        __privateAdd(this, _objects);
        this.title = "";
        __privateSet(this, _objects, []);
        this.title = title;
      }
      /**
       * 获取表单元素列表
       */
      get objects() {
        return deepClone(__privateGet(this, _objects));
      }
      /**
       * 获取表单元素数量
       */
      get length() {
        return __privateGet(this, _objects).length;
      }
      /**
       * 设置表单标题
       * @param val 标题
       * @returns 自身，便于链式调用
       */
      setTitle(val) {
        this.title = val;
        return this;
      }
      // add object
      // 格式化之后着色有问题
      // prettier-ignore
      /**
       * 向表单尾部添加一个元素
       * @param id 元素 id
       * @param obj 元素
       * @returns 自身，便于链式调用
       */
      push(id, obj) {
        __privateGet(this, _objects).push([id, obj]);
        return this;
      }
      // prettier-ignore
      /**
       * 向表单头部添加一个元素
       * @param id 元素 id
       * @param obj 元素
       * @returns 自身，便于链式调用
       */
      unshift(id, obj) {
        __privateGet(this, _objects).unshift([id, obj]);
        return this;
      }
      // prettier-ignore
      /**
       * 向表单插入一个元素
       * @param index 插入位置
       * @param id 元素 id
       * @param obj 元素
       * @returns 自身，便于链式调用
       */
      insert(index, id, obj) {
        __privateGet(this, _objects).splice(index, 0, [id, obj]);
        return this;
      }
      // remove object
      /**
       * 删除表单元素
       * @param id 元素 id
       * @returns 自身，便于链式调用
       */
      remove(id) {
        for (let i = 0; i < __privateGet(this, _objects).length; i += 1) {
          const [objId] = __privateGet(this, _objects)[i];
          if (objId === id) {
            __privateGet(this, _objects).splice(i, 1);
            break;
          }
        }
        return this;
      }
      get(id) {
        if (typeof id === "number") return __privateGet(this, _objects)[id];
        for (const [objId, val] of __privateGet(this, _objects)) {
          if (objId === id) return val;
        }
        return null;
      }
      addLabel(arg1, arg2) {
        const id = arg2 ? arg1 : void 0;
        const text = arg2 ?? arg1;
        return this.push(id, { type: "label", text });
      }
      /**
       * 向表单添加一个输入框
       * @param id 元素 id
       * @param title 输入框标题
       * @param options 附加选项
       * @returns 自身，便于链式调用
       */
      addInput(id, title, options = {}) {
        const { placeholder, default: defaultVal } = options;
        return this.push(id, {
          type: "input",
          title,
          placeholder,
          defaultVal
        });
      }
      /**
       * 向表单添加一个开关
       * @param id 元素 id
       * @param title 开关标题
       * @param defaultVal 开关默认状态，默认为 `false`
       * @returns 自身，便于链式调用
       */
      addSwitch(id, title, defaultVal = false) {
        return this.push(id, { type: "switch", title, defaultVal });
      }
      /**
       * 向表单添加一个下拉框
       * @param id 元素 id
       * @param title 下拉框标题
       * @param items 下拉框元素
       * @param defaultVal 下拉框默认选择元素位置，默认为 `0`
       * @returns 自身，便于链式调用
       */
      addDropdown(id, title, items, defaultVal = 0) {
        return this.push(id, { type: "dropdown", title, items, defaultVal });
      }
      /**
       * 向表单添加一个滑块
       * @param id 元素 id
       * @param title 滑块标题
       * @param min 滑块最小值
       * @param max 滑块最大值
       * @param options 附加选项
       * @returns 自身，便于链式调用
       */
      addSlider(id, title, min, max, options = {}) {
        const { step, default: defaultVal } = options;
        return this.push(id, { type: "slider", title, min, max, step, defaultVal });
      }
      /**
       * 向表单添加一个步进滑块
       * @param id 元素 id
       * @param title 步进滑块标题
       * @param items 步进滑块元素列表
       * @param defaultVal 滑块默认位置，默认为 `0`
       * @returns 自身，便于链式调用
       */
      addStepSlider(id, title, items, defaultVal = 0) {
        return this.push(id, { type: "stepSlider", title, items, defaultVal });
      }
      // send
      parseReturn(data2) {
        const res = {};
        for (let i = 0; i < data2.length; i += 1) {
          const [id] = __privateGet(this, _objects)[i];
          const val = data2[i] ?? void 0;
          if (id) res[id] = val;
        }
        return res;
      }
      /**
       * 异步向玩家发送该表单
       * @param player 玩家对象
       * @returns 返回结果，玩家关闭表单或发送失败返回 FormClose
       */
      async sendAsync(player) {
        const data2 = await sendFormAsync(
          player,
          buildCustomForm(
            this.title,
            this.objects.map((v) => v[1])
          )
        );
        if (data2 === FormClose4) return FormClose4;
        return this.parseReturn(data2);
      }
    }, _objects = new WeakMap(), __name(_a, "CustomFormEx"), _a);
    function sendModalFormAsync2(player, title, content, confirmButton = "§a确认", cancelButton = "§c取消") {
      return new Promise((resolve) => {
        player.sendModalForm(
          title,
          content,
          confirmButton,
          cancelButton,
          (_, data2) => setTimeout(() => resolve(!!data2), 0)
        );
      });
    }
    __name(sendModalFormAsync2, "sendModalFormAsync");
    var _a2;
    var SimpleFormAsync = (_a2 = class {
      /**
       * @param options 附加选项
       */
      constructor(options = {}) {
        this.title = "";
        this.content = "";
        this.buttons = [];
        const { title, content, buttons } = options;
        if (title) this.title = title;
        if (content) this.content = content;
        if (buttons) this.buttons = buttons;
      }
      /**
       * 设置表单标题
       * @param val 标题
       * @returns 自身，便于链式调用
       */
      setTitle(val) {
        this.title = val;
        return this;
      }
      /**
       * 设置表单内容
       * @param val 内容
       * @returns 自身，便于链式调用
       */
      setContent(val) {
        this.content = val;
        return this;
      }
      /**
       * 给表单添加一个按钮
       * @param text 按钮文本
       * @param image 按钮图片
       * @returns 自身，便于链式调用
       */
      addButton(text, image) {
        this.buttons.push([text, image]);
        return this;
      }
      /**
       * 异步向玩家发送该表单
       * @param player 玩家对象
       * @returns 玩家选择的按钮序号，玩家关闭表单或发送失败返回 FormClose
       */
      sendAsync(player) {
        const form = mc.newSimpleForm().setTitle(this.title).setContent(this.content);
        this.buttons.forEach(([text, image]) => {
          if (image) form.addButton(text, image);
          else form.addButton(text);
        });
        return sendFormAsync(player, form);
      }
    }, __name(_a2, "SimpleFormAsync"), _a2);
    var _a3;
    var SimpleFormEx4 = (_a3 = class {
      /**
       * @param buttons 表单按钮参数
       */
      constructor(buttons = []) {
        this.title = "";
        this.content = "§a第 §e{{currentPage}} §f/ §6{{maxPage}} §a页 §7| §a共 §e{{count}} §a条";
        this.buttons = [];
        this.formatter = (v) => [
          `§3${String(v)}`
        ];
        this.canTurnPage = false;
        this.canJumpPage = false;
        this.maxPageNum = 15;
        this.hasSearchButton = false;
        this.searcher = (buttons2, param) => {
          const params = param.toLowerCase().split(/\s/g);
          const formatted = this.formatButtons(buttons2).map((v) => v[0].toLowerCase());
          const result = [];
          for (const it of formatted) {
            const score = params.reduce((acc, cur) => acc + (it.includes(cur) ? 1 : 0), 0);
            if (score) result.push([score, buttons2[formatted.indexOf(it)]]);
          }
          return result.sort(([a], [b]) => b - a).map((v) => v[1]);
        };
        this.buttons = buttons;
      }
      /**
       * 格式化给定按钮
       * @param buttons 表单按钮参数列表
       * @returns 格式化后的按钮
       */
      formatButtons(buttons = this.buttons) {
        return buttons.map(this.formatter);
      }
      /**
       * @returns 表单最大页数
       */
      getMaxPageNum() {
        return this.canTurnPage ? Math.ceil(this.buttons.length / this.maxPageNum) : 1;
      }
      /**
       * 获取对应页数的按钮参数列表
       * @param page 页码
       * @returns 按钮参数列表
       */
      getPage(page = 1) {
        if (page > this.getMaxPageNum()) return [];
        return this.buttons.slice((page - 1) * this.maxPageNum, page * this.maxPageNum);
      }
      /**
       * 异步向玩家发送搜索表单
       * @param player 玩家对象
       * @param defaultVal 搜索框默认内容
       * @returns 选择的搜索结果按钮参数。返回 null 为没搜到, FormClose 为取消搜索
       */
      async sendSearchForm(player, defaultVal = "") {
        const form = new CustomFormEx4(this.title);
        const res = await form.addInput("param", "请输入你要搜索的内容", { default: defaultVal }).sendAsync(player);
        if (res === FormClose4) return FormClose4;
        const searched = this.searcher(this.buttons, res.param);
        if (!searched.length) {
          await new SimpleFormAsync({
            title: this.title,
            content: "§6没有搜索到结果"
          }).sendAsync(player);
          return null;
        }
        const searchForm = new _a3();
        searchForm.title = this.title;
        searchForm.content = `§a为您找到了 §l§6${searched.length} §r§a个结果
${searchForm.content}`;
        searchForm.buttons = searched;
        searchForm.formatter = this.formatter;
        searchForm.canTurnPage = this.canTurnPage;
        searchForm.canJumpPage = this.canJumpPage;
        searchForm.maxPageNum = this.maxPageNum;
        searchForm.hasSearchButton = false;
        const selected = await searchForm.sendAsync(player);
        return selected === FormClose4 ? FormClose4 : selected;
      }
      /**
       * 异步向玩家发送表单
       * @param player 玩家对象
       * @param page 页码
       * @returns 给定的按钮参数，表单被玩家关闭或发送失败返回 FormClose
       */
      async sendAsync(player, page = 1) {
        const buttons = this.canTurnPage ? this.getPage(page) : this.buttons;
        const formattedButtons = this.formatButtons(buttons);
        const maxPage = this.getMaxPageNum();
        const pageAboveOne = maxPage > 1;
        const hasJumpBtn = this.canJumpPage && pageAboveOne;
        const hasPreviousPage = page > 1 && pageAboveOne;
        const hasNextPage = page < maxPage && pageAboveOne;
        if (hasPreviousPage) formattedButtons.unshift(["§2<- 上一页"]);
        if (hasJumpBtn) formattedButtons.unshift(["§1跳页"]);
        if (this.hasSearchButton) formattedButtons.unshift(["§1搜索"]);
        if (hasNextPage) formattedButtons.push(["§2下一页 ->"]);
        const formatContent = /* @__PURE__ */ __name((content) => {
          const count = this.buttons.length;
          const formatMap = {
            currentPage: page,
            maxPage,
            count
          };
          for (const [key, val] of Object.entries(formatMap)) {
            content = content.replaceAll(`{{${key}}}`, String(val));
          }
          return content;
        }, "formatContent");
        const resultIndex = await new SimpleFormAsync({
          title: this.title,
          content: formatContent(this.content),
          buttons: formattedButtons
        }).sendAsync(player);
        if (resultIndex === FormClose4) return FormClose4;
        let offset = 0;
        if (this.hasSearchButton) {
          if (resultIndex === offset) {
            const res = await this.sendSearchForm(player);
            return res === null || res === FormClose4 ? this.sendAsync(player, page) : res;
          }
          offset += 1;
        }
        if (hasJumpBtn) {
          if (resultIndex === offset) {
            const res = await new CustomFormEx4(this.title).addSlider("num", "请选择你要跳转的页数", 1, maxPage, {
              default: page
            }).sendAsync(player);
            return this.sendAsync(player, res === FormClose4 ? page : res.num);
          }
          offset += 1;
        }
        if (hasPreviousPage) {
          if (resultIndex === offset) {
            return this.sendAsync(player, page - 1);
          }
          offset += 1;
        }
        if (hasNextPage && resultIndex + 1 === formattedButtons.length) {
          return this.sendAsync(player, page + 1);
        }
        const realIndex = resultIndex - offset;
        return buttons[realIndex];
      }
    }, __name(_a3, "_SimpleFormEx"), _a3);
    var _a4;
    var SimpleFormOperational = (_a4 = class {
      constructor(title = "", content = "", buttons = []) {
        this.title = title;
        this.content = content;
        this.buttons = buttons;
      }
      async sendAsync(player) {
        const form = new SimpleFormEx4(this.buttons);
        form.title = this.title;
        form.content = this.content;
        form.formatter = ({ text, image }) => [text, image];
        const res = await form.sendAsync(player);
        if (res === FormClose4) return FormClose4;
        return res.operation();
      }
    }, __name(_a4, "SimpleFormOperational"), _a4);
  }
});

// package.json
var version = "1.1.0";
var description = "Improved version of LxlBlackBe";

// src/const.ts
var PLUGIN_NAME = "LLBlackBEEx";
var PLUGIN_VERSION = version.split(".").map((v) => Number(v));
var PLUGIN_DESCRIPTION = description;
var PLUGIN_EXTRA = {
  Author: "student_2333",
  License: "Apache-2.0"
};
logger.setTitle(PLUGIN_NAME);
logger.setFile(`logs/${PLUGIN_NAME}.log`);
var PLUGIN_ROOT = `./plugins/${PLUGIN_NAME}`;
var DATA_PATH = `${PLUGIN_ROOT}/data`;
if (!file.exists(DATA_PATH)) file.mkdir(DATA_PATH);

// src/db/base.ts
var _Query = class _Query {
  constructor(ss) {
    this.ss = ss;
  }
  begin() {
    this.ss.execute("BEGIN;");
  }
  commit() {
    this.ss.execute("COMMIT;");
  }
  rollback() {
    this.ss.execute("ROLLBACK;");
  }
  withBegin(fn) {
    this.begin();
    try {
      const r = fn(this);
      this.commit();
      return r;
    } catch (e) {
      this.rollback();
      throw e;
    }
  }
  bindStmt(sql, params) {
    const stmt = this.ss.prepare(sql);
    if (params) stmt.bind(params);
    return stmt;
  }
  executeInStmt(sql, params) {
    this.bindStmt(sql, params).execute();
  }
  executeParagraph(sql) {
    sql.split(";").forEach((s) => {
      if (s) this.executeInStmt(s.trim());
    });
  }
};
__name(_Query, "Query");
var Query = _Query;

// src/db/version.ts
var versionCreateSql = `
CREATE TABLE IF NOT EXISTS version (
  version INTEGER PRIMARY KEY DEFAULT 0
);
`.trim();
var versionQuerySql = `
SELECT version FROM version LIMIT 1;
`.trim();
var versionUpdateSql = `
INSERT OR REPLACE INTO version (version)
VALUES (?);
`.trim();
Query.prototype.getVersion = function() {
  this.withBegin(() => {
    this.executeInStmt(versionCreateSql);
  });
  const r = this.withBegin(() => {
    return this.bindStmt(versionQuerySql).fetch();
  });
  return r.version || 0;
};
Query.prototype.updateVersion = function(version2) {
  this.withBegin(() => {
    this.executeInStmt(versionUpdateSql, [version2]);
  });
};

// src/db/migrations/v1.ts
var tableCreateSqlPara = `
CREATE TABLE IF NOT EXISTS banInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reason TEXT NOT NULL,
  endTime TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS xuid (
  xuid TEXT PRIMARY KEY NOT NULL,
  banInfo INTEGER,
  FOREIGN KEY (banInfo) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS name (
  name TEXT PRIMARY KEY NOT NULL,
  xuid TEXT NOT NULL,
  banInfoId INTEGER,
  FOREIGN KEY (xuid) REFERENCES xuid(xuid) ON DELETE CASCADE,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ip (
  ip TEXT PRIMARY KEY NOT NULL,
  banInfoId INTEGER,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientId (
  clientId TEXT PRIMARY KEY NOT NULL,
  banInfoId INTEGER,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);
`.trim();
var migrate = /* @__PURE__ */ __name((q) => {
  q.withBegin(() => {
    q.executeParagraph(tableCreateSqlPara);
  });
}, "migrate");
var v1_default = migrate;

// src/db/migrations/index.ts
var migrateFuncs = [v1_default];
function migrate2(q) {
  const version2 = q.getVersion();
  const currentVersion = migrateFuncs.length;
  const migrateCount = currentVersion - version2;
  if (migrateCount > 0) {
    for (let i = 0; i < migrateCount; i++) {
      migrateFuncs[i + version2](q);
    }
    q.updateVersion(currentVersion);
  }
  return [version2, currentVersion];
}
__name(migrate2, "migrate");

// src/db/index.ts
var DB_PATH = `${DATA_PATH}/${PLUGIN_NAME}.db`;
Query.getSession = function() {
  const ss = new DBSession("sqlite3", { path: DB_PATH });
  if (!ss) throw new Error("Failed to create DBSession");
  ss.prepare("PRAGMA foreign_keys = ON;").execute();
  return ss;
};
Query.get = function() {
  return new Query(Query.getSession());
};

// src/command.ts
var import_form_api_ex4 = __toESM(require_FormAPIEx());

// src/config.ts
var configPath = `${DATA_PATH}/config.json`;
var localListPath = `${DATA_PATH}/localList.json`;
var config = {
  apiToken: "",
  banIp: true,
  banDevice: true,
  hidePassMessage: false,
  disableBlackBE: false,
  kickByCloudMsg: `§c您已被BlackBE云端黑名单封禁§r

详情请访问 §ghttps://blackbe.work/`,
  kickByLocalMsg: `§c您已被服务器封禁§r

解封时间: §g%ENDTIME%§r
封禁原因: §g%REASON%`,
  serverName: "服务器",
  // proxy: false,
  apiHost: "https://api.blackbe.work/",
  clearCacheInterval: 36e5,
  registerBanCommand: true,
  checkLocalListInterval: 5e3,
  processOnPreJoin: true,
  onlyOpCanQuery: false,
  pardonBlackBE: []
};
var localList = { list: [] };
function saveConfig() {
  file.writeTo(configPath, JSON.stringify(config, null, 2));
}
__name(saveConfig, "saveConfig");
function saveLocalList() {
  file.writeTo(localListPath, JSON.stringify(localList, null, 2));
}
__name(saveLocalList, "saveLocalList");
function reloadConfig() {
  function loadConfig(path, overrideConfig) {
    const content = file.readFrom(path);
    if (!content) throw new Error(`failed to read ${path}`);
    Object.entries(JSON.parse(content)).forEach(([k, v]) => {
      Object.defineProperty(overrideConfig, k, { value: v });
    });
    return overrideConfig;
  }
  __name(loadConfig, "loadConfig");
  if (!file.exists(configPath)) saveConfig();
  if (!file.exists(localListPath)) saveLocalList();
  loadConfig(configPath, config);
  loadConfig(localListPath, localList);
  saveConfig();
  let localListChanged = false;
  for (const bl of localList.list) {
    if (bl.ip) {
      bl.ips = [bl.ip];
      bl.clientIds = [];
      delete bl.ip;
      localListChanged = true;
    }
  }
  if (localListChanged) saveLocalList();
}
__name(reloadConfig, "reloadConfig");
reloadConfig();

// src/util.ts
var import_form_api_ex = __toESM(require_FormAPIEx());
function formatDate(options = {}) {
  const date = options.date ?? /* @__PURE__ */ new Date();
  const withTime = options.withTime ?? true;
  const yr = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();
  let formatted = `${yr}-${mon}-${day}`;
  if (withTime) {
    const padNum = /* @__PURE__ */ __name((n) => n.toString().padStart(2, "0"), "padNum");
    const hr = date.getHours();
    const min = padNum(date.getMinutes());
    const sec = padNum(date.getSeconds());
    formatted += ` ${hr}:${min}:${sec}`;
  }
  return formatted;
}
__name(formatDate, "formatDate");
function delFormatCode(text) {
  return text.replace(/§[0-9abcdefgklmnor]/g, "");
}
__name(delFormatCode, "delFormatCode");
function checkValInArray(arr, callback) {
  for (const it of arr) if (callback(it)) return true;
  return false;
}
__name(checkValInArray, "checkValInArray");
function stripIp(ip) {
  return ip.split(":")[0];
}
__name(stripIp, "stripIp");
function pushNoDuplicateItem(list, item) {
  if (!list.includes(item)) list.push(item);
  return list;
}
__name(pushNoDuplicateItem, "pushNoDuplicateItem");
function setupFunctionalityForm(buttons) {
  const form = new import_form_api_ex.SimpleFormEx(buttons);
  form.title = PLUGIN_NAME;
  form.formatter = (v) => [`§3${v[0]}`];
  return form;
}
__name(setupFunctionalityForm, "setupFunctionalityForm");
async function processListFormReturn(res) {
  if (res) {
    const [, func] = res;
    if (!func) return false;
    func();
  }
  return true;
}
__name(processListFormReturn, "processListFormReturn");
function getOnlineRealPlayers() {
  return mc.getOnlinePlayers().filter((p) => !p.isSimulatedPlayer());
}
__name(getOnlineRealPlayers, "getOnlineRealPlayers");
function formatVarString(str, vars) {
  return str.replace(/%([a-zA-Z0-9_]+)%/g, (m, p1) => vars[p1] ?? m);
}
__name(formatVarString, "formatVarString");
function logErr(err) {
  logger.error((0, import_form_api_ex.formatError)(err));
}
__name(logErr, "logErr");
var _RequestError = class _RequestError extends Error {
  constructor(status, url, data2) {
    super(
      `Request '${url}' failed with code ${status}: ${data2.length > 50 ? `${data2.slice(0, 50)}...` : data2}`
    );
    this.status = status;
    this.url = url;
    this.data = data2;
    this.name = "RequestError";
  }
};
__name(_RequestError, "RequestError");
var RequestError = _RequestError;
function appendParamsToUrl(url, params) {
  if (!params) return url;
  const queryString = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
  return url.includes("?") ? `${url}&${queryString}` : `${url}?${queryString}`;
}
__name(appendParamsToUrl, "appendParamsToUrl");
function normalizeHeaders(headers) {
  const normalized = {};
  for (const [k, v] of Object.entries(headers)) normalized[k] = `${v}`;
  return normalized;
}
__name(normalizeHeaders, "normalizeHeaders");
async function getAsync(options) {
  const doGet = /* @__PURE__ */ __name((url2, headers2) => new Promise((resolve, reject) => {
    network.httpGet(url2, headers2, (status, result) => {
      if (status !== 200) reject(new RequestError(status, url2, result));
      else resolve(result);
    });
  }), "doGet");
  const { url, params, headers, responseType } = options;
  const urlWithParams = appendParamsToUrl(url, params);
  const normalizedHeaders = headers ? normalizeHeaders(headers) : {};
  const res = await doGet(urlWithParams, normalizedHeaders);
  return responseType === "json" ? JSON.parse(res) : res;
}
__name(getAsync, "getAsync");
async function postAsync(options) {
  const doPost = /* @__PURE__ */ __name((url2, headers2, data3, contentType2) => new Promise((resolve, reject) => {
    network.httpPost(url2, headers2, data3, contentType2, (status, result) => {
      if (status !== 200) reject(new RequestError(status, url2, result));
      else resolve(result);
    });
  }), "doPost");
  const { url, params, headers, data: data2, responseType } = options;
  const isDataText = typeof data2 === "string";
  const dataString = isDataText ? data2 : JSON.stringify(data2);
  const contentType = headers?.["Content-Type"] ?? (isDataText ? "text/plain" : "application/json");
  const urlWithParams = appendParamsToUrl(url, params);
  const normalizedHeaders = headers ? normalizeHeaders(headers) : {};
  const res = await doPost(urlWithParams, normalizedHeaders, dataString, contentType);
  return responseType === "json" ? JSON.parse(res) : res;
}
__name(postAsync, "postAsync");

// src/black-local.ts
function formatLocalKickMsg(data2) {
  const { reason, endTime } = data2;
  return formatVarString(config.kickByLocalMsg, {
    NAME: data2.name ?? "未知",
    XUID: data2.xuid ?? "未知",
    REASON: reason ?? "无",
    ENDTIME: endTime ? formatDate({ date: new Date(endTime) }) : "永久"
  });
}
__name(formatLocalKickMsg, "formatLocalKickMsg");
function banPlayer(data2, options = {}) {
  let name;
  let xuid;
  let ip;
  let clientId;
  if ("player" in data2) {
    const { player } = data2;
    ({ realName: name, xuid } = player);
    ({ ip, clientId } = player.getDevice());
  } else {
    ;
    ({ name, xuid, ip, clientId } = data2);
  }
  if (ip) ip = stripIp(ip);
  const queryParams = [name, xuid, ip, clientId].filter((v) => v);
  if (!queryParams.length) return false;
  const results = [];
  for (const it of localList.list) {
    if (name && name === it.name || xuid && xuid === it.xuid || ip && it.ips && it.ips.includes(ip) || clientId && it.clientIds && it.clientIds.includes(clientId)) {
      results.push(it);
    }
  }
  const isModify = !!results.length;
  if (!isModify) {
    const it = {
      ips: [],
      clientIds: []
    };
    localList.list.push(it);
    results.push(it);
  }
  const { time, reason } = options;
  const endTime = time ? new Date(Date.now() + time).toJSON() : void 0;
  for (const it of results) {
    if (name) it.name = name;
    if (xuid) it.xuid = xuid;
    if (ip) it.ips = pushNoDuplicateItem(it.ips || [], ip);
    if (clientId) it.clientIds = pushNoDuplicateItem(it.clientIds || [], clientId);
    if (endTime) it.endTime = endTime;
    if (reason) it.reason = reason;
  }
  if ("player" in data2) {
    const { kickTip } = options;
    data2.player.kick(kickTip ?? formatLocalKickMsg(results[0]));
  }
  saveLocalList();
  return { isModify, results };
}
__name(banPlayer, "banPlayer");
function queryLocal(param, moreInfo = false, strict = false) {
  param = param.trim();
  const params = strict ? [param] : param.split(/\s/g);
  const ret = [];
  for (const it of localList.list) {
    const { name, xuid, ips, clientIds } = it;
    const willCheck = [name, xuid];
    if (moreInfo) {
      if (ips) willCheck.push(...ips);
      if (clientIds) willCheck.push(...clientIds);
    }
    for (const val of willCheck) {
      if (val && checkValInArray(params, (pr) => strict ? val === pr : val.includes(pr))) {
        ret.push(it);
        break;
      }
    }
  }
  return ret;
}
__name(queryLocal, "queryLocal");
function formatLocalInfo(obj, moreInfo = false) {
  const formatList = /* @__PURE__ */ __name((li) => li && li.length ? `
${li.map((v) => `  - §b${v}§r`).join("\n")}` : "§b无", "formatList");
  const { name, xuid, ips, endTime, clientIds, reason } = obj;
  const lines = [];
  lines.push(`§2玩家ID§r： §l§d${name ?? "未知"}§r`);
  lines.push(`§2XUID§r： §b${xuid ?? "未知"}`);
  lines.push(`§2记录原因§r： §b${reason ?? "无"}`);
  if (moreInfo) {
    lines.push(
      `§2结束时间§r： §b${endTime ? formatDate({ date: new Date(endTime) }) : "永久"}`
    );
  }
  if (moreInfo) lines.push(`§2已记录IP§r： ${formatList(ips)}`);
  if (moreInfo) lines.push(`§2已记录设备ID§r： ${formatList(clientIds)}`);
  return lines.join("\n");
}
__name(formatLocalInfo, "formatLocalInfo");

// src/manage.ts
var import_form_api_ex2 = __toESM(require_FormAPIEx());

// src/blackbe.ts
var defaultUploadParams = {
  xuid: "1000000000000000",
  info: "无",
  server: config.serverName,
  time: formatDate({ withTime: false }),
  qq: 1e9,
  area_code: "+86",
  phone: 1e10
};
var cachedPrivResp = [];
function getHeaders(auth = true) {
  const headers = {
    // 'Content-Type': 'application/json',
  };
  if (auth && config.apiToken) headers.Authorization = `Bearer ${config.apiToken}`;
  return headers;
}
__name(getHeaders, "getHeaders");
function buildUrl(path, slashEnd = false) {
  let { apiHost } = config;
  if (!apiHost.endsWith("/")) apiHost = `${apiHost}/`;
  if (slashEnd && !path.endsWith("/")) path = `${path}/`;
  return `${apiHost}openapi/v3/${path}`;
}
__name(buildUrl, "buildUrl");
function checkIsWithToken(options) {
  const withToken = options.withToken ?? true;
  delete options.withToken;
  return withToken;
}
__name(checkIsWithToken, "checkIsWithToken");
async function getPrivateRespList() {
  const resp = await getAsync({
    url: buildUrl("private/repositories/list"),
    headers: getHeaders(),
    responseType: "json"
  });
  cachedPrivResp.length = 0;
  cachedPrivResp.push(...resp.data.repositories_list);
  return resp;
}
__name(getPrivateRespList, "getPrivateRespList");
function check(options) {
  const withToken = checkIsWithToken(options);
  return getAsync({
    url: buildUrl("check", true),
    params: options,
    headers: getHeaders(withToken),
    responseType: "json"
  });
}
__name(check, "check");
async function checkPrivate(options) {
  if (!cachedPrivResp.length) await getPrivateRespList();
  return postAsync({
    url: buildUrl("check/private"),
    params: options,
    data: { repositories_uuid: cachedPrivResp.map((v) => v.uuid) },
    headers: getHeaders(),
    responseType: "json"
  });
}
__name(checkPrivate, "checkPrivate");
async function getRepoByUuid(uuid) {
  if (uuid === "1") {
    return {
      uuid,
      name: "公有库",
      type: 1,
      list_num: 0,
      server: "",
      server_type: ""
    };
  }
  if (!cachedPrivResp.length) await getPrivateRespList();
  for (const resp of cachedPrivResp) if (resp.uuid === uuid) return resp;
  return null;
}
__name(getRepoByUuid, "getRepoByUuid");
function formatBlackBELvl(lvl) {
  switch (lvl) {
    case 1:
      return ["有作弊行为，但未对其他玩家造成实质上损害", "§e"];
    case 2:
      return ["有作弊行为，且对玩家造成一定的损害", "§g"];
    case 3:
      return ["严重破坏服务器，对玩家和服务器造成较大的损害", "§c"];
    default:
      return ["未知", "§r"];
  }
}
__name(formatBlackBELvl, "formatBlackBELvl");
async function formatBlackBEInfo(obj, moreInfo = false) {
  const isPriv = "phone" in obj;
  const { uuid, name, xuid, info, level, qq, black_id } = obj;
  const repo = await getRepoByUuid(black_id);
  const repoName = repo ? repo.name : "未知";
  const [lvlDesc, lvlColor] = formatBlackBELvl(level);
  const lines = [];
  lines.push(`§2玩家ID§r： §l§d${name}§r`);
  lines.push(`§2危险等级§r： ${lvlColor}等级 §l${level} §r${lvlColor}（${lvlDesc}）`);
  lines.push(`§2记录原因§r： §b${info}`);
  if (isPriv) lines.push(`§2违规服务器§r： §b${obj.server}`);
  lines.push(`§2XUID§r： §b${xuid}`);
  lines.push(`§2玩家QQ§r： §b${qq}`);
  if (isPriv && moreInfo) lines.push(`§2玩家电话§r： §b${obj.area_code} ${obj.phone}`);
  if (isPriv) lines.push(`§2记录时间§r： §b${obj.time}`);
  lines.push(`§2记录UUID§r： §b${uuid}`);
  lines.push(`§2来源库§r： §b${repoName} （${black_id}）`);
  return lines.join("\n");
}
__name(formatBlackBEInfo, "formatBlackBEInfo");
function formatBlackBEKickMsg(info) {
  const obj = {};
  if (info) {
    const [lvlDesc, lvlColor] = formatBlackBELvl(info.level);
    Object.assign(obj, {
      UUID: info.uuid,
      NAME: info.name,
      BLACK_ID: info.black_id,
      XUID: info.xuid,
      INFO: info.info,
      LEVEL: info.level,
      LEVEL_DESC: lvlDesc,
      LEVEL_COLOR: lvlColor,
      QQ: info.qq
    });
  }
  return formatVarString(config.kickByCloudMsg, obj);
}
__name(formatBlackBEKickMsg, "formatBlackBEKickMsg");
function clearCache() {
  cachedPrivResp.length = 0;
}
__name(clearCache, "clearCache");
setInterval(() => clearCache(), config.clearCacheInterval);

// src/manage.ts
function delLocalListItem(obj) {
  const { list } = localList;
  const deleted = list.splice(list.indexOf(obj), 1);
  saveLocalList();
  return !!deleted.length;
}
__name(delLocalListItem, "delLocalListItem");
async function localItemForm(player, obj, moreInfo = false) {
  const delItem = /* @__PURE__ */ __name(async () => {
    if (await (0, import_form_api_ex2.sendModalFormAsync)(
      player,
      PLUGIN_NAME,
      "§6真的要删除这条黑名单项目吗？\n§c删前请三思！！！"
    )) {
      player.tell(
        delLocalListItem(obj) ? "§a删除成功！" : "§c删除失败！未找到该黑名单项目"
      );
    } else {
      player.tell("§6删除操作已取消");
    }
  }, "delItem");
  const editTime = /* @__PURE__ */ __name(async () => {
    const res = await new import_form_api_ex2.CustomFormEx(PLUGIN_NAME).addSwitch("forever", "是否永久封禁", !obj.endTime).addInput("time", "如果不是永久封禁，请输入从现在开始要封禁的时间（单位分钟）").sendAsync(player);
    if (res === import_form_api_ex2.FormClose) {
      player.tell("§6修改操作已取消");
      return;
    }
    const { forever, time } = res;
    const timeNum = Number(time);
    if ((!timeNum || timeNum <= 0) && !forever) {
      await (0, import_form_api_ex2.sendModalFormAsync)(
        player,
        PLUGIN_NAME,
        "§c请输入正确的封禁时间！",
        "§a知道了",
        "§a知道了"
      );
      editTime();
      return;
    }
    obj.endTime = forever ? void 0 : new Date(Date.now() + timeNum * 60 * 1e3).toJSON();
    saveLocalList();
    player.tell("§a操作成功！");
  }, "editTime");
  const editDesc = /* @__PURE__ */ __name(async () => {
    const res = await new import_form_api_ex2.CustomFormEx(PLUGIN_NAME).addInput("reason", "请输入想修改的封禁原因内容", {
      placeholder: "如想要清空封禁原因请留空",
      default: obj.reason
    }).sendAsync(player);
    if (res === import_form_api_ex2.FormClose) {
      player.tell("§6修改操作已取消");
      return;
    }
    const reason = res.reason.trim();
    obj.reason = reason || void 0;
    saveLocalList();
    player.tell("§a操作成功！");
  }, "editDesc");
  const form = setupFunctionalityForm([["返回", null]]);
  form.content = formatLocalInfo(obj, moreInfo);
  if (moreInfo) {
    form.buttons.unshift(
      ["删除条目", delItem],
      ["修改封禁时间", editTime],
      ["修改封禁原因", editDesc]
    );
  }
  return processListFormReturn(await form.sendAsync(player));
}
__name(localItemForm, "localItemForm");
async function blackBEItemForm(player, obj, moreInfo = false) {
  const form = setupFunctionalityForm([["返回", null]]);
  form.content = await formatBlackBEInfo(obj, moreInfo);
  return processListFormReturn(await form.sendAsync(player));
}
__name(blackBEItemForm, "blackBEItemForm");
async function localListForm(player) {
  if (!localList.list.length) {
    player.tell(`§6本地黑名单列表为空`);
    return;
  }
  const form = new import_form_api_ex2.SimpleFormEx(localList.list);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  form.formatter = ({ name, xuid, endTime }) => [
    `§6${name ?? "未知"} §7(${xuid ?? "未知"})
§2${endTime ? `${formatDate({ date: new Date(endTime) })} 解封` : "永久封禁"}`
  ];
  form.searcher = (_, param) => queryLocal(param, true);
  const sendTask = /* @__PURE__ */ __name(async () => {
    const res = await form.sendAsync(player);
    if (res !== import_form_api_ex2.FormClose) {
      const infoRes = await localItemForm(player, res, true);
      if (infoRes === false) sendTask();
    }
  }, "sendTask");
  sendTask();
}
__name(localListForm, "localListForm");

// src/query.ts
var import_form_api_ex3 = __toESM(require_FormAPIEx());
async function queryBlackBE(param) {
  const tasks = [
    check({ name: param, qq: param, xuid: param, withToken: false }),
    config.apiToken ? checkPrivate({ name: param, qq: param, xuid: param }) : Promise.resolve()
  ];
  const [comm, priv] = await Promise.all(tasks);
  const commInfo = [];
  const privInfo = [];
  if (comm) commInfo.push(...comm.data.info);
  if (priv) {
    for (const repo of priv.data) {
      if (repo.exist) {
        privInfo.push(...repo.info.map((v) => ({ ...v, black_id: repo.repo_uuid })));
      }
    }
  }
  return [commInfo, privInfo];
}
__name(queryBlackBE, "queryBlackBE");
function formatLocalItemShort(obj) {
  const { name, xuid, ips, clientIds } = obj;
  const items = [name, xuid, ...ips ?? [], ...clientIds ?? []].filter(
    (v) => v
  );
  const it1 = items.shift();
  return `§b${it1}${items.length ? ` §7(${items.join(", ")})` : ""}`;
}
__name(formatLocalItemShort, "formatLocalItemShort");
var queryResultFormatter = /* @__PURE__ */ __name(({
  type,
  value
}) => {
  const { name, xuid } = value;
  let line1 = "";
  if (type === "common") line1 = "§2BlackBE 公有库";
  else if (type === "private") line1 = "§3BlackBE 私有库";
  else line1 = "§5本地库";
  const line2 = `§6${name ?? xuid ?? "未知"}`;
  if ("level" in value) {
    const { level } = value;
    const lvlColor = formatBlackBELvl(level)[1];
    line1 += `§7 | ${lvlColor}等级 ${level}`;
  }
  return [`${line1}
${line2}`];
}, "queryResultFormatter");
async function queryResultForm(player, param, moreInfo = false) {
  param = param?.trim();
  if (!param) {
    player.tell(`§c请输入要查询的内容`);
    return;
  }
  player.tell(`§a请您稍安勿躁，我们正在努力查询中！`);
  const localRes = [];
  const blackBECommRes = [];
  const blackBEPrivRes = [];
  try {
    localRes.push(...queryLocal(param, moreInfo));
    if (!config.disableBlackBE) {
      const [comm, priv] = await queryBlackBE(param);
      blackBECommRes.push(...comm);
      blackBEPrivRes.push(...priv);
    }
  } catch (e) {
    player.tell(`§c出错了！
${String(e)}`);
  }
  const localNum = localRes.length;
  const privNum = blackBEPrivRes.length;
  const commNum = blackBECommRes.length;
  if (!localNum && !privNum && !commNum) {
    player.tell(
      // prettier-ignore
      `§6很抱歉，我们找遍了本地黑名单${config.disableBlackBE ? "" : "和 BlackBE"}，但是没有查询到任何结果 QAQ`
    );
    return;
  }
  const headingSuffixes = [];
  if (localNum) headingSuffixes.push(`§l§e${localNum} §r§a条本地库记录`);
  if (commNum) headingSuffixes.push(`§l§e${commNum} §r§a条云黑公有库记录`);
  if (privNum) headingSuffixes.push(`§l§e${privNum} §r§a条云黑私有库记录`);
  if (headingSuffixes.length > 1) headingSuffixes.push(`和 ${headingSuffixes.pop()}`);
  const heading = (
    // prettier-ignore
    `§a为您找到了关于 §l§2${param} §r§a的 ${headingSuffixes.join("， ")}`
  );
  const form = new import_form_api_ex3.SimpleFormEx([
    ...localRes.map((value) => ({ type: "local", value })),
    ...blackBECommRes.map((value) => ({ type: "common", value })),
    ...blackBEPrivRes.map((value) => ({ type: "private", value }))
  ]);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.content = `${heading}

${form.content}`;
  form.formatter = queryResultFormatter;
  const sendTask = /* @__PURE__ */ __name(async () => {
    const res = await form.sendAsync(player);
    if (res !== import_form_api_ex3.FormClose) {
      const { type, value } = res;
      const infoRes = await (type === "local" ? localItemForm(player, value, moreInfo) : blackBEItemForm(player, value, moreInfo));
      if (infoRes === false) sendTask();
    }
  }, "sendTask");
  sendTask();
}
__name(queryResultForm, "queryResultForm");
async function queryFormAsync(player, param) {
  const op = player.isOP();
  if (!param) {
    let form = new import_form_api_ex3.CustomFormEx(
      PLUGIN_NAME
    );
    form = form.addLabel(
      `§a请输入查询内容， 我们会帮你从本地库${config.disableBlackBE ? "" : "与 BlackBE "}中查找结果`
    );
    if (!config.disableBlackBE) {
      form.addLabel(
        "§6请谨慎使用 XUID 查询来自 BlackBE 的记录：\n由于历史遗留和 XUID 采集本身存在难度， 导致大部分条目没有记录 XUID， 所以不推荐完全依赖 XUID 来判断玩家是否存在于黑名单"
      );
    }
    form = form.addInput("param", "", {
      placeholder: `输入 玩家ID${config.disableBlackBE ? "" : " / QQ号"} / XUID${op ? " / IP地址 / 设备ID" : ""}`
    });
    const res = await form.sendAsync(player);
    if (res === import_form_api_ex3.FormClose) return;
    ({ param } = res);
  }
  await queryResultForm(player, param, op);
}
__name(queryFormAsync, "queryFormAsync");
function queryCmd(player, param) {
  queryFormAsync(player, param).catch(logErr);
}
__name(queryCmd, "queryCmd");

// src/command.ts
var ONLY_OP_TEXT = "此命令仅限OP执行";
var NO_CONSOLE_TEXT = "此命令无法在控制台中执行";
var REFUSE_LIST_QUERY_TEXT = "本地黑名单请查阅插件配置文件，云黑记录请上云黑官网查询，懒得再给控制台查询写一套代码了";
var NO_ENOUGH_ARG = "参数数量不足";
function checkCommandOp(player) {
  return !player || player.isOP();
}
__name(checkCommandOp, "checkCommandOp");
function tell(msg, player) {
  if (player) player.tell(msg);
  else if (msg.startsWith("§c")) logger.error(delFormatCode(msg.replace("§c", "")));
  else logger.info(delFormatCode(msg));
}
__name(tell, "tell");
function banCommand(willBan, time, reason, player) {
  if (time && time <= 0) {
    tell("§c封禁时间不能小于 0", player);
    return;
  }
  const willBanPlayer = mc.getPlayer(willBan);
  const isXuid = /^[0-9]{16}$/.test(willBan);
  const isIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(willBan);
  const res = banPlayer(
    willBanPlayer ? { player: willBanPlayer } : {
      name: (isXuid ? data.xuid2name(willBan) : null) ?? willBan,
      xuid: isXuid ? willBan : data.name2xuid(willBan) ?? void 0,
      ip: isIp ? willBan : void 0
    },
    {
      time: time ? time * 60 * 1e3 : void 0,
      reason
    }
  );
  if (!res) return;
  const { isModify, results } = res;
  if (results.length) {
    tell(
      `§a已成功${isModify ? "修改" : "增加"} §6${results.length} §a条项目§r
${results.map((v) => `- ${formatLocalItemShort(v)}§r`).join("\n")}`,
      player
    );
  } else {
    tell("§a执行成功，没有项目变动", player);
  }
}
__name(banCommand, "banCommand");
async function banForm(player) {
  const players = getOnlineRealPlayers();
  const form = new import_form_api_ex4.CustomFormEx(PLUGIN_NAME).addDropdown(
    "playerDropdown",
    "如果你想要封禁的玩家在线，请在这里选择",
    players.map((p) => p.realName)
  ).addInput(
    "playerInput",
    "如果你想封禁的玩家不在线，请在这里输入他的 XboxID / XUID / IP\n此栏优先于在线玩家下拉框"
  ).addInput(
    "time",
    "请输入要封禁的时间，单位为分钟 (如果值 为空 / 不为数字 / 小于等于 0，将会判断为永久)"
  ).addInput("reason", "请输入封禁理由（可选）");
  const res = await form.sendAsync(player);
  if (res === import_form_api_ex4.FormClose) return;
  const { playerDropdown, time } = res;
  const playerInput = res.playerInput.trim();
  const willBan = playerInput || (players ? players[playerDropdown].xuid : void 0);
  if (!willBan) {
    player.tell("§c要封禁的玩家无效");
    return;
  }
  const timeNum = Number(time) || void 0;
  const reason = res.reason.trim() || void 0;
  banCommand(willBan, timeNum, reason, player);
}
__name(banForm, "banForm");
function unBanCommand(willUnBan, player) {
  const queried = queryLocal(willUnBan, true, true);
  if (!queried.length) {
    tell("§a执行成功，没有项目变动", player);
    return;
  }
  const succ = [];
  for (const obj of queried) {
    if (delLocalListItem(obj)) succ.push(obj);
  }
  tell(
    `§a已成功删除 §6${succ.length} §a条项目§r
${succ.map((v) => `- ${formatLocalItemShort(v)}§r`).join("\n")}`,
    player
  );
}
__name(unBanCommand, "unBanCommand");
mc.listen("onServerStarted", () => {
  const cmdMain = mc.newCommand("blackbe", PLUGIN_NAME, PermType.Any);
  cmdMain.setEnum("enumReload", ["reload"]);
  cmdMain.mandatory("enumReload", ParamType.Enum, "enumReload", 1);
  cmdMain.overload(["enumReload"]);
  cmdMain.setEnum("enumQuery", ["query"]);
  cmdMain.mandatory("enumQuery", ParamType.Enum, "enumQuery", 1);
  cmdMain.optional("queryString", ParamType.String);
  cmdMain.overload(["enumQuery", "queryString"]);
  cmdMain.setEnum("enumBan", ["ban"]);
  cmdMain.mandatory("enumBan", ParamType.Enum, "enumBan", 1);
  cmdMain.mandatory("player", ParamType.String);
  cmdMain.optional("reason", ParamType.String);
  cmdMain.optional("duration", ParamType.Int);
  cmdMain.overload(["enumBan", "player", "reason", "duration"]);
  cmdMain.overload(["enumBan"]);
  cmdMain.setEnum("enumUnBan", ["unban"]);
  cmdMain.mandatory("enumUnBan", ParamType.Enum, "enumUnBan", 1);
  cmdMain.overload(["enumUnBan", "player"]);
  cmdMain.setEnum("enumLocal", ["local"]);
  cmdMain.mandatory("enumLocal", ParamType.Enum, "enumLocal", 1);
  cmdMain.overload(["enumLocal"]);
  cmdMain.overload([]);
  cmdMain.setCallback((_, { player }, out, result) => {
    const {
      enumReload,
      enumQuery,
      queryString,
      enumBan,
      player: stringSelector,
      reason,
      duration,
      enumUnBan,
      enumLocal
    } = result;
    if (enumReload) {
      if (!checkCommandOp(player)) {
        out.error(ONLY_OP_TEXT);
        return false;
      }
      try {
        reloadConfig();
      } catch (e) {
        out.error(`出错了！
${String(e)}`);
        return false;
      }
      out.success(
        `§a成功重载配置文件与本地黑名单！部分配置项需要重启服务器才可以生效！`
      );
      return true;
    }
    if (enumQuery) {
      if (!player) {
        out.error(NO_CONSOLE_TEXT);
        out.error(REFUSE_LIST_QUERY_TEXT);
        return false;
      }
      if (config.onlyOpCanQuery && !player.isOP()) {
        out.error(ONLY_OP_TEXT);
        return false;
      }
      queryCmd(player, queryString);
      return true;
    }
    if (enumBan) {
      if (!checkCommandOp(player)) {
        out.error(ONLY_OP_TEXT);
        return false;
      }
      if (player && !stringSelector) {
        banForm(player).catch(logErr);
        return true;
      }
      if (stringSelector) {
        banCommand(stringSelector, duration, reason, player);
        return true;
      }
      out.error(NO_ENOUGH_ARG);
      return false;
    }
    if (enumUnBan) {
      if (!checkCommandOp(player)) {
        out.error(ONLY_OP_TEXT);
        return false;
      }
      if (stringSelector) {
        unBanCommand(stringSelector, player);
        return true;
      }
      return false;
    }
    if (enumLocal) {
      if (!player) {
        out.error(NO_CONSOLE_TEXT);
        out.error(REFUSE_LIST_QUERY_TEXT);
        return false;
      }
      if (!player.isOP()) {
        out.error(ONLY_OP_TEXT);
        return false;
      }
      localListForm(player).catch(logErr);
      return true;
    }
    out.error(`请输入子命令`);
    return false;
  });
  cmdMain.setup();
  if (config.registerBanCommand) {
    const cmdBan = mc.newCommand(
      "ban",
      `${PLUGIN_NAME} - 本地黑名单封禁`,
      PermType.GameMasters
    );
    cmdBan.mandatory("player", ParamType.String);
    cmdBan.optional("reason", ParamType.String);
    cmdBan.optional("duration", ParamType.Int);
    cmdBan.overload(["player", "reason", "duration"]);
    cmdBan.setCallback(
      (_, { player }, __, {
        player: stringSelector,
        reason,
        duration
      }) => {
        banCommand(stringSelector, duration, reason, player);
        return true;
      }
    );
    cmdBan.setup();
    const cmdUnBan = mc.newCommand(
      "unban",
      `${PLUGIN_NAME} - 本地黑名单解封`,
      PermType.GameMasters
    );
    cmdUnBan.mandatory("player", ParamType.String);
    cmdUnBan.overload(["player"]);
    cmdUnBan.setCallback(
      (_, { player }, __, {
        player: stringSelector
      }) => {
        unBanCommand(stringSelector, player);
        return true;
      }
    );
    cmdUnBan.setup();
  }
});

// src/listener.ts
var import_form_api_ex5 = __toESM(require_FormAPIEx());
var listenerType = config.processOnPreJoin ? "onPreJoin" : "onJoin";
mc.listen(
  listenerType,
  (0, import_form_api_ex5.wrapAsyncFunc)(async (player) => {
    if (player.isSimulatedPlayer()) return;
    const { hidePassMessage, banIp, banDevice } = config;
    const { realName, xuid } = player;
    const { ip, clientId } = player.getDevice();
    const stripedIp = stripIp(ip);
    if (!hidePassMessage) {
      logger.info(`正在从本地黑名单查询玩家 ${realName} 的封禁记录……`);
    }
    try {
      for (const it of localList.list) {
        if (realName === it.name || xuid === it.xuid || banIp && it.ips && it.ips.includes(stripedIp) || banDevice && it.clientIds && it.clientIds.includes(clientId)) {
          banPlayer({ player }, { kickTip: formatLocalKickMsg(it) });
          logger.warn(`查询到玩家 ${realName} 存在本地封禁记录，已将其踢出`);
          return;
        }
      }
    } catch (e) {
      logger.error(`查询玩家 ${realName} 的本地黑名单记录出错！
${(0, import_form_api_ex5.formatError)(e)}`);
      return;
    }
    if (!hidePassMessage) logger.info(`没有查询到玩家 ${realName} 的本地黑名单记录`);
    if (config.pardonBlackBE.includes(realName) || config.pardonBlackBE.includes(xuid)) {
      if (!hidePassMessage) {
        logger.info(`玩家 ${realName} 的 BlackBE 违规记录检查已被赦免`);
      }
      return;
    }
    if (!hidePassMessage) {
      logger.info(`正在从 BlackBE 查询玩家 ${realName} 的违规记录……`);
    }
    try {
      const { data: data2 } = await check({ name: realName, xuid });
      const { exist, info } = data2;
      if (exist) {
        banPlayer({ player }, { kickTip: formatBlackBEKickMsg(info[0]) });
        const formattedInfo = `§6查询到玩家 §d${realName} §6在 BlackBE 中存在违规记录！
§c已将其踢出并加入本地黑名单！§r
${await formatBlackBEInfo(info[0])}`;
        mc.broadcast(formattedInfo);
        logger.warn(delFormatCode(formattedInfo));
        return;
      }
    } catch (e) {
      logger.error(`查询玩家 ${realName} 的 BlackBE 违规记录出错！
${(0, import_form_api_ex5.formatError)(e)}`);
      return;
    }
    if (!hidePassMessage) logger.info(`没有查询到玩家 ${realName} 的 BlackBE 违规记录`);
  })
);
setInterval(() => {
  const { list } = localList;
  const originalLen = list.length;
  let offset = 0;
  for (let i = 0; i < originalLen; i += 1) {
    const realI = i - offset;
    const it = list[realI];
    const { endTime } = it;
    const nowTime = Date.now();
    if (endTime && nowTime >= new Date(endTime).getTime()) {
      list.splice(realI, 1);
      offset += 1;
      saveLocalList();
      const formatted = delFormatCode(formatLocalItemShort(it));
      logger.warn(`玩家 ${formatted} 的黑名单封禁到期，已自动解封`);
    }
  }
}, config.checkLocalListInterval);

// src/index.ts
ll.registerPlugin(PLUGIN_NAME, PLUGIN_DESCRIPTION, PLUGIN_VERSION, PLUGIN_EXTRA);
{
  const [old, now] = migrate2(Query.get());
  if (old !== now) logger.info(`DB migrated from ${old} to ${now}`);
}
