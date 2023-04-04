<template>
    <div class="pagination">   
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
      <button v-if="startAndEndNum.start>=2" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
   
      <button v-if="startAndEndNum.start>2">···</button>
  
      <button v-for="(item,index) in startAndEndNum.end" :key="index" v-if="item>=startAndEndNum.start"
       @click="$emit('getPageNo',item)" :class="{active:pageNo==item}">{{item}}</button>
    
      
      <button v-if="startAndEndNum.end<totalPages-1">···</button>
      <button v-if="startAndEndNum.end<totalPages" @click="$emit('getPageNo',totalPages)" :class="{active:pageNo==totalPages}">{{totalPages}}</button>
      <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo==totalPages">下一页</button>
      <button style="margin-left: 30px">共 60 条</button>
   
    </div>
  </template>
<script>
export default{
    name:"pagination",
    props:['pageNo','pageSize','total','continues'],
    data(){
        return {

        }
    },
    computed:{
      totalPages(){
        const {total,pageSize}=this
        
        return Math.ceil(total/pageSize) 
      },
      startAndEndNum(){
        let start=1,end=1
        const {continues,totalPages,pageNo}=this
        if(continues>totalPages)//连续的页码数大于总页数的情况
        {
          start=1;
          end=totalPages
        }else{// 连续的页码数小于总页数的情况
          start=pageNo-parseInt(continues/2) 
          end=pageNo+parseInt(continues/2) 
          if(start<=0)
          {
            start=1
            end=continues
          }
          if(end>totalPages)
          {
            end=totalPages
            start=totalPages-continues+1
          }
        }
        return {start,end}
      }
        
      
    },
    methods:{

    }
}

</script>
<style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>