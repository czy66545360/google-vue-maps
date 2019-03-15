<template>
</template>

<script>
  import ulits from '../../services/ulits'
  import mixins from '../../services/mixin'

  export default {
    name: 'GMarker',
    mixins: [mixins],
    props: [
      'map',
      'center',
      'draggable',
      'icon',
      'label',
      'opts',
      'ext_data'
    ],
    data () {
      return {
        G_map: null, // 父级 map 实例
        G_marker: null // marker 实例
      }
    },
    watch: {
      /**
       * 监听位置
       */
      center (center) {
        const G_marker = this.G_marker; // maker
        if (G_marker) G_marker.setPosition(ulits.G_position_reset(center))
      }
    },
    methods: {
      /**
       * 创建 marker
       */
      createMaker () {
        const G_map = this.G_map; // 地图 实例
        const $props = this.$props; // 属性
        const opts = $props.opts || {}; //  marker 配置
        const G_marker = this.G_marker = new window.google.maps.Marker({
          ...$props,
          ...opts,
          icon: this.icon || 'https://assets.xiaokakj.com/static/img/chuzuche/dian.png',
          map: G_map,
          position: ulits.G_position_reset(this.center),
          draggable: this.draggable
        }); // 创建 marker
        this.add_event(G_marker);
        this.$emit('complete', G_marker) // 完成渲染
      }
    },
    /**
     * 销毁前 删除图标
     */
    beforeDestroy () {
      if (this.G_marker) this.G_marker.setMap()
    },
    /**
     * 初始化完成
     */
    mounted () {
      if (this.map) { // 是否传入 外部 map 实例
        this.G_map = this.map;
        this.createMaker()
      } else { // 没有外部实例  就查看父级的地图实例
        this.is_G_map().then((G_map) => {
          this.G_map = G_map;
          this.createMaker()
        })
      }
    }
  }
</script>
