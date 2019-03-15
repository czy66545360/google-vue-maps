// MoorSwitch 是对应组件的名字，要记得在 moor-map.vue 文件中还是 name 属性哦
import GMap from './map';

GMap.install = Vue => Vue.component(GMap.name, GMap);

export default GMap;
