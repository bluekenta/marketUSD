<template>
	<div class="page">
		<div class="top">
			<div class="top-box">
				<span class="top-item" :class="topIndex==item.type?'top-on':''" v-for="(item, index) in top" :key="index" @click="topIndex=item.type,changeTop()">{{item.name}}</span>
			</div>
		</div>
		<div class="nav" v-if="topIndex==0 || topIndex==5 || topIndex==6 || topIndex==7 || topIndex==8">
			<div class="nav-item" :class="navIndex==item.type?'nav-on':''" v-for="(item, index) in nav" :key="index" @click="changeNav(item.type)">{{item.name}}<span></span></div>
		</div>
		<template v-if="(topIndex==0 || topIndex==5 || topIndex==6 || topIndex==7 || topIndex==8) && navIndex==0">
			<!-- 西班牙 持仓 -->
			<template v-if="topIndex==0">
				<no-data v-if="!holdList.length"></no-data>
				<div class="hold" v-for="(item, index) in holdList" :key="index"
					v-if="item.status!==3" @click="sellItem(item)">
					<!--  && item.is_qc!==4 && item.is_qc!==5 -->
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<img class="hold-top-arrow" src="../../assets/skin/trade/arrow.png" />
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'':'$ '}}{{$formatMoney(item.yingkui, 3)}}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j16}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j17}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
					</div>
					<div class="hold-btn">{{$t('trade').j18}}</div>
				</div>
			</template>
			<!-- 美国 持仓 -->
			<template v-if="topIndex==5 || topIndex==7 || topIndex==8">
				<no-data v-if="!holdList.length"></no-data>
				<div class="hold" v-for="(item, index) in holdList" :key="index" v-if="item.gdlx!=2" @click="sellItem(item)"><!--  && item.is_qc!=4 && item.is_qc!=5 -->
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<img class="hold-top-arrow" src="../../assets/skin/trade/arrow.png" />
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'':'$ '}}{{$formatMoney(item.yingkui, 3)}}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j16}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j17}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
					</div>
					<div class="hold-btn">{{$t('trade').j18}}</div>
				</div>
			</template>
			<template v-if="topIndex==6">
				<no-data v-if="!holdList.length"></no-data>
				<div class="hold" v-for="(item, index) in holdList" :key="index" v-if="item.status!==3 && item.is_qc==5"
					@click="sellItem(item)">
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<img class="hold-top-arrow" src="../../assets/skin/trade/arrow.png" />
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'':'$ '}}{{$formatMoney(item.yingkui, 3)}}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j16}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j17}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
					</div>
					<div class="hold-btn">{{$t('trade').j18}}</div>
				</div>
			</template>
		</template>
		<template v-if="(topIndex==0 || topIndex==5 || topIndex==6 || topIndex==7 || topIndex==8) && navIndex==1">
			<!-- 西班牙 委托 -->
			<template v-if="topIndex==0">
				<no-data v-if="!holdList.length"></no-data>
				<div class="hold" v-for="(item, index) in holdList" :key="index"
					v-if="item.status==3 && item.is_qc!==4 && item.is_qc!==5" @click="sellItem(item)">
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<img class="hold-top-arrow" src="../../assets/skin/trade/arrow.png" />
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'':'$ '}}{{$formatMoney(item.yingkui, 3)}}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j16}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j17}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
					</div>
					<div class="hold-btn">{{$t('trade').j18}}</div>
				</div>
			</template>
			<!-- 美国 委托 -->
			<template v-if="topIndex==5 || topIndex==7 || topIndex==8">
				<no-data v-if="!holdList.length"></no-data>
				<div class="hold" v-for="(item, index) in holdList" :key="index" v-if="item.gdlx==2" @click="sellItem(item)"><!--  && item.is_qc!=4 && item.is_qc!=5 -->
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<img class="hold-top-arrow" src="../../assets/skin/trade/arrow.png" />
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'':'$ '}}{{$formatMoney(item.yingkui, 3)}}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j16}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j17}}<span>{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(item.nowprice * item.stock_num) }}{{stockType=='Spain'?' €':''}}</span></div>
					</div>
					<div class="hold-btn">{{$t('trade').j18}}</div>
				</div>
			</template>
			<template v-if="topIndex==6">
				<no-data v-if="!holdList.length"></no-data>
				<div class="hold" v-for="(item, index) in holdList" :key="index" v-if="item.status==3 && item.is_qc==5"
					@click="sellItem(item)">
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<img class="hold-top-arrow" src="../../assets/skin/trade/arrow.png" />
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'€ ':'$ '}}{{$formatMoney(item.yingkui, 3)}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j16}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.nowprice, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j17}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.nowprice * item.stock_num) }}</span></div>
					</div>
					<div class="hold-btn">{{$t('trade').j18}}</div>
				</div>
			</template>
		</template>
		<template v-if="(topIndex==0 || topIndex==5 || topIndex==6 || topIndex==7 || topIndex==8) && navIndex==2">
			<!-- 西班牙 历史 -->
			<template v-if="topIndex==0">
				<no-data v-if="!sellList.length"></no-data>
				<div class="hold" v-for="(item, index) in sellList" :key="index"
					@click="goItem(item)"><!--  v-if="item.is_qc!==4 && item.is_qc!==5" -->
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<div class="hold-top-sell">{{$t('trade').j23}}</div>
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'€ ':'$ '}}{{$formatMoney(item.yingkui, 3)}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j24}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.sell_price, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j25}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.sell_price * item.stock_num) }}</span></div>
					</div>
				</div>
			</template>
			<!-- 美国 历史 -->
			<template v-if="topIndex==5 || topIndex==7 || topIndex==8">
				<no-data v-if="!sellList.length"></no-data>
				<div class="hold" v-for="(item, index) in sellList" :key="index" @click="goItem(item)">
					<!--  v-if="item.is_qc==4 && item.is_qc!=5" -->
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<div class="hold-top-sell">{{$t('trade').j23}}</div>
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'€ ':'$ '}}{{$formatMoney(item.yingkui, 3)}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j24}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.sell_price, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j25}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.sell_price * item.stock_num) }}</span></div>
					</div>
				</div>
			</template>
			<template v-if="topIndex==6">
				<no-data v-if="!sellList.length"></no-data>
				<div class="hold" v-for="(item, index) in sellList" :key="index" v-if="item.is_qc==5"
					@click="goItem(item)">
					<div class="hold-top">
						<div class="hold-top-left">
							<div class="hold-top-name">{{ item.stock_name }}<span>{{ item.ganggang }}X</span></div>
							<div class="hold-top-bottom">
								<span class="hold-top-type green" v-if="item.buyzd==1">{{$t('trade').j9}}</span>
								<span class="hold-top-type red" v-if="item.buyzd==2">{{$t('trade').j10}}</span>
								<span class="hold-top-code">{{ item.stock_code }}</span>
							</div>
						</div>
						<div class="hold-top-sell">{{$t('trade').j23}}</div>
					</div>
					<div class="hold-middle">
						<div class="hold-middle-left">{{$t('trade').j11}}<span
								:class="item.yingkui>0?'green':'red'">{{stockType=='Spain'?'€ ':'$ '}}{{$formatMoney(item.yingkui, 3)}}</span></div>
						<div class="hold-middle-right">{{$t('trade').j12}}<span
								:class="item.yingkui>0?'green':'red'">{{ $formatMoney(item.gain*item.ganggang) }}%</span></div>
					</div>
					<div class="hold-foot">
						<div class="hold-foot-item flex-start">
							{{$t('trade').j13}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j14}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
						<div class="hold-foot-item flex-end">
							{{$t('trade').j15}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price * item.stock_num) }}</span></div>
						<div class="hold-foot-item flex-start">
							{{$t('trade').j24}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.sell_price, 3) }}</span></div>
						<div class="hold-foot-item">
							{{$t('trade').j25}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.sell_price * item.stock_num) }}</span></div>
					</div>
				</div>
			</template>
		</template>
		
		<template v-if="topIndex==1">
			<no-data v-if="!gdList.length"></no-data>
			<div class="hold" v-for="(item, index) in gdList" :key="index">
				<div class="hold-top">
					<div class="hold-top-left">
						<div class="hold-top-name">{{ item.name }}</div>
						<div class="hold-top-bottom">
							<span class="hold-top-code">{{ item.sender }}</span>
						</div>
					</div>
					<div class="hold-top-retreat">{{$t('trade').j31}}:{{stockType=='Spain'?'€ ':'$ '}}{{$formatMoney(item.dprofit)}}</div>
				</div>
				<div class="hold-foot">
					<div class="hold-foot-item flex-start">
						{{$t('trade').j32}}<span>{{ $formatDate("DD-MM hh:mm:ss",item.buy_time) }}</span></div>
					<div class="hold-foot-item">{{$t('trade').j33}}<span>{{ $formatMoney(item.scday, 0) }}</span></div>
					<div class="hold-foot-item flex-end">
						{{$t('trade').j34}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.aprofit) }}</span></div>
					<div class="hold-foot-item flex-start">
						{{$t('trade').j35}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.money, 0) }}</span></div>
					<div class="hold-foot-item">{{$t('trade').j36}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.cj_money, 0) }}</span>
					</div>
				</div>
			</div>
		</template>
		<template v-if="topIndex==2">
			<no-data v-if="!xinguList.length"></no-data>
			<div class="hold" v-for="(item, index) in xinguList" :key="index">
				<div class="hold-top">
					<div class="hold-top-left">
						<div class="hold-top-name">{{ item.stock_name }}</div>
						<div class="hold-top-bottom">
							<span class="hold-top-code">{{ item.stock_code || '-' }}</span>
						</div>
					</div>
					<div class="hold-top-retreat">{{ $t(item.xgstate) }}</div>
				</div>
				<div class="hold-foot">
					<div class="hold-foot-item flex-start">
						{{$t('trade').j37}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.apply_price, 3) }}</span></div>
					<div class="hold-foot-item">{{$t('trade').j38}}<span>{{ $formatMoney(item.apply_total, 0) }}</span>
					</div>
					<div class="hold-foot-item flex-end">
						{{$t('trade').j39}}<span>{{ $formatMoney(item.lucky_total, 0) }}</span></div>
					<div class="hold-foot-item flex-start">
						{{$t('trade').j40}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.subs_value) }}</span></div>
					<div class="hold-foot-item">{{$t('trade').j41}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.rjmoney) }}</span></div>
					<div class="hold-foot-item flex-end">
						{{$t('trade').j42}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.subs_value - item.rjmoney) }}</span></div>
				</div>
			</div>
		</template>
		<template v-if="topIndex==3">
			<no-data v-if="!daList1.length"></no-data>
			<div class="hold" v-for="(item, index) in daList1" :key="index">
				<div class="hold-top">
					<div class="hold-top-left">
						<div class="hold-top-name">{{ item.stock_name }}</div>
						<div class="hold-top-bottom">
							<span class="hold-top-code">{{ item.stock_code }}</span>
						</div>
					</div>
				</div>
				<div class="hold-foot">
					<div class="hold-foot-item flex-start">
						{{$t('trade').j43}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price, 3) }}</span></div>
					<div class="hold-foot-item">{{$t('trade').j44}}<span>{{ $formatMoney(item.zhang, 0) }}</span></div>
					<div class="hold-foot-item flex-end">
						{{$t('trade').j45}}<span>{{ $formatMoney(item.cj_num, 0) }}</span></div>
				</div>
			</div>
		</template>
		<template v-if="topIndex==4">
			<no-data v-if="!daList2.length"></no-data>
			<div class="hold" v-for="(item, index) in daList2" :key="index">
				<div class="hold-top">
					<div class="hold-top-left">
						<div class="hold-top-name">{{ item.stock_name }}</div>
						<div class="hold-top-bottom">
							<span class="hold-top-code">{{ item.stock_code }}</span>
						</div>
					</div>
				</div>
				<div class="hold-foot">
					<div class="hold-foot-item flex-start">
						{{$t('trade').j43}}<span>{{stockType=='Spain'?'€ ':'$ '}}{{ $formatMoney(item.buy_price, 3) }}</span></div>
					<div class="hold-foot-item">{{$t('trade').j44}}<span>{{ $formatMoney(item.zhang, 0) }}</span></div>
					<div class="hold-foot-item flex-end">
						{{$t('trade').j45}}<span>{{ $formatMoney(item.cj_num, 0) }}</span></div>
				</div>
			</div>
		</template>

		<!-- 持仓中弹出层 -->
		<van-popup v-model="show1" position="center" :style="{ width: '90%' }" :round="true">
			<div class="popup">
				<div class="popup-title"><span
						:class="detailItem.yingkui>0?'green':'red'">{{stockType=='Spain'?'€ ':'$ '}}{{$formatMoney(detailItem.yingkui, 3)}}</span>{{$t('trade').j26}}
				</div>
				<div class="popup-foot">
					<div class="popup-foot-left" @click="goItem(detailItem)">{{$t('trade').j27}}</div>
					<div class="popup-foot-right" @click="sellStrategy(detailItem.id)">{{$t('trade').j28}}</div>
				</div>
			</div>
		</van-popup>
		<van-popup v-model="show2" position="center" :style="{ width: '90%' }" :round="true">
			<div class="popup">
				<div class="popup-title">{{$t('trade').j29}}</div>
				<div class="popup-foot">
					<div class="popup-foot-left" @click="goItem(detailItem)">{{$t('trade').j27}}</div>
					<div class="popup-foot-right" @click="cancelStrategy(detailItem.id)">{{$t('trade').j30}}</div>
				</div>
			</div>
		</van-popup>

		<tab-bar :current="2"></tab-bar>

		<loading ref="loading" />
	</div>
