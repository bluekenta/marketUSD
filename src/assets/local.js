let en = require("./lang/en")
let zh = require("./lang/zh")
let kor = require("./lang/kor")
let de = require("./lang/de")
let tr = require("./lang/tr")
let yn = require("./lang/yn")
let thai = require("./lang/thai")
let yd = require("./lang/yd")
let spa = require("./lang/spa")
let fr = require("./lang/fr")
let it = require("./lang/it")


let didnot = [];
export function initLang(Vue) {
    function containsChinese(str) {
        const regex = /[\u4e00-\u9fff]/;
        return regex.test(str);
    }
    Vue.prototype.$t = (key) => {
        if (!key) {
            return '';
        }
        if (!localStorage.getItem('language')) {
            if (spa[key]) {
                key = spa[key]
            }
        }
        if (localStorage.getItem('language') === 'en') {
            if (en[key]) {
                key = en[key]
            }
        }
        if (localStorage.getItem('language') === 'cn') {
			if (zh[key]) {
				key = zh[key]
			}
        }
        if (localStorage.getItem('language') === 'kor') {
            if (kor[key]) {
                key = kor[key]
            }
        }
        if (localStorage.getItem('language') === 'de') {
            if (de[key]) {
                key = de[key]
            }
        }
        if (localStorage.getItem('language') === 'tr') {
            if (tr[key]) {
                key = tr[key]
            }
        }
        if (localStorage.getItem('language') === 'yn') {
            if (yn[key]) {
                key = yn[key]
            }
        }
        if (localStorage.getItem('language') === 'thai') {
            if (thai[key]) {
                key = thai[key]
            }
        }
        if (localStorage.getItem('language') === 'yd') {
            if (yd[key]) {
                key = yd[key]
            }
        }
        if (localStorage.getItem('language') === 'spa') {
            if (spa[key]) {
                key = spa[key]
            }
        }
        if (localStorage.getItem('language') === 'fr') {
            if (fr[key]) {
                key = fr[key]
            }
        }
        if (localStorage.getItem('language') === 'it') {
            if (it[key]) {
                key = it[key]
            }
        }
        if (localStorage.getItem('language') == 'en' || localStorage.getItem('language') == 'kor' || localStorage.getItem('language') == 'de' || localStorage.getItem('language') == 'tr' || localStorage.getItem('language') == 'yn' || localStorage.getItem('language') == 'thai' || localStorage.getItem('language') == 'yd' || localStorage.getItem('language') == 'spa' || localStorage.getItem('language') == 'spa' || localStorage.getItem('language') == 'fr' || localStorage.getItem('language') == 'it' || !localStorage.getItem('language')) {
            if(containsChinese(key)){
                if(localStorage.getItem('language') == 'en'){
                    key = "error"
                }
                if(localStorage.getItem('language') == 'kor'){
                    key = "오류"
                }
                if(localStorage.getItem('language') == 'de'){
                    key = "Fehler"
                }
                if(localStorage.getItem('language') == 'tr'){
                    key = "hata"
                }
                if(localStorage.getItem('language') == 'yn'){
                    key = "lỗi"
                }
                if(localStorage.getItem('language') == 'thai'){
                    key = "ข้อผิดพลาด"
                }
                if(localStorage.getItem('language') == 'yd'){
                    key = "गलती"
                }
                if(localStorage.getItem('language') == 'fr'){
                    key = "erreur"
                }
                if(localStorage.getItem('language') == 'it'){
                    key = "errore"
                }
                if(localStorage.getItem('language') == 'spa' || !localStorage.getItem('language')){
                    key = "error"
                }
            }
        }
        return key;
    }

    let findObj = (obj, lv) => {
        for (let key in obj) {
            if (typeof obj[key] == 'object') {
                findObj(obj[key], lv + 1)
            } else if (lv > 0 && typeof obj[key] == 'string') {
                if (!tw[obj[key]]) {
                    didnot.push(obj[key])
                }
            }
        }
    }

}
