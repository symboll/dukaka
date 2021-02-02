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

  },

  observers: {
    ['blog.createTime'] (value) {
      if(value){
        _formatTime(new Date(value))
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

  }
})
