<template>
  <div class="G-rectangle">
    <slot></slot>
  </div>
</template>

<script>
  import utils from '../../services/utils'
  import mixins from '../../services/mixin'

  export default {
    name: 'GRectangle',
    mixins: [mixins],
    props: [
      'map',
      'bounds',
      'strokeColor',
      'strokeOpacity',
      'strokeWeight',
      'visible',
      'zIndex',
      'opts'
    ],
    data () {
      return {
        G_map: null, // 父级 map 实例
        G_rectangle: null // rectangle 实例
      }
    },
    watch: {},
    methods: {
      /**
       * 创建 rectangle
       */
      create_rectangle () {
        const G_map = this.G_map; // 地图 实例
        const $props = this.$props; // 属性
        const opts = $props.opts || {}; //  marker 配置
        let bounds = $props.bounds; // 线路
        if (bounds && Array.isArray(bounds)) {
          bounds.map((item, index) => {
            bounds[index] = utils.G_position_reset(item)
          })
          console.log(bounds)
          bounds = new window.google.maps.LatLngBounds(bounds)
        } else if (bounds && bounds.east && bounds.north) {
        } else {
          throw Error(bounds)
        }
        console.log(bounds)
        const G_rectangle = this.G_rectangle = new window.google.maps.Rectangle({
          ...$props,
          ...opts,
          map: G_map,
          bounds
        }); // 创建 rectangle
        this.add_event(G_rectangle);
        this.$emit('complete', G_rectangle) // 完成渲染
      }
    },
    /**
     * 销毁前 删除图标
     */
    beforeDestroy () {
      this.G_rectangle && this.G_rectangle.setMap()
    },
    /**
     * 开始加载
     */
    created () {
      if (this.map) { // 是否传入 外部 map 实例
        this.G_map = this.map;
        this.create_rectangle()
      } else { // 没有外部实例  就查看父级的地图实例
        this.is_G_instance().then((G_map) => {
          this.G_map = G_map;
          this.create_rectangle()
        })
      }
    }
  }
</script>
