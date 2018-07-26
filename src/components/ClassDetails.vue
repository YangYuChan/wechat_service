<template>
	<div class="dym-details clearfix">
		<div class="dym-logo"><img :src="classData.classPath" alt="" onerror="this.src='../../static/img/default-bg.jpg'"/></div>
		<div class="dym-msg">
			<div class="dym-name clearfix">
				<span class="name">{{classData.className}}</span>
				<span class="price fl-right" v-if="classData.classPrice == 0"></span>
				<span class="price fl-right" v-else>￥{{classData.classPrice}}</span>
			</div>
			<div class="study-time clearfix">
				<span class="font fl-left">课程时长：{{classData.classTime}}分钟</span>
			</div>
			<div class="study-time clearfix" v-if="classData.classKind == 3">
				<span class="font fl-left">上课时间：</span>
				<ul class="time fl-left">
					<li>{{classData.beginTime}}</li>
				</ul>
			</div>
			<div class="study-time clearfix" v-else>
				<span class="font fl-left">课时：</span>
				<ul class="time fl-left">
					<li>{{classData.classNumber}}</li>
				</ul>
			</div>
			<div class="dym-introduce">课程说明：<span v-html="classData.classInfo"></span></div>
		</div>
		<div class="feature-class mb60">
			<dl class="feature-list">
				<dt class="feature-title">授课教练</dt>
					<dd class="feature-item clearfix">
				<router-link :to="'classDetails'">
					<div class="class-pic coach-pic fl-left"><img :src="classData.coachPath"  alt="" onerror="this.src='../../static/img/user-logo.png'"/></div>
					<div class="class-msg fl-right">
						<h2 class="class-name">{{classData.coachName}}</h2>
						<p class="coach-name">职称：{{classData.typeName}}</p>
						<p class="class-introduce">个人简介：{{classData.coachHonor}}</p>
					</div>
				</router-link>
				</dd>
			</dl>
			
		</div>
		
		<div>
			<footer class="order-btn" v-if="classData.userScheduleStatus == 0">
			<!--团课-->
			<div v-if="classData.classKind == 3">
					<span v-if="classData.classPrice == 0" @click="submitGroupOrder()">团课立即预约</span>
					<span v-else @click="affirmGroupClass()">团课立即预约</span>
			</div>
			<!--私教-->
			<div v-else-if="classData.classKind == 2">
					<span v-if="classData.classPrice == 0" @click="submitPrivateOrder()">私教立即预约</span>
					<span v-else @click="affirmPrivateClass()">私教立即预约</span>
			</div>
			
		</footer>
		<footer v-else class="order-success-btn" >
			已预约
		</footer>
		</div>
	</div>
</template>

<script>
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common';
	import { Indicator } from 'mint-ui';
	const Axios = new AXIOS();
	import { Toast } from 'mint-ui';
	export default {
		name: 'classDetails',
		data() {
			return {
				path: global_.path,
				token: '',
				classData:{},
				cid:'',
				csid:'',
				ckind:'',
				userId:'',
				payId:''
			}
		},
		created() {
			this.userId = sessionStorage.getItem('userId');
			this.token = sessionStorage.getItem('token');
			var gymid = sessionStorage.getItem('gym_id');
			sessionStorage.setItem('gym_id', gymid);
			this.cid = sessionStorage.getItem("classId");
			this.csid = sessionStorage.getItem("classScheduleId");	
			this.ckind =  sessionStorage.getItem("classKind");
			document.title = sessionStorage.getItem("brandName");
//			sessionStorage.setItem("pageState","history")
    	},
		mounted() {
			this.$nextTick(() => {
				if(this.ckind == 3){
					this.getGroupData()
				}else if(this.ckind == 2){
					this.getData();
				}
			});
		},
		methods: {
			getData() {
				global_.$options.exportSession(this.getData);
				this.openIndicatorWithSpinner();
				this.$axios({
						url: this.path + 'personalClass/'+this.cid,
						method: 'get',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token,
						}
					})
					.then((res) => {
						Indicator.close()
						if(res.data.code == 0){
							this.classData = res.data.result;
							this.payId = this.classData.id;
							this.recommend = 2;
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			getGroupData() {
				global_.$options.exportSession(this.getGroupData);
				this.openIndicatorWithSpinner();
				this.$axios({
						url: this.path + 'groupClass/'+this.csid,
						method: 'get',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token,
						}
					})
					.then((res) => {
						Indicator.close()
						if(res.data.code == 0){
							this.classData = res.data.result;
							this.payId = this.classData.id;
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			affirmGroupClass(){
				sessionStorage.setItem('classScheduleId', this.csid);
				sessionStorage.setItem('classKind', 3);
				sessionStorage.setItem('payId', this.payId);
				
				this.$router.push('/affirmOrder');
			},
			affirmPrivateClass(){
				sessionStorage.setItem('classId', this.cid);
				sessionStorage.setItem('classKind', 2);
				sessionStorage.setItem('payId', this.payId);
				this.$router.push('/affirmOrder');
			},
			openIndicatorWithSpinner() {
		        Indicator.open({ spinnerType: 'fading-circle' });
		    },
		    submitPrivateOrder(){
		    	global_.$options.exportSession(this.submitPrivateOrder);
		     	this.$axios({
							url: this.path + 'privateClass/reservation?classId='+this.classId,
							method: 'post',
							headers: {
								'Content-Type': 'application/json',
								'Authorization':this.token,
							}
						}).then(res => {
							
							if(res.data.code == 0){
								Toast({
						          message: '恭喜您，预约成功！',
						        });
								this.$router.push('/classList');
							}
						
						}).catch(error => {
							console.log(error)
						});
		    },
		    submitGroupOrder(){
		    	global_.$options.exportSession(this.submitGroupOrder);
		     	this.$axios({
							url: this.path + 'grouponSchedule?classScheduleId='+this.csid,
							method: 'post',
							headers: {
								'Content-Type': 'application/json',
								'Authorization':this.token,
							}
						}).then(res => {
							if(res.data.code == 0){
								Toast({
						          message: '恭喜您，预约成功！',
						        });
								this.$router.push('/classList');
							}
						
						}).catch(error => {
							console.log(error)
						});
		     }
		},
		beforeDestroy() {
	      Indicator.close();
	    }
	}
</script>
i
<style type="text/css">
	html,body{
		height: auto;
	}
	.order-btn span{
		display: block;
	}
</style>