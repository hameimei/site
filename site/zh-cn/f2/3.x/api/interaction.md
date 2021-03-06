<!--
index: 11
title: Interaction
resource:
  jsFiles:
    - ${url.f2}
-->

# 交互行为

---

F2 提供一套交互机制，以达到通用交互行为的封装和复用。基于此机制，我们提供了以下四种通用的交互行为：

1. 饼图选中
4. 柱状图选中
2. 图表平移
3. 图表缩放

对于开发者来说，可以基于此机制封装自己的交互行为，详见 [自定义交互行为](./custom-interaction.html) 教程，非常欢迎一起建设。

**说明**

交互模块默认没有打包至 `@antv/f2` 模块包中。使用时需要手动引入，如下：

```js
// 首先引入 F2
const F2 = require('@antv/f2/lib/index');

// 引入所有的交互行为
require('@antv/f2/lib/interaction/');

// 如果只需要引入其中一种交互行为，那么请使用如下的方式
// 引入 pie-select
require('@antv/f2/lib/interaction/pie-select');

// 引入 interval-select
require('@antv/f2/lib/interaction/interval-select');

// 引入 pan
require('@antv/f2/lib/interaction/pan');

// 引入 pinch
require('@antv/f2/lib/interaction/pinch');
```

* 调用

```js
chart.interaction('name', config);
```

- 清除交互行为

```js
chart.clearInteraction()       // 清除 chart 实例上所有的交互行为
chart.clearInteraction('name') // 清除名称为 'type' 的交互行为
```

---

## 饼图选中

