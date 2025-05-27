import { beforeEach,describe, expect, test } from "vitest";

import { clearCookie,getCacheLoca, getCookie, setCacheLoca, setCookie } from "./browserStore";

describe("browserStore tests", () => {
  beforeEach(() => {
    // 清理 localStorage 和 cookie，保证每个用例独立
    localStorage.clear();
    // 清理所有 cookie
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
  });

  test("setCacheLoca and getCacheLoca", () => {
    setCacheLoca("foo", { a: 1 });
    expect(getCacheLoca("foo")).toEqual({ a: 1 });
    expect(getCacheLoca("bar")).toBe("该内容不存在");
  });

  test("setCookie and getCookie", () => {
    setCookie("testKey", "testValue", 1);
    // getCookie 返回的是 "testKey=testValue"，包含键和值
    expect(getCookie("testKey")).toContain("testKey=testValue");
    expect(getCookie("notExist")).toBe("该内容不存在");
  });

  test("clearCookie", () => {
    setCookie("clearMe", "toBeCleared", 1);
    expect(getCookie("clearMe")).toContain("clearMe=toBeCleared");
    clearCookie("clearMe");
    // 被清除后，getCookie 应返回“该内容不存在”
    expect(getCookie("clearMe")).toBe("该内容不存在");
  });
});