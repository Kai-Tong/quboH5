<template>
  <div class="about">
    <van-field
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
    </van-popup>
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
      <van-uploader v-show="false" :afterRead="afterRead" :beforeRead="beforeRead">
        <van-button icon="photo" type="primary">上传图片</van-button>
      </van-uploader>
    </div>
  
    <picker
      :include="['people']"
      :showSearch="false"
      :showPreview="false" 
      :showCategories="false"
      @select="addEmoji"
      v-show="showemoji"
    />
  <!-- Or manually control the data synchronization（或手动控制数据流） -->
  <!-- <quill-editor :content="content"
                :options="editorOption"
                @change="onEditorChange($event)">
  </quill-editor> -->
  </div>
</template>
<script>
import { Picker } from "emoji-mart-vue";
export default {
  components: {
    Picker
  },
    data () {
      return {
        token:localStorage.getItem("h5token"),
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
        editorOption: {
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
                    console.log("自定义的上传");
                    document.querySelector(".van-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                }
              }
            }
          }
        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      addEmoji(e) {
        this.editor.focus();
        // this.content = this.content + e.native;
        let length = this.editor.selection.savedRange.index;
        console.log(length);
        this.editor.insertText(length,e.native)
        this.showemoji = false;
        
        // console.log(this.editor.getSelection(focus = true));
        // let length1 = this.editor.getSelection(focus = true).index;
        // this.editor.setSelection(length1);   
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
        // this.content = html
      },
      onFinish({ selectedOptions }) {
        console.log(this.cascaderValue);
        this.show = false;
        this.fieldValue = selectedOptions.map((option) => option.label).join('/');
        console.log(this.fieldValue);
      },
      //图片上传成功
      afterRead(file) {
        console.log("上传成功", file);
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

        this.$toast.allowMultiple();
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
                'mediaType': 'multipart/form-data',
                'token' :this.token
            },
            timeout:3000
        })
        .then(res => {
            console.log(res);
            // formData = null;
            // formData = new FormData();
            // this.$refs.upload.clearFiles(); 
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
      },
      // 获取频道列表
      getChanelList() {
        this.$api.getformatechanel
            .getChanel()
            .then((res) => {
            console.log(res);
            if (res.data.code == 1) {
            } else if (res.data.code == 0) {
                // this.options = res.data.params;
                for (let i in res.data.params[2].children) {
                this.options.push(res.data.params[2].children[i]);
                }
            } else if (res.data.code == -1) {
 
            }
            })
            .catch((error) => {
            
            });
        },
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      this.getChanelList();
      // this.$nextTick(function() {
      //   this.$refs.myQuillEditor.quill.enable(true);
      //   this.$refs.myQuillEditor.quill.blur();
      // });
      console.log('this is current quill instance object', this.editor)
    }
  }

</script>
<style lang="less" scoped>
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
  left: 100px;
  top: 10px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
.ql-snow .ql-tooltip[data-mode=link]::before {
    content: "输入链接：";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0;
    content: '保存';
    padding-right: 0;
}
</style>
