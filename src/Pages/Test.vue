<template>
  <div id="classGroup">
      <!--分区类别分组(分区组)-->
        <Modal v-model="group_Modal" :mask-closable="false" draggable scrollable width="900" height="660" title="分区类别分组">
            <Form ref="formAddData" :model="formAddData" label-position="right" :label-width="130">
                <div class="group_item" v-for="(items,key) in historyDataList" :key="key">
                    <div class="titles">
                        <span> {{items.areaName}}: </span>
                    </div>
                    <div style="padding:10px;">
                        <Checkbox
                            :indeterminate="items.indeterminate"
                            :value="items.checkAll"
                            @on-change="handleCheckAll($event,items,key)"
                            >全选</Checkbox>
                    </div>
                    <CheckboxGroup v-model="saveGroupList" :value="items.checked" @on-change="checkAllGroupChange($event, key)">
                        <Checkbox v-for="(areaItem,index) in items.list" :key="index" :label="areaItem.areaId">{{areaItem.areaName}}</Checkbox>
                    </CheckboxGroup>           
                </div>
            </Form>

            <!-- 保存--取消按钮  -->
            <div slot="footer">
                <Row :gutter="24" type="flex" justify="end">
                    <Col span="3"> 
                        <i-button type="primary" size="large" long v-on:click="submitAdd_areaGroup()">保存</i-button>
                    </Col>
                    <Col span="3"> 
                        <Button size="large" long @click="cancelAdd_areaGroup()">取消</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
  </div>
</template>

<script>
import tabData from "./groupData.json"
export default {
    props:['historyData'],
    data(){
        return{
            historyDataList:[], // 页面展示的数据
            currentAreaIndex: null,
            //新增初始化变量
            formAddData: {},
            group_Modal: true,
            saveGroupList: [], //选中后保存的数组list
            //接口保存用的变量
            saveList:{
                areaIds:[],
                groupId: "",
            },
        }
    },
    methods:{
        //全选按钮
        handleCheckAll ($event,items,index) {
          let currentIds = items.list.map(v =>  v.areaId)
          if ($event) {
              this.historyDataList[index].checkAll = true;
              this.historyDataList[index].indeterminate = false;
              this.historyDataList[index].checked = currentIds;
              this.saveGroupList = this.saveGroupList.concat(this.historyDataList[index].checked)
              
          } else {
              this.historyDataList[index].checkAll = false;
              this.historyDataList[index].indeterminate = false;
              this.historyDataList[index].checked = [];
              currentIds.map(v => {
                this.saveGroupList.splice(this.saveGroupList.indexOf(v), 1)
              })
          }
          // 去重 
          this.saveGroupList = Array.from(new Set(this.saveGroupList))
            console.log("items:",this.saveGroupList, $event,items,index,this.historyDataList)

           

          
        },
        //chexked 按钮
        checkAllGroupChange (data,index) {
          this.saveGroupList = data
          // data 的值包含上次选中的其它区域id ,需要过滤掉其他区域的id
          let allListId =  this.historyDataList[index].list.map(v => v.areaId)
          let checkedIds = data.filter(v =>allListId.indexOf(v) > -1)
          console.log(checkedIds, this.saveGroupList)
            this.historyDataList[index].checked = checkedIds

            if (checkedIds.length == 0) {
              console.log('全不选')
              this.historyDataList[index].checkAll = false;
              this.historyDataList[index].indeterminate = false;
            } else
            if (0 < checkedIds.length < this.historyDataList[index].list.length){
              console.log('不全选')
              this.historyDataList[index].checkAll = false;
              this.historyDataList[index].indeterminate = true;
            } 
            
            if(checkedIds.length === this.historyDataList[index].list.length) {
              // 此刻全部选中
              console.log('全选')
              this.historyDataList[index].checkAll = true;
              this.historyDataList[index].indeterminate = false;
            } 
            console.log("checkAllGroupChange:",data,index,this.historyDataList)
           
        },

        //保存按钮
        submitAdd_areaGroup(){

            // if(this.saveGroupList){
            //     this.saveList.areaIds = this.saveGroupList;
            //     this.saveList.groupId =  this.historyData.groupId;
            // }else{
            //    this.saveList = {}; 
            // }
            // this.$axios({
            //     method: 'post',
            //     data: this.saveList,
            //     params:{
            //         userId: this.$store.state.user.userId,
            //         userName: this.$store.state.user.userName, 
            //     },
            //     headers: {'Content-Type': 'application/json'},
            //     url: this.baseURL + '/area/areaGroupDetails/insertGroupDetailsList',
            // })
            // .then((res)=> {
            //     if(res.status == "200"){
            //         if (res.data.code === "0") {
            //             this.$Message.success('您已成功增加一条分区组数据！');
            //         }else {
            //             alert(res.data.msg)
            //         }
            //     }
            // }).catch((error)=> { console.log(error)})
        },
        //取消按钮
        cancelAdd_areaGroup(){

        },
        //车站下的分区list按分区类型分组
        get_arealist(){
            // this.$axios({
            //     method: 'get',
            //     url: this.baseURL + '/area/areaGroup/areaList', 
            //     params: {
            //         stationId: "0101",
            //         userId: this.$store.state.user.userId,
            //         userName: this.$store.state.user.userName,
            //     }
            // })
            // .then((res)=> {
            //     console.log("车站下的分区list按分区类型分组：",res.data.result);
            //     if(res.status == "200"){
            //         if (res.data.code === "0") {

            //             res.data.result.map(v=>{
            //                 // v.indeterminate = true;
            //                 v.checkAll = false;
            //             })
            //            this.historyDataList = res.data.result;
            //            console.log("this.historyDataList:",this.historyDataList)
            //         }else {
            //             alert(res.data.msg)
            //         }
            //     }

            // }).catch((error) =>{})

        }
    },
    mounted(){
// A984N0NqbwoX8XMXl1h5qdD6m0uH525u
    },
    created(){
        this.get_arealist();
        this.historyDataList = tabData; 
        this.historyDataList.map(v => {
          v.checkAll = false;
          v.indeterminate = false;
          v.checked = []
        })
    },
    watch:{
        historyData:function(val){
            this.formAddData = val;
            console.log("分区组：",this.historyData.stationId,this.historyData.groupId)
        },
    }
}
</script>

<style type="text/css">
    /* 无遮罩层，拖拽功能不让点其他区域样式 */
    .ivu-modal-no-mask {pointer-events: auto !important;}
    .group_item{
        border: 1px solid #e9e9e9;
        margin-bottom: 20px;
    }
    .group_item .titles{
        border-bottom: 1px solid #e9e9e9;
        padding:10px;
        font-size: 18px;
        font-weight: bold;
    }
    .ivu-checkbox-group {
        display: inline-block;
        font-size: 14px;
        padding: 10px;
    }
</style>