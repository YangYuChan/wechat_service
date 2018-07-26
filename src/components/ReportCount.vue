<template>
	<div class="course-wrap" style="margin-top: 1px;">
		<div style="width: 100%; height: 1.6rem"></div>
		<div class="select-wrap">
			<div class="date-select" @click="dateToggle">{{ selectTitleDate }}<i class="iconfont icon-down arrow"></i></div>
			<ul class="date-list">
				<li @click="selectDate(item, ind)" v-for="(item, ind) in list">
					{{ item.name }}({{ item.startDate }})
					<span v-if="item.name != '今日'"> 至 ({{ item.endDate }})</span><span v-else></span>
					<div class="size"><i class="iconfont icon-xuanzhong size" v-show="ind == index"></i></div>
				</li>
			</ul>
		</div>
		<div class="count">
			<p>共收入(元)</p>
			<p class="num-color">{{ countIncome }}</p>
		</div>
		<ul class="info-list">
			<li>
				<div>会员卡销售</div>
				<div class="num"><span class="num-color">{{ cardIncome }}</span>元</div>
			</li>
			<li>
				<div>私教课销售</div>
				<div class="num"><span class="num-color">{{ personalClassIncome }}</span>元</div>
			</li>
			<li style="border: none;">
				<div>团课销售</div>
				<div class="num"><span class="num-color">{{ leagueClassIncome }}</span>元</div>
			</li>
		</ul>
		<div class="shadow" v-if="dateFlag == true"></div>
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
//        token: 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5mZW5nIiwiYXVkIjoiODRiYjRkN2M5ZjhmNDViMWJmOWQ5MmM3MGZlZWViOTUiLCJyb2xlIjoiUk9MRV9NRVJDSEFOVCIsImlzcyI6ImNvcmVmYWMiLCJzeXMiOnRydWUsImV4cCI6MTUyMjU3MDMxOH0.vdHpVR0173FFFKEPOHfEUywKOaoxui2j8nTs7UeqGSjj4f0q2Q1drVKfiv6LsKOcpY30QNY9E-7PZKuTwgTtOg',
				selectTitleDate: '',
				today: '',
				week: {
					startDate: '',
					endDate: '',
				},
				month: {
					startDate: '',
					endDate: '',
				},
				year: {
					startDate: '',
					endDate: '',
				},
				list: [],
				index: 0,
				cardIncome: 0,
				countIncome: 0,
				leagueClassIncome: 0,
				personalClassIncome: 0,
				dateFlag: false,

			};
		},
		ready(){
			document.title = '课程报表'
		},
		created(){

       	},
       	mounted() {
       		this.$nextTick(() => {
     			this.token = localStorage.getItem('token');
          this.getDate();
          this.getCourseInfo();
       		});
       	},
		methods: {
			time(value) {
		        var date = new Date(value),
		        y = date.getFullYear(),
		        m = date.getMonth() + 1,
		        d = date.getDate();
		        if (m < 10) {
		          m = '0' + m;
		        }
		        if (d < 10) {
		          d = '0' + d;
		        }
		        //  获取时间格式 2017-01-03 10:13:48
		        var t = y + '-' + m + '-' + d;
		        //  获取时间格式 2017-01-03
		        //	var t = y + '-' + m + '-' + d;
		        return t;
		   	},
		   	getMonDate() {
		        var d=new Date(),
		            day=d.getDay(),
		            date=d.getDate();
		        if(day==1)
		            return d;
		        if(day==0)
		            d.setDate(date-6);
		        else
		            d.setDate(date-day+1);
		        return d;
		    },
			getDate(){
				let myDate = new Date();
				let d = myDate.getDate();
				let m = myDate.getMonth() + 1;
				let y = myDate.getFullYear();
				if(m < 10) {
					m = '0' + m;
				}
				if( d < 10) {
					d = '0' + d;
				}
				this.selectTitleDate = '今日' + '(' + this.time(myDate) + ')';
				this.today = this.time(myDate);
				this.week.startDate = this.time(this.getMonDate());
				this.week.endDate = this.today;
				this.month.startDate = y + '-' + m + '-' + '01';
				this.month.endDate = this.today;
				this.year.startDate = y + '-' + '01-01';
				this.year.endDate = this.today;
				let obj1 = {
					name: '今日',
					startDate: this.today,
				};
				let obj2 = {
					name: '本周',
					startDate: this.week.startDate,
					endDate: this.week.endDate,
				};
				let obj3 = {
					name: '本月',
					startDate: this.month.startDate,
					endDate: this.month.endDate,
				};
				let obj4 = {
					name: '本年',
					startDate: this.year.startDate,
					endDate: this.month.endDate,
				};
				this.list.push(obj1);
				this.list.push(obj2);
				this.list.push(obj3);
				this.list.push(obj4);
			},
			dateToggle (){
				if(this.dateFlag == false){
					$('.date-list').slideDown(500);
					$('.arrow').removeClass("rotate1"); //再次点击箭头回来
                	$('.arrow').addClass("rotate");
                	this.dateFlag = true;
				}else {
					$('.date-list').slideUp(500);
					$('.arrow').removeClass("rotate");
                	$('.arrow').addClass("rotate1");
                	this.dateFlag = false;
				}
			},
			selectDate(item, ind){
				this.index = ind;
				if(ind == 0){
					this.selectTitleDate = item.name + item.startDate;
				}else{
					this.selectTitleDate = item.name + '(' + item.startDate + ')' + ' 至 ' + '(' + item.endDate + ')';
				}
				$('.date-list').slideUp(500);
				$('.arrow').removeClass("rotate");
                $('.arrow').addClass("rotate1");
                this.dateFlag = false;
				this.getCourseInfo();

			},
			getCourseInfo(){
				global_.$options.exportSession(this.getCourseInfo);
				this.$axios({
					url: this.path + 'index/table/income',
					method: 'get',
					params: {
						startTime: '',
						endStart: '',
						rule: this.index + 1,
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
						this.cardIncome = res.data.result.cardIncome;
						this.countIncome = res.data.result.countIncome;
						this.leagueClassIncome = res.data.result.leagueClassIncome;
						this.personalClassIncome = res.data.result.personalClassIncome;
					}else {
						alert(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
    	}
	}

</script>
<style lang="scss" scoped>
[v-cloak] {
    display: none;
}
.course-wrap {
	font-size: 14px;
}
  .course-wrap {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>





