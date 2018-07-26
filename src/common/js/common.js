import Vue from 'vue'
import AXIOS from '../../axios/axios'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router();
const Axios = new AXIOS();
	var vm = new Vue({
        data() {
			return {
//				path:'http://121.40.101.130:8092/',//测试服务器
				path:'https://www.weiduapi.com/wechat/',				//正式服务器
//				action:'http://192.168.1.100:8085/file/upload/image',
//				actionV:'http://192.168.1.100:8085/file/upload/vod', //阿里云 视频地址用videoId   --video课程和vr用的七牛云用videoURL
			}
		},
		methods:{
			handleSession(funObj) {
				let token = localStorage.getItem('token')
				this.$axios({
					url: this.path + 'validate',
					method: 'post',
					headers: {
							'Authorization':token
						}
			       }).then(res => {
			         	if(res.data == 0){
			         		this.$message({
								message: '登录超时，请重新登录',
								type: 'error'
							});
							localStorage.setItem('token', null);
			         		router.push({ path: '/login' });
			         		
			         	}else{
			         		localStorage.setItem('token', token);
			         	}
			        }).catch((err) => {
						console.log(err);
					})
			},
		},
		exportSession(funObj){
			vm.handleSession(funObj)
		}

    });
	
export default vm;