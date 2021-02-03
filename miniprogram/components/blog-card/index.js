import _formatTime from '../../utils/formatTime'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _createTime: ''
  },

  observers: {
    ['blog.createTime'] (value) {
      if(value){
        this.setData({
          _createTime: _formatTime(new Date(value))
        })
      }
    }
  },

  lifetimes: {
    // ready () {
    //   console.log(this.properties.blog)
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImage(event) {
      // console.log('event==>',event.target.dataset.index)
      wx.previewImage({
        urls: this.data.blog.img,
        current:event.target.dataset.index
      })
    }
  }
})
