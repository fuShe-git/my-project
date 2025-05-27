/**
 * 向localStorage存储数据
 * @param key 存储的键
 * @param val 存储的值
 * @returns 
 */
export const setCacheLoca = (key: string, val: unknown): boolean => {
    localStorage.setItem(key, JSON.stringify(val));
    return true
}

/**
 * 获取localStorage存储的数据
 * @param key 存储的键
 * @returns 
 */
export const getCacheLoca = (key: string): unknown => {
    const data = localStorage.getItem(key)
    if(!data)return '该内容不存在'
    return JSON.parse(data)
}

/**
 * 向cookie中存储数据
 * @param cname 存储的键
 * @param cvalue cookie的值
 * @param exdays 过期时间，单位：天
 * @returns 
 */
export const setCookie = (cname: string, cvalue: string, exdays: number): boolean => {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    if (exdays === 0) {
        document.cookie = `${cname}=${cvalue};path=/`;
    } else {
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }
    return true
}

/**
 * 获取cookie中的值
 * @param cname cookie的键
 * @returns 
 */
export const getCookie = (cname: string): string => {
    const str = document.cookie
    const arr = str.split(';')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes(cname)) {
            return arr[i]
        }
    }
    return '该内容不存在'
}

/**
 * 删除指定key的cookie
 * @param name cookie的键
 * @returns 
 */
export const clearCookie = (name: string): boolean => {
    return setCookie(name, '', -1)
}