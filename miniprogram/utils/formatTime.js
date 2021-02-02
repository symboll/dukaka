function _formatTime (date) {
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  const o = {
    'M+': date.getMonth() +1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // if(/(y+)/.test(fmt)) {

  // }

  console.log('date->',date)
}

export default _formatTime