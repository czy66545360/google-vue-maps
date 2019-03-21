const mixins = {
  methods: {
    /**
     * 检查是否有实例
     * @name 实例名称
     */
    is_G_instance (name = 'G_map') {
      let setOut = null;
      return new Promise(resolve => {
        const check_G_map = () => {
          const $parent = this.$parent; // 父级实例
          if ($parent && $parent[name]) {
            if (setOut) clearTimeout(setOut);
            resolve($parent[name])
          } else {
            setOut = setTimeout(check_G_map, 500)
          }
        }
        check_G_map()
      })
    },
    /**
     * 初始化 检查是否有google
     */
    is_google () {
      let setOut = null;
      return new Promise(resolve => {
        const check_G_map = () => {
          const google = window.google;
          if (google) {
            if (setOut) clearTimeout(setOut);
            resolve(google)
          } else {
            setOut = setTimeout(check_G_map, 500)
          }
        }
        check_G_map()
      })
    },
    /**
     * 注册事件
     * @param target // 注入目标实例
     */
    add_event (target) {
      if (!target) throw `事件注册失败:${target}`;
      const $listeners = this.$listeners; // 事件集合
      if (target) { // 事件注入
        for (let key in $listeners) {
          target.addListener(key, ({...event}) => {
            $listeners[key](event, this.ext_data)
          })
        }
      }
    }
  }
}

export default mixins
