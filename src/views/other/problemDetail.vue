<template>
<div>
    <Header />
    <div class="problem-detail-content">
        <article>
            <h1>网页打不开？</h1>
            <div>
                <p>1.服务器软件</p>
                <p>软件多少、稳定和软件的正确配置，都会影响到服务器环境，
                    以致影响到网络速度。服务器安装软件防火墙，会牺牲一些网络速度，所以VPS、
                    或独立服务器用户装一个防火墙足矣。
                </p>
                <p>2.机器的配置</p>
                <p>包括空服务器端与客户机端的硬件配置程度，同样的网络环境下，双核的服务器运算能力肯定要强一些</p>
            </div>
        </article>
        <article>
            <h1>充值不到帐怎么办呢？</h1>
            <div>
                <p>充值不到账问题描述:请你务必审慎阅读、充分理解协议中相关条款内容，特别是粗体标注的内容。你一旦注册xx，即视为你已了解并完全同意本协议各项内容，包括xx对使用协议随时所做的任何修改。</p>

            </div>
        </article>
        <article>
            <h1>充值不到帐怎么办呢？</h1>
            <div>
                <p>充值不到账问题描述:请你务必审慎阅读、充分理解协议中相关条款内容，特别是粗体标注的内容。你一旦注册xx，即视为你已了解并完全同意本协议各项内容，包括xx对使用协议随时所做的任何修改。</p>
            </div>
        </article>
        <!-- <div class="btn-group">
            <img src="../../assets/img/other/mjj.png" alt="">
            <img src="../../assets/img/other/ybz.png" alt="">
        </div> -->
    </div>
</div>
    
</template>

<script>
import Header from '@/components/common/header'
export default {
    name: 'ProblemDetail',
    components: {
        Header
    },
    data() {
        return {
            active: 1
        }
    },
    methods: {
    },
    created(){
        console.log(this.$route.meta.title = this.$route.params.name);
    }
}
</script>

<style scoped lang="less">
.problem-detail-content {
    margin: 40px auto;
    width: 710px;
    font-size: 26px;
    text-align: left;
    article {
        border-bottom: 2px solid @border-color;
        padding-bottom: 30px;
        margin-bottom: 30px;
        color: rgb(102,102,102);
        h1 {
            color: rgb(255,149,1);
            font-size: 32px;
        }
        p {
            color: rgb(51,51,51);
            font-size: 28px;
            margin-top: 10px;
        }
        span {
            font-size: 24px;
        }
    }
    .btn-group {
        display: flex;
        justify-content: space-around;
        margin-top: 140px;
        img {
            width: 318px;
        }
    }
}
</style>
