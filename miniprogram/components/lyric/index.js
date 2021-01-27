import { _timeToSecond } from '../../utils/utils'

let lyricHeight = 0
// components/lyric/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lyric: {
      type: String
    }
  },

  observers: {
    lyric(lrc) {
      if(lrc === '暂无歌词') {
        this.setData({
          lrcList: [{
            time: 0,
            lyric:lrc
          }],
          lyricCurrentIndex: -1
        })
      }else {
        this._parseLyric(lrc)
      }
      
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    lyricCurrentIndex: -1,
    scrollTop: 0
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    ready() {
      wx.getSystemInfo({
        success: (result) => {
          lyricHeight = result.screenWidth/ 750 *64
        },
      })
    }
  },
  methods: {
    update(currentTime) {
      const lrcList = this.data.lrcList
      if(lrcList.length == 0) { return }
      if(currentTime > lrcList[lrcList.length -1].time){
        if(this.data.lyricCurrentIndex !== -1){
          this.setData({
            lyricCurrentIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }
      for(let i =0; i< lrcList.length; i++) {
        if(currentTime <= lrcList[i].time) {
          this.setData({
            lyricCurrentIndex: i -1,
            scrollTop: (i - 1) * lyricHeight
          })
          break;
        }
      }
    },
    _parseLyric(lrc) {
      const line = lrc.split('\n')
      let lrcList = []
      line.map(item => {
        let arr = item.split("]")
        lrcList.push({
          time: _timeToSecond(arr[0].slice(1)),
          lyric: arr[1]
        })
      })

      this.setData({
        lrcList
      })
    }
  }
})
