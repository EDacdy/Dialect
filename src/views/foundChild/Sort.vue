<!--  -->
<template>
  <div style="padding-top:46px;">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">汉语方言分类</div>
      <div slot="right-screen"></div>
    </NavBar>
    <van-tabs sticky swipeable>
      <van-tab v-for="(data,index) in list" :key="index">
        <span slot="title">{{data.sort}}</span>
        <div slot="default" class="default">
          <div v-html="data.content" class="zhaiyao"></div>

          <div v-html="data.tedian"></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      list: [
        {
          sort: "官话",
          content:
            "<p><b></b></p><b></b><b><h2>官话</h2></b><b></b>（又称北语、北方话、官话方言。此外有时也称北方方言）为汉语的一支，主体为北方汉语。若视汉语为一种语言，则官话是汉语的一级方言，下分北方官话、中原官话和南方官话。若视汉语为“汉语族”，视官话为独立语言的话，则官话下有数支官话的方言。无论如何划分，官话的地位都跟吴语、粤语、闽语、湘语、客语、赣语等相同，要么同为独立语言，要么同为汉语下的一级方言。​​",
          tedian:
            "<p><b>语法:</b><p>  官话的基本语序为主谓宾结构。官话的词汇主要来源于文言文中的固有词汇，以及在清朝时期从日本引入的词汇，外来语较少。近年由于与外国交流日益增多，外来语逐渐增多，以及网络语言使日常口语多元化。</p><b>方言字:</b></p><p><p><p><p>﻿  北方官话中的方言字保留于普通话中，如“甭”（不用）、嫑（不要）、“孬”（不好）、“俺”（我）、“咋”（怎么）、“咱”（含对方在内的我们）、“啥”（什么）。</p><p>  北方官话的大部分口语可以容易书写为书面语，但南方官话（如四川话所使用的四川方言字）因拥有大量不见于现代标准汉语的特有词汇，仍拥有较多独特的方言字。</p></p></p></p>"
        },
        {
          sort: "晋语",
          content:
            "<p><b></b></p><b><h2>晋语</h2></b>是中国北方的唯一一个非官话方言。晋语使用人口约6305万，晋语区东起太行山、西近贺兰山、北抵阴山、南至黄河汾渭河谷，是中华文明的重要发源地。 晋语的主要使用地区有山西省、内蒙古自治区中西部、陕西省北部、河南省黄河以北大部、河北省西部，地跨175个市县。晋语位于黄土高原，地理环境相对封闭，是造成晋语在北方较为独特的原因。晋语核心区主要为太原话（已分化成新老两派）和吕梁话。",
          tedian:
            "<p><b></b></p><b><h2></h2><b>分片:<br></b></b><div>  <b></b>并州片、吕梁片、上党片、五台片、邯新片、张呼片、志延片<b><br><b>圪头词:</b><br></b>  <b></b>晋语很有特点的一类词汇，因其都带有前缀“圪”，故名圪头词。<b><br><b>合音词：</b><br></b>  <b></b>部分地区有合音情况，比较常见的有以下几个。例如：嫊，媳妇之合音，主要见于吕梁片与汾河片,简，少单用，常用于“简婆”、“简爷”中，意为“外婆”、“外公”。根据晋南称呼为“舅舍爷”、“舅庄爷”等，疑此字为“舅间”之合音。<b><br><b>分音词:</b><br></b>  <b></b>晋语常把单音节字分割为两个字，即分音词，从而产生新的词语。&nbsp;<b></b>"
        },
        {
          sort: "吴语",
          content:
            "<b><h2>吴语</h2></b>又称吴越语、江浙话、江南话、江东话，是吴越民系使用的语言。吴语方言主要在江苏南部、上海市、浙江绝大部分、安徽南部部分地区使用。可分为太湖片、台州片、温州片、金衢片、上丽片、宣州片六片。",
          tedian:
            "<b>语法:</b><br>  有结果体，用“脱”、“落”、“掉”等表示，如苏州：只台子坏脱哉。<br>  话题句比普通话占优势，如绍兴：箇只电影我看过哉。<br>  谓语动词的修饰语常后置，如温州：你走先，我走来道。<br><b>表记系统:</b><br>  吴语书面文、吴语文学、吴歌、吴语戏曲、吴语小说<br><b>后置用法:</b><br>  定语后置于名词（如：“腰身，闹热，菜咸，笋干，饭焦，豆腐软，鱼生，菜头生，楼阁，酒汗，板砧，膀蹄，头衔，鞋拖，墙围”等）;<br>  副词后置于动词（如：“吃添、走先、到道、走来罢”等）;<br>  副词后置于形容词（如：“红显、苦倒”等）"
        },
        {
          sort: "徽语",
          content:
            "<h2>徽语</h2>主要指的是北方官话以及其衍生：指今日华北、东北及西北地区、湖北大部分地区、四川、重庆、云南、贵州、湖南北部和西南、江西沿江地区、安徽中北部、江苏中北部所使用的母语方言。<br>徽语与吴语及赣语相较，徽语兼具两者特色，如声母系统接近赣语，而韵母系统则与南部吴语接近。徽语残留了一些中古汉语的特征，如入声、次浊音。",
          tedian: "<b>分片:</b><br>  徽州话可以细分为五个片，分别是：绩歙片、休黟片、祁婺片、严州片、旌占片<br><b>语言关系:</b><br>  塞音、塞擦音只有送气、不送气两套。中古全浊声母清化后多数送气，少数不送气。和闽语相似，近似客赣方言。<br>  去声分阴阳，有丰富的小称变调和n化，日母字今多读n，中古咸山摄洪音鼻音韵尾消失，蟹、 效、 流摄韵母多为单元音，与吴语相似。<br>  泥来二母逢洪音相混，新派区分泥来。中古影母洪音字今有ŋ声母， 与赣语相似。"
        },
        {
          sort: "赣语",
          content:
            "<h2>赣语</h2>或称江西话，以南昌话为代表，主要用于江西中北部、安徽西部及南部、湖北东南部、湖南东部靠近江西一侧的狭长地带（如浏阳、平江、茶陵等地）以及湖南西部的部分地区。使用人数约为汉语总人口的6%。赣语方言主要包括：北部地区的南昌话、东部地区的鹰潭话、中部地区的抚州话、西部地区的宜春话、西南部地区的吉安话。多数赣语方言的古浊声母读为送气清音。",
          tedian: "<b>赣语主体区通行地域的四极为：</b><br>  极北：安徽的岳西<br>  极东：江西的铅山<br>  极南：湖南的资兴<br>  极西：湖南的洞口<br><b>发展历史:</b><br>  赣语区的地理位置决定了赣语必然的多元的历史层次。远古时期百越聚居的情况、上古时期“吴头楚尾”的辖治给赣语打下了底层印记，历史上中原汉民数次大规模迁徙更给赣语留下了深深的痕迹。宋朝以降，江西地区经济文化等方面的发展达到了空前的高度。赣语的历史发展，自上古时期至现今，至少有1500年以上的主要发展史。"
        },
        {
          sort: "闽语",
          content:
            "<h2>闽语</h2>在中国大陆俗称福建话，即汉藏语系汉语族闽语支，为传统的“汉语族七大语言”架构中的语言（汉语变体）之一。闽语实质上是一群相互关联的声调语言，主要分布于福建除开闽西外绝大多数地区、海南、浙江南部、广东东南部和南部，以及台湾、新加坡、马来西亚、海外闽台裔人群。闽语是汉语的一支。",
          tedian: "<b>分片：</b><br>  闽东语、闽南语、闽北语、闽中语、莆仙语、闽客赣过渡区、闽粤过渡区、闽语过渡区、琼雷话<br><b>差异:</b><br>  闽中、北地区，向来有十里不同音的说法，有的甚至仅相隔一山便无法对谈。通常越往沿海地区移动，随着交通的便利和受官话影响，口语的互通程度就越高。<br>  闽南地区的泉州、厦门、漳州、台湾所使用的泉漳话，和东南亚的闽台片闽南语可以彼此沟通，与潮汕地区的潮州话（为闽南语分支）也能有一定程度的相互理解性，且使用人口众多加上分布广泛，也成为很具影响力的一支闽语分支。<br>  福州话不仅在福州（福州十邑）与海外（东南亚、日本、北美）福州人社区之间可以顺利沟通，与邻近的福安话也有一定程度相近，但与闽南语无法互相沟通。"
        },
        {
          sort: "湘语",
          content:
            "<h2>湘语</h2>又称作湘方言，有时也被泛称为湖南话，是生活在中国洞庭湖、湘江、资江流域一带的湖湘民系使用的母语。现在，湘语使用者主要分布在湖南的大部分地区，包括长沙、株洲、湘潭、岳阳、益阳、娄底、衡阳、邵阳、怀化、永州等，以及广西壮族自治区的东北部一带。",
          tedian: "<b>以共性层次来看，判断湘语可以通过这些标准:</b><br>  古全浊声母舒声字今逢塞音、塞擦音时，无论清浊，一般都念不送气音；<br>  无论是否保留入声，古塞音韵尾[-p]、[t]、[k]均完全消失，也无喉塞音[ʔ]；<br>  声调基本在五至七调，绝大多数去声分阴阳；<br>  地域标准：地处湘江，资江流域，沅江中游部分地区，抑或南岭地区，或者是有充分依据证明是由以上地区外迁移民造成的方言岛或方言飞地。"
        },
        {
          sort: "粤语",
          content:
            "<h2>粤语</h2>又称广东话，在粤语使用区中又称白话，在中国以外地区又称唐话，是汉藏语系汉语族的一种语言。粤语是汉语的一支，若视汉语为一种语言，则粤语是汉语在广东和广西地区形成的一级方言，下分数支二级方言。若视汉语为“汉语族”及视粤语为独立语言，则粤语下有数支粤语的方言。粤语是一种声调语言，受五代十国时期人口南迁影响，保留了大量古汉语用词。",
          tedian: "<b>历史：</b><br>  粤语的历史可以追溯至公元前，秦国南攻百越之时，甚至雅言。南宋朱熹说：“因说四方声音多讹，曰却是广中人说得声音尚好。<br><b>文学：</b><br>  粤语文学有非常悠久的历史，在传统的岭南戏剧，对白及唱词包含了不少的粤语口语的成分，粤讴、童谣、山歌，及木鱼书等，都有浓厚的岭南色彩〔岭南文化〕<br><b>代表音:</b><br>  广州口音是约定俗成的、国际承认的粤语的代表音，大多粤语字典以广州音为准。广州以粤剧、粤曲等传统艺术长期保持广州话的代表地位。至1970年代末以后，香港粤语流行曲、影视娱乐强势影响广东地区。有些粤语方言和广州话较为接近，如广西南宁，以南宁白话为代表，与西关口音的广州话高度相似，总体与广东广府方言片区（即广府话）相似度高达90%，除少数俚语不同外，两地方言交流完全不存在问题，钦廉方言与邕浔方言靠拢；而广东台山的四邑方言、广西东部、广东西部的勾漏方言、广东西南部的高阳方言、海南岛的儋州方言，以及珠江三角洲东侧的莞宝方言，则同广州话口音差异较为明显。"
        },
        {
          sort: "客家话",
          content:
            "<h2>客家话</h2>亦称客语、客家语、客话，以梅县话为代表。作为现时的一种南方变体，客家话是在唐宋变革时期北方移民南下的影响中形成的，客家话因而保留了较多中古汉语的特点。各地客家话中的入声韵，还不同程度地保留着中古汉语中存在的塞音及鼻音韵尾。客家话也是海外华人（包括越南艾族）社区使用较多的汉语分支。使用客家话的人口大约占汉语总人口的3%。",
          tedian: "<b>属性和分布：</b><br>  客家语是客家民系的母语，分布区域非常广泛，遍及中国大陆东南沿海、南部、西部包括四川等省份，另亦见于香港（尤其在新界地区）、台湾及海外客家人移民地区（如毛里求斯、印度等等）。比较集中的中心文化区位于广东省的东北部即粤东、粤北以及江西的南部，福建的西部。即闽粤赣三角地带。亦称闽粤赣边区或者岭东地区。客家语也因此叫岭东语。<br><b>书写形式：</b><br>  客家语过去一直都使用汉字来书写。19世纪中期，基督教教士为了方便传教，为文盲的平民创立了多种客家语的拉丁拼音字母。这些拼音字母，大都依照每个地方的乡谈来设计，所以，变成了不同地方的客家语的写法都不同。<br>  世界名著《小王子》亦于2000年从英文转译成客家语出版。该书是基于苗栗的方言，一种演变自四县话的方言。该书亦是双语版本，不过采用的是通用拼音。"
        },
        {
          sort: "平话",
          content:
            "<h2>广西平话</h2>是中国广西、广东、湖南、云南部分地区的若干类方言的笼统称谓。分南部平话（桂南平话）和北部平话（桂北平话）两大类。桂南平话内部比较一致，具有显著的粤语特征，与粤语勾漏片接近，传统上将桂南平话归入粤语。桂北平话与桂南平话有很大不同，且桂北平话内部各方言之间差差异也很大，不是一种单一的方言。桂北平话具有某些湘语特征，又与湘南土话有一些联系。",
          tedian: "<b>语言特点：</b><br>  各地平话有一个共同的语音特点，即古全浊声母清化后塞音塞擦音大多不送气，和全清声母合流。以灵川三街话（桂北平话）和南宁心圩话（桂南平话） 。各地平话有或大或小的差别。桂北平话内部分歧较大，桂南平话内部一致性较高。以南宁市亭子平话为代表的桂南平话语音系统声母22个，韵母43个。根据研究人员发表于学术刊物上的材料，平话的特点主要有以下几项：<br>  保留入声（塞音韵尾）分尖团；<br>  中古汉语中先、萧等三等韵的主元音作细音，齐、痕等韵作洪音；<br>  歌、寒、唐等韵的主元音作a；<br>  全浊（浊塞音、浊塞擦音）清化，不分平仄，一律不送气；<br>  阳入分上下。"
        }
      ]
    };
  },
  components: {
    NavBar
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .van-tabs__line {
  background-color: rgb(77, 74, 74) !important;
}
.default {
  padding: 15px;
  text-align: justify;
  // white-space:
  line-height: 25px;
  color: black;
}
.default .zhaiyao {
  background-color: #f1f2f3;
  padding: 12px;
  margin-bottom: 15px;
}
</style>