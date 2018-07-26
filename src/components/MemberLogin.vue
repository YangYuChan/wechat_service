<template>
	<div class="login-container clearfix">

		<h1 class="member-header-title">员工登录</h1>

		<section class="form-container">
			<div class="form-group">
				<input type="text" class="form-contorl" placeholder="输入手机号" v-model="phone" id="phone"/>
			</div>
			<div class="form-group">
				<input type="password" class="form-contorl" placeholder="输入密码" v-model="password" id="password"/>
			</div>
			<div class="submit" @click="submitLogin">
				<a href="javascript:;">
					登录
				</a>
			</div>
		</section>
	</div>
</template>
<script type="text/javascript">
	import AXIOS from '../axios/axios'
	import global_ from '../common/js/common'
	import '../common/js/sha512.js'
	const Axios = new AXIOS();
	import $ from 'jquery';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				path: global_.path,
				phone:'',
				password:'',
			};
		},
		mounted() {
      this.$nextTick(() => {
        this.phone = localStorage.getItem("phone");
        this.password = localStorage.getItem("password");
        this.openId = sessionStorage.getItem("openId");
      })

		},
		methods: {
			submitLogin(){
				global_.$options.exportSession(this.submitLogin);
				let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
				if(this.phone == ''){ Toast('请输入手机号'); return ;}
				if(!telReg.test(this.phone)){ Toast('请输入正确的手机号'); return ;}
				if(this.password == ''){ Toast('请输入密码'); return ;}
				let pwd = sha512(this.password);
				this.$axios({
					method: 'post',
				    url: this.path + 'sys/user/login',
				    data: {
				    	username: this.phone,
				    	password: pwd,
				 	},
				 	transformRequest: [function(params) {
							let ret = '';
							for(let it in params) {
								ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
							}
							return ret;
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}).then((res) => {
					if(res.data.code == 0){
						Toast('登录成功');
						localStorage.setItem('token', res.data.token);
						localStorage.setItem('phone', this.phone);
						localStorage.setItem('password', this.password);
						this.$router.push('/ReportForm');
					}else{
						Toast(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})

			},
		}
	}
</script>

<style>
  @component-namespace page {
    @component toast {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform:translateY(-50%);
        button:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
  .submit{
  	font-size: 17px!important;
  }
</style>
