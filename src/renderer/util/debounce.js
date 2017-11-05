module.exports = function debounce (fn, time) {
  let timer = null

  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(null, ...args), time)
  }
}
