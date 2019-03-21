<template>
  <div class="G-polyline">
    <slot></slot>
  </div>
</template>

<script>
  import utils from '../../services/utils'
  import mixins from '../../services/mixin'

  export default {
    name: 'GPolyline',
    mixins: [mixins],
    props: [
      'map',
      'path',
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
        G_polyline: null // polyline 实例
      }
    },
    watch: {},
    methods: {
      /**
       * 创建 polyline
       */
      create_polyline () {
        const G_map = this.G_map; // 地图 实例
        const $props = this.$props; // 属性
        const opts = $props.opts || {}; //  marker 配置
        let path = $props.path; // 线路
        if (path && path.length) { // 转换 path
          path.map((item, index) => {
            path[index] = utils.G_position_reset(item)
          })
        }
        const G_polyline = this.G_polyline = new window.google.maps.Polyline({
          ...$props,
          ...opts,
          map: G_map,
          path
        }); // 创建 polyline
        this.add_event(G_polyline);
        this.$emit('complete', G_polyline) // 完成渲染
      }
    },
    /**
     * 销毁前 删除图标
     */
    beforeDestroy () {
      this.G_polyline && this.G_polyline.setMap()
    },
    /**
     * 开始加载
     */
    created () {
      if (this.map) { // 是否传入 外部 map 实例
        this.G_map = this.map;
        this.create_polyline()
      } else { // 没有外部实例  就查看父级的地图实例
        this.is_G_instance().then((G_map) => {
          this.G_map = G_map;
          this.create_polyline()
        })
      }
    }
  }
</script>
