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
        maxBoundsViscosity: 1.0
      }).setView([0, 0], 2)
      L.imageOverlay('/map.png', bounds).addTo(mapRef.current)

      const Icon = L.divIcon({
        className: 'my-div-icon',
        html: '<span>我的文本</span>', // 你的文本
        iconSize: [100, 50], // 图标的大小
      })

      L.marker([88, 8], { icon: Icon })
        .on('click', () => {
          console.log('标签被点击了！')
        })
        .addTo(mapRef.current)
    }
  }, [])

  return <div id="map" className="w-screen h-screen"></div>
}

export default App
