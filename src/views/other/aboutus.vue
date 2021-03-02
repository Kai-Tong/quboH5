<template>
    <div class="about-content">
        <Header />
        <img class="logo" src="../../assets/img/other/logo.png" alt="">
        <div class="info">
            <p>趣博电竞旨在打造电竞领域的精英文化圈，涵盖英雄联盟 LOL云顶之弈自走棋、DOTA2、王者荣耀、绝地求生、CS:GO、刀塔霸业、和平精英、主机游戏 等多款热门游戏。</p>
            <p>新增英雄联盟lol自走棋「云顶之弈」板块；英雄介绍、棋盘模拟、装备合成、英雄装备梯度不用切屏自由玩。新增「刀塔霸业」板块，最新资讯、装备详解全掌握。新增英雄联盟、DOTA2战绩查询、位置分布、队友对手战绩、对位数据对比、出装加点查询；查询英雄联盟、Dota2知名玩家战绩，多达数百个全球知名玩家认证。</p>
        </div>
        <div class="pic-group">
            <img src="../../assets/img/other/yhxy.png" alt="" @click="goAgreement">
            <!-- <img src="../../assets/img/other/gghp.png" alt="" @click="appDownload"> -->
        </div>
    </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
    name: 'Aboutus',
    components: {
        Header
    },
    data() {
        return {
            active: 1
        }
    },
    methods: {
        goAgreement(){
            this.$router.push('./agreement')
        },
        //唤起失败打开应用商店
        failed(){
            window.location = '应用商店的scheme '
        },
        transfer() {
            window.location.href = '自家产品的scheme,需要与客户端同事定义'
            const initialTime = new Date();
            let counter = 0;
            let waitTime = 0;
            const checkOpen = setInterval(() => {
                counter++;
                waitTime = new Date() - initialTime;
                if (waitTime > 5000) {
                    clearInterval(checkOpen);
                    this.failed();
                }
                if (counter < 1000) { return; }
                const hide = document.hidden || document.webkitHidden;
                if (!hide) {
                    this.failed(); // 唤端失败的回调函数
                }
            }, 20);
            document.addEventListener('visibilitychange', () => {
                const isHidden = document.hidden;
                if (isHidden) {
                    clearInterval(checkOpen);
                }
            });
        },
        appDownload(){
            if (/iPhone OS 9|iPhone OS 10/i.test(ua)) {
                window.location.href = '这里是你和 NA 小伙伴商量好的协议';
                return;
            }else{               
	            this.transfer()
            }
        },
        // if(iOS9) {
        //     window.location.href = ${universalLink};
        // }
        // else {
        //     var ifr = document.createElement('iframe');
        //     ifr.src = ${scheme};
        //     ifr.style.display = 'none';
        //     document.body.appendChild(ifr);
        //     window.setTimeout(function () {
        //     document.body.removeChild(ifr);
        //     }, 300);
        // }

        // 举个栗子：
        // ${universalLink} = 'http://myapp.com'
        // ${scheme} = 'myapp://index'

        // var u = navigator.userAgent;
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // //这个是安卓操作系统
        // if (isAndroid) {
        //     //安卓app的scheme协议
        //     window.location.href = 'XXX';
        //     setTimeout(function(){
        //         let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden ||window.document.webkitHidden 
        //         if(typeof hidden =="undefined" || hidden ==false){
        //             //应用宝下载地址
        //             window.location.href ="XXX";
        //         }
        //     }, 2500);
        // }
        // //这个是ios操作系统
        // if (isIOS) {
        //     //ios的scheme协议
        //     window.location.href = 'zjmobile://platformapi/startapp';
        //     setTimeout(function(){
        //         let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden ||window.document.webkitHidden 
        //         if(typeof hidden =="undefined" || hidden ==false){
        //             //App store下载地址
        //             window.location.href =
        //             "https://itunes.apple.com/us/app/zhe-jiang-yi-dong-shou-ji/id898243566#weixin.qq.com";
        //         }
        //     }, 2500);
        //     return false;
        // }
    },
}
</script>

<style scoped lang="less">
.about-content {
    width: 100%;
    .logo {
        width: 140px;
        height: 140px;
        margin-top: 54px;
        margin: auto;
        display: block;
    }
    .info {
        padding: 30px;
        text-align: left;
        p {
            margin-bottom: 30px;
            color: rgb(51,51,51);
            font-size: 28px;
            font-weight: bold;
        }
    }
    .pic-group {
        width: 646px;
        margin: 200px auto 0;
    }
}
</style>
