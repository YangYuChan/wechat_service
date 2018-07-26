<template>
	<div class="login-container">
		<section class="form-container">

			<div class="form-group" style="margin-top: 0">
				<input type="password" class="form-contorl" placeholder="请输入密码" v-model="password" id="password" />
			</div>
			<div class="form-group">
				<input type="password" class="form-contorl" placeholder="再次输入密码" v-model="password2" id="password2" />
			</div>
			<div class="submit">
				<a href="javascript:;" @click="handleSubmit">
					完成
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
				phone: '',
				password: '',
				password2: '',
				realName: '',
				state: '',
				token: '',
				menu_index: null,
				userHandle: '',
				openId: '',
				unionId: '',
				brandId: ''
			};
		},
		created() {
			this.menu_index = sessionStorage.getItem("menu_index");
			this.userHandle = sessionStorage.getItem('userHandle');
			this.phone = sessionStorage.getItem("phone");
			this.realName = sessionStorage.getItem("realName");
			this.state = sessionStorage.getItem("state");
			this.openId = sessionStorage.getItem("openId");
			this.unionId = sessionStorage.getItem("unionId");
			this.brandId = sessionStorage.getItem("brandId");
			document.title = sessionStorage.getItem("brandName");
			if(this.userHandle == 1) {
				this.$router.go(-1)
			}
		},
		methods: {
			getUrlParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var rrr = decodeURIComponent(window.location.search)
				var r = rrr.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			},

			handleSubmit() {
				var reg = /^[a-zA-Z0-9]{6,12}$/;
				if(!reg.test(this.password)) {
					Toast({
						message: '请输入6-12位数字字母组成的密码'
					});
					return false;
				}
				if(this.password2 !== this.password) {
					Toast({
						message: '两次输入密码不一致请重新输入'
					});
					return false;
				}
				let pwd = sha512(this.password);
				this.$axios({
					url: this.path + 'register',
					method: 'post',
					data: {
						phone: this.phone,
						password: pwd,
						realName: this.realName,
						state: this.state,
						openid: this.openId,
						unionid: this.unionId,
						brandId: this.brandId,
					},
					headers: {
						'Content-Type': 'application/json',
					}
				}).then(res => {
					if(res.data.code == 0) {
						sessionStorage.setItem('token', res.data.result.token);
						sessionStorage.setItem('userId', res.data.result.userId);
						if(this.menu_index == 1) {
							sessionStorage.setItem("userHandle", 1);
							this.$router.push('/dymList');
						} else if(this.menu_index == 2) {
							sessionStorage.setItem("userHandle", 1);
							//									location.href = 'http://commodity.weiduapi.com/app/login?userId='+ res.data.result.userId;
							location.href = "http://commodity.weiduapi.com/app/login?userId=2c640ff04c3c44fc978f9db4bf674052";
						} else if(this.menu_index == 3) {
							sessionStorage.setItem("userHandle", 1);
							this.$router.push('/classList');
						} else if(this.menu_index == 4) {
							sessionStorage.setItem("userHandle", 1);
							this.$router.push('/sportsData');
						} else if(this.menu_index == 5) {
							sessionStorage.setItem("userHandle", 1);
							this.$router.push('/orderList');
						}
					} else {
						Toast({
							message: res.data.msg,
						});
					}
				}).catch(error => {
					console.log(error)
				});
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
				transform: translateY(-50%);
				button:not(:last-child) {
					margin-bottom: 20px;
				}
			}
		}
	}
	
	.submit {
		font-size: 17px!important;
	}
	
	.form-container .form-group .form-contorl {
		border-radius: 0;
	}
</style>