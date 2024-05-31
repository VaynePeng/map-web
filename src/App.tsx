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
    lat: 15,
    lng: 90,
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
    lat: 170,
    lng: 88,
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
    lat: 60,
    lng: 8,
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
    lat: 85,
    lng: 45,
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
    lat: 110,
    lng: 120,
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
  }
]

const App = () => {
  const mapRef = useRef<Map | null>(null)
  const [voice, setVoice] = useState('')

  useEffect(() => {
    if (!mapRef.current) {
      const bounds = new L.LatLngBounds(
        new L.LatLng(0, 0),
        new L.LatLng(200, 160)
      )
      mapRef.current = L.map('map', {
        crs: L.CRS.Simple,
        attributionControl: false,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        minZoom: 1,
        maxZoom: 3
      }).setView([0, 0], 2)
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
