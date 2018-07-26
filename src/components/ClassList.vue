<template>
	<div class="class-container">
		<div class="class-header clearfix">
			<div class="curr-day fl-left">
				今天:{{month}}月{{date}}日-{{week}}
			</div>
			<div class="nav fl-right">
		      <mt-button size="small" @click="classList" v-bind:class="{ active: isActive }">课程表</mt-button>
		      <mt-button size="small" @click="allList" v-bind:class="{ active: isLActive }">列表</mt-button>
		    </div>
		</div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active">
        <mt-tab-container-item id="tab-container1">
         <div class="time-list">
						<p class="curr"><span class="text">{{firstDayFormat}}-{{lastDayFormat}}</span>&nbsp;<i class="icon iconfont icon-arrow-down"></i></p>
						<ul class="time-ul">
							<li class="time-item" @click="firstWeek" id="firstWeek">{{firstDayFormat}}-{{lastDayFormat}}</li>
							<li class="time-item" @click="nextWeek(lastDay,firstArgsNextDayFormat)" id="secondWeek">{{firstNextDayFormat}}-{{lastNextDayFormat}}</li>
							<li class="time-item" @click="nextWeek(lastNext,threeArgsDayFormat)" id="threeWeek">{{threeDayFormat}}-{{threeLastDayFormat}}</li>
						</ul>
					</div>
           <mt-navbar class="page-part" v-model="selected">
		
	    	</mt-navbar>
	    	 
	    	 <mt-tab-container v-model="selected">
	    	
		      <mt-tab-container-item id="1">
		        <dl class="class-list" v-if="classData1 != null && classData1 !=''">
		        	<dd class="class-item clearfix" v-for="item in classData1">
		        		<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				
				</dd>
		        </dl>
		        <div v-else class="noClassDate">今天没有课程安排！</div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="2">
		        <dl class="class-list" v-if="classData2 != null && classData2 !=''">
		        	<dd class="class-item clearfix" v-for="item in classData2">
					<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				</dd>
		        </dl>
		        <div v-else class="noClassDate">今天没有课程安排！</div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="3">
		        <dl class="class-list" v-if="classData3 != null && classData3 !=''">
		        <dd class="class-item clearfix" v-for="item in classData3">
					<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				</dd>
		        </dl>
		        <div v-else class="noClassDate">今天没有课程安排！</div>
		      </mt-tab-container-item>
		       <mt-tab-container-item id="4">
		         <dl class="class-list" v-if="classData4 != null && classData4 !=''">
		        	<dd class="class-item clearfix" v-for="item in classData4">
					<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				</dd>
		        </dl>
		        <div v-else class="noClassDate">今天没有课程安排！</div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="5">
		        <dl class="class-list" v-if="classData5 != null && classData5 !=''">
		        	<dd class="class-item clearfix" v-for="item in classData5">
					<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				</dd>
		        </dl>
		        <div v-else class="noClassDate">今天没有课程安排！</div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="6">
		         <dl class="class-list" v-if="classData6 != null && classData6 !=''">
		        	<dd class="class-item clearfix" v-for="item in classData6">
					<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				</dd>
		        </dl>
		        <div v-else class="noClassDate">今天没有课程安排！</div>
		      </mt-tab-container-item>
		       <mt-tab-container-item id="7">
		        <dl class="class-list" v-if="classData7 != null && classData7 !=''">
					<dd class="class-item clearfix" v-for="item in classData7">
					<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,3)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				</dd>
		        </dl>
		        <div v-else class="noClassDate">今天没有课程安排！</div>
		      </mt-tab-container-item>
		    </mt-tab-container>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
        	<div class="border-top"></div>
          <div class="page-loadmore-wrapper"  v-if="ClassListData != null && ClassListData !=''">
      	<mt-loadmore ref="loadmore">   
      		<div class="container">
          <dl class="class-list">
					<dd class="class-item clearfix"  v-for="item in ClassListData">
					<div v-if="item.classKind == 3" @click="selectGroupClassDetails(item.classScheduleId,2)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
		        		
		        		<div v-else-if="item.classKind == 2" @click="selectClassDetails(item.classId,2)">
		        			<div class="class-pic fl-left"><img :src="item.classPath" alt="" onerror="this.src='../../static/img/default-pic.jpg'"/></div>
		        			<div class="class-msg fl-left">
		        				<h2 class="class-name clearfix">
		        					<span class="icon-money fl-left" v-if="item.isFree == false">付费</span>
		        					<span class="icon-money fl-left" v-if="item.classKind == 2">私教</span>
		        					<span class="name fl-left">{{item.className}}</span>
		        				</h2>
		        				<p class="class-info">{{item.beginTime}}</p>
		        				<p class="dym-name">{{item.coachName}}</p>
		        			</div>
		        		</div>
				</dd>
				<div slot="bottom" class="mint-loadmore-bottom">
										<span v-show="topStatus !== 'drop'" @click="getPrivateClass">{{buttomTip}}</span>
									</div>
		        </dl>
		        
      		</div>
		         </mt-loadmore>
    </div>
    <div v-show='noPrivateClassDate' class="noClassDate">还没有课程哦，快去预约吧！</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

	</div>
