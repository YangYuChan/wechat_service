<template>
	<div class="login-container">
		<section class="form-container">
			<el-form class="phoneForm clearfix" :model="ruleForm" :rules="rules" ref="ruleForm">
				<div class="form-group">
					<el-form-item prop="realName">
						<el-input v-model="ruleForm.realName" placeholder="真实姓名" class="form-contorl"></el-input>
					</el-form-item>
				</div>
				<div class="form-group">
					<el-form-item prop="phone">
						<el-input v-model="ruleForm.phone" placeholder="手机号" class="form-contorl"></el-input>
					</el-form-item>
				</div>
				<div class="form-group">
					<el-form-item prop="vaCode">
						<el-input v-model="ruleForm.vaCode" placeholder="输入验证码" class="form-contorl"></el-input>
					</el-form-item>

				</div>
				<div class="submit clearfix">
					<el-button @click.native="handleSubmit" class="fl-left reg-btn">确定</el-button>
					<el-button @click.native="getVaCode" class="fl-right reg-btn" v-if="!sendMsgDisabled">获取验证码</el-button>
					<span class="fl-right countdown" v-if="sendMsgDisabled">
                    {{time +"S"}}
                </span>
				</div>
			</el-form>
		</section>
	</div>
</template>

<script type="text/javascript">
	import AXIOS from '../axios/axios'
	import global_ from '../common/js/common'
	import valid from '../common/js/validate';
	import '../common/js/sha512.js'
	const Axios = new AXIOS();
	import { Toast } from 'mint-ui';
	export default {
		name: 'register2',
		data() {
			return {
				path: global_.path,
				time: 60,
				sendMsgDisabled: false,
				ruleForm: {
					phone: '',
					password: '',
					vaCode: '',
					realName: ''
				},
				openId: '',
				unionId: '',
				brandId: '',
				menu_index:null,
				rules: {
					phone: [{
						required: true,
						validator: valid.checkPhone,
						trigger: 'blur'
					}],
					vaCode: [{
						required: true,
						validator: valid.checkVaCode,
						trigger: 'blur'
					}],
					realName: [{
						required: true,
						validator: valid.checkRealName,
						trigger: 'blur'
					}],
				},
				userHandle: ''

			};
		},
		ready() {
			document.title = '绑定未度账号'
		},
		created() {
			this.menu_index = sessionStorage.getItem("menu_index");
			this.userHandle = sessionStorage.getItem('userHandle');
			this.openId = sessionStorage.getItem("openId");
			this.unionId = sessionStorage.getItem("unionId");
			this.brandId = sessionStorage.getItem("brandId");
			document.title = sessionStorage.getItem("brandName");
			if(this.userHandle == 1) {
				this.$router.go(-2)
			}
		},

		methods: {
			getVaCode() {
				this.$refs.ruleForm.validateField('phone', (error) => {
					if(error == '' || error == null) {
						this.$axios({
							url: this.path + 'vacode?phone=' + this.ruleForm.phone,
							method: 'post',
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
							}
						}).then(res => {
							if(res.data.code == 100000) {
								let me = this;
								me.sendMsgDisabled = true;
								let interval = window.setInterval(function() {
									if((me.time--) <= 0) {
										me.time = 60;
										me.sendMsgDisabled = false;
										window.clearInterval(interval);
									}
								}, 1000);
								Toast({
									message: '验证码发送成功',
								});
							} else if(res.data.code == 100011) {
								Toast({
									message: '验证码发送频繁，请稍后再发',
								});
							} else {
								Toast({
									message: '验证码发送失败,请重新发送',
								});
							}
						}).catch(error => {
							console.log(error)
						});
					}
				})
			},
			handleSubmit() {
				if(this.ruleForm.realName == '') {
					Toast({
						message: '真实姓名不能为空'
					});
					return false;
				} else if(this.ruleForm.realName.length > 10) {
					Toast({
						message: '姓名长度不能超过10个字符'
					});
					return false;
				}

				var reg = /^1[34578]\d{9}$/;
				if(this.ruleForm.phone == '') {
					Toast({
						message: '手机号码不能为空'
					});
					return false;
				} else if(!reg.test(this.ruleForm.phone)) {
					Toast({
						message: '手机号码格式不正确，请重新填写'
					});
					return false;
				};

				if(this.ruleForm.vaCode == '') {
					Toast({
						message: '验证码不能为空'
					});
					return false;
				}
				this.$axios({
					url: this.path + 'login',
					method: 'post',
					data: {
						phone: this.ruleForm.phone,
						realName: this.ruleForm.realName,
						vaCode: this.ruleForm.vaCode,
						type: 1,
						openid: this.openId,
						unionid: this.unionId,
						brandId: this.brandId,
					},
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					}
				}).then(res => {
					if(res.data.code == 0) {
						Toast({
							message: res.data.msg,
						});
						sessionStorage.setItem('token', res.data.result.token);
						sessionStorage.setItem('userId', res.data.result.userId);
						if(this.menu_index == 1) {
							sessionStorage.setItem("userHandle", 1);
							this.$router.push('/dymList');
						} else if(this.menu_index == 2) {
							sessionStorage.setItem("userHandle", 1);
							//location.href = 'http://commodity.weiduapi.com/app/login?userId='+ res.data.result.userId;
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
					} else if(res.data.code == 100016){
						sessionStorage.setItem("phone", this.ruleForm.phone);
						sessionStorage.setItem("realName", this.ruleForm.realName);
						sessionStorage.setItem("state", res.data.state);
						this.$router.push('/register');
					}else{
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
<style type="text/css">
	.reg-btn {
		background: transparent;
		border: none;
		outline: none;
		font-size: 18px!important;
		width: 50%;
		text-align: right;
	}
	
	.reg-btn span {
		font-size: 18px;
		font-weight: bold;
		letter-spacing: 1px;
	}
	
	.reg-btn:first-child {
		text-align: left;
	}
	
	.countdown {
		font-size: 14px;
	}
	
	.el-form {
		width: 100%;
	}
	
	.el-input__inner {
		background-color: transparent;
		border: none;
		text-align: center;
	}
	
	.el-input__inner::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		color: #333333;
	}
	
	.el-input__inner:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #333333;
	}
	
	.el-input__inner::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #333333;
	}
	
	.el-input__inner:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #333333;
	}
	
	.form-container .form-group .form-contorl {
		border-radius: 0;
	}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->