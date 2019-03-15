#事件转发
这里声明的对象会将 google 原生的事件进行转发成我们自定义的事件

## Marker
| 事件名称 | 原生事件 | 描述 | 返回值
| --- | --- | --- | --- |
| click | click | 单击标记图标时会触发此事件 | event：  MouseEvent
| dblclick | dblclick | 双击标记图标时会触发此事件 | event：  MouseEvent
| dragstart | dragstart | 用户开始拖动标记时会重复触发此事件 | event：  MouseEvent
| dragging | drag | 用户拖动标记时会重复触发此事件 | event：  MouseEvent
| dragend | dragend | 用户停止标记时会重复触发此事件 | event：  MouseEvent
| mousedown | mousedown | 对于标记上的mousedown，会触发此事件 | event：  MouseEvent
| mouseover | mouseover | 当鼠标进入标记图标区域时会触发此事件 | event：  MouseEvent
| mouseup | mouseup | 针对标记上的mouseup触发此事件 | event：  MouseEvent
| center_change | position_changed | 针对标记上的mouseup触发此事件 | event：  MouseEvent