![image](https://gw.alipayobjects.com/zos/rmsportal/BbIvSTiDCDMoWVsGNkWr.gif)

### 使用

```js
const F2 = require('@antv/f2/lib/index'); // 引入 F2
require('@antv/f2/lib/interaction/pie-select'); // 引入饼图选中交互

// ... 创建饼图

// 调用
chart.interaction('pie-select');

```

### API

```js
chart.interaction('pie-select', {
  startEvent: {String}, // 触发事件，默认为 tap
  animate: {Boolean} || {Object}, // 动画配置
  offset: {Number}, // 光环偏移距离
  appendRadius: {Number}, // 光环大小
  style: {Object}, // 光环的样式配置
  cancelable: {Boolean}, // 是否允许取消选中，默认值为 true，表示允许
  onStart: {Function}, // 事件触发后的回调
  onEnd: {Function}, // 事件结束后的回调
  defaultSelected: {Object} // 设置默认选中的数据，该属性需要在 chart.render() 之后调用方可生效
});
```

#### 参数说明

##### `startEvent`
* 类型：String
* 默认值：'tap'
* 说明：该交互原则上是手指点击后触发的，除去 'tap'，还可以使用 'touchstart'

选中交互的触发事件名称。

##### `animate`
* 类型：Boolean / Object
* 默认值：false

动画配置，默认为 false，可将该属性设置为 true 来打开动画。当为 Object 类型时，用于进行动画配置：

```javascript
animate: {
  duration: 1000, // 动画持续事件
  delay: 0, // 动画延迟执行的时间
  easing: 'bounceOut' // 动画的缓动函数
}
```

动画参数的设置详见：[Animation 动画](./animation.html)。

##### `offset`
* 类型：Number
* 默认值：1

选中后出现的光环与饼图的距离。

##### `appendRadius`
* 类型：Number
* 默认值：8

选中后出现的光环的轴长。

##### `style`
* 类型：Object
* 默认值：`{ fillOpacity: 0.5 }`

设置光环的样式。

##### `cancelable`
* 类型：Boolean
* 默认值：true

当 shape 被选中后，再次点击是否允许取消选中，默认为 true，表示会取消选中。

##### `onStart`
类型：Function
默认值：null

事件触发后的回调。

```js
onStart(ev) {}
```

##### `onEnd`
* 类型：Function
* 默认值：null

事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。

```javascript
onEnd(ev) {
  // ev: Object 类型, 该对象包含的重要属性如下：
  // ev.data: Object 类型，被选中图形的原始数据
  // ev.shapeInfo: Object 类型，被选中图形的数据信息
  // ev.shape: Shape 实例，被选中的图形
  // ev.selected: 当前 shape 的选中状态
  const { data, shapeInfo, shape, selected } = ev;
}
```

##### `defaultSelected`
* 类型：Object
* 默认值：null

```js
chart.interaction('pie-select', {
  defaultSelected: { name: '机器之血', percent: 0.18, a: '1' }
});
```

用于设置初始化默认选中的数据，只要传入对应的数据即可，详见 [demo](../demo/interaction/selection-for-pie-chart.html)。

**注意：** 如果需要使用该功能，请在 `chart.render()` 方法之后调用该交互方法。

### 实例

[饼图选中](../demo/interaction/selection-for-pie-chart.html)

---

## 柱状图选中

![interval-click.gif](https://gw.alipayobjects.com/zos/rmsportal/MWxbXBRyApfCMPZUKhTP.gif)

### 使用

```js
const F2 = require('@antv/f2/lib/index'); // 引入 F2
require('@antv/f2/lib/interaction/interval-select');

// 调用，尽量在 chart.render() 方法之后调用
chart.interaction('interval-select', {});
```

### API

```js
chart.interaction('interval-select', {
  startEvent: {String}, // 触发事件，默认为 tap 事件
  selectStyle: {Object}, // 被选中图形的样式配置
  unSelectStyle: {Object}, // 未被选中图形的样式配置
  selectAxis: {Boolean}, // 是否高亮坐标轴文本
  selectAxisStyle: {Object}, // 坐标轴文本被选中后的样式
  cancelable: {Boolean}, // 是否允许取消选中，默认值为 true，表示允许
  onStart: {Function}, // 事件触发后的回调
  onEnd: {Function}, // 事件结束后的回调
  mode: {String}, // 选中策略，默认为 'shape', 即击中柱子才会触发交互
  defaultSelected: {Object} // 设置默认选中的数据，该属性需要在 chart.render() 之后调用方可生效
});
```

#### 参数说明

##### `startEvent`
* 类型：String
* 默认值：'tap'
* 说明：该交互原则上是手指点击后触发的，除去 'tap'，还可以使用 'touchstart'

选中交互的触发事件名称。

##### `selectStyle`
* 类型：Object
* 默认值：`{fillOpacity: 1}`

用于设置被选中柱子的显示样式。

##### `unSelectStyle`
* 类型：Object
* 默认值：`{fillOpacity: 0.4}`

用于设置未被选中柱子的显示样式。如果不需要设置，可以直接设置为 `null`。

##### `selectAxis`
* 类型：Boolean
* 默认值：true

是否高亮坐标轴文本，默认为 true，会高亮。如不需要，可以选择关闭。

##### `selectAxisStyle`
* 类型：Object
* 默认值：`{ fontWeight: 'bold' }`

设置坐标轴文本高亮的样式。默认只是文字加粗。

##### `cancelable`
* 类型：Boolean
* 默认值：true

当 shape 被选中后，再次点击是否允许取消选中，默认为 true，表示会取消选中。

##### `onStart`
类型：Function
默认值：null

事件触发后的回调。

```js
onStart(ev) {
  // ev: Object 类型, 该对象包含的重要属性如下：
  // ev.data: Object 类型，被选中图形的原始数据
  // ev.shapeInfo: Object 类型，被选中图形的数据信息
  // ev.selected: 当前 shape 的选中状态
  const { data, shapeInfo, shape, selected } = ev;
}
```

##### `onEnd`
* 类型： Function
* 默认值：null

事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。

```javascript
onEnd(ev) {
  // ev: Object 类型, 该对象包含的重要属性如下：
  // ev.data: Object 类型，被选中图形的原始数据
  // ev.shapeInfo: Object 类型，被选中图形的数据信息
  // ev.selected: 当前 shape 的选中状态
  const { data, shapeInfo, shape, selected } = ev;
}
```

##### `mode`

* 类型：String
* 默认值：'shape'

选中策略，默认为 'shape', 即击中柱子才会触发交互。另一个可选值为 'range'，即只要集中点落在该柱子的一定 x 方向范围内都会触发选中交互。

##### `defaultSelected`
* 类型：Object
* 默认值：null

```js
chart.interaction('ingterval-select', {
  defaultSelected: { name: '机器之血', percent: 0.18, a: '1' }
});
```

用于设置初始化默认选中的数据，只要传入对应的数据即可，详见 [demo](../demo/interaction/selection-for-bar-chart.html)。

**注意：** 如果需要使用该功能，请在 `chart.render()` 方法之后调用该交互方法。


### 实例

- [柱状图选中](../demo/interaction/selection-for-bar-chart.html)

---

## Pan 平移

![pan.gif](https://gw.alipayobjects.com/zos/rmsportal/MMAUjpwkyFotExKMEeZO.gif)

基于 Hammer.js 的 pan 事件： http://hammerjs.github.io/recognizer-pan/
同时提供长按触发 tooltip 的交互。

### 使用

```js
const F2 = require('@antv/f2/lib/index'); // 引入 F2
require('@antv/f2/lib/interaction/pan'); // 引入图表平移交互

// ... 创建 chart 实例

// 调用，需要在 chart.render() 方法之前调用
chart.interaction('pan');
```

### API

```js
chart.interaction('pan', {
  mode: {String}, // 图表平移的方向，默认为 'x'
  panThreshold: {Number}, // hammer.js 设置，用于设置触发 pan 事件的最小移动距离
  pressThreshold: {Number}, // hammer.js 设置，用于设置触发 press 事件的设置
  pressTime: {Number}, // hammer.js 设置，用于设置触发 press 事件的最小时间差
  limitRange: {Object}, // 限制范围
  onStart: {Function}, // 事件触发后的回调
  onProcess: {Function}, // 事件进行中的回调
  onEnd: {Function} // 事件结束后的回调
});
```

#### 参数说明

##### `mode`
* 类型：String
* 默认值：'x'

图表的平移方向，可设置 x 轴、y 轴以及 x、y 两个方向的平移操作。默认值为 'x'，即 x 轴平移。

```js
mode: 'x', // x 轴方向平移
mode: 'y', // y 轴方向平移
mode: 'xy', // x y 两个方向平移
```

> 注意，对于分类类型或者 TimeCat 类型的数据，只支持 x 轴方向的平移。

##### `panThreshold`
* 类型：Number
* 默认值：10

hammer.js 设置，用于设置识别 pan 事件的最小移动距离，详见 http://hammerjs.github.io/recognizer-pan/

##### `pressThreshold`
* 类型：Number
* 默认值：9

hammer.js 设置，用于设置识别 press 事件的最小移动距离，详见 http://hammerjs.github.io/recognizer-press/

长按会触发 tooltip。

##### `pressTime`
* 类型：Number
* 默认值：251

hammer.js 设置，用于设置识别 press 事件的最小时间差，详见 http://hammerjs.github.io/recognizer-press/

长按会触发 tooltip。

##### `limitRange`
* 类型：Object
* 默认值： `{}`

用于设置图表平移的最大最小范围，需要同 x 或者 y 轴对应的数据字段对应，使用如下：

```js
// 假设 x 轴对应的数据字段名为 fieldA
limitRange: {
  fieldA: {
  	min: 0, // 最小值
    max: 100 // 最大值
  }
}
```

设置之后，图表只会在 x 轴的 0 - 100 数值范围内移动。

**参见 demo:**  [x 轴平移](../demo/interaction/pan-for-line-chart.html)。

##### `onStart`
类型：Function
默认值：null

事件触发后的回调。

```js
onStart(ev) {}
```

##### `onProcess`
类型：Function
默认值：null

事件进行中的回调。

```js
onProcess(ev) {}
```

##### `onEnd`
* 类型： Function
* 默认值：null

事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。

```js
onEnd(ev) {}
```

### 实例

- [折线图平移](../demo/interaction/pan-for-line-chart.html)
- [柱状图平移](../demo/interaction/pan-for-bar-chart.html)
- [散点图拼图](../demo/interaction/pinch-and-pan-for-scatter-chart.html)

---

## Pinch 缩放

![pinch.gif](https://gw.alipayobjects.com/zos/rmsportal/sMYbKWigXWEcEQQJksNi.gif)

基于 Hammer.js 的 pinch 事件： http://hammerjs.github.io/recognizer-pinch/

### 使用

```js
const F2 = require('@antv/f2/lib/index'); // 引入 F2
require('@antv/f2/lib/interaction/pinch'); // 引入图表缩放交互

// ... 创建 chart 实例

// 调用，需要在 chart.render() 方法之前调用
chart.interaction('pinch');
```

### API

```js
chart.interaction('pinch', {
  mode: {String}, // 图表平移的方向，默认为 'x'
  minScale: {Number}, // 缩小的最小倍数
  maxScale: {Number}, // 放大的最大倍数
  onStart: {Function}, // 事件触发后的回调
  onProcess: {Function}, // 事件进行中的回调
  onEnd: {Function}, // 事件结束后的回调
  pressThreshold: 9, // hammer.js 设置，用于设置触发 press 事件的设置
  pressTime: 251 // hammer.js 设置，用于设置触发 press 事件的最小时间差
});
```

#### 参数说明

##### `mode`
* 类型：String
* 默认值：'x'

图表的缩放方向，可设置 x 轴、y 轴以及 x、y 两个方向。默认值为 'x'，即 x 轴方向的缩放。

```js
mode: 'x', // x 轴方向
mode: 'y', // y 轴方向
mode: 'xy', // x y 两个方向
```

> 注意，对于分类类型或者 TimeCat 类型的数据，只支持 x 轴方向的缩放。

##### `minScale`
* 类型：Number
* 默认值：linear 类型数据为 null，分类类型以及 TimeCat 类型数据默认为 1

设置图表缩小时的最小倍数。

##### `maxScale`
* 类型：Number
* 默认值：linear 类型数据为 null，分类类型以及 TimeCat 类型数据默认为 4

设置图表放大时的最大倍数。

##### `onStart`
类型：Function
默认值：null

事件触发后的回调。

```js
onStart(ev) {}
```

##### `onProcess`
类型：Function
默认值：null

事件进行中的回调。

```js
onProcess(ev) {}
```

##### `onEnd`
* 类型： Function
* 默认值：null

事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。

```js
onEnd(ev) {}
```

##### `pressThreshold`
* 类型：Number
* 默认值：9

hammer.js 设置，用于设置识别 press 事件的最小移动距离，详见 http://hammerjs.github.io/recognizer-press/

长按会触发 tooltip。

##### `pressTime`
* 类型：Number
* 默认值：251

hammer.js 设置，用于设置识别 press 事件的最小时间差，详见 http://hammerjs.github.io/recognizer-press/

长按会触发 tooltip。

### 实例

- [x 轴缩放、平移](../demo/interaction/pinch-and-pan-for-smooth-line.html)
- [xy 轴缩放、平移](../demo/interaction/pinch-and-pan-for-scatter-chart.html)
- [时间类型的平移缩放](../demo/interaction/pinch-and-pan-for-line-chart.html)
