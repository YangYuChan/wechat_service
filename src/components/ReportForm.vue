<template>
	<div class="chart-container">
		<div v-cloak class="chart-wrap">
			<div class="chart-title"><span>营收统计</span><span class="detail" @click="statisticsDetail">详情<i class="iconfont icon-chanpinxiangqingqianwang"></i></span></div>
			<div class="chart-date">
				<div class="xdate xdate-left">{{ incomeDateItem.xStartDate }}</div>
				<div class="xdate xdate-right">{{ incomeDateItem.xEndDate }}</div>
				<div class="ydate ydate-top">{{ incomeDateItem.yDate }}</div>
				<div class="chart-con" ref="income" style="width:100%; height: 220px"></div>
			</div>
		</div>
		<div v-cloak class="chart-wrap">
			<div class="chart-title"><span>课程报表</span><span class="detail" @click="courseDetail">详情<i class="iconfont icon-chanpinxiangqingqianwang"></i></span></div>
			<div class="chart-date">
				<div class="xdate xdate-left">{{ courseDateItem.xStartDate }}</div>
				<div class="xdate xdate-right">{{ courseDateItem.xEndDate }}</div>
				<div class="ydate ydate-top">{{ courseDateItem.yDate }}</div>
				<div class="chart-con" ref="course" style="width:100%; height: 220px"></div>
			</div>
		</div>
		<div v-cloak class="chart-wrap">
			<div class="chart-title"><span>会员签到</span><span class="detail" style="display: none">详情<i class="iconfont icon-chanpinxiangqingqianwang"></i></span></div>
			<div class="chart-date">
				<div class="xdate xdate-left">{{ courseDateItem.xStartDate }}</div>
				<div class="xdate xdate-right">{{ courseDateItem.xEndDate }}</div>
				<div class="ydate ydate-top">{{ courseDateItem.yDate }}</div>
				<div class="chart-con" ref="member" style="width:100%; height: 220px"></div>
			</div>
		</div>
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
				result: {},
				objIncome: {},
				objCourse: {},
				memberData: {},
				data: '',
				incomeDate: '',
				incomeDateItem: {
					xStartDate: '',
					xEndDate: '',
					yDate: ''
				},
				courseDateItem: {
					xStartDate: '',
					xEndDate: '',
					yDate: ''
				},
				memberDateItem: {
					xStartDate: '',
					xEndDate: '',
					yDate: ''
				}
			};
		},
		ready(){
			document.title = '添加列表'
		},
        mounted() {
            this.$nextTick(() => {
                this.token = localStorage.getItem('token');
                this.getChartData();
            });
        },
		methods: {
			getChartData(){
				global_.$options.exportSession(this.getChartData);
				this.$axios({
					url: this.path + 'index/table',
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
						this.result = res.data.result;
						this.objIncome = this.getOrderChart(this.result.orderData);
                        var dom = this.$echarts.init(this.$refs.income);
                        this.optionFun(this.objIncome.time, this.objIncome.num,this.incomeDate, dom, '元', '#fc0', '#333');


						this.objCourse = this.getLeave(this.result.classData);
						this.courseDateItem.xStartDate = this.objCourse.time[0];
						this.courseDateItem.xEndDate = this.objCourse.time[6];
						let courseDate = Math.max.apply(null,this.objCourse.num);
						this.courseDateItem.yDate = courseDate;
                        var dom = this.$echarts.init(this.$refs.course);
                        this.optionFun(this.objCourse.time, this.objCourse.num, this.date, dom, '元', '#60b557', '#fff');


						this.memberData = this.getLeave(this.result.memberData);
						this.memberDateItem.xStartDate = this.memberData.time[0];
						this.memberDateItem.xEndDate = this.memberData.time[6];
						let memberyDate = Math.max.apply(null,this.memberData.num);
						this.memberDateItem.yDate = memberyDate;
                        var dom = this.$echarts.init(this.$refs.member);
                        this.optionFun(this.memberData.time, this.memberData.num, this.date, dom, '人次', '#f17158', '#fff');
					}else {
						alert(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
            statisticsDetail(){
                this.$router.push('/ReportCount');
            },
            courseDetail(){
                this.$router.push('/ReportCourseDetail');
            },
            getOrderChart(obj){
                let arr = [];
                let brr = [];
                for (var i in obj) {
                    arr.push(obj[i]);
                    brr.push(i.slice(5));
                    this.incomeDate = i.slice(0,5);
                };
                let objIncome = {
                    num: arr,
                    time: brr,
                };
                this.incomeDateItem.xStartDate = objIncome.time[0];
                this.incomeDateItem.xEndDate = objIncome.time[6];
                let yDate = Math.max.apply(null,objIncome.num);
                this.incomeDateItem.yDate = yDate;
                var max = Math.max.apply(null,arr);
                return objIncome;
            },
            getLeave(arr){
                let num = [];
                let time = [];
                arr.forEach((val) => {
                    num.push(val.num);
                    time.push(val.time.slice(5));
                    this.date = val.time.slice(0,5);
                })

                let obj = {
                    num: num.reverse(),
                    time: time.reverse(),
                };
                return obj;
            },
            optionFun(time, num, date, dom, text, bcg, color){
                dom.setOption({
                    type:'showTip',
                    seriesIndex: 0,
                    dataIndex: 2,
                    tooltip : {
                        trigger: 'axis',
                        triggerOn: 'click',
                        axisPointer: {
                        type: 'none'
                        },
                        formatter:function(){
                            return '';
                        },
                    },
                    toolbox: {
                        show : true,
                    },
                    calculable : true,
                    grid: {
                        top: '20%',
                        bottom:'20%',
                        left: '18%',
                        right: '10%',
                    },
                    xAxis : [{
                        type : 'category',
                        boundaryGap : false,
                        axisLabel:{
                            interval:0,
                            margin:	12,
                            textStyle:{
                                fontWeight:"normal",
                                color:"#333",
                            },
                            formatter: function () {
                                return '';
                            },
                        },
                        data : time,
                    }],
                    yAxis : [{
                        type : 'value',
                        name:'(' + text + ')',
                        axisLabel : {
                            formatter (){
                                return '';
                            },
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                        },
                        axisTick: {
                            show: false,
                        },
                    }],
                    series : [{
                        type:'line',
                        name: '折线图',
                        symbolSize: 5,   //设定实心点的大小
                        clickable:false,
                        itemStyle : {
                            normal : {
                            borderColor: bcg,
                            borderWidth: 2,
                            width: 2,
                            },
                            emphasis: {
                                itemStyle: {},
                                label: {
                                    show: true,
                                    backgroundColor: bcg,
                                    color: color,
                                    padding: 3,
                                    borderRadius: 5,
                                    legendHoverLink:false ,
                                    formatter: date + "{b} \n" + "{c}" + text,
                                },
                            },
                        },
                        lineStyle: {
                            normal: {
                                color: bcg,   // 线条颜色
                                width: 2,
                            }
                        },
                        data: num,
                    }]
                });

                dom.dispatchAction({
                    type: 'showTip',
                    seriesIndex:0 ,//第几条series
                    dataIndex: 6,//第几个tooltip
                })
                window.onresize = dom.resize;
            },
    	}
	}

</script>



