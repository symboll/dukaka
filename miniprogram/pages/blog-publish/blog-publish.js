const MAX_WORDS_NUM = 140
const MAX_IMAGE_NUM = 9

const db = wx.cloud.database()

let context = ''
let userInfo = {}
// pages/blog-publish/blog-publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum:0,
    footerBottom: 0,
    images: [],
    isShowAddPhotoBtn: true
  },
  onInput (event) {
    let wordsNum = event.detail.value.length
    if(wordsNum >= MAX_WORDS_NUM) {
      wordsNum =  `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    context = event.detail.value
  },
  onFocus (event) {
    this.setData({
      footerBottom: event.detail.height + 40
    })
  },
  onBlur (event) {
    this.setData({
      footerBottom: 0
    })
  },
  onChooseImage () {
    let count = MAX_IMAGE_NUM - this.data.images.length
    wx.chooseImage({
      count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        let surplus = MAX_IMAGE_NUM === this.data.images.length
        if(surplus) {
          this.setData({ 
            isShowAddPhotoBtn: false
           })
        }
      }
    })
  },
  onDelete (event) {
    
    let images = this.data.images
    images.splice(event.target.dataset.index, 1)
    this.setData({
      images
    })
    if(this.data.images.length < MAX_IMAGE_NUM){
      this.setData({
        isShowAddPhotoBtn: true
      })
    }
  },
  onPreviewImage (event) {
    wx.previewImage({
      urls: this.data.images,
      current: event.target.dataset.imageSrc
    })
  },
  send () {
    if(context.trim().length === 0) {
      wx.showModal({
        title: '请输入内容',
        content: ''
      })
      return 
    }
    wx.showLoading({
      title: '发布中...',
    })
    let images = this.data.images
    let arr = []
    for(let i = 0; i < images.length; i++) {
      let p = new Promise((resolve, reject)=> {
        let item =images[i]
        let suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: `blog/${Date.now()}-${Math.random() * 1000000}${suffix}`,
          filePath: item,
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          }
        })        
      })
      arr.push(p)
    }
    Promise.all(arr).then(res => {
      let fileIds = res.map(item => item.fileID)
      db.collection('blog').add({
        data: {
          ...userInfo,
          context,
          img: fileIds,
          createTime: db.serverDate()
        }
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        wx.navigateBack()
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: `发布失败${err}`,
        })
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: `发布失败${err}`,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo = options
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