<template>
  <div class="about">
    <Header />
    <!-- <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="发帖频道"
        placeholder="请选择发帖频道"
        @click="show = true"
        />
    <van-popup v-model="show" round position="bottom">
        <van-cascader
            v-model="cascaderValue"
            title="请选择发帖频道"
            :field-names="fieldNames"
            :options="options"
            @close="show = false"
            @finish="onFinish"
        />
    </van-popup> -->
    <van-field
      v-model="postattention"
      rows="1"
      autosize
      label="发帖频道"
      placeholder="请选择发帖频道"
      right-icon="arrow"
      readonly
      @click="topostattention"
    />
    <van-field
      v-model="title"
      rows="1"
      autosize
      label="标题"
      type="textarea"
      maxlength="35"
      placeholder="请输入标题最多35个字"
    />
    <div>
        <video class="videosrc" :src="video_src" controls="controls" v-if="video_src"></video>
    </div>
    <!-- bidirectional data binding（双向数据绑定） -->
    <div class="editor_con">
      <div class="emojidiv"><img :src="emoji" alt="" @click="showemoji = !showemoji"></div>
      <quill-editor v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)">
      </quill-editor>
      <div class="imgup" v-show="false" >
        <van-uploader :after-read="afterRead" :beforeRead="beforeRead">
          <van-button icon="photo" type="primary">上传图片</van-button>
        </van-uploader>
      </div>
      <div class="videoup" v-show="false" >
        <van-uploader :after-read="afterReadvideo" accept="video/*" :beforeRead="beforeReadvideo">
          <van-button icon="photo" type="primary">上传视频</van-button>
        </van-uploader>
      </div>
      
    </div>
  
    <picker
      :include="['people']"
      class="biaoqing"
      :showSearch="false"
      :showPreview="false" 
      :showCategories="false"
      @select="addEmoji"
      v-show="showemoji"
    />
    <div class="btn_group">
      <div>
        <button class="canclebtn" @click="clearEditor">取消</button>
      </div>
      <div>
        <button class="submitbtn" @click="publishPost">发布</button>
      </div>
    </div>
  <!-- Or manually control the data synchronization（或手动控制数据流） -->
  <!-- <quill-editor :content="content"
                :options="editorOption"
                @change="onEditorChange($event)">
  </quill-editor> -->
  </div>
