import { customRef } from 'vue'

export function useDebouncedRef(value: string, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>
  return customRef((track, trigger) => {
    return {
      get() {
        console.log("track")
        track()
        return value
      },
      set(newValue: string) {
        console.log("trigger")
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}