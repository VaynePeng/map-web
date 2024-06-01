import L, { Map } from 'leaflet'
import { useEffect, useRef, useState } from 'react'

interface Marker {
  id: string
  lat: number
  lng: number
  width: number
  height: number
  voice: string
  content: string
}

const markers: Marker[] = [
  {
    id: 'zyjjb',
    lat: 10,
    lng: 113,
    width: 70,
    height: 65,
    voice: './voice/界碑.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">中英街界碑</div>
        <div id="zyjjb" class="m-body" style="display: none">
          <div class="m-title">中英街界碑</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/1中英街界碑.jpg"
              alt="中英街界碑"
              title="中英街界碑"
            />
            <p class="m-text">
              过了海关一进入中英街，在街口处就是中英街第7号界碑，中英街一共有8块界碑，第8号界碑位于鸿福桥下的河床中心。沿着这条购物街向前直行，我们可以陆续找到1-6号界碑，1-8号界碑从关口一直延续到海边，成为深港两地的分界线
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'lsbwg',
    lat: 135,
    lng: 110,
    width: 70,
    height: 65,
    voice: './voice/历史博物馆.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">中英街历史博物馆</div>
        <div id="lsbwg" class="m-body" style="display: none">
          <div class="m-title">中英街历史博物馆</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/11中英街历史博物馆.jpg"
              alt="中英街历史博物馆"
              title="中英街历史博物馆"
            />
            <p class="m-text">
              您目前正在走向警世钟身后的中英街历史博物馆，它以详实的史料全面记载了中英街一百多年来形成、变迁和发展的历史足迹。一楼展厅展览了《开拓——从山里迁来滨海的客家人》的主题下的沙头角和中英街历史故事。二楼展厅介绍的是《中英街形成——从鸦片战争到割占香港岛》的历史故事。三楼展厅则是《中英街变迁——从抗日烽火到边境管理》的相关故事。四楼展厅则是《中英街春天——从改革开放到百年梦圆》，形象生动地向观众讲述了改革开放后的中英街历史故事。博物馆承担着爱国主义教育基地建设、盐田区不可移动文物管理和非物质文化遗产保护与传承等工作职责。它与博物馆广场上悬挂的中英街警示钟相结合，共同纪念中英街的历史
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'gtgy',
    lat: 48,
    lng: 12,
    width: 70,
    height: 65,
    voice: './voice/古塔公园.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">中英街古塔公园</div>
        <div id="gtgy" class="m-body" style="display: none">
          <div class="m-title">中英街古塔公园</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/13中英街古塔公园.jpg"
              alt="中英街古塔公园"
              title="中英街古塔公园"
            />
            <p class="m-text">
              沿着海滨栈道一直往前走300米，在不远处可以看到中英街古塔公园。在这里不仅有观海亭和听涛轩，还有我们的仿宋古塔。它是一座六角七层四十四点八米的阁式建筑。夜晚，这里,华灯璀璨、魅力无限，既是深厚历史文化名街与现代都市青春活力的交响曲，也是中英街蝶变升级浓墨重彩的精彩缩影
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'mej',
    lat: 66,
    lng: 55,
    width: 70,
    height: 65,
    voice: './voice/麦奀记.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">麦奀记忠记</div>
        <div id="mej" class="m-body" style="display: none">
          <div class="m-title">麦奀记忠记</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/5麦奀记.jpg"
              alt="麦奀记忠记"
              title="麦奀记忠记"
            />
            <p class="m-text">
              在大榕树下，也是桥头街的尽头，您将看到麦奀记忠记，始创于1920年，总店在香港中环永吉街，是名副其实的百年老店。这里环境好，店员服务态度好，镇店之宝“香港云吞面”和“鲜虾云吞面”受大众喜爱，港式牛杂、咖喱鱼蛋等风味小吃价格公道，首创黑松露云吞面、凤城鲜虾水饺面、传统忠记鲜虾云吞面等招牌美食，价格基本都在30元左右，真可谓轻轻松松便能大快朵颐啊
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'ydwbwg',
    lat: 90,
    lng: 148,
    width: 70,
    height: 65,
    voice: './voice/鱼灯舞博物馆.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">鱼灯舞博物馆和鱼灯舞广场</div>
        <div id="ydwbwg" class="m-body" style="display: none">
          <div class="m-title">鱼灯舞博物馆和鱼灯舞广场</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/7鱼灯舞博物馆和鱼灯舞广场.jpg"
              alt="鱼灯舞博物馆和鱼灯舞广场"
              title="鱼灯舞博物馆和鱼灯舞广场"
            />
            <p class="m-text">
              沿着海傍路往前走大概200米左右，在路右侧便是鱼灯舞广场，广场旁边是沙栏吓村办公楼，鱼灯舞博物馆位于沙栏吓村办公楼二楼。沙头角鱼灯舞起源于清初乾隆年间，流传于沙头角、盐田及香港新界等地的一种民间艺术，有着悠久的历史传统和浓郁的民间气息，为渔民逢年过节、拜神祭祖必备节目。鱼灯舞的表演主要靠舞者以马步配合，用手挥动鱼灯高低起伏、上下左右翻动，表示鱼在悠闲、兴奋、受惊等情况下的普遍习性动作和个性特征动作。沙头角鱼灯舞是不同于我国其他鱼灯舞的一种颇具岭南特色的广场舞蹈艺术，起源久远，对研究岭南文化、海洋文化、以及审美学、民俗学、信仰崇拜等都有较高的价值。2008年沙头角舞鱼灯被列入第二批国家级非物质文化遗产名录。鱼灯舞博物馆开放时间是每天从早上9:00至下午5:00，免费开放，个人参观无需登记，团体参观需要预约登记，参观人数限制30人以内
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'gjxq',
    lat: 18,
    lng: 105,
    width: 70,
    height: 65,
    voice: './voice/古井乡情.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">古井乡情</div>
        <div id="gjxq" class="m-body" style="display: none">
          <div class="m-title">古井乡情</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/2古井乡情.jpg"
              alt="古井乡情"
              title="古井乡情"
            />
            <p class="m-text">
              界碑的左前方就可以看见一棵茂盛的参天古榕树，榕树下，我们可以看见一个古井，这就是中英街重要景点之——古井乡情。1949年中华人民共和国成立后，沙头角还保留了几口古井。1899年中英勘界后两口古井均被划在中方一侧，居住在新界沙头角的乡民们经常来中方一侧打水。因此在中英街两边的乡民中流传着同走一条街，共饮一井水的歌谣
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'qtj',
    lat: 30,
    lng: 90,
    width: 70,
    height: 65,
    voice: './voice/桥头街.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">桥头街</div>
        <div id="qtj" class="m-body" style="display: none">
          <div class="m-title">桥头街</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/3桥头街.jpg"
              alt="桥头街"
              title="桥头街"
            />
            <p class="m-text">
              古井旁就是著名的桥头街牌坊。桥头街牌坊以其精美的石雕和古朴的风格著称，其雕刻细腻入微，展示了中国传统建筑艺术的高超技艺和中国传统文化的独特魅力，它承载着沙头角镇丰富的历史文化底蕴，是深圳市文化遗产的重要组成部分。通过这座牌坊，我们就进入了桥头街。疫情后，桥头街顺应时代，迎来了焕彩蝶变，街两边引入深港两地的民众喜爱的港澳百年老字号小吃，如潮牌店铺、乐队表演、夜市文化等，吸引了众多年轻游客前往桥头街观光
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'lj',
    lat: 30,
    lng: 105,
    width: 70,
    height: 65,
    voice: './voice/良记.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">良记国际免税商场</div>
        <div id="lj" class="m-body" style="display: none">
          <div class="m-title">良记国际免税商场</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/1良记国际免税.jpg"
              alt="良记国际免税商场"
              title="良记国际免税商场"
            />
            <p class="m-text">
              在前方大榕树下的古井后便是良记国际免税商场。良记以其卓越的服务质量、丰富的商品种类和一流的购物环境，不仅满足了消费者的购物需求，更引领了中英街免税购物的新潮流。良记国际免税商场的商品种类之丰富。从世界各地的知名品牌化妆品、香水、手表、珠宝，到各类电子产品、特色食品，以及纪念品等，应有尽有。在良记国际免税商场，从购物咨询、商品包装到售后服务，每一个环节都感受到专业和热情；在良记国际免税商场，从宽敞明亮的购物空间，到优雅舒适的二搂休息区，再到便捷高效的汇率自动切换支付系统，每一个细节都体现了人性化的关怀。在这里，购物是一种享受和放松的方式。良记国际免税商场不仅致力于为消费者提供优质的购物体验，还积极承担社会责任，回馈社会。他们通过各种方式支持当地的社区发展，参与环保活动，以及为有需要的人提供帮助。这种企业精神和社会责任感，使得良记在国际社会上赢得了广泛的尊重和赞誉
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'ql',
    lat: 43,
    lng: 128,
    width: 70,
    height: 65,
    voice: './voice/骑楼.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">中英街骑楼</div>
        <div id="ql" class="m-body" style="display: none">
          <div class="m-title">中英街骑楼</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/9中英街骑楼.jpg"
              alt="中英街骑楼"
              title="中英街骑楼"
            />
            <p class="m-text">
              电商直播基地往关口方向望去，热闹非常的中英街上大大小小的深港免税商店鳞次栉比地排列着，在深圳一侧，两层式高大的骑楼建筑群往关口延伸，建筑款式是岭南骑楼，骑楼的出现，给中英街增添了岭南建筑文化的气息
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'ltms',
    lat: 40,
    lng: 163,
    width: 70,
    height: 65,
    voice: './voice/乐天.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">香港乐天免税</div>
        <div id="ltms" class="m-body" style="display: none">
          <div class="m-title">香港乐天免税</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/2香港乐天国际免税店.jpg"
              alt="香港乐天免税"
              title="香港乐天免税"
            />
            <p class="m-text">
              我们从古井沿着购物街往前走，便可看见位于香港一侧的香港乐天免税店,它成立于1980年，于业界首度引进卖场中的精品专柜分区概念，改变全球免税店的走向。1984-1994年期间，CHANEL等奢华品牌首次入驻免税店，造就免税事业全新典范。乐天免税店曾展开韩流行销，将韩国文化推向全世界，目前销售商品种类繁多，值得一逛
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'xgsx',
    lat: 65,
    lng: 148,
    width: 70,
    height: 65,
    voice: './voice/手信.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">香港手信国际药妆和全港汇</div>
        <div id="xgsx" class="m-body" style="display: none">
          <div class="m-title">香港手信国际药妆和全港汇</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/香港手信.jpg"
              alt="香港手信国际药妆和全港汇"
              title="香港手信国际药妆和全港汇"
            />
            <p class="m-text">
              当您走至凉亭旁，您可以在深圳一侧的香港手信国际药妆和全港汇购物，主要售卖日常用品、化妆品、保健品和药品，样样俱全
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'llbh',
    lat: 60,
    lng: 178,
    width: 70,
    height: 65,
    voice: './voice/玲玲百货.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">玲玲百货</div>
        <div id="llbh" class="m-body" style="display: none">
          <div class="m-title">玲玲百货</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/5玲玲百货.jpg"
              alt="玲玲百货"
              title="玲玲百货"
            />
            <p class="m-text">
              玲玲百货于1992年创立，店员热情、服务态度好，货真价实，店内销售的日用品、零食、药品等，琳琅满目。各种进口免税商品都受到大家的认可和信赖
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'lxbh',
    lat: 70,
    lng: 183,
    width: 70,
    height: 65,
    voice: './voice/联兴百货.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">联兴百货</div>
        <div id="lxbh" class="m-body" style="display: none">
          <div class="m-title">联兴百货</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/6联兴百货.jpg"
              alt="联兴百货"
              title="联兴百货"
            />
            <p class="m-text">
              联兴百货位于玲玲百货旁，它有着更为悠久的历史，始创于1958年，店铺老板世代传承至今。商铺老板还给我们讲述了这样一个故事：1984年，当时正值黄金热，联兴百货当时共有10名店员都卖黄金也忙不过来，刚好一位名叫高映英的女士来到联兴百货应聘当厨师，联兴百货老板看她年轻，头脑又灵活，就让她转做售货员。店铺对面没多远就是农业银行，但根本走不过去，老板记账也记不过来，就给店员每个人发个大布袋子，放到每个人的柜台下，自己卖货的钱自己装到袋子里，下午下班后自己对账，一个售货员最多的一天可以卖10多万元。可见，当时的中英街多么繁荣啊
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'trt',
    lat: 75,
    lng: 186,
    width: 70,
    height: 65,
    voice: './voice/泰日台药店.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">泰日台药店</div>
        <div id="trt" class="m-body" style="display: none">
          <div class="m-title">泰日台药店</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/7泰日台.jpg"
              alt="泰日台药店"
              title="泰日台药店"
            />
            <p class="m-text">
              从联兴百货往博物馆方向走，进入视线的绿色门牌牌匾的泰日台也是香港一侧的老字号药店，1979年开始营业，至今已经营业43年，该店一开始做的便是街坊生意，专售泰国、日本以及台湾地区的药品，药品多达3000多种。店主药理知识丰富，不售假药，哪家孩子病了来买药，哪家人临时有需要，如果没带钱都可以先拿药走，过几天送钱过来就可以。除柜台外，该店的格局多年来持续不变，正如该店销售信念一样——初心不变
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'zyj',
    lat: 81,
    lng: 190,
    width: 70,
    height: 65,
    voice: './voice/周养记百货.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">周养记百货</div>
        <div id="zyj" class="m-body" style="display: none">
          <div class="m-title">周养记百货</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/10周养记.jpg"
              alt="周养记百货"
              title="周养记百货"
            />
            <p class="m-text">
              在深港武警战士站岗岗亭附近，有一家老字号周养记。它创始于1940年的一家老店。最初的时候，这家店经营杂货生意，后来转卖金银首饰，再到后来逐渐转为百货，中途经历过多次经营者的变更。周煌兴是这家店的老板，他已经在中英街经营超过50年。他感慨地说道：“这么些年，香港这边商铺基本保持原貌，内地方面的变化却很大。”在他看来，中英街从繁华落幕归于平淡，到如今大力发展“商贸+文化”，再创辉煌指日可待。而他们家从经营杂货起步，到转营金铺，如今再度经营百货，对未来也是充满了期待
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'hml',
    lat: 95,
    lng: 195,
    width: 70,
    height: 65,
    voice: './voice/花木兰.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">花木兰</div>
        <div id="hml" class="m-body" style="display: none">
          <div class="m-title">花木兰</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/9花木兰.jpg"
              alt="花木兰"
              title="花木兰"
            />
            <p class="m-text">
             在中英街的3号界碑附近，花木兰映入眼帘。它始创于1999年，是一家本土港店，店员都是香港人，主要经营化妆品、护肤品、进口货品等，是女性朋友比较青睐的店铺
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'hgsc',
    lat: 90,
    lng: 160,
    width: 70,
    height: 65,
    voice: './voice/华港商场.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">华港商场</div>
        <div id="hgsc" class="m-body" style="display: none">
          <div class="m-title">华港商场</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/3华港商场.jpg"
              alt="华港商场"
              title="华港商场"
            />
            <p class="m-text">
              游客们，再往前走，在香港一侧，你便可看到华港商场，它成立于2005年，是中英街主街内一家由商店升级而成的大型商场。该商场经营面积五千多平方米，经营项目有国际及香港品牌百货、香港药品、国际品牌化妆品、参茸海味、国际品牌服装、皮具、钟表等，在中英街上颇具口碑
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'atls',
    lat: 92,
    lng: 166,
    width: 70,
    height: 65,
    voice: './voice/全港汇奥特莱斯.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">全港汇奥特莱斯</div>
        <div id="atls" class="m-body" style="display: none">
          <div class="m-title">全港汇奥特莱斯</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/11全港汇奥特莱斯.jpg"
              alt="全港汇奥特莱斯"
              title="全港汇奥特莱斯"
            />
            <p class="m-text">
              当您走至深港岗亭对面，就是全港汇奥特莱斯，里面除了卖各种进口零食、调味品、日用品，还开了Coach、MK、Adidas服装包包店，货真价实，店内工作人员礼貌热情，是购物的不二之选
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'zbjd',
    lat: 108,
    lng: 170,
    width: 70,
    height: 65,
    voice: './voice/中英街电商直播基地.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">中英街电商直播基地</div>
        <div id="zbjd" class="m-body" style="display: none">
          <div class="m-title">中英街电商直播基地</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./购物路线/12中英街电商直播基地.jpg"
              alt="中英街电商直播基地"
              title="中英街电商直播基地"
            />
            <p class="m-text">
              各位游客，若您沿着中英街历史文化墙往中英街历史博物馆处走，您会见到于2023年7月落成的中英街电商直播基地。近年来，中英街也不断探索电商新模式，拓展“前店后仓”复购新场景。据负责人郑女士介绍，目前，中英街直播基地每天分两到三个时段轮流直播，以酒类、保健品、日用品为主，反响良好。店铺背面就是配送仓库，工作人员现场对网络订单进行打包，通过物流系统将商品送达全国各地消费者手中
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'whq',
    lat: 140,
    lng: 165,
    width: 70,
    height: 65,
    voice: './voice/历史文化墙.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">中英街历史文化墙</div>
        <div id="whq" class="m-body" style="display: none">
          <div class="m-title">中英街历史文化墙</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/中英街历史文化墙.jpeg"
              alt="中英街历史文化墙"
              title="中英街历史文化墙"
            />
            <p class="m-text">
              沿着中英街往海边方向走，过了深港武警哨岗，在深港界墙的内侧便是中英街历史文化浮雕墙。艺术家们以墙体浮雕的方式具象化地介绍了自1840年鸦片战争开始中英街形成的历史。中英街历史文化墙以生动形象的浮雕画像告知了游客们这一街的百年沧桑巨变，每一块浮雕都讲述了一个时间段的代表性故事，如鸦片战争、南京条约、中英勘界、智取情报、掩护文化名人、抢救美国飞行员、东和墟市、鱼灯舞民俗传承、天后信仰、日本占领、日本投降、欢庆解放、改革开放等。中英街历史文化墙上一幅幅浮雕画面栩栩如生、生动形象，它展示着动人的故事和沧桑的历史
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'db',
    lat: 60,
    lng: 55,
    width: 70,
    height: 65,
    voice: './voice/沙栏吓侵华日军碉堡.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">沙栏吓侵华日军碉堡</div>
        <div id="db" class="m-body" style="display: none">
          <div class="m-title">沙栏吓侵华日军碉堡</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/4沙栏吓侵华日军碉堡.jpg"
              alt="沙栏吓侵华日军碉堡"
              title="沙栏吓侵华日军碉堡"
            />
            <p class="m-text">
              沿着左侧目光看向中英街社区健康服务中心临近的大榕树，这里除了有Live House的桌椅供游客休息品尝美食，在树下还隐秘着一个小型地堡。它曾是侵华日军碉堡，1939年日军占领沙头角后修建的单兵掩体，作为制高点监视附近海域,现一半埋于地下。原碉堡西、北、东三面开枪眼,南面为通道,原地面被填。碉堡是日军侵略深圳的历史见证，在全市同类型碉堡现存较少,具有较高的历史价值。新中国成立后，对面的英帝国主义不断挑衅，还有特务不时出没，这地堡就成了民兵的观察哨所，维护了当地的治安与稳定
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'thg',
    lat: 102,
    lng: 112,
    width: 70,
    height: 65,
    voice: './voice/天后宫与吴氏宗祠.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">天后宫与吴氏宗祠</div>
        <div id="thg" class="m-body" style="display: none">
          <div class="m-title">天后宫与吴氏宗祠</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/6天后宫与吴氏宗祠.jpg"
              alt="天后宫与吴氏宗祠"
              title="天后宫与吴氏宗祠"
            />
            <p class="m-text">
              在旺富酒楼左边有一处大门，上面刻着沙栏吓村入口，沿着此门就可以进入沙栏吓村，这是一个具有300年历史的客家古村落。进入沙栏吓村左转进入巷道10米左右，便可以看到一座小型的天后宫，挨着天后宫不远处便是吴氏宗祠。沙头角地区曾有三座天后宫，他们分布在沙栏吓村、暗井村和新解集澳岛。在沙栏吓村的天后宫两侧原来建有东馆西馆，建于清嘉庆时期的沙栏吓村天后宫在2001年由政府拨款给予了修缮。沙头角妇女们常常祈祷妈祖及天后娘娘保佑出海作业的渔船和男人们平安归来。天后宫庙旁边还有供奉着伯公的神位，天后在客家人的信仰中已经处于主导地位，而伯公庙则属于从属地位，这两座庙宇紧紧挨在一起，供奉当地客家人所共同信仰的神灵，反映了当地农业文化和滨海文化的融合。在天后宫旁边，紧邻着的是吴氏宗祠。在这里，人们会祈祷祖先，庆祝“新丁诞生”并进行点灯仪式，以此传扬传统文化
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'jsz',
    lat: 135,
    lng: 122,
    width: 70,
    height: 65,
    voice: './voice/警世钟.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">警世钟</div>
        <div id="jsz" class="m-body" style="display: none">
          <div class="m-title">警世钟</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/10警世钟.jpg"
              alt="警世钟"
              title="警世钟"
            />
            <p class="m-text">
              各位游客，从中英街最早传出的钟声是渔民出海祈祷海神护佑的钟声，改革开放之后，天后宫传出的是商贩们祈祷天后赐福，生意兴隆的钟声。而现在大家看到的远处的警世钟，则教育后人勿忘历史，警钟长鸣，以钟记事、以钟警世。警钟上的铭文记录了中英街百年沧桑，为了让子孙后代铭记中央街这段屈辱的历史，铸一口钟，具有重要的存史、警示、励志的教育意义
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  },
  {
    id: 'hbzd',
    lat: 155,
    lng: 95,
    width: 70,
    height: 65,
    voice: './voice/海滨栈道.mp3',
    content: `
        <div class="m-icon">
        <div class="m-tips">海滨栈道</div>
        <div id="hbzd" class="m-body" style="display: none">
          <div class="m-title">海滨栈道</div>
          <div class="m-content">
            <img
              class="m-img"
              src="./文化路线/12海滨栈道.jpeg"
              alt="海滨栈道"
              title="海滨栈道"
            />
            <p class="m-text">
              从警示钟、博物馆的后方绕过去就是一条毗邻香港的海滨栈道，海风拂面，漫步在中英街的海边，眺望着香港那边的山海风景，享受片刻宁静的生活，如世外桃源一般。好一幅山水画卷、别样多姿。栈道地板上的精美的金属浮雕也记载了中英街自清道光年间至今的的历史大事件，值得大家驻足观赏
            </p>
          </div>
        </div>
        <div class="m-tag"><i class="iconfont icon-18erji-2"></i></div>
      </div>
    `
  }
]