</template>

<script>
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common';
	import { Indicator } from 'mint-ui';
	const Axios = new AXIOS();
	import $ from 'jquery';
	export default {
         data(){
        	return {
        		path: global_.path,
        		active:'tab-container1',
        		selected: '1',
        		token:'',
        		isActive: true,
        		total:0,
        		isActive: true,
        		isLActive:false,
        		//一周的课程
        		classData1:'',
        		classData2:'',
        		classData3:'',
        		classData4:'',
        		classData5:'',
        		classData6:'',
        		classData7:'',
        		ClassListData:[],
        		
        		pageSize: 15,
				pageNum: 1,
				allLoaded: false,
		        topStatus:"",
		        wrapperHeight: 0,
		        noData:false,
		        noPrivateClassDate:false,
		        buttomTip:'点击加载更多',
		        noMoreData:'',
        		
		        //日期变量
		        parmaDate:'',
		        year:'',
		        month: '',
				date: '',
				week: '',
				weeklist: false,
				aryDay: '', //显示星期
				lastDay: '', //第一周最后一天
				firstDay: '', //第一周第一天
				lastDayFormat: '', //第一周最后一天格式化
				firstDayFormat: '', //第一周第一天格式化
				firstNext: '', //第二周第一天
				lastNext: '', //第二周最后一天
				lastNextDayFormat: '', //第二周最后一天格式化
				firstNextDayFormat: '', //第二周第一天格式化
				threeDay: '', //第三周第一天
				threeLast: '', //第三周最后一天
				threeDayFormat: '', //第三周第一天
				threeLastDayFormat: '', //第三周第二天
				lastNextDay: '',
				firstNextDay: '',
				
				firstArgsDayFormat:'',
				lastArgsDayFormat:'',
				firstArgsNextDayFormat:'',
				lastArgsNextDayFormat:'',
				threeArgsDayFormat:'',
				threeArgsLastDayFormat:'',
				
				onDay: '', //一天
				curr: '',
				passParameter:'',
				nowDate:'',
		        dateState:'',
		        lastweekday:'',
				lastweekDate:'',
				classType:''
        	}
        },
        created(){
        	this.token = sessionStorage.getItem('token');
        	document.title = sessionStorage.getItem("brandName");
//			this.userId = localStorage.getItem('userId');
        },
        mounted(){
        	this.openIndicatorWithSpinner();
        	this.sysTime();
        	this.parmaDate = this.year +'-'+ this.month +'-'+ this.date;
			this.$nextTick(() => {
				this.pageNum = 1;
				this.ClassListData = [];
				
				this.getPrivateClass();
				var classType = sessionStorage.getItem('classType');
					if(classType == 2) {
						this.active = "tab-container2";
						this.isActive = false;
						this.isLActive = true;
						this.firstWeek();
					} else if(classType == 3) {
						console.log('走课程表')
					var begin = sessionStorage.getItem('beginTime');
					var end = sessionStorage.getItem('endTime');
					console.log('begin'+begin)
						if(begin) {
							var bmonth = begin.slice(0, 2);
							var bdates = begin.slice(3, 5);
							var emonth = end.slice(0, 2);
							var edates = end.slice(3, 5);
							this.parmaDate = this.year + '-' + bmonth + '-' + bdates;
							$(".time-list").find(".text").text(begin + '-' + end);
							var day = sessionStorage.getItem('day');
							var s = sessionStorage.getItem('selectDate');
							console.log('day'+day)
							if(day) {
								console.log('走二三周')
								this.nextWeekBack(day, s);
							} else {
								console.log('走第一周')
								this.firstWeekBack();
							}
						} else {
							console.log('begin不存在')
							this.firstWeek();
						}
						this.active = "tab-container1";
						this.isActive = true;
						this.isLActive = false;
					}else{
						console.log('classType不存在')
						this.firstWeek();
						this.active = "tab-container1";
						this.isActive = true;
						this.isLActive = false;
					}
				this.initDate();
				this.domHandle();
				
			});
		},
        methods: {
        	classList(){
        		this.active = "tab-container1";	
        		this.isActive = true;
        		this.isLActive = false;
        	},
        	allList(){
        		this.active = "tab-container2";
        		this.isActive = false;
        		this.isLActive = true;
        	},
        	//获取当前日期
        	sysTime() {
			var curr = new Date(); //获取日期对象
			this.year = curr.getYear()+1900;
			this.month = curr.getMonth() + 1; //获得月份
			this.date = curr.getDate(); //获得日
			this.nowDate = this.year+'/'+this.month+'/'+this.date;
			var day = curr.getDay(); //获得星期，day代表的是本周的第几天[0,6]
			var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
			this.week = arr_week[day];
	        if(this.month < 10){
	        	this.month = "0" + this.month;
	        }
	        if(this.date < 10){
	        	this.date = "0" + this.date;
	        }
		},
		domHandle() {
				var self = this;
				//默认显示当前日期的数据
				var index = $(".is-selected").index();
				$(".is-selected").parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").hide();
				$(".is-selected").parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").eq(index).show();
				//切换周
				$(".curr").on("click", function() {
					if($(".time-ul").is("visible")) {
						$(".time-ul").hide();
					} else {
						$(".time-ul").show();
					}
					$(document).one("click", function() {
						$(".time-ul").hide();
					});
					event.stopPropagation();
				});
				$(".time-ul").on("click", ".time-item", function() {
					$(".curr > .text").text($(this).text());
					$(".time-ul").hide();
				});
				//切换不同日期的数据
				$(".mint-navbar").on("click", ".mint-tab-item", function(event) {
					var passed = $(this).hasClass("is-passed");
					if(passed == false) {
						var index = $(this).index();
						$(this).siblings(".mint-tab-item").removeClass("is-selected");
						$(this).addClass("is-selected");
						$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").hide();
						$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").eq(index).show();
					}
				});
			},
		CompareDate(d1,d2)
		{
		  return ((new Date(d1.replace(/\//g,"\/"))) < (new Date(d2.replace(/\//g,"\/"))));
		},
		firstWeek() {
				console.log('走的默认第一周的')
				this.lastweekday = '';
				this.curr = new Date();
				var year, weeks, month, dates, format;
				this.aryDay = new Array("日", "一", "二", "三", "四", "五", "六");
				$(".mint-navbar").html("");
				for(var i = 0; i < 7; i++) {
					this.onDay = this.getDays()[i];
					year = this.onDay.getYear() + 1900;
					weeks = this.onDay.getDay(); //获取每一天是星期几
					month = this.onDay.getMonth() + 1;
					dates = this.onDay.getDate();
					if(month < 10) {
						month = "0" + month;
					}
					if(dates < 10) {
						dates = "0" + dates;
					}
					$(".mint-navbar").append('<a class="mint-tab-item">' +
						'<div class="mint-tab-item-icon"></div>' +
						'<div class="mint-tab-item-label">' +
						'<span class="default">' + this.aryDay[weeks] + '</span>' +
						'<div class="tab-selected">' +
						'<span class="date">' + month + '.' + dates + '</span>' +
						'<span class="day">周' + this.aryDay[weeks] + '</span>' +
						'</div>' +
						'</div>' +
						'</a>');
					this.dateState = this.CompareDate(this.onDay.toLocaleDateString(), this.nowDate);
					var state = this.dateState;
					if(this.onDay.toLocaleDateString() == this.curr.toLocaleDateString()) {
						$(".mint-navbar").find(".mint-tab-item").eq(i).addClass('is-selected');
						$(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").hide();
						$(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").eq(i).show();
					} else if(state) {
						$(".mint-navbar").find(".mint-tab-item").eq(i).addClass("is-passed");
					}
				}
				this.parmaDate = year + '-' + month + '-' + dates;
				this.getTeamData(this.parmaDate);
			},
			firstWeekBack() {
				this.lastweekday = ''
				this.curr = new Date();
				var year, weeks, month, dates, format;
				var index = sessionStorage.getItem('index');
				this.aryDay = new Array("日", "一", "二", "三", "四", "五", "六");
				$(".mint-navbar").html("");
				for(var i = 0; i < 7; i++) {
					this.onDay = this.getDays()[i];
					year = this.onDay.getYear() + 1900;
					weeks = this.onDay.getDay(); //获取每一天是星期几
					month = this.onDay.getMonth() + 1;
					dates = this.onDay.getDate();
					if(month < 10) {
						month = "0" + month;
					}
					if(dates < 10) {
						dates = "0" + dates;
					}
					$(".mint-navbar").append('<a class="mint-tab-item">' +
						'<div class="mint-tab-item-icon"></div>' +
						'<div class="mint-tab-item-label">' +
						'<span class="default">' + this.aryDay[weeks] + '</span>' +
						'<div class="tab-selected">' +
						'<span class="date">' + month + '.' + dates + '</span>' +
						'<span class="day">周' + this.aryDay[weeks] + '</span>' +
						'</div>' +
						'</div>' +
						'</a>');

					this.dateState = this.CompareDate(this.onDay.toLocaleDateString(), this.nowDate);
					var state = this.dateState;
					if(this.onDay.toLocaleDateString() == this.curr.toLocaleDateString()) {
						$(".mint-navbar .mint-tab-item").each(function() {
							$(".mint-navbar .mint-tab-item").eq(index).addClass("is-selected");
							$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").hide();
							$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").eq(index).show();
						})
					} else if(state == false) {
						$(".mint-navbar .mint-tab-item").each(function() {
							$(".mint-navbar .mint-tab-item").eq(index).addClass("is-selected");
							$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").hide();
							$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").eq(index).show();
						})
					} else if(state) {
						$(".mint-navbar").find(".mint-tab-item").eq(i).addClass("is-passed");
					}
				}
				this.parmaDate = year + '-' + month + '-' + dates;
				this.getTeamData(this.parmaDate);
			},
			//第二周 三周
			nextWeek(day, selectDate) {
				this.lastweekday = day;
				this.lastweekDate = selectDate;
				var weeks, month, dates, year;
				this.aryDay = new Array("日", "一", "二", "三", "四", "五", "六");
				$(".mint-navbar").html("");
				for(var i = 0; i < 7; i++) {
					this.onDay = this.getNextWeekDatas(day)[i];
					weeks = this.onDay.getDay(); //获取每一天是星期几
					month = this.onDay.getMonth() + 1;
					dates = this.onDay.getDate();
					if(month < 10) {
						month = "0" + month;
					}
					if(dates < 10) {
						dates = "0" + dates;
					}
					$(".mint-navbar").append('<a class="mint-tab-item">' +
						'<div class="mint-tab-item-icon"></div>' +
						'<div class="mint-tab-item-label">' +
						'<span class="default">' + this.aryDay[weeks] + '</span>' +
						'<div class="tab-selected">' +
						'<span class="date">' + month + '.' + dates + '</span>' +
						'<span class="day">周' + this.aryDay[weeks] + '</span>' +
						'</div>' +
						'</div>' +
						'</a>');
				}
				$(".mint-navbar .mint-tab-item").each(function() {
					$(".mint-navbar .mint-tab-item").eq(0).addClass("is-selected");
					$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").hide();
					$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").eq(0).show();
				})

				let fyear, fmonth, fdate, format;
				fyear = selectDate.substring(0, 4);
				fmonth = selectDate.substring(5, 7);
				fdate = selectDate.substring(8, 10);
				this.parmaDate = fyear + '-' + fmonth + '-' + fdate;
				this.getTeamData(this.parmaDate);
			},
			nextWeekBack(day, selectDate) {
				this.lastweekday = day;
				this.lastweekDate = selectDate;
				var weeks, month, dates, year;
				var index = sessionStorage.getItem('index');
				this.aryDay = new Array("日", "一", "二", "三", "四", "五", "六");
				$(".mint-navbar").html("");
				for(var i = 0; i < 7; i++) {
					this.onDay = this.getNextWeekDatas(day)[i];
					weeks = this.onDay.getDay(); //获取每一天是星期几
					month = this.onDay.getMonth() + 1;
					dates = this.onDay.getDate();
					if(month < 10) {
						month = "0" + month;
					}
					if(dates < 10) {
						dates = "0" + dates;
					}
					$(".mint-navbar").append('<a class="mint-tab-item">' +
						'<div class="mint-tab-item-icon"></div>' +
						'<div class="mint-tab-item-label">' +
						'<span class="default">' + this.aryDay[weeks] + '</span>' +
						'<div class="tab-selected">' +
						'<span class="date">' + month + '.' + dates + '</span>' +
						'<span class="day">周' + this.aryDay[weeks] + '</span>' +
						'</div>' +
						'</div>' +
						'</a>');
				}
				$(".mint-navbar .mint-tab-item").each(function() {
					$(".mint-navbar .mint-tab-item").eq(index).addClass("is-selected");
					$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").hide();
					$(this).parent(".mint-navbar").siblings(".mint-tab-container").find(".mint-tab-container-item").eq(index).show();
				})
				let fyear, fmonth, fdate, format;
				fyear = selectDate.substring(0, 4);
				fmonth = selectDate.substring(5, 7);
				fdate = selectDate.substring(8, 10);
				this.parmaDate = fyear + '-' + fmonth + '-' + fdate;
				this.getTeamData(this.parmaDate);
			},
		initDate() {
				this.firstDay = this.getDays()[0];
				this.lastDay = this.getDays()[6];

				//第一周格式化
				let firstYear, firstMonth, firstDay, firstLastYear, firstLastMonth, firstLastDay;
				firstYear = this.firstDay.getYear() + 1900;
				firstMonth = this.firstDay.getMonth() + 1;
				firstDay = this.firstDay.getDate();

				firstLastYear = this.lastDay.getYear() + 1900;
				firstLastMonth = this.lastDay.getMonth() + 1;
				firstLastDay = this.lastDay.getDate()
				if(firstMonth < 10) {
					firstMonth = "0" + firstMonth;
				}
				if(firstDay < 10) {
					firstDay = "0" + firstDay;
				}
				if(firstLastMonth < 10) {
					firstLastMonth = "0" + firstLastMonth;
				}
				if(firstLastDay < 10) {
					firstLastDay = "0" + firstLastDay;
				}
				this.firstDayFormat = firstMonth + '月' + firstDay + '日'; //本周的第一天
				this.lastDayFormat = firstLastMonth + '月' + firstLastDay + '日'; //本周的最后一天

				this.firstArgsDayFormat = firstYear + '年' + firstMonth + '月' + firstDay + '日'; //本周的第一天
				this.lastArgsDayFormat = firstLastYear + '年' + firstLastMonth + '月' + firstLastDay + '日'; //本周的最后一天

				//第二周格式化
				this.firstNext = this.getNextWeekDatas(this.lastDay)[0];
				this.lastNext = this.getNextWeekDatas(this.lastDay)[6];

				let secondYear, secondMonth, secondDay, secondLastYear, secondLastMonth, secondLastDay;
				secondYear = this.firstNext.getYear() + 1900;
				secondMonth = this.firstNext.getMonth() + 1;
				secondDay = this.firstNext.getDate();

				secondLastYear = this.lastNext.getYear() + 1900;
				secondLastMonth = this.lastNext.getMonth() + 1;
				secondLastDay = this.lastNext.getDate()

				if(secondMonth < 10) {
					secondMonth = "0" + secondMonth;
				}
				if(secondDay < 10) {
					secondDay = "0" + secondDay;
				}
				if(secondLastMonth < 10) {
					secondLastMonth = "0" + secondLastMonth;
				}
				if(secondLastDay < 10) {
					secondLastDay = "0" + secondLastDay;
				}
				this.firstNextDayFormat = secondMonth + '月' + secondDay + '日'; //本周的第一天
				this.lastNextDayFormat = secondLastMonth + '月' + secondLastDay + '日'; //本周的最后一天

				this.firstArgsNextDayFormat = secondYear + '年' + secondMonth + '月' + secondDay + '日'; //本周的第一天
				this.lastArgsNextDayFormat = secondDay + '年' + secondLastMonth + '月' + secondLastDay + '日'; //本周的最后一天

				//第三周格式化
				this.threeDay = this.getNextWeekDatas(this.lastNext)[0];
				this.threeLast = this.getNextWeekDatas(this.lastNext)[6];

				let threeYear, threeMonth, threeDay, threeLastYear, threeLastMonth, threeLastDay;
				threeYear = this.threeDay.getYear() + 1900;
				threeMonth = this.threeDay.getMonth() + 1;
				threeDay = this.threeDay.getDate();

				threeLastYear = this.threeLast.getYear() + 1900;
				threeLastMonth = this.threeLast.getMonth() + 1;
				threeLastDay = this.threeLast.getDate();

				if(threeMonth < 10) {
					threeMonth = "0" + threeMonth;
				}
				if(threeDay < 10) {
					threeDay = "0" + threeDay;
				}
				if(threeLastMonth < 10) {
					threeLastMonth = "0" + threeLastMonth;
				}
				if(threeLastDay < 10) {
					threeLastDay = "0" + threeLastDay;
				}

				this.threeDayFormat = threeMonth + '月' + threeDay + '日'; //本周的第一天
				this.threeLastDayFormat = threeLastMonth + '月' + threeLastDay + '日'; //本周的最后一天

				this.threeArgsDayFormat = threeYear + '年' + threeMonth + '月' + threeDay + '日'; //本周的第一天
				this.threeArgsLastDayFormat = threeLastYear + '年' + threeLastMonth + '月' + threeLastDay + '日'; //本周的最后一天
			},
			//取得当前日期一周内的某一天
			getWeek(i) {
				var now = new Date();
				var n = now.getDay();
				var start = new Date();
				start.setDate(now.getDate() - n + (i - 1)); //取得一周内的第一天、第二天、第三天...
				return start;
			},
			//取得当前日期一周内的七天
			getDays() {
				var days = new Array();
				for(var i = 1; i <= 7; i++) {
					days[i - 1] = this.getWeek(i);
				}
				return days;
			},
			//取得下一周的日期数(共七天)
			getNextWeekDatas(ndt) {
				var days = new Array();
				for(var i = 1; i <= 7; i++) {
					var dt = new Date(ndt);
					days[i - 1] = this.getNextWeek(dt, i);
				}
				return days;
			},
			//指定日期的下一周(后七天)
			getNextWeek(dt, i) {
				var today = dt;
				today.setDate(today.getDate() + i);
				return today;
			},
			//获取我的课程表
        	getTeamData(time) {
				global_.$options.exportSession(this.getTeamData);
				this.openIndicatorWithSpinner();
				this.$axios({
						url: this.path+'classes',
						method: 'get',
						params: {
					        mondayTime:time,
					        pageSize: this.pageSize,
									pageNum: 0,
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
					})
					.then((res) => {
						if(res.data.code == 0){
							this.$nextTick(() => {
								this.classData1 = res.data.result[0].classSchedules;
								this.classData2 = res.data.result[1].classSchedules;
								this.classData3 = res.data.result[2].classSchedules;
								this.classData4 = res.data.result[3].classSchedules;
								this.classData5 = res.data.result[4].classSchedules;
								this.classData6 = res.data.result[5].classSchedules;
								this.classData7 = res.data.result[6].classSchedules;
								Indicator.close()
							})
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//我的课程列表
			getTotal() {
				this.$axios({
						url: this.path + 'myClasses/count',
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
							'Authorization': this.token,
						}
					})
					.then((res) => {
						if(res.data.code == 0) {
							this.total = res.data.result;
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},

			getPrivateClass(){
				let that = this
				that.getTotal();
				global_.$options.exportSession(this.getPrivateClass);
				this.openIndicatorWithSpinner();
				this.$axios({
						url: this.path+'myClasses',
						method: 'get',
						params: {
							pageSize: this.pageSize,
					        pageNum: this.pageNum,
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
					})
					.then((res) => {
						Indicator.close()
						if(res.data.code == 0){
							if(that.total > 0){
									if(res.data.result.length == 15){
										that.ClassListData = that.ClassListData.concat(res.data.result) //concat连接两个数组返回被连接数组的一个副本
										that.scrollMode = 'touch'
										that.pageNum += 1;
										that.buttomTip = '点击加载更多';
									}else{
										that.ClassListData = that.ClassListData.concat(res.data.result) //concat连接两个数组返回被连接数组的一个副本
										$(".mint-loadmore-bottom").hide();
										that.buttomTip = '';
									}
							}else{
								this.noPrivateClassDate = true
							}
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			selectGroupClassDetails(csid,type){
				sessionStorage.setItem('classType',type);
				sessionStorage.setItem('classKind', 3);
				sessionStorage.setItem('classScheduleId', csid);
				var beginTime = $(".time-list").find(".text").text().slice(0, 6);
				var endTime = $(".time-list").find(".text").text().slice(7, 13);
				
				console.log('保存begin'+beginTime)
				console.log('保存end'+endTime)
				
				sessionStorage.setItem("beginTime", beginTime);
				sessionStorage.setItem("endTime", endTime);
				sessionStorage.setItem('day', this.lastweekday);
				sessionStorage.setItem('selectDate', this.lastweekDate)
				$(".mint-navbar .mint-tab-item").each(function(index) {
					var state = $(this).hasClass("is-selected");
					if(state) {
						sessionStorage.setItem("index", index);
					}
				})
				this.$router.push('/classDetails');
			},
			selectClassDetails(cid,type){
				sessionStorage.setItem('classType',type);
				sessionStorage.setItem('classKind', 2);
				sessionStorage.setItem('classId', cid);
				var beginTime = $(".time-list").find(".text").text().slice(0, 6);
				var endTime = $(".time-list").find(".text").text().slice(7, 13);
				
				console.log('保存begin'+beginTime)
				console.log('保存end'+endTime)
				
				sessionStorage.setItem("beginTime", beginTime);
				sessionStorage.setItem("endTime", endTime);
				sessionStorage.setItem('day', this.lastweekday);
				sessionStorage.setItem('selectDate', this.lastweekDate)
				$(".mint-navbar .mint-tab-item").each(function(index) {
					var state = $(this).hasClass("is-selected");
					if(state) {
						sessionStorage.setItem("index", index);
					}
				})
				this.$router.push('/classDetails');
			},
			
			openIndicatorWithSpinner() {
		        Indicator.open({ spinnerType: 'fading-circle' });
		    },
		 
        }
  }
</script>

<style>
	.nodata,.noClassDate{
		font-size: 14px;
		line-height: 50px;
		height: 50px;
		text-align: center;
		color: #999;
	}
	/*.noClassDate{
		margin: 50px auto;
	}*/
	.mint-loadmore{
		background-color: #FFFFFF!important;
	}
	.mint-tab-container-item .mint-loadmore-bottom{
		margin-bottom: 0;
		font-size: 14px;
		height: 50px;
		line-height: 50px;
	}
	.border-top{
		border-top: 1px solid #ccc;
	}
</style>