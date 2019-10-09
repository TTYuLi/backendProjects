<template>
  <div>
    <h1>地铁线路实时动态图</h1>
    <div class="subway">
        <div class="lines">
            <div class="line_title" v-for="(item,index) in lines" :key="index">
                <div class="line_item">
                    {{item.lineName}}:
                </div>
            </div>
        </div>

        <div class="stations">
            <div class="station_title" v-for="(item,index) in stations" :key="index">
              <div class="station_item"> {{item.stationName}}</div>
              <div class="line" v-if="index !== stations.length-1"></div>
            </div>
        </div>
        <div class="positions">
            <div class="act-point" v-for="(item,index) in position" :style="{left: item.left + 'px', bottom: item.bottom + 'px'}" ></div>
        </div>
    </div>
  </div>
</template>

<script>
import { setInterval } from 'timers';
export default {
  data(){
    return {
      lines:[{lineName:'13号线'}],
      stations: [
        {stationName: '西直门'},
        {stationName: '大钟寺'},
        {stationName: '知春路'},
        {stationName: '五道口'},
        {stationName: '上地'},
        {stationName: '西二旗'},
        {stationName: '龙泽'},
        {stationName: '回龙观'},
        {stationName: '霍营'},
        {stationName: '立水桥'},
        {stationName: '北苑'},
        {stationName: '望京西'},
        {stationName: '芍药居'},
        {stationName: '光熙门'},
        {stationName: '东直门'},
      ],
        position: [
        {left: 0, bottom: 20, line: '13号线', stationA: '西直门', stationB: '大钟寺', status: 0, subway: 1},
        {left: 0, bottom: 20, line: '13号线', stationA: '立水桥', stationB: '北苑', status: 1, subway: 2},
        {left: 0, bottom: 20, line: '13号线', stationA: '光熙门', stationB: '东直门', status: 1, subway: 3},
      ],
      timer: null,
    }
  },
  methods: {
    setPositions() {
      let space = 100
      let _stations = this.stations.map(v => v.stationName)
      // console.log(_stations)
      let distanceArr = []
      for(let i =1; i < this.stations.length; i++) {
        distanceArr.push(space*i)
      }
      // console.log(distanceArr)
       let arr = distanceArr
       // 计算出 left 的初始值
      this.position.map(v => {
        let A_index = _stations.indexOf(v.stationA)
        let B_index = _stations.indexOf(v.stationB)
          if (A_index < B_index && B_index <_stations.length) {
            // 正向
            v.flag = true
          } else  {
            // 反向
            v.flag = false

          }
          v.left = (A_index ) * space + (v.status == 0 ? 0 : space / 2)
          v.bottom = v.flag? 20 : -20;
        // console.log(A_index, B_index,'pos.left',  v.left,v.stationA,v.stationB )
      })
    },
    mockDatas() {
      let space = 100
      let _stations = this.stations.map(v => v.stationName)
      this.setPositions();

      // 使用定时器模拟 下次路线
      this.timer = setInterval(() => {
        this.position.map(v => {
          let current_pos = _stations.indexOf(v.stationA)
          let target_pos;
          if (current_pos === _stations.length -1) {
              v.flag = false; // 反向
          } else if (current_pos === 0) {
             v.flag = true;  // 正向
          }
          if (v.flag) {
              target_pos = current_pos + 1
            v.stationB = _stations[target_pos + 1]
          } else {
              target_pos = current_pos - 1
              v.stationB = _stations[target_pos - 1]

          }
          v.stationA = _stations[target_pos]

          console.log('下一步',v.stationA, v.stationB)
        })
        this.setPositions();
      }, 1000)

      this.$once('hook:beforeDestroy', () => {            
          clearInterval(this.timer);                                    
      })

    }
  },
  mounted(){
    this.mockDatas()
  },
  beforeDestroy() {
    // window.clearInterval(this.timer)
    // this.timer = null;
    console.log(this.timer, 'timer')
  }
}
</script>

<style type="text/css">
    .subway {
        margin-top: 20px;
        position: relative;
    }
    /* 线路 */
    .subway .lines .line_item{
        margin-bottom:10px;
        font-size:16px;
        color:#000;
        font-weight:bold;
    }
    /* 车站 */
    .subway .station_title {
        display: inline-block;
        width: 100px;
        /* border-bottom: 4px solid #000; */
    }
    .subway .station_item {
        font-size: 12px;
        margin-bottom: 40px;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }
    .subway .line {
        position: relative;
        width: 100px;
        border-bottom: 4px solid #000;
        /* border-radius: 4px; */
        margin-top: 15px;
        margin-left:10px;
    }
    .subway .line::after {
        position: absolute;
        left: -2px;
        bottom: -10px;
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #0089ff;
        opacity: 1;
    }
    .subway .station_title:nth-last-child(2) .line::before{
        position: absolute;
        right: -2px;
        bottom: -10px;
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #0089ff;
        opacity: 1;
    }
    .subway .line::after :hover {
        bottom: -8px;
        width: 12px;
        height: 12px;
        opacity: 1;
    }
    /* 小车 */
    .positions .act-point {
        position: absolute;
        bottom: 20px;
        left: -6px;
        width: 50px;
        height: 12px;
        /* border-radius: 50%; */
        background: url('/static/img/tain2.png') no-repeat;
        background: url('../assets/car.png') no-repeat;
    }
</style>
