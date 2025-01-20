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

// ../node_modules/.pnpm/cosmokit@1.6.2/node_modules/cosmokit/lib/index.cjs
var require_lib = __commonJS({
  "../node_modules/.pnpm/cosmokit@1.6.2/node_modules/cosmokit/lib/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
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
      Binary: /* @__PURE__ */ __name(() => Binary, "Binary"),
      Time: /* @__PURE__ */ __name(() => Time, "Time"),
      arrayBufferToBase64: /* @__PURE__ */ __name(() => arrayBufferToBase64, "arrayBufferToBase64"),
      arrayBufferToHex: /* @__PURE__ */ __name(() => arrayBufferToHex, "arrayBufferToHex"),
      base64ToArrayBuffer: /* @__PURE__ */ __name(() => base64ToArrayBuffer, "base64ToArrayBuffer"),
      camelCase: /* @__PURE__ */ __name(() => camelCase, "camelCase"),
      camelize: /* @__PURE__ */ __name(() => camelize, "camelize"),
      capitalize: /* @__PURE__ */ __name(() => capitalize, "capitalize"),
      clone: /* @__PURE__ */ __name(() => clone, "clone"),
      contain: /* @__PURE__ */ __name(() => contain, "contain"),
      deduplicate: /* @__PURE__ */ __name(() => deduplicate, "deduplicate"),
      deepEqual: /* @__PURE__ */ __name(() => deepEqual, "deepEqual"),
      defineProperty: /* @__PURE__ */ __name(() => defineProperty, "defineProperty"),
      difference: /* @__PURE__ */ __name(() => difference, "difference"),
      filterKeys: /* @__PURE__ */ __name(() => filterKeys, "filterKeys"),
      hexToArrayBuffer: /* @__PURE__ */ __name(() => hexToArrayBuffer, "hexToArrayBuffer"),
      hyphenate: /* @__PURE__ */ __name(() => hyphenate, "hyphenate"),
      intersection: /* @__PURE__ */ __name(() => intersection, "intersection"),
      is: /* @__PURE__ */ __name(() => is, "is"),
      isNullable: /* @__PURE__ */ __name(() => isNullable, "isNullable"),
      isPlainObject: /* @__PURE__ */ __name(() => isPlainObject, "isPlainObject"),
      makeArray: /* @__PURE__ */ __name(() => makeArray, "makeArray"),
      mapValues: /* @__PURE__ */ __name(() => mapValues, "mapValues"),
      noop: /* @__PURE__ */ __name(() => noop, "noop"),
      omit: /* @__PURE__ */ __name(() => omit, "omit"),
      paramCase: /* @__PURE__ */ __name(() => paramCase, "paramCase"),
      pick: /* @__PURE__ */ __name(() => pick, "pick"),
      remove: /* @__PURE__ */ __name(() => remove, "remove"),
      sanitize: /* @__PURE__ */ __name(() => sanitize, "sanitize"),
      snakeCase: /* @__PURE__ */ __name(() => snakeCase, "snakeCase"),
      trimSlash: /* @__PURE__ */ __name(() => trimSlash, "trimSlash"),
      uncapitalize: /* @__PURE__ */ __name(() => uncapitalize, "uncapitalize"),
      union: /* @__PURE__ */ __name(() => union, "union"),
      valueMap: /* @__PURE__ */ __name(() => mapValues, "valueMap")
    });
    module2.exports = __toCommonJS(src_exports);
    function noop() {
    }
    __name(noop, "noop");
    __name2(noop, "noop");
    function isNullable(value) {
      return value === null || value === void 0;
    }
    __name(isNullable, "isNullable");
    __name2(isNullable, "isNullable");
    function isPlainObject(data2) {
      return data2 && typeof data2 === "object" && !Array.isArray(data2);
    }
    __name(isPlainObject, "isPlainObject");
    __name2(isPlainObject, "isPlainObject");
    function filterKeys(object, filter) {
      return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
    }
    __name(filterKeys, "filterKeys");
    __name2(filterKeys, "filterKeys");
    function mapValues(object, transform) {
      return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
    }
    __name(mapValues, "mapValues");
    __name2(mapValues, "mapValues");
    function pick(source, keys, forced) {
      if (!keys)
        return { ...source };
      const result = {};
      for (const key of keys) {
        if (forced || source[key] !== void 0)
          result[key] = source[key];
      }
      return result;
    }
    __name(pick, "pick");
    __name2(pick, "pick");
    function omit(source, keys) {
      if (!keys)
        return { ...source };
      const result = { ...source };
      for (const key of keys) {
        Reflect.deleteProperty(result, key);
      }
      return result;
    }
    __name(omit, "omit");
    __name2(omit, "omit");
    function defineProperty(object, key, value) {
      return Object.defineProperty(object, key, { writable: true, value, enumerable: false });
    }
    __name(defineProperty, "defineProperty");
    __name2(defineProperty, "defineProperty");
    function contain(array1, array2) {
      return array2.every((item) => array1.includes(item));
    }
    __name(contain, "contain");
    __name2(contain, "contain");
    function intersection(array1, array2) {
      return array1.filter((item) => array2.includes(item));
    }
    __name(intersection, "intersection");
    __name2(intersection, "intersection");
    function difference(array1, array2) {
      return array1.filter((item) => !array2.includes(item));
    }
    __name(difference, "difference");
    __name2(difference, "difference");
    function union(array1, array2) {
      return Array.from(/* @__PURE__ */ new Set([...array1, ...array2]));
    }
    __name(union, "union");
    __name2(union, "union");
    function deduplicate(array) {
      return [...new Set(array)];
    }
    __name(deduplicate, "deduplicate");
    __name2(deduplicate, "deduplicate");
    function remove(list, item) {
      const index = list.indexOf(item);
      if (index >= 0) {
        list.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    __name(remove, "remove");
    __name2(remove, "remove");
    function makeArray(source) {
      return Array.isArray(source) ? source : isNullable(source) ? [] : [source];
    }
    __name(makeArray, "makeArray");
    __name2(makeArray, "makeArray");
    function is(type, value) {
      if (arguments.length === 1)
        return (value2) => is(type, value2);
      return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
    }
    __name(is, "is");
    __name2(is, "is");
    function isArrayBufferLike(value) {
      return is("ArrayBuffer", value) || is("SharedArrayBuffer", value);
    }
    __name(isArrayBufferLike, "isArrayBufferLike");
    __name2(isArrayBufferLike, "isArrayBufferLike");
    function isArrayBufferSource(value) {
      return isArrayBufferLike(value) || ArrayBuffer.isView(value);
    }
    __name(isArrayBufferSource, "isArrayBufferSource");
    __name2(isArrayBufferSource, "isArrayBufferSource");
    var Binary;
    ((Binary2) => {
      Binary2.is = isArrayBufferLike;
      Binary2.isSource = isArrayBufferSource;
      function fromSource(source) {
        if (ArrayBuffer.isView(source)) {
          return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
        } else {
          return source;
        }
      }
      __name(fromSource, "fromSource");
      Binary2.fromSource = fromSource;
      __name2(fromSource, "fromSource");
      function toBase64(source) {
        if (typeof Buffer !== "undefined") {
          return Buffer.from(source).toString("base64");
        }
        let binary = "";
        const bytes = new Uint8Array(source);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      __name(toBase64, "toBase64");
      Binary2.toBase64 = toBase64;
      __name2(toBase64, "toBase64");
      function fromBase64(source) {
        if (typeof Buffer !== "undefined")
          return fromSource(Buffer.from(source, "base64"));
        return Uint8Array.from(atob(source), (c) => c.charCodeAt(0));
      }
      __name(fromBase64, "fromBase64");
      Binary2.fromBase64 = fromBase64;
      __name2(fromBase64, "fromBase64");
      function toHex(source) {
        if (typeof Buffer !== "undefined")
          return Buffer.from(source).toString("hex");
        return Array.from(new Uint8Array(source), (byte) => byte.toString(16).padStart(2, "0")).join("");
      }
      __name(toHex, "toHex");
      Binary2.toHex = toHex;
      __name2(toHex, "toHex");
      function fromHex(source) {
        if (typeof Buffer !== "undefined")
          return fromSource(Buffer.from(source, "hex"));
        const hex = source.length % 2 === 0 ? source : source.slice(0, source.length - 1);
        const buffer = [];
        for (let i = 0; i < hex.length; i += 2) {
          buffer.push(parseInt(`${hex[i]}${hex[i + 1]}`, 16));
        }
        return Uint8Array.from(buffer).buffer;
      }
      __name(fromHex, "fromHex");
      Binary2.fromHex = fromHex;
      __name2(fromHex, "fromHex");
    })(Binary || (Binary = {}));
    var base64ToArrayBuffer = Binary.fromBase64;
    var arrayBufferToBase64 = Binary.toBase64;
    var hexToArrayBuffer = Binary.fromHex;
    var arrayBufferToHex = Binary.toHex;
    function clone(source) {
      if (!source || typeof source !== "object")
        return source;
      if (Array.isArray(source))
        return source.map(clone);
      if (is("Date", source))
        return new Date(source.valueOf());
      if (is("RegExp", source))
        return new RegExp(source.source, source.flags);
      if (isArrayBufferLike(source))
        return source.slice(0);
      if (ArrayBuffer.isView(source))
        return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
      return mapValues(source, clone);
    }
    __name(clone, "clone");
    __name2(clone, "clone");
    function deepEqual(a, b, strict) {
      if (a === b)
        return true;
      if (!strict && isNullable(a) && isNullable(b))
        return true;
      if (typeof a !== typeof b)
        return false;
      if (typeof a !== "object")
        return false;
      if (!a || !b)
        return false;
      function check2(test, then) {
        return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
      }
      __name(check2, "check");
      __name2(check2, "check");
      return check2(Array.isArray, (a2, b2) => a2.length === b2.length && a2.every((item, index) => deepEqual(item, b2[index]))) ?? check2(is("Date"), (a2, b2) => a2.valueOf() === b2.valueOf()) ?? check2(is("RegExp"), (a2, b2) => a2.source === b2.source && a2.flags === b2.flags) ?? check2(isArrayBufferLike, (a2, b2) => {
        if (a2.byteLength !== b2.byteLength)
          return false;
        const viewA = new Uint8Array(a2);
        const viewB = new Uint8Array(b2);
        for (let i = 0; i < viewA.length; i++) {
          if (viewA[i] !== viewB[i])
            return false;
        }
        return true;
      }) ?? Object.keys({ ...a, ...b }).every((key) => deepEqual(a[key], b[key], strict));
    }
    __name(deepEqual, "deepEqual");
    __name2(deepEqual, "deepEqual");
    function capitalize(source) {
      return source.charAt(0).toUpperCase() + source.slice(1);
    }
    __name(capitalize, "capitalize");
    __name2(capitalize, "capitalize");
    function uncapitalize(source) {
      return source.charAt(0).toLowerCase() + source.slice(1);
    }
    __name(uncapitalize, "uncapitalize");
    __name2(uncapitalize, "uncapitalize");
    function camelCase(source) {
      return source.replace(/[_-][a-z]/g, (str) => str.slice(1).toUpperCase());
    }
    __name(camelCase, "camelCase");
    __name2(camelCase, "camelCase");
    function paramCase(source) {
      return uncapitalize(source).replace(/_/g, "-").replace(/.[A-Z]+/g, (str) => str[0] + "-" + str.slice(1).toLowerCase());
    }
    __name(paramCase, "paramCase");
    __name2(paramCase, "paramCase");
    function snakeCase(source) {
      return uncapitalize(source).replace(/-/g, "_").replace(/.[A-Z]+/g, (str) => str[0] + "_" + str.slice(1).toLowerCase());
    }
    __name(snakeCase, "snakeCase");
    __name2(snakeCase, "snakeCase");
    var camelize = camelCase;
    var hyphenate = paramCase;
    function trimSlash(source) {
      return source.replace(/\/$/, "");
    }
    __name(trimSlash, "trimSlash");
    __name2(trimSlash, "trimSlash");
    function sanitize(source) {
      if (!source.startsWith("/"))
        source = "/" + source;
      return trimSlash(source);
    }
    __name(sanitize, "sanitize");
    __name2(sanitize, "sanitize");
    var Time;
    ((Time2) => {
      Time2.millisecond = 1;
      Time2.second = 1e3;
      Time2.minute = Time2.second * 60;
      Time2.hour = Time2.minute * 60;
      Time2.day = Time2.hour * 24;
      Time2.week = Time2.day * 7;
      let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
      function setTimezoneOffset(offset) {
        timezoneOffset = offset;
      }
      __name(setTimezoneOffset, "setTimezoneOffset");
      Time2.setTimezoneOffset = setTimezoneOffset;
      __name2(setTimezoneOffset, "setTimezoneOffset");
      function getTimezoneOffset() {
        return timezoneOffset;
      }
      __name(getTimezoneOffset, "getTimezoneOffset");
      Time2.getTimezoneOffset = getTimezoneOffset;
      __name2(getTimezoneOffset, "getTimezoneOffset");
      function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
        if (typeof date === "number")
          date = new Date(date);
        if (offset === void 0)
          offset = timezoneOffset;
        return Math.floor((date.valueOf() / Time2.minute - offset) / 1440);
      }
      __name(getDateNumber, "getDateNumber");
      Time2.getDateNumber = getDateNumber;
      __name2(getDateNumber, "getDateNumber");
      function fromDateNumber(value, offset) {
        const date = new Date(value * Time2.day);
        if (offset === void 0)
          offset = timezoneOffset;
        return new Date(+date + offset * Time2.minute);
      }
      __name(fromDateNumber, "fromDateNumber");
      Time2.fromDateNumber = fromDateNumber;
      __name2(fromDateNumber, "fromDateNumber");
      const numeric = /\d+(?:\.\d+)?/.source;
      const timeRegExp = new RegExp(`^${[
        "w(?:eek(?:s)?)?",
        "d(?:ay(?:s)?)?",
        "h(?:our(?:s)?)?",
        "m(?:in(?:ute)?(?:s)?)?",
        "s(?:ec(?:ond)?(?:s)?)?"
      ].map((unit) => `(${numeric}${unit})?`).join("")}$`);
      function parseTime(source) {
        const capture = timeRegExp.exec(source);
        if (!capture)
          return 0;
        return (parseFloat(capture[1]) * Time2.week || 0) + (parseFloat(capture[2]) * Time2.day || 0) + (parseFloat(capture[3]) * Time2.hour || 0) + (parseFloat(capture[4]) * Time2.minute || 0) + (parseFloat(capture[5]) * Time2.second || 0);
      }
      __name(parseTime, "parseTime");
      Time2.parseTime = parseTime;
      __name2(parseTime, "parseTime");
      function parseDate(date) {
        const parsed = parseTime(date);
        if (parsed) {
          date = Date.now() + parsed;
        } else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
          date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
        } else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
          date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
        }
        return date ? new Date(date) : /* @__PURE__ */ new Date();
      }
      __name(parseDate, "parseDate");
      Time2.parseDate = parseDate;
      __name2(parseDate, "parseDate");
      function format(ms) {
        const abs = Math.abs(ms);
        if (abs >= Time2.day - Time2.hour / 2) {
          return Math.round(ms / Time2.day) + "d";
        } else if (abs >= Time2.hour - Time2.minute / 2) {
          return Math.round(ms / Time2.hour) + "h";
        } else if (abs >= Time2.minute - Time2.second / 2) {
          return Math.round(ms / Time2.minute) + "m";
        } else if (abs >= Time2.second) {
          return Math.round(ms / Time2.second) + "s";
        }
        return ms + "ms";
      }
      __name(format, "format");
      Time2.format = format;
      __name2(format, "format");
      function toDigits(source, length = 2) {
        return source.toString().padStart(length, "0");
      }
      __name(toDigits, "toDigits");
      Time2.toDigits = toDigits;
      __name2(toDigits, "toDigits");
      function template(template2, time = /* @__PURE__ */ new Date()) {
        return template2.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
      }
      __name(template, "template");
      Time2.template = template;
      __name2(template, "template");
    })(Time || (Time = {}));
  }
});

