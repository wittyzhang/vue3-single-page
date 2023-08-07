<template>
  <div class="vcard-container">
    <van-overlay :show="visible && !!info" @click="close" :z-index="100">
      <div class="wrapper" @click.stop>
        <ul class="flexModule" v-if="info">
          <li>
            <span class="flex1 gray txtright">{{ $t('银行') }}：</span>
            <span class="flex2">{{ info.bank_name }}</span>
            <span class="flex3"
              ><van-button type="primary" size="small" @click="copyValue(info.bank_name)">copy</van-button></span
            >
          </li>
          <li>
            <span class="gray flex1 txtright">{{ $t('账户名称') }}：</span>
            <span class="flex2">{{ info.account_name }}</span>
            <span class="flex3"
              ><van-button type="primary" size="small" @click="copyValue(info.account_name)">copy</van-button></span
            >
          </li>
          <li>
            <span class="gray flex1 txtright">{{ $t('账户') }}：</span>
            <span class="flex2">{{ info.va }}</span>
            <span class="flex3"
              ><van-button type="primary" size="small" @click="copyValue(info.va)">copy</van-button></span
            >
          </li>
          <li>
            <span class="gray flex1 txtright">{{ $t('还款金额') }}：</span>
            <span class="flex2">{{ info.amount }}</span>
            <span class="flex3"
              ><van-button type="primary" size="small" @click="copyValue(info.amount)">copy</van-button></span
            >
          </li>
        </ul>
        <van-row class="btnGroup" type="flex" justify="end">
          <van-col offset="13" span="5"
            ><van-button plain type="default" size="small" @click="close">{{ $t('取消') }}</van-button></van-col
          >
          <van-col span="5"><van-button type="primary" size="small" @click="copyValueTotal">copy</van-button></van-col>
        </van-row>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    accBorrowPlan: {
      type: Object
    }
  },
  data() {
    return {
      info: null
    }
  },
  watch: {
    visible: function (a) {
      if (a) this.getInfo()
    }
  },
  mounted() {},
  methods: {
    getInfo() {
      this.$http.collection
        .detailRepayCodeCollectionGetVA({
          busiId: this.$route.query.busiId,
          amount: this.accBorrowPlan.remainAmount // 到期应还金额
        })
        .then(res => {
          if (res.result) {
            this.info = res.result
          } else {
            this.$toast(res.msg)
            this.$emit('close')
          }
        })
    },
    close() {
      this.$emit('close')
    },
    copy(str) {
      const input = document.createElement('textarea')
      document.body.appendChild(input)
      input.value = str
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      this.$toast('Copy Success!')
    },
    copyValue(str) {
      this.copy(str)
    },
    copyValueTotal() {
      let text = this.$t('银行') + ': ' + (this.info.bank_name || '') + '\r\n'
      text += this.$t('账户名称') + ': ' + (this.info.account_name || '') + '\r\n'
      text += this.$t('账户') + ': ' + (this.info.va || '') + '\r\n'
      text += this.$t('还款金额') + ': ' + (this.info.amount || '')

      this.copy(text)
      this.$toast('Copy Success!')
      this.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.vcard-container {
  .wrapper {
    box-sizing: border-box;
    width: 355px;
    padding: 15px;
    background: #ffffff;
    border-radius: 14px;
    font-size: 15px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -106%);
    top: 50%;
  }
  .flexModule {
    li {
      display: flex;
      padding: 3px 0;
      align-items: center;
      margin-bottom: 10px;
      .flex1 {
        flex: 1.5;
      }
      .flex2 {
        flex: 2;
      }
      .flex3 {
        flex: 0.5;
      }
      .txtright {
        text-align: right;
      }
    }
  }
  .btnGroup {
    border-top: 1px solid #eceff1;
    padding-top: 10px;
    margin-top: 10px;
    text-align: right;
  }
}
</style>
