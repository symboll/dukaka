// components/blog-share/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  externalClasses: [
    "iconfont", "icon-pinglun", "icon-fenxiang"
  ],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
      this.triggerEvent('commit')
    },
    onShare () {
      this.triggerEvent('share')
    }
  }
})