// ../node_modules/.pnpm/schemastery@3.14.6/node_modules/schemastery/lib/index.cjs
var require_lib2 = __commonJS({
  "../node_modules/.pnpm/schemastery@3.14.6/node_modules/schemastery/lib/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var import_cosmokit = require_lib();
    var kSchema = Symbol.for("schemastery");
    globalThis.__schemastery_index__ ??= 0;
    var Schema2 = /* @__PURE__ */ __name2(function(options) {
      const schema = /* @__PURE__ */ __name2(function(data2, options2) {
        return Schema2.resolve(data2, schema, options2)[0];
      }, "schema");
      if (options.refs) {
        const refs2 = (0, import_cosmokit.valueMap)(options.refs, (options2) => new Schema2(options2));
        const getRef = /* @__PURE__ */ __name2((uid) => refs2[uid], "getRef");
        for (const key in refs2) {
          const options2 = refs2[key];
          options2.sKey = getRef(options2.sKey);
          options2.inner = getRef(options2.inner);
          options2.list = options2.list && options2.list.map(getRef);
          options2.dict = options2.dict && (0, import_cosmokit.valueMap)(options2.dict, getRef);
        }
        return refs2[options.uid];
      }
      Object.assign(schema, options);
      if (typeof schema.callback === "string") {
        try {
          schema.callback = new Function("return " + schema.callback)();
        } catch {
        }
      }
      Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
      Object.setPrototypeOf(schema, Schema2.prototype);
      schema.meta ||= {};
      schema.toString = schema.toString.bind(schema);
      return schema;
    }, "Schema");
    Schema2.prototype = Object.create(Function.prototype);
    Schema2.prototype[kSchema] = true;
    var refs;
    Schema2.prototype.toJSON = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function toJSON() {
      if (refs) {
        refs[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
        return this.uid;
      }
      refs = { [this.uid]: { ...this } };
      refs[this.uid] = JSON.parse(JSON.stringify({ ...this }));
      const result = { uid: this.uid, refs };
      refs = void 0;
      return result;
    }, "toJSON"), "toJSON");
    Schema2.prototype.set = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function set(key, value) {
      this.dict[key] = value;
      return this;
    }, "set"), "set");
    Schema2.prototype.push = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function push(value) {
      this.list.push(value);
      return this;
    }, "push"), "push");
    function mergeDesc(original, messages) {
      const result = typeof original === "string" ? { "": original } : { ...original };
      for (const locale in messages) {
        const value = messages[locale];
        if (value?.$description || value?.$desc) {
          result[locale] = value.$description || value.$desc;
        } else if (typeof value === "string") {
          result[locale] = value;
        }
      }
      return result;
    }
    __name(mergeDesc, "mergeDesc");
    __name2(mergeDesc, "mergeDesc");
    function getInner(value) {
      return value?.$value ?? value?.$inner;
    }
    __name(getInner, "getInner");
    __name2(getInner, "getInner");
    function extractKeys(data2) {
      return (0, import_cosmokit.filterKeys)(data2 ?? {}, (key) => !key.startsWith("$"));
    }
    __name(extractKeys, "extractKeys");
    __name2(extractKeys, "extractKeys");
    Schema2.prototype.i18n = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function i18n(messages) {
      const schema = Schema2(this);
      schema.meta.description = mergeDesc(schema.meta.description, messages);
      if (schema.dict) {
        schema.dict = (0, import_cosmokit.valueMap)(schema.dict, (inner, key) => {
          return inner.i18n((0, import_cosmokit.valueMap)(messages, (data2) => getInner(data2)?.[key] ?? data2?.[key]));
        });
      }
      if (schema.list) {
        schema.list = schema.list.map((inner, index) => {
          return inner.i18n((0, import_cosmokit.valueMap)(messages, (data2 = {}) => {
            if (Array.isArray(getInner(data2)))
              return getInner(data2)[index];
            if (Array.isArray(data2))
              return data2[index];
            return extractKeys(data2);
          }));
        });
      }
      if (schema.inner) {
        schema.inner = schema.inner.i18n((0, import_cosmokit.valueMap)(messages, (data2) => {
          if (getInner(data2))
            return getInner(data2);
          return extractKeys(data2);
        }));
      }
      if (schema.sKey) {
        schema.sKey = schema.sKey.i18n((0, import_cosmokit.valueMap)(messages, (data2) => data2?.$key));
      }
      return schema;
    }, "i18n"), "i18n");
    Schema2.prototype.extra = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function extra(key, value) {
      const schema = Schema2(this);
      schema.meta = { ...schema.meta, [key]: value };
      return schema;
    }, "extra"), "extra");
    for (const key of ["required", "disabled", "collapse", "hidden", "loose"]) {
      Object.assign(Schema2.prototype, {
        [key](value = true) {
          const schema = Schema2(this);
          schema.meta = { ...schema.meta, [key]: value };
          return schema;
        }
      });
    }
    Schema2.prototype.deprecated = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function deprecated() {
      const schema = Schema2(this);
      schema.meta.badges ||= [];
      schema.meta.badges.push({ text: "deprecated", type: "danger" });
      return schema;
    }, "deprecated"), "deprecated");
    Schema2.prototype.experimental = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function experimental() {
      const schema = Schema2(this);
      schema.meta.badges ||= [];
      schema.meta.badges.push({ text: "experimental", type: "warning" });
      return schema;
    }, "experimental"), "experimental");
    Schema2.prototype.pattern = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function pattern(regexp) {
      const schema = Schema2(this);
      const pattern2 = (0, import_cosmokit.pick)(regexp, ["source", "flags"]);
      schema.meta = { ...schema.meta, pattern: pattern2 };
      return schema;
    }, "pattern"), "pattern");
    Schema2.prototype.simplify = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function simplify(value) {
      if ((0, import_cosmokit.deepEqual)(value, this.meta.default, this.type === "dict"))
        return null;
      if ((0, import_cosmokit.isNullable)(value))
        return value;
      if (this.type === "object" || this.type === "dict") {
        const result = {};
        for (const key in value) {
          const schema = this.type === "object" ? this.dict[key] : this.inner;
          const item = schema?.simplify(value[key]);
          if (this.type === "dict" || !(0, import_cosmokit.isNullable)(item))
            result[key] = item;
        }
        if ((0, import_cosmokit.deepEqual)(result, this.meta.default, this.type === "dict"))
          return null;
        return result;
      } else if (this.type === "array" || this.type === "tuple") {
        const result = [];
        value.forEach((value2, index) => {
          const schema = this.type === "array" ? this.inner : this.list[index];
          const item = schema ? schema.simplify(value2) : value2;
          result.push(item);
        });
        return result;
      } else if (this.type === "intersect") {
        const result = {};
        for (const item of this.list) {
          Object.assign(result, item.simplify(value));
        }
        return result;
      } else if (this.type === "union") {
        for (const schema of this.list) {
          try {
            Schema2.resolve(value, schema);
            return schema.simplify(value);
          } catch {
          }
        }
      }
      return value;
    }, "simplify"), "simplify");
    Schema2.prototype.toString = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function toString(inline) {
      return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
    }, "toString"), "toString");
    Schema2.prototype.role = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function role(role, extra2) {
      const schema = Schema2(this);
      schema.meta = { ...schema.meta, role, extra: extra2 };
      return schema;
    }, "role"), "role");
    for (const key of ["default", "link", "comment", "description", "max", "min", "step"]) {
      Object.assign(Schema2.prototype, {
        [key](value) {
          const schema = Schema2(this);
          schema.meta = { ...schema.meta, [key]: value };
          return schema;
        }
      });
    }
    var resolvers = {};
    Schema2.extend = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function extend(type, resolve2) {
      resolvers[type] = resolve2;
    }, "extend"), "extend");
    Schema2.resolve = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function resolve(data2, schema, options = {}, strict = false) {
      if (!schema)
        return [data2];
      if ((0, import_cosmokit.isNullable)(data2)) {
        if (schema.meta.required)
          throw new TypeError(`missing required value`);
        let current = schema;
        let fallback = schema.meta.default;
        while (current?.type === "intersect" && (0, import_cosmokit.isNullable)(fallback)) {
          current = current.list[0];
          fallback = current?.meta.default;
        }
        if ((0, import_cosmokit.isNullable)(fallback))
          return [data2];
        data2 = (0, import_cosmokit.clone)(fallback);
      }
      const callback = resolvers[schema.type];
      if (!callback)
        throw new TypeError(`unsupported type "${schema.type}"`);
      try {
        return callback(data2, schema, options, strict);
      } catch (error) {
        if (!schema.meta.loose)
          throw error;
        return [schema.meta.default];
      }
    }, "resolve"), "resolve");
    Schema2.from = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function from(source) {
      if ((0, import_cosmokit.isNullable)(source)) {
        return Schema2.any();
      } else if (["string", "number", "boolean"].includes(typeof source)) {
        return Schema2.const(source).required();
      } else if (source[kSchema]) {
        return source;
      } else if (typeof source === "function") {
        switch (source) {
          case String:
            return Schema2.string().required();
          case Number:
            return Schema2.number().required();
          case Boolean:
            return Schema2.boolean().required();
          case Function:
            return Schema2.function().required();
          default:
            return Schema2.is(source).required();
        }
      } else {
        throw new TypeError(`cannot infer schema from ${source}`);
      }
    }, "from"), "from");
    Schema2.natural = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function natural() {
      return Schema2.number().step(1).min(0);
    }, "natural"), "natural");
    Schema2.percent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function percent() {
      return Schema2.number().step(0.01).min(0).max(1).role("slider");
    }, "percent"), "percent");
    Schema2.date = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function date() {
      return Schema2.union([
        Schema2.is(Date),
        Schema2.transform(Schema2.string().role("datetime"), (value) => {
          const date2 = new Date(value);
          if (isNaN(+date2))
            throw new TypeError(`invalid date "${value}"`);
          return date2;
        }, true)
      ]);
    }, "date"), "date");
    Schema2.extend("any", (data2) => {
      return [data2];
    });
    Schema2.extend("never", (data2) => {
      throw new TypeError(`expected nullable but got ${data2}`);
    });
    Schema2.extend("const", (data2, { value }) => {
      if (data2 === value)
        return [value];
      throw new TypeError(`expected ${value} but got ${data2}`);
    });
    function checkWithinRange(data2, meta, description2, skipMin = false) {
      const { max = Infinity, min = -Infinity } = meta;
      if (data2 > max)
        throw new TypeError(`expected ${description2} <= ${max} but got ${data2}`);
      if (data2 < min && !skipMin)
        throw new TypeError(`expected ${description2} >= ${min} but got ${data2}`);
    }
    __name(checkWithinRange, "checkWithinRange");
    __name2(checkWithinRange, "checkWithinRange");
    Schema2.extend("string", (data2, { meta }) => {
      if (typeof data2 !== "string")
        throw new TypeError(`expected string but got ${data2}`);
      if (meta.pattern) {
        const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
        if (!regexp.test(data2))
          throw new TypeError(`expect string to match regexp ${regexp}`);
      }
      checkWithinRange(data2.length, meta, "string length");
      return [data2];
    });
    function decimalShift(data2, digits) {
      const str = data2.toString();
      if (str.includes("e"))
        return data2 * Math.pow(10, digits);
      const index = str.indexOf(".");
      if (index === -1)
        return data2 * Math.pow(10, digits);
      const frac = str.slice(index + 1);
      const integer = str.slice(0, index);
      if (frac.length <= digits)
        return +(integer + frac.padEnd(digits, "0"));
      return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
    }
    __name(decimalShift, "decimalShift");
    __name2(decimalShift, "decimalShift");
    function isMultipleOf(data2, min, step) {
      step = Math.abs(step);
      if (!/^\d+\.\d+$/.test(step.toString())) {
        return (data2 - min) % step === 0;
      }
      const index = step.toString().indexOf(".");
      const digits = step.toString().slice(index + 1).length;
      return Math.abs(decimalShift(data2, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
    }
    __name(isMultipleOf, "isMultipleOf");
    __name2(isMultipleOf, "isMultipleOf");
    Schema2.extend("number", (data2, { meta }) => {
      if (typeof data2 !== "number")
        throw new TypeError(`expected number but got ${data2}`);
      checkWithinRange(data2, meta, "number");
      const { step } = meta;
      if (step && !isMultipleOf(data2, meta.min ?? 0, step)) {
        throw new TypeError(`expected number multiple of ${step} but got ${data2}`);
      }
      return [data2];
    });
    Schema2.extend("boolean", (data2) => {
      if (typeof data2 === "boolean")
        return [data2];
      throw new TypeError(`expected boolean but got ${data2}`);
    });
    Schema2.extend("bitset", (data2, { bits, meta }) => {
      let value = 0, keys = [];
      if (typeof data2 === "number") {
        value = data2;
        for (const key in bits) {
          if (data2 & bits[key]) {
            keys.push(key);
          }
        }
      } else if (Array.isArray(data2)) {
        keys = data2;
        for (const key of keys) {
          if (typeof key !== "string")
            throw new TypeError(`expected string but got ${key}`);
          if (key in bits)
            value |= bits[key];
        }
      } else {
        throw new TypeError(`expected number or array but got ${data2}`);
      }
      if (value === meta.default)
        return [value];
      return [value, keys];
    });
    Schema2.extend("function", (data2) => {
      if (typeof data2 === "function")
        return [data2];
      throw new TypeError(`expected function but got ${data2}`);
    });
    Schema2.extend("is", (data2, { callback }) => {
      if (data2 instanceof callback)
        return [data2];
      throw new TypeError(`expected ${callback.name} but got ${data2}`);
    });
    function property(data2, key, schema, options) {
      try {
        const [value, adapted] = Schema2.resolve(data2[key], schema, options);
        if (adapted !== void 0)
          data2[key] = adapted;
        return value;
      } catch (e) {
        if (!options?.autofix)
          throw e;
        delete data2[key];
        return schema.meta.default;
      }
    }
    __name(property, "property");
    __name2(property, "property");
    Schema2.extend("array", (data2, { inner, meta }, options) => {
      if (!Array.isArray(data2))
        throw new TypeError(`expected array but got ${data2}`);
      checkWithinRange(data2.length, meta, "array length", !(0, import_cosmokit.isNullable)(inner.meta.default));
      return [data2.map((_, index) => property(data2, index, inner, options))];
    });
    Schema2.extend("dict", (data2, { inner, sKey }, options, strict) => {
      if (!(0, import_cosmokit.isPlainObject)(data2))
        throw new TypeError(`expected object but got ${data2}`);
      const result = {};
      for (const key in data2) {
        let rKey;
        try {
          rKey = Schema2.resolve(key, sKey)[0];
        } catch (error) {
          if (strict)
            continue;
          throw error;
        }
        result[rKey] = property(data2, key, inner, options);
        data2[rKey] = data2[key];
        if (key !== rKey)
          delete data2[key];
      }
      return [result];
    });
    Schema2.extend("tuple", (data2, { list }, options, strict) => {
      if (!Array.isArray(data2))
        throw new TypeError(`expected array but got ${data2}`);
      const result = list.map((inner, index) => property(data2, index, inner, options));
      if (strict)
        return [result];
      result.push(...data2.slice(list.length));
      return [result];
    });
    function merge(result, data2) {
      for (const key in data2) {
        if (key in result)
          continue;
        result[key] = data2[key];
      }
    }
    __name(merge, "merge");
    __name2(merge, "merge");
    Schema2.extend("object", (data2, { dict }, options, strict) => {
      if (!(0, import_cosmokit.isPlainObject)(data2))
        throw new TypeError(`expected object but got ${data2}`);
      const result = {};
      for (const key in dict) {
        const value = property(data2, key, dict[key], options);
        if (!(0, import_cosmokit.isNullable)(value) || key in data2) {
          result[key] = value;
        }
      }
      if (!strict)
        merge(result, data2);
      return [result];
    });
    Schema2.extend("union", (data2, { list, toString: toString2 }, options, strict) => {
      const messages = [];
      for (const inner of list) {
        try {
          return Schema2.resolve(data2, inner, options, strict);
        } catch (error) {
          messages.push(error);
        }
      }
      throw new TypeError(`expected ${toString2()} but got ${JSON.stringify(data2)}`);
    });
    Schema2.extend("intersect", (data2, { list, toString: toString2 }, options, strict) => {
      let result;
      for (const inner of list) {
        const value = Schema2.resolve(data2, inner, options, true)[0];
        if ((0, import_cosmokit.isNullable)(value))
          continue;
        if ((0, import_cosmokit.isNullable)(result)) {
          result = value;
        } else if (typeof result !== typeof value) {
          throw new TypeError(`expected ${toString2()} but got ${JSON.stringify(data2)}`);
        } else if (typeof value === "object") {
          merge(result ??= {}, value);
        } else if (result !== value) {
          throw new TypeError(`expected ${toString2()} but got ${JSON.stringify(data2)}`);
        }
      }
      if (!strict && (0, import_cosmokit.isPlainObject)(data2))
        merge(result, data2);
      return [result];
    });
    Schema2.extend("transform", (data2, { inner, callback, preserve }, options) => {
      const [result, adapted = data2] = Schema2.resolve(data2, inner, options, true);
      if (preserve) {
        return [callback(result)];
      } else {
        return [callback(result), callback(adapted)];
      }
    });
    var formatters = {};
    function defineMethod(name, keys, format) {
      formatters[name] = format;
      Object.assign(Schema2, {
        [name](...args) {
          const schema = new Schema2({ type: name });
          keys.forEach((key, index) => {
            switch (key) {
              case "sKey":
                schema.sKey = args[index] ?? Schema2.string();
                break;
              case "inner":
                schema.inner = Schema2.from(args[index]);
                break;
              case "list":
                schema.list = args[index].map(Schema2.from);
                break;
              case "dict":
                schema.dict = (0, import_cosmokit.valueMap)(args[index], Schema2.from);
                break;
              case "bits": {
                schema.bits = {};
                for (const key2 in args[index]) {
                  if (typeof args[index][key2] !== "number")
                    continue;
                  schema.bits[key2] = args[index][key2];
                }
                break;
              }
              case "callback": {
                schema.callback = args[index];
                schema.callback["toJSON"] ||= () => schema.callback.toString();
                break;
              }
              default:
                schema[key] = args[index];
            }
          });
          if (name === "object" || name === "dict") {
            schema.meta.default = {};
          } else if (name === "array" || name === "tuple") {
            schema.meta.default = [];
          } else if (name === "bitset") {
            schema.meta.default = 0;
          }
          return schema;
        }
      });
    }
    __name(defineMethod, "defineMethod");
    __name2(defineMethod, "defineMethod");
    defineMethod("is", ["callback"], ({ callback }) => callback.name);
    defineMethod("any", [], () => "any");
    defineMethod("never", [], () => "never");
    defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
    defineMethod("string", [], () => "string");
    defineMethod("number", [], () => "number");
    defineMethod("boolean", [], () => "boolean");
    defineMethod("bitset", ["bits"], () => "bitset");
    defineMethod("function", [], () => "function");
    defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
    defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
    defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
    defineMethod("object", ["dict"], ({ dict }) => {
      if (Object.keys(dict).length === 0)
        return "{}";
      return `{ ${Object.entries(dict).map(([key, inner]) => {
        return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
      }).join(", ")} }`;
    });
    defineMethod("union", ["list"], ({ list }, inline) => {
      const result = list.map(({ toString: format }) => format()).join(" | ");
      return inline ? `(${result})` : result;
    });
    defineMethod("intersect", ["list"], ({ list }) => {
      return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
    });
    defineMethod("transform", ["inner", "callback", "preserve"], ({ inner }, isInner) => inner.toString(isInner));
    module2.exports = Schema2;
  }
});

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