</template>

<script>
	import * as echarts from "echarts";
	import {
		change
	} from "../../assets/lang/kor";
	export default {
		name: "trade",
		props: {},
		data() {
			return {
				top: [
					{
						name: this.$t('stockTab').j1,//西班牙,
						type: 0
					},
					{
						name: this.$t('stockTab').j2,//美国
						type: 5
					},
					{
						name: this.$t('stockTab').j3,//数字货币
						type: 7
					},
					{
						name: this.$t('stockTab').j4,//外汇
						type: 8
					},
					/* {
						name: this.$t('market').j4,
						type: 6
					}, */

					/* {
						name: this.$t('trade').j2,
						type: 1
					}, */
					/* {
						name: this.$t('trade').j3,
						type: 2
					},
					{
						name: this.$t('trade').j4,
						type: 3
					},
					{
						name: this.$t('trade').j5,
						type: 4
					}, */
				],
				topIndex: 0,
				nav: [{
						name: this.$t('trade').j6,
						type: 0
					},
					{
						name: this.$t('trade').j7,
						type: 1
					},
					{
						name: this.$t('trade').j8,
						type: 2
					},
				],
				navIndex: 0,
				holdList: [],
				show1: false,
				show2: false,
				sellList: [],
				gdList: [],
				xinguList: [],
				daList1: [],
				daList2: [],
				detailItem: {},
				stockType: 'usd',
				positionlistinteval: null
			};
		},
		components: {},
		computed: {},
		mounted() {
			let tmp = window.localStorage.getItem('stockType')||'usd';
			if(tmp=='Spain'){
				this.topIndex = 0;
			}else if(tmp=='usd'){
				this.topIndex = 5;
			}else if(tmp=='usdt'){
				this.topIndex = 7;
			}else if(tmp=='wh'){
				this.topIndex = 8;
			}
			this.changeTop();
		},
		beforeDestroy() {
			clearInterval(this.positionlistinteval);
		},
		methods: {
			changeTop() {
				let _this = this;
				clearInterval(this.positionlistinteval);
				if (this.topIndex == 0) {//西班牙,
					this.stockType = 'Spain'
					this.getHold();
					this.getSell();
					this.positionlistinteval = setInterval(function(){
						_this.getHold();
						_this.getSell();
					},8000)
					window.localStorage.setItem('stockType',this.stockType);
				}
				if (this.topIndex == 1) {
					this.getGd()
				}
				if (this.topIndex == 2) {
					this.getXingu()
				}
				if (this.topIndex == 3) {
					this.getDa1()
				}
				if (this.topIndex == 4) {
					this.getDa2()
				}
				if (this.topIndex == 5) {//美国
					this.stockType = 'usd'
					this.getHold()
					this.getSell();
					this.positionlistinteval = setInterval(function(){
						_this.getHold();
						_this.getSell();
					},8000)
					window.localStorage.setItem('stockType',this.stockType);
				}
				if (this.topIndex == 7) {//数字货币
					this.stockType = 'usdt'
					this.getHold()
					this.getSell();
					this.positionlistinteval = setInterval(function(){
						_this.getHold();
						_this.getSell();
					},8000)
					window.localStorage.setItem('stockType',this.stockType);
				}
				if (this.topIndex == 8) {//外汇
					this.stockType = 'wh'
					this.getHold()
					this.getSell();
					this.positionlistinteval = setInterval(function(){
						_this.getHold();
						_this.getSell();
					},8000)
					window.localStorage.setItem('stockType',this.stockType);
				}
				if (this.topIndex == 6) {
					this.getHold()
					this.getSell()
				}
			},
			changeNav(type) {
				this.navIndex = type
				if (this.navIndex == 0) {
					this.getHold()
				}
				if (this.navIndex == 1) {
					this.getHold()
				}
				if (this.navIndex == 2) {
					this.getSell()
				}
			},
			getHold() {
				//console.log(this.topIndex)
				this.$server.post("/trade/userstocklist", {
					type: this.stockType=='Spain'?'Spain':'usd',
				}).then((res) => {
					this.$refs.loading.close();
					if (res.status == 1) {
						this.holdList = res.data;
						if(this.topIndex==5){
							this.holdList = this.holdList.filter(function(item,idx){
								//return item.is_qc!=4 && item.is_qc!=5;
								return item.other_type != 'CRY'&& item.other_type != 'FX'
							})
						}else if(this.topIndex==7){
							this.holdList = this.holdList.filter(function(item,idx){
								//return item.is_qc==5;
								return item.other_type == 'CRY'
							})
						}else if(this.topIndex==8){
							this.holdList = this.holdList.filter(function(item,idx){
								//return item.is_qc==4;
								if(item.stock_name=='Gold'){
									item.stock_name = 'XAU/USD'
								}
								return item.other_type == 'FX'
							})
						}
						this.getNowPrice();
					}
				});
			},
			async getNowPrice(){
				for(var i in this.holdList){
					var row = this.holdList[i];
					if(!row.nowprice){
						let res = await this.$server.post("/trade/stockdetails", {
							symbol: row.stock_code,
							type: this.stockType=='Spain'?'Spain':'usd',
						});
						if(res&&res.data){
							row.nowprice = res.data.price;
							row.gain = Number((row.nowprice - row.buy_price)/row.buy_price*100).toFixed(2)
						}
					}
				}
			},
			goItem(item) {
				this.$refs.loading.open(); //开启加载
				this.$storage.save("currentItem", item);
				setTimeout(() => {
					this.$refs.loading.close();
					this.$toPage("/trade/positionDetail");
				}, 500);
			},
			sellItem(item) {
				if(item.status==3){
					this.cancelItem(item);
					return;
				}
				this.detailItem = item;
				this.show1 = true;
			},
			sellStrategy(id) {
				this.$server.post("/trade/sell_stock", {
					id,
					type: this.stockType=='Spain'?'Spain':'usd',
				}).then((res) => {
					if (res.status == 1) {
						this.$toast(this.$t(res.msg));
						this.show1 = false;
						this.changeNav(2); //平倉成功切換顯示已平倉
					}
				});
			},
			cancelItem(item) {
				this.detailItem = item;
				this.show2 = true;
			},
			cancelStrategy(id) {
				this.$server.post("/trade/cancel_stock", {
					id,
					type: this.stockType=='Spain'?'Spain':'usd',
				}).then((res) => {
					if (res.status == 1) {
						this.$toast(this.$t(res.msg));
						this.show2 = false;
						this.changeTop();
					}
				});
			},
			getSell() {
				this.$refs.loading.open();
				this.$server.post("/trade/userstocklists", {
					type: this.stockType=='Spain'?'Spain':'usd',
				}).then((res) => {
					this.$refs.loading.close();
					if (res.status == 1) {
						this.sellList = res.data;
						if(this.topIndex==5){
							this.sellList = this.sellList.filter(function(item,idx){
								//return item.is_qc!=4 && item.is_qc!=5;
								return item.other_type != 'CRY'&& item.other_type != 'FX'
							})
						}else if(this.topIndex==7){
							this.sellList = this.sellList.filter(function(item,idx){
								//return item.is_qc==5;
								return item.other_type == 'CRY'
							})
						}else if(this.topIndex==8){
							this.sellList = this.sellList.filter(function(item,idx){
								//return item.is_qc==4;
								return item.other_type == 'FX'
							})
						}
					}
				});
			},
			getGd() {
				this.$server
					.post("/trade/userproductlist", {
						type: this.$stockType
					})
					.then((res) => {
						this.$refs.loading.close(); //关闭加载
						if (res.status == 1) {
							this.gdList = res.data;
						}
					});
			},
			getXingu() {
				this.$server.post("/trade/usernewstocklist", {
					type: this.$stockType,
					buy_type: 0,
				}).then((res) => {
					this.$refs.loading.close(); //关闭加载
					this.loading1 = false;
					if (res.status == 1) {
						this.xinguList = res.data;
					}
				});
			},
			getDa1() {
				this.$server.post("/trade/ustockslist", {
					type: this.$stockType,
					dz_type: 0,
					is_qc: 2,
				}).then((res) => {
					this.$refs.loading.close(); //关闭加载
					if (res.status == 1) {
						this.daList1 = res.data;
					}
				});
			},
			getDa2() {
				this.$server.post("/trade/ustockslist", {
					type: this.$stockType,
					dz_type: 1,
					is_qc: 2,
				}).then((res) => {
					this.$refs.loading.close(); //关闭加载
					if (res.status == 1) {
						this.daList2 = res.data;
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
		padding-top: .58rem;
		padding-bottom: .85rem;
	}

	.top {
		width: 100%;
		height: .58rem;
		background: #015AA4;
		position: fixed;
		left: 0;
		top: 0;

		.top-box {
			width: 100%;
			height: .58rem;
			display: flex;
			align-items: center;
			overflow-x: scroll;
			scrollbar-width: none;
			scrollbar-color: transparent transparent;
		}

		.top-item {
			font-weight: 500;
			font-size: 0.13rem;
			color: rgba(255, 255, 255, .5);
			padding: 0 .15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: nowrap;
		}

		.top-on {
			font-weight: 500;
			font-size: 0.13rem;
			color: #fff;
		}
	}

	.nav {
		height: .47rem;
		display: flex;
		align-items: flex-end;

		.nav-item {
			padding: 0 .14rem;
			height: .47rem;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			font-weight: 500;
			font-size: 0.13rem;
			color: rgba(152, 152, 152, 1);
			line-height: 0.19rem;

			span {
				width: 0.27rem;
				height: 0.04rem;
				background: transparent;
				border-radius: 0.02rem;
				display: block;
				margin-top: .1rem;
			}
		}

		.nav-on {
			color: rgba(17, 17, 17, 1);

			span {
				background: #015AA4;
			}
		}
	}

	.hold {
		border-top: .01rem solid rgba(247, 247, 247, 1);
		padding: .16rem;

		.hold-top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.hold-top-left {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.hold-top-name {
				display: flex;
				align-items: center;
				font-weight: 500;
				font-size: 0.14rem;
				color: #111111;
				line-height: 0.2rem;

				span {
					margin-left: .07rem;
					height: 0.19rem;
					background: #F5F5F3;
					border-radius: 0.04rem;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 .05rem;
					font-weight: 400;
					font-size: 0.11rem;
					color: #015AA4;
				}
			}

			.hold-top-bottom {
				display: flex;
				align-items: center;
				margin-top: .04rem;
			}

			.hold-top-type {
				height: 0.19rem;
				border-radius: 0.04rem;
				padding: 0 .03rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 400;
				font-size: 0.11rem;
				color: #FFFFFF;
				margin-right: .08rem;
			}

			.hold-top-code {
				height: 0.19rem;
				background: #015AA4;
				border-radius: 0.04rem;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 .08rem;
				font-weight: 400;
				font-size: 0.11rem;
				color: #FFFFFF;
			}

			.green {
				background: #41BC9A;
			}

			.red {
				background: rgba(224, 48, 47, 1);
			}

			.hold-top-arrow {
				width: 0.08rem;
				height: 0.15rem;
				margin-left: .1rem;
			}

			.hold-top-retreat {
				height: 0.25rem;
				background: #015AA4;
				border-radius: 0.04rem;
				padding: 0 .15rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 400;
				font-size: 0.12rem;
				color: #fff;
			}

			.hold-top-sell {
				font-weight: 400;
				font-size: 0.12rem;
				color: #999999;
			}
		}

		.hold-middle {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: .12rem;

			.hold-middle-left {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-weight: 400;
				font-size: 0.1rem;
				color: #9A9A9A;
				line-height: 0.14rem;

				span {
					font-weight: 600;
					font-size: 0.15rem;
					line-height: 0.21rem;
					margin-top: .01rem;
				}

				.green {
					color: #41BC9A;
				}

				.red {
					color: rgba(224, 48, 47, 1);
				}
			}

			.hold-middle-right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-end;
				font-weight: 400;
				font-size: 0.1rem;
				color: #9A9A9A;
				line-height: 0.14rem;

				span {
					font-weight: 600;
					font-size: 0.15rem;
					line-height: 0.21rem;
					margin-top: .01rem;
				}

				.green {
					color: #41BC9A;
				}

				.red {
					color: rgba(224, 48, 47, 1);
				}
			}
		}

		.hold-foot {
			display: flex;
			flex-wrap: wrap;

			.hold-foot-item {
				width: calc(100% / 3);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-weight: 400;
				font-size: 0.1rem;
				color: #9A9A9A;
				line-height: 0.14rem;
				margin-top: .1rem;

				span {
					font-weight: 400;
					font-size: 0.12rem;
					color: #111111;
					line-height: 0.17rem;
					margin-top: .05rem;
				}
			}

			.flex-start {
				align-items: flex-start;
			}

			.flex-end {
				align-items: flex-end;
			}
		}

		.hold-btn {
			height: 0.26rem;
			background: #F5F5F3;
			border-radius: 0.04rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 0.11rem;
			color: #9A9A9A;
			margin-top: .11rem;
		}
	}

	.popup {
		background: #FFFFFF;
		border-radius: 0.12rem;

		.popup-title {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: .2rem .1rem;
			font-weight: 400;
			font-size: 0.14rem;
			color: #9A9A9A;

			span {
				font-weight: 400;
				font-size: 0.18rem;
			}

			.green {
				color: #41BC9A;
			}

			.red {
				color: rgba(224, 48, 47, 1);
			}
		}

		.popup-foot {
			border-top: .01rem solid rgba(0, 0, 0, 0.10);
			height: .44rem;
			display: flex;
			align-items: center;

			.popup-foot-left {
				width: 50%;
				height: .44rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border-right: .01rem solid rgba(0, 0, 0, 0.10);
				box-sizing: border-box;
				font-weight: 500;
				font-size: 0.14rem;
				color: #000000;
			}

			.popup-foot-right {
				width: 50%;
				height: .44rem;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				font-weight: 500;
				font-size: 0.14rem;
				color: #E0302F;
			}
		}
	}
</style>