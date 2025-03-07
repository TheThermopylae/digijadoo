<template>
  <div>
    <div v-if="editor" class="editor my-2">
      <span
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </span>
      <span
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </span>
      <span
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </span>
      <span
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </span>
      <span
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </span>
      <span
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </span>
      <span @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </span>
      <span @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </span>
      <span
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        undo
      </span>
      <span
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        redo
      </span>
    </div>
    <TiptapEditorContent
      :editor="editor"
      class="prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:mr-3 [&_ol]:pr-3 [&_ul]:mr-3 [&_ul]:pr-3 ring-2 ring-purple-c bg-white p-5 mb-5 rounded-lg [&_h1]:text-3xl [&_h2]:text-2xl [&-h3]:text-xl"
    />
  </div>
</template>

<script setup>
let props = defineProps(['content'])

const editor = useEditor({
  content: props.content ? props.content : '',
  extensions: [TiptapStarterKit],

  editorProps: {
    attributes: {
      class: 'prose'
    }
  }
})

onBeforeUnmount(() => {
  unref(editor).destroy()
})

let emit = defineEmits(['editorContent'])

onUpdated(() => {
  emit('editorContent', editor.value)
})
</script>

<style scoped>
.editor span {
  margin: 20px;
  transition: all 0.3s;
  padding: 3px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.is-active {
  background: #8c00b6;
  color: #fff;
}

* {
  transition: all 0.3s;
}
</style>
<style>
div {
  outline: none;
}
input[type='number'] {
  appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
