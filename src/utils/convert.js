export function getDate(strDate) {
  const date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
    function(a) { return parseInt(a, 10) - 1 }).match(/\d+/g) + ')')
  return date
}
