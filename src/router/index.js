import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login/start'
	},
	{
		path: '/login/start',
		name: 'start',
		component: resolve => (require(["@/components/login/start"], resolve))
	},
	{
		path: '/login/login',
		name: 'login',
		component: resolve => (require(["@/components/login/login"], resolve))
	},
	{
		path: '/login/register',
		name: 'register',
		component: resolve => (require(["@/components/login/register"], resolve))
	},
	{
		path: '/home/index',
		name: 'home',
		component: resolve => (require(["@/components/home/index"], resolve))
	},
	{
		path: '/home/market',
		name: 'market',
		component: resolve => (require(["@/components/home/market"], resolve))
	},
	{
		path: '/market/index',
		name: 'market',
		component: resolve => (require(["@/components/market/index"], resolve))
	},
	{
		path: '/trade/index',
		name: 'trade',
		component: resolve => (require(["@/components/trade/index"], resolve))
	},
	{
		path: '/favorite/search',
		name: 'search',
		component: resolve => (require(["@/components/favorite/search"], resolve))
	},
	{
		path: '/information/index',
		name: 'information',
		component: resolve => (require(["@/components/information/index"], resolve))
	},
	{
		path: '/information/setting',
		name: 'setting',
		component: resolve => (require(["@/components/information/setting"], resolve))
	},
	{
		path: '/information/changeLang',
		name: 'changeLang',
		component: resolve => (require(["@/components/information/changeLang"], resolve))
	},

	{
		path: '/information/loginPass',
		name: 'loginPass',
		component: resolve => (require(["@/components/information/loginPass"], resolve))
	},
	{
		path: '/information/fundPass',
		name: 'fundPass',
		component: resolve => (require(["@/components/information/fundPass"], resolve))
	},
	{
		path: '/information/bankList',
		name: 'bankList',
		component: resolve => (require(["@/components/information/bankList"], resolve))
	},
	{
		path: '/information/addBankCard',
		name: 'addBankCard',
		component: resolve => (require(["@/components/information/addBankCard"], resolve))
	},
	{
		path: '/information/fundRecord',
		name: 'fundRecord',
		component: resolve => (require(["@/components/information/fundRecord"], resolve))
	},
	{
		path: '/information/exChange',
		name: 'exChange',
		component: resolve => (require(["@/components/information/exChange"], resolve))
	},

	{
		path: '/information/authInfo',
		name: 'authInfo',
		component: resolve => (require(["@/components/information/authInfo"], resolve))
	},
	{
		path: '/information/aboutUs',
		name: 'aboutUs',
		component: resolve => (require(["@/components/information/aboutUs"], resolve))
	},
	{
		path: '/information/cashOut',
		name: 'cashOut',
		component: resolve => (require(["@/components/information/cashOut"], resolve))
	},
	{
		path: '/information/recharge',
		name: 'recharge',
		component: resolve => (require(["@/components/information/recharge"], resolve))
	},
	{
		path: '/information/rechargeChannel',
		name: 'rechargeChannel',
		component: resolve => (require(["@/components/information/rechargeChannel"], resolve))
	},
	{
		path: '/information/userInfo',
		name: 'userInfo',
		component: resolve => (require(["@/components/information/userInfo"], resolve))
	},
	{
		path: '/information/msgInfo',
		name: 'msgInfo',
		component: resolve => (require(["@/components/information/msgInfo"], resolve))
	},
	{
		path: '/information/privacy',
		name: 'privacy',
		component: resolve => (require(["@/components/information/privacy"], resolve))
	},
	{
		path: '/information/wallet',
		name: 'wallet',
		component: resolve => (require(["@/components/information/wallet"], resolve))
	},
	{
		path: '/home/loan',
		name: 'homeLoan',
		component: resolve => (require(["@/components/home/loan"], resolve))
	},
	{
		path: '/home/loanRe',
		name: 'homeLoanRe',
		component: resolve => (require(["@/components/home/loanRe"], resolve))
	},
	{
		path: '/home/newsList',
		name: 'newsList',
		component: resolve => (require(["@/components/home/newsList"], resolve))
	},
	{
		path: '/home/newsDetail',
		name: 'newsDetail',
		component: resolve => (require(["@/components/home/newsDetail"], resolve))
	},
	{
		path: '/trade/positionDetail',
		name: 'positionDetail',
		component: resolve => (require(["@/components/trade/positionDetail"], resolve))
	},
	{
		path: '/market/stockDetail',
		name: 'stockDetail',
		component: resolve => (require(["@/components/market/stockDetail"], resolve))
	},
	{
		path: '/market/stock',
		name: 'stock',
		component: resolve => (require(["@/components/market/stock"], resolve))
	},
	{
		path: '/home/blockTrade',
		name: 'blockTrade',
		component: resolve => (require(["@/components/home/blockTrade"], resolve))
	},
	{
		path: '/home/fllow',
		name: 'fllow',
		component: resolve => (require(["@/components/home/fllow"], resolve))
	},
	{
		path: '/home/dayTrading',
		name: 'dayTrading',
		component: resolve => (require(["@/components/home/dayTrading"], resolve))
	},
	{
		path: '/home/newStock',
		name: 'newStock',
		component: resolve => (require(["@/components/home/newStock"], resolve))
	},
	{
		path: '/home/newStockBuy',
		name: 'newStockBuy',
		component: resolve => (require(["@/components/home/newStockBuy"], resolve))
	},
	{
		path: '/tutor/index',
		name: 'tutor',
		component: resolve => (require(["@/components/tutor/index"], resolve))
	},
	{
		path: '/tutor/info',
		name: 'tutorInfo',
		component: resolve => (require(["@/components/tutor/info"], resolve))
	},
	{
		path: '/home/newStockRecord',
		name: 'newStockRecord',
		component: resolve => (require(["@/components/home/newStockRecord"], resolve))
	},
	{
		path: '/home/blockTradeRrcord',
		name: 'blockTradeRrcord',
		component: resolve => (require(["@/components/home/blockTradeRrcord"], resolve))
	},
	{
		path: '/home/fllowRecord',
		name: 'fllowRecord',
		component: resolve => (require(["@/components/home/fllowRecord"], resolve))
	},
	{
		path: '/tutor/tutorRecord',
		name: 'tutorRecord',
		component: resolve => (require(["@/components/tutor/tutorRecord"], resolve))
	},
	{
		path: '/market/stockDetailBuy',
		name: 'stockDetailBuy',
		component: resolve => (require(["@/components/market/stockDetailBuy"], resolve))
	},
]

const router = new VueRouter({
	linkActiveClass: "navActive",
	mode: 'hash',
	scrollBehavior(to, from, savePosition) {
		if (savePosition) {
			return savePosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
	routes
})



export default router