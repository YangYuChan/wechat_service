<template>
	<div class="affirm-container">
		<dl class="order-msg">
			<dt class="title">请确认订单信息</dt>
			<dd class="msg-item clearfix"><span class="fl-left">课程：</span><span class="class-tit fl-left">{{classData.className}}</span></dd>
			<dd class="msg-item"><span>时间：</span><span>{{classData.classTime}}</span></dd>
			<dd class="msg-item"><span>地点：</span><span>{{classData.classAddress}}</span></dd>
			<dd class="msg-item">
				<mt-button @click.native="popupVisible4 = true" size="large">
					<span>人数：</span>
					<span>{{peopleNum}}人</span>
					<i class="icon iconfont icon-arrow-down fl-right"></i>
				</mt-button>
			</dd>
			<dd class="msg-item"><span>总价：</span><span>￥{{totalPrice}}</span></dd>
		</dl>
		<p class="tags">温馨提示：开始时间前6个小时前取消预约，支持全额退款；开始时间前6个小时后取消预约，不支持退款。</p>
		<footer class="submit-btn">
			<mt-button @click.native="openConfirm" size="large">提交订单，微信支付</mt-button>
		</footer>
		<mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
	   	<div class="toolbar">
	   		<a href="javascript:;" @click="submitNum">完成</a>
	   	</div>
      <mt-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    </mt-popup>
	</div>
</template>

