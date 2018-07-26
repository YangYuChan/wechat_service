<template>
	<div class="member-add-container">
		<section class="add-info">
			<form action="">
				<div class="form-group">
					<span class="font">姓名：</span>
					<input v-model="form.name" type="text" class="form-contorl" placeholder="姓名要求在2-10个字符之间"/>
				</div>
				<div class="form-group">
					<span class="font">手机号：</span>
					<input v-model="form.phone" type="text" class="form-contorl" placeholder="请输入11位手机号"/>
				</div>
				<div class="form-group">
					<span class="font">性别：</span>
					<span class="form-radio">
						<input v-model="form.man" type="radio" class="form-radio-input" value="男" name="sex"> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="男">男</label>
					<span class="form-radio">
						<input v-model="form.man" type="radio" class="form-radio-input" value="女" name="sex"> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="女">女</label>
					
				</div>
				<div class="form-group">
					<span class="font">推荐人：</span>
					<input v-model="form.referee" type="text" class="form-contorl" placeholder="请输入推荐人姓名"/>
				</div>
				<div class="form-group">
					<span class="font">预付：</span>
					<span class="form-radio">
						<input v-model="form.advance" type="radio" class="form-radio-input" value="是" name="advance"> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="是">是</label>
					<span class="form-radio">
						<input v-model="form.advance" type="radio" class="form-radio-input" value="否" name="advance"> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="否">否</label>
				</div>
				<div class="form-group">
					<span class="font">预付款：</span>
					<input v-model="form.money" type="text" class="form-contorl" style="width: 90px;" placeholder="请输入金额"/>元
				</div>
			</form>
		</section>
		<footer class="member-add-btn" @click="submitForm">
			确定
		</footer>
	</div>
</template>

<script>
	import AXIOS from '../axios/axios'
	import global_ from '../common/js/common'
	import '../common/js/sha512.js'
	const Axios = new AXIOS();
	import $ from 'jquery';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				path: global_.path,
				form: {
					name: '',
					phone: '',
					man: '女',
					referee: '',
					advance: '是',
					money: 0,
				},
				submitSex: 0,
				
			};
		},
		ready(){
			document.title = '会员添加'
		},
		created() {
   		
        	
       	},
       	mounted() {
       		this.$nextTick(() => {
       			this.token = localStorage.getItem('token');
       			this.handleDom();
       		});
       	},
       	computed: {
		    
		  },
		methods: {
			handleDom(){
				$(".form-radio").each(function(){
					$(this).on("click",function(){
						var r = $(this).find(".form-radio-input");
						if(r.is(":checked")){
							$(this).siblings().find(".form-radio-core").removeClass("checked")
							r.siblings(".form-radio-core").addClass("checked");
						}else{
						}
					});
				})
				
			},
			submitForm(){
				global_.$options.exportSession(this.getList);
				let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
				let nameReg = /^[\d\w\u4e00-\u9fa5,\.;\:"'?!\-]{2,10}$/;
				if(this.form.phone == ''){ Toast('请输入手机号'); return ; }
				if(!telReg.test(this.form.phone)){ Toast('请输入正确的手机号'); return ; }
				if(this.form.name == ''){ Toast('请输入名称'); return ; }
				if(!nameReg.test(this.form.name)){ Toast('请输入正确的名称'); return ; }
				if(this.form.man == '男'){
					this.submitSex = 0;
				}else{
					this.submitSex = 1;
				}
				this.$axios({
					url: this.path + 'member/add',
					method: 'put',
					data: {
						name: this.form.name,
						phone: this.form.phone,
						sex: this.submitSex,
						referrer: this.form.referee,
						advanceAmount: this.form.money,
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
				}).then((res) => {
					if(res.data.code == 100021){
						MessageBox.confirm('是否添加到我的销售跟进?','该手机号会员已存在').then(action => {
							this.$axios({
								url: this.path + 'member/salefollow/add',
								method: 'put',
								data: {
									phone: this.form.phone,
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
							}).then((res) => {
								if(res.data.code == 0){
									MessageBox.alert(res.data.message,'');
									this.$router.push('/MemberList');
								}else{
									MessageBox.alert(res.data.message,'');
									return ;
								}
							}).catch((err) => {
								console.log(err);
							})
						});
					}else if(res.data.code == 0){
						MessageBox.alert('添加成功','').then(action => {
							this.$router.push('/MemberList');
						});
					}else {
						MessageBox.alert(res.data.message,'');
					}					
				}).catch((err) => {
					console.log(err);
				})
				
			}

    }
	
	}
</script>

<style>
</style>