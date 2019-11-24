<template>
  <div style="height: 100%">
    <Select
      v-model="value"
      style="width:400px; margin-right: 20px;"
      label-in-value
      clearable
      @on-change="addNode"
    >
      <Option v-for="item in types" :label="item.label" :value="item.value" :key="item.value">
        <img style="height: 25px; margin-right: 10px;" :src="item.value" />
        <span>{{ item.label }}</span>
      </Option>
    </Select>
    <Button type="primary" @click="edit">编辑</Button>
    <Button type="primary" @click="save">保存</Button>
    <Button type="primary" @click="saveAsPng">下载为图片</Button>
    <div class="svgHead" v-show="editable">
      <ul class="svgHeadItemLst">
        <li
          class="svgHeadItem"
          v-for="(ele,key) in svgToolbar"
          :key="ele.className"
          :class="{'active':ele.isActive}"
          @mousedown="selectToolbar(key)"
          :title="ele.name"
        >
          <div class="svgHeadItemImg" :class="ele.className"></div>
        </li>
      </ul>
      <!-- <ul class="svgHeadItemLst">
        <li class="svgToolBarItem" @click="saveTopoJson" title="保存">
          <i class="fa fa-save svgToolBarIcon"></i>
          <span class="svgToolBarTxt hidden-xs-only">保存</span>
        </li>
        <li class="svgToolBarItem" title="上传">
            <i class="fa fa-upload svgToolBarIcon"></i>
            <span  class="svgToolBarTxt hidden-xs-only">上传</span>
          </li>
          <li class="svgToolBarItem" title="下载">
            <i class="fa fa-download svgToolBarIcon"></i>
            <span  class="svgToolBarTxt hidden-xs-only">下载</span>
        </li>
        <li class="svgToolBarItem" @click="saveTopoImage" title="保存图片">
            <i class="fa fa-file-image-o svgToolBarIcon"></i>
            <span  class="svgToolBarTxt hidden-xs-only">保存图片</span>
        </li>
      </ul> -->
    </div>
    <div class="svgMain">
      <v-shapebar @click="dragShapeNode" v-show="editable"></v-shapebar>
      <div :id="'topoId'+topoId" class="topoWrap">
        <svg
          class="topoSvg"
          :width="svgAttr.width"
          :height="svgAttr.height"
          :viewBox="svgAttr.viewX+' '+svgAttr.viewY+' '+svgAttr.width+' '+svgAttr.height"
          @mousedown.stop="mousedownTopoSvg($event)"
        >
          <!-- @mousewheel="mouseWheel($event)" -->
          <defs>
            <pattern
              id="Pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <line
                :x1="ele.x1"
                :x2="ele.x2"
                :y1="ele.y1"
                :y2="ele.y2"
                :stroke="ele.color"
                :stroke-width="ele.strokeWidth"
                :opacity="ele.opacity"
                v-for="ele in gridData"
                :key="ele.id"
              />
            </pattern>
          </defs>
          <defs>
            <path id="arrow1" d="M2,2 L2,9 L8,5 L2,2" stroke="none" fill="#666" />
          </defs>
          <defs id="SvgjsDefs1370">
            <marker
              id="arrow"
              markerWidth="12"
              markerHeight="12"
              refX="6"
              refY="6"
              viewBox="0 0 12 12"
              orient="auto-start-reverse"
            >
              <!-- orient="auto" -->
              <path id="SvgjsPath1372" d="M2,2 L2,9 L8,5 L2,2" stroke="none" fill="#666" />
            </marker>
          </defs>
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
              <feColorMatrix
                result="matrixOut"
                in="offOut"
                type="matrix"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
              />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <rect
            v-show="editable"
            fill="url(#Pattern)"
            :width="svgAttr.width"
            :height="svgAttr.height"
          />
          <g :transform="scale" class="svg-pan-zoom_viewport">
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
                :d="'M'+(ele.targetNode.x + ele.targetNode.width /2)+','+(ele.targetNode.y -5) +
                'L'+(ele.sourceNode.x + ele.sourceNode.width / 2)+','+(ele.sourceNode.y + ele.sourceNode.height + 5)+
                'Z'"
              />
              <!-- <g :transform="'rotate('+ getTanDeg( (ele.targetNode.y -5 -ele.sourceNode.y + ele.sourceNode.height + 5)/(ele.targetNode.x + ele.targetNode.width /2-ele.sourceNode.x + ele.sourceNode.width / 2))+')'"> -->
              <!-- <path d="m2,2 L2,9 L8,5 L2,2" stroke="none" fill="#666" /> -->
              <!-- :cx="ele.targetNode.x + ele.targetNode.width /2" -->
              <!-- :cy="ele.targetNode.y -5" -->
              <path 
              :transform="'rotate('+ getTanDeg( (ele.targetNode.y -5 -ele.sourceNode.y + ele.sourceNode.height + 5)/(ele.targetNode.x + ele.targetNode.width /2-ele.sourceNode.x + ele.sourceNode.width / 2))+ ' '
              + ele.targetNode.x + ele.targetNode.width /2 + ' ' +ele.targetNode.y -5 +')'"
               :d="'M'+(ele.targetNode.x + ele.targetNode.width /2)+','+(ele.targetNode.y -5) +
                'L'+(ele.targetNode.x + ele.targetNode.width /2 -5)+','+(ele.targetNode.y -5 -5)+
                'L'+(ele.targetNode.x + ele.targetNode.width /2 -5)+','+(ele.targetNode.y -5 +5)+
                'L'+(ele.targetNode.x + ele.targetNode.width /2)+','+(ele.targetNode.y -5)
                "  stroke="none" fill="#666" />

              <!-- </g> -->
                <!-- fill="url(#arrow1)" -->
                <!-- marker-end="url(#arrow)" -->
              <!-- 删除连线 -->
              <g
                class="deleteArror"
                :class="{'connector':ele.isTopConnectShow}"
                :transform="'translate(' + (ele.targetNode.x + ele.targetNode.width /2 + ele.sourceNode.x + ele.sourceNode.width / 2) / 2 +','
                  + (ele.targetNode.y -20 + ele.sourceNode.y + ele.sourceNode.height + 20) / 2 +')'"
                @mousedown.stop="deleteLine(key,$event)"
                v-show="ele.showDelete"
               >
                <circle r="12" cx="0" cy="-0" class="circleColor" fill="#efefef" />
                <line x1="-3" y1="-3" x2="3" y2="3" stroke="#333" stroke-width="1" />
                <line x1="-3" y1="3" x2="3" y2="-3" stroke="#333" stroke-width="1" />
              </g>
            </g>
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
              />
              <text class="nodeName" :x="-45" :y="34" text-anchor="start">{{ele.name}}</text>
              <rect
                class="reactClass"
                v-show="ele.isTopConnectShow"
                :x="-2"
                :y="-1"  
                :rx="0"
                :ry="0"
                :width="ele.width + 4"
                :height="ele.height + 2"
              />
              <g
                class="connectorArror"
                :class="{'connector':ele.isTopConnectShow}"
                :transform="'translate(' + ele.width/2 +','+ 0 +')'"
                v-show="ele.isTopConnectShow"
               >
                <circle r="8" cx="0" cy="0" class="circleColor" fill="#efefef" />
                <!-- <line x1="-4" y1="1" x2="0" y2="-5" stroke="#333" stroke-width="1"></line>
                <line x1="4" y1="1" x2="0" y2="-5" stroke="#333" stroke-width="1"></line>-->
                <line x1="-4" y1="-1" x2="0" y2="5" stroke="#333" />
                <line x1="4" y1="-1" x2="0" y2="5" stroke="#333" />
              </g>
              <g
                class="connectorArror"
                v-show="ele.isBottomConnectShow"
                :class="{'connector':ele.isBottomConnectShow}"
                :transform="'translate('+ele.width/2+','+ele.height+')'"
                @mousedown.stop="drawConnectLine(key,$event)"
                @mouseout.stop="mouseoutLeftConnector(key)"
               >
                <circle r="8" cx="0" cy="0" class="circleColor" fill="#efefef" />
                <line x1="-4" y1="-1" x2="0" y2="5" stroke="#333" />
                <line x1="4" y1="-1" x2="0" y2="5" stroke="#333" />
              </g>
              <!-- 删除节点 -->
              <g
                class="deleteArror"
                :class="{'connector':ele.isTopConnectShow}"
                :transform="'translate(' + ele.width +','+ 0 +')'"
                @mousedown.stop="deleteNode(key,$event)"
                v-show="ele.isTopConnectShow"
               >
                <circle r="8" cx="0" cy="-0" class="circleColor" fill="#efefef" />
                <line x1="-3" y1="-3" x2="3" y2="3" stroke="#333" stroke-width="1" />
                <line x1="-3" y1="3" x2="3" y2="-3" stroke="#333" stroke-width="1" />
              </g>
              <!-- 右键菜单 -->
              <g transform="translate(65,50)" v-show="ele.showMenu">
                <rect x="0" y="0" rx="4" ry="4" width="80" height="32" stroke="#2d8cf0" fill="#fff" @click="updateName(key,$event)"></rect>
                <rect x="0" y="32" rx="4" ry="4" width="80" height="32" stroke="#2d8cf0" fill="#fff" @click="updateName(key,$event)"></rect>
                <text x="15" y="20" fill="#2d8cf0" @click="updateName(key,$event)">修改名称</text>
                <text x="15" y="52" fill="#2d8cf0" @click="deleteNode(key,$event)">删除节点</text>
              </g>
            </g>
            <!-- 动态绘制的连线 -->
            <g>
              <line
                :x1="connectingLine.x1"
                :y1="connectingLine.y1"
                :x2="connectingLine.x2"
                :y2="connectingLine.y2"
                v-show="connectingLine.isConnecting"
                stroke="#666"
                stroke-width="1"
              />
            </g>
          </g>
           <line :class="{isMarkerShow:marker.isMarkerShow}" id="xmarker" class="marker" x1="0" :y1="marker.xmarkerY" :x2="marker.xmarkerX" :y2="marker.xmarkerY"></line>
          <line :class="{isMarkerShow:marker.isMarkerShow}" id="ymarker" class="marker" :x1="marker.ymarkerX" y1="0" :x2="marker.ymarkerX" :y2="marker.ymarkerY"></line>
          <rect :x="selectionBox.x" :y="selectionBox.y" :width="selectionBox.width" :height="selectionBox.height" stroke-dasharray="5,5" stroke-width="1" stroke="#222" fill="rgba(170,210,232,0.5)" v-show="selectionBox.isShow"/>
        </svg>
      </div>
    </div>
    <div v-if="shapebarMoveNode.isShow" class="moveNode nodeMoveCss" :style="{ left:shapebarMoveNode.left + 'px', top: shapebarMoveNode.top + 'px' }">
      <div class="shapeIcon">
        <img class="shapeIconImg" :src="shapebarMoveNode.icon"/>
      </div>
      <div class="shapeName">{{shapebarMoveNode.name}}</div>
    </div>
  </div>
