<template>
  <div class="G-icon"></div>
</template>

<script>
  import utils from '../../services/utils'
  import mixins from '../../services/mixin'

  export default {
    name: 'GIcon',
    mixins: [mixins],
    props: {
      'marker': {},
      'anchor': {},
      'labelOrigin': {},
      'origin': {},
      'scaledSize': {},
      'size': {},
      'url': {
        default: 'https://assets.xiaokakj.com/static/img/chuzuche/dian.png'
      }
    },
    data () {
      return {
        G_marker: null // 父级 marker 实例
      }
    },
    watch: {
      '$props' ($props) {
        if (this.G_marker) this.G_marker.setIcon($props);
      }
    },
    methods: {
      /**
       * 创建 icon
       */
      create_icon () {
        const $props = this.$props;
        this.G_marker.setIcon($props);
        this.$emit('complete', $props) // 完成渲染
      }
    },
    mounted () {
      if (this.marker) { // 是否传入 外部 marker 实例
        this.G_marker = this.marker;
        this.create_icon()
      } else { // 没有外部实例  就查看父级的 marker 实例
        this.is_G_instance('G_marker').then((G_marker) => {
          this.G_marker = G_marker;
          this.create_icon()
        })
      }
    }
  }
</script>
