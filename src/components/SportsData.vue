<template>
	<div class="sports-container">
		<div class="sports-banner">
			<img src="../../static/img/beijingtu.png" class="b-bg"/>
			<div class="b-content">
				<p class="font">累计训练</p>
				<p class="time"><b class="num">{{sportsData.sportTime}}</b><span>&nbsp;小时</span></p>
			</div>
		</div>
		<div class="sports-message">
		<a class="mint-cell">
			<div class="mint-cell-wrapper sports-allcount">
				<div class="mint-cell-title">
					<span class="mint-cell-text" id="allCount">总获取{{sportsData.totalWeidu}}微度</span>
				</div> 
				<div class="mint-cell-value">
					<span class="more">
						<router-link :to="'dataDetails'">
							查看详情<i class="icon iconfont icon-arrow-right"></i>
						</router-link>
					</span>
				</div>
			</div> 
		</a>
		<a class="mint-cell">
			<div class="mint-cell-wrapper">
				<div class="mint-cell-title">
					<span class="mint-cell-text">骑行距离</span>
				</div> 
				<div class="mint-cell-value">
					<span>{{sportsData.totalDistance}} 千米</span>
				</div>
			</div> 
		</a>
		<a class="mint-cell">
			<div class="mint-cell-wrapper">
				<div class="mint-cell-title">
					<span class="mint-cell-text">骑行速度</span>
				</div> 
				<div class="mint-cell-value">
					<span>{{sportsData.avgSpeed}} 千米/小时</span>
				</div>
			</div> 
		</a>
		<a class="mint-cell">
			<div class="mint-cell-wrapper">
				<div class="mint-cell-title">
					<span class="mint-cell-text">骑行功率</span>
				</div> 
				<div class="mint-cell-value">
					<span>{{sportsData.totalPower}} 瓦特</span>
				</div>
			</div> 
		</a>
		<a class="mint-cell">
			<div class="mint-cell-wrapper">
				<div class="mint-cell-title">
					<span class="mint-cell-text">骑行消耗</span>
				</div> 
				<div class="mint-cell-value">
					<span>{{sportsData.totalCalorie}} 千卡</span>
				</div>
			</div> 
		</a>
	</div>
		
	</div>
</template>
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
  }
</style>
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
				sportsData:{},
			}
		},
		created() {
			document.title = sessionStorage.getItem("brandName");
		},
		mounted() {
			this.$nextTick(() => {
				this.token = sessionStorage.getItem('token');
				this.userId = sessionStorage.getItem('userId');
				if(this.userId){
					this.getData();
				}else{
					this.$router.push('/login');
				}
			});
		},
		methods: {
			getData() {
				global_.$options.exportSession(this.getData);
				//2868476a47274504bc68c4ff03ebb711
				this.openIndicatorWithSpinner();
				this.$axios({
						url: this.path + 'record/statistics',
						method: 'get',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization':this.token,
						}
					})
					.then((res) => {
						if(res.data.code == 0){
							Indicator.close()
							this.sportsData = res.data.result;
						}
					})
					.catch((err) => {
						console.log(err);
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

