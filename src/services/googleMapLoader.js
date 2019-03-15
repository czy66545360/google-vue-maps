/**
 *
 * @type {{
 * protocol: string 协议 http https,
 * plugin: Array 组件,
 * hostAndPath: string 域名,
 * key: string 用户 key
 * }}
 */
const GOOGLE_MAP_CONRIG = {
  key: '',
  protocol: 'https',
  hostAndPath: 'maps.googleapis.com/maps',
  plugin: []
}

export default class GoogleMapLoader {
  /**
   * 初始化
   * @param config
   */
  constructor (config) {
    const _config = this._config = {
      ...GOOGLE_MAP_CONRIG,
      ...config
    };
    this._document = document;
    this._window = window;
    if (!_config.key) {
      throw '请输入 GoogleMapKey'
    }
    this.load()
  }

  load () {
    if (!window.google) {
      const script = this._document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = this._getScriptSrc();
      this._document.head.appendChild(script);
    }
  }

  /**
   * 获取 google  地图的 js
   * @returns {string}
   * @private
   */
  _getScriptSrc () {
    const _config = this._config
    const key = _config.key
    const protocol = _config.protocol
    const hostAndPath = _config.hostAndPath

    return `${protocol}://${hostAndPath}/api/js?key=${key}`
  }
}
