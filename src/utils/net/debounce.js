
export function debounce (timer,fun,searchValue) {
  if(timer) clearTimeout(timer)
  timer = setTimeout(() => {
    fun(searchValue)
  },500)   
}
