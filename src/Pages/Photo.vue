<template>
  <div style="">
    <h1>处理证件照</h1>
    
    <div class="photo-editor">
        <div class="menu-bar">
            <div class="menu">
                <div class="logo" ref="logo">
                    <!-- <span :class="{'logo-active': isActive}" style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">Z</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">h</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">a</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">n</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">g</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">T</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em, rgb(255, 153, 0) 0px -0.24em 0.24em;">i</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">n</span>
                    <span style="color: rgba(45, 45, 45, 0.5); text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, rgb(255, 255, 255) 0px -0.18em 0.18em;">g</span> -->
                
                    <span v-for="(item, index) in logos" :class="{'logo-active': item.isActive}">{{item.name}}</span>
                    
                </div>
            </div>
            <div class="menu">
                <span>导入照片</span>
                <input type="file" @change="change" unselectable="on"/>
 
            </div>
            <div class="menu">照片尺寸</div>
            <div class="menu" @click="showGrid">显示网格</div>
            <div class="menu">背景色</div>
            <div class="menu">生成单个照片</div>
            <div class="menu">生成多张照片</div>
            <div class="menu"> <a :href='src' download="photo">
            <a :href='src' download="一寸照片">下载照片</a> </a></div>
        </div>
        <div id="tools_left" class="tools_panel">
            <!-- 左侧工具栏 -->
            <div class="menu">
                <div id="clipBtn" class="icon clip-icon" @click="selectArea">区域</div>
            </div>
            <div class="menu">
                <div type="button" id="clipEndBtn" @click="openClipMenu">裁剪</div>
            </div>
        </div>
        <div id="tools_bottom" class="tools_panel">
            <!-- 左底部工具栏 -->
            <div class="menu">
                <span>+</span>
                <span>100%</span>
                <span>-</span>
            </div>
            <div class="menu">
                缩放：<input type="range" @mousemove="scaleChange" id="scale-range" min="0.1" max="2.0" step="0.01" v-model="scaleValue" style="display: inline-block;">
                {{ Math.round(scaleValue * 100) + '%'}}
            </div>
        </div>
        <div id="tools_right"></div>
        <div class="workarea" id="workarea">
            <canvas id="myCanvas" width="600" height="500"></canvas>
            <!-- <img class="canvas-bg" src="../assets/bg.png" alt=""> -->
            <!-- <div style="position: relative;">
            </div> -->
        </div>
    </div>
    <!-- <br>
    <button id="clipBtn" class="icon clip-icon" @click="selectArea">区域</button>
    <button type="button" id="clipEndBtn" @click="clipEndBtnClick">裁剪完成</button>
    <button @click="getImage">生成一寸图片2.5X3.5cm（295*413像素）</button> -->
    <!-- <br> -->
    裁剪预览
    <canvas id="resultCanvas" width="800" height="500" style="background-color: white"></canvas>
    <br>
    <img :src='src' style="width: 250px;"/>
    <a :href='src' download="downImg">下载照片</a>
    <modal title="选择证件照规格" :value="show" @on-cancel="cancel" @on-ok="startClip">
        <div style=""> 
            <label for="photoSize">选择照片尺寸</label> 
            <select name="" id="photoSize" v-model="photoSize" style="width: 100px;">
                <option value="一寸">一寸</option>
                <option value="两寸">两寸</option>
            </select> 
            <br>
            <label for="paperSize">选择相纸尺寸</label>
            <select name="" id="paperSize" v-model="paperSize" style="width: 100px;">
                <option value="3R">3R</option>
                <option value="4R">4R</option>
                <option value="5R">5R</option>
            </select>
            <br>
            <label for="photoNum">照片个数</label>
            <input type="radio" value="一个" checked>
            <input type="radio" value="多个">
        </div>
    </modal>
  </div> 
</template>

