<template>
    <div onselectstart="{return false;}">

        <h1>地铁线路实时动态图</h1> {{active}}
        <div class="train" id="train">
            <div class="lines" v-for="(lines,index) in all" :key="index">
                <div class="lines_title">{{ lines.line.lineName}}:</div>
                <div class="Train_contains">
                    <div class="stations" 
                      :ref="station.tccStationId + index" 
                      v-for="(station,index) in lines.stationInfo" :key="index" 
                      @mousemove="move(station.tccStationId)"
                      :style="{width:100/(lines.stationInfo.length) + '%'}">
                        <span class="station_item" >{{ station.stationSname}}</span>
                        <div class="bottom" v-if="index !== lines.stationInfo.length">
                            <div class="bottom1"></div>
                            <div class="circle" 
                              :class="{'actived': active.indexOf(''+ lines.line.lineId + station.tccStationId) > -1}"
                              @click="get_stationId(station.tccStationId,$event,index)" >
                            </div>
                        </div>
                    </div>
                </div >
                <!-- 车的位置 -->
                <div class="positions">

                  <div class="act-point" 
                    v-if="lines.line.lineId === item.lineId" 
                    v-for="(item,index) in positions" 
                    :style="{left: item.left + 'px', bottom: item.bottom + 'px'}" 
                    :class="{ 'bg1': item.flag, 'bg2': !item.flag}"
                   ></div>  
                </div>
                <!-- 选择的框 -->
                
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
            // all: this.$store.state.parameter.lineStation,
            all:data,
            choosedData: [],
            lines:[],
            stations:[],
            positions: [
                {left: 0, bottom: 20, lineId: '01', stationAId: '0105', stationBId: '0106', status: 0, subway: 1, flag: true},
                {left: 0, bottom: 20, lineId: '01', stationAId: '0124', stationBId: '0125', status: 1, subway: 2, flag: true},
                {left: 0, bottom: 20, lineId: '02', stationAId: '0201', stationBId: '0202', status: 0, subway: 3, flag: true},
                {left: 0, bottom: 20, lineId: '02', stationAId: '0205', stationBId: '0206', status: 1, subway: 3, flag: true},
                {left: 0, bottom: 20, lineId: '04', stationAId: '0421', stationBId: '0423', status: 1, subway: 3, flag: true},
                // {left: 0, bottom: 20, lineId: '04', stationAId: '0427', stationBId: '0429', status: 0, subway: 3, flag: true},
                // {left: 0, bottom: 20, lineId: '05', stationAId: '0521', stationBId: '0523', status: 1, subway: 3, flag: true},
                // {left: 0, bottom: 20, lineId: '05', stationAId: '0535', stationBId: '0537', status: 0, subway: 3, flag: true},
            ],
            active: [],
            pressed: false
        }
    },
    methods:{
      move(data){
        if (!this.pressed) return 
        console.log(data)
      },
      get_stationId(id,e,index){
        let _temp = null
        let _index = this.choosedData.indexOf(id)
        if(_index>-1) {
           e.target.style.backgroundColor = '#1E90FF';
           this.choosedData.splice(_index,1)
        } else {
           e.target.style.backgroundColor = 'red';
           this.choosedData.push(id)
        }
         
        
        e.target.style.cursor = 'pointer'; 
        console.log("id",id,this.choosedData,e.target);
         


      },
    setPositions() {
      this.active = [];
      this.all.map(line => {
        let _stations = []
        if ( line.stationInfo) {
          line.stationInfo.map(station => {
            _stations.push(station.tccStationId)
          })
        }
        // console.log(_stations)
        // 计算出 left 的初始值
        this.positions.map( v => { 
          if (v.lineId === line.line.lineId) {
              let A_index = _stations.indexOf(v.stationAId)
              let B_index = _stations.indexOf(v.stationBId)
                if (A_index < B_index && B_index <_stations.length+1) {
                  // 正向
                  v.flag = true
                } else  {
                  // 反向
                  v.flag = false
    
                }  
                // 计算A站台到始发站的距离
                let div = this.$refs[v.stationAId+A_index] 
                if (div && div[0]) {
                  // console.log( this.$refs[v.stationAId+A_index][0])
                  let A_offsetLeft = parseInt(this.$refs[v.stationAId + A_index][0].offsetLeft)
                  let B_offsetLeft = parseInt(this.$refs[v.stationBId + B_index][0].offsetLeft)
                  v.left = A_offsetLeft + parseInt(v.status == 0 ? 0 : Math.abs(B_offsetLeft - A_offsetLeft) / 2) - 145- 10
                  v.bottom = v.flag ? 15 : -35;
    
                // console.log('this.$refs', v.lineId, v.stationAId, A_offsetLeft, A_offseWidth, v.left, this.$refs[v.stationAId+A_index][0].left) // 288 /130 -145
                }
                if(v.status == 0 ) {
                  this.active.push('' + v.lineId + v.stationAId);
                }
 
          }
            
        })
      })
        // console.log('this.active',this.active )
    },
    mockDatas() {
      let _stations = this.stations.map(v => v.stationName)
      this.setPositions();

      // 使用定时器模拟 下次路线
      this.timer = setInterval(() => {
         this.all.map(line => {
            let _stations = []
            if ( line.stationInfo) {
              line.stationInfo.map(station => {
                _stations.push(station.tccStationId)
              })
            }
            this.positions.map(v => {
               if (v.lineId === line.line.lineId) {
                 let current_pos = _stations.indexOf(v.stationAId)
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
                       v.stationBId = _stations[target_pos - 1]

                      } else {
                       v.stationBId = _stations[target_pos + 1]
                     }
                 } else {
                     target_pos = current_pos - 1
                     if(target_pos === 0) {
                       v.stationBId = _stations[target_pos + 1]
                     } else {
                       v.stationBId = _stations[target_pos - 1]
                     }
   
                 }
                 v.stationAId = _stations[target_pos]
   
                //  console.log('下一站',v.stationAId, v.stationBId)
               }
            })

         })
        this.setPositions();
      }, 1000)

      this.$once('hook:beforeDestroy', () => {            
          clearInterval(this.timer);                                    
      })

    },
    scrollTop(params) {
      var scrollTop=0;
      if(document.documentElement&&document.documentElement.scrollTop){
      scrollTop=document.documentElement.scrollTop;
      }else if(document.body){
      scrollTop=document.body.scrollTop;
      }
      return scrollTop
    },
    boxSelection(){
          // var stateBar = document.getElementById("bottom");
          var train = document.getElementById('train');
          document.onmousedown = (e) =>{
            this.pressed = true
              console.log('开始',e , e.clientY, e.clientY)
          
          var posx = e.clientX ;
          var posy = e.clientY ;
          var div = document.createElement("div");
          div.className = "tempDiv";
          div.style.left = posx+"px";
          div.style.top = posy+"px" + this.scrollTop();
          train.appendChild(div)
          document.onmousemove = (ev) =>{
            
            div.style.left = Math.min(ev.clientX, posx) + "px";
            div.style.top = Math.min(ev.clientY, posy) + this.scrollTop() + "px";
            div.style.width = Math.abs(posx - ev.clientX)+"px";
            div.style.height = Math.abs(posy - ev.clientY)+"px";
            // stateBar.innerHTML = "MouseX: " + ev.clientX + "<br/>MouseY: " + ev.clientY;
            document.onmouseup = (event) =>{
              this.pressed = false;
              console.log('结束', event.clientX, event.clientY)
            div.parentNode.removeChild(div);
            document.onmousemove = null;
            document.onmouseup = null;
            }
          }
          }
    }

    },
    created(){},
    mounted(){
      this.mockDatas()
      this.boxSelection()
        // this.get_lineAndStation();
        console.log("线路和车站：",this.all);
    }
}
</script>

