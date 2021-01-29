// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalVisible: false
  },
  onPublish () {
    wx.getSetting({
      // withSubscriptions: true,
      success:(res) => {
        if(res.authSetting['scope.userInfo']){
          this._getUserInfo()
        } else {
          this.setData({
            modalVisible: true
          })
        }
      },
      // fail (err) {
      //   console.log('err',err)
      // },
      // complete (finish) {
      //   console.log('finish', finish)
      // }
    })
  },
  onClose () {
    this.setData({
      modalVisible: false
    })
  },
  onLogin (event) {
    const userInfo = event.detail.detail.userInfo
    if(userInfo) {
      this.setData({
        modalVisible: false
      })
      this._loginsuccess(userInfo)
    }else {
      this._loginFail()
    }
  },
  _loginsuccess (userInfo) {
    wx.navigateTo({
      url: `../blog-publish/blog-publish?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`,
    })
  },
  _loginFail () {
    wx.showModal({
      cancelColor: '#d43c33',
      title: "只有授权用户才能发布发现"
    })
  },
  _getUserInfo () {
    wx.getUserInfo({
      success: (res)=> {
        // console.log('_getUserInfo', res.userInfo)
        this._loginsuccess(res.userInfo)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  
})