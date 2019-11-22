<!--  -->
<template>
    
       <svg width="65px" height="65px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M-2 40 L80 40" stroke-dasharray="4,4" stroke-width="1" stroke="#666" fill-opacity="0"/>
        <path d="M40 -2 L40 80" stroke-dasharray="4,4" stroke-width="1" stroke="#666" fill-opacity="0"/>
        <path d="M1 1 l78 0 l0 78 l-78 0 Z" stroke-width="2" stroke="#111" fill-opacity="0"/>
        <text id="url1"  fill="#111" transform="translate(11, 63)" font-family="'KaiTi','楷体_gb2312',楷体" font-size="3.625rem" ><slot name="svgtext">乡</slot></text>
        
    </svg>

</template>

<script>
export default {
  
   data () {
       return {

       };
   }

};
</script>
<style scoped lang="scss">

</style>