// src/config.ts
var import_schemastery = __toESM(require_lib2());

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

// src/config.ts
var configPath = `${DATA_PATH}/config.json`;
var Config = import_schemastery.default.object({
  debug: import_schemastery.default.boolean().default(false),
  apiToken: import_schemastery.default.string().required(false),
  banIp: import_schemastery.default.boolean().default(true),
  banDevice: import_schemastery.default.boolean().default(true),
  hidePassMessage: import_schemastery.default.boolean().default(false),
  disableBlackBE: import_schemastery.default.boolean().default(false),
  kickByCloudMsg: import_schemastery.default.string().default(
    `§c您已被BlackBE云端黑名单封禁§r

详情请访问 §ghttps://blackbe.work/`
  ),
  kickByLocalMsg: import_schemastery.default.string().default(
    `§c您已被服务器封禁§r

解封时间: §g%ENDTIME%§r
封禁原因: §g%REASON%`
  ),
  serverName: import_schemastery.default.string().default("服务器"),
  apiHost: import_schemastery.default.string().default("https://api.blackbe.work/"),
  clearCacheInterval: import_schemastery.default.number().default(36e5),
  registerBanCommand: import_schemastery.default.boolean().default(true),
  checkLocalListInterval: import_schemastery.default.number().default(5e3),
  processOnPreJoin: import_schemastery.default.boolean().default(true),
  onlyOpCanQuery: import_schemastery.default.boolean().default(false),
  pardonBlackBE: import_schemastery.default.array(import_schemastery.default.string()).default([])
});
function readConfig() {
  if (!file.exists(configPath)) {
    setTimeout(saveConfig, 0);
    return Config();
  }
  const content = file.readFrom(configPath);
  if (!content) throw new Error(`failed to read config`);
  const data2 = JSON.parse(content);
  return Config(data2);
}
__name(readConfig, "readConfig");
var config = readConfig();
function saveConfig() {
  file.writeTo(configPath, JSON.stringify(config, null, 2));
}
__name(saveConfig, "saveConfig");
function reloadConfig() {
  const newConfig = readConfig();
  Object.assign(config, newConfig);
}
__name(reloadConfig, "reloadConfig");

