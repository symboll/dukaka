import { _dateFormat } from '../../utils/utils'
 
let movableAreaWidth = 0
let movableViewWidth = 0
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
    progress: 10
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
    _getMovableDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec(rect => {
        console.log('rect', rect)
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
        console.log(backgroundAudioManager.duration)
        // if(typeof backgroundAudioManager.duration !== 'undefined') {
        //   this._setTime()
        // }else {
        //   setTimeout(() => {
        //     this._setTime()
        //   }, 1000);
        // }
        this._setTime()
      }) 
      backgroundAudioManager.onTimeUpdate(()=> {
        console.log('onTimeUpdate')
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
          console.log('setTimeout')
          this._setTime()
        }, 100)
      } else {
        console.log('===>')
        const formatDuration = _dateFormat(duration)
        this.setData({
          ['showTime.totalTime']: `${formatDuration.minute}:${formatDuration.second}`
        })
      }
    }
  }
})
