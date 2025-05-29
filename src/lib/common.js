import Vue from 'vue'
import promise from 'es6-promise'
promise.polyfill();
import axios from "axios"
import { Toast } from 'vant';
import store from '../store/index.js'
import { initLang } from '../assets/local'
import router from '../router'


initLang(Vue);

Vue.use(Toast);

var common = {}

if (process.env.NODE_ENV === 'development') {
	// 这里用国际版接口
	common = {
		// baseUri: 'https://www.bvjdftyu.com/api/vue/',
		baseUri: 'https://www.cgkfhd.com/api/vue/',
		imgUrl: 'https://www.cgkfhd.com/api/',
		imgUrls: "https://www.cgkfhd.com/", //实名认证上传图片回显
	}
} else {
	common = {
		baseUri: window.location.origin + '/api/vue/',
		imgUrl: window.location.origin + '/api/',
		imgUrls: window.location.origin, //实名认证上传图片回显
	} 
}
// console.log('store.getters.getToken', store.getters.getToken)

let headers = {
	token: store.state.tokend,
	account: store.state.account
}

let settings = {
	baseURL: common.baseUri,
	// 加载超时限定5s
	timeout: 10000,
	headers,
}


const server = axios.create(settings);
server.url = common
server.interceptors.request.use(
	config => {
		// axios.defaults.headers['token'] = window.localStorage.getItem("tokend");
		// axios.defaults.headers['account'] = window.localStorage.getItem("account");
		return config
	}, function (error) {

		return Promise.reject(error)
	}
)






// axios.defaults.baseURL = common.baseUri;

server.interceptors.response.use((res) => {
	if (res.data.status != 1) {
		if (res.data.msg) {

			// 充值时间提示 、提现时间提示
			if (res.data.msg.includes('请于入金时间')) {
				Toast({
					message: res.data.msg.replace('请于入金时间', Vue.prototype.$t('请于入金时间')).replace('操作',''),
					duration: 2000
				});
				return
			}
			if (res.data.msg.includes('请于出金时间')) {
				console.log(res.data.msg)
				Toast({
					message: res.data.msg.replace('请于出金时间', Vue.prototype.$t('请于出金时间')).replace('操作',''),
					duration: 2000
				});
				return
			}

			// 其他或包含有数字的提示，需要格式化
			Toast({
				message: Vue.prototype.$formText(res.data.msg),
				duration: 2000
			});

			// Toast({
			// 	message: Vue.prototype.$t(res.data.msg),
			// 	duration: 2000
			// });
		}

	}

	return res.data
}, error => {
	// 此处判断拦截需要处理的错误状态码并处理
	// if (error.response.data.msg) {
	// 	Toast({
	// 		message: error.response.data.msg,
	// 		message: 'error',
	// 		duration: 2000
	// 	});
	// }
	// token 已过期到登录页面
	if (error.response.status == 401) {
		setTimeout(() => {
			localStorage.removeItem("tokend");
			//localStorage.clear()
			router.push({ path: '/login/login' })
		}, 2000)
	}


	return Promise.reject(error)

})


export default server;
