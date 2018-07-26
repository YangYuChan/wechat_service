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
				<span class="font fl-left">课程长度：{{classData.classTime}}分钟</span>
			</div>
			<div class="study-time clearfix">
				<span class="font fl-left">课时：</span>
				<ul class="time fl-left">
					<li>{{classData.classNumber}}</li>
				</ul>
			</div>
			<div class="dym-introduce">课程说明：{{classData.classInfo}}</div>
		</div>
		<div class="feature-class">
			<dl class="feature-list">
				<dt class="feature-title">授课教练</dt>
					<dd class="feature-item clearfix" v-for="item in classData.coachList">
					<div class="class-pic coach-pic fl-left"><img :src="item.coachPath"  alt="" onerror="this.src='../../static/img/user-logo.png'"/></div>
					<div class="class-msg fl-right">
						<h2 class="class-name">{{item.coachName}}</h2>
						<p class="coach-name">职称：{{item.typeName}}</p>
						<p class="class-introduce">个人简介：{{item.honor}}</p>
					</div>
				</dd>
			</dl>
			
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
				classId:'',
				userId:'',
				recommend:'',
				gymId:'',
			}
		},
		created() {
			this.classId = this.$route.params.classId;
			this.token = sessionStorage.getItem('token');
			this.gymId = sessionStorage.getItem('gymId');
			sessionStorage.setItem('gym_id',this.gymId);
			document.title = sessionStorage.getItem("brandName");
    	},
		mounted() {
			this.$nextTick(() => {
				this.getData();
			});
		},
		methods: {
			getData() {
				this.$axios({
						url: this.path + 'gym/class/'+this.classId,
						method: 'get',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token,
						}
					})
				.then((res) => {
					Indicator.close()
					if(res.data.code == 0) {
						this.classData = res.data.result
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
i
<style type="text/css">
	html,body{
		height: auto;
	}
	.order-btn span{
		display: block;
	}
</style>