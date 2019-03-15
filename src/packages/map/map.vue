<template>
  <div class="G-map-container">
    <div class="G-map"></div>
    <slot></slot>
  </div>
</template>

<script>
  import ulits from '../../services/ulits'
  import mixins from '../../services/mixin'

  export default {
    name: 'GMap',
    mixins: [mixins],
    props: [
      'id',
      'opts',
      'center'
    ],
    data () {
      return {
        G_map: null, // map 实例
        G_opts: { // 默认地图配置
          center: null,  // 地图中心点
          zoom: 16, // 缩放
          disableDefaultUI: true, // 启用/禁用所有默认UI。可以单独覆盖
          clickableIcons: false // 地图图标不可点击。地图图标表示兴趣点，也称为POI。
        },
        G_load_state: null // 地图是否初始化完成
      }
    },
    methods: {
      /**
       * 创建地图
       */
      createMap () {
        const map_ele = this.$el;
        if (!window.google) {
          throw '没有找到 google 地图全局属性';
        }
        if (!this.center) {
          throw `center:${this.center}`;
        }
        const opts = {...this.G_opts, center: ulits.G_position_reset(this.center), ...this.opts || {}};
        const G_map = this.G_map = new window.google.maps.Map(map_ele, opts);
        this.add_event(G_map);
        const complete = () => { // 地图加载渲染完成
          if (!this.G_load_state) {
            this.G_load_state = true;
            this.$emit('complete', G_map)
          }
        };
        G_map.addListener('tilesloaded', complete) // 可见快渲染完成
      }
    },
    mounted () {
      this.is_google().then((google) => {
        this.createMap();
      });
    }
  }
</script>
