
let local={
	save(key,value){
		window.localStorage.setItem(key, JSON.stringify(value))
	},
	get(key){
		return JSON.parse(window.localStorage.getItem(key))
	},
	remove(key){
		return window.localStorage.removeItem(key);
	}
}

//倒计时
let CountDown={
	Countdown(TargetTime){
		
		let oDate=new Date().getTime();
		let oNewTime=new Date(TargetTime).getTime();
		//get second 
		let second = Math.floor((oNewTime-oDate)/1000);
		
		let day = Math.floor(second/86400);
		second = second % 86400;

		let hour = Math.floor(second/3600);
		second = second % 3600;

		let minute = Math.floor(second/60);
		second = second % 60;

		return {
			day:day,
			hour:hour,
			minute:minute,
			second:second
		}
		
	}
}
export default {
	install:function (vm){
		vm.prototype.$storage=local;
		vm.prototype.$times=CountDown;
	}
}


























