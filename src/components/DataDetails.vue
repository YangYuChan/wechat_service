<template>
	<div class="sports-container">
		<div class="sports-message">
			<div class="page-loadmore-wrapper" ref="wrapper">
      <!--<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">-->
      	<mt-loadmore ref="loadmore">
      		<div class="container">
      			 <ul class="data-list" v-if="dataList != null && dataList !=''">
						<li class="data-item clearfix" v-for="item in dataList">
							<span class="equipment-icon fl-left"><img :src="item.image" onerror="this.src='../../static/img/touxiang.png'"/></span>
							<dl class="sport-msg fl-left">
								<dd class="equipment-name">{{item.deviceName}}</dd>
								<dd class="sport-time">{{item.date}}</dd>
							</dl>
							<div class="sport-data fl-right">
								<dd class="sport-distance">{{item.distance}} km</dd>
								<dd class="sport-award">{{item.weidu}} 微度</dd>
							</div>
						</li>
				        <div slot="bottom" class="mint-loadmore-bottom">
					      <span v-show="topStatus !== 'drop'" @click="getList">{{buttomTip}}</span>
					    </div>
					</ul>
      		</div>
      </mt-loadmore>
    </div>
    <div v-show='noData' class="nodata">暂无数据！</div>
		</div>

	</div>
</template>

<script>
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common';
	import { Indicator } from 'mint-ui';
	const Axios = new AXIOS();
	export default {
		name: 'dataDetails',
		data() {
			return {
				path: global_.path,
				token: '',
				total:0,
				dataList: [],
				pageSize: 15,
				pageNum: 1,
				allLoaded: false,
		        topStatus:"",
		        wrapperHeight: 0,
		        noData:false,
		        buttomTip:'点击加载更多'
			}
		},
		created() {
			this.token = sessionStorage.getItem('token');
			document.title = sessionStorage.getItem("brandName");
			
    	},
		mounted() {
			this.openIndicatorWithSpinner();
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
			this.$nextTick(() => {
				this.getList();
			});
		},
		methods: {
			getTotal() {
				this.$axios({
						url: this.path + 'record/count',
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
							'Authorization': this.token,
						}
					})
					.then((res) => {
						if(res.data.code == 0) {
							this.total = res.data.result;
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			getList() {
				global_.$options.exportSession(this.getList);
				this.getTotal();
				this.$axios({
						url: this.path + 'record/history?pageSize='+this.pageSize+'&pageNum='+this.pageNum,
						method: 'get',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token,
						}
					})
				.then((res) => {
					Indicator.close()
						if(res.data.code == 0) {
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
</style>