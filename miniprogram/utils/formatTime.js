function _formatTime (date) {
  if(Object.prototype.toString.call(date).slice(8, -1) !== 'Date'){
    return ''
  }
  const fmt = {
    year: date.getFullYear(),
    mounth: add(date.getMonth() +1),
    day: add(date.getDate()),
    hours: add(date.getHours()),
    minutes: add(date.getMinutes()),
    second: add(date.getSeconds())
  }
  function add (num) {
    return String(num).length === 1 ? '0'+num : num
  }
  return `${fmt.year}-${fmt.mounth}-${fmt.day} ${fmt.hours}:${fmt.minutes}:${fmt.second}`
}

export default _formatTime