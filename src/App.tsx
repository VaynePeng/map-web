import L, { Map } from 'leaflet'
import { useEffect, useRef } from 'react'

const App = () => {
  const mapRef = useRef<Map | null>(null)

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

      const Icon = L.divIcon({
        className: 'my-div-icon',
        html: '<div class="icon"><div class="tips">测试地点</div><div class="tag"><i class="iconfont icon-18erji-2"></i></div></div>',
        iconSize: [60, 65]
      })

      L.marker([90, 8], { icon: Icon })
        .on('click', () => {
          console.log('标签被点击了！')
        })
        .addTo(mapRef.current)
    }
  }, [])

  return <div id="map" className="w-screen h-screen"></div>
}

export default App