<script>
import { setInterval } from 'timers';
import modal from '../components/modal/modal'
export default {
  components: {modal},
  data() {
    return {
      paperSize: null,
      photoSize: null,
      show: false,
      logos: [{name: 'Z', isActive: true}, {name: 't',isActive:false}, {name: 'w', isActive: false}],
      file: null,
      canvas: null,
      ctx: null,
      src: '',
      img: null,
      sizeValue: null,
      scaleValue: 0.8,
      params: { // 拖拽和拉伸参数
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            currentX: 0,
            currentY: 0,
            flag: false,
            kind: "drag"     
        },
    orignWidth: 0,
    orignHeight: 0,
    clickFlag: false,
    posX: 0,
    poxY: 0,
    cropW: 0,
    cropH:0,
    iCurWidth:0,
    iCurHeight:0,
    point: null, 
    target: null, 
    kind: null,
    timer: null,
    count: 0,
    }
  },
  methods: {
      openClipMenu(){
          this.show = true
      },
      cancel() {
          this.show = false
      },
      startClip() {
          this.show = false
          this.clip()
      },
    init() {
      this.canvas = document.getElementById('myCanvas')
      this.ctx = this.canvas.getContext('2d')
      
      this.img = new Image()
      this.img.src = require('../assets/xz1.jpg')
        //   console.log(this.img, 'hsdjjas') 
      
      this.img.onload = () => {
          console.log('lalala')
        if (this.img.width<this.img.height) {
            this.scaleValue = this.canvas.height / this.img.height >1 ? 1 : this.canvas.height / this.img.height
        } else {
            this.scaleValue = this.canvas.width / this.img.width>1 ? 1 : this.canvas.width / this.img.width
        }
        
        this.ctx.drawImage( this.img, this.canvas.width / 2 - this.img.width / 2, this.canvas.height / 2 -  this.img.height / 2);
       
        // this.drawGrid(this.ctx,'#ccc', 20, 20);

        // 初始化缩放比例
        this.scaleChange()
        this.orignWidth = this.img.naturalWidth;
        this.orignHeight = this.img.naturalHeight;
      }
    },
    change(e) {
      let event = e || window.event
      let files = event.target.files
      let windowURL = window.URL || window.webkitURL
      let imgSrc = ''
      let size,type;
      
      if(files&&files.length>0){
        imgSrc = windowURL.createObjectURL(files[0])
        size = files[0].size
        type = files[0].type
      }
    //   this.canvas = document.getElementById('myCanvas')
    //   this.ctx = this.canvas.getContext('2d')
      this.img.src = imgSrc
      
      this.img.onload = () => {
          if (this.img.width<this.img.height) {
              this.scaleValue = this.canvas.height / this.img.height >1 ? 1 : this.canvas.height / this.img.height
          } else {
              this.scaleValue = this.canvas.width / this.img.width>1 ? 1 : this.canvas.width / this.img.width

          }
          
        //   console.log( this.scaleValue, this.img.width, this.img.height,this.canvas.width)
        this.ctx.drawImage( this.img, this.canvas.width / 2 - this.img.width / 2, this.canvas.height / 2 -  this.img.height / 2);
        // 初始化缩放比例
        this.scaleChange()
        this.orignWidth = this.img.naturalWidth;
        this.orignHeight = this.img.naturalHeight;
    //   console.log(this.orignWidth, this.orignHeight )
      }
    },
    sizeChange(val){
      console.log(this.sizeValue)
    },
    scaleChange(e) {
        console.log(this.scaleValue)
        if (this.canvas && this.img) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.save();
            this.ctx.translate(this.canvas.width / 2 -  this.img.width / 2 * this.scaleValue, this.canvas.height / 2 -  this.img.height / 2 * this.scaleValue);
            this.ctx.scale(this.scaleValue, this.scaleValue);

            this.img.url = this.canvas.toDataURL("image/png")

            this.ctx.drawImage( this.img, 0, 0);
            this.ctx.restore();
        }
 
    },
    selectArea(){
        console.log('开始选区')
        // 1 点击选择区域的时候 要判断上一次是否存在已选区域
        
        this.clickFlag = false;

        this.iCurWidth = this.canvas.width;
        this.iCurHeight = this.canvas.height;

        var oRelDiv = document.createElement("div");
        oRelDiv.style.position = "absolute";
        oRelDiv.style.width = this.iCurWidth + "px";
        oRelDiv.style.height = this.iCurHeight + "px";
        oRelDiv.style.top = "0px";
        oRelDiv.style.bottom = "0px";
        oRelDiv.style.left = "0px";
        oRelDiv.style.right = "0px";
        oRelDiv.style.margin = "auto";
        oRelDiv.style.zIndex = 2;
        oRelDiv.id = "cropContainer";

        var iOrigWidth = this.orignWidth, iOrigHeight = this.orignHeight;
        var scaleX = this.iCurWidth / iOrigWidth;  // 画布宽/ 原图片宽
        var scaleY = this.iCurHeight / iOrigHeight;

        this.canvas.parentNode.insertBefore(oRelDiv, this.canvas);

        // 初始化坐标(放于画布中间)与剪裁高宽
        this.cropW = 295;
        this.cropH = 413;
        this.posX = (this.canvas.offsetLeft + this.canvas.width / 2 - this.cropW / 2);  // 点距离左侧浏览器位置
        this.posY = (this.canvas.offsetTop + this.canvas.height / 2 - this.cropH / 2);
        let sInnerHtml =
            '<div id="zxxCropBox" style="height:' + this.cropH + 'px; width:' + this.cropW + 'px; position:absolute; left:' + this.posX + 'px; top:' + this.posY + 'px; border:1px dashed black;">' +
            '<div id="zxxDragBg" style="height:100%; background:white; opacity:0.3; filter:alpha(opacity=30); cursor:move"></div>' +
            '<div id="dragLeftTop" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; top:-3px; cursor:nw-resize;"></div>' +
            '<div id="dragLeftBot" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; bottom:-3px; cursor:sw-resize;"></div>' +
            '<div id="dragRightTop" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; top:-3px; cursor:ne-resize;"></div>' +
            '<div id="dragRightBot" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; bottom:-3px; cursor:se-resize;"></div>' +
            '<div id="dragTopCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; top:-3px; left:50%; margin-left:-3px; cursor:n-resize;"></div>' +
            '<div id="dragBotCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; bottom:-3px; left:50%; margin-left:-3px; cursor:s-resize;"></div>' +
            '<div id="dragRightCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; top:50%; margin-top:-3px; cursor:e-resize;"></div> ' +
            '<div id="dragLeftCenter" style="position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; top:50%; margin-top:-3px; cursor:w-resize;"></div>' +
            '</div>' +
            '<input type="hidden" id="cropPosX" value="' + this.posX / scaleX + '" />' +
            '<input type="hidden" id="cropPosY" value="' + this.posY / scaleY + '" />' +
            '<input type="hidden" id="cropImageWidth" value="' + this.cropW / scaleX + '" />' +
            '<input type="hidden" id="cropImageHeight" value="' + this.cropH / scaleY + '" />';

        oRelDiv.innerHTML = sInnerHtml;

        const ID = function (id) {
            return document.getElementById(id);
        };


        //绑定拖拽
        this.startDrag(ID("zxxDragBg"), ID("zxxCropBox"), "drag");
        //绑定拉伸
        this.startDrag(ID("dragLeftTop"), ID("zxxCropBox"), "nw");
        this.startDrag(ID("dragLeftBot"), ID("zxxCropBox"), "sw");
        this.startDrag(ID("dragRightTop"), ID("zxxCropBox"), "ne");
        this.startDrag(ID("dragRightBot"), ID("zxxCropBox"), "se");
        this.startDrag(ID("dragTopCenter"), ID("zxxCropBox"), "n");
        this.startDrag(ID("dragBotCenter"), ID("zxxCropBox"), "s");
        this.startDrag(ID("dragRightCenter"), ID("zxxCropBox"), "e");
        this.startDrag(ID("dragLeftCenter"), ID("zxxCropBox"), "w");


        //图片不能被选中，目的在于使拖拽顺滑
        ID("myCanvas").onselectstart = function () {
            return false;
        };
        this.canvas.onselectstart = function () {
            return false;
        };
          
    },
    clip() {
    
        // console.log('hshshhs')
        document.removeEventListener('mouseup',this.stopMove,false)
        document.removeEventListener('mousemove',this.startMove,false)
         console.log("clipend......");
        
        var tx = this.canvas.offsetLeft + (this.canvas.width - this.img.width) / 2;  // 裁剪区域左上角点距离浏览器 left
        var ty = this.canvas.offsetTop + (this.canvas.height - this.img.height) / 2; // canvas和浏览器距离 - 图片和canvas之间的距离

        // var x = parseInt(document.getElementById("zxxCropBox").style.left) - tx, // 裁剪区域到画布的x轴
        var x = parseInt(document.getElementById("zxxCropBox").style.left) , // 裁剪区域到画布的x轴
            y = document.getElementById("zxxCropBox").offsetTop, 
            // y = document.getElementById("zxxCropBox").offsetTop + document.getElementById("zxxCropBox").parentNode.offsetTop - ty,
            w = document.getElementById("cropImageWidth").value, // 裁剪区域宽
            h = document.getElementById("cropImageHeight").value;  // 裁剪取域高度



        // this.cropImage(this.img, x, y, parseInt(w), parseInt(h));

        let resCanvas = document.getElementById('resultCanvas')
        let resCtx = resCanvas.getContext('2d')
        // 在画布上定位图像，并规定图像的宽度和高度：context.drawImage(img,x,y,width,height)
        // resCtx.drawImage(this.img,0,0,295,413)
        
        let resWidth = 295, resHeight= 413
        let resImg = new Image()
        resImg.src = this.canvas.toDataURL("image/png")
        // 重新渲染图片
        resImg.onload = () => {
            resCtx.drawImage(resImg, x, y, parseInt(w), parseInt(h), 0, 0, resWidth, resHeight);
            resCtx.drawImage(resImg, x, y, parseInt(w), parseInt(h), resWidth * 1, 0, resWidth, resHeight);
            resCtx.drawImage(resImg, x, y, parseInt(w), parseInt(h), resWidth * 2, 0, resWidth, resHeight);
            this.src = resCanvas.toDataURL("image/png");
            
            let seriers = this.countPhotoNum()
            // 在画布上显示的尺寸
            // this.canvas.width = 600;
            // 相纸长 对应 canvas 长， 相纸宽对应canvas宽
            this.canvas.height =  this.canvas.width * (8.9/12.7)
            let _resWidth = this.canvas.height * (3.5/12.7) 
            let _resHeight = this.canvas.width * (2.5/8.9) 
            console.log('seriers',seriers)
            for(let i = 0; i < seriers[0]; i++) {
                // this.ctx.drawImage(resImg, x, y, parseInt(w), parseInt(h), _resWidth * i, 0, _resWidth, _resHeight);
                for(let j = 0; j < seriers[1] ; j++) {
                this.ctx.drawImage(resImg, x, y, parseInt(w), parseInt(h), _resWidth * i + 10, _resHeight* j + 10, _resWidth, _resHeight);

                }
            }
             this.src = this.canvas.toDataURL("image/png");
            // this.ctx.drawImage(resImg, x, y, parseInt(w), parseInt(h), 0, 0, resWidth, resHeight);
            // this.ctx.drawImage(resImg, x, y, parseInt(w), parseInt(h), resWidth * 1, 0, resWidth, resHeight);
            // this.ctx.drawImage(resImg, x, y, parseInt(w), parseInt(h), resWidth * 2, 0, resWidth, resHeight);
            // 去掉选择框
            let workarea = document.getElementById('workarea')
            let clipBox = document.getElementById('cropContainer')
            workarea.removeChild(clipBox)
        } 
    },
    startDrag(point, target, kind) {
        //获取相关CSS属性方法
        this.point = point;
        this.target = target;
        this.kind = kind;
        let getCss = function (o, key) {  
            return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
        };
        //point是拉伸点，target是被拉伸的目标，其高度及位置会发生改变
        //此处的target与上面拖拽的target是同一目标，故其params.left,params.top可以共用，也必须共用
        //初始化宽高
        this.params.width = getCss(target, "width");
        this.params.height = getCss(target, "height");
        //初始化坐标
        if (getCss(target, "left") !== "auto") {
            this.params.left = getCss(target, "left");
        }
        if (getCss(target, "top") !== "auto") {
            this.params.top = getCss(target, "top");
        }

        //target是移动对象
        // 鼠标按下事件
        point.onmousedown = (event) => {
                //  console.log('按下鼠标')
            this.params.kind = kind;
            this.params.flag = true;
            this.clickFlag = true;
            
            let e = event || window.event; // 兼容ie事件对象
            e.stopPropagation();

            this.params.currentX = e.clientX;
            this.params.currentY = e.clientY;

            //防止IE文字选中，有助于拖拽平滑
            point.onselectstart = function () {  return false; };
               
            // 鼠标移动开始拖拽
            document.addEventListener('mousemove',this.startMove,false)
            // document.onmousemove = (event) =>{
        };


    },
    startMove(event) {
        // console.log('移动鼠标')
        let e = event || window.event;
        e.stopPropagation();
        this.clickFlag = false;
        if (this.params.flag) {
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - this.params.currentX, disY = nowY - this.params.currentY;
            if (this.params.kind === "n") {
                //上拉伸
                //高度增加或减小，位置上下移动
                this.target.style.top = parseInt(this.params.top) + disY + "px";
                this.target.style.height = parseInt(this.params.height) - disY + "px";
            } else if (this.params.kind === "w") {//左拉伸
                this.target.style.left = parseInt(this.params.left) + disX + "px";
                this.target.style.width = parseInt(this.params.width) - disX + "px";
            } else if (this.params.kind === "e") {//右拉伸
                this.target.style.width = parseInt(this.params.width) + disX + "px";
            } else if (this.params.kind === "s") {//下拉伸
                this.target.style.height = parseInt(this.params.height) + disY + "px";
            } else if (this.params.kind === "nw") {//左上拉伸
                this.target.style.left = parseInt(this.params.left) + disX + "px";
                this.target.style.width = parseInt(this.params.width) - disX + "px";
                this.target.style.top = parseInt(this.params.top) + disY + "px";
                this.target.style.height = parseInt(this.params.height) - disY + "px";
            } else if (this.params.kind === "ne") {//右上拉伸
                this.target.style.top = parseInt(this.params.top) + disY + "px";
                this.target.style.height = parseInt(this.params.height) - disY + "px";
                this.target.style.width = parseInt(this.params.width) + disX + "px";
            } else if (this.params.kind === "sw") {//左下拉伸
                this.target.style.left = parseInt(this.params.left) + disX + "px";
                this.target.style.width = parseInt(this.params.width) - disX + "px";
                this.target.style.height = parseInt(this.params.height) + disY + "px";
            } else if (this.params.kind === "se") {//右下拉伸
                this.target.style.width = parseInt(this.params.width) + disX + "px";
                this.target.style.height = parseInt(this.params.height) + disY + "px";
            } else {//移动
                this.target.style.left = parseInt(this.params.left) + disX + "px";
                this.target.style.top = parseInt(this.params.top) + disY + "px";
            }
        }
        // 松开鼠标按钮
        document.addEventListener('mouseup',this.stopMove,false)
        // document.onmouseup = (event)=> {
     },
    stopMove(event) {
        let e = event|| window.event
            e.stopPropagation();
        // console.log('松开鼠标')
        this.params.flag = false;
        let getCss = function (o, key) {  
            return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
        };
        if (getCss(this.target, "left") !== "auto") {
            this.params.left = getCss(this.target, "left");
        }
        if (getCss(this.target, "top") !== "auto") {
            this.params.top = getCss(this.target, "top");
        }
        this.params.width = getCss(this.target, "width");
        this.params.height = getCss(this.target, "height");

        //给隐藏文本框赋值
        this.posX = parseInt(this.target.style.left);
        this.posY = parseInt(this.target.style.top);
        this.cropW = parseInt(this.target.style.width);
        this.cropH = parseInt(this.target.style.height);
        if (this.posX < 0) {
            this.posX = 0;
        }
        if (this.posY < 0) {
            this.posY = 0;
        }
        if ((this.posX + this.cropW) > this.iCurWidth) {
            this.cropW = this.iCurWidth - this.posX;
        }
        if ((this.posY + this.cropH) > this.iCurHeight) {
            this.cropH = this.iCurHeight - this.posY;
        }

        const ID = function (id) {
            return document.getElementById(id);
        };
        //赋值
        ID("cropPosX").value = this.posX;
        ID("cropPosY").value = this.posY;
        ID("cropImageWidth").value = parseInt(ID("zxxCropBox").style.width);
        ID("cropImageHeight").value = parseInt(ID("zxxCropBox").style.height);

    },
    countPhotoNum(paperSize, photoSize, count){
        // paperSize 5寸 8.9cm * 12.7cm,  photoSize 一寸 2.5 * 3.5cm、 两寸 3.5*4.9 (cm)、
        // let count = count || 1
        let paper =[ 12.7,8.9,]
        let photo =[ 2.5, 3.5]
        console.log(parseInt(paper[0]/photo[0]), parseInt(paper[1]/photo[1]),'dfgtrft' )
        return [parseInt(paper[0]/photo[0]), parseInt(paper[1]/photo[1])]
    },
    // 画网格线
    drawGrid(context, color, stepx, stepy) {
        context.save()
        context.fillStyle = 'white';
        console.log(context);
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.lineWidth = 0.5;
        context.strokeStyle = color;
        for (var i = stepx; i < context.canvas.width; i += stepx) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, context.canvas.height);
            context.closePath();
            context.stroke();
        }
        for (var j = stepy; j < context.canvas.height; j += stepy) {
            context.beginPath();
            context.moveTo(0, j);
            context.lineTo(context.canvas.width, j);
            context.closePath();
            context.stroke();
        }
        context.restore();
    },
    showGrid() {
        // 画网格线
        // this.ctx.save()
        this.drawGrid(this.ctx,'#ccc', 20, 20);
        this.ctx.drawImage( this.img, this.canvas.width / 2 - this.img.width / 2, this.canvas.height / 2 -  this.img.height / 2);

    },
    getImage(){

    },
    downLoad() {},
    logo_animate() {
        if (this.count >= this.logos.length) {
            this.count = 0
        }
        this.logos.map(v => {
            v.isActive =false;
            // console.log(this.count)
            this.logos[this.count].isActive = true
        })
        this.count++
    },
  },
  mounted() {
      this.init()
   
    this.timer = window.setInterval( () => {
        this.logo_animate()
    }, 300)
      
  },
  beforeDestroy() {
      window.clearInterval(this.timer)
  },
  watch:{
    
  }
}
</script>

