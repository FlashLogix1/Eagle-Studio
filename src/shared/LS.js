

export const writeLS = (key, value) => localStorage.setItem(key, value)
export const readLS = key => localStorage.getItem(key)
export const removeLS = key => localStorage.removeItem(key)
export const clearLS = () => localStorage.clear()