</template>
<script>
import Header from '@/components/common/header'
import { Picker } from "emoji-mart-vue";
export default {
  components: {
    Picker,
    Header
  },
    data () {
      return {
        token:localStorage.getItem("h5token"),
        postattention:'',
        title:'',
        showemoji:false,
        emoji: require('../assets/img/user/bq@2x.png'),
        content: "",
        show: false,
        fieldValue: '',
        cascaderValue: '',
        fieldNames: {
          text: 'label',
        },
        options: [
        ],
        content: '',
        video_src:'',
        editorOption: {
          placeholder:"请输入帖子内容~",
          theme: 'snow',
          // some quill options
          modules: {
            toolbar: {
              container: [
              // ["bold", "italic", "underline", "strike"], //切换按钮  //bold 加粗 italic 斜 underline 下划线 strike删除线
              // ["blockquote", "code-block"], //blockquote 引用 code-block 代码块
              // ["link", "image"], //图片 link 链接  image图片
              // [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              // [{ list: "ordered" }, { list: "bullet" }], //排序 ordered 有序  bullet 无序
              // // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
              // [{ script: "sub" }, { script: "super" }], // sub上标 / super下标
              // [{ indent: "-1" }, { indent: "+1" }], // 减少缩进/缩进
              // [{ direction: "rtl" }], // 文本方向
              // [{ color: [] }, { background: [] }], // color 字体颜色 background 背景颜色  从主题默认下拉
              // [{ align: [] }], //文本对齐方式
              // [{ font: [] }], //字体格式
              // [{ size: [] }] // 自定义下拉
                ['link', 'image', 'video'],
              ],
              handlers: {
                image: value => {
                  if (value) {
                    //禁止软键盘弹出
                    document.activeElement.blur();
                    // 触发input框选择图片文件
                    console.log("自定义的上传图片");
                    document.querySelector(".imgup .van-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                },
                video: value => {
                  if (value) {
                    //禁止软键盘弹出
                    document.activeElement.blur();
                    // 触发input框选择图片文件
                    console.log("自定义的上传视频");
                    document.querySelector(".videoup .van-uploader input").click();
                  } else {
                    this.quill.format("video", false);
                  }
                },
              }
            }
          }
        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      topostattention(){
        this.$router.push('/postattention')
      },
      addEmoji(e) {
        this.editor.focus();
        // this.content = this.content + e.native;
        let length = this.editor.selection.savedRange.index;
        console.log(length);
        this.editor.insertText(length,e.native)
        this.showemoji = false;  
      },
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },
      onFinish({ selectedOptions }) {
        console.log(this.cascaderValue);
        this.show = false;
        this.fieldValue = selectedOptions.map((option) => option.label).join('/');
        console.log(this.fieldValue);
      },
      //视频上传成功
      afterReadvideo(file){
        console.log("上传成功", file);
      },
      // 视频上传前
      beforeReadvideo(file){
        const isLt10M = file.size / 1024 / 1024  < 1;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
            this.$toast('请上传正确的视频格式');
            return false;
        }
        console.log(file.size / 1024 / 1024);
        if (!isLt10M) {
            this.$toast('上传视频大小不能超过1MB哦!');
            return false;
        }
        let loading = this.$toast.loading({
          duration: 0,
          mask: false,
          forbidClick: true,
          message: "上传中..."
        });
        let formData = new FormData();
        formData.append("file[]", file);
        this.$axios({
            url:this.$api.upimg,
            method:'post',
            data:formData,
            headers: {
                'content-type': 'multipart/form-data',
                'token' :this.token
            },
            timeout:3000
        })
        .then(res => {
            // console.log(res);
            // formData = null;
            // formData = new FormData();
            // this.$refs.upload.clearFiles(); 
            if (res.data.code == 1) {
              console.log(res);
              loading.clear();
            } else if (res.status == 200) {
              this.video_src = res.data.data[0];
              // // 获取光标所在位置
              // let length = this.editor.getSelection().index;
              // // // 插入视频
              // this.editor.insertEmbed(length, "video", res.data.data[0]);
              // // // 调整光标到最后
              // this.editor.setSelection(length + 1);
              loading.clear();
            } else if (res.data.code == -1) {
              console.log(res);
              window.location.href = this.JuheHOST
              loading.clear();
            }
        })
        .catch(error => {
            console.log(error);
        })
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
      //图片上传成功
      afterRead(file) {
        console.log(file);
        let loading = this.$toast.loading({
          duration: 0,
          mask: false,
          forbidClick: true,
          message: "上传中..."
        });
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
                this.$axios({
                    url:this.$api.upimg,
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

                    } else if (res.status == 200) {
                      // 获取光标所在位置
                      let length = this.editor.getSelection().index;
                      // // 插入图片
                      this.editor.insertEmbed(length, "image", res.data.data[0]);
                      // // 调整光标到最后
                      this.editor.setSelection(length + 1);
                      loading.clear();
                    } else if (res.data.code == -1) {

                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }else{
          formData.append("file[]", file.file);
          this.$axios({
              url:this.$api.upimg,
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

              } else if (res.status == 200) {
                // 获取光标所在位置
                let length = this.editor.getSelection().index;
                // // 插入图片
                this.editor.insertEmbed(length, "image", res.data.data[0]);
                // // 调整光标到最后
                this.editor.setSelection(length + 1);
                loading.clear();
              } else if (res.data.code == -1) {

              }
          })
          .catch(error => {
              console.log(error);
          })
        }
      },
      //图片上传前
      beforeRead(file) {
        console.log("上传前", file, file.size / 1024);
        if (file.size == 0) {
          return false
        }
        if (!/^image\/(jpeg|png|jpg)$/.test(file.type)) {
          this.$toast("请上传 jpg,jpeg,png 格式图片");
          return false;
        }
        return true;
        
      },
      //发布帖子
      publishPost() {
      // 通过代码获取编辑器内容
        if (this.postattention && this.title) {
          let data = this.content;
          let params = {}
          if(this.video_src){
            params = {
              forum_title: this.$inHTMLData(this.title),
              channel: sessionStorage.getItem('postcirid'),
              body: data,
              video:this.video_src
            }
          }else{
            params = {
              forum_title: this.$inHTMLData(this.title),
              channel: sessionStorage.getItem('postcirid'),
              body: data
            }
          }
          this.$api.publish
            .publishPost(params)
            .then((res) => {
              console.log(res);
              if (res.data.code == 1) {
               
              } else if (res.data.code == 0) {
                this.$toast("发布成功");
                //清空编辑器
                this.clearEditor()
                this.title = ''
                this.video_src = ''
              } else if (res.data.code == -1) {
                
                window.location.href = this.JuheHOST
              }
            })
            .catch((error) => {
              this.$toast("服务链接超时，请稍后重试");
            });
        } else {
          this.$toast({
            message: "频道和标题不能为空",
          });
        }
      },
      // 清空编辑器
      clearEditor(){
        this.content = ''
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    created(){
      if(sessionStorage.getItem('postcir')){
        this.postattention = sessionStorage.getItem('postcir')
      }
    },
    mounted() {
      // this.$nextTick(function() {
      //   this.$refs.myQuillEditor.quill.enable(true);
      //   this.$refs.myQuillEditor.quill.blur();
      // });
      console.log(this.editor)
    }
  }

</script>
<style lang="less" scoped>
.about{
  position: relative;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
    content: "输入链接：";
}
.ql-snow .ql-tooltip::before {
  content: '访问链接：';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  content: '保存';
}
.ql-snow .ql-tooltip a.ql-action::after {
  content: '编辑';
}
.ql-snow .ql-tooltip a.ql-remove::before {
  content: '移除';
}
.container{
  position: relative;
}
.ql-container{
  min-height: 300px;
}
.emoji{
  position: absolute;
}
/deep/.emoji-mart-category-label span[data-v-376cda0e] {
  display: none;
}
.editor_con{
  position: relative;
}
.emojidiv{
  width: 20px;
  height: 20px;
  position: absolute;
  left: 125px;
  top: 11px;
  img{
    width: 100%;
    height: 100%;
  }
}
.btn_group{
  width: 700px;
  height: 100px;
  margin: auto;
  margin-top: 50px;
  div{
    width: 350px;
    height: 100%;
    float: left;
    .canclebtn{
      width: 330px;
      height: 100%;
      border: none;
      color: #80807F;
      background-image: linear-gradient(to bottom, #DCDBDC, #BBB9BA);
      margin-right: 40px;
      border-radius: 10px;
    }
    .submitbtn{
      width: 330px;
      height: 100%;
      border: none;
      color: #6F360C;
      background-image: linear-gradient(to bottom, #FDE67C, #F2BD42);
      border-radius: 10px;
    }
  }
}
.videosrc{
  width: 100%;
  height: 250px;
  margin: auto;
}
</style>
<style>
.ql-editor{
  height: 800px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
    content: "输入链接：";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0;
    content: '保存';
    padding-right: 0;
}
.ql-snow .ql-tooltip::before {
    content: "访问 URL:";
}
.ql-snow .ql-tooltip a.ql-action::after {
    content: '编辑';
}
.ql-snow .ql-tooltip a.ql-remove::before {
    content: '删除';
}
.ql-snow.ql-toolbar button, .ql-snow .ql-toolbar button{
  padding: 0;
  margin-right: 10px;
}
.emoji-mart{
  height: 300px !important;
  position: absolute !important;
  bottom: 650px !important;
}
/* .biaoqing{
  position: absolute;
  top: 197px;
} */
</style>
