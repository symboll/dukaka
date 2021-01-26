// components/music-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: {
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    musicid: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSelected(e) {
      const musicid = e.currentTarget.dataset.musicid
      const index = e.currentTarget.dataset.index
      this.setData({
        musicid
      })
      wx.navigateTo({
        url: `/pages/player/player?musicId=${musicid}&index=${index}`,
      })
    }
  }
})
