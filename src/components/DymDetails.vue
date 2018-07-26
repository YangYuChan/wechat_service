<template>
	<div class="dym-details" v-if="gymData">
		<div class="dym-logo"><img :src="gymData.gymPath" alt="" onerror="this.src='../../static/img/default-bg.jpg'"/></div>
		<div class="dym-msg">
			<div class="dym-name">{{gymData.gymName}}</div>
			<div class="dym-address">{{gymData.city}}{{gymData.area}}{{gymData.address}}</div>
			<div class="dym-phone">{{gymData.gymPhone}}</div>
			<div class="dym-introduce">场馆简介：{{gymData.gymInfo}}</div>
		</div>
		<div class="feature-class">
			<dl class="feature-list" >
				<dt class="feature-title">特色课程（{{total}}）</dt>
					<mt-loadmore ref="loadmore">
						<div class="container">
							<dd class="feature-item clearfix" v-for="(item,index) in classData">
							<router-link :to="{name:'gymClassDetails',params:{classId: item.classId}}">
							<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
							<div class="class-msg fl-right">
								<h2 class="class-name">{{item.className}}</h2>
								<p class="coach-name">教练：
									<span v-for="citem in item.coachList">{{citem.coachName}}&nbsp;</span>
								</p>
								<p class="class-introduce">课程说明：{{item.classInfo}}</p>
							</div>
							</router-link>
						</dd>
						
						<div slot="bottom" class="mint-loadmore-bottom">
						      <span v-show="topStatus !== 'drop'" @click="getData">{{buttomTip}}</span>
						</div>
						</div>
				   </mt-loadmore>
			</dl>
				<div v-show='noData' class="nodata">{{noMoreData}}</div>
			
		</div>
	</div>
</template>

<script>
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common';
	import { Indicator } from 'mint-ui';
	const Axios = new AXIOS();
	export default {
		name: 'sportsData',
		data() {
			return {
				path: global_.path,
				token: '',
				gymData:{},
				classData:[],
				total:0,
				gymId:'',
				num:'',
				pageSize: 15,
		        pageNum: 1,
		        allLoaded: false,
		        topStatus:"",
		        wrapperHeight: 0,
		        noData:false,
		        buttomTip:'点击加载更多',
		        noMoreData:'暂无数据',
			}
		},
		created() {
				var parId,sitemId;
				parId = sessionStorage.getItem('gymId');
				sitemId = sessionStorage.getItem('gym_id');
				document.title = sessionStorage.getItem("brandName");
				if(parId != null && parId !=''){
					this.gymId = parId
				}else if(sitemId !=null && sitemId !=''){
					this.gymId = sitemId
				}
				this.token = sessionStorage.getItem('token');
			
    	},
		mounted() {
			this.$nextTick(() => {
				this.getData();
			});
		},
		methods: {
			getData() {
				global_.$options.exportSession(this.getData);
				this.openIndicatorWithSpinner();
				this.$axios({
						url: this.path + 'gym/'+this.gymId,
						method: 'get',
						params: {
							pageSize: this.pageSize,
					        pageNum: this.pageNum
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token,
						}
					})
				.then((res) => {
					Indicator.close()
					if(res.data.code === 0) {
							this.gymData = res.data.result;
							this.getTotal()();
							sessionStorage.setItem('gymId',this.gymId);
						
					}
				})
			},
			getTotal() {
				this.$axios({
						url: this.path + 'gym/class/count',
						method: 'get',
						params: {
							gymId:this.gymId
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
							this.getClass();
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			getClass() {
				global_.$options.exportSession(this.getClass);
				this.openIndicatorWithSpinner();
				this.$axios({
						url: this.path + 'gym/class/list',
						method: 'get',
						params: {
							gymId:this.gymId,
							pageSize: this.pageSize,
					        pageNum: this.pageNum
						},
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
										this.classData = this.classData.concat(res.data.result) //concat连接两个数组返回被连接数组的一个副本
										this.scrollMode = 'touch'
										this.pageNum += 1;
										this.buttomTip = '点击加载更多';
									}else{
										this.classData = this.classData.concat(res.data.result) //concat连接两个数组返回被连接数组的一个副本
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
		        Indicator.open({ spinnerType: 'fading-circle' });
		      },
		},
		beforeDestroy() {
	      Indicator.close();
	    }
	}
</script>
<style type="text/css">
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