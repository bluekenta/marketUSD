import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/vant'
//import "./assets/js/jquery.min.js";

import { ActionSheet } from 'vant';

Vue.use(ActionSheet);

import { initLang } from './assets/local'
initLang(Vue);
import func from './lib/tool'
func.install(Vue)

import loading from '../src/components/components/loading.vue'
Vue.component('loading', loading)

import firstLoading from '../src/components/components/first-loading.vue'
Vue.component('first-loading', firstLoading)
import tabBar from '../src/components/components/tab-bar.vue'
Vue.component('tab-bar', tabBar)
import topBack from '../src/components/components/top-back.vue'
Vue.component('top-back', topBack)
import noData from '../src/components/components/no-data.vue'
Vue.component('no-data', noData)
import topIndex from '../src/components/components/top-index.vue'
Vue.component('top-index', topIndex)


import VueResource from 'vue-resource'
Vue.use(VueResource)

import server from './lib/common.js'
Vue.prototype.$server = server // 全局调用接口


Vue.prototype.$toPage = (url, kfUrl = '') => {
	if (url == 'kefu') {
		//console.log('kefu', Vue.prototype.$cfg.kefu);
		Vue.prototype.$openUrl(Vue.prototype.$cfg.kefu)
		return
	}

	if (url == 'exit') {
		// 退出
		localStorage.removeItem("tokend");
		//localStorage.removeItem("account");
		setTimeout(() => {
			router.push({ path: '/login/login' });
		}, 1000)
		return
	}

	if(!url){
		return;
	}
	let href = window.location.hash;
	if(href.indexOf(url)>-1){
		return;
	}
	router.push({ path: url });
}

// 股票列表跳转详情
Vue.prototype.$toDetail = (url, item = '') => {
	Vue.prototype.$storage.save("stockDetail", item);
	router.push({ path: url });
}

Vue.prototype.$getTimeData = (dateString) => {
	var dateObject = new Date(dateString);
	var year = dateObject.getFullYear();
	var month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
	var day = ("0" + dateObject.getDate()).slice(-2);
	var hours = ("0" + dateObject.getHours()).slice(-2);
	var minutes = ("0" + dateObject.getMinutes()).slice(-2);
	var seconds = ("0" + dateObject.getSeconds()).slice(-2);
	var formattedDate = year + "." + month + "." + day + " " + hours + ":" + minutes + ":" + seconds;
	// console.log(formattedDate);
	return formattedDate
}


Vue.config.productionTip = false
import tool from "./lib/tool";
import QRCode from 'qrcodejs2';

Vue.prototype.qrCode = QRCode;
Vue.use(tool);

// import Mui from 'vue-awesome-mui';
// Vue.use(Mui);

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 时间格式化
Vue.prototype.$formatDate = (fmt, date) => {

	if (typeof date === 'string') {
		date = date.replace(/\-/g, '/')
	}

	let ret;
	date = new Date(date);
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"M+": (date.getMonth() + 1).toString(), // 月
		"D+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 时
		"m+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString(), // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(
				ret[1],
				ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
			);
		}
	}
	return fmt;
}


Vue.prototype.$formatMoney = function (value, wei = 2) {
	var b = false;
	if (value == null || value == '' || isNaN(value)) return '0,00';

	value = Number(value).toFixed(wei) //保留两位小数
	value = value.toString();
	if (value.indexOf('-') != -1) {
		b = true;
		value = value.substring(1, value.length);
	}
	if (/^\-?[0-9]+(.[0-9]+)?$/.test(value)) {
		value
			.replace(/[^\d\.]/g, '')
			.replace(/(\.\d{2}).+$/, '$1')
			.replace(/^0+([1-9])/, '$1')
			.replace(/^0+$/, '0');
		let txt = value.split('.');
		while (/\d{4}(,|$)/.test(txt[0])) {
			txt[0] = txt[0].replace(/(\d)(\d{3}(,|$))/, '$1,$2');
		}
		value = txt[0].replace(/,/g, '.') + (txt.length > 1 ? ',' + txt[1] : '');
	}
	if (b) {
		value = '-' + value;
	}
	return value;
}

Vue.prototype.$openUrl = (url) => {
	window.location.href = url;
}



Vue.prototype.$formText = (text) => {
	let str = text

	function extractNumber(input) {
		// 使用正则表达式匹配并捕获数字部分
		var regex = /\d+/;
		// 使用正则表达式的 exec 方法获取匹配结果
		var match = input.match(regex);
		// 如果有匹配项，则返回捕获的数字；否则返回 false
		return match ? match[0] : false;
	}

	function replaceNumberWithPlaceholder(input) {
		// 使用正则表达式匹配数字部分
		var regex = /\d+/;
		// 使用 replace 方法将数字替换成占位符
		var replacedString = input.replace(regex, "{{numberPlaceholder}}");
		// 返回替换后的字符串
		return replacedString;
	}

	let num = extractNumber(str)
	let str1 = Vue.prototype.$t(replaceNumberWithPlaceholder(str))
	return str1.replace("{{numberPlaceholder}}", Vue.prototype.$formatMoney(num))
}

// 替换返回时间字符翻译
Vue.prototype.$formTextTime = (text) => {
	let str = text

	function extractTimeRange(input) {
		// 使用正则表达式匹配并捕获数字部分
		var regex = /(\d{2}:\d{2}:\d{2})-(\d{2}:\d{2}:\d{2})/;
		// 使用正则表达式的 exec 方法获取匹配结果
		var match = input.match(regex);
		// 如果有匹配项，则返回捕获的数字；否则返回 false
		return match ? match[0] : false;
	}

	function replaceTimeWithPlaceholder(input) {
		// 使用正则表达式匹配数字部分
		var regex = /(\d{2}:\d{2}:\d{2})-(\d{2}:\d{2}:\d{2})/;
		// 使用 replace 方法将数字替换成占位符
		var replacedString = input.replace(regex, "{{numberPlaceholder}}");
		// 返回替换后的字符串
		return replacedString;
	}

	let timeStr = extractTimeRange(str)
	let str1 = Vue.prototype.$t(replaceTimeWithPlaceholder(str))
	return str1.replace("{{numberPlaceholder}}", timeStr)
}


Vue.prototype.$cfg = {};
Vue.prototype.$stockType = 'usd';//'try';//'Italy';
Vue.prototype.$currency = '$'

// 统一获取logo配置
server.post('/common/config', { type: 'all' }).then(res => {


	let val = {}
	res.data.forEach(vo => {
		val[vo.name] = vo.value;
	})
	if (process.env.NODE_ENV === "development") {
		val.logo = require('./assets/skin/all/logo.png')
		//val.logo = server.url.imgUrls + val.logo
		val.title = 'TEST'
	} else {
		val.logo = server.url.imgUrls + val.logo
	}

	// 设置当前页面的标题
	document.title = val.title;

	Vue.prototype.$cfg = val

	// 获取到配置再挂载
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})




