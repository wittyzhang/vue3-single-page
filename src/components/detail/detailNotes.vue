<template>
  <div class="notes-container">
    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('message.finished')"
        loading-text="loading"
        ref="list"
        @load="getList"
      >
        <section
          class="notesModule"
          v-for="(item, index) in notesList"
          :key="index"
        >
          <ul class="contBox">
            <li>
              <div class="left">{{ item.collectionerId }}</div>
              <div class="right">
                {{ parseTime(item.createTimeStr, '{d}-{m}-{y} {h}:{i}:{s}') }}
              </div>
            </li>
          </ul>
          <div class="notesInfo">
            <ul>
              <li class="name" v-if="item.collectionName">
                {{ item.collectionName }}
              </li>
              <li v-if="item.collectionMobile">
                <span class="blue">{{ $t('detailNotes.phone') }}</span> to
                <span class="blue"
                  >{{ item.collectionMobile }}
                  {{ item.relation ? `(${item.relation})` : '' }}</span
                >
              </li>
              <li v-if="item.label">
                <van-tag plain round color="#FF5722" text-color="#FF5722">{{
                  item.label
                }}</van-tag>
              </li>
              <li v-if="item.mark">
                <span class="mark">{{ item.mark }}</span>
              </li>
              <!-- <li v-show="item.showCollapse"> -->
              <li>
                <ul>
                  <!-- <li><span class="gray">{{ $t('Commit to a repayment date') }}：</span>{{ item.promiseRepayDateStr }}</li>
                  <li><span class="gray">{{ $t('Amount committed') }}：</span>￠5,000.00</li>
                  <li><span class="gray">{{ $t('Callback date') }}：</span>{{ item.callbackDateStr }}</li> -->
                  <li>
                    <span class="gray">{{ $t('detailNotes.overdueStage') }}：</span
                    >{{ item.overdueStage || '-' }}
                  </li>
                  <li v-if="item.swindleType">
                    <span class="gray">{{ $t('detailNotes.swindleType') }}：</span
                    >{{ item.swindleType }}
                  </li>
                  <li v-if="item.swindleChildType">
                    <span class="gray">{{ $t('detailNotes.swindleChildType') }}：</span
                    >{{ item.swindleChildType }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- <a class="collapseBtns" @click="handleToggle(index)">{{
            item.showCollapse ? $t('Pack up') : $t('Unfold')
          }}</a> -->
        </section>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup>
import API from '@/api/module/collection'
import { parseTime } from '@/utils/index'
const limitStep = 10
const route = useRoute()
const props = defineProps({
  userInfo: Object
})

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const limit = ref(limitStep)
const notesList = ref([])
const showCollapse = ref(false)

const onRefresh = () => {
  limit.value = limitStep
  // 清空列表数据
  finished.value = false
  getList()
}
// 切换
const handleToggle = (index) => {
  const v =notesList[index].showCollapse
  notesList[index].showCollapse = !v
  $forceUpdate()
}
const getList = () => {
  if (refreshing.value) {
    notesList.value = []
    refreshing.value = false
  }
  loading.value = true
  const params = {
    collectionNo: route.query.planId,
    page: 1,
    limit: limit.value
  }
  API
    .detailFlowList(params)
    .then((res) => {
      const data = res.data.map((item) => {
        return {
          ...item,
          showCollapse: false
        }
      })
      notesList.value = data
      // 加载状态结束
      loading.value = false
      // 数据全部加载完成
      if (notesList.value.length >= res.count) {
        finished.value = true
      } else {
        limit.value += limitStep
      }
    })
    .catch(() => {
      notesList.value = []
      finished.value = true
      loading.value = false
    })
}
</script>
<style lang="scss" scoped>
.notes-container {
  // background: #ffffff;
  padding-bottom: 30px;
  height: 100%;
}
.notesModule {
  padding: 16px 14px 16px 31px;
  background: #ffffff;
  position: relative;
  font-size: 15px;
  &::before {
    content: '';
    position: absolute;
    background: $purple-color;
    top: 21px;
    left: 0;
    width: 18px;
    height: 11px;
    border-radius: 0 6px 6px 0;
  }
  .contBox {
    font-size: 14px;
    li {
      display: flex;
      padding: 3px 0;
      align-items: center;
      div {
        flex: 1;
      }
      .left {
      }
      .right {
        text-align: right;
        color: $gray-color;
      }
    }
  }
  .notesInfo {
    box-sizing: border-box;
    width: 330px;
    padding: 10px;
    background: #ffffff;
    border: 1px solid #eceff1;
    border-radius: 14px;
    li {
      margin-bottom: 5px;
    }
    .name {
      padding: 10px 0;
    }
    .mark {
      // height: 85px;
      background: #f9fafb;
      border-radius: 6px;
      margin: 15px auto 0;
      padding: 9px;
      display: block;
    }
  }
  .collapseBtns {
    cursor: pointer;
    width: 72px;
    height: 18px;
    line-height: 18px;
    background: #f9f9fb;
    border-radius: 80px;
    font-size: 14px;
    color: $blue-color;
    display: block;
    text-align: center;
    margin-top: 10px;
    &:hover {
      background: #eeeeef;
    }
  }
}
</style>