</template>

<script>
import vShapebar from "./vShapebar";
export default {
  components: { vShapebar: vShapebar },
  data() {
    return {
      value: null,
      editable: true,
      svgToolbar: [
        { name: "默认模式", className: "toolbar-default", isActive: true },
        {
          name: "框选模式",
          className: "toolbar-rectangle_selection",
          isActive: false
        },
        {name:'放大',className:'toolbar-zoomin',isActive:false},
        {name:'缩小',className:'toolbar-zoomout',isActive:false},
        {name:'恢复出厂设置',className:'toolbar-zoomreset',isActive:false}
      ],
      shapebarMoveNode: {
        left: 0,
        top: 0,
        name: "",
        icon: "",
        isShow: false
      },
      svgTopo: {
        isMoveover: false
      },
      selectionBox: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        isShow: false
      },
      classchoose: false,
      scale: "scale(1)",
      rate: 1,
      types: [
        { label: "IP3", value: require("../../assets/imgs/svg/ip.png") },
        { label: "服务器", value: require("../../assets/imgs/svg/fuwuqi.png") },
        {
          label: "交换机",
          value: require("../../assets/imgs/svg/jiaohuanji.png")
        },
        {
          label: "扬声器",
          value: require("../../assets/imgs/svg/yangshengqi.png")
        }
      ],
      // svgAttr: {
      //   width: 800,
      //   height: 600,
      //   viewX: 0,
      //   viewY: 0,
      //   minW: 800,
      //   minH: 600
      // },
      svgAttr:{
        width:0,
        height:0,
        isHand:false,
        viewX:0,
        viewY:0,
        minW:0,
        minH:0,
        isCrosshair:false
      },
      marker: {
        xmarkerY: 0,
        xmarkerX: 0,
        ymarkerX: 0,
        ymarkerY: 0,
        isMarkerShow: false
      },
      connectingLine: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        isConnecting: true,
        sourceNode: "",
        endNode: ""
      },
      topoId: "",
      selectNodeData: {},
      selectNodeIndex: 0,
      activeNames: ["1"],
      // 结点
      nodes: [
        {
          name: "服务器",
          id: 1,
          x: 300,
          y: 20,
          icon: require("../../assets/imgs/svg/fuwuqi.png"),
          width: 60,
          height: 60,
          containNodes: [2, 3, 4],
          attrs: [],
          classType: "T2",
          isTopConnectShow: false,
          isBottomConnectShow: false,
          showMenu:false,
        },
        {
          name: "交换机",
          id: 2,
          x: 50,
          y: 150,
          icon: require("../../assets/imgs/svg/jiaohuanji.png"),
          width: 60,
          height: 60,
          containNodes: [],
          attrs: [],
          classType: "T2",
          isTopConnectShow: false,
          isBottomConnectShow: false,
          showMenu:false,
        },
        {
          name: "IP",
          id: 3,
          x: 200,
          y: 150,
          icon: require("../../assets/imgs/svg/ip.png"),
          width: 60,
          height: 60,
          containNodes: [],
          attrs: [],
          classType: "T2",
          isTopConnectShow: false,
          isBottomConnectShow: false,
          showMenu:false,
        },
        {
          name: "扬声器",
          id: 4,
          x: 400,
          y: 150,
          icon: require("../../assets/imgs/svg/yangshengqi.png"),
          width: 60,
          height: 60,
          containNodes: [5],
          attrs: [],
          classType: "T2",
          isTopConnectShow: false,
          isBottomConnectShow: false,
          showMenu:false,
        },
        {
          name: "交换机2",
          id: 5,
          x: 200,
          y: 300,
          icon: require("../../assets/imgs/svg/jiaohuanji.png"),
          width: 60,
          height: 60,
          containNodes: [],
          attrs: [],
          classType: "T2",
          isTopConnectShow: false,
          isBottomConnectShow: false,
          showMenu:false,
        }
      ],
      // 连线
      connectors: [
        {
          id: "path1",
          type: "Line",
          strokeW: 1,
          color: "#666",
          targetNode: {
            x: 50,
            y: 150,
            id: 2,
            width: 60,
            height: 60
          },
          sourceNode: {
            x: 300,
            y: 20,
            id: 1,
            width: 60,
            height: 60
          },
          isSelect: false,
          showDelete: false
        },
        {
          id: "path2",
          type: "Line",
          strokeW: 1,
          color: "#666",
          targetNode: {
            x: 200,
            y: 150,
            id: 3,
            width: 60,
            height: 60
          },
          sourceNode: {
            x: 300,
            y: 20,
            id: 1,
            width: 60,
            height: 60
          },
          isSelect: false,
          showDelete: false
        },
        {
          id: "path3",
          type: "Line",
          strokeW: 1,
          color: "#666",
          targetNode: {
            x: 400,
            y: 150,
            id: 4,
            width: 60,
            height: 60
          },
          sourceNode: {
            x: 300,
            y: 20,
            id: 1,
            width: 60,
            height: 60
          },
          isSelect: false,
          showDelete: false
        },
        {
          id: "path4",
          type: "Line",
          strokeW: 1,
          color: "#666",
          targetNode: {
            x: 200,
            y: 300,
            id: 5,
            width: 60,
            height: 60
          },
          sourceNode: {
            x: 400,
            y: 150,
            id: 4,
            width: 60,
            height: 60
          },
          isSelect: false,
          showDelete: false
        }
      ],
      gridData: [
        {
          x1: 0,
          x2: 100,
          y1: 20,
          y2: 20,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 1
        },
        {
          x1: 0,
          x2: 100,
          y1: 40,
          y2: 40,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 2
        },
        {
          x1: 0,
          x2: 100,
          y1: 60,
          y2: 60,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 3
        },
        {
          x1: 0,
          x2: 100,
          y1: 80,
          y2: 80,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 4
        },
        {
          x1: 20,
          x2: 20,
          y1: 0,
          y2: 100,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 5
        },
        {
          x1: 40,
          x2: 40,
          y1: 0,
          y2: 100,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 6
        },
        {
          x1: 60,
          x2: 60,
          y1: 0,
          y2: 100,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 7
        },
        {
          x1: 80,
          x2: 80,
          y1: 0,
          y2: 100,
          color: "#c0c0c0",
          strokeWidth: 1,
          opacity: 0.3,
          id: 8
        },
        {
          x1: 100,
          x2: 100,
          y1: 0,
          y2: 100,
          color: "#c0c0c0",
          strokeWidth: 2,
          opacity: 0.6,
          id: 9
        },
        {
          x1: 0,
          x2: 100,
          y1: 100,
          y2: 100,
          color: "#c0c0c0",
          strokeWidth: 2,
          opacity: 0.6,
          id: 10
        }
      ]
    };
  },
  methods: {
    getTanDeg(tan) {
        var result = Math.atan(tan) / (Math.PI / 180);
        result = Math.round(result);
        return result;
    },
    edit() {
      this.editable = true;
      console.log("edit", this.editable);
    },
    updateName(key, event){
      console.log(key)
      event.cancelBubble = true
      event.returnValue = false;
    },
    save() {
      this.editable = false;
      this.cancelAllNodesSelect(); //取消所有节点选中
      this.cancelAllLinksSelect(); //取消连线选中
    },
    //鼠标滑过node
    mouseoverNode(key, event) {
      if (!this.editable) return false;
      this.nodes[key].isTopConnectShow = true;
      this.nodes[key].isBottomConnectShow = true;
      // this.marker.xmarkerY = this.nodes[key].y
      // this.marker.ymarkerX = this.nodes[key].x
      this.getConnectLine(key);
    },
    //获取连线终点时的node的ID值
    getConnectLine(key) {
      if (!this.editable) return false;
      this.connectingLine.endNode = this.nodes[key].id;
    },
    //鼠标划出顶部箭头时，将connectingLine.endNode再次初始化
    mouseoutLeftConnector(key) {
      if (!this.editable) return false;
      this.connectingLine.endNode = "";
    },
    mouseoutNode(key, event) {
      if (!this.editable) return false;
      this.nodes[key].isTopConnectShow = false;
      this.nodes[key].isBottomConnectShow = false;
    },
    // 手动画线
    drawConnectLine(key, event) {
      if (!this.editable) return false;
      this.nodes.forEach((node, index) => {
        node.showMenu = false;
      });
      // 鼠标按下
      let CONNECTLINE = this.connectingLine; //绘制连线对象
      let CURNODE = this.nodes[key]; //当前点击node
      let nodeW = CURNODE.width; //当前node宽高
      let nodeH = CURNODE.height;
      let sourceNodeX = CURNODE.x;
      let sourceNodeY = CURNODE.y;
      let mouseX0 = event.clientX;
      let mouseY0 = event.clientY;
      let topoEle = $(`#topoId${this.topoId}`);
      let x1 =
        event.clientX -
        topoEle.find(".topoSvg").offset().left -
        2 +
        $(document).scrollLeft() +
        this.svgAttr.viewX; //连线开始位置的位置：鼠标点击的实际位置   为鼠标位置 - 当前元素的偏移值
      let y1 =
        event.clientY -
        topoEle.find(".topoSvg").offset().top +
        4 +
        $(document).scrollTop() +
        this.svgAttr.viewY;
      // 获取缩放值和位移值
      let transformArr = $(".svg-pan-zoom_viewport")
        .css("transform")
        .substring(7, "matrix(1, 0, 0, 1, 0, 0)".length - 1)
        .split(",");
      let scaleX = transformArr[0];
      let scaleY = transformArr[3];
      let tanslateX = transformArr[4];
      let tanslateY = transformArr[5];
      // // 重新计算 x1 y1 坐标值
      // x1 = Number(x1) / Number(scaleX) - Number(tanslateX)
      // y1 = Number(y1) / Number(scaleY) - Number(tanslateY)
      // console.log(x1, y1, Number(x1) * Number(scaleX) )
      // x1 =( Number(x1) - Number(tanslateX) )/ Number(scaleX)
      // y1 = (Number(y1) - Number(tanslateY) )/ Number(scaleY)

      //  x1 =( Number(x1) * Number(scaleX) - Number(tanslateX) )
      // y1 = (Number(y1) *  Number(scaleY) - Number(tanslateY) )

      // console.log(x1, y1)
      CONNECTLINE.isConnecting = true; //显示绘制连线
      CONNECTLINE.x1 = x1;
      CONNECTLINE.y1 = y1;
      CONNECTLINE.x2 = x1; //连线终点同样赋值为起点值
      CONNECTLINE.y2 = y1;
      CONNECTLINE.sourceNode = CURNODE.id; //将当前点击nodeid值赋给连线起点

      document.onmousemove = event => {
        let disX = event.clientX - mouseX0;
        let disY = event.clientY - mouseY0;

        // disX = ( Number(disX) * Number(scaleX)  - Number(tanslateX) )
        // disY = (Number(disY) *  Number(scaleY) - Number(tanslateY) )
        let x2 = x1 + disX;
        let y2 = y1 + disY;
        CURNODE.isBottomConnectShow = true;
        CONNECTLINE.x2 = x2;
        CONNECTLINE.y2 = y2;
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        let hasConnected = false; //标记是否已经有过连线
        let CONNECTORS = this.connectors;
        let sourceNodeW = nodeW;
        let sourceNodeH = nodeH;
        let targetNodeW = 0; //目标节点相关信息
        let targetNodeH = 0;
        let targetNodeX = 0;
        let targetNodeY = 0;
        let targetNodeType = "";
        let connectType = "";
        // console.log(CONNECTLINE.endNode)

        if (
          CONNECTLINE.endNode &&
          CONNECTLINE.endNode != CONNECTLINE.sourceNode
        ) {
          //正确连线：添加连线信息在connectors中
          //判断是否有已经有连线的情况
          CONNECTORS.forEach((item, index) => {
            if (
              item.sourceNode.id == CURNODE.id &&
              item.targetNode.id == CONNECTLINE.endNode &&
              item.type == "Line"
            )
              hasConnected = true;
          });

          //未连线情况下增加两者连线
          if (!hasConnected) {
            connectType = "Line";
            //获取目标节点宽高
            this.nodes.forEach((item, index) => {
              if (item.id == CONNECTLINE.endNode) {
                targetNodeW = item.width;
                targetNodeH = item.height;
                targetNodeX = item.x;
                targetNodeY = item.y;
                targetNodeType = item.type;
              }
            });
            let canLinkToTargetNode = true;
            if (!canLinkToTargetNode) {
              this.$message({
                showClose: true,
                message:
                  CURNODE.type + "类型 不能连接 " + targetNodeType + "类型",
                type: "error"
              });
              CURNODE.isBottomConnectShow = false; //连线失败：起点右侧箭头暂且设置为消失
              CONNECTORS.forEach((item, key) => {
                //连线判断，如果已经有连线起点为当前的node，将起点箭头设置为显示
                this.nodes.forEach((node, key) => {
                  if (node.id == item.sourceNode.id && item.type == "Line")
                    node.isBottomConnectShow = true;
                });
              });
            } else {
              //类型：包含
              let connectorId = this.GenNonDuplicateID(3); // 生产唯一id
              let connector = {
                id: connectorId,
                type: connectType,
                strokeW: 1, //仅用于Line类型,默认3
                color: "#666", //仅用于Line类型，默认颜色
                targetNode: {
                  x: targetNodeX,
                  y: targetNodeY,
                  id: CONNECTLINE.endNode,
                  width: targetNodeW,
                  height: targetNodeH
                },
                sourceNode: {
                  x: sourceNodeX,
                  y: sourceNodeY,
                  id: CURNODE.id,
                  width: sourceNodeW,
                  height: sourceNodeH
                },
                showDelete: false,
                isSelect: false
              };
              CURNODE.isBottomConnectShow = true;
              this.nodes.forEach((item, key) => {
                if (item.id == CONNECTLINE.endNode)
                  item.isLeftConnectShow = true;
              });
              CONNECTORS.push(connector);
            }
          }
        } else {
          CURNODE.isBottomConnectShow = false; //连线失败：起点右侧箭头暂且设置为消失
          CONNECTORS.forEach((item, key) => {
            //连线判断，如果已经有连线起点为当前的node，将起点箭头设置为显示
            this.nodes.forEach((node, key) => {
              if (node.id == item.sourceNode.id && item.type == "Line")
                node.isBottomConnectShow = true;
            });
          });
        }
        //绘制连线恢复初始值
        CONNECTLINE.x1 = 0;
        CONNECTLINE.y1 = 0;
        CONNECTLINE.x2 = 0;
        CONNECTLINE.y2 = 0;
        CONNECTLINE.isConnecting = false;
        CONNECTLINE.sourceNode = "";
        CONNECTLINE.endNode = "";
      };
    },
    GenNonDuplicateID(randomLength) {
      return Number(
        Math.random()
          .toString()
          .substr(3, randomLength) + Date.now()
      ).toString(36);
    },
    //拖拽svg中的node
    dragSvgNode(key, event) {
      if (!this.editable) return false;
      event.cancelBubble = true
      event.returnValue = false;
      if(event.which == 3) {
       document.oncontextmenu=function(ev){return false} //去掉默认右键菜单
        // 鼠标右键
        //  window.event.returnValue=false;  
         event.returnValue = false;
        this.nodes.forEach((node, index) => {
          // 关联属性设置框
          if (index == key) {
            node.showMenu = true;
          } else {
            node.showMenu = false;
          }
        });
      } else if(event.which == 1) {
        // 鼠标左键
        let mouseX0 = event.clientX + $(document).scrollLeft(); //鼠标点击下的位置
        let mouseY0 = event.clientY + $(document).scrollTop();
        let CURNODE = this.nodes[key]; //点击的node对象
        let startX = CURNODE.x; //节点开始位置
        let startY = CURNODE.y;
        let curNodeId = CURNODE.id; //当前结点id
        let nodeW = CURNODE.width; //节点 宽高
        let nodeH = CURNODE.height;
        let nodeStartPosArr = [];
        this.marker.isMarkerShow = true //显示标尺
        console.log("123", nodeStartPosArr);

        nodeStartPosArr.push({ id: CURNODE.id, x: CURNODE.x, y: CURNODE.y });

        this.nodes.forEach((node, key) => {
          // 关联属性设置框
          if (node.id == CURNODE.id) {
            this.selectNodeData = node;
          }
        });
        let endX, endY;
        document.onmousemove = event => {
          let disX = event.clientX - mouseX0 + $(document).scrollLeft(); //移动位置
          let disY = event.clientY - mouseY0 + $(document).scrollTop();
          endX = startX + disX; //最终位置
          endY = startY + disY;
          let n1 = Math.floor(endX / 20)  //grid宽高的整数倍
            let n2 = Math.floor(endY / 20) 
            if(n1 <= 0 ) n1 = 0
            if(n2 <= 0)  n2 = 0
            if(endX <= 0) {
              endX = 0 
              disX = -startX
            }
            if(endY <= 0 ){
              endY = 0 
              disY = -startY
            }
            this.marker.isMarkerShow = true  //显示标尺        
            this.marker.xmarkerY = n2 * 20   //标尺的移动位置，以每格20的距离移动
            this.marker.ymarkerX = n1 * 20   
          this.moveContianNode(disX, disY, nodeStartPosArr); //根据保存的数组数据移动相关节点
          this.refreshConnectorsData(); //及时更新连线数据
        };
        document.onmouseup = event => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.marker.isMarkerShow = false; //隐藏标尺
          let NodeEndX = this.marker.ymarkerX; //最终位置为标尺的位置 最终节点位置
          let NodeEndY = this.marker.xmarkerY;
          //  let disX = NodeEndX - startX
          //  let disY = NodeEndY - startY
          let disX = endX - startX;
          let disY = endY - startY;
          let mouseDisX = event.clientX - mouseX0;
          let mouseDisY = event.clientY - mouseY0;
          this.refreshConnectorsData(); //最后刷新连线
        };

      }
    },
    //存入node及其子节点位置信息
    storeCurnodeStartPosition(CURNODE, startNodePosition) {
      startNodePosition.push({ id: CURNODE.id, x: CURNODE.x, y: CURNODE.y });
    },
    //contain情况下移动子节点位置
    moveContianNode(disX, disY, nodeStartPosArr) {
      if (!this.editable) return false;
      // console.log(nodeStartPosArr)
      nodeStartPosArr.forEach((ele, key) => {
        let storeInfoId = ele.id;
        this.nodes.forEach((node, key) => {
          if (node.id == storeInfoId) {
            // console.log(storeInfoId, node.name)
            node.x = ele.x + disX;
            node.y = ele.y + disY;
          }
        });
      });
    },
    //刷新连线数据
    refreshConnectorsData() {
      this.connectors.forEach((item, index) => {
        //更新connectors里的数据
        this.nodes.forEach((node, key) => {
          if (item.sourceNode.id == node.id) {
            item.sourceNode.width = node.width;
            item.sourceNode.height = node.height;
            item.sourceNode.x = node.x;
            item.sourceNode.y = node.y;
          }
          if (item.targetNode.id == node.id) {
            item.targetNode.width = node.width;
            item.targetNode.height = node.height;
            item.targetNode.x = node.x;
            item.targetNode.y = node.y;
          }
        });
      });
    },
    deleteNode(key, event) {
      if (!this.editable) return false;
      this.nodes.forEach((node, index) => {
        node.showMenu = false;
      });
      let node = this.nodes[key];
      this.deleteSelectNodeLink(node.id); // 删除与之连线
      this.nodes.splice(key, 1);
    },
    //删除node节点及其关系
    deleteNodeAndConnetor() {
      if (!this.editable) return false;
      document.onkeydown = event => {
        let keycode = event.which; //键盘值
        if (keycode == 46 || keycode == 8) {
          //在mac上del的keycode是8,这样又会引起win下输入backspace也会删除
          //单节点和多选删除节点
          for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i];
            if (node.isSelect) {
              this.deleteSelectNodeLink(node.id); // 删除 与node节点的连线
              let targetNodeId = "";
              let targetNode = null;

              this.nodes.splice(i, 1); // 删除节点
              //删除包含关系1.如果有父元素，恢复父元素的宽高位置
              // this.deleteCurNodeContainConnector(node)   // 删除 node节点
              // this.refreshNodeArrows() //刷新节点的左右箭头展示
              i--;
              if (this.nodes.length > 0) {
                this.selectNodeIndex = this.selectNodeData = {};
              } else {
                this.selectNodeIndex = null;
                this.selectNodeData = {};
                this.isTopoAttrShow = false;
              }
            }
          }
        }
      };
    },

    //删除选中node的连线
    deleteSelectNodeLink(selectId) {
      if (!this.editable) return false;
      let connectorObjArr = this.connectors;
      let connectorsLen = connectorObjArr.length;
      for (let i = 0; i < connectorsLen; i++) {
        let connectorObj = connectorObjArr[i];
        //删除连线
        if (
          connectorObj.type == "Line" &&
          (connectorObj.sourceNode.id == selectId ||
            connectorObj.targetNode.id == selectId)
        ) {
          this.connectors.splice(i, 1);
          i--;
          connectorsLen--;
        }
      }
    },
    // 单纯删除线
    deleteLine(key, event) {
      if (!this.editable) return false;
      this.nodes.forEach((node, index) => {
        node.showMenu = false;
      });
      this.connectors.splice(key, 1);
      console.log(key);
    },
    addNode(data) {
      if (!this.editable) return false;
      // console.log(data)
      if (!data) return false;
      this.nodes.forEach((node, index) => {
        node.showMenu = false;
      });
      let node = {
        name: data.label,
        id: this.GenNonDuplicateID(6),
        x: 10,
        y: 10,
        icon: data.value,
        width: 60,
        height: 60,
        containNodes: [],
        attrs: [],
        classType: "T2",
        isTopConnectShow: false,
        isBottomConnectShow: false
      };

      this.$set(this.nodes, this.nodes.length, node);
      this.refreshConnectorsData();
      // console.log(this.nodes)
    },
    // 鼠标移入选中连线
    selectConnectorLine(key) {
      if (!this.editable) return false; //如果非编辑状态 不可点击
      this.connectors[key].showDelete = true;
      let connectors = this.connectors;
      let nodes = this.nodes;
      let selectLine = this.connectors[key];
      let lastIndex = connectors.length - 1;
      connectors.splice(key, 1);
      connectors.push(selectLine);
      //取消所有选中样式
      this.cancelAllNodesSelect();
      this.cancelAllLinksSelect();
      selectLine.isSelect = true;
      this.$set(connectors, lastIndex, selectLine);
      this.selectNodeData = selectLine; //将点击的连线信息赋值给属性面板
    },
    // 鼠标移出隐藏删除按钮
    cancelSelectConnectorLine(key) {
      this.connectors[key].showDelete = false;
    },
    //取消所有节点选中
    cancelAllNodesSelect() {
      this.nodes.forEach((ele, key) => {
        ele.isSelect = false;
        this.$set(this.nodes, key, ele);
      });
      this.selectNodeData = {};
    },
    //取消所有连线选中
    cancelAllLinksSelect() {
      this.connectors.forEach((ele, key) => {
        ele.isSelect = false;
        this.$set(this.connectors, key, ele);
      });
      this.selectNodeData = {};
    },
    //拖拽shapeBar中的node
    dragShapeNode(nodeData, key, event) {
      console.log(nodeData, key, event)
      this.nodes.forEach((node, index) => {
        node.showMenu = false;
      });
      let NODE = nodeData[key]; // 被点击的节点node
      let toolbarName = NODE.type;
      let toolbarIcon = NODE.icon;
      let topoEle = $(`#topoId${this.topoId}`);
      let svgOffsetLeft = topoEle.find(".topoSvg").offset().left;
      let svgOffsetTop = topoEle.find(".topoSvg").offset().top;
      let svgWidth = topoEle.find(".topoSvg").width();
      let svgHeight = topoEle.find(".topoSvg").height();
      let isContainSvgArea = false;
      document.onmousemove = event => {
        let mouseX = event.clientX; //当前鼠标位置
        let mouseY = event.clientY;
        let nodeX = event.clientX - svgOffsetLeft + $(document).scrollLeft() + this.svgAttr.viewX; //svg最终位置
        let nodeY = event.clientY - svgOffsetTop + $(document).scrollTop() + this.svgAttr.viewY;
        isContainSvgArea = false;
        this.shapebarMoveNode.left = mouseX + 4 + $(document).scrollLeft(); // 鼠标位置 + 文档滚动的距离
        this.shapebarMoveNode.top = mouseY + 4 + $(document).scrollTop();
        this.shapebarMoveNode.name = toolbarName;
        this.shapebarMoveNode.icon = toolbarIcon;
        this.shapebarMoveNode.isShow = true;
        this.marker.isMarkerShow = false;
        // 鼠标滑入svg区域内显示标尺并显示标尺正确位置
        if (
          mouseX >= svgOffsetLeft &&
          mouseX <= svgOffsetLeft + svgWidth &&
          mouseY >= svgOffsetTop - $(document).scrollTop() &&
          mouseY <= svgOffsetTop + svgHeight - $(document).scrollTop()
        ) {
          this.marker.isMarkerShow = true;
          isContainSvgArea = true;
          let n1 = Math.floor(nodeX / 20); //grid宽高的整数倍
          let n2 = Math.floor(nodeY / 20);
          this.marker.xmarkerY = n2 * 20;
          this.marker.ymarkerX = n1 * 20;
        }
      };
      document.onmouseup = event => {
        document.onmousemove = null;
        document.onmouseup = null;
        // 判断鼠标在svg区域
        if (isContainSvgArea) {
          let type = NODE.type;
          let name = NODE.type + "_" + NODE.num;
          NODE.num++;
          let id = GenNonDuplicateID(5);
          let nodeEndX = this.marker.ymarkerX;
          let nodeEndY = this.marker.xmarkerY;
          let svgNode = {
            name,
            type,
            id: id,
            x: nodeEndX,
            y: nodeEndY,
            icon: NODE.icon,
            width: NODE.width,
            height: NODE.height,
            initW: NODE.width,
            initH: NODE.height,
            classType: NODE.classType,
            isLeftConnectShow: false,
            isRightConnectShow: false,
            containNodes: [],
            attrs: []
          };
          this.marker.isMarkerShow = false; //标尺取消显示
          this.nodes.push(svgNode); //创建一个svg Node
        }
        //重新初始toolbarMoveNode的值
        this.shapebarMoveNode.left = 0;
        this.shapebarMoveNode.top = 0;
        this.shapebarMoveNode.name = "";
        this.shapebarMoveNode.icon = "";
        this.shapebarMoveNode.isShow = false;
      };
      //生成唯一id值
      function GenNonDuplicateID(randomLength) {
        return Number(
          Math.random()
            .toString()
            .substr(3, randomLength) + Date.now()
        ).toString(36);
      }
    },

    //1.取消选中的node节点 2. 移动viewbox
    mousedownTopoSvg(event) {
      if (!this.editable) return false;
      this.nodes.forEach((node, index) => {
        node.showMenu = false;
      });
      console.log(this.svgAttr);
      let mouseX0 = event.clientX; //鼠标点击下的位置
      let mouseY0 = event.clientY;
      let startViewX = this.svgAttr.viewX;
      let startViewY = this.svgAttr.viewY;
      let startSvgW = this.svgAttr.width;
      let startSvgH = this.svgAttr.height;
      let svgMinW = this.svgAttr.minW;
      let svgMinH = this.svgAttr.minH;
      let selectionBoxX = 0;
      let selectionBoxY = 0;
      this.cancelAllNodesSelect(); //取消所有节点选中
      this.cancelAllLinksSelect(); //取消连线选中

      //移动viewbox位置
      document.onmousemove = event => {
        let disX = event.clientX - mouseX0; // 鼠标移动x的距离
        let disY = event.clientY - mouseY0; // 鼠标移动y的距离
        let endSvgW = startSvgW - disX;
        let endSvgH = startSvgH - disY;
        this.svgAttr.isHand = true;
        // console.log(startViewX, startViewY, disX, disY);
        this.svgAttr.viewX = startViewX <= disX ? 0 : startViewX - disX; //根据鼠标移动的位移，得到视图移动位移
        this.svgAttr.viewY = startViewY <= disY ? 0 : startViewY - disY;
        // this.svgAttr.viewX = (startViewX <= disX) ?  startViewX + disX  : startViewX - disX   //根据鼠标移动的位移，得到视图移动位移
        // this.svgAttr.viewY = (startViewY <= disY) ? startViewY + disY  : startViewY - disY
        this.svgAttr.width = endSvgW < svgMinW ? svgMinW : endSvgW; // 动态设置svg宽高
        this.svgAttr.height = endSvgH < svgMinH ? svgMinH : endSvgH;
        this.marker.xmarkerX = this.svgAttr.width;
        this.marker.ymarkerY = this.svgAttr.height;
      };
      document.onmouseup = event => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.svgAttr.isHand = false;
        this.svgAttr.isCrosshair = false;
      };
    },
    mouseWheel(event) {
      let i = 0.1;
      if (this.rate < 0) return;

      if (event.deltaY > 0) {
        // 缩小
        this.rate = this.rate - 0.1;
      } else {
        // 放大
        this.rate = this.rate + 0.1;
      }

      this.scale = "scale(" + this.rate + ")";
      console.log(this.scale, event.deltaY);
    },
     //svg工具栏选择工具
    selectToolbar(key){
      this.svgToolbar.forEach((ele,key) => {
        ele.isActive = false
      })
      this.svgToolbar[key].isActive = true
    },
    //保存topo的json数据
    saveTopoJson() {
      console.log(JSON.stringify({ nodes:this.nodes, connectors: this.connectors}) )
    },
    saveTopoImage() {
      let maxW = 0;
      let maxH = 0;
      let initW = this.svgAttr.width;
      let initH = this.svgAttr.height;
      this.nodes.forEach((node, key) => {
        let nodeEndX = node.width + node.x;
        let nodeEndY = node.height + node.y;
        if (nodeEndX > maxW) maxW = nodeEndX;
        if (nodeEndY > maxH) maxH = nodeEndY;
      });
      maxW = maxW < this.svgAttr.minW ? this.svgAttr.minW : maxW;
      maxH = maxH < this.svgAttr.minH ? this.svgAttr.minH : maxH;
      this.svgAttr.width = maxW + 50;
      this.svgAttr.height = maxH + 20;
      saveSvgAsPng(document.getElementById("topoSvg"), "topo.png");
      // 建议使用promise进行优化
      setTimeout(() => {
        this.svgAttr.width = initW;
        this.svgAttr.height = initH;
      }, 1000);
    },
    saveAsPng() {
      let node = document.querySelector("svg");
      let name = "svg";
      let width = this.svgAttr.width;
      let height = this.svgAttr.height;
      let type = "png";
      this.covertSVG2Image(node, name, width, height, (type = "png"));
    },
    /**
     * 将svg导出成图片
     * @param node svg节点 => document.querySelector('svg')
     * @param name 生成的图片名称
     * @param width 生成的图片宽度
     * @param height 生成的图片高度
     * @param type 生成的图片类型
     */
    covertSVG2Image(node, name, width, height, type = "png") {
      let serializer = new XMLSerializer();
      let source =
        '<?xml version="1.0" standalone="no"?>\r\n' +
        serializer.serializeToString(node);
      let image = new Image();
      image.src =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      let context = canvas.getContext("2d");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, 10000, 10000);
      image.onload = function() {
        context.drawImage(image, 0, 0);
        let a = document.createElement("a");
        a.download = `${name}.${type}`;
        a.href = canvas.toDataURL(`image/${type}`);
        a.click();
      };
    },
     //初始化获取topo组件宽高
    initTopoWH(){
      this.$nextTick(()=>{
        // let width = this.$refs.topoWrap.offsetWidth - 2
        // let height = this.$refs.topoWrap.offsetHeight - 2

        let ele = `#topoId${this.topoId}`
        let topoW = $(ele).width()
        let topoH = $(ele).height()
        this.marker.xmarkerX = topoW
        this.marker.ymarkerY = topoH
        this.svgAttr.width = topoW
        this.svgAttr.height = topoH
        this.svgAttr.minW = topoW
        this.svgAttr.minH = topoH

        // this.marker.xmarkerX = width
        // this.marker.ymarkerY = height
        // this.svgAttr.width = width
        // this.svgAttr.height = height
        // this.svgAttr.minW = width
        // this.svgAttr.minH = height
        })
    },
  },
  created() {},
  destroyed() {},
  computed: {
    // scale: function(){
    //   return this.mouseWheel()
    // }
  },
  mounted() {
    this.deleteNodeAndConnetor();
    this.topoId = this.GenNonDuplicateID(5)
    this.initTopoWH() //初始化topo组件宽高
    //  svgPanZoom('.topoSvg')


    // d3画箭头
    // var svg = d3.select(".topoWrap")
    // var defs = svg.append("defs");

    // var arrowMarker = defs.append("marker")
    //       .attr("id","arrow")
    //       .attr("markerUnits","strokeWidth")
    //       .attr("markerWidth","8")
    //       .attr("markerHeight","8")
    //       .attr("viewBox","0 0 12 12")
    //       .attr("refX","13")
    //       .attr("refY","6")
    //       .attr("orient","auto");

    // var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

    // arrowMarker.append("path")
    //       .attr("d",arrow_path)
    //       .attr("fill","#999");

    //  d3.selectAll("path")
    //   .attr("marker-end","url(#arrow)");
  }
    
};
</script>

