//index.js
//获取应用实例
// import util from './../../utils/util.js';
const app = getApp()
var myself = "";
var token = "";
var shopId = "";
var updateData = "";
var editData = "";
var ImgCount=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    primarySize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    uploadimgs: [], //上传图片列表
    editable: false,//是否可编辑
    id_token: '',//方便存在本地的locakStorage  
    region: ['贵州省', '遵义市', '绥阳县'],
    // region: [''],
    customItem: '全部',
    src: "../../images/titleImage.png",
    sightingName: '',
    route: '',
    maxPeople: '',
    maxCars: '',
    sightDetail: '',
    tel: '',
    shoptype: "",
    loadimg: '',
    publishImg: [],
    items: [
      { name: '1', value: '吃' },
      { name: '2', value: '住' },
      { name: '3', value: '行' },
      { name: '4', value: '游', checked: 'true' },
      { name: '5', value: '购' },
      { name: '6', value: '娱' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myself = this;
    this.setData({
      uploadimgs: []
    })
    token = wx.getStorageSync('id_token');
    shopId = wx.getStorageSync('shop_id');

  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    this.setData(data);
  },
  bindRegionChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
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
  editImage: function () {
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.uploadimgs;
    list.splice(index, 1)
    that.setData({
      uploadimgs: list
    });
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
      uploadimgs: []
    })
  },
  // deleteImg: function (e) {
  //   var removeIndex = e.currentTarget.dataset.index;
  //   var imgs = this.data.uploadimgs;
  //   var removeImg = [];
  //   for (var i = 0; i < imgs.length; i++) {
  //     if (i == removeIndex) {
  //     } else {
  //       removeImg[removeImg.length] = imgs[i];
  //     }
  //   }
  //   this.setData({
  //     uploadimgs: []
  //   })
  // },
 deleteImg: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.uploadimgs;
    list.splice(index, 1)
    that.setData({
      uploadimgs: list
    });

  },
  // 预览图片
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: 'http://114.115.149.80:8085/tmc/v1/getshopbyid', //仅为示例，并非真实的接口地址
      data: {
        "shopid": shopId,
      },
      header: { "Authorization": token },// 默认值
      method: 'POST',
      success: function (res) {
        if(res.data.status==0){
          updateData = res.data.data;
          //console.log(updateData)
          // console.log(res.data.data.shopname) 
          that.setData({
            sightingName: res.data.data.shopname,
            maxPeople: res.data.data.pjpersons,
            maxCars: res.data.data.shopcrowd,
            sightDetail: res.data.data.shopintroduction,
            tel: res.data.data.shopphone,
            shoptype: res.data.data.shoptype,
            loadimg: res.data.data.imgurl,
            arriveAt: res.data.data.arriveAt,
           
          })
        }else {
          myself.errorMsg(res.data.status);
        }
        
        // console.log(res.data.data.imgurl)          
      }
    })
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
        //console.log(test.data);
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
          myself.updataShop();
        }
      },
    })
  },
  submit: function () {
    var pathes = myself.data.uploadimgs;
    for (var i = 0; i < pathes.length; i++) {
      myself.uploadImg(pathes[i]);
    }

  },
  formSubmit: function (e) {
   console.log('form发生了submit事件，携带数据为：', e.detail.value)
    editData = e.detail.value;
    //console.log(editData.sightingName);
    //console.log(updateData);
    updateData.shopname = editData.shopname;
    updateData.pjpersons = editData.pjpersons;
    updateData.shopintroduction = editData.shopintroduction;
    updateData.shopphone = editData.shopphone;
    updateData.shoptype = editData.shoptype;
    updateData.shopcrowd = editData.shopcrowd;
    updateData.arriveAt = editData.arriveAt;
    // wx.request({
    //   url: 'http://114.115.149.80:8085/tmc/v1/editshop', //仅为示例，并非真实的接口地址
    //   data: updateData,
    //   header: { "Authorization": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJzaWQiOiJveWRnZmJhNWtjbGozZmh4aG1ld2NsZm86MzgiLCJleHAiOjE1MDUxNTIxMzl9.GOAWaX40WkPj77mfRd__izCUpsQ70PGHnFP1uyS5AVwQAZPozd4m27u8l1GevfyE7qEd8yTHn_frlj_N_hzgMg" },// 默认值
    //   method: 'POST',
    //   success: function (res) {
    //     console.log("保存成功")
    //     console.log(res.data),
    //       wx.showToast({
    //         title: '成功',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //   }
    // })
    if (myself.data.uploadimgs.length==0){
      myself.updataShop();
    }else{
      for (var i = 0; i < myself.data.uploadimgs.length; i++) {
        myself.uploadImg(myself.data.uploadimgs[i]);
      }
    }
  
  },
  updataShop:function(){
    for (var i = 0; i < myself.data.publishImg.length; i++) {
      updateData.imgurl += myself.data.publishImg[i] + "|"
    }
    console.log(myself.data.publishImg);
    wx.request({
      url: 'http://114.115.149.80:8085/tmc/v1/editshop', //仅为示例，并非真实的接口地址
      data: updateData,
      header: { "Authorization": token },// 默认值
      method: 'POST',
      success: function (res) {
        console.log("保存成功")
        console.log(res.data),
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        myself.onLoad();
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