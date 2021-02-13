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
            toolbar:  [
              // ['bold', 'italic', 'underline', 'strike'],        // 加粗，斜体，下划线，删除线
              // ['blockquote', 'code-block'],                      //引用，代码块
              // [{ 'header': 1 }, { 'header': 2 }],               // 几级标题
              // [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 有序列表，无序列表
              // [{ 'script': 'sub'}, { 'script': 'super' }],      // 下角标，上角标
              // [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
              // [{ 'direction': 'rtl' }],                         // 文字输入方向
              // [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
              // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],// 标题
              // [{ 'color': [] }, { 'background': [] }],          // 颜色选择
              // [{ 'font': [] }],// 字体
              // [{ 'align': [] }], // 居中
              // ['clean'],// 清除样式
              ['link', 'image', 'video'],
            ]
          }
        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      addEmoji(e) {
        // this.content = this.content + e.native;
        let length = this.editor.selection.savedRange.index;
        console.log(length);
        this.editor.insertText(length,e.native)
        this.showemoji = false;
        // this.editor.insertText(5, 'Quill', {
        //   'color': '#ffff00',
        //   'italic': true
        // });
        // this.editor.setSelection(length + 1);
        // console.log(length);
        
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
