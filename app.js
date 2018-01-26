// //app.js
var token = "";
var myself=this;
App({
 data:{
   id_token: '',//方便存在本地的locakStorage  
 },
  onLaunch: function (options) {
    // wx.navigateTo({
    //   url: 'pages/login/login',
    // })
  },
  onShow: function (options) {
    //Do something when show.
    // wx.navigateTo({
    //   url: 'pages/login/login',
    // })
    
  },
  onHide: function () {
    // Do something when hide.
    wx.clearStorage()
  },
  onError: function (msg) {
    console.log(msg)
  }
  
})