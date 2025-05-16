Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[
      {
        role:"user",
        image:"./res/Soyo.png",
        content:"你好"
      },
      {
        role:"assistant",
        image:"https://tse4-mm.cn.bing.net/th/id/OIP-C.gPmmDSJMbGZEXcbS9oP4egAAAA?rs=1&pid=ImgDetMain",
        content:"如果你有什么问题，请随时向我提问"
      },
      {
        role:"user",
        image:"./res/Soyo.png",
        content:"我在天津，周末可以去哪里玩？"
      },
      {
        role:"assistant",
        image:"https://tse4-mm.cn.bing.net/th/id/OIP-C.gPmmDSJMbGZEXcbS9oP4egAAAA?rs=1&pid=ImgDetMain",
        content:"天津是一个充满文化底蕴的城市，有很多适合周末游玩的地方，以下是几个值得推荐的地方 天津市南开大学 南开大学是天津最好的大学，也是周总理的母校。"
      },
      {
        role:"user",
        image:"./res/Soyo.png",
        content:"你真厉害啊"
      },
    ],
    content:"",
    status:0//0表示用户可以发送 1表示用户不可以发送
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
      image:"./res/Soyo.png",
      content
    },)
    wx.setStorageSync('message', message)
    this.setData({
      message,
      content:""//发送之后清空输入框
    })
    this.autoScroll()//每次发送时调用一次,自动滚动最下方

    this.sendRequest(message)
  },
  //发送网络请求，从AI获取内容
  //content为本次用户请求内容
  //message为历史对话
  sendRequest(message){
    this.setData({
      status:1
    })
      let content="天津是一个充满文化底蕴的城市，有很多适合周末游玩的地方，以下是几个值得推荐的地方 天津市南开大学 南开大学是天津最好的大学，也是周总理的母校。"
      let index=0;
      message.push({
        role:"assistant",
        image:"https://tse4-mm.cn.bing.net/th/id/OIP-C.gPmmDSJMbGZEXcbS9oP4egAAAA?rs=1&pid=ImgDetMain",
        content:""
      },)
      let time=setInterval(()=>{
        message[message.length-1].content=content.substring(0,++index);
          this.setData({
            message,
            
          })
          this.autoScroll()
        // console.log(content.substring(0,++index));
        if(index==content.length){
          wx.setStorageSync('message', message)
          clearInterval(time)
          this.setData({
            status:0
          })
        }
      },100);

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let content="天津是一个充满文化底蕴的城市，有很多适合周末游玩的地方，以下是几个值得推荐的地方 天津市南开大学 南开大学是天津最好的大学，也是周总理的母校。"
    // let index=0;
    // let time=setInterval(()=>{
    //   console.log(content,substring(0,++index));
    // },1000);
    let message=wx.getStorageSync('message')//从缓存获取历史聊天记录
    if(message){//存在缓存
      
      this.setData({
        message
      })
    }
    this.autoScroll()//每次进入时调用一次
  },
  //滚动到底部
  autoScroll(){
    let that=this;
    wx.createSelectorQuery().select('#communication').boundingClientRect(function(rect){
      wx.pageScrollTo({
        scrollTop:rect.height,
        duration:300//滑动速度
      })
      that.setData({
        scrollTop:rect.height-that.data.scrollTop
      });
    }).exec();
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