<template>
    <div class="edit-box">
        <el-input v-model="name"><template slot="prepend">工作任务:</template></el-input>
        <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">开始时间:</div>
            <el-input-number v-model="startTime" :min="0" controls-position="right"></el-input-number>
        </div>
        <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期:</div>
            <el-input-number v-model="days" :min="1" controls-position="right"></el-input-number>
        </div>
        <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">注意事项:</div>
            <el-input type="textarea" rows="2" resize="none" v-model="notes" ></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VueNumControl",
        props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
        data() {
            return {
                name: '',
                startTime: 0,
                days: 0,
                notes: '',
            }
        },
        methods: {
        }
    }
</script>

<style>
    .edit-box {
        width: 281px;
    }
    .edit-box .el-input-group {
    }
    .edit-box .el-input-group__prepend {
        border-radius: 0px !important;
    }
    .edit-box .el-textarea__inner {
        border-radius: 0px !important;
    }
    .edit-box .el-input__inner{
        border-radius: 0px !important;
    }
</style>
