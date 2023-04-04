<template>
    <div>
<!-- 三级联动 -->
<typeNav></typeNav>
<listContainer></listContainer>
<recommend></recommend>
<rank></rank>
<like></like>
<floor v-for="(item,index) in floorList" :key="item.id" :floorList="item"></floor>
<brand></brand>
    </div>
</template>
<script>
import rank from "./rank/index.vue"
import like from "./like/like.vue"
import floor from "./floor/index.vue"
import brand from "./brand/index.vue"
import listContainer from "./listContainer/index.vue"
import recommend from "./recommend/index.vue"
import { mapState } from 'vuex';
export default{
    components:{
        listContainer,
        recommend,
        rank,
        like,
        floor,
        brand
    },
    name:"Home",
    data(){
        return {

        }
    },
    methods:{},
    computed:{
        ...mapState({
            floorList(state){
                return state.home.floorList
            } 
        })
    }
}

</script>
<style>


</style>