// src/db/base.ts
var _Query = class _Query {
  constructor(ss) {
    this.ss = ss;
  }
  bindStmt(sql, params) {
    logger.debug(`[SQL] ${sql} | ${JSON.stringify(params)}`);
    const stmt = this.ss.prepare(sql);
    if (params) stmt.bind(params);
    return stmt;
  }
  executeInStmt(sql, params) {
    this.bindStmt(sql, params).execute();
  }
  begin() {
    this.executeInStmt("BEGIN;");
  }
  commit() {
    this.executeInStmt("COMMIT;");
  }
  rollback() {
    this.executeInStmt("ROLLBACK;");
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
  executeParagraph(sql) {
    sql.split(";").forEach((s) => {
      if (s) this.executeInStmt(s.trim());
    });
  }
  select(columns, fromTable, where, params) {
    if (typeof columns === "string") columns = [columns];
    const sql = `SELECT ${columns.join(", ")} FROM ${fromTable}${where ? ` WHERE ${where}` : ""};`;
    return this.bindStmt(sql, params);
  }
  delete(fromTable, where, params) {
    const sql = `DELETE FROM ${fromTable}${where ? ` WHERE ${where}` : ""};`;
    const stmt = this.bindStmt(sql, params);
    stmt.fetch();
    return stmt;
  }
  fetchAll(stmt) {
    const data2 = stmt.fetchAll();
    if (!data2) return [];
    const [keys, ...rows] = data2;
    return rows.map(
      (row) => Object.assign({}, ...keys.map((k, i) => ({ [k]: row[i] })))
    );
  }
  fetchAllToList(stmt) {
    const data2 = stmt.fetchAll();
    if (!data2) return void 0;
    const [keys, ...rows] = data2;
    const result = {};
    for (const key of keys) result[key] = [];
    for (const row of rows) {
      for (let i = 0; i < keys.length; i++) {
        result[keys[i]].push(row);
      }
    }
    return result;
  }
  insertOrReplace(data2, tableName, columns) {
    const names = columns.filter((v) => data2[v] !== void 0);
    if (!names.length) {
      throw new Error("No data to insert");
    }
    const values = names.map((v) => data2[v]);
    const colNamesStr = names.join(", ");
    const argsStr = names.map(() => "?").join(", ");
    return this.bindStmt(
      `INSERT OR REPLACE INTO ${tableName} (${colNamesStr}) VALUES (${argsStr});`,
      values
    ).execute().insertId;
  }
};
__name(_Query, "Query");
var Query = _Query;
((Query2) => {
  let BanType;
  ((BanType2) => {
    BanType2["XUID"] = "xuid";
    BanType2["NAME"] = "name";
    BanType2["IP"] = "ip";
    BanType2["CLIENT_ID"] = "clientId";
  })(BanType = Query2.BanType || (Query2.BanType = {}));
  Query2.banTypeStrMap = {
    ["xuid" /* XUID */]: "XUID",
    ["name" /* NAME */]: "玩家名",
    ["ip" /* IP */]: "IP",
    ["clientId" /* CLIENT_ID */]: "客户端 ID"
  };
  Query2.banTypeStrMapReverse = (() => {
    const ent = Object.entries(Query2.banTypeStrMap);
    return Object.fromEntries(ent.map(([k, v]) => [v, k]));
  })();
})(Query || (Query = {}));

// src/db/methods.ts
Query.prototype.getXuidFromInfoId = function(id) {
  return this.fetchAllToList(
    this.select("xuid", "xuid", "banInfoId = ?", [id])
  )?.xuid ?? [];
};
Query.prototype.getNameFromInfoId = function(id) {
  return this.fetchAllToList(
    this.select("name", "name", "banInfoId = ?", [id])
  )?.name ?? [];
};
Query.prototype.getIpFromInfoId = function(id) {
  return this.fetchAllToList(
    this.select("ip", "ip", "banInfoId = ?", [id])
  )?.ip ?? [];
};
Query.prototype.getClientIdFromInfoId = function(id) {
  return this.fetchAllToList(
    this.select(
      "clientId",
      "clientId",
      "banInfoId = ?",
      [id]
    )
  )?.clientId ?? [];
};
Query.prototype.getNameInfo = function(name) {
  const r = this.select("*", "name", "name = ?", [name]).fetch();
  if (!("name" in r)) return void 0;
  return r;
};
Query.prototype.getNamesFromXuid = function(xuid) {
  return this.fetchAllToList(
    this.select("name", "name", "xuid = ?", [xuid])
  )?.name ?? [];
};
Query.prototype.getInfoIdFromXuid = function(xuid) {
  return this.select("banInfoId", "xuid", "xuid = ?", [xuid]).fetch().banInfoId;
};
Query.prototype.getInfoIdFromName = function(name) {
  return this.select("banInfoId", "name", "name = ?", [name]).fetch().banInfoId;
};
Query.prototype.getInfoIdFromIp = function(ip) {
  return this.select("banInfoId", "ip", "ip = ?", [ip]).fetch().banInfoId;
};
Query.prototype.getInfoIdFromClientId = function(clientId) {
  return this.select("banInfoId", "clientId", "clientId = ?", [clientId]).fetch().banInfoId;
};
Query.prototype.getInfo = function(id) {
  const it = this.select("*", "banInfo", "id = ?", [id]).fetch();
  if (!("id" in it)) return void 0;
  return it;
};
Query.prototype.getFullInfo = function(id) {
  const it = this.getInfo(id);
  if (!it) return void 0;
  const { reason, endTime } = it;
  const xuid = this.fetchAllToList(
    this.select("xuid", "xuid", "banInfoId = ?", [id])
  )?.xuid ?? [];
  const name = this.fetchAllToList(
    this.select("name", "name", "banInfoId = ?", [id])
  )?.name ?? [];
  const ip = this.fetchAllToList(
    this.select("ip", "ip", "banInfoId = ?", [id])
  )?.ip ?? [];
  const clientId = this.fetchAllToList(
    this.select(
      "clientId",
      "clientId",
      "banInfoId = ?",
      [id]
    )
  )?.clientId ?? [];
  return { id, reason, endTime, name, xuid, ip, clientId };
};
Query.prototype.iterAllInfos = function* () {
  const stmt = this.select("*", "banInfo");
  do {
    const it = stmt.fetch();
    if (!("id" in it)) break;
    yield it;
  } while (stmt.step());
};
Query.prototype.updateXuidInfo = function(data2) {
  return this.withBegin(() => this.insertOrReplace(data2, "xuid", ["xuid", "banInfoId"]));
};
Query.prototype.updateNameInfo = function(data2) {
  return this.withBegin(
    () => this.insertOrReplace(data2, "name", ["name", "xuid", "banInfoId"])
  );
};
Query.prototype.updateIpInfo = function(data2) {
  return this.withBegin(() => this.insertOrReplace(data2, "ip", ["ip", "banInfoId"]));
};
Query.prototype.updateClientIdInfo = function(data2) {
  return this.withBegin(
    () => this.insertOrReplace(data2, "clientId", ["clientId", "banInfoId"])
  );
};
Query.prototype.updateInfo = function(data2) {
  return this.withBegin(
    () => this.insertOrReplace(data2, "banInfo", ["id", "reason", "endTime"])
  );
};
Query.prototype.searchNameInfo = function(query) {
  return this.fetchAll(
    this.select("*", "name", "name LIKE ?", [
      `%${Query.escape(query, ["%", "_"])}%`
    ])
  );
};
Query.prototype.searchXuidInfo = function(query) {
  return this.fetchAll(
    this.select("*", "xuid", "xuid LIKE ?", [
      `%${Query.escape(query, ["%", "_"])}%`
    ])
  );
};
Query.prototype.searchIpInfo = function(query) {
  return this.fetchAll(
    this.select("*", "ip", "ip LIKE ?", [
      `%${Query.escape(query, ["%", "_"])}%`
    ])
  );
};
Query.prototype.searchClientIdInfo = function(query) {
  return this.fetchAll(
    this.select("*", "clientId", "clientId LIKE ?", [
      `%${Query.escape(query, ["%", "_"])}%`
    ])
  );
};
Query.prototype.searchBanInfo = function(query) {
  return this.fetchAll(
    this.select("*", "banInfo", "reason LIKE ?", [
      `%${Query.escape(query, ["%", "_"])}%`
    ])
  );
};
Query.prototype.deleteXuid = function(xuid) {
  return this.withBegin(() => !!this.delete("xuid", "xuid = ?", [xuid]).affectedRows);
};
Query.prototype.deleteName = function(name) {
  return this.withBegin(() => !!this.delete("name", "name = ?", [name]).affectedRows);
};
Query.prototype.deleteIp = function(ip) {
  return this.withBegin(() => !!this.delete("ip", "ip = ?", [ip]).affectedRows);
};
Query.prototype.deleteClientId = function(clientId) {
  return this.withBegin(
    () => !!this.delete("clientId", "clientId = ?", [clientId]).affectedRows
  );
};
Query.prototype.deleteInfo = function(id) {
  return this.withBegin(() => !!this.delete("banInfo", "id = ?", [id]).affectedRows);
};
Query.prototype.getInfoIdUniversal = function(kw) {
  let infoId;
  if (infoId = this.getInfoIdFromXuid(kw)) {
    return [Query.BanType.XUID, infoId];
  }
  if (infoId = this.getInfoIdFromName(kw)) {
    return [Query.BanType.NAME, infoId];
  }
  if (infoId = this.getInfoIdFromIp(kw)) {
    return [Query.BanType.IP, infoId];
  }
  if (infoId = this.getInfoIdFromClientId(kw)) {
    return [Query.BanType.CLIENT_ID, infoId];
  }
  return void 0;
};
Query.prototype.delBanUniversal = function(banType, kw) {
  switch (banType) {
    case Query.BanType.XUID:
      return this.deleteXuid(kw);
    case Query.BanType.NAME:
      return this.deleteName(kw);
    case Query.BanType.IP:
      return this.deleteIp(kw);
    case Query.BanType.CLIENT_ID:
      return this.deleteClientId(kw);
    default:
      return false;
  }
};
Query.prototype.isInfoAlone = function(info) {
  if (typeof info === "number") {
    const queried = this.getFullInfo(info);
    if (!queried) return false;
    info = queried;
  }
  return !info.xuid.length && !info.name.length && !info.ip.length && !info.clientId.length;
};

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
  reason TEXT,
  endTime TEXT
);

