export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: () => {
        return 'hello'
      }
    }
  }
})