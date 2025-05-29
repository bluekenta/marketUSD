<template>
	<div class="page ">
		<top-back :title="$t('mine').j14"></top-back>
		<div class="list">
			<div class="item" v-if="lang=='cn'">
        Eaton Vance成立于1924年，总部位于美国波士顿，是一家历史悠久的独立资产管理公司。公司专注于主动投资管理，涵盖股票、基金、固定收益、多资产等多个领域。Eaton Vance致力于为全球机构与高净值客户提供多样化、高质量的投资方案，凭借专业的能力与高收益回报，赢得了全球广大投资者的长期信任。
      </div>
      <div class="item" v-if="lang=='en'">
        Eaton Vance, founded in 1924 and headquartered in Boston, USA, is a long-established independent asset manager.
        <br/><br/>
        Specializing in active management, it offers diversified investment solutions in equities, funds, fixed income, and multi-asset strategies. The firm is committed to providing institutional and private wealth clients globally with high-quality, consistently profitable products, which has earned it the continued trust of investors worldwide.
      </div>
      <div class="item" v-if="lang=='kor'">
        1924년에 설립되어 미국 보스턴에 본사를 둔 이튼 밴스는 오랜 역사를 가진 독립 자산 관리 회사입니다.
        <br/><br/>
        적극적 운용을 전문으로 하며, 주식, 펀드, 채권, 멀티자산 전략에 대한 다양한 투자 솔루션을 제공합니다. 이 회사는 전 세계의 기관 및 개인 자산 고객에게 지속적으로 수익성이 높은 고품질 상품을 제공하기 위해 최선을 다하고 있으며, 이를 통해 전 세계 투자자들의 지속적인 신뢰를 얻고 있습니다.
      </div>
      <div class="item" v-if="lang=='de'">
        Eaton Vance, gegründet 1924 mit Hauptsitz in Boston, USA, ist ein alteingesessener unabhängiger Vermögensverwalter.
        <br/><br/>
        Das auf aktives Management spezialisierte Unternehmen bietet diversifizierte Anlagelösungen in den Bereichen Aktien, Fonds, festverzinsliche Wertpapiere und Multi-Asset-Strategien. Das Unternehmen hat sich zum Ziel gesetzt, institutionellen und privaten Vermögenskunden auf der ganzen Welt qualitativ hochwertige und dauerhaft rentable Produkte anzubieten, wodurch es sich das anhaltende Vertrauen von Anlegern auf der ganzen Welt verdient hat.
      </div>
      <div class="item" v-if="lang=='tr'">
        Eaton Vance, 1924 yılında kurulan ve merkezi ABD'nin Boston kentinde bulunan köklü bir bağımsız varlık yöneticisidir.
        <br/><br/>
        Aktif yönetim konusunda uzmanlaşmış olup, hisse senetleri, fonlar, sabit getirili yatırımlar ve çok varlıklı stratejilerde çeşitlendirilmiş yatırım çözümleri sunmaktadır. Şirket, dünya çapındaki kurumsal ve özel varlık müşterilerine yüksek kaliteli, sürekli karlı ürünler sunmaya kendini adamıştır ve bu sayede dünya çapındaki yatırımcıların güvenini kazanmıştır.
      </div>
      <div class="item" v-if="lang=='yn'">
        Eaton Vance, được thành lập vào năm 1924 và có trụ sở chính tại Boston, Hoa Kỳ, là công ty quản lý tài sản độc lập lâu đời.
        <br/><br/>
        Chuyên về quản lý chủ động, công ty cung cấp các giải pháp đầu tư đa dạng vào cổ phiếu, quỹ, trái phiếu và các chiến lược đa tài sản. Công ty cam kết cung cấp cho các tổ chức và khách hàng tư nhân trên toàn cầu các sản phẩm chất lượng cao, có lợi nhuận ổn định, điều này đã giành được sự tin tưởng liên tục của các nhà đầu tư trên toàn thế giới.
      </div>
      <div class="item" v-if="lang=='thai'">
        Eaton Vance ก่อตั้งในปีพ.ศ. 2467 และมีสำนักงานใหญ่ในเมืองบอสตัน ประเทศสหรัฐอเมริกา เป็นผู้จัดการสินทรัพย์อิสระที่มีประสบการณ์มายาวนาน
        <br/><br/>
        เชี่ยวชาญด้านการบริหารจัดการเชิงรุก โดยนำเสนอโซลูชันการลงทุนที่หลากหลายในด้านหุ้น กองทุน ตราสารหนี้ และกลยุทธ์สินทรัพย์หลายประเภท บริษัทมีความมุ่งมั่นที่จะมอบผลิตภัณฑ์ที่มีคุณภาพสูงและสร้างผลกำไรอย่างสม่ำเสมอให้กับลูกค้าสถาบันและนักลงทุนทั่วโลก ซึ่งได้รับการไว้วางใจอย่างต่อเนื่องจากนักลงทุนทั่วโลก
      </div>
      <div class="item" v-if="lang=='yd'">
        1924 में स्थापित और बोस्टन, संयुक्त राज्य अमेरिका में मुख्यालय वाली ईटन वेंस एक लम्बे समय से स्थापित स्वतंत्र परिसंपत्ति प्रबंधक है।
        <br/><br/>
        सक्रिय प्रबंधन में विशेषज्ञता के साथ, यह इक्विटी, फंड, निश्चित आय और बहु-परिसंपत्ति रणनीतियों में विविध निवेश समाधान प्रदान करता है। यह फर्म वैश्विक स्तर पर संस्थागत और निजी संपत्ति ग्राहकों को उच्च गुणवत्ता वाले, लगातार लाभदायक उत्पाद उपलब्ध कराने के लिए प्रतिबद्ध है, जिसने दुनिया भर के निवेशकों का निरंतर विश्वास अर्जित किया है।
      </div>
      <div class="item" v-if="lang=='spa'">
        Eaton Vance, fundada en 1924 y con sede en Boston (EE. UU.), es una gestora de activos independiente con una larga trayectoria.
        <br/><br/>
        Especializada en gestión activa, ofrece soluciones de inversión diversificadas en renta variable, fondos, renta fija y estrategias multiactivo. La firma está comprometida con brindar a clientes institucionales y patrimonios privados a nivel global productos de alta calidad y rentabilidad constante, lo que le ha valido la confianza sostenida de los inversores en todo el mundo.
      </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "aboutUs",
		props: {},
		data() {
			return {
				lang: "",
			};
		},
		components: {},
		methods: {
		},
		created() {
      this.lang = localStorage.getItem('language') || 'en'
		},
		computed: {},
	};
</script>

<style scoped lang="less">
	.page {
    padding: .15rem;
		min-height: 100vh;
	}

	.list {
		.item {
			line-height: 0.2rem;
      font-size: .13rem;
      color: #333;
		}
	}
</style>