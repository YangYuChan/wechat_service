<template>
	<div class="login-container">
		<div class="loading">
		</div>
	</div>
</template>

<script>
	import Wx from 'weixin-js-sdk';
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common'
	export default {
		name: 'Loading',
		data() {
			return {
				path: global_.path,
				appId:'',
				redirectUri:'',
				brandId:'',
				brandName:'',
				pageSize:15,
				pageNum:1,
				scope:'',
				state:'',
				secret:'',
				wxMsg:null,
				urls:'',
				openId:"",
				accessToken:'',
				refreshToken:'',
				jsapi_ticket:'',
				code:'',
				userInfo:{
					nickname:'',
					sex:'',
					province:'',
					city:'',
					country:'',
					headimgurl:'',
					unionid:''
				},
				menu_index:0,
				url:'',
				callBackUrl:'',
				latitude:'',//纬度
				longitude:'',//经度
				userId:'',
				userHandle:''
			}
		},
		created(){
			this.menu_index = this.getUrlParam('menu_index');
			this.brandId = this.getUrlParam('brandId');
			this.userId = localStorage.getItem('userId');
			this.userHandle = sessionStorage.getItem('userHandle');
			this.redirectUri ='http://wx.weidu.xin/?menu_index='+this.menu_index+'&brandId='+this.brandId;
//			this.redirectUri ='http://wxtest.weidu.xin/?menu_index='+this.menu_index+'&brandId='+this.brandId;  //测试
			
			var title = sessionStorage.getItem("brandName");
			document.title
			if(title == null || title ==''){
				document.title = ''
			}else{
				document.title = sessionStorage.getItem("brandName");
			}
			this.getBrandName();
			
		},
		mounted() {
//			this.$nextTick(() => {
				//修改bug 进入健身房模块，健身房列表页面点击返回按钮时一直仍显示在健身房列表页面。当多次连续点击返回按钮时才退出健身房列表页面
				if(this.userHandle == 1){
					this.$router.go(-4)
				}else{
					if(this.userId != null && this.userId !=''){
						if(this.menu_index == 1){
							sessionStorage.setItem("userHandle",1);
							this.$router.push('/dymList');
						}else if(this.menu_index == 2){
							sessionStorage.setItem("userHandle",1);
//							location.href = 'http://commodity.weiduapi.com/app/login?userId='+ res.data.result.userId;
							location.href = "http://commodity.weiduapi.com/app/login?userId=2c640ff04c3c44fc978f9db4bf674052";
						}else if(this.menu_index == 3){
							sessionStorage.setItem("userHandle",1);
							this.$router.push('/classList');
						}else if(this.menu_index == 4){
							sessionStorage.setItem("userHandle",1);
							this.$router.push('/sportsData');
						}else if(this.menu_index == 5){
							sessionStorage.setItem("userHandle",1);
							this.$router.push('/orderList');
						}
					}else{
						this.getWxMsg(parseInt(this.menu_index));
						sessionStorage.setItem("menu_index",this.menu_index);
					}
				}
				
//			});
		},
		methods: {
			getWxMsg(menu_index){
				this.$axios({
					url: this.path + "wechat/authorize/url",
					method: 'get',
					params: {
					    menu_index:menu_index,
					    brandId:this.brandId,
					    redirectUri:this.redirectUri
					},
					 transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
				})
				.then((res) => {
					if(res.data.code == 0){
						this.callBackUrl = res.data.url;
						this.getOpenId();
					}else{
						console.log(res.data.message)
					}
				})
				.catch((err) => {
					console.log(err);
				});
			},
			getBrandName(){
				this.$axios({
					url: this.path + "brand/"+this.brandId,
					method: 'get',
					transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
				})
				.then((res) => {
					if(res.data.code == 0){
						this.brandName = res.data.brand.brandName;
						sessionStorage.setItem("brandName",this.brandName);
						document.title = this.brandName
					}else{
						console.log(res.data.message)
					}
				})
				.catch((err) => {
					console.log(err);
				});
			},
			getOpenId(state,menu_index){
				let self = this;
				this.code = this.getUrlParam("code");
				this.state = this.getUrlParam("state");
				if(this.code){
					this.$axios({
						url: this.path + "wechat/authorize/callback", //网页授权回调
						method: 'get',
						params: {
					      code: this.code,
					      state:this.state,
					      brandId:this.brandId,
					      menu_index:this.menu_index
					   },
					   transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
					})
					.then((res) => { 
						if(res.data.code === 0){
							this.url = decodeURIComponent(location.href.split('#')[0]);
							this.getSignature();
							this.openId = res.data.userInfo.openid;
							this.unionId = res.data.userInfo.unionid;
							sessionStorage.setItem("openId",this.openId);
							sessionStorage.setItem("unionId",this.unionId);
							sessionStorage.setItem("brandId",this.brandId);
							//判断用户手机号是否存在
							if (self && !self._isDestroyed) {
								self.$nextTick(() => {
									 setTimeout(() => {
			                            if (self && !self._isDestroyed)
			                                self.getVerifyPhone();
			                        }, 1000);
								});
		                       
		                    }
							
						}
					})
					.catch((err) => {
						console.log(err);
					});
				}else{
					location.href= this.callBackUrl;
				};
				
			},
			getVerifyPhone(){
				this.$axios({
						url: this.path + "wechat/login",
						method: 'post',
						params: {
					      openid: this.openId,
					      unionid:this.unionId,
					      brandId:this.brandId,
					   },
					   transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
						})
						.then((res) => {
						if(res.data.code === 0){    //0 已绑定,1 未绑定
							sessionStorage.setItem('token', res.data.token);
							sessionStorage.setItem('userId', res.data.userId);
							if(this.menu_index == 1){
								sessionStorage.setItem("userHandle",1);
								this.$router.push('/dymList');
							}else if(this.menu_index == 2){
								sessionStorage.setItem("userHandle",1);
//								location.href = 'http://commodity.weiduapi.com/app/login?userId='+ res.data.result.userId;
								location.href = "http://commodity.weiduapi.com/app/login?userId=2c640ff04c3c44fc978f9db4bf674052";
							}else if(this.menu_index == 3){
								sessionStorage.setItem("userHandle",1);
								this.$router.push('/classList');
							}else if(this.menu_index == 4){
								sessionStorage.setItem("userHandle",1);
								this.$router.push('/sportsData');
							}else if(this.menu_index == 5){
								sessionStorage.setItem("userHandle",1);
								this.$router.push('/orderList');
							}
						}else if(res.data.code === 100016){
							this.$router.push('/login');
						}
					})
					.catch((err) => {
						console.log(err);
				});	
			},
			//获取签名
			getSignature(){
				this.$axios({
						url: this.path + "wechat/jsapi", //获取JS-SDK配置
						method: 'get',
						params: {
					      url: this.url,
					      brandId:this.brandId
					    },
					   transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
					})
					.then((res) => {
						if(res.data.code == 0){
							this.appId = res.data.jsWechatConfig.appId;
							this.timestamp = res.data.jsWechatConfig.timestamp;
							this.nonceStr = res.data.jsWechatConfig.nonceStr;
							this.signature = res.data.jsWechatConfig.signature;
							Wx.config({	
				                debug: false,
				                appId: this.appId,
				                timestamp: this.timestamp,
				                nonceStr: this.nonceStr,
				                signature: this.signature,
				                jsApiList: [
				                'checkJsApi',
		                        'onMenuShareTimeline',
		                        'onMenuShareAppMessage',
		                        'getLocation'
		                        ]
				        	});
				        	//获取经纬度坐标
					        Wx.ready(function(){
						        Wx.getLocation({
								    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
								    success: function (res) {
								        this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
								        this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
								        var speed = res.speed; // 速度，以米/每秒计
								        var accuracy = res.accuracy; // 位置精度
								        localStorage.setItem("latitude",this.latitude);
								        localStorage.setItem("longitude",this.longitude);
								    },
								    cancel: function (res) {
								        console.log(res);
								    }
								});
					        });
						}
					})
					.catch((err) => {
						console.log('错误'+ err);
					});
				
			},
			getUrlParam(name) {
		        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		        var rrr = decodeURIComponent(window.location.search)
		        var r = rrr.substr(1).match(reg);
		        if(r != null) return unescape(r[2]);
		            return null;
	        }
		}
	}
</script>


<style lang="scss">
	.loading{
		width: 100%;
		height: 100%;
		background: url(../../static/img/loading.png) center center no-repeat;
		background-size: cover;
	}
</style>