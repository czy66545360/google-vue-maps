<template>
  <div id="app">
    <g-map :opts="mapOpts" @complete="map_complete" :center="[103.86438,30.68673]">
      <g-marker v-for="(item,index) in markers" :key="index" :center="item.center" :icon="item.icon"
                ref="marker"
                :label="item.label"
                :ext_data="{index,item}"
                @click="click_marker">
      </g-marker>
      <g-polyline :path="polyline.path" :strokeColor="polyline.strokeColor"></g-polyline>
      <g-polygon :path="polygon.path" :strokeColor="polygon.strokeColor" :fillColor="polygon.fillColor"
                 :fillOpacity="polygon.fillOpacity"></g-polygon>
      <g-rectangle :bounds="rectangle.bounds"></g-rectangle>
    </g-map>
    <div class="box">
      <div class="but" @click="add_marker">添加 maker</div>
      <div class="but" @click="move_marker">移动 maker</div>
      <div class="but" @click="remove_marker">删除 maker</div>
      <div class="but" @click="marker_icon">替换 maker.icon</div>
      <div class="but" @click="add_marker_label">添加 maker.label</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mapOpts: {},
        markers: [
          {
            center: [103.86438, 30.68673],
            label: '',
            icon: ''
          }
        ],
        polyline: {
          strokeColor: '#ff5928',
          path: [[103.86438, 30.68673], [103.86538, 30.68673], [103.86438, 30.68473]]
        },
        polygon: {
          strokeColor: '#494eff',
          fillColor: '#494eff',
          fillOpacity: '0.3',
          path: [[103.86338, 30.68973], [103.86638, 30.68473], [103.86438, 30.68473]]
        },
        rectangle: {
          bounds: [[103.86338, 30.68973], [103.86638, 30.68473]]
        },
        G_map: null
      }
    },
    methods: {
      map_complete (G_map) {
        this.G_map = G_map
      },
      add_marker () {
        const center = [103 + Math.random(), 30 + Math.random()];
        this.markers.push({
          center
        })
      },
      move_marker () {
        const marker = this.markers[0];
        if (!marker) return
        this.markers[0].center = [marker.center[0] - 0.001, marker.center[1] + 0.001];
      },
      remove_marker () {
        this.markers.splice((this.markers.length - 1), 1)
      },
      click_marker (e, ext_data) {
        console.log(e, ext_data)
      },
      marker_icon () {
        this.markers.forEach(marker => {
          marker.icon = 'https://assets.xiaokakj.com/static/img/banche/marker_icon.png'
        })
      },
      add_marker_label () {
        this.markers.forEach(marker => {
          marker.label = '我是 label '
        })
      }
    }
  }
</script>

<style lang="less">
  * {
    padding: 0;
    margin: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .box {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    padding: 5px;

    .but {
      padding: 5px 10px;
      background: #32b917;
      color: #fff;
      margin: 0 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      border-radius: 4px;
    }
  }
</style>
