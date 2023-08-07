<template>
  <div>
    <van-field
      readonly
      clickable
      name="datetimePicker"
      v-model="valueStr"
      :label="label"
      :placeholder="placeholder"
      :min-date="minDate"
      :max-date="maxDate"
      @click="showPicker = true"
    />
    <van-calendar
      type="range"
      v-model:show="showPicker"
      @confirm="onConfirm"
      @cancel="showPicker = false"
      :allow-same-day="true"
      :minDate="minDate"
      :maxDate="maxDate"
      color="#D4633B"
    />
  </div>
</template>
<script setup>
import { parseTime } from '@/utils/index'
import {ref} from 'vue'

const emit = defineEmits(['onConfirm'])
const props = defineProps({
  value: '',
  label: String,
  placeholder: String,
  columns: []
})

const showPicker = ref(false)
const valueStr = ref('')
const minDate = new Date(1970, 0, 1)
const maxDate = new Date(2060, 11, 31)

const formatDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
const onConfirm = (date) => {
  const [start, end] = date
  console.log(date, '=====')
  showPicker.value = false
  const str = `${parseTime(start, '{d}-{m}-{y}')} - ${parseTime(end, '{d}-{m}-{y}')}`
  valueStr.value = str
  emit('onConfirm', { start: parseTime(start), end: parseTime(end) })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navBarBtn {
  color: #ffffff;
}
</style>
