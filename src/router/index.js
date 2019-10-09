import Vue from 'vue'
import Router from 'vue-router'
import OverView from '@/Pages/OverView'

import Photo from '@/Pages/Photo'
import Calendar from '@/Pages/Calendar'
import Subway from '@/Pages/Subway'
import File from '@/Pages/File'
// import Txt from '@/Pages/1.txt'
import Test from '@/Pages/Test'
import Map from '@/Pages/Map'
import BaiduMap from '@/Pages/BaiduMap'
import BasicMap from '@/components/BDMap/basic.vue'
import BJSubway from '@/components/BDMap/BJSubway.vue'
import SVG from '@/Pages/Svg.vue'

Vue.use(Router)
const Routes = [
  // {path: '/login', title: '登录', name: 'login', component: ''},
  { path: '/photo', title: '证件照', name: 'photo', component: Photo },
  { path: '/calcendar', title: '日历', name: 'calcendar', component: Calendar} ,
  { path: '/echarts', title: '图表', name: 'echarts'},
  { path: '/subway', title: '实时地铁图', name: 'subway', component: Subway},
  { path: '/file', title: '文件读取', name: 'file', component: File},
  // { path: '/txt', title: '文件读取', name: 'txt', component: Txt},
  { path: '/test', title: '测试', name: 'test', component: Test},
  { path: '/map', title: 'canvas地铁图', name: 'map', component: Map},
  { path: '/svg', title: 'svg矢量图', name: 'svg', component: SVG},
  { path: '/baidumap', title: 'canvas地铁图', name: 'baidumap',component: BaiduMap, children: [
    { path: '', component: BasicMap},
    { path: '/baidumap/basic', component: BasicMap},
    { path: '/baidumap/bjsubway', component: BJSubway},
  ]},  
]
export default new Router({
  routes: [
    {
      path: '/',
      name: 'OverView',
      component: OverView
    }, ...Routes
  ],
  mode: 'history'
})
