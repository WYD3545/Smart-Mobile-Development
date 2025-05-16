Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[
      {
        role:"user",
        image:"/pages/res/Soyo.png",
        content:"你好"
      },
      {
        role:"assistant",
        image:"https://tse4-mm.cn.bing.net/th/id/OIP-C.gPmmDSJMbGZEXcbS9oP4egAAAA?rs=1&pid=ImgDetMain",
        content:"如果你有什么问题，请随时向我提问"
      },
      {
        role:"user",
        image:"/pages/res/Soyo.png",
        content:"我在天津，周末可以去哪里玩？"
      },
      {
        role:"assistant",
        image:"https://tse4-mm.cn.bing.net/th/id/OIP-C.gPmmDSJMbGZEXcbS9oP4egAAAA?rs=1&pid=ImgDetMain",
        content:"天津是一个充满文化底蕴的城市，有很多适合周末游玩的地方，以下是几个值得推荐的地方 天津市南开大学 南开大学是天津最好的大学，也是周总理的母校。"
      },
      {
        role:"user",
        image:"/pages/res/Soyo.png",
        content:"你真厉害啊"
      },
    ],
    content:"",
  },
  //获取用户输入内容
  getuserInput(e){
    let content=e.detail.value;
    this.setData({
      content
    })
  },
  //用户点击提交
  submit(){
    let content=this.data.content;
    let message=this.data.message;
    if(!content){
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
      return;
    }
    message.push({
      role:"user",
      image:"/pages/res/Soyo.png",
      content
    },)
    this.setData({
      message,
      content:""//发送之后清空输入框
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
    
  }
})