<template>
</template>

<script>
  import ulits from '../../services/ulits'
  import eventsConfig from '../../services/eventsConfig'

  export default {
    name: 'GIcon',
    props: [
      'map',
      'center',
      'draggable',
      'icon',
      'label'
    ],
    data () {
      return {
        G_map: null, // 父级 map 实例
        G_icon: null // icon 实例
      }
    },
    methods: {
      /**
       * 创建 marker
       */
      create_icon () {
        const G_map = this.G_map;
        if (!G_map) {
          console.error('没有发现地图实例');
          return
        }
        const G_icon = this.G_icon = new window.google.maps.Marker({
          icon: this.icon,
          map: this.map || G_map,
          position: ulits.G_position_reset(this.center),
          draggable: this.draggable
        });
        const $listeners = this.$listeners
        for (let key in $listeners) {
          this.add_event(key, $listeners[key])
        }
        this.$emit('complete', G_icon) // 完成渲染
      },
      /**
       * 注册时间
       * @param even_name
       * @param callback
       */
      add_event (even_name, callback) {
        const G_marker = this.G_marker;
        const marker_events = eventsConfig.marker;
        if (!G_marker) throw `G_marker:${G_marker}`;
        if (!marker_events[even_name]) `Marker事件表中没有配置${even_name}这个事件转发`;
        G_marker.addListener(marker_events[even_name], callback)
      }
    },
    mounted () {
      const setIn = setInterval(() => {
        const $parent = this.$parent;
        if ($parent && $parent.G_map) {
          clearInterval(setIn);
          this.G_map = $parent.G_map;
          this.create_icon()
        }
      }, 1000)
    }
  }
</script>
