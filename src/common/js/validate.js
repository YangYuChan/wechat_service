import { Toast } from 'mint-ui';
export default {
	checkPhone: function(rule, value, callback) {
		var reg = /^1[34578]\d{9}$/;
		if(!value){
			Toast({
				message: '手机号码不能为空'
			});
		}
		else if(!reg.test(value)) {
			Toast({
				message: '手机号码格式不正确，请重新填写'
			});
		}else {
			callback()
		}
	},
	CheckPassWord: function(rule, value, callback) { //密码必须包含数字和字母
		var reg = /^[a-zA-Z0-9]{6,12}$/;
		if(!reg.test(value)) {
			Toast({
				message: '请输入6-12位数字字母组成的密码'
			});
		}else {
			callback()
		}
	},
	checkRealName: function(rule, value, callback) {
		if(!value) {
			Toast({
				message: '真实姓名不能为空'
			});
		}else if(value.length > 10){
			Toast({
				message: '姓名长度不能超过10个字符'
			});
		}else {
			callback()
		}
	},
	checkVaCode: function(rule, value, callback) {
		if(!value) {
			Toast({
				message: '验证码不能为空'
			});
		}else {
			callback()
		}
	},
}