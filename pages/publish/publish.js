var myself = "";
var ImgCount = 0;
var publishData = {};
var token = "";
var theWx = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadimgs: [],
    publishImg: [],
    activeetime: "",
    activestime: "",
    disable: false,
    price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: 'id_token',
    //   success: function (res) {
    //     console.log(res.data)
    //     token = res.data
    //     console.log(token)
    //   },
    // })
    // wx.getStorage({
    //   key: 'shop_id',
    //   success: function (res) {
    //     console.log(res.data)
    //     publishData.shopid = res.data
    //     console.log(publishData.shopid);
    //   },
    // })
    token = wx.getStorageSync('id_token');
    publishData.shopid = wx.getStorageSync('shop_id');
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
    myself = this;
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

  },
  publish: function (e) {
    //token = wx.getStorageSync("id_token");
    //publishData.shopid = wx.getStorageSync("shop_id");
    publishData.activetypeid = e.detail.value.activetypeid - 0;
    publishData.activestatus = 1;
    publishData.imgcolor = "default";
    publishData.typevalue = "default";
    publishData.activename = e.detail.value.activename;
    publishData.activestime = e.detail.value.activestime;
    publishData.activeetime = e.detail.value.activeetime;
    publishData.activeetime = e.detail.value.activeetime;
    publishData.activeprice = e.detail.value.activeprice - 0;
    publishData.activecoin = e.detail.value.activecoin - 0;
    publishData.activeperson = e.detail.value.activeperson - 0;
    publishData.remaintime = e.detail.value.remaintime - 0;
    publishData.usedactive = 1;
    publishData.unusedactive = 1;
    publishData.activeinfo = e.detail.value.activeinfo;
    publishData.activenotes = e.detail.value.activenotes;
    publishData.logo = "";
    ImgCount = 0;
    for (var i = 0; i < myself.data.uploadimgs.length; i++) {
      myself.uploadImg(myself.data.uploadimgs[i]);
    }
  },
  uploadImg: function (path) {
    wx.uploadFile({
      url: 'http://114.115.149.80:8085/tmc/v1/upfile',
      filePath: path,
      name: 'file',
      header: { "Authorization": token },
      formData: {},
      success: function (res) {
        var test = JSON.parse(res.data);
        console.log(test.data);
        if (test.status == 0) {
          var t = myself.data.publishImg;
          t[t.length] = test.data[0];
          myself.setData({
            publishImg: t
          })
        } else {
          myself.errorMsg(res.data.status);
        }
      },
      fail: function (res) {
        console.log("fail:" + res);
      },
      complete: function (res) {
        ImgCount++;
        if (ImgCount == myself.data.uploadimgs.length) {
          myself.publishAct();
        }
      },
    })
  },
  publishAct: function () {
    for (var i = 0; i < myself.data.publishImg.length; i++) {
      publishData.logo += myself.data.publishImg[i] + "|"
    }
    console.log(publishData);
    wx.request({
      url: 'http://114.115.149.80:8085/tmc/v1/addactive',
      method: "POST",
      data: publishData,
      header: { "Authorization": token },
      success: function (res) {
        console.log(res);
        if (res.data.status == 0) {
          wx.showToast({
            title: '发布成功',
          })
        } else {
          myself.errorMsg(res.data.status);
        }
      },
      complete: function (res) {
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        _this.setData({
          uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
        })
        console.log(_this.data.uploadimgs);
      }
    })
  },
  chooseImage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#17b990",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  primary: function () {
    var pathes = myself.data.uploadimgs;
    for (var i = 0; i < pathes.length; i++) {
      myself.uploadImg(pathes[i]);
    }
  },
  editImage: function () {
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg: function (e) {
    var removeIndex = e.currentTarget.dataset.index;
    var imgs = this.data.uploadimgs;
    var removeImg = [];
    for (var i = 0; i < imgs.length; i++) {
      if (i == removeIndex) {
      } else {
        removeImg[removeImg.length] = imgs[i];
      }
    }
    this.setData({
      uploadimgs: removeImg
    })
  },
  setactiveetime: function (e) {
    this.setData({
      activeetime: e.detail.value
    })
  },
  setactivestime: function (e) {
    this.setData({
      activestime: e.detail.value
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
  },
  radioChange: function (e) {
    if (e.detail.value == 2) {
      myself.setData({
        disable: true
      })
    } else {
      myself.setData({
        disable: false
      })
    }
  }
})