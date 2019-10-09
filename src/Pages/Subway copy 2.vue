<template>
    <div>
        <h1>地铁线路实时动态图</h1> {{active}}
        <div class="train">
            <div class="lines" v-for="(lines,index) in all" :key="index">
                <div class="lines_title">{{ lines.line.lineName}}:</div>
                <div class="Train_contains">
                    <div class="stations" :ref="station.stationSname+index" v-for="(station,index) in lines.stationInfo" :key="index" :style="{width:100/(lines.stationInfo.length) + '%'}">
                        <span class="station_item" >{{ station.stationSname}}</span>
                        <div class="bottom">
                            <div class="bottom1"></div>
                            <div class="circle" @click="get_stationId(station.tccStationId,$event)" :style="{background: active.indexOf(lines.line.lineName + station.stationSname)> -1?  'Green': '#1e90ff'}"></div>
                            <div class="center" v-if="index !==lines.stationInfo.length-1" :style="{background: active2.indexOf(lines.line.lineName + station.stationSname)> -1? 'green': '#1e90ff'}"></div>
                        </div>
                    </div>
                </div>
                <!-- 车的位置 -->
                <div class="positions">
                    <div class="act-point" v-if="lines.line.lineName === item.line" v-for="(item,index) in positions" :style="{left: item.left + 'px', bottom: item.bottom + 'px'}" >{{item.subway}}</div>
                </div>
            </div> 

        </div>
    </div>
</template>

<script>
import { setInterval } from 'timers';
import data from './subway.json';
export default {
    data(){
        return{
            // all:this.$store.state.parameter.lineStation,
            all:data,
            lines:[],
            stations:[],
            positions: [
                {left: 0, bottom: 20, line: '1号线', stationA: '苹果园', stationB: '古城路', status: 0, subway: 1},
                {left: 0, bottom: 20, line: '1号线', stationA: '万寿路', stationB: '公主坟', status: 1, subway: 2},
                // {left: 0, bottom: 20, line: '2号线', stationA: '宣武门', stationB: '和平门', status: 1, subway: 3},
                {left: 0, bottom: 20, line: '2号线', stationA: '复兴门', stationB: '车公庄', status: 0, subway: 3},
                {left: 0, bottom: 20, line: '2号线', stationA: '鼓楼大厦', stationB: '积水潭', status: 0, subway: 3},
                // {left: 0, bottom: 20, line: '4号线', stationA: '人民大学', stationB: '魏公村', status: 1, subway: 3},
                // {left: 0, bottom: 20, line: '4号线', stationA: '北京南站', stationB: '马家堡', status: 0, subway: 3},
                // {left: 0, bottom: 20, line: '5号线', stationA: '天通苑南', stationB: '立水桥', status: 1, subway: 3},
                // {left: 0, bottom: 20, line: '5号线', stationA: '和平里北街', stationB: '和平西桥', status: 0, subway: 3},
            ],
            active: [],
            active2: [],
            timer: null,
        }
    },
    methods:{
       get_stationId(id,e){
            // console.log("id",id,e.target);
            e.target.style.backgroundColor = 'red';
            e.target.style.cursor = 'pointer';
        },
    setPositions() {
      this.active = []
      this.active2 = []
      this.all.map(line => {
        let _stations = []
        if ( line.stationInfo) {
          line.stationInfo.map(station => {
            _stations.push(station.stationSname)
          })
        }
        // console.log(_stations)
        // 计算出 left 的初始值
        this.positions.map( v => { 
          if (v.line === line.line.lineName) {
              let A_index = _stations.indexOf(v.stationA)
              let B_index = _stations.indexOf(v.stationB)
                if (A_index < B_index && B_index <_stations.length) {
                  // 正向
                  v.flag = true
                } else  {
                  // 反向
                  v.flag = false
    
                }  
                // 计算A站台到始发站的距离
                let div = this.$refs[v.stationA+A_index] 
                if (div && div[0]) {
                  // console.log( this.$refs[v.stationA+A_index][0])
                  let A_offsetLeft = parseInt(this.$refs[v.stationA+A_index][0].offsetLeft)
                  let B_offsetLeft = parseInt(this.$refs[v.stationB+B_index][0].offsetLeft)
                  v.left = A_offsetLeft + parseInt(v.status == 0 ? 0 : Math.abs(B_offsetLeft - A_offsetLeft) / 2) - 145- 20
                  v.bottom = v.flag? 20 : -25;
    
                // console.log('this.$refs', v.line, v.stationA, A_offsetLeft, B_offsetLeft, v.left, this.$refs[v.stationA+A_index][0].left) // 288 /130 -145
                }
                if(v.status == 0 ) {
                  this.active.push(v.line + v.stationA)
                } else {
                  this.active2.push(v.line + v.stationA)
                }
 
          }
            
        })
      })
        // console.log(this.active, 'this.activ')
    },
    mockDatas() {
      let _stations = this.stations.map(v => v.stationName)
         this.all.map(line => {
            let _stations = []
            if ( line.stationInfo) {
              line.stationInfo.map(station => {
                _stations.push(station.stationSname)
              })
            }
            this.positions.map(v => {
               if (v.line === line.line.lineName) {
                 let current_pos = _stations.indexOf(v.stationA)
                 let target_pos;
                 if (current_pos === _stations.length -1) {
                     v.flag = false; // 反向
                 } else if (current_pos === 0) {
                   v.flag = true;  // 正向
                 }
                 if (v.flag) {
                     target_pos = current_pos + 1
                     // 如果A站是最后一站
                     if(target_pos ===_stations.length -1) {
                       v.stationB = _stations[target_pos - 1]

                      } else {
                       v.stationB = _stations[target_pos + 1]
                     }
                 } else {
                     target_pos = current_pos - 1
                     if(target_pos === 0) {
                       v.stationB = _stations[target_pos + 1]
                     } else {
                       v.stationB = _stations[target_pos - 1]
                     }
   
                 }
                 v.stationA = _stations[target_pos]
   
                //  console.log('下一步',v.stationA, v.stationB)
               }
            })

         })
        this.setPositions();
      },

    },
    mounted(){
       this.setPositions();
        // 使用定时器模拟 下次路线
        this.timer = window.setInterval(() => {
          this.mockDatas()
  
        }, 2000)
      },
    created(){

    },
    
    beforeDestroy() {
      window.clearInterval(this.timer);
      this.timer = null;

    },
}
</script>

