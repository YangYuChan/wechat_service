<template>
	<div class="member-list-container">
		<header class="member-header clearfix">
			<div class="member-search clearfix">
				<div class="search">
					<i class="mintui mintui-search"></i>
					<input v-model="keyword" type="search" placeholder="输入姓名或手机号" class="mint-searchbar-core" @keyup.13="getQueryList">
					<i class="icon iconfont icon-chahao" style="display: none;"></i>
				</div>
				<a class="mint-searchbar-cancel" style="display: none;" @click="exitQueryList">取消</a>
			</div>
			<div class="user-info clearfix">
				<b class="username fl-left">{{ userName }}</b>
				<span class="usernum fl-right">全部人数：{{ count }}人</span>
			</div>
			<div class="button-group clearfix">
				<mt-button :class="{'active': index === ind }" v-for="(item, ind) in buttonList" type="default" @click="getTimeFilter(item, ind)">{{ item }}</mt-button>
			</div>
		</header>
		<section class="member-content">
			<div class="scroll-style" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
				<ul class="member-list">
					<li class="member-item" v-for="itemMemberList in memberList">
						<dl>
							<dt class="time">{{ itemMemberList.date }}</dt>
							<dd class="content" v-for="(itemMembers,ind) in itemMemberList.members">
								<span class="list-name" style="width: 22%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ itemMembers.name }}</span>
								<span style="width: 26%;">{{ itemMembers.phone }}</span>
								<span style="width: 25%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">预付<b style="color: #f05556;">{{ itemMembers.advanceAmount}}</b>元</span>
								<a style="width: 15%; text-align: center;" @click="userInfo(itemMembers)">
									查看
								</a>
							</dd>
						</dl>
					</li>
				</ul>
				<div class="load-text">{{ dropTip }}<img src="../../static/img/loading.gif" alt="" v-if="imgReveal"/></div>
			</div>
		</section>
		<footer class="member-add-btn" @click="addMember">
			添加
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
	export default {
		data() {
			return {
				path: global_.path,
				token:'',
				userName: '',
				buttonList: ['全部','本月','本周','今天'],
				index: 0,
				count: 0,  
				value: '',
				dateFilter: '',
				page: 1,
				limit: 20,
				keyword: '',
				memberList: [],
				topStatus: '',
				dropTip: '上拉加载更多……',
				busy: false,  
				imgReveal: true,
			};
		},
		ready(){
			document.title = '添加列表'
		},
		created(){
        	
       	},
       	mounted() {
       		this.$nextTick(() => {
       			this.token = localStorage.getItem('token');
       			this.userName = localStorage.getItem('username');
       			this.handleDom();
       			this.getMemberCount();
       			this.getMemberList();
       		});
       	},
       	computed: {
		    
		  },
		methods: {
			handleDom(){
				$(".mint-searchbar-core").on("focus",function(){
					$(".icon-chahao").css("display","block");
					$(".search").css("width","88%");
					$(".mint-searchbar-cancel").css("display","block");
				});
				$(".mint-searchbar-cancel").on("click",function(){
					$(".icon-chahao").css("display","none");
					$(".search").css("width","100%");
					$(".mint-searchbar-cancel").css("display","none");
				})
			},
			getMemberCount(){
				global_.$options.exportSession(this.getList);
				this.$axios({
					url: this.path + 'member/count',
					method: 'get',
					params: {
						keyword: this.keyword,
						dateFilter: this.dateFilter,
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
						this.count = res.data.count;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			getMemberList(){
				global_.$options.exportSession(this.getList);
				this.$axios({
					url: this.path + 'member/list',
					method: 'get',
					params: {
						keyword: this.keyword,
						dateFilter: this.dateFilter,
						page: this.page,
						limit: this.limit,
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
						let num = 0;
						res.data.list.forEach((val) => {
							this.memberList.push(val);
							val.members.forEach((value) => {
								num++;
							})
						})
						if(num == 0){
							this.imgReveal = false;
							this.dropTip = '暂无数据！';
						}else if(num > 0 && num < 20){
							this.imgReveal = false;
							this.dropTip = '已经到底啦!';
						}else {
							this.imgReveal = true;
							this.dropTip = '上拉加载更多……';
						}
						this.busy = false;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			loadMore() {
				global_.$options.exportSession(this.getList);
				let pageTotal = this.count/this.limit;
				if(this.page < pageTotal){
					this.busy = true;
					this.page++;
					this.$axios({
						url: this.path + 'member/list',
						method: 'get',
						params: {
							keyword: this.keyword,
							dateFilter: this.dateFilter,
							page: this.page,
							limit: this.limit,
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
							let num = 0;
							res.data.list.forEach((val) => {
								this.memberList.push(val);
								val.members.forEach((value) => {
									num++;
								})
							})
							if(num == 0){
								this.imgReveal = false;
								this.dropTip = '已经到底啦!';
							}else if(num > 0 && num < 20){
								this.imgReveal = false;
								this.dropTip = '已经到底啦!';
							}else {
								this.imgReveal = true;
								this.dropTip = '上拉加载更多……';
							}
							this.busy = false;
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			},
			handleTopChange(status) {    
		        this.topStatus = status;
		    },
		    getQueryList(){
		    	this.memberList.length = 0;
		    	this.page = 1;
		    	this.dropTip = "上拉加载更多……";
		    	this.imgReveal = true;
		    	this.getMemberCount();
		    	this.getMemberList();
		    },
		    exitQueryList(){
		    	this.memberList.length = 0;
		    	this.page = 1;
		    	this.keyword = '';
		    	this.dropTip="上拉加载更多……";
		    	this.imgReveal = true;
		    	this.getMemberCount();
		    	this.getMemberList();
		    },
		    getTimeFilter(item, ind){ //筛选时间
		    	this.index = ind;
		    	if(item == '全部'){
		    		this.memberList.length = 0;
			    	this.page = 1;
			    	this.dateFilter = '';
			    	this.dropTip="上拉加载更多……";
			    	this.imgReveal = true;
			    	this.getMemberCount();
			    	this.getMemberList();
		    	}else if(item == '本月'){
		    		this.memberList.length = 0;
			    	this.page = 1;
					this.dateFilter = 'MONTH';
					this.dropTip = "上拉加载更多……";
					this.imgReveal = true;
					this.getMemberCount();
					this.getMemberList();
		    	}else if(item == '本周'){
		    		this.memberList.length = 0;
			    	this.page = 1;
					this.dateFilter = 'WEEK';
					this.dropTip = "上拉加载更多……";
					this.imgReveal = true;
					this.getMemberCount();
					this.getMemberList();
		    	}else{
		    		this.memberList.length = 0;
			    	this.page = 1;
					this.dateFilter = 'TODAY';
					this.dropTip = "上拉加载更多……";
					this.imgReveal = true;
					this.getMemberCount();
					this.getMemberList();
		    	}
		    },
		    userInfo(itemDetails){
		    	sessionStorage.setItem('userId',itemDetails.id);
		    	this.$router.push('/MemberDetails');
		    },
		    addMember(){
		    	this.$router.push('/MemberAdd'); 
		    }
    }
	
	}
</script>
<style lang="scss">
	.content {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.mint-loadmore{
		background: #f1f1f1;
	}
	.scroll-style {
		overflow-y: auto;
		max-height: 470px;
	}
	.load-text {
		display: flex;
    	justify-content: center;
    	align-items: center;
		margin-bottom:  0.4000rem;
		text-align: center;
		font-size: 12px;	
		height: 0.8000rem;
		img {
			margin: 0 0.2rem;
			width: 0.5rem;
			height: 0.5rem;
		}
	}
	.member-list-container .member-content .member-item:last-child {
		margin-bottom: 0.4000rem;
		overflow: hidden;
	}
	.active {
		background: #fc0 !important;
		color: #333 !important;
	}
</style>


