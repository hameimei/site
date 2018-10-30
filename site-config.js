'use strict';

var path = require('path');
var resolve = path.resolve;
var pkg = require('./package.json');
const g6Url = 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-';
const g6EditorUrl = 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-editor-';
const g6Version = '2.1.2';
const g6EditorVersion = '1.0.7';
module.exports = {
    url: {
        g2: 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.3.2/dist/g2.min.js',
        'g2-brush': 'https://gw.alipayobjects.com/os/antv/assets/g2-brush/0.0.2/g2-brush.min.js',
        'g2-plugin-slider': 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-plugin-slider-2.1.0/dist/g2-plugin-slider.min.js',
        d3: 'https://gw.alipayobjects.com/os/antv/assets/lib/d3-4.13.0.min.js',
        dataSet: 'https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.9.6/dist/data-set.min.js',
        f2: 'https://gw.alipayobjects.com/os/rmsportal/DVAKfRRrkjecbPxgCDRO.js',
        'f2-all': 'https://gw.alipayobjects.com/os/rmsportal/LgcSMjyWCVfqaOqIbHND.js',
        g6: g6Url + g6Version + '/build/g6.js',
        'g6-plugins': g6Url + g6Version + '/build/plugins.js',
        'g6-editor-base': g6EditorUrl + g6EditorVersion+'/build/base.js',
        'g6-editor-base-css': g6EditorUrl + g6EditorVersion+'/build/base.css',
        'g6-editor-mind': g6EditorUrl + g6EditorVersion+'/build/mind.js',
        'g6-editor-modelFlow': g6EditorUrl + g6EditorVersion+'/build/modelFlow.js',
        'g6-editor-modelFlow-css': g6EditorUrl + g6EditorVersion+'/build/modelFlow.css',
        jquery:   'https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js',
        katex:    'https://gw.alipayobjects.com/os/antv/assets/lib/katex-0.8.3/katex.min.js',
        katexCss: 'https://gw.alipayobjects.com/os/antv/assets/lib/katex-0.8.3/katex.min.css',
        lodash:   'https://gw.alipayobjects.com/os/antv/assets/lib/lodash-4.17.4.min.js',
        react: 'https://gw.alipayobjects.com/os/antv/assets/lib/react-16.4.0/react.production.min.js',
        'react-dom': 'https://gw.alipayobjects.com/os/antv/assets/lib/react-16.4.0/react-dom.production.min.js'
    },
    assets: '/assets',
    base: '/',
    dest: resolve(process.cwd(), './_site'),
    dist: '${assets}/dist/${pkg.version}',
    home: 'zh-cn/index.html',
    pkg: pkg,
    port: 2047,
    src: resolve(process.cwd(), './site'),
    brand: {
        logo: '${assets}/image/logo.svg',
        name: 'AntV'
    },
    screenshots: [
        {
            src: 'zh-cn/g2/3.x/demo',
            dest: '${assets}/dist/${pkg.version}/g2/3.x',
            template: 'g2-demo-standalone'
        },
        {
            src: 'zh-cn/f2/3.x/demo',
            dest: '${assets}/dist/${pkg.version}/f2/3.x',
            template: 'f2-demo-standalone'
        },
        {
            src: 'zh-cn/g6/1.x/demo',
            dest: '${assets}/dist/${pkg.version}/g6/1.x',
            template: 'g6-demo-standalone'
        },
    ],
    indices: [{
        src: 'zh-cn',
        meta: require('./site/zh-cn/data'),
        dest: '${assets}/dist/${pkg.version}/_indexing.zh-cn.json'
    }],
    theme: {
        root: resolve(__dirname, './theme/default'),
        assets: './assets',
        templates: './templates'
    }
};
