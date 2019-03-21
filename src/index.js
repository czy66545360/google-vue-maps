import GMap from './packages/map/index.js';
import GIcon from './packages/icon/index.js';
import GMarker from './packages/marker/index.js';
import GPolyline from './packages/polyline/index.js';
import GPolygon from './packages/polygon/index.js';
import GRectangle from './packages/rectangle/index.js';
import googleMapLoader from './services/googleMapLoader'
import './assets/style.css'

const components = [
  GMap,
  GIcon,
  GPolygon,
  GPolyline,
  GRectangle,
  GMarker
]

const install = function (Vue, opts = {}) {
  const googleMap = new googleMapLoader(opts);
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  GMap,
  GPolyline,
  GPolygon,
  GIcon,
  GRectangle,
  GMarker
}
