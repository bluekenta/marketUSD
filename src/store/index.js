import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	namespaced: true,
	state: {
		tokend: localStorage.getItem("tokend"),
		account: localStorage.getItem("account")
	},
	mutations: {
		saveToken(state, tokend) {
			localStorage.setItem("tokend", tokend);
			state.tokend = tokend;
		},
		saveAccount(state, account) {
			localStorage.setItem("account", account);
			state.account = account;
		},
	},
	actions: {
	},
	modules: {
	}
})
