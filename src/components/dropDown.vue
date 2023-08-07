

<template>
  <div>
    <van-field
      readonly
      clickable
      name="picker"
      v-model="valueStr"
      :label="label"
      :placeholder="placeholder"
      :rules="rules"
      :required="required"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="options"
        :columns-field-names="columnsFieldNames"
        :confirm-button-text="$t('确定')"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        ref="optionPicker"
      />
    </van-popup>
  </div>
</template>
<script setup>
import { ref } from "vue"
const props = defineProps({
  label: '选择器',
  placeholder: '',
  options: Array,
  rules: Array,
  required: false,
  columnsFieldNames: {text: 'text', value: 'value', children: 'children'} // 是否自定义 默认为否
})

const emit = defineEmits(['onConfirm'])
const showPicker = ref(false)
const valueStr = ref('')
const onConfirm = (obj) => {
  console.log(obj)
  valueStr.value = setStr(obj.selectedOptions)
  showPicker.value = false
  console.log(valueStr.value)
  emit('onConfirm', obj)
}
const setStr = (obj) => {
  let str = ''
  let strArray = []
  if (Array.isArray(obj)) {
    obj.map((item) => {
      strArray.push(item.text)
    })
    str = strArray.join(' / ')
  } else {
    str = obj.text
  }
  return str
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
