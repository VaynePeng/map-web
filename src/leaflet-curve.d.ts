import { PathOptions } from 'leaflet'

declare module 'leaflet' {
  function curve(path: unknown[], options?: PathOptions): Path
}
