export const set = (key: string, item: any) => { 
  localStorage.setItem(key, JSON.stringify(item)) 
} 

export const get = <T>(key: string) => { 
  let data = localStorage.getItem(key)
  if (!data) return null
  let obj = JSON.parse(data) as T
  return obj 
}

export const remove = (key: string) => {
  localStorage.removeItem(key)
}
