// 设置播放模式
export const playMode = {
  // 顺序播放
  sequence: 0,
  // 循环播放
  loop: 1,
  // 随机播放
  random: 2
}
// 解析歌词
export const parseLyric = (lyric) => {
  // 用/n分割每一行歌词
  let lines = lyric.split('\n')
  // 删除最后一行空字符串
  lines.pop()
  // 匹配时间部分
  let reg = /\[\d{2}:\d{2}.\d{2,3}\]/g
  let results = []
  lines.forEach(function (item, index, arr) {
    // 将截取的时间部分转换为字符串并去除掉'[]'部分
    let time = String(item.match(reg)).slice(1, -1).split(':')
    // 获取文字部分将截取时间的正则替换成空字符
    let text = item.replace(reg, '')
    // 如果当前的字符为空，则不添加
    if (text !== '') {
      results.push({'time': parseInt(time[0]) * 60 + parseFloat(time[1]), 'txt': text})
    }
  })
  return results
}