<style lang="less" scoped>

/*svgHead工具栏*/
.svgHead {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
  border: solid #aaaaaa;
  border-width: 1px 1px 0;
  box-shadow: inset 0 1px 0 0 #fff;
  width: 90%;
}
.svgHeadItemLst {
  display: flex;
  list-style: none;
}
.svgHeadItem {
  padding: 5px 10px;
  border: 1px solid #aaaaaa;
  cursor: pointer;
  list-style: none;
  border-left-width: 0;
}
.svgHeadItem:hover {
  background-color: #ebebeb;
}
.svgHeadItem:first-child {
  border-left-width: 1px;
}
.svgHeadItem.active {
  background-color: #ebebeb;
  box-shadow: 2px 2px 1px #ccc inset;
}
 
.svgHeadItemImg {
  background: url("../../assets/imgs/svg/icons.png");
  width: 16px;
  height: 16px;
  background-size: 479px 16px;
}
.svgHeadItemImg.toolbar-default {
  background-position: -16px 0px;
}
.svgHeadItemImg.toolbar-rectangle_selection {
  background-position: -294px 0px;
}
.svgHeadItemImg.toolbar-zoomin {
  background-position: -425px 0px;
}
.svgHeadItemImg.toolbar-zoomout {
  background-position: -444px 0px;
}
.svgHeadItemImg.toolbar-zoomreset {
  background-position: -462px 0px;
}
.svgToolBarItem {
  font-size: 13px;
  color: #525252;
  padding: 5px 10px;
  border-radius: 2px;
  box-sizing: border-box;
  margin-left: 5px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.svgToolBarTxt {
  margin-left: 2px;
}

.topoSvg {
  user-select: none;
}
/*svgMain*/
.svgMain {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  width: 90%;
}
/*移动的node*/
.shapeIcon {
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
  .shapeIconImg {
    width: 28px;
    height: 28px;
    -webkit-user-select: none;
    user-select: none;
  }
}
.shapeName {
  font-size: 12px;
  text-align: center;
  padding: 0 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
  color: #000;
}
.moveNode {
  position: absolute;
  border: 1px solid #768699;
  box-sizing: border-box;
  &.nodeMoveCss {
    width: 57px;
    height: 57px;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    box-sizing: border-box;
    padding: 5px;
  }
}
/*svgMain右侧svg主体区域*/
.topoWrap {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #aaaaaa;
  overflow: hidden;
  position: relative;
  background: #fff;
  .topoSvg {
    box-sizing: border-box;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    -moz-select: none;
    -ms-select: none;
    -o-select: none;
    &.hand {
      cursor: pointer;
    }
    &.crosshair {
      cursor: crosshair;
    }
  }
}
.reactClass {
  stroke-width: 1;
  stroke: #666;
  stroke-dasharray: 2 3;
  fill: transparent;
  cursor: default;
}
.connectorsG.active {
  /* filter: url(#f1) */
}

.marker{stroke:#3d7ed5;stroke-width:1;display: none;
  &.isMarkerShow{display: block;}
}
/*移动的node*/
.shapeIcon{text-align: center;-webkit-user-select:none;user-select:none;
  .shapeIconImg{width: 28px;height: 28px;-webkit-user-select:none;user-select:none;}
}
.shapeName{font-size:12px;text-align: center;padding:0 5px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;-webkit-user-select:none;user-select:none;color:#000}
.moveNode{position: absolute;border:1px solid #768699;box-sizing: border-box;
  &.nodeMoveCss{width:57px;height: 57px;background-color: #fff;-webkit-user-select:none;user-select:none;box-sizing: border-box;padding:5px;}
}
</style>