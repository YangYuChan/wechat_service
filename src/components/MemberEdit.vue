<template>
	<div class="member-add-container">
		<section class="add-info">
			<form action="">
				<div class="form-group">
					<span class="font">姓名：</span>
					<input v-model="form.name" type="text"  class="form-contorl" placeholder="姓名要求在2-10个字符之间"/>
				</div>
				<div class="form-group">
					<span class="font">手机号：</span>
					<input v-model="form.phone" type="text" class="form-contorl" placeholder="请输入11位手机号"/>
				</div>
				<div class="form-group" v-if="manTag == '0'">
					<span class="font">性别：</span>
					<span class="form-radio">
						<input v-model="form.man" type="radio" class="form-radio-input" value="男"  name="sex"> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="男">男</label>
					<span class="form-radio">
						<input v-model="form.man" type="radio" class="form-radio-input" value="女" name="sex"> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="女">女</label>
				</div>
				<div class="form-group" v-else>
					<span class="font">性别：</span>
					<span class="form-radio">
						<input v-model="form.man" type="radio" class="form-radio-input" value="男"  name="sex"> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="男">男</label>
					<span class="form-radio">
						<input v-model="form.man" type="radio" class="form-radio-input" value="女" name="sex"> 
						<span class="form-radio-core  checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="女">女</label>
				</div>
				<div class="form-group">
					<span class="font">推荐人：</span>
					<input v-model="form.referee" type="text" class="form-contorl" placeholder="请输入推荐人名称"/>
				</div>
				<div class="form-group" v-if="advanceTag == 1">
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
				<div class="form-group" v-else>
					<span class="font">预付：</span>
					<span class="form-radio">
						<input v-model="form.advance" type="radio" class="form-radio-input" value="是" name="advance"> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="是">是</label>
					<span class="form-radio">
						<input v-model="form.advance" type="radio" class="form-radio-input" value="否" name="advance"> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="否">否</label>
				</div>
				<div class="form-group">
					<span class="font">预付款：</span>
					<input v-model="form.money" type="text" class="form-contorl" style="width: 90px;"/>元
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
				token: '',
				userId: '',
				form: {
					name: '',
					phone: '',
					man: '',
					referee: '',
					advance: '',
					money: 0,
				},
				manTag: 0,
				advanceTag: 0,
				submitSex: 0,
			};
		},
		ready(){
			document.title = '会员编辑'
		},
		created() {
   		
        	
       	},
       	mounted() {
       		this.$nextTick(() => {
       			this.token = localStorage.getItem('token');
       			this.userId = sessionStorage.getItem('userId');
       			this.handleDom();
       			this.getUserInfo();
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
			getUserInfo(){
				global_.$options.exportSession(this.getList);
				this.$axios({
					url: this.path + 'member/' + this.userId,
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
						'Authorization':this.token,
					}
					
				}).then((res) => {
					global_.$options.exportSession(this.getList);
					if(res.data.code == 0){
						let member = res.data.member;
						this.form.name = member[0].name;
						this.form.phone = member[0].phone;
						this.manTag = member[0].sex;
						if(member[0].sex == 0){
							this.form.man = '男';
						}else{
							this.form.man = '女';
						}
						this.form.referee = member[0].referrer;
						this.advanceTag = member[0].hasAdvance;
						if(member[0].hasAdvance == 0){
							this.form.advance = '否';
						}else{
							this.form.advance = '是';
						}
						this.form.money = member[0].advanceAmount;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			submitForm(){
				global_.$options.exportSession(this.getList);
				MessageBox.confirm('是否保存修改?','').then(action => {
					if(this.form.man == '男'){
						this.submitSex = 0;
					}else{
						this.submitSex = 1;
					};
					
					this.$axios({
						url: this.path + 'member/update',
						method: 'post',
						data: {
							id: this.userId,
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
						if(res.data.code == 0){
							MessageBox.alert(res.data.message,'').then(action => {
								this.$router.push('/MemberList');
							});
						}else if(res.data.code == 100021){
							MessageBox.alert(res.data.message,'').then(action => {
								this.$router.push('/MemberList');
							});
						}else {
							MessageBox.alert(res.data.message,'');
						}
					}).catch((err) => {
						console.log(err);
					})
				});

			},

    }
	
	}
</script>

