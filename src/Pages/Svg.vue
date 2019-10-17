<template>
  <div>
     <Select v-model="value" style="width:400px; margin-right: 20px;" label-in-value clearable  @on-change="addNode">
        <Option 
          v-for="item in types" 
          :label="item.label"
          :value="item.value" 
          :key="item.value" 
         >
          <img style="height: 25px; margin-right: 10px;" :src="item.value"/>
          <span>{{ item.label }}</span>
        </Option>
    </Select>
    <!-- <Button type="primary" @click="addNode">添加</Button> -->
    <!-- <div id="svg_dragbox" ></div> -->
    <div :id="'topoId'+topoId" class="topoWrap">
      <svg
        class="topoSvg"
        :width="svgAttr.width" 
        :height="svgAttr.height"
        :viewBox="svgAttr.viewX+' '+svgAttr.viewY+' '+svgAttr.width+' '+svgAttr.height"   
        @mousedown.stop="mousedownTopoSvg($event)" 
        >
        <!-- <defs>
            <pattern id="Pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <line :x1="ele.x1" :x2="ele.x2" :y1="ele.y1" :y2="ele.y2" :stroke="ele.color" :stroke-width="ele.strokeWidth" :opacity="ele.opacity" v-for="ele in gridData" :key="ele.id"></line>
            </pattern>
        </defs> -->
        <defs id="SvgjsDefs1370">
          <!-- <marker id="arrow" markerWidth="12" markerHeight="12" refX="6" refY="6" viewBox="0 0 12 12" orient="auto"> -->
          <marker id="arrow" markerWidth="12" markerHeight="12" refX="6" refY="6" viewBox="0 0 12 12" orient="auto">
            <!-- <path id="SvgjsPath1372" d="M2,2 L2,11 L10,6 L2,2" stroke="none"  fill="#666"></path> -->
            <!-- <path id="SvgjsPath1372" d="M2,2 L2,9 L8,5 L2,2" stroke="none"  fill="#666"></path> -->
            <path id="SvgjsPath1372" d="M2,2 L2,9 L8,5 L2,2" stroke="none" fill="#666"></path>
          </marker>
        </defs>
        <defs>
          <filter id="f1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
            <feColorMatrix result="matrixOut" in="offOut" type="matrix"
            values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <g>
          <!-- 节点 图片-->
          <g 
            class="nodesG" 
            v-for="(ele,key) in nodes" 
            :key="ele.id" 
            @mousedown.stop="dragSvgNode(key,$event)"
            @mouseover.stop="mouseoverNode(key,$event)" 
            @mouseout.stop="mouseoutNode(key,$event)" 
            :transform="'translate('+ele.x+','+ele.y+')'" 
            >
            <image 
              class="nodeImage" 
              :xlink:href="ele.icon" 
              :width="ele.width" 
              :height="ele.height" 
              :x="0" 
              :y="0" 
              :href="ele.icon"
              ></image>
            <!-- <text class="nodeName" :x="10" :y="ele.height + 20" text-anchor='start' >{{ele.name}}</text> -->
            <text class="nodeName" :x="10" :y="ele.height + 14" text-anchor='start' >{{ele.name}}</text>
           
            <rect 
              class="reactClass" 
              v-show="ele.isTopConnectShow"
              :x="-2" :y="-1" :rx="0" :ry="0" 
              :width="ele.width + 4" :height="ele.height + 2"></rect>
            <g 
              class="connectorArror" 
              :class="{'connector':ele.isTopConnectShow}" 
              :transform="'translate(' + ele.width/2 +','+ 0 +')'"
              v-show="ele.isTopConnectShow"
              > 
              <circle r="8" cx="0" cy="0" class="circleColor" fill="#efefef"></circle>
              <!-- <line x1="-4" y1="1" x2="0" y2="-5" stroke="#333" stroke-width="1"></line>
              <line x1="4" y1="1" x2="0" y2="-5" stroke="#333" stroke-width="1"></line> -->
              <line x1="-4" y1="-1" x2="0" y2="5" stroke="#333"></line>
              <line x1="4" y1="-1" x2="0" y2="5" stroke="#333"></line>
            </g>
            <g 
              class="connectorArror" 
              v-show="ele.isBottomConnectShow"
              :class="{'connector':ele.isBottomConnectShow}" 
              :transform="'translate('+ele.width/2+','+ele.height+')'" 
              @mousedown.stop="drawConnectLine(key,$event)"
              @mouseout.stop="mouseoutLeftConnector(key)"
              >
              <circle r="8" cx="0" cy="0" class="circleColor" fill="#efefef" ></circle>
              <line x1="-4" y1="-1" x2="0" y2="5" stroke="#333"></line>
              <line x1="4" y1="-1" x2="0" y2="5" stroke="#333"></line>
            </g>
            <!-- 删除节点 -->
            <g 
              class="deleteArror" 
              :class="{'connector':ele.isTopConnectShow}" 
              :transform="'translate(' + ele.width +','+ 0 +')'"
              @mousedown.stop="deleteNode(key,$event)"
              v-show="ele.isTopConnectShow"
              > 
              <circle r="8" cx="0" cy="-0" class="circleColor" fill="#efefef"></circle>
              <line x1="-3" y1="-3" x2="3" y2="3" stroke="#333" stroke-width="1"></line>
              <line x1="-3" y1="3" x2="3" y2="-3" stroke="#333" stroke-width="1"></line>
            </g>
          </g>
          <!-- 连线 -->
          <g
            class="connectorsG"
            v-for="(ele,key) in connectors" 
            :class="{active:ele.isSelect}" 
            :key="ele.id"
            v-if="ele.type == 'Line'"
            @mouseover.stop="selectConnectorLine(key)"
            @mouseout.stop="cancelSelectConnectorLine(key)"
            >
            <!-- 连线方式一 -->
            <path 
              class="connectorLine"
              :stroke="ele.color"
              :stroke-width="ele.strokeW"
              marker-end="url(#arrow)"
              :d="'M'+(ele.targetNode.x + ele.targetNode.width /2)+','+(ele.targetNode.y -20) +
              'L'+(ele.sourceNode.x + ele.sourceNode.width / 2)+','+(ele.sourceNode.y + ele.sourceNode.height + 20)+
              'Z'"
              ></path>
              <!-- 删除连线 -->
              <g 
                class="deleteArror" 
                :class="{'connector':ele.isTopConnectShow}" 
                :transform="'translate(' + (ele.targetNode.x + ele.targetNode.width /2 + ele.sourceNode.x + ele.sourceNode.width / 2) / 2 +','
                + (ele.targetNode.y -20 + ele.sourceNode.y + ele.sourceNode.height + 20) / 2 +')'"
                @mousedown.stop="deleteLine(key,$event)"
                v-show="ele.showDelete"
                > 
                <circle r="8" cx="0" cy="-0" class="circleColor" fill="#efefef"></circle>
                <line x1="-3" y1="-3" x2="3" y2="3" stroke="#333" stroke-width="1"></line>
                <line x1="-3" y1="3" x2="3" y2="-3" stroke="#333" stroke-width="1"></line>
              </g>
          </g>
          <!-- 动态绘制的连线 -->
          <g>
            <line 
              :x1='connectingLine.x1' 
              :y1="connectingLine.y1" 
              :x2="connectingLine.x2" 
              :y2="connectingLine.y2" 
              v-show="connectingLine.isConnecting" 
              stroke="#666" 
              stroke-width="3">
              </line>
            </g>   

        </g>
      </svg>
    </div>
    
    <div id="menu">
        <p id="start" @click="start()">设为起点</p>
        <p id="end" @click="end()">设为终点</p>
        
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        value: null,
        types:[
          {label: 'IP3', value: require('../assets/imgs/svg/ip.png')},
          {label: '服务器', value: require('../assets/imgs/svg/fuwuqi.png')},
          {label: '交换机', value: require('../assets/imgs/svg/jiaohuanji.png')},
          {label: '扬声器', value: require('../assets/imgs/svg/yangshengqi.png')},
        ],
        svgAttr:{
          width: 800,
          height: 600,
          viewX: 0,
          viewY: 0,
          minW:800,
          minH: 600,
        },
        marker:{
          xmarkerY:0,
          xmarkerX:0,
          ymarkerX:0,
          ymarkerY:0,
          isMarkerShow:false,
        },  
        connectingLine:{
          x1:0,
          y1:0,
          x2:0,
          y2:0,
          isConnecting:true,
          sourceNode:'',
          endNode:''
        },  
        topoId:'',
        selectNodeData:{},
        // 结点
        nodes: [
          {
            name: '服务器', 
            id: 1, 
            x: 300, 
            y: 20, 
            icon: require('../assets/imgs/svg/fuwuqi.png'), 
            width: 60, 
            height: 60, 
            containNodes: [2,3,4],
            "attrs": [],
            "classType": "T2",
            "isTopConnectShow": false,
            "isBottomConnectShow": false,
          },
          {
            name: '交换机', 
            id: 2, 
            x: 50, 
            y: 150, 
            icon: require('../assets/imgs/svg/jiaohuanji.png'), 
            width: 60, 
            height: 60, 
            "containNodes": [],
            "attrs": [],
            "classType": "T2",
            "isTopConnectShow": false,
            "isBottomConnectShow": false,
          },
          {
            name: 'IP', 
            id: 3, 
            x: 200, 
            y: 150, 
            icon: require('../assets/imgs/svg/ip.png'), 
            width: 60, 
            height: 60, 
            "containNodes": [ ],
            "attrs": [],
            "classType": "T2",
            "isTopConnectShow": false,
            "isBottomConnectShow": false,
          },
          {
            name: '扬声器', 
            id: 4, 
            x: 400, 
            y: 150, 
            icon: require('../assets/imgs/svg/yangshengqi.png'), 
            width: 60, 
            height: 60, 
            "containNodes": [5],
            "attrs": [],
            "classType": "T2",
            "isTopConnectShow": false,
            "isBottomConnectShow": false,
          },
          {
            name: '交换机2', 
            id: 5, 
            x: 200, 
            y: 300, 
            icon: require('../assets/imgs/svg/jiaohuanji.png'), 
            width: 60, 
            height: 60, 
            "containNodes": [],
            "attrs": [],
            "classType": "T2",
            "isTopConnectShow": false,
            "isBottomConnectShow": false,
          },
          
        ],
        // 连线
        connectors: [
          {
            "id": "path1",
            "type": "Line",
            "strokeW": 3,
            "color": "#666",
            "targetNode": {
              x: 50, 
              y: 150, 
              "id": 2,
              "width": 60,
              "height": 60
            },
            "sourceNode": {
               x: 300, 
                y: 20, 
              "id": 1,
              "width": 60,
              "height": 60
            },
            "isSelect": false,
            "showDelete": false,
          },
          {
            "id": "path2",
            "type": "Line",
            "strokeW": 3,
            "color": "#666",
            "targetNode": {
               x: 200, 
               y: 150, 
              "id": 3,
              "width": 60,
              "height": 60
            },
            "sourceNode": {
               x: 300, 
                y: 20, 
              "id": 1,
              "width": 60,
              "height": 60
            },
            "isSelect": false,
            "showDelete": false,

          },
          {
            "id": "path3",
            "type": "Line",
            "strokeW": 3,
            "color": "#666",
            "targetNode": {
              x: 400, 
              y: 150, 
              "id": 4,
              "width": 60,
              "height": 60
            },
            "sourceNode": {
               x: 300, 
                y: 20, 
              "id": 1,
              "width": 60,
              "height": 60
            },
            "isSelect": false,
            "showDelete": false,

          },
          {
            "id": "path4",
            "type": "Line",
            "strokeW": 3,
            "color": "#666",
            "targetNode": {
               x: 200, 
              y: 300, 
              "id": 5,
              "width": 60,
              "height": 60
            },
            "sourceNode": {
              x: 400, 
              y: 150, 
              "id": 4,
              "width": 60,
              "height": 60
            },
            "isSelect": false,
            "showDelete": false,

          },
         
         
        ],
        
      }
    },
    methods: {
      //鼠标滑过node
      mouseoverNode(key,event){
        this.nodes[key].isTopConnectShow = true
        this.nodes[key].isBottomConnectShow = true
        // this.marker.xmarkerY = this.nodes[key].y
        // this.marker.ymarkerX = this.nodes[key].x
        this.getConnectLine(key)
      },
       //获取连线终点时的node的ID值
      getConnectLine(key){
        this.connectingLine.endNode = this.nodes[key].id 
      },
      //鼠标划出左侧箭头时，将connectingLine.endNode再次初始化
      mouseoutLeftConnector(key){
        this.connectingLine.endNode = ''
      },
      mouseoutNode(key, event){
        this.nodes[key].isTopConnectShow = false
        this.nodes[key].isBottomConnectShow = false
      },
      // 手动画线
      drawConnectLine(key, event){
        // 鼠标按下
        let CONNECTLINE = this.connectingLine //绘制连线对象
        let CURNODE =  this.nodes[key] //当前点击node
        let nodeW = CURNODE.width //当前node宽高
        let nodeH = CURNODE.height 
        let sourceNodeX = CURNODE.x 
        let sourceNodeY = CURNODE.y    
        let mouseX0 = event.clientX    
        let mouseY0 = event.clientY
        let topoEle = $(`#topoId${this.topoId}`)
        let x1 = event.clientX - topoEle.find(".topoSvg").offset().left-2 + $(document).scrollLeft() + this.svgAttr.viewX   //连线开始位置的位置：鼠标点击的实际位置   为鼠标位置 - 当前元素的偏移值
        let y1 = event.clientY - topoEle.find(".topoSvg").offset().top+4+ $(document).scrollTop() + this.svgAttr.viewY

        CONNECTLINE.isConnecting = true   //显示绘制连线
        CONNECTLINE.x1 = x1 
        CONNECTLINE.y1 = y1 
        CONNECTLINE.x2 = x1   //连线终点同样赋值为起点值
        CONNECTLINE.y2 = y1
        CONNECTLINE.sourceNode = CURNODE.id //将当前点击nodeid值赋给连线起点

        document.onmousemove = (event) => {
          let disX = event.clientX - mouseX0
          let disY = event.clientY - mouseY0
          let x2 = x1 + disX
          let y2 = y1 + disY
          CURNODE.isBottomConnectShow = true
          CONNECTLINE.x2 = x2
          CONNECTLINE.y2 = y2
        }

        document.onmouseup = () =>{
          document.onmousemove = null
　　　     document.onmouseup = null 

          let hasConnected = false   //标记是否已经有过连线 
          let CONNECTORS =  this.connectors
          let sourceNodeW = nodeW
          let sourceNodeH = nodeH
          let targetNodeW = 0    //目标节点相关信息
          let targetNodeH = 0
          let targetNodeX = 0 
          let targetNodeY = 0
          let targetNodeType = ""
          let connectType = ""
          console.log(CONNECTLINE.endNode)
          if(CONNECTLINE.endNode){  
            //正确连线：添加连线信息在connectors中
            //判断是否有已经有连线的情况
            CONNECTORS.forEach((item,index) => {
              if(item.sourceNode.id == CURNODE.id && item.targetNode.id == CONNECTLINE.endNode && item.type == 'Line') 
                hasConnected = true
            })

            //未连线情况下增加两者连线
            if(!hasConnected){
              connectType = "Line"
              //获取目标节点宽高
              this.nodes.forEach((item,index) =>{
                if(item.id == CONNECTLINE.endNode){
                  targetNodeW = item.width
                  targetNodeH = item.height
                  targetNodeX = item.x
                  targetNodeY = item.y
                  targetNodeType = item.type
                }
              })
              let canLinkToTargetNode = this.canConnectorTo(CURNODE.type,targetNodeType,'Link')
              if(!canLinkToTargetNode){
                this.$message({
                    showClose: true,
                    message: CURNODE.type+"类型 不能连接 "+targetNodeType+"类型",
                    type: 'error'
                })
                CURNODE.isBottomConnectShow = false     //连线失败：起点右侧箭头暂且设置为消失
                CONNECTORS.forEach((item,key) => {     //连线判断，如果已经有连线起点为当前的node，将起点箭头设置为显示
                    this.nodes.forEach((node,key) => {
                      if(node.id == item.sourceNode.id && item.type == 'Line') node.isBottomConnectShow = true
                    })
                })
              }else{
                //类型：包含
                let connectorId = this.GenNonDuplicateID(3)  // 生产唯一id
                let connector = {
                  id:connectorId,
                  type:connectType,
                  strokeW:3,//仅用于Line类型,默认3
                  color:'#666', //仅用于Line类型，默认颜色
                  targetNode:{
                    x:targetNodeX,
                    y:targetNodeY,
                    id:CONNECTLINE.endNode,
                    width:targetNodeW,
                    height:targetNodeH
                  },
                  sourceNode:{
                    x:sourceNodeX,
                    y:sourceNodeY,
                    id:CURNODE.id,
                    width:sourceNodeW,
                    height:sourceNodeH
                  },
                  showDelete: false,
                  isSelect: false,
                }
                CURNODE.isBottomConnectShow = true
                this.nodes.forEach((item,key) => {
                  if(item.id == CONNECTLINE.endNode) item.isLeftConnectShow = true
                })
                CONNECTORS.push(connector)
                }           
            }         
          }else{
            CURNODE.isBottomConnectShow = false     //连线失败：起点右侧箭头暂且设置为消失
            CONNECTORS.forEach((item,key) => {     //连线判断，如果已经有连线起点为当前的node，将起点箭头设置为显示
                this.nodes.forEach((node,key) => {
                  if(node.id == item.sourceNode.id && item.type == 'Line') node.isBottomConnectShow = true
                })
            })
            
          }
          //绘制连线恢复初始值
          CONNECTLINE.x1 = 0
          CONNECTLINE.y1 = 0
          CONNECTLINE.x2 = 0
          CONNECTLINE.y2 = 0
          CONNECTLINE.isConnecting = false
          CONNECTLINE.sourceNode = ''
          CONNECTLINE.endNode = ''
        }
      },
      GenNonDuplicateID(randomLength){
        return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
      },
      canConnectorTo(curNodeType,connectorToNodeType,connectorType){
        //当需要包含和连线规则的时候 清除以下注释
        // let canConnector = false
        // if(connectorType == 'Link'){
        //   this.connectorRules.forEach((ele,key)=>{
        //     if(ele.type == curNodeType){
        //       ele.canLinkToType.forEach((el,index)=>{
        //         if(el == connectorToNodeType) canConnector = true
        //       })
        //     }
        //   })       
        // }else if(connectorType == 'Contain'){
        //   this.connectorRules.forEach((ele,key)=>{
        //     if(ele.type == curNodeType){
        //       ele.canBeContainedType.forEach((el,index)=>{
        //         if(el == connectorToNodeType) canConnector = true
        //       })
        //     }
        //   })
        // }  
        let canConnector = true   
        return canConnector
      },
      //拖拽svg中的node
      dragSvgNode(key, event){
        let mouseX0 = event.clientX + $(document).scrollLeft()//鼠标点击下的位置
        let mouseY0 = event.clientY + $(document).scrollTop()
        let CURNODE = this.nodes[key] //点击的node对象
        let startX = CURNODE.x //节点开始位置
        let startY = CURNODE.y
        let curNodeId = CURNODE.id  //当前结点id
        let nodeW = CURNODE.width  //节点 宽高
        let nodeH = CURNODE.height 
        let nodeStartPosArr = []  
        console.log('123',nodeStartPosArr)

         nodeStartPosArr.push({id:CURNODE.id,x:CURNODE.x,y:CURNODE.y})
        // this.storeCurnodeStartPosition(CURNODE,nodeStartPosArr)  //将选择的node的子子节点初始位置保存进去

        this.nodes.forEach((node,key)=>{            // 关联属性设置框       
          if(node.id == CURNODE.id){
            this.selectNodeData = node
          }
        })
         let endX, endY
        document.onmousemove = (event) => {         
　　　　　let disX = event.clientX - mouseX0 + $(document).scrollLeft() //移动位置
          let disY = event.clientY - mouseY0 + $(document).scrollTop()
          endX = startX + disX //最终位置
          endY = startY + disY
          this.moveContianNode(disX,disY,nodeStartPosArr) //根据保存的数组数据移动相关节点
          this.refreshConnectorsData()  //及时更新连线数据
　　　　};
        document.onmouseup = (event) => {　　　　　　           
           document.onmousemove = null
　　　　　  document.onmouseup = null
         this.marker.isMarkerShow = false    //隐藏标尺
         let NodeEndX = this.marker.ymarkerX  //最终位置为标尺的位置 最终节点位置
         let NodeEndY = this.marker.xmarkerY
        //  let disX = NodeEndX - startX
        //  let disY = NodeEndY - startY
          let disX = endX - startX
          let disY = endY - startY
          let mouseDisX = event.clientX - mouseX0
          let mouseDisY = event.clientY - mouseY0
          // this.moveContianNode(disX,disY,nodeStartPosArr)  //移动包含着的子节点 不用         
        //  this.drawContainLayout(CURNODE,NodeEndX,NodeEndY,true,nodeStartPosArr,mouseDisX,mouseDisY,startY) 
        this.refreshConnectorsData() //最后刷新连线            
　　　　};
      },
      //存入node及其子节点位置信息
      storeCurnodeStartPosition(CURNODE,startNodePosition){
        // let containNodes = CURNODE.containNodes
        startNodePosition.push({id:CURNODE.id,x:CURNODE.x,y:CURNODE.y})
        // console.log('startNodePosition',startNodePosition)
        // if(containNodes.length){
        //   containNodes.forEach((nodeId,key) => {
        //     this.nodes.forEach((ele,index) => {
        //       if(ele.id == nodeId){
        //         this.storeCurnodeStartPosition(ele,startNodePosition)
        //       }
        //     })
        //   })
        // }
      },
      //contain情况下移动子节点位置
      moveContianNode(disX,disY,nodeStartPosArr){
        // console.log(nodeStartPosArr)
        nodeStartPosArr.forEach((ele,key) => {
          let storeInfoId = ele.id
          this.nodes.forEach((node,key) => {
            if(node.id == storeInfoId){
              // console.log(storeInfoId, node.name)
              node.x = ele.x +disX
              node.y =ele.y +disY
            }
          })
        })      
      },
      //刷新连线数据
      refreshConnectorsData(){
        this.connectors.forEach((item,index) => {
          //更新connectors里的数据
          this.nodes.forEach((node,key) =>{
            if(item.sourceNode.id == node.id) {
              item.sourceNode.width = node.width
              item.sourceNode.height = node.height
              item.sourceNode.x = node.x
              item.sourceNode.y = node.y
            }
            if(item.targetNode.id == node.id) {
              item.targetNode.width = node.width
              item.targetNode.height = node.height
              item.targetNode.x = node.x
              item.targetNode.y = node.y
            }
          })                   
        })
      },
      deleteNode(key,event){
          let node = this.nodes[key];
          this.deleteSelectNodeLink(node.id) // 删除与之连线
          this.nodes.splice(key,1)
      },
      //删除node节点及其关系
      deleteNodeAndConnetor(){
        document.onkeydown =(event)=>{
          let keycode =  event.which //键盘值
          if(keycode == 46 || keycode == 8) {   //在mac上del的keycode是8,这样又会引起win下输入backspace也会删除
            //单节点和多选删除节点
            for(let i=0;i<this.nodes.length;i++){
              let node = this.nodes[i]
              if(node.isSelect){
                this.deleteSelectNodeLink(node.id)
                let targetNodeId=""
                let targetNode = null
                this.connectors.forEach((ele,key) => {
                  if(ele.sourceNode.id == node.id ) targetNodeId = ele.targetNode.id
                })
                this.deleteCurNodeContainConnector(node)
                if(targetNodeId){
                  this.nodes.forEach((node,index) => {
                  if(node.id  == targetNodeId)
                  this.refreshRowAndOuterNode(node)
                  }) 
                }            
                this.nodes.splice(i,1)
                //删除包含关系1.如果有父元素，恢复父元素的宽高位置
                this.deleteCurnodeAndChildnodes(node) // 删除此节点内部所有包含的节点及其关系          
                this.refreshNodeArrows() //刷新节点的左右箭头展示  
                i -- 
                if(this.nodes.length > 0){
                  this.selectNodeIndex = 
                  this.selectNodeData = {} 
                }else{
                  this.selectNodeIndex = null
                  this.selectNodeData = {}
                  this.isTopoAttrShow = false
                } 
              }
            }
          }
        }
      },
      //删除此节点下所有包含的所有节点
      deleteCurnodeAndChildnodes(CURNODE){      
        this.deleteCurNodeContainConnector(CURNODE)
        if(CURNODE.containNodes.length){        
          CURNODE.containNodes.forEach((containNodeId,key) => {
            let containId =  containNodeId
            this.nodes.forEach((ele,index)=>{
              if(ele.id == containId) {
                let curnode = ele
                this.nodes.splice(index,1)
                this.deleteSelectNodeLink(containId)
                this.deleteCurnodeAndChildnodes(curnode) //递归删除内部所有的节点及其关系
              }
            })
          })
        }
    },
      //删除选中node的连线
    deleteSelectNodeLink(selectId){
      let connectorObjArr = this.connectors
      let connectorsLen = connectorObjArr.length
      for(let i=0; i<connectorsLen;i++){
        let connectorObj = connectorObjArr[i]
        //删除连线
        if(connectorObj.type == "Line" && (connectorObj.sourceNode.id == selectId || connectorObj.targetNode.id == selectId)){
          this.connectors.splice(i,1)
          i--
          connectorsLen --
        }        
      }
    },  
    // 单纯删除线
    deleteLine(key,event){
      this.connectors.splice(key,1)
      console.log(key)
    },
    addNode(data){
      // console.log(data)
      if(!data) return false;
      let node =  {
            name: data.label, 
            id: this.GenNonDuplicateID(6), 
            x: 10, 
            y: 10, 
            icon: data.value, 
            width: 60, 
            height: 60, 
            containNodes: [ ],
            attrs: [],
            classType: "T2",
            isTopConnectShow: false,
            isBottomConnectShow: false,
          };
         
          this.$set(this.nodes,this.nodes.length,node)
          // this.refreshRowAndOuterNode(node)  //刷新并列节点位置和父节点宽高 
          this.refreshConnectorsData()  
          // console.log(this.nodes)
    },
    // 鼠标移入选中连线
    selectConnectorLine(key){
      this.connectors[key].showDelete = true;
      // if(!this.editable) return false //如果非编辑状态 不可点击
      let connectors = this.connectors
      let nodes = this.nodes
      let selectLine = this.connectors[key]
      let lastIndex = connectors.length - 1
      connectors.splice(key,1)
      connectors.push(selectLine)
      //取消所有选中样式
      this.cancelAllNodesSelect()
      this.cancelAllLinksSelect()
      selectLine.isSelect = true
      this.$set(connectors,lastIndex,selectLine)
      this.selectNodeData = selectLine //将点击的连线信息赋值给属性面板
    },
    // 鼠标移出隐藏删除按钮
    cancelSelectConnectorLine(key){
      this.connectors[key].showDelete = false;

    },
      //取消所有节点选中
    cancelAllNodesSelect(){
      this.nodes.forEach((ele,key) =>{
          ele.isSelect = false
          this.$set(this.nodes,key,ele)
      })
      this.selectNodeData = {}
    },
    //取消所有连线选中
    cancelAllLinksSelect(){
      this.connectors.forEach((ele,key)=>{
          ele.isSelect = false
          this.$set(this.connectors,key,ele)
      }) 
      this.selectNodeData = {}
    },
        //刷新父节点的宽度 及 其子节点位置
      refreshRowAndOuterNode(TARGETNODE){
        if(TARGETNODE.containNodes.length>0){
          //重新计算targetnode的宽度
          let sumWidth = 0
          let maxHeight = 0
          TARGETNODE.containNodes.forEach((ele,key) => {
            let containNodeId = ele 
            this.nodes.forEach((node,index) => {
              if(node.id == containNodeId) {
                sumWidth += node.width
                if(node.height > maxHeight) maxHeight = node.height
              }
            })
          })
          sumWidth += (TARGETNODE.containNodes.length + 1) * this.containLeft
          TARGETNODE.width = sumWidth
          TARGETNODE.height = maxHeight + 10 + this.containTop
          
        }else{
          TARGETNODE.width = TARGETNODE.initW
          TARGETNODE.height = TARGETNODE.initH
          
        }
        this.connectors.forEach((ele,key) => {
          let parentNodeId = ""
          let parentNode={}
          if(ele.sourceNode.id == TARGETNODE.id && ele.type=="Contain"){
            parentNodeId = ele.targetNode.id
            this.nodes.forEach((node,key) => {
              if(node.id == parentNodeId)  this.refreshRowAndOuterNode(node)
            })
          }
        })
        //重新计算每个containNode的位置
      // this.refreshContainNodesPosition(TARGETNODE)
      },
      //计算每个containNode的位置
      refreshContainNodesPosition(TARGETNODE){
        TARGETNODE.containNodes.forEach((ele,key) =>{    
          let containNodeId =ele
          let containNode 
          let preNode
          this.nodes.forEach((node,index) => {
            if(node.id == containNodeId) {
              containNode = node                          
            }
          })
          if(key == 0){
            this.refreshRowNodesPosition(TARGETNODE,containNode,null) 
          }else{
            let preNodeIndex = key - 1
            let preNodeId = TARGETNODE.containNodes[preNodeIndex]
            this.nodes.forEach((node,index) => {
              if(node.id == preNodeId) preNode = node
            })
            this.refreshRowNodesPosition(TARGETNODE,containNode,preNode)
          }
        }) 
      },
         //计算并列的nodes位置
      refreshRowNodesPosition(TARGETNODE,CURNODE,PRENODE){            
        if(PRENODE != null){
          CURNODE.x = PRENODE.x + PRENODE.width + this.containLeft
        }else{
          CURNODE.x = TARGETNODE.x +this.containLeft
        }
        CURNODE.y = TARGETNODE.y +this.containTop
        this.refreshContainNodesPosition(CURNODE)
      },
    //1.取消选中的node节点 2. 移动viewbox
    mousedownTopoSvg(event){ 
      console.log(this.svgAttr)
      let mouseX0 = event.clientX //鼠标点击下的位置
      let mouseY0 = event.clientY
      let startViewX = this.svgAttr.viewX
      let startViewY = this.svgAttr.viewY
      let startSvgW =  this.svgAttr.width
      let startSvgH = this.svgAttr.height
      let svgMinW = this.svgAttr.minW
      let svgMinH = this.svgAttr.minH  
      let selectionBoxX = 0
      let selectionBoxY = 0   
      this.cancelAllNodesSelect() //取消所有节点选中     
      this.cancelAllLinksSelect() //取消连线选中  
      
      //移动viewbox位置
      document.onmousemove=(event)=>{
        let disX = event.clientX - mouseX0
        let disY = event.clientY - mouseY0
        let endSvgW = startSvgW - disX
        let endSvgH = startSvgH - disY
        this.svgAttr.isHand = true
        this.svgAttr.viewX = (startViewX <= disX) ? 0 : startViewX - disX   //根据鼠标移动的位移，得到视图移动位移
        this.svgAttr.viewY = (startViewY <= disY) ? 0 : startViewY - disY 
        this.svgAttr.width = (endSvgW < svgMinW) ? svgMinW : endSvgW   // 动态设置svg宽高
        this.svgAttr.height = (endSvgH < svgMinH) ? svgMinH : endSvgH
        this.marker.xmarkerX = this.svgAttr.width
        this.marker.ymarkerY = this.svgAttr.height
      }
      document.onmouseup =(event)=>{
        document.onmousemove = null
        document.onmouseup = null
        this.svgAttr.isHand = false
        this.svgAttr.isCrosshair = false
      }
    },

    },
    created () {
    },
    destroyed(){
      // 销毁 panZoomTiger 实例
    },
    computed: {
      
    },
    mounted () {
      this.deleteNodeAndConnetor()
      // this.draw =  this.$svg('svg_dragbox').size(800, 600).addClass('box')
      // document.oncontextmenu = function(e){
      //         return false;
      // }

      // $('.box').mousedown((e)=>{
      //   console.log(e.target, $(e.target).attr('id'))
      //   this.currentId = $(e.target).attr('id')
      //     if(e.which == 3){  // 1 = 鼠标左键; 2 = 鼠标中键; 3 = 鼠标右键
      //         var x = e.originalEvent.x || e.originalEvent.layerX || 0;
      //         var y = e.originalEvent.y || e.originalEvent.layerY || 0;
      //         $("#menu").css({
      //             left: x + "px",
      //             top: y + "px",
      //             display: 'block'
      //         });
      //         $("#menu").show();
      //     }
      //     if(e.which == 1){  //如果鼠标左键点下，则隐藏右键菜单
      //         $("#menu").hide();
      //     }
      // })

 
      // this.dragBox()
      // this.getNodes(this.datas)
      // this.render();
       
    },
  }
</script>

<style scoped>
  #svg_dragbox {
    border: 2px solid #ccc;
    border-radius: 6px;
    user-select: none;
    width: 800px;
    margin-top: 10px;
  }
  #menu {
    position: absolute;
    display: none;
    cursor: pointer;
    border: 1px solid #e3e3e3;
    /* padding: 5px 10px; */
    border-radius: 6px;
    background: #fff;
  }
  #menu p {
    padding: 4px 10px;
  }
  #menu p:hover {
    background: azure;
  }
  .topoWrap {
    width: 800px;
    height: 600px;
    overflow: hidden;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    margin-top: 10px;

  }
  .topoSvg {
    user-select: none;
  }
  .reactClass{
    stroke-width: 1;
    stroke: #666; 
    stroke-dasharray: 2 3;
    fill:transparent;
    cursor: default;
  }
  .connectorsG.active {
    /* filter: url(#f1) */
  }
</style>