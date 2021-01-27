
function _dateFormat (second) {
  // 分钟
  const minute = Math.floor(second/ 60)
  second = Math.floor(second % 60)

  return {
    minute: _supplement(minute),
    second: _supplement(second)
  }
}

function _supplement(second) {
  return second < 10 ? '0'+ second : second
}

function _timeToSecond (time='') {
  const arr = time.split(':')
  const second = Number(arr[0]) * 60 + Number(arr[1])
  return second
}

export {
  _dateFormat,
  _timeToSecond
}