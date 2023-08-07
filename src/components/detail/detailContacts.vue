<template>
  <div class="contacts-container">
    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('message.finished')"
        loading-text="loading"
        ref="list"
        @load="getContactList"
      >
        <!-- <van-sticky :offset-top="44"> -->
          <section class="contactsModule" v-if="detailEmer">
            <div class="title">{{ $t('detailContacts.emergency') }}</div>
            <ul
              class="contBox"
              v-for="(item, index) in detailEmer"
              :key="index"
            >
              <li>
                <div class="left">{{ item.nameRelation }}</div>
                <div class="right">{{ item.phoneRelation }}</div>
              </li>
              <li>
                <div class="left">
                  <van-tag type="primary">{{ item.relationValue }}</van-tag>
                </div>
              </li>
              <li>
                <div class="left">
                  <van-button
                    plain
                    hairline
                    type="primary"
                    size="small"
                    @click="addNotes(item)"
                    >{{ $t('detailContacts.addNote') }}</van-button
                  >
                </div>
                <div class="round-btns right">
                  <a
                    class="yellow"
                    :href="`sms:${(item.phoneRelation)}`"
                    ><img
                      src="data:image/png;base64,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"
                  /></a>
                  <a
                    class="purple"
                    :href="`tel:${(item.phoneRelation)}`"
                    ><van-icon name="phone"
                  /></a>
                </div>
              </li>
            </ul>
            <div class="title">{{ $t('detailContacts.otherContact') }}</div>
          </section>
        <!-- </van-sticky> -->
        <section class="contactsModule" v-if="contactList">
          <ul class="contBox" v-for="(item, index) in contactList" :key="index">
            <li>
              <div class="left">{{ item.collectionName }}</div>
              <div class="right">{{ item.mobile }}</div>
            </li>
            <li>
              <div class="left">
                <van-button
                  plain
                  hairline
                  type="primary"
                  size="small"
                  @click="addNotes(item)"
                  >{{ $t('detailContacts.addNote') }}</van-button
                >
              </div>
              <div class="round-btns right">
                <a class="yellow" :href="`sms:${(item.mobile)}`"
                  ><img
                    src="data:image/png;base64,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"
                /></a>
                <a class="purple" :href="`tel:${(item.mobile)}`"
                  ><van-icon name="phone"
                /></a>
              </div>
            </li>
          </ul>
        </section>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup>
import API from '@/api/module/collection'
const limitStep = 10
const route = useRoute()
const router = useRouter()

const props = defineProps({
  userInfo: Object
})

const detailEmer = ref([])
const contactList = ref([])

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const limit = ref(limitStep)

const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  loading.value = true
  getContactList()
}

// 获取紧急联系人
const getEmer = () => {
  const params = {
    user: props.userInfo.mobile,
    userNo: props.userInfo.userId,
    firstAppStatus: 102,
    secAppStatus: 201,
    busiId: route.query.busiId
  }
  API.detailEmer(params).then((res) => {
    detailEmer.value = res.data.map((item) => {
      return {
        ...item,
        phoneRelation: item.phoneRelation.replace(/\s+/g, '')
      }
    })
    // 加载状态结束
    loading.value = false
  })
}
getEmer()
const getContactList = () => {
  if (refreshing.value) {
    contactList.value = []
    refreshing.value = false
  }
  const params = {
    planId: route.query.id,
    page: 1,
    limit: limit.value
  }
  API
    .detailContactListV2(params)
    .then((res) => {
      contactList.value = res.data
      // 加载状态结束
      loading.value = false
      // 数据全部加载完成
      if (contactList.value.length >= res.count) {
        finished.value = true
      } else {
        limit.value += limitStep
      }
    })
    .catch(() => {
      contactList.value = []
      finished.value = true
      loading.value = false
    })
}
// 添加笔记
const addNotes = (row) => {
  router.push({
    name: 'addNotes',
    query: {
      id: route.query.id,
      collectionNo: route.query.planId,
      busiId: route.query.busiId,
      type: 'summarize',
      row: JSON.stringify(row)
    }
  })
}
</script>
<style lang="scss" scoped>
.contacts-container {
  background: #ffffff;
  padding-bottom: 30px;
  height: 100%;
}
.contactsModule {
  padding: 5px 20px;
  background: #ffffff;
  .title {
    font-size: 14px;
    font-weight: 700;
    color: #4b1401;
    position: relative;
    padding: 5px 0 5px 15px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 2px;
      height: 18px;
      background: $yellow-color;
      left: 0px;
      top: 50%;
      margin-top: -9px;
    }
  }
  .contBox {
    font-size: 14px;
    padding: 5px 0;
    li {
      display: flex;
      padding: 2px 0;
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
    .round-btns {
      position: static;
    }
  }
}
</style>
