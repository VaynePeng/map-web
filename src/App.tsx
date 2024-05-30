import L, { Map } from 'leaflet'
import { useEffect, useRef } from 'react'

const App = () => {
  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      const bounds = new L.LatLngBounds(
        new L.LatLng(-49.875, 34.25),
        new L.LatLng(-206, 221)
      )
      mapRef.current = L.map('map', {
        crs: L.CRS.Simple,
        attributionControl: false,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
      }).setView([0, 0], 2)

      L.tileLayer('/maps/{z}_{x}_{y}.png', {
        attribution: '&copy; David',
        minZoom: 2,
        maxZoom: 5,
        noWrap: true,
        bounds: bounds
      }).addTo(mapRef.current)
    }
  }, [])

  return <div id="map" className="w-screen h-screen"></div>
}

export default App