<style type="text/css">
.train{
    margin-top: 20px;
    width:90%;
    /* position: relative;  */
    /* z-index: 9; */
}
.Train_contains{
    width:100%;
    height: 200px;
    /* overflow-x: scroll; */
    /* border: 1px solid #ccc; */
    /* border-radius: 4px; */
    white-space:nowrap; 
}
/* 线路 --标题 */
.lines .lines_title{
    margin-bottom:10px;
    margin-top: 20px;
    font-size:16px;
    color:#000;
    font-weight:bold;
}
/* 每条线的所有车站 */
.lines .stations {
    margin-top: 20px;
    display: inline-block;
    /* width: 100px; */
}
/* p:nth-child(even){} //偶数行 */
.lines .stations:nth-child(even) .station_item {
    position: relative;
    top: 100px;
    left:0;
}
.lines .stations .station_item{
    display: inline-block;
    font-size: 12px;
    margin-bottom: 20px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
}
/* 小圆圈---以及底部线 */
.lines .stations .bottom {
    position: relative;
    /* width: 100px; */
    width: 100%;
    border-bottom: 2px solid #000;
    /* border-radius: 4px; */
    margin-top: 15px;
    margin-left:10px;
}
.lines .stations .bottom .bottom1{
    position: relative;
    top: -2px;
    border-bottom: 2px solid green;
    z-index: 0;
}
.lines .stations .bottom .center {
    position: absolute;
    right: 50%;
    margin-right: -6px;
    bottom: -5px;
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #0089ff;
    opacity: 1;
    z-index: 9;
}
.lines .stations .bottom .circle {
    position: absolute;
    left: -10px;
    bottom: -8px;
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0089ff;
    opacity: 1;
}
.stations:last-child .bottom {
  border: none;
  height: 2px;
}
.stations:last-child .bottom .bottom1 {
  border: none;
  height: 2px;
}
.stations:nth-last-child(2) .bottom .circle1{
    /* position: absolute;
    right: -11px;
    bottom: -8px;
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0089ff;
    opacity: 1;
    z-index: 9; */
}
.lines .bottom::after :hover {
    bottom: -8px;
    width: 12px;
    height: 12px;
    opacity: 1;
}
/* 小车 */
.positions {
  width: 100%;
  position: relative;
  top: -120px;
}
.positions .act-point {
    position: absolute;
    bottom: 20px;
    left: -6px;
    width: 50px;
    height: 12px;
    /* background: url('/static/img/tain2.png') no-repeat; */
    background: url('../assets/car.png') no-repeat;
}
</style>
