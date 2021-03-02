<template>
    <div class="header-content">
        <van-nav-bar :style="{'background': $route.meta.headerBg}" :title="$route.meta.title" left-arrow right-arrow>
            <template #left>
                <van-icon name="back" class="back-icon" @click="goBack($route.meta.back)" />
            </template>
            <template #right>
                <van-icon v-if="$route.meta.isRightIcon" class="share-icon" />
            </template>
        </van-nav-bar>
    </div>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
        }
    },
    methods: {
        goBack (v) {
            if (v) {
                if(v == 'forum'){
                    window.location.href = "http://m.qubodianjing.com/forum"
                }else{
                    this.$router.push({ name: v })
                }
            } else {
                history.back(-1)
            }
        }
    },
}
</script>

<style scoped lang="less">
.header-content {
    width: 100%;
    .van-nav-bar {
        height: 88px;
        background: rgb(80,80,80);
        line-height: 88px;
        ::v-deep .van-nav-bar__content {
            width: 100%;
            height: 100%;
            .van-nav-bar__title {
                color: #fff;
                font-size: 36px;
            }
            .van-nav-bar__left {
                padding-left: 30px;
            }
        }
        .back-icon {
            width: 35px;
            height: 35px;
            background: url('../../assets/img/icon/back.png') no-repeat center center;
            background-size: 100%;
        }
        .share-icon {
            width: 35px;
            height: 35px;
            background: url('../../assets/img/icon/zh@2x.png') no-repeat center center;
            background-size: 100%;
            margin-right: 20px;
        }
    }
}
</style>
