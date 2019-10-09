<template>
    <div>
        <!-- <div id="mysubway" :style="conheight" ></div>
        <div class="melody"><Icon type="md-add" @click="plus" size="50"/><Icon type="md-remove" @click="minus" size="50"/></div>
        <div></div> -->
    </div>
</template>

<script>
// import loadJs from './load.js'
export default {
    data(){
        return{
            // conheight:{height:''}, 
            // mySubway: null,
            // scale: 1
        }
    },
    created(){
        // let that = this;
        // window.cbk = function(){
        //     var mySubway = subway("mysubway", {
        //         adcode: 1101,
        //         theme: "normal", //colorful
        //         client: 0,
        //         zoom: 10,
        //         doubleclick: {
        //             switch: true
        //         }
        //     });
        //     that.mySubway = mySubway;
        //     //地铁加载完成，执行complete事件
        //     mySubway.event.on("subway.complete", function(ev, info) {
        //         var id = info.id;
        //         mySubway.addCustomNode('南锣鼓巷', {
        //             type: "circle",
        //             r: 14,
        //             customClass: "custom_circle"
        //         })
        //     });

        //     //点击站点，显示此站点的信息窗体
        //     mySubway.event.on("station.touch", function(ev, info) {
        //         console.log(info)
        //     });

        //     mySubway.event.on("lineName.touch", function(ev, info) {
        //         mySubway.showLine(info.id);
        //         var select_obj = qs('#g-select');
        //         mySubway.setFitView(select_obj);
        //         var center = mySubway.getSelectedLineCenter();
        //         mySubway.setCenter(center);
        //     });

        //     //点击空白, 关闭infowindow
        //     mySubway.event.on("subway.touch", function() {
        //         mySubway.clearInfoWindow();
        //     });

        //     mySubway.event.on("subway.zoom", function(ev, info) {
        //         console.log(info)
        //         var id = info.id;
        //     });
        // };

        // window.addEventListener('resize', this.getHeight);
        // this.getHeight()
    },
    methods:{
        // getHeight(){
        //   this.conheight.height=window.innerHeight-180+'px';
        // },
        plus(){
            // if(this.scale < 1.3){
            //     this.scale = this.scale + 0.1;
            //     this.mySubway.scale(this.scale)
            // }
        },
        minus(){
            // if(this.scale > 0.3){
            //     this.scale = this.scale - 0.1;
            //     this.mySubway.scale(this.scale)
            // }
        }        
    },
    mounted(){
        // 高德地图api
        // loadJs('https://webapi.amap.com/subway?v=1.0&key=4bffd72c66f25b3d49991395113beca7&callback=cbk')
        // loadJs('/src/Pages/subway.js')
    }
}
</script>

<style>
    .custom_circle {
        margin:150px auto;
        width:30px;
        height:30px;
        fill:red;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,.7) inset;
        animation-name:'ripple';
        
        -webkit-animation-name:'ripple';
        animation-duration: 0.6s;
        -webkit-animation-duration: 0.6s;
        animation-timing-function: ease;
        -webkit-animation-timing-function: ease; 
        animation-delay: 2s;
        -webkit-animation-delay: 2s;
        animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        animation-direction: alternate;
        -webkit-animation-direction: alternate;
        }

        @keyframes ripple {
        0% {
        opacity:0.65;
        width:20px;
        height:20px;
        }
        100% {
        opacity: 0.2;
        width:10px;
        height:10px;
        }
    }
    @-webkit-keyframes ripple {
        0% {
        opacity:0.65;
        width:20px;
        height:20px;
        }
        100% {
        opacity: 0.2;
        width:10px;
        height:10px;
        }
    }
    .custom_circle1{
        fill: blueviolet
    }
    .melody{
        width:50px;
        height:100px;
        border: 1px solid #bdbaba;
        background-color:#e6e3e3;
        position: fixed;
        right: 30px;
        bottom: 50px;
        z-index: 1000
    }
    .melody Icon{cursor: pointer;}
</style>

  


