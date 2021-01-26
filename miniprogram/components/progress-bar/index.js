import { _dateFormat } from '../../utils/utils'
 
let movableAreaWidth = 0
let movableViewWidth = 0
let currentSecond = 0
const backgroundAudioManager = wx.getBackgroundAudioManager()

// components/progress-bar/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

    showTime: {
      currentTime: '00:00',
      totalTime: '00:00'
    },
    movableDis: 0,
    progress: 0
  },

  lifetimes: {
    ready() {
      this._getMovableDis()
      this._bindBGMEvent()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange (event) {
      if(event.detail.source === 'touch'){
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.movableDis = event.detail.x
      }
    },
    onTouchEnd () {
      const current = backgroundAudioManager.currentTime
      const duration = backgroundAudioManager.duration
      const currentFormat = _dateFormat(current)
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        ['showTime.currentTime']: `${currentFormat.minute}:${currentFormat.second}`
      })

      backgroundAudioManager.seek(duration * this.data.progress / 100)
    },
    _getMovableDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec(rect => {
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },

    _bindBGMEvent () {
      backgroundAudioManager.onPlay(()=> {
        console.log('onPlay')
      }) 

      backgroundAudioManager.onStop(()=> {
        console.log('onStop')
      }) 
      backgroundAudioManager.onPause(()=> {
        console.log('onPause')
      }) 
      backgroundAudioManager.onWaiting(()=> {
        console.log('onWaiting')
      }) 

      backgroundAudioManager.onCanplay(()=> {
        console.log('onCanplay')
        this._setTime()
      }) 
      backgroundAudioManager.onTimeUpdate(()=> {
        console.log('onTimeUpdate')
        const currentTime = backgroundAudioManager.currentTime
        const duration = backgroundAudioManager.duration
        const formatCurrentTime =_dateFormat(currentTime)
        let second = currentTime.toString().split('.')[0]
        if(second !== currentSecond) {
          this.setData({
            ['showTime.currentTime']: `${formatCurrentTime.minute}:${formatCurrentTime.second}`,
            movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
            progress:  currentTime / duration * 100
          })
          currentSecond = second
        }
        
      }) 

      backgroundAudioManager.onEnded(()=> {
        console.log('onEnded')
      }) 
      backgroundAudioManager.onError((err)=> {
        console.log(res.errMsg)
        console.log(res.errCode)
        wx.showToast({
          title: '错误' + rea.errCode,
        })
      }) 

    },

    _setTime () {
      let duration = backgroundAudioManager.duration
      if(typeof backgroundAudioManager.duration === 'undefined') {
        setTimeout(()=> {
          this._setTime()
        }, 100)
      } else {
        const formatDuration = _dateFormat(duration)
        this.setData({
          ['showTime.totalTime']: `${formatDuration.minute}:${formatDuration.second}`
        })
      }
    }
  }
})
