import { beforeEach,describe, expect, it } from 'vitest';

import { CacheSDK } from './nodeStore';

let cache: CacheSDK;

describe('CacheSDK', () => {
  beforeEach(() => {
    cache = new CacheSDK(1); // 设置1秒过期，方便测试
  });

  it('setCache 和 getCache', () => {
    expect(cache.setCache('a', 123)).toBe(true);
    expect(cache.getCache('a')).toBe(123);
  });

  it('getCache 不存在', () => {
    expect(cache.getCache('not-exist')).toBe('该内容不存在');
  });

  it('delCache', () => {
    cache.setCache('b', 'test');
    expect(cache.delCache('b')).toBe('成功删除');
    expect(cache.delCache('b')).toBe('该内容不存在');
  });

  it('clearCache', () => {
    cache.setCache('c', 1);
    cache.setCache('d', 2);
    expect(cache.clearCache()).toBe(2);
    expect(cache.getCache('c')).toBe('该内容不存在');
  });

  it('comCache 永不过期', () => {
    cache.setCache('e', 1, 0);
    expect(cache.comCache('e')).toBe(0);
  });

  it('comCache 已过期', async () => {
    cache.setCache('f', 1, 1, 'ss');
    await new Promise(r => setTimeout(r, 1100));
    expect(cache.comCache('f')).toBe(-1);
  });
});