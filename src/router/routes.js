const OverView = () => import('@/Pages/OverView')
const Photo = () => import('@/Pages/Photo')
const Calendar = () => import('@/Pages/Calendar')
const Subway = () => import('@/Pages/Subway')
const Test = () => import('@/Pages/Test')
const BaiduMap = () => import('@/Pages/BaiduMap')
const BasicMap = () => import('@/components/BDMap/basic')
const BJSubway = () => import('@/components/BDMap/BJSubway')
const SVG = () => import('@/Pages/SVG/Index')
const SvgTopotu = () => import('@/Pages/SVG/Topotu')
const SvgSubway = () => import('@/Pages/SVG/SvgSubway')
const SvgSubway2 = () => import('@/Pages/SVG/SvgSubway2')

const Routes = [
  // {path: '/login', title: '登录', name: 'login', component: ''},
  { path: '/photo', title: '证件照', name: 'photo', component: Photo,  icon: 'ios-images-outline' },
  { path: '/calcendar', title: '日历', name: 'calcendar', component: Calendar,  icon: 'ios-calendar-outline'} ,
  { path: '/echarts', title: '图表', name: 'echarts',  icon: 'ios-stats-outline'},
  { path: '/subway', title: '实时地铁图', name: 'subway', component: Subway, icon: 'ios-train'},
  // { path: '/file', title: '文件读取', name: 'file', component: File, icon: 'ios-paper-outline'},
  { path: '/test', title: '测试', name: 'test', component: Test, icon: 'ios-bug-outline'},
  { path: '/svg', title: 'svg', name: 'svg',  component: SVG , icon: 'md-train',children: [
    {path: '', component: SvgSubway},
    {path: '/svg/topotu', name: 'topotu', component: SvgTopotu},
    {path: '/svg/subway', name: 'svg地图', component: SvgSubway},
    {path: '/svg/subway2', name: 'svg地图2', component: SvgSubway2},
  ]},
  { path: '/baidumap', title: '百度', name: 'baidumap', component: BaiduMap, icon: 'md-train', children: [
    { path: '', component: BasicMap},
    { path: '/baidumap/basic', component: BasicMap},
    { path: '/baidumap/bjsubway', component: BJSubway},
  ]},  
]

export default Routes