CREATE TABLE IF NOT EXISTS xuid (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  xuid TEXT UNIQUE NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS name (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  xuid TEXT,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (xuid) REFERENCES xuid(xuid) ON DELETE CASCADE,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ip (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT UNIQUE NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientId (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clientId TEXT UNIQUE NOT NULL,
  banInfoId INTEGER NOT NULL,
  FOREIGN KEY (banInfoId) REFERENCES banInfo(id) ON DELETE CASCADE
);
`.trim();
var insertBanInfoSql = `
INSERT INTO banInfo (reason, endTime) VALUES (?, ?)
`.trim();
var insertXuidSql = `
INSERT INTO xuid (xuid, banInfo) VALUES (?, ?)
`.trim();
var insertNameSql = `
INSERT INTO name (name, xuid, banInfoId) VALUES (?, ?, ?)
`.trim();
var insertIpSql = `
INSERT OR IGNORE INTO ip (ip, banInfoId) VALUES (?, ?)
`.trim();
var insertClientIdSql = `
INSERT OR IGNORE INTO clientId (clientId, banInfoId) VALUES (?, ?)
`.trim();
var oldLocalListPath = `${DATA_PATH}/localList.json`;
function migrateLocalList(q) {
  if (!file.exists(oldLocalListPath)) {
    return;
  }
  ;
  (() => {
    const content = file.readFrom(oldLocalListPath);
    if (!content) {
      logger.warn("Cannot read old local list data, skip migrate");
      return;
    }
    let oldLocalList;
    try {
      oldLocalList = JSON.parse(content);
    } catch (e) {
      logger.warn("Cannot parse old local list data, skip migrate");
      return;
    }
    let banInfoCount = 0;
    let extraRowCount = 0;
    q.withBegin(() => {
      oldLocalList.list.forEach((item) => {
        const { name, xuid, ips, clientIds, reason, endTime, ip } = item;
        const banInfoStmt = q.bindStmt(insertBanInfoSql, [reason, endTime]).execute();
        const banInfoId = banInfoStmt.insertId;
        banInfoCount += 1;
        const stmts = [];
        if (xuid) stmts.push(q.bindStmt(insertXuidSql, [xuid, banInfoId]));
        if (name) stmts.push(q.bindStmt(insertNameSql, [name, xuid ?? null, banInfoId]));
        if (ip) stmts.push(q.bindStmt(insertIpSql, [ip, banInfoId]));
        if (ips) {
          ips.forEach((ip2) => {
            stmts.push(q.bindStmt(insertIpSql, [ip2, banInfoId]));
          });
        }
        if (clientIds) {
          clientIds.forEach((clientId) => {
            stmts.push(q.bindStmt(insertClientIdSql, [clientId, banInfoId]));
          });
        }
        stmts.forEach((stmt) => {
          extraRowCount += stmt.execute().affectedRows;
        });
      });
    });
    logger.info(
      `Migrated ${banInfoCount} infos and ${extraRowCount} related data from old local list`
    );
  })();
  file.delete(oldLocalListPath);
}
__name(migrateLocalList, "migrateLocalList");
var migrate = /* @__PURE__ */ __name((q) => {
  q.withBegin(() => {
    q.executeParagraph(tableCreateSqlPara);
  });
  migrateLocalList(q);
}, "migrate");
var v1_default = migrate;

// src/db/migrations/index.ts
var migrateFuncs = [v1_default];
function migrate2(q) {
  const version2 = q.getVersion();
  const currentVersion = migrateFuncs.length;
  const migrateCount = currentVersion - version2;
  if (migrateCount > 0) {
    logger.info(
      `Database is now at version ${currentVersion}. Will be migrated to version ${currentVersion}.`
    );
    for (let i = 0; i < migrateCount; i++) {
      logger.info(`Migrating to version ${version2 + i + 1}...`);
      migrateFuncs[i + version2](q);
    }
    q.updateVersion(currentVersion);
    logger.info(`Successfully migrated database.`);
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
function stripIp(ip) {
  return ip.split(":")[0];
}
__name(stripIp, "stripIp");
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
function tell(msg, player) {
  if (player) player.tell(msg);
  else if (msg.startsWith("§c")) logger.error(delFormatCode(msg.replace("§c", "")));
  else logger.info(delFormatCode(msg));
}
__name(tell, "tell");

// src/black-local.ts
function formatLocalKickMsg(player, data2) {
  const { reason, endTime } = data2;
  return formatVarString(config.kickByLocalMsg, {
    NAME: player.realName,
    XUID: player.xuid,
    REASON: reason ?? "无",
    ENDTIME: endTime ? formatDate({ date: new Date(endTime) }) : "永久"
  });
}
__name(formatLocalKickMsg, "formatLocalKickMsg");
function banPlayer(banData, options = {}) {
  let xuid;
  let name;
  let ip;
  let clientId;
  if ("player" in banData) {
    const { player } = banData;
    ({ realName: name, xuid } = player);
    ({ ip, clientId } = player.getDevice());
  } else {
    ;
    ({ name, xuid, ip, clientId } = banData);
  }
  if (ip) ip = stripIp(ip);
  if (![xuid, name, ip, clientId].filter(Boolean).length) {
    throw TypeError("Empty arg");
  }
  const q = Query.get();
  const operationTips = [];
  const { time, reason, kickTip } = options;
  let infoId;
  if (xuid) {
    infoId = q.getInfoIdFromXuid(xuid);
  }
  if (!infoId && name) {
    const nameInfo = q.getNameInfo(name);
    if (nameInfo) {
      if (!xuid) xuid = nameInfo.xuid || void 0;
      infoId = nameInfo.banInfoId;
    }
    if (!xuid) {
      xuid = data.xuid2name(name) || void 0;
      if (xuid && !infoId) infoId = q.getInfoIdFromXuid(xuid);
    }
  }
  if (!infoId && clientId) {
    infoId = q.getInfoIdFromClientId(clientId);
  }
  if (!infoId && ip) {
    infoId = q.getInfoIdFromIp(ip);
  }
  const endTime = time ? new Date(Date.now() + time).toJSON() : void 0;
  const isInfoNew = !infoId;
  infoId = infoId ? reason !== void 0 || endTime !== void 0 ? q.updateInfo({ id: infoId, reason, endTime }) : infoId : q.updateInfo({ reason: reason ?? null, endTime: endTime ?? null });
  operationTips.push(
    `${isInfoNew ? "§a新增" : "§6更新"} §bID 为 §d${infoId} §b的违规记录`
  );
  if (xuid) {
    const oldInfoId = q.getInfoIdFromXuid(xuid);
    if (oldInfoId !== infoId) {
      q.updateXuidInfo({ xuid, banInfoId: infoId });
      operationTips.push(
        `${oldInfoId ? "§6更新" : "§a新增"} §bXUID 记录 §d${xuid} §b的 违规 ID 记录： ${oldInfoId ? `§1${oldInfoId} §r-> ` : ""}§d${infoId}`
      );
    }
  }
  if (name) {
    const oldNameInfo = q.getNameInfo(name);
    const data2 = { name };
    if (oldNameInfo) {
      const { xuid: oldNameXuid, banInfoId: oldInfoId } = oldNameInfo;
      if (oldNameXuid && oldNameXuid !== xuid) {
        data2.xuid = xuid;
        operationTips.push(
          `${oldNameXuid ? "§6更新" : "§a新增"} §b玩家名记录 §d${name} §b的 XUID 记录： ${oldNameXuid ? `§1${oldNameXuid} §r-> ` : ""}§d${xuid}`
        );
      }
      if (oldInfoId && oldInfoId !== infoId) {
        data2.banInfoId = infoId;
        operationTips.push(
          `${oldInfoId ? "§6更新" : "§a新增"} §b玩家名记录 §d${name} §b的 违规 ID 记录： ${oldInfoId ? `§1${oldInfoId} §r-> ` : ""}§d${infoId}`
        );
      }
    } else {
      if (xuid) data2.xuid = xuid;
      data2.banInfoId = infoId;
      operationTips.push(
        `§a新增 §b玩家名记录 §d${name}§b， 违规 ID： §g${infoId}${xuid ? `§b， §gXUID： ${xuid}` : ""}`
      );
    }
    if (Object.keys(data2).length > 1) q.updateNameInfo(data2);
  }
  if (clientId) {
    const oldInfoId = q.getInfoIdFromClientId(clientId);
    if (oldInfoId !== infoId) {
      q.updateClientIdInfo({ clientId, banInfoId: infoId });
      operationTips.push(
        `${oldInfoId ? "§6更新" : "§a新增"} §bClient ID 记录 §d${xuid} §b的 违规 ID 记录： ${oldInfoId ? `§1${oldInfoId} §r-> ` : ""}§d${infoId}`
      );
    }
  }
  if (ip) {
    const oldInfoId = q.getInfoIdFromIp(ip);
    if (oldInfoId !== infoId) {
      q.updateIpInfo({ ip, banInfoId: infoId });
      operationTips.push(
        `${oldInfoId ? "§6更新" : "§a新增"} §bIP 记录 §d${ip} §b的 违规 ID 记录： ${oldInfoId ? `§1${oldInfoId} §r-> ` : ""}§d${infoId}`
      );
    }
  }
  const result = q.getFullInfo(infoId);
  if (!result) throw new Error("Failed to get full info");
  if ("player" in banData) {
    banData.player.kick(
      kickTip || formatLocalKickMsg(banData.player, { reason, endTime })
    );
  }
  return { result, operationTips };
}
__name(banPlayer, "banPlayer");
function queryLocal(param, moreInfo = false, strict = false) {
  const q = Query.get();
  const ids = [];
  const pushIds = /* @__PURE__ */ __name((...newIds) => {
    newIds.forEach((id) => {
      if (typeof id === "number" && !ids.includes(id)) ids.push(id);
    });
  }, "pushIds");
  if (strict) {
    pushIds(q.getInfoIdFromXuid(param), q.getInfoIdFromName(param));
    if (moreInfo) {
      pushIds(q.getInfoIdFromClientId(param), q.getInfoIdFromIp(param));
    }
  } else {
    if (param.match(/^\d+$/)) {
      pushIds(q.getInfo(parseInt(param, 10))?.id);
    }
    const searchWords = param.split(/\s+/g);
    const banInfoCounts = /* @__PURE__ */ new Map();
    const countBanInfoId = /* @__PURE__ */ __name((banInfoId) => {
      banInfoCounts.set(banInfoId, (banInfoCounts.get(banInfoId) || 0) + 1);
    }, "countBanInfoId");
    searchWords.forEach((word) => {
      q.searchNameInfo(word).forEach((item) => countBanInfoId(item.banInfoId));
      q.searchXuidInfo(word).forEach((item) => countBanInfoId(item.banInfoId));
      q.searchIpInfo(word).forEach((item) => countBanInfoId(item.banInfoId));
      q.searchClientIdInfo(word).forEach((item) => countBanInfoId(item.banInfoId));
      q.searchBanInfo(word).forEach((item) => countBanInfoId(item.id));
    });
    const sortedBanInfoIds = [...banInfoCounts.keys()].sort(
      (a, b) => banInfoCounts.get(b) - banInfoCounts.get(a)
    );
    ids.push(...sortedBanInfoIds);
  }
  return ids.map((id) => q.getFullInfo(id)).filter((v) => !!v);
}
__name(queryLocal, "queryLocal");
function formatLocalInfo(obj, moreInfo = false) {
  const formatList = /* @__PURE__ */ __name((li, pfx = "§b") => li && li.length ? `
${li.map((v) => `  - ${pfx}${v}§r`).join("\n")}` : "§b无§r", "formatList");
  const { name, xuid, ip, endTime, clientId, reason } = obj;
  const lines = [];
  lines.push(`§2记录原因§r： §b${reason ?? "无"}`);
  if (moreInfo) {
    lines.push(
      `§2结束时间§r： §b${endTime ? formatDate({ date: new Date(endTime) }) : "永久"}`
    );
  }
  lines.push(`§2已记录玩家ID§r： ${formatList(name)}`);
  lines.push(`§2已记录XUID§r： ${formatList(xuid)}`);
  if (moreInfo) lines.push(`§2已记录IP§r： ${formatList(ip)}`);
  if (moreInfo) lines.push(`§2已记录设备ID§r： ${formatList(clientId)}`);
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
async function localItemForm(player, obj, moreInfo = false) {
  const delFullItem = /* @__PURE__ */ __name(async () => {
    if (await (0, import_form_api_ex2.sendModalFormAsync)(
      player,
      PLUGIN_NAME,
      "§6真的要删除这条黑名单项目吗？\n§c如果这么做，该项目下的所有已记录 XUID / 玩家名 / 客户端 ID / IP 都将会解封！删前请三思！！！"
    )) {
      player.tell(
        Query.get().deleteInfo(obj.id) ? "§a删除成功！" : "§c删除失败！未找到该黑名单项目"
      );
    } else {
      player.tell("§6删除操作已取消");
    }
  }, "delFullItem");
  const delRecordItem = /* @__PURE__ */ __name(async (tip) => {
    const { name, xuid, clientId, ip } = obj;
    const items = [
      ...name.map((x) => [Query.BanType.NAME, x]),
      ...xuid.map((x) => [Query.BanType.XUID, x]),
      ...clientId.map((x) => [Query.BanType.CLIENT_ID, x]),
      ...ip.map((x) => [Query.BanType.IP, x])
    ];
    const res = await new import_form_api_ex2.CustomFormEx(PLUGIN_NAME).addDropdown(
      "itIdx",
      `${tip}§r
请选择要删除的记录项`,
      items.map(([t, v]) => `${Query.banTypeStrMap[t]} | ${v}`)
    ).sendAsync(player);
    if (res === import_form_api_ex2.FormClose) return;
    const { itIdx } = res;
    const [type, value] = items[itIdx];
    const q = Query.get();
    q.delBanUniversal(type, value);
    obj = q.getFullInfo(obj.id);
    const nowTip = `§a已解封 ${Query.banTypeStrMap[type]} ${value}`;
    player.tell(nowTip);
    if (q.isInfoAlone(obj)) {
      player.tell("§6因该封禁记录已没有任何对应的玩家信息，已附带删除");
      return;
    }
    delRecordItem(nowTip);
  }, "delRecordItem");
  const editInfo = /* @__PURE__ */ __name(async () => {
    const res = await new import_form_api_ex2.CustomFormEx(PLUGIN_NAME).addSwitch("forever", "是否永久封禁", !obj.endTime).addInput("time", "如果不是永久封禁，请输入从现在开始要封禁的时间（单位分钟）").addInput("reason", "请输入想修改的封禁原因内容，如想要清空封禁原因请留空", {
      default: obj.reason ?? ""
    }).sendAsync(player);
    if (res === import_form_api_ex2.FormClose) {
      player.tell("§6修改操作已取消");
      return;
    }
    const { forever, time, reason } = res;
    const timeNum = Number(time);
    if ((!timeNum || timeNum <= 0) && !forever) {
      await (0, import_form_api_ex2.sendModalFormAsync)(
        player,
        PLUGIN_NAME,
        "§c请输入正确的封禁时间！",
        "§a知道了",
        "§a知道了"
      );
      editInfo();
      return;
    }
    const q = Query.get();
    q.updateInfo({
      id: obj.id,
      endTime: forever ? null : new Date(Date.now() + timeNum * 60 * 1e3).toJSON(),
      reason: reason.trim() || null
    });
    obj = q.getFullInfo(obj.id);
    player.tell("§a操作成功！");
  }, "editInfo");
  const form = setupFunctionalityForm([["返回", null]]);
  form.content = formatLocalInfo(obj, moreInfo);
  if (moreInfo) {
    form.buttons.unshift(
      ["删除整个条目", delFullItem],
      ["删除记录项", delRecordItem],
      ["修改封禁信息", editInfo]
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
  const q = Query.get();
  const localList = [...q.iterAllInfos()];
  if (!localList.length) {
    player.tell(`§6本地黑名单列表为空`);
    return;
  }
  const form = new import_form_api_ex2.SimpleFormEx(localList);
  form.title = PLUGIN_NAME;
  form.canTurnPage = true;
  form.canJumpPage = true;
  form.hasSearchButton = true;
  form.formatter = ({ id, endTime }) => {
    const q2 = Query.get();
    const endTimeStr = endTime ? formatDate({ date: new Date(endTime) }) : "永久封禁";
    const content = [
      q2.getNameFromInfoId(id),
      q2.getXuidFromInfoId(id),
      q2.getClientIdFromInfoId(id),
      q2.getIpFromInfoId(id)
    ].flat();
    const contentStr = content.join(", ");
    const contentStrCut = contentStr.length > 25 ? contentStr.slice(0, 25) + "..." : contentStr;
    return [`§bID： ${id} §7| §2${endTimeStr}
${contentStrCut}`];
  };
  form.searcher = (_, param) => queryLocal(param, true);
  const sendTask = /* @__PURE__ */ __name(async () => {
    const res = await form.sendAsync(player);
    if (res === import_form_api_ex2.FormClose) return;
    const info = Query.get().getFullInfo(res.id);
    if (!info) {
      (0, import_form_api_ex2.sendModalFormAsync)(
        player,
        PLUGIN_NAME,
        "§c未找到该黑名单项目！",
        "§a知道了",
        "§a知道了"
      );
      sendTask();
    } else {
      const infoRes = await localItemForm(player, info, true);
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
    config.apiToken ? checkPrivate({ name: param, qq: param, xuid: param }) : Promise.resolve(void 0)
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
  const { id, xuid, name, ip, clientId } = obj;
  const items = [xuid, name, ...ip, ...clientId].filter((v) => v);
  return `§6ID ${id}： §7${items.join(", ")}`;
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
  const { operationTips } = res;
  for (const tip of operationTips) tell(tip, player);
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
function unBanCommand(willUnBan, player, unBanEntirely) {
  if (unBanEntirely) {
    const queried = queryLocal(willUnBan, true, true);
    if (!queried.length) {
      tell("§a执行完毕，没有项目变动", player);
      return;
    }
    const q = Query.get();
    const suc = [];
    for (const obj of queried) {
      if (q.deleteInfo(obj.id)) suc.push(obj);
    }
    tell(
      `§a已成功删除 §6${suc.length} §a条记录§r
${suc.map((v) => `- ${formatLocalItemShort(v)}§r`).join("\n")}`,
      player
    );
  } else {
    const q = Query.get();
    const res = q.getInfoIdUniversal(willUnBan);
    if (!res) {
      tell("§a执行完毕，没有项目变动", player);
      return;
    }
    const [type, infoId] = res;
    const delOk = q.delBanUniversal(type, willUnBan);
    if (!infoId || !delOk) {
      tell("§c删除失败", player);
      return;
    }
    tell(`§a已成功解封 ${Query.banTypeStrMap[type]} ${willUnBan}`, player);
    if (q.isInfoAlone(infoId)) {
      q.deleteInfo(infoId);
      tell(
        `§6因对应封禁记录 （ID： ${infoId}） 没有任何对应的玩家信息，已附带删除`,
        player
      );
    }
  }
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
      (_cmd, { player }, _out, { player: stringSelector, reason, duration }) => {
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
    cmdUnBan.optional("unBanEntirely", ParamType.Bool);
    cmdUnBan.overload(["player"]);
    cmdUnBan.overload(["player", "unBanEntirely"]);
    cmdUnBan.setCallback(
      (_cmd, { player }, _out, { player: stringSelector, unBanEntirely }) => {
        unBanCommand(stringSelector, player, unBanEntirely ?? false);
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
    let localId;
    try {
      const q = Query.get();
      do {
        if (localId = q.getInfoIdFromXuid(xuid)) break;
        if (localId = q.getInfoIdFromName(realName)) break;
        if (banIp ? false : localId = q.getInfoIdFromClientId(clientId)) break;
        if (banDevice ? false : localId = q.getInfoIdFromIp(stripedIp)) break;
      } while (false);
    } catch (e) {
      logger.error(`查询玩家 ${realName} 的本地黑名单记录出错！
${(0, import_form_api_ex5.formatError)(e)}`);
      return;
    }
    if (localId) {
      try {
        const { result, operationTips } = banPlayer({ player });
        tell(formatLocalInfo(result, true));
        for (const tip of operationTips) tell(tip, player);
      } catch (e) {
        logger.error(`更新玩家 ${realName} 的本地黑名单记录出错！
${(0, import_form_api_ex5.formatError)(e)}`);
        player.kick();
      }
      logger.warn(`查询到玩家 ${realName} 存在本地封禁记录，已将其踢出`);
      return;
    }
    if (!hidePassMessage) {
      logger.info(`没有查询到玩家 ${realName} 的本地黑名单记录`);
    }
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
  const q = Query.get();
  const expiredInfoIds = [];
  for (const it of q.iterAllInfos()) {
    const { id, endTime } = it;
    const nowTime = Date.now();
    if (endTime && nowTime >= new Date(endTime).getTime()) {
      expiredInfoIds.push(id);
    }
  }
  if (!expiredInfoIds.length) return;
  const expiredFullInfos = expiredInfoIds.map((id) => q.getFullInfo(id)).filter((v) => !!v);
  for (const id of expiredInfoIds) q.deleteInfo(id);
  logger.warn(`本地黑名单中有 ${expiredInfoIds.length} 条记录到期，已自动删除`);
  for (const info of expiredFullInfos) {
    logger.warn(`- ${delFormatCode(formatLocalItemShort(info))}`);
  }
}, config.checkLocalListInterval);

// src/index.ts
ll.registerPlugin(PLUGIN_NAME, PLUGIN_DESCRIPTION, PLUGIN_VERSION, PLUGIN_EXTRA);
{
  if (config.debug) logger.setConsole(true, 5);
  const [old, now] = migrate2(Query.get());
  if (old !== now) logger.info(`DB migrated from version ${old} to ${now}`);
}