const App = () => {
  const mapRef = useRef<Map | null>(null)
  const [voice, setVoice] = useState('')

  useEffect(() => {
    if (!mapRef.current) {
      const bounds = new L.LatLngBounds(
        new L.LatLng(0, 0),
        new L.LatLng(160, 200)
      )
      mapRef.current = L.map('map', {
        crs: L.CRS.Simple,
        attributionControl: false,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        minZoom: 1,
        maxZoom: 3
      }).setView([102, 112], 3)
      L.imageOverlay('/map.png', bounds).addTo(mapRef.current)

      // 添加标记
      markers.forEach((marker) => {
        L.marker([marker.lat, marker.lng], {
          icon: L.divIcon({
            className: 'my-div-icon',
            html: marker.content,
            iconSize: [marker.width, marker.height]
          })
        })
          .on('click', () => {
            const el = document.getElementById(marker.id)
            if (el) {
              const display = el.style.display
              el.style.display = display === 'none' ? 'flex' : 'none'
              // 展示的时候播放语音
              if (display === 'none' && marker.voice) {
                setVoice(marker.voice)
              }
              // 隐藏的时候停止语音
              if (display === 'flex' && marker.voice) {
                setVoice('')
              }
            }
          })
          .addTo(mapRef.current as Map)
      })
    }
  }, [])

  useEffect(() => {
    if (voice) {
      const audio = document.querySelector('audio')
      if (audio) {
        audio.src = voice
        audio.play()
      }
    } else {
      const audio = document.querySelector('audio')
      if (audio) {
        audio.pause()
      }
    }
  }, [voice])

  return (
    <>
      <audio className="hidden" src={voice} autoPlay={false}></audio>
      <div id="map" className="w-screen h-screen"></div>
    </>
  )
}

export default App
