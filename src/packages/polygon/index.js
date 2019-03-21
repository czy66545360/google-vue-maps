// MoorSwitch 是对应组件的名字，要记得在 moor-map.vue 文件中还是 name 属性哦
import GPolygon from './polygon';

GPolygon.install = Vue => Vue.component(GPolygon.name, GPolygon);

export default GPolygon;
