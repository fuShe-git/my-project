import NodeCache from 'node-cache';

/**
 * 在node.js中存储操作
 */
export class CacheSDK {
    private cache: NodeCache;
    /**
     * 构造器
     * @param stdTTL 每条数据的保存时间（秒），默认300，0为永久存储
     * @param checkperiod 缓存清理周期（秒），默认120
     */
    constructor(stdTTL: number = 300, checkperiod: number = 120) {
        this.cache = new NodeCache({ stdTTL, checkperiod });
    }

    /**
     * 存储数据
     * @param key 存储的键
     * @param val 存储的值
     * @param time 存储时间，优先级大于构造器设置，正整数，0表示永久存储，默认跟随系统设置
     * @param unit 存储时间单位（ss：秒，mm：分），默认为分
     * @returns true:存储成功，false:存储失败
     */
    public setCache(key: string, val: unknown, time?: number, unit?: string): boolean {
        if (key === 'e') console.log(key, val, time, unit, 'time')
        if (time && time < 0) return false
        //set方法，返回boolean，时间不传为永久存储
        if (time !== undefined) {
            if (unit === 'ss') {
                return this.cache.set(key, val, time);
            } else {
                return this.cache.set(key, val, time * 60);
            }
        } else {
            return this.cache.set(key, val);
        }
    }

    /**
     * 获取缓存
     * @param key 缓存键
     */
    public getCache(key: string): unknown {
        //get方法，存在返回相应内容，否则返回undefined
        const req = this.cache.get(key);
        return req ? req : '该内容不存在';
    }

    /**
     * 删除指定缓存
     * @param key 需要删除的键名
     * @returns
     */
    public delCache(key: string): string {
        //返回删除的数量，0表示没有删除
        return this.cache.del(key) === 0 ? '该内容不存在' : `成功删除`;
    }

    /**
     * 清空所有
     * @returns 被删除的键名数量
     */
    public clearCache(): number {
        //keys方法，获取所有的键名
        const arr = this.cache.keys();
        let ans = 0
        arr.forEach((item: string) => {
            ans += this.cache.del(item);
        })
        return ans
    }

    /**
     * 返回某个键的过期时间,0为永不过期，-1为已过期/不存在
     * @param key 查询的键名
     * @returns
     */
    public comCache(key: string): number {
        const req = this.cache.getTtl(key)
        if (req === undefined) return -1
        return req ? Math.floor((req - Date.now()) / 1000) : 0
    }
}