<template>
<div>
    <Header />
    <div class="problem-content">
        
        <div class="all-list">
            <p class="after-icon" @click="toproblem">常见问题<img src="../../assets/img/icon/double-right.png" alt=""></p>
            <p>什么是货币？</p>
            <p>网页打不开？</p>
            <p>备用网址是什么？</p>
            <p>交易所信心保证是什么？</p>
            <p>实名认证怎么认证？</p>
            <p>充币不到账怎么办？</p>
            <p>充币不到账怎么办？</p>
            <p>充币不到账怎么办？</p>
        </div>
        <div class="pic-group">
            <img src="../../assets/img/other/zxkf.png" alt="">
            <!-- <img src="../../assets/img/other/yjfk.png" alt=""> -->
        </div>
    </div>
</div>
    
</template>

<script>
import Header from '@/components/common/header'
export default {
    name: 'Problem',
    components: {
        Header
    },
    data() {
        return {
            active: 1
        }
    },
    methods: {
        toproblem(){
            this.$router.push("/problem")
        }
    },
}
</script>

<style scoped lang="less">
.problem-content {
    margin: 30px auto;
    width: 710px;
    .all-list {
        text-align: left;
        box-shadow: 0 0 20px .3rem #eee;
        border-radius: 8px;
        padding: 20px;
        & > p {
            border-bottom: 2px solid @border-color;
            height: 40px;
            line-height: 40px;
            padding: 20px;
            font-size: 28px;
        }
        .after-icon {
            color: rgb(255,149,1);
            font-size: 32px;
            img {
                width: 26px;
                height: 26px;
                padding-left: 10px;
            }
        }
    }
    .pic-group {
        width: 646px;
        margin: 90px auto 0;
    }
}
</style>
