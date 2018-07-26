<template>
	<div class="dym-container">
		<div class="hasLocation" v-if="latitude != null && longitude != null">
			<p class="title">离你最近的门店</p>
			<div class="dym-box">
				<mt-loadmore ref="loadmore">
				<ul class="dym-list">
					<li class="dym-item" v-for="(item,index) in dataList" @click="selectDetails(item.id)">
						<!--<router-link :to="{name:'dymDetails',params:{id: item.id}}">-->
						<dl class="dym-msg">
							<dt class="dym-name">{{item.gymName}}</dt>
							<dd class="dym-address">{{item.city}}{{item.area}}{{item.address}}</dd>
							<dd class="dym-phone">{{item.gymPhone}}</dd>
						</dl>
						<div class="distance-msg">
							<p class="dis-icon"><i class="icon iconfont icon-biaoqian"></i></p>
							<p class="num">{{item.distance}}km</p>
						</div>
						<!--</router-link>-->
					</li>
					<div slot="bottom" class="mint-loadmore-bottom">
					    <span v-show="topStatus !== 'drop'" @click="getList">{{buttomTip}}</span>
					    </div>
				</ul>
				</mt-loadmore>
			</div>
			<div v-show= "noData" class="noClassDate">暂无数据！</div>
		</div>
		<div class="noLocation" v-else>
			<div class="dym-box">
				<div class="page-loadmore-wrapper" ref="wrapper">
      				<mt-loadmore ref="loadmore">
					<ul class="dym-list" v-if="dataList != null && dataList != ''">
							<li class="dym-item" v-for="(item,index) in dataList" @click="selectDetails(item.id)">
						<!--<router-link :to="{name:'dymDetails',params:{id: item.id}}">-->
								<dl class="dym-msg">
									<dt class="dym-name">{{item.gymName}}</dt>
									<dd class="dym-address">{{item.city}}{{item.area}}{{item.address}}</dd>
									<dd class="dym-phone">{{item.gymPhone}}</dd>
								</dl>
								<div class="distance-msg">
									<i class="icon iconfont icon-arrow-right arrow"></i>
								</div>
						<!--</router-link>-->
							</li>
						 <div slot="bottom" class="mint-loadmore-bottom">
					      <span v-show="topStatus !== 'drop'" @click="getList">{{buttomTip}}</span>
					    </div>
					</ul>
			</mt-loadmore>
    		</div>
    		<div v-show= "noData" class="noClassDate">暂无数据！</div>
				</div>
		</div>
	</div>
</template>

<script>
	import Wx from 'weixin-js-sdk';
	import Vue from 'vue';
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common';
	import { Indicator } from 'mint-ui';
	import Router from 'vue-router'

	Vue.use(Router)
	const router = new Router();
	const Axios = new AXIOS();
	export default {
		name: 'dataDetails',
		data() {
			return {
				path: global_.path,
				token: '',
				userId:'',
				dataList: [],
		        pageSize: 15,
		        pageNum: 1,
		        latitude:'',
		        longitude:'',
		        allLoaded: false,
		        topStatus:"",
		        wrapperHeight: 0,
		        noData:false,
		        buttomTip:'点击加载更多',
		        noMoreData:'暂无数据',
		        timestamp:'',
		        nonceStr:'',
		        signature:'',
		        appId:'',
		        total:0,
		        brandId:'',
		        
			}
		},
		created() {
			this.token = sessionStorage.getItem("token");
			this.appId = sessionStorage.getItem("appId");
			this.latitude = localStorage.getItem("latitude");
			this.longitude =localStorage.getItem("longitude");
			this.brandId = sessionStorage.getItem("brandId");
			document.title = sessionStorage.getItem("brandName");
			if(this.latitude == null){
				this.getSignature();
			}
		},
		mounted() {
			this.openIndicatorWithSpinner();
//			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
			this.$nextTick(() => {
				if(this.token != null){
					this.getTotal();
				}else{
					router.push({ path: '/loading' });
				}
			});
		},
		methods: {
			getTotal() {
				this.$axios({
						url: this.path + 'gyms/count',
						method: 'get',
						params: {
							brandId: this.brandId
						},
						transformRequest: [function(params) {
							let ret = ''
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret
						}],
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization': this.token,
						}
					})
					.then((res) => {
						if(res.data.code === 0) {
							this.total = res.data.result;
							this.getList();
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			getList() {
				global_.$options.exportSession(this.getList);
				this.$axios({
						url: this.path + 'gyms',
						method: 'get',
						params: {
							pageSize: this.pageSize,
					        pageNum: this.pageNum,
					        latitude:this.latitude,
					        longitude:this.longitude,
					        brandId: this.brandId
						},
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
					Indicator.close()
					if(res.data.code === 0) {
						if(this.total > 0){
									if(res.data.result.length == 15){
										this.dataList = this.dataList.concat(res.data.result) //concat连接两个数组返回被连接数组的一个副本
										this.scrollMode = 'touch'
										this.pageNum += 1;
										this.buttomTip = '点击加载更多';
									}else{
										this.dataList = this.dataList.concat(res.data.result) //concat连接两个数组返回被连接数组的一个副本
										$(".mint-loadmore-bottom").hide();
										this.buttomTip = '';

									}
								}else{
									this.noData = true
								}
					}	
				})
			},
			openIndicatorWithSpinner() {
				Indicator.open({
					spinnerType: 'fading-circle'
				});
			},
			//获取签名
			getSignature(){
				this.$axios({
						url: "https://www.weiduapi.com/wechat/signature",
						method: 'get',
						params: {
					      url: this.url,
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
						if(res.data.code ==0){
							this.timestamp = res.data.result.timestamp;
							this.nonceStr = res.data.result.noncestr;
							this.signature = res.data.result.signature;
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
			selectDetails(id){
				sessionStorage.setItem('gymId',id);
				this.$router.push('/dymDetails');
			}
		},
		beforeDestroy() {
			Indicator.close();
		}
	}
</script>

<style type="text/css">
	@component-namespace page {
		@component indicator {
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
		@component loadmore {
      @descendent desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        &:last-of-type {
          border-bottom: solid 1px #eee;
        }
      }
      @descendent listitem {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
        &:first-child {
          border-top: solid 1px #eee;
        }
      }
      @descendent wrapper {
        overflow: scroll;
      }
      .mint-spinner {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  @component mint-loadmore-bottom {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
      @when rotate {
        transform: rotate(180deg);
      }
    }
	}
	.mint-spinner-snake{
		margin: 0 auto;
	}
	.mint-loadmore-bottom{
		font-size: 14px;
		color: #999999;
		margin-bottom: 0;
		height: auto;
		line-height: auto;
	}
	.nodata{
		font-size: 14px;
		color: #808080;
		text-align: center;
		color: #999999;
		padding: 15px 0 16px;
	}
	.mint-loadmore{
		background-color: #fff;
	}
</style>

