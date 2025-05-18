Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],
    message2:[],
    content:"",
    status:0,//0表示用户可以发送 1表示用户不可以发送
    access_token:"",
    prompt:"每次回答不能超过100字"
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
    let message2=this.data.message2;
    let prompt=this.data.prompt;
    if(!content){
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
      return;
    }

    //将提示词和用户输入的内容拼接后发送给大模型
    message.push({
      role:"user",
      content:`${prompt}\n${content}`
    },)
    message2.push({
      role:"user",
      image:"./res/Soyo.png",
      content
    },)
    wx.setStorageSync('message', message)
    wx.setStorageSync('message2', message2)
    this.setData({
      message,
      message2,
      content:""//发送之后清空输入框
    })
    this.autoScroll()//每次发送时调用一次,自动滚动最下方
    
    this.sendRequest(message)
  },
  
  //发送网络请求，从AI获取内容
  //content为本次用户请求内容
  //message为历史对话
  sendRequest(message){
    let message2=this.data.message2
    let access_token=this.data.access_token
    wx.showLoading({
      title:''
    })
    this.setData({
      status:1
    })
    wx.request({
      url: `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-3.5-8k-0701?access_token=${access_token}`,
      method:"POST",
      header:{
        "Content-Type":"application/json"
      },
      data:JSON.stringify({
        messages: message // 确保 messages 是一个有效的 JSON 对象
      }),
      success:(res=>{
        if(res.data.error_code){
          wx.hideLoading()//结束加载框
          wx.showToast({
            title: '错误，请重试',
            icon:'error'
          })
        }
        console.log('res',res);
        wx.hideLoading()//结束加载框
      let content=res.data.result
      let index=0;
      message2.push({
        role:"assistant",
        image:"https://tse4-mm.cn.bing.net/th/id/OIP-C.gPmmDSJMbGZEXcbS9oP4egAAAA?rs=1&pid=ImgDetMain",
        content:""
      },)
      let time=setInterval(()=>{
        message2[message2.length-1].content=content.substring(0,++index);
          this.setData({
            message2,
            message
          })
          this.autoScroll()
        // console.log(content.substring(0,++index));
        if(index==content.length){

          wx.setStorageSync('message2', message2)
          message.push({
            role:"assistant",
            content:message2[message2.length-1].content
          },)
          wx.setStorageSync('message', message)

          clearInterval(time)
          this.setData({
            status:0
          })
        }
      },100);
      }),
      fail:(err=>{
        wx.hideLoading()//结束加载框
        wx.showToast({
          title: '错误，请重试',
          icon:'error'
        })
        console.log('err',err);
      })

    })
    return
      

    
  },

  //  复制对话
  copy(e){
    let content=e;
    console.log(content);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let message=wx.getStorageSync('message')//从缓存获取历史聊天记录
    let message2=wx.getStorageSync('message2')
    if(message){//存在缓存
      this.setData({
        message,
      })
    }
    if(message2){//存在缓存
      this.setData({
        message2,
      })
    }
    this.autoScroll()//每次进入时调用一次
    if(wx.getStorageSync('tokenData')){//如果有缓存，则不用getToken()
      let tokenData=wx.getStorageSync('tokenData')
      if(tokenData.expires_in<29.5*24*60*60){
        this.getToken()
      }else{
        this.setData({
          access_token:tokenData.access_token
        })
      }
    }
    else{
      this.getToken()
    }
    
  },
  getToken(){
    let grant_type="client_credentials"
    let client_id="0VstIqkuw0PkN1AGkoZQkteb"
    let client_secret="yAkeyvSmtJELmBG5QK6tbuHxkWGrb7Rh"
    wx.request({
      url:`https://aip.baidubce.com/oauth/2.0/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}`,
      method:"POST",
      header:{
        "Content-Type":"application/json"
      },
      success:(res=>{
        let tokenData={
          access_token:res.data.access_token,
          expires_in:res.data.expires_in//access_token和时间
        }
        this.setData({
          access_token:res.data.access_token
        })
        wx.setStorageSync('tokenData', tokenData)
      }),
      fail:(err=>{
        console.log('err');
      })
    })
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