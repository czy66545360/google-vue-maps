# google-vue-maps

基于 vue2.0 开发的 google地图 组件库

> 使用前如果在大陆需要电脑连接 vpn 才能正常使用 google 地图的 jsSDK

特点：
* 统一入口配置
* 中文文档辅助（不用开 Google 英文文档也能开发 O(∩_∩)O~~）
* 快速搭建地图实例
* 多方式创建地图元素
* 完美兼容原生地图开发

## 现支持

* 地图类基本操作
* 标注类（marker）基本操作

## 快速入手

使用 npm 安装 google-vue-maps

```
  npm i -s google-vue-maps
```

在 main.js 全局注入 google-vue-maps 组件库

```js
import googleMap from 'google-vue-map'

Vue.use(googleMap, {
  key: 'googleKey'
})
```

## 创建地图

```vue
<template>
  <div>
    <g-map @complete="map_complete" :center="[103.86438,30.68673]" @click="map_click">
    </g-map>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        G_map: null // 地图实例
      }
    },
    methods: {
      /**
      * 地图加载完成
      * @param G_map 地图实例
      */
      map_complete (G_map) {
        this.G_map = G_map
      },
      /**
      * 地图点击事件
      * @param e 地图点击回调
      */
      map_click(e){
        console.log('地图点击',e)
      }
    }
  }
</script>
```

## 在地图添加一个标注（marker）

```vue
<template>
  <div id="app">
    <g-map @complete="map_complete" :center="[103.86438,30.68673]">
      <g-marker v-for="(item,index) in markers" :key="index" :center="item.center" :ext_data="{index,item}"
                @click="click_marker"></g-marker>
    </g-map>
    <div class="box">
      <div class="but" @click="add_marker">添加 marker</div>
      <div class="but" @click="move_marker">移动 marker</div>
      <div class="but" @click="remove_marker">删除 marker</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        markers: [  // marker 集合
          {
            center: [103.86438, 30.68673], // 点位置
            icon:'https://assets.xiaokakj.com/static/img/chuzuche/dian.png' // 点图标
          }
        ],
        G_map: null // 地图实例
      }
    },
    methods: {
      /**
      * 地图加载完成
      */
      map_complete (G_map) {
        this.G_map = G_map
      },
      /**
      * 添加 marker 
      */    
      add_marker () {
        const center = [103 + Math.random(), 30 + Math.random()];
        this.markers.push({
          center
        })
      },
      /**
      * 移动第一个 marker
      */
      move_marker () {
        const marker = this.markers[0];
        if (!marker) return;
        this.markers[0].center = [marker.center[0] - 0.001, marker.center[1] + 0.001];
      },
      /**
      * 删除最后一个 marker
      */
      remove_marker () {
        this.markers.splice((this.markers.length - 1), 1)
      },
      /**
      * 点击 marker
      * @param e 点击原生事件返回
      * @param ext_data  返回 扩展数据
      */
      click_marker (event, ext_data) {
        console.log('点击了',event, ext_data)
      }
    }
  }
</script>
```



