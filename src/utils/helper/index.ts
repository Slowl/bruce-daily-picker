
export const generateId = (index: number) => `${Math.random().toString(36).slice(2, 6)}_${(Date.now() + ((index + 1) * (Math.round(Math.random() * 1000)))).toString(36).slice(4, 10)}`
