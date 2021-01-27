
// 获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp()
let playingIndex = -1
let musicList = []

// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: "",
    isPlaying: false,
    togglePlayDiscOrLyric: false,
    lyric: '',
    isSame: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    musicList = wx.getStorageSync('musiclist')
    playingIndex = options.index

    const musicInfo = musicList.find(item => item.id == options.musicId)
    this._loadMusciDetail(musicInfo)
  },

  _loadMusciDetail (musicInfo) {

    if(musicInfo.id == app.getPlayMusicId()) {
      this.setData({
        isSame: true
      })
    }else {
      this.setData({
        isSame: false
      })
    }
    if(!this.data.isSame) {
      backgroundAudioManager.stop()
    }

    wx.setNavigationBarTitle({
      title: musicInfo.name,
    })
    this.setData({
      picUrl: musicInfo.al.picUrl,
      isPlaying: false
    })

    app.setPlayMusicId(musicInfo.id)

    wx.showLoading({
      title: '歌曲加载中...',
    })

    wx.cloud.callFunction({
      name: "music",
      data: {
        $url: 'musicUrl',
        musicId: musicInfo.id
      }
    }).then(res => {
      const data = res.result.data[0] || {}

      if(data.url == null || data.url == undefined){
        wx.showToast({
          title: '无权限播放...',
        })
        return 
      }
      if(!this.data.isSame){
        backgroundAudioManager.src = data.url || ''
        backgroundAudioManager.title = musicInfo?.name || ''
        backgroundAudioManager.coverImgUrl = musicInfo?.al?.picUrl || ''
        backgroundAudioManager.singer = musicInfo?.ar[0]?.name || ''
        backgroundAudioManager.epname = musicInfo?.al?.name || ''
      }

      this.setData({
        isPlaying: true
      })
      wx.hideLoading()

      wx.cloud.callFunction({
        name: 'music',
        data: {
          $url: 'musiclyric',
          musicId: musicInfo.id
        }
      }).then(res => {
        console.log('res--->', res)
        let lyric  = res.result?.lrc?.lyric || '暂无歌词'
        this.setData({ lyric })
      })
    })
  },
 
  togglePlaying () {
    if(this.data.isPlaying) {
      backgroundAudioManager.pause()
    }else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onNext() {
    playingIndex++
    if(playingIndex === musicList.length) {
      playingIndex = 0
    }
    this._loadMusciDetail(musicList[playingIndex])
  },
  onPre () {
    playingIndex --
    if(playingIndex < 0) {
      playingIndex = musicList.length - 1
    }
    this._loadMusciDetail(musicList[playingIndex])
  },
  onChange (event) {
    const type = event.currentTarget.dataset.type
    let toggle
    switch (type) {
      case 'lyric':
        toggle = true
        break;
      case 'playdisc':
        toggle = false
        break;
      default:
        break;
    }
    this.setData({
      togglePlayDiscOrLyric: toggle
    })
  },
  timeUpdate(event){
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },
  musicPlay() {
    this.setData({
      isPlaying: true
    })
  },
  musicPause() {
    this.setData({
      isPlaying: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})