<style lang="less">
.photo-editor {
    position: relative;
    max-width: 1200px;
    min-width: 800px;
    max-height: 900px;
    min-height: 700px;
    cursor: pointer;
    // margin-right: 40px;

    background:#2f2f2c;
    .menu-bar {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
        .menu {
            position: relative;
            display: inline-block;
            padding: 10px 12px;
            .logo span {
                color: #50a456;
                letter-spacing: 4px;
                font-size: 14px;
                transition: color 0.3s ease, opacity 0.3s ease;
                text-shadow: rgba(45, 45, 45, 0.5) 0px 0em 0em, 
                rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em,
                rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em,
                rgb(255, 255, 255) 0px -0.18em 0.18em;
            }
            
            .logo  .logo-active {
                color: rgba(45, 45, 45, 0.5); 
                text-shadow:
                rgba(45, 45, 45, 0.5) 0px 0em 0em, 
                rgba(43, 161, 61, 0.35) 0px -0.06em 0.06em, 
                rgba(43, 161, 61, 0.65) 0px -0.12em 0.12em, 
                // rgb(255, 255, 255) 0px -0.18em 0.18em, 
                rgb(255, 153, 0) 0px -0.24em 0.24em !important;
            }
            input {
                position: absolute;
                opacity: 0;
                top: 0;
                left: 0;
                width: 72px;
                height: 36px;
                filter:alpha(opacity=0);
                z-index: 99;
            }
            &:hover {
                background-color: rgba(255,255,255,0.1)
            }
        }
    }
    #tools_left {
        position: absolute;
        width: 50px;
        top: 36px;
        bottom: 0;
        left: 0;
        background: #2F2F2C;
        z-index: 1;
        .menu {
            color: #fff;
            font-size: 14px;
            height: 27px;
            width: 27px;
            border: solid #2f2f2c 8px;
            border-left-width: 13px;
            margin: 0;
            #clipBtn {
                width: 100%;
                height: 100%;
            }
        }
    }
    #tools_right {
        position: absolute;
        width: 160px;
        height: 100%;
        background: #2f2f2c;
        right: 0;
        top: 0px;
        border-bottom: none;
        overflow: visible;
        padding: 0 0 0 15px;
    }
    #tools_bottom {
        position: absolute;
        left: 50px;
        right: 0;
        bottom: 0;
        height: 40px;
        overflow: visible;
        background: #2f2f2c;
        .menu {
            display: inline-block;
            color: #fff;
            font-size: 16px;
            span {
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: #000;
            }
        }
    }
    .workarea {
        position: absolute;
        top: 36px;
        left: 50px;
        bottom: 40px;
        right: 175px;
        background-color: #444;
        // overflow: auto;
        // text-align: center;
        #myCanvas {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin:auto;
            z-index: 1;
            background-color: white;
        }
        .canvas-bg {
            width: 600px;
            height: 500px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
        }
    }
}
</style>
