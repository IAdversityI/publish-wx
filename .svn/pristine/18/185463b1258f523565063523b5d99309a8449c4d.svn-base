var app = getApp()
Page({
  data: {
    userName: '',
    userPassword: '',
    id_token: '',//方便存在本地的locakStorage  
    response: '', //存取返回数据  
    shop_id:''
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
    //console.log(e.detail.value)
  },
  logIn: function () {
    var that = this
    wx.request({
      url: 'http://114.115.149.80:8085/tmc/v1/login',
      data: {
        username: this.data.userName,
        password: this.data.userPassword,
      },
      method: 'POST',
      success: function (res) {
        if(res.data.status==0){
          that.setData({
            shop_id: res.data.data.user.shopid,
            response: res
          })
          wx.setStorageSync('id_token', res.data.data.jwtToken);
          wx.setStorageSync('shop_id', res.data.data.user.shopid);
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }else{
          that.errorMsg(res.data.status);
        }
      
        // wx.setStorage({
        //   key: "id_token",
      
        //   // data: "value",
        //   data: res.data.data.jwtToken
        // })
        // try {
         
        // } catch (e) {
        // }
        // wx.setStorage({
        //   key: "shop_id",

        //   // data: "value",
        //   data: res.data.data.user.shopid
        // })
        // try {
        //   wx.setStorageSync('key', 'value')
        // } catch (e) {
        // }
        
      },
      fail: function (res) {
        console.log(res.data);
        console.log('is failed')
      }
    })
  },
  errorMsg: function (msg) {
    if (msg == 40081) {
      wx.showToast({
        title: "登陆失败或密码错误或帐户被禁用",
      });
    } else if (msg == 40082) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else if (msg == 40000) {
      wx.showToast({
        title: "没有该权限。",
      });
    } else if (msg == 40085) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  }
})  