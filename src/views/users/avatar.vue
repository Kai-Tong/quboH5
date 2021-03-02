<template>
    <div class="avatar-page">
        <a class="go-back" @click="goTo('Safe')">
            <img src="../../assets/img/icon/back.png" alt="">
        </a>
        <div class="bg-pic">
            <div class="avatar">
                <img :src="userpic || current" alt="">
            </div>
        </div>

        <p class="user-name">用户名:{{user_name}}</p>
        <span class="current-avatar">当前头像</span>
        <span class="blue-line"></span>

        <div class="query-avatar">
            <p>
                <span>上传头像：</span>
                <span class="font-gray">
                    <!-- 清空历史 -->
                    <!-- <img class="del-icon" src="../../assets/img/icon/del.png" alt=""> -->
                </span>
            </p>
            <div>
                <span
                    class="avatared"
                    v-for="(item, key) in fileList"
                    :key="key"
                    @click="current=item.userPic;currentIndex=key"
                ><img :src="item.userPic" alt=""></span>
                <van-uploader accept="image/*" :max-count="1" :after-read="afterRead" :beforeRead="beforeRead" />
            </div>
        </div>
        <!-- <van-button @click="submitHandle" type="primary">提  交</van-button> -->

        <!-- 打开相机 -->
        <input type="file" style="display:none" ref="camera" accept="image/*" capture="camera" />

        <!-- 打开相册 -->
        <input class="value" style="display:none" type="file" ref="file" accept="image/*" multiple="multiple" @change="change($event)" />
    </div>
</template>

<script>

export default {
    name: 'Avatar',
    data() {
        return {
            fileList: [],
            current:"https://img01.yzcdn.cn/vant/tree.jpg",
            userpic:localStorage.getItem("user_pic"),
            user_name:localStorage.getItem("user_name"),
            actions: [{
                name: '拍照',
                method : this.openCamera
            }, {
                name: '从相册中选择',
                method : this.getCamera
            }],
            token:localStorage.getItem("h5token"),
            uploadImages:[],
        }
    },
    mounted() {
    },
    methods: {
        goTo(v){
            this.$router.push("/mine")
        },
        beforeRead(file){
            // const isLt10M = file.size / 1024 / 1024  < 1;
            // if (!isLt10M) {
            // this.$toast('上传图片大小不能超过1MB哦!');
            // return false;
            // }
            return true;
        },
        //将base64转换为文件
        dataURLtoFile(dataurl,file) {
            var arr = dataurl.split(','),
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], file.name, {
                type: file.type
            })
        },
        afterRead(file){
            console.log(file);
            let selectFile = file;
            var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
            if(file.file.size  / 1024 / 1024 > 2){  //大于2M的图片压缩

                let canvas = document.createElement('canvas') // 创建Canvas对象(画布)
                let context = canvas.getContext('2d')
                let img = new Image()
                img.src = file.content // 指定图片的DataURL(图片的base64编码数据)
                // console.log(img.src)
                img.onload = () =>{ //固定宽高
                    canvas.width = 400 
                    canvas.height = 300
                    context.drawImage(img, 0, 0, 400, 300)
                    file.content = canvas.toDataURL(file.file.type, 0.92) // 0.92为默认压缩质量
                    let files = this.dataURLtoFile(file.content, file.file.name)
                    formData.append('file[]', files);
                    console.log(files);
                    // this.imagePath.push(files)
                    alert(files.size)
                    this.$axios({
                        url:this.$api.uploadActionUrl,
                        method:'post',
                        data:formData,
                        headers: {
                            'content-type': 'multipart/form-data',
                            'token' :this.token
                        },
                        timeout:3000
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 1) {

                        } else if (res.data.code == 0) {
                            this.userpic = res.data.params.user_pic;
                            localStorage.setItem("user_pic", res.data.params.user_pic);
                        } else if (res.data.code == -1) {
                            window.location.href = this.JuheHOST
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            }else{
                console.log(file);
                formData.append('file[]', file.file);
                this.$axios({
                    url:this.$api.uploadActionUrl,
                    method:'post',
                    data:formData,
                    headers: {
                        'content-type': 'multipart/form-data',
                        'token' :this.token
                    },
                    timeout:3000
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 1) {

                    } else if (res.data.code == 0) {
                        this.userpic = res.data.params.user_pic;
                        localStorage.setItem("user_pic", res.data.params.user_pic);
                    } else if (res.data.code == -1) {
                        window.location.href = this.JuheHOST
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        getCamera() {
            this.$refs.file.click()
        },
        openCamera () {
            this.$refs.camera.click()
        }
    },
    mounted(){
        console.log(11111);
    }
}
</script>

<style scoped lang="less">
.van-uploader {
    ::v-deep .van-uploader__wrapper > div {
        margin-left: 30px;
    }
    .van-uploader__preview-image {
        width: 90px;
        height: 90px;
    }
    ::v-deep .van-uploader__upload,
    ::v-deep .van-image__img {
        border-radius: 50%;
        overflow:hidden;
    }
}
.avatar-page {
    width: 100%;
    height: 100%;
    text-align: center;
    .go-back {
        position: fixed;
        width: 30px;
        height: 28px;
        top: 28px;
        z-index: 9;
        left: 30px;
    }
    .bg-pic {
        height: 383px;
        position: relative;
        background-color: powderblue;
        background-size: 100%;
        .avatar {
            width: 166px;
            height: 166px;
            position: absolute;
            bottom: -83px;
            left: 50%;
            margin-left: -83px;
            img {
                // background-color:rgb(255,187,16);
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
            }
        }
        .level {
            color: #fff;
            padding: 0 6px;
            border-radius: 5px;
            margin: 0 5px;
            height: 26px;
            line-height: 26px;
            display: inline-block;
            font-size: 22px;
            background: linear-gradient(to bottom, rgb(255,187,16), rgb(253,149,9));
            font-family: "AdobeHeitiStd-Regular";
            position: absolute;
            bottom: 25px;
            right: -15px;
        }
    }
    .user-name {
        font-size: 32px;
        color: rgb(41,41,41);
        margin-top: 104px;
        margin-bottom: 20px;
    }
    .current-avatar {
        color: rgb(122,122,122);
        font-size: 28px;
    }
    .blue-line {
        width: 162px;
        height: 5px;
        background-color: rgb(255,135,26);
        display: block;
        margin: 22px auto;
    }
    .query-avatar {
        padding: 0 30px;
        height: 206px;
        p {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 26px;
            color: rgb(80,80,80);
            .font-gray {
                color: #999;
            }
            .del-icon {
                width: 25px;
                height: 25px;
            }
        }
        &>div {
            display: flex;
            // justify-content: space-around;
            flex-wrap: wrap;
            margin-top: 1rem;
            margin-top: 32px;
            padding-bottom: 50px;
            border-bottom: 2px solid @border-color;
        }
        .avatared {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            overflow: hidden;
            display: inline-block;
            background: cornflowerblue;
            margin-left: 30px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .van-button {
        position: fixed;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>