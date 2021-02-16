<template>
    <div class="problem-content">
        <Header />
        <van-tabs v-model="active">
            <van-tab title="全部">
                <div class="all-list">
                    <p class="after-icon" @click="goproblemdetail(netname)">关于网站<img src="../../assets/img/icon/double-right.png" alt=""></p>
                    <p>网页打不开？</p>
                    <p>备用网址是什么？</p>
                    <p class="after-icon" @click="goproblemdetail(safename)">关于安全<img src="../../assets/img/icon/double-right.png" alt=""></p>
                    <p>交易所信心保证</p>
                    <p>实名认证</p>
                    <p class="after-icon" @click="goproblemdetail(othername)">关于其他<img src="../../assets/img/icon/double-right.png" alt=""></p>
                    <p>充值不到账</p>
                    <p>提币与卖出的区别</p>
                    <p>提币与卖出的区别</p>
                </div>
                <img class="zxkf-pic" src="../../assets/img/other/zxkf.png" alt="">
            </van-tab>
            <van-tab title="网站">
                <div class="all-list">
                <p class="after-icon" @click="goproblemdetail(netname)">关于网站<img src="../../assets/img/icon/double-right.png" alt=""></p>
                    <p>网页打不开？</p>
                    <p>备用网址是什么？</p>
                </div>
            </van-tab>
            <van-tab title="安全">
                <div class="all-list">
                <p class="after-icon" @click="goproblemdetail(safename)">关于安全<img src="../../assets/img/icon/double-right.png" alt=""></p>
                    <p>交易所信心保证</p>
                    <p>实名认证</p>
                </div>
            </van-tab>
            <van-tab title="其他">
                <div class="all-list">
                <p class="after-icon" @click="goproblemdetail(othername)">关于其他<img src="../../assets/img/icon/double-right.png" alt=""></p>
                    <p>充值不到账</p>
                    <p>提币与卖出的区别</p>
                    <p>提币与卖出的区别</p>
                </div>
            </van-tab>
        </van-tabs>
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
            active: 1,
            netname:"关于网站",
            safename:"关于安全",
            othername:"关于其他"
        }
    },
    methods: {
        goproblemdetail(name){
            this.$router.push({ name: "problemdetail", params: { name: name } });
        }
    },
}
</script>

<style scoped lang="less">
.problem-content {
    width: 100%;
    .van-tabs {
        width: 710px;
        margin: 30px auto;
        ::v-deep .van-tabs__wrap {
            height: 102px;
            .van-tab__text--ellipsis {
                line-height: 102px;
                font-size: 32px;
                color: #333;
            }
            .van-tabs__line {
                bottom: 30px;
                background-color: rgb(255,201,76);
                height: 4px;
            }
            .van-tab--active {
                .van-tab__text--ellipsis {
                    color: rgb(255,201,76);
                }
            }
        }
    }
    .all-list {
        text-align: left;
        padding: 0 20px 20px;
        box-shadow: 0 0 20px .3rem #eee;
        border-radius: 8px;
        & > p {
            border-top: 2px solid rgb(216,216,216);
            height: 40px;
            line-height: 40px;
            padding: 20px;
            &:last-child {
                border-bottom: 2px solid rgb(216,216,216);
            }
        }
        .after-icon {
            color: rgb(255,149,1);
            img {
                width: 26px;
                height: 26px;
                padding-left: 10px;
            }
        }
    }
    .zxkf-pic {
        width: 660px;
        height: auto;
        margin: 50px auto;
    }
}
</style>
