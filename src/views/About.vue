<template>
  <div class="about">
    <!-- bidirectional data binding（双向数据绑定） -->
  <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)">
  </quill-editor>
 
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
    data () {
      return {
        content: '<h2>I am Example</h2>',
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
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
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