<script>
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common';
	const Axios = new AXIOS();
	import { MessageBox } from 'mint-ui';
	import $ from 'jquery';
	import Wx from 'weixin-js-sdk';
	export default {
         data(){
        	return {
        		path: global_.path,
        		active:'tab-container1',
        		selected: '1',
        		isActive: true,
        		popupVisible4: false,
        		buttonBottom: 0,
        		classData:'',
        		numArr:'',
        		peopleNum:1,
        		classId:'',
        		userId:'',
        		classKind:'',
        		totalPrice:0,
        		classPrice:'',
        		classNotice:'',
        		openId:'',
        		classScheduleId:'',
        		payId:'',
        		token:'',
        		dateSlots: [
		          {
		            flex: 1,
		            values: ['1', '2', '3', '4', '5'],
		            className: 'slot1',
		            textAlign: 'center'
		          }
		        ],       
        	}
        },
        created() {
        	this.token = sessionStorage.getItem('token');
			this.classId = sessionStorage.getItem("classId");
			this.classScheduleId = sessionStorage.getItem("classScheduleId");
			this.classKind = sessionStorage.getItem("classKind");
			this.userId = sessionStorage.getItem("userId");
			this.openId = sessionStorage.getItem("openId");
			this.payId = sessionStorage.getItem('payId');
			document.title = sessionStorage.getItem("brandName");
			sessionStorage.setItem('recommend', 2);
    	},
        mounted(){
			this.$nextTick(() => {
				if(this.classKind == 2){
					this.getPrivateClass();
				}else if(this.classKind == 3){
					this.getGroupClass();
				}
			});
		},
        methods: {
        	//判断是私教信息
        	getPrivateClass() {
        		global_.$options.exportSession(this.getPrivateClass);
				this.$axios({
						url: this.path+'privateClass/'+this.classId+'/prepay',
						method: 'get',
						transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token
						}
					})
					.then((res) => {
						if(res.data.code == 0){
							this.classData = res.data.result;
							this.classPrice = res.data.result.classPrice;
							this.classNotice = res.data.result.classNotice;
							this.totalPrice = this.classPrice * this.peopleNum;
							sessionStorage.setItem('classKind', 2);
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//判断是团课信息
			getGroupClass(){
				global_.$options.exportSession(this.getGroupClass);
				this.$axios({
						url: this.path+'groupClass/'+this.classScheduleId+'/prepay',
						method: 'get',
						transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token,
						}
					})
					.then((res) => {
						if(res.data.code == 0){
							this.classData = res.data.result;
							this.classPrice = res.data.result.classPrice;
							this.classNotice = res.data.result.classNotice;
							this.totalPrice = this.classPrice * this.peopleNum;
							sessionStorage.setItem('classKind', 3);
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
        	 onDateChange(picker, values) {
		        if (values[0] > values[1]) {
		          picker.setSlotValue(1, values[0]);
		        }
		        this.dateStart = values[0];
		        this.dateEnd = values[1];
		       this.numArr = values;
		      },
		      //切换人数
			  //改bug 确认订单信息页面，预定团课/私教课，选择人数栏多次点击选择不同的人数时总价计算不正确
		     submitNum(){
		     	this.peopleNum = parseInt(this.numArr);
		     	this.popupVisible4 = false;
		     	this.totalPrice = this.classPrice * this.peopleNum;
		     },
		     //提交订单
		    openConfirm() {
		    	if(this.classNotice != null && this.classNotice !=''){
		    		MessageBox({
						title: '温馨提示',
						message: this.classNotice,
						showCancelButton: true,
					  	confirmButtonText: '知道了',
					  	cancelButtonText:'再想想'
					}).then(action => {
						if(action == 'confirm'){
							if(this.classKind == 2){
								this.$nextTick(() => {
									this.submitPrivateClass();
								});
							}else if(this.classKind == 3){
								this.$nextTick(() => {
									this.submitGroupClass();
								});
							}
						}else{
//							alert(3)
						}
					});
		    	}else{
		    		if(this.classKind == 2){
						this.submitPrivateClass();
					}else if(this.classKind == 3){
						this.submitGroupClass();
					}
		    	}
			},
			//提交私教订单
			submitPrivateClass(){
				let self = this
					this.$axios({
						url: 'http://120.76.100.195:8086/wx/privateClass/pay',
						method: 'post',
						data:{
							userId:this.userId,
							classId:this.payId,
							openId:this.openId,
							amount:this.peopleNum
						},
						headers: {
							'Content-Type': 'application/json',
							'Authorization':this.token,
						}
					})
					.then((res) => {
						if(res.data.code == 0){
								Wx.config({	
					                debug: false,
					                appId: res.data.result.appId,
					                timestamp: res.data.result.timeStamp,
					                nonceStr: res.data.result.nonceStr,
					                signature: res.data.result.paySign,
					                jsApiList: ['chooseWXPay']
				                })
								Wx.ready(function(){
									Wx.chooseWXPay({
										appId: res.data.result.appId,
						                timestamp: res.data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						                nonceStr: res.data.result.nonceStr, // 支付签名随机串，不长于 32 位
						                package: res.data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						                signType: res.data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						                paySign: res.data.result.paySign, // 支付签名
						                success:function(res){     
          									 if(res.errMsg === "chooseWXPay:ok" ) {
          									 	sessionStorage.setItem('classId', self.classId);
          									 	sessionStorage.setItem('classScheduleId', self.classScheduleId);
          									 	sessionStorage.setItem("classKind",2)
          									 	location.href = "/classDetails"
          									 }
          								}
						              });
								})
						 }
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//提交团课订单
			submitGroupClass(){
				let self = this
				this.$axios({
						url: 'http://120.76.100.195:8086/wx/groupClass/pay',
						method: 'post',
						data:{
							userId:this.userId,
							classScheduleId:this.classScheduleId,
							openId:this.openId,
							amount:this.peopleNum
						},
						headers: {
							'Content-Type': 'application/json',
							'Authorization':this.token
						}
					})
					.then((res) => {
						if(res.data.code == 0){
								Wx.config({	
					                debug: false,
					                appId: res.data.result.appId,
					                timestamp: res.data.result.timeStamp,
					                nonceStr: res.data.result.nonceStr,
					                signature: res.data.result.paySign,
					                jsApiList: ['chooseWXPay']
				                })
								Wx.ready(function(){
									Wx.chooseWXPay({
										appId: res.data.result.appId,
						                timestamp: res.data.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						                nonceStr: res.data.result.nonceStr, // 支付签名随机串，不长于 32 位
						                package: res.data.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						                signType: res.data.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						                paySign: res.data.result.paySign, // 支付签名
						                success:function(res){     
          									 if(res.errMsg === "chooseWXPay:ok" ) {
          									 	sessionStorage.setItem('classId', self.classId);
          									 	sessionStorage.setItem('classScheduleId', self.classScheduleId);
          									 	sessionStorage.setItem("classKind",3)
          									 	location.href = "/classDetails"
          									 }
          								}
						              });
								})
						 }
					})
					.catch((err) => {
						console.log(err);
					})
			},
        }
  }
</script>


<style>
   @component-namespace page {
    @component popup {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);
        button:not(:last-child) {
          margin-bottom: 20px;
        }
      }
      .mint-popup-4 {
        .picker-slot-wrapper, .picker-item {
          backface-visibility: hidden;
        }
      }
    }
     @component msgbox {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);
        button:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
    .mint-popup-4 {
        width: 101%;
    }
  .mint-msgbox-header+.mint-msgbox-content .mint-msgbox-message{
  	padding:10px
  }
</style>