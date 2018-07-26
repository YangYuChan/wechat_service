<template>
	<div class="login-container">
		<div class="loading"></div>
	</div>
</template>

<script>
	import Wx from 'weixin-js-sdk';
	import AXIOS from '../axios/axios';
	export default {
		name: 'Loading',
		data() {
			return {
				appId:'',
				redirectUri:'',
				scope:'',
				state:'',
				wxMsg:null,
				urls:'',
				openId:"",
				accessToken:'',
				code:''
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getWxMsg();
			});
		},
		methods: {
			getWxMsg(){
				this.code = this.getUrlParam("code");
				alert(this.code);
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