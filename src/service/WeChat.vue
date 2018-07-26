<script>
	import AXIOS from '../axios/axios';
	import global_ from '../common/js/common';
	const Axios = new AXIOS();
    export default{
        ready: function(){
            this.$axios.post("https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN", {}).then( (data) => {
                let config = data.data
                wx.config(
                {
                    debug: false,
                    appId: config.appId,
                    timestamp: config.timestamp,
                    nonceStr: config.nonceStr,
                    signature: config.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'onVoicePlayEnd',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ]
                })
                wx.ready(function()
                {
                    // 隐藏其他按钮
                    wx.hideAllNonBaseMenuItem()
                    wx.hideMenuItems(
                    {
                        menuList: [ 'copyUrl' ]
                    })
                })
                wx.error(function (res) 
                {
                    alert(JSON.stringify(res))
                })
            })
        }
    }
</script>