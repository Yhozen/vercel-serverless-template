export const fetcher = (key: string) => fetch(key).then(res => res.json())
