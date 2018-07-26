<template>
	<div class="member-add-container">
		<section class="add-info">
			<form action="">
				<div class="form-group">
					<span class="font">姓名：</span>
					<input v-model="form.name" type="text" class="form-contorl" placeholder="姓名要求在2-10个字符之间" disabled/>
				</div>
				<div class="form-group">
					<span class="font">手机号：</span>
					<input v-model="form.phone" type="text" class="form-contorl" placeholder="请输入手机号" disabled/>
				</div>
				<div class="form-group form-check-group" v-if="form.man == 0">
					<span class="font">性别：</span>
					<span class="form-radio">
						<!--<input v-model="form.man" type="radio" class="form-radio-input" value="男" name="sex">--> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="男">男</label>
					<span class="form-radio">
						<!--<input v-model="form.man" type="radio" class="form-radio-input" value="女" name="sex">--> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="女">女</label>
				</div>
				<div class="form-group form-check-group" v-else>
					<span class="font">性别：</span>
					<span class="form-radio">
						<!--<input v-model="form.man" type="radio" class="form-radio-input" value="男" name="sex">--> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="男">男</label>
					<span class="form-radio">
						<!--<input v-model="form.man" type="radio" class="form-radio-input" value="女" name="sex">--> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="女">女</label>
				</div>
				<div class="form-group">
					<span class="font">推荐人：</span>
					<input v-model="form.referee" type="text" class="form-contorl" placeholder="请输入推荐人姓名" disabled/>
				</div>
				<div class="form-group form-check-group" v-if="form.advance == 1">
					<span class="font">预付：</span>
					<span class="form-radio">
						<!--<input v-model="form.advance" type="radio" class="form-radio-input" value="是" name="advance">--> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="是">是</label>
					<span class="form-radio">
						<!--<input v-model="form.advance" type="radio" class="form-radio-input" value="否" name="advance">--> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="否">否</label>
				</div>
				<div class="form-group form-check-group" v-else>
					<span class="font">预付：</span>
					<span class="form-radio">
						<!--<input v-model="form.advance" type="radio" class="form-radio-input" value="是" name="advance">--> 
						<span class="form-radio-core"><i></i></span>
					</span> 
					<label class="form-radio-label" for="是">是</label>
					<span class="form-radio">
						<!--<input v-model="form.advance" type="radio" class="form-radio-input" value="否" name="advance">--> 
						<span class="form-radio-core checked"><i></i></span>
					</span> 
					<label class="form-radio-label" for="否">否</label>
				</div>
				<div class="form-group">
					<span class="font">预付款：</span>
					<input v-model="form.money" type="text" class="form-contorl" style="width: 90px;" placeholder="请输入金额" disabled/>元
				</div>
			</form>
		</section>
		<footer class="member-add-btn" @click="memberEdit">
			编辑
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
				form: {
					name: '',
					phone: '',
					man: '',
					referee: '',
					advance: '是',
					money: 0,
				},
				userId:'',
			};
		},
		ready(){
			document.title = '会员查看'
		},
		created() {
   		
        	
       	},
       	mounted() {
       		this.$nextTick(() => {
       			this.token = localStorage.getItem('token');
       			this.userId = sessionStorage.getItem('userId');
       			this.handleDom();
       		});
       	},
       	computed: {
		    
		  },
		methods: {
			handleDom(){
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
					if(res.data.code == 0){
						let member = res.data.member;
						this.form.name = member[0].name;
						this.form.phone = member[0].phone;
						this.form.man = member[0].sex;
						this.form.referee = member[0].referrer;
						this.form.advance = member[0].hasAdvance;
						this.form.money = member[0].advanceAmount;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			memberEdit(){
				this.$router.push('/MemberEdit');
			},
			
			
    }
	
	}
</script>

<style>
</style>