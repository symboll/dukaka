let keyword = ''
// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalVisible: false,
    blogList: [],
    state:'',
    commitVisible: false,
    commentContent:''
  },
  onPublish () {
    this.setData({
      state: 'publish'
    })
    this._setting()
  },
  onCommit () {
    this.setData({
      state: 'commit'
    })
    this._setting()
  },
  _setting () {
    wx.getSetting({
      success:(res) => {
        if(res.authSetting['scope.userInfo']){
          this._getUserInfo()
        } else {
          this.setData({
            modalVisible: true
          })
        }
      },
    })
  },
  onShare () {

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
    const state = this.data.state
    switch (state) {
      case 'publish':
        wx.navigateTo({
          url: `../blog-publish/blog-publish?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`,
        })
        break;
      case 'commit': 
        this.setData({
          commitVisible: true
        })
        break;
    }
    
  },
  onCommitClose () {
    this.setData({
      commitVisible: false
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
        this._loginsuccess(res.userInfo)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadBlogList()
  },
  _loadBlogList(start=0, count=10) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'list',
        start,
        count,
        keyword
      }
    }).then(res => {
      this.setData({
        blogList: this.data.blogList.concat(res.result.data)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }).catch(err => {
      wx.hideLoading()
    })
  },

  goComment (event) {
    const id = event.target.dataset.blog._id
    wx.navigateTo({
      url: `../blog-comment/blog-comment?blogId=${id}`,
    })
  },
  onSearch (event) {
    this.setData({
      blogList: []
    })
    keyword = event.detail.keyword
    this._loadBlogList()
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
    this.setData({
      blogList: []
    })
    this._loadBlogList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadBlogList(this.data.blogList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  
})