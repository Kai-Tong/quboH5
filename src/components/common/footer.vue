<template>
    <div class="footer-content">
        <van-tabbar v-model="active">
            <van-tabbar-item
                v-for="(item, index) in tabLists"
                :key="index"
            >
                <!-- <span>{{ item.txt }}</span> -->
                <template #icon="props">
                    <img :src="props.active ? item.imgActive : item.img" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

export default {
    name: 'Footer',
    data() {
        return {
            active: 0,
            tabLists: [{
                txt: '赛事',
                img: require('../../assets/img/common/ss1@2x.png'),
                imgActive: require('../../assets/img/common/ss2@2x.png')
            }, {
                txt: '资讯',
                img: require('../../assets/img/common/news1@2x.png'),
                imgActive: require('../../assets/img/common/news2@2x.png')
            }, {
                txt: '首页',
                img: require('../../assets/img/common/home1@2x.png'),
                imgActive: require('../../assets/img/common/home2@2x.png')
            }, {
                txt: '论坛',
                img: require('../../assets/img/common/lt1@2x.png'),
                imgActive: require('../../assets/img/common/lt2@2x.png')
            }, {
                txt: '我的',
                img: require('../../assets/img/common/mine1@2x.png'),
                imgActive: require('../../assets/img/common/mine2@2x.png')
            }],
        }
    },
    methods: {
        goBack (v) {
            if (v) {
                this.$router.push({ name: v })
            } else {
                history.back(-1)
            }
        }
    },
}
</script>

<style scoped lang="less">
.footer-content {
    width: 100%;
    .van-tabbar {
        height: 128px;
        background: url('../../assets/img/common/footer-bg@2x.png') no-repeat top left;
        background-size: 100%;
        ::v-deep .van-tabbar-item__icon {
            margin-top: 20px;
            img {
                width: 52px;
                height: 76px;
            }
        }
        .van-tabbar-item {
            &:nth-child(3) {
                ::v-deep .van-tabbar-item__icon {
                    margin-top: 10px;
                    img {
                        width: 74px;
                        height: 92px;
                    }
                }
            }
        }
        .van-tabbar-item--active {
            color: rgb(255,208,128);
            background-color: transparent;
        }
    }
    .van-hairline--top-bottom::after {
        border: 0;
    }
}
</style>
