<template>
    <div>
        <div></div>{{}}
        <month 
            @submitSelectValue='selectedDateChange' 
            @submitUnSelectValue='UnSelectedDateChange' 
            :selectDate='selectDateValue' 
            style="width: 250px;"
            :UnselectDate='UnSelectDateValue' v-model="calendar1">
        </month>
    </div>
</template>

<script>
import month from '../components/month-calendar/month.vue'
export default {
    components:{month},
    data () {
        return{
            calendar1: null, //选中的值
            UnSelectCal: null, //未选中的值
            selectDateValue:{},
            UnSelectDateValue:{},
        }
    },
    methods:{
        //父组件接收 子组件传回的值
        // 第1组日历
        selectedDateChange(select){ //选中的值
            console.log("select:",select);
            let obj = {};
            let days = [];
            let y ,m ;
            if(select.length>0){
                select.map(v => {
                    y = v[0];
                    m = v[1];
                days.push(v[2])
                })
                obj[y+ '-' + m] = days.join(',')
            }
            console.log('json选中的值',obj)
            this.calendar1 = select;
            // this.selectDateValue = select;
        },
        UnSelectedDateChange(UnSelect){ //未选中的值
            console.log("UnSelect:",UnSelect);
            this.UnSelectCal = UnSelect;
        },
    },
    created(){
    },
    mounted(){
    }
}
</script>

<style>

</style>