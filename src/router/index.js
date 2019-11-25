import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes.js'
// import OverView from '@/Pages/OverView'

// import Photo from '@/Pages/Photo'
// import Calendar from '@/Pages/Calendar'
// import Subway from '@/Pages/Subway'
// import Test from '@/Pages/Test'
// import Map from '@/Pages/Map'
// import BaiduMap from '@/Pages/BaiduMap'
// import BasicMap from '@/components/BDMap/basic.vue'
// import BJSubway from '@/components/BDMap/BJSubway.vue'
// import SVG from '@/Pages/SVG/Index.vue'
// import SvgTopotu from '@/Pages/SVG/Topotu.vue'
// import SvgSubway from '@/Pages/SVG/SvgSubway.vue'
// import SvgSubway2 from '@/Pages/SVG/SvgSubway2.vue'

const OverView = () => import('@/Pages/OverView')
const Photo = () => import('@/Pages/Photo')
const Calendar = () => import('@/Pages/Calendar')
const Subway = () => import('@/Pages/Subway')
const Test = () => import('@/Pages/Test')
// const Map = () => import('@/Pages/Map')
const BaiduMap = () => import('@/Pages/BaiduMap')
const BasicMap = () => import('@/components/BDMap/basic')
const BJSubway = () => import('@/components/BDMap/BJSubway')
const SVG = () => import('@/Pages/SVG/Index')
const SvgTopotu = () => import('@/Pages/SVG/Topotu')
const SvgSubway = () => import('@/Pages/SVG/SvgSubway')
const SvgSubway2 = () => import('@/Pages/SVG/SvgSubway2')

Vue.use(Router)
// const Routes = [
//   // {path: '/login', title: '登录', name: 'login', component: ''},
//   { path: '/photo', title: '证件照', name: 'photo', component: Photo },
//   { path: '/calcendar', title: '日历', name: 'calcendar', component: Calendar} ,
//   { path: '/echarts', title: '图表', name: 'echarts'},
//   { path: '/subway', title: '实时地铁图', name: 'subway', component: Subway},
//   // { path: '/file', title: '文件读取', name: 'file', component: File},
//   { path: '/test', title: '测试', name: 'test', component: Test},
//   { path: '/map', title: 'canvas地铁图', name: 'map', component: Map},
//   { path: '/svg', title: 'svg矢量图', name: 'svg',  component: SVG ,children: [
//     {path: '', component: SvgSubway},
//     {path: '/svg/topotu', name: 'topotu', component: SvgTopotu},
//     {path: '/svg/subway', name: 'svg地图', component: SvgSubway},
//     {path: '/svg/subway2', name: 'svg地图2', component: SvgSubway2},
//   ]},
//   { path: '/baidumap', title: 'canvas地铁图', name: 'baidumap', component: BaiduMap, children: [
//     { path: '', component: BasicMap},
//     { path: '/baidumap/basic', component: BasicMap},
//     { path: '/baidumap/bjsubway', component: BJSubway},
//   ]},  
// ]
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
