<template>
<!--          -->
<div>
    <el-pagination
        style="margin-top:20px;text-align:center;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="3"
        :page-sizes="[3,5,10]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="33">
    </el-pagination>
</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>