<style type="text/css">

  .tempDiv{
  border:1px dashed blue;
  background:#5a72f8;
  position:absolute;
  width:0;
  height:0;
  /* filter:alpha(opacity:10); */
  opacity:0.1
  }
  #box{
    position:absolute;
    border:1px dashed blue;
    background:#5a72f8;
    width:0;
    height:0;
    /* filter:alpha(opacity:10); */
    opacity:0.1
  }
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
    height: 150px;
    display: inline-block;
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
    width: 100%;
    border-bottom: 2px solid #000;
    margin-top: 15px;
    margin-left:10px;
}
.lines .stations .bottom .bottom1{
    position: relative;
    top: -2px;
    border-bottom: 2px solid green;
    z-index: 0;
}
/* .lines .stations .bottom .center {
    position: absolute;
    right: 35px;
    bottom: -5px;
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #0089ff;
    opacity: 1;
    z-index: 9;
} */
.lines .stations .bottom .circle {
    position: absolute;
    left: -17px;
    bottom: -8px;
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0089ff; 
     /* background-color:#1E90FF; */
    opacity: 1;
}
.lines .stations .bottom .circle.actived {
  background-color: #3CB371 !important;
}
.lines .stations .bottom .circle:hover {
  cursor: pointer;
}
.stations:nth-last-child(1) .bottom {
  border-width:0; 
  height: 2px;
}
.stations:nth-last-child(1) .bottom .bottom1{
  border-width:0;
  height: 4px; 
}
.lines .bottom::after :hover {
    bottom: -8px;
    width: 20px;
    height: 20px;
    opacity: 1;
    cursor: pointer;
}
/* 小车 */
.positions {
  width: 100%;
  position: relative;
  top: -120px;
}
.positions .act-point {
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    left: -6px;
    width: 50px;
    height: 22px;
    /* background: url('/static/img/tain1.png') no-repeat; */
    /* background: url('../assets/car.png') no-repeat; */
}
.bg1{
    background: url('../assets/car.png') no-repeat;
}
.bg2{
    background: url('../assets/car2.png') no-repeat;
}
 
</style>
