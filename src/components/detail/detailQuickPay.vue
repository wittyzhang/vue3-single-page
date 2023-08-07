<template>
  <div class="vcard-container">
    <van-overlay :show="visible" @click="close" :z-index="100">
      <div class="wrapper" @click.stop>
        <van-form
          @failed="onFailed"
          @submit="onSubmit"
          label-width="7em"
          validate-trigger="onSubmit"
        >
          <!-- 通过 pattern 进行正则校验 -->
          <van-field name="radio" :label="$t('detailQuickPay.orderNo')">
            <template #input>
              {{ form.busiId }}
            </template>
          </van-field>
          <van-field
            name="radio"
            :label="$t('detailQuickPay.orderType')"
            required
            :rules="[{ required: true, message: `${$t('detailQuickPay.requiredMsg')}` }]"
          >
            <template #input>
              <van-radio-group
                v-model="form.vaType"
                direction="horizontal"
                @change="changVaType"
              >
                <van-radio :name="1" :value="1">{{ $t('detailQuickPay.order1') }}</van-radio>
                <van-radio :name="2" :value="2">{{ $t('detailQuickPay.order2') }}</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="radio" :label="$t('detailQuickPay.payAmount')">
            <template #input>
              <p class="reachAmount">{{ form.reachAmount }}</p>
              <ul class="cellList" v-if="info">
                <li>
                  <label>{{ $t('detailQuickPay.principal') }}</label>
                  <span>{{ info.principal }}</span>
                </li>
                <li>
                  <label>{{ $t('detailQuickPay.interest') }}</label>
                  <span>{{ info.interest }}</span>
                </li>
                <li>
                  <label>{{ $t('detailQuickPay.penalty') }}</label>
                  <span>{{ info.penalty }}</span>
                </li>
                <li>
                  <label>{{ $t('detailQuickPay.fee') }}</label>
                  <span>{{ info.fee }}</span>
                </li>
              </ul>
            </template>
          </van-field>
          <van-field
            required
            name="stepper"
            :label="$t('detailQuickPay.repaymenAmount')"
            :rules="[{ required: true, message: `${$t('detailQuickPay.repaymenRequiredMsg')}` }]"
          >
            <template #input>
              <van-stepper
                v-model="form.amount"
                input-width="100px"
                :disabled="form.vaType == 2"
                :min="1"
              />
            </template>
          </van-field>
          <drop-down
            :options="bankList"
            :name="$t('detailQuickPay.repaymenBank')"
            :label="$t('detailQuickPay.repaymenBank')"
            :placeholder="$t('detailQuickPay.repaymenBank')"
            :required="true"
            :rules="[{ required: true, message: `${$t('detailQuickPay.repaymenBankRequiredMsg')}` }]"
            @onConfirm="selectBankCode"
          ></drop-down>
          <van-field
            v-model="form.bankAccount"
            :name="$t('detailQuickPay.bankCode')"
            :label="$t('detailQuickPay.bankCode')"
            :placeholder="$t('detailQuickPay.bankCode')"
          />
          <van-row class="btnGroup" type="flex" justify="end">
            <van-col offset="13" span="5"
              ><van-button
                plain
                type="default"
                size="small"
                native-type="button"
                @click="close"
                >{{ $t('detailQuickPay.cancel') }}</van-button
              ></van-col
            >
            <van-col span="5"
              ><van-button type="primary" size="small" @click="onSubmit">{{
                $t('detailQuickPay.ok')
              }}</van-button></van-col
            >
          </van-row>
        </van-form>
      </div>
    </van-overlay>
  </div>
</template>
<script setup>
import API from '@/api/module/collection'
import { showToast } from 'vant'
const form1 = {
  busiId: '',
  vaType: 1,
  reachAmount: '',
  amount: '',
  bank_code: '',
  bankAccount: ''
}
const route = useRoute()
const emit = defineEmits(['close'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  userInfo: {
    type: Object
  },
  application: {
    type: Object
  }
})

const form = ref({ ...form1 })
const info = ref(null)
const bankList = ref([])

const getInfo = () => {
  API
    .detailRepayCodeParams({
      busiId: route.query.busiId,
      userNo: props.userInfo.userId
    })
    .then((res) => {
      if (res.data) {
        info.value = res.data
        form.value = {
          ...form1,
          ...res.data,
          amount: res.data.reachAmount,
          bankAccount: props.application.cardNo
        }
        bankList.value = res.data.bankList.map((item) => {
          return {
            text: item.bankName,
            value: item.bankCode
          }
        })
      } else {
        showToast(res.msg)
        close()
      }
    })
}
const close = () => {
  emit('close')
}
const changVaType = (val) => {
  form.value.amount = val == 1 ? info.value.reachAmount : info.value.rollerAmount
}
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo)
}
const onSubmit = () => {
  const { vaType, bankAccount, amount, bank_code } = form.value
  const params = {
    user_id: props.userInfo.userId,
    application_id: route.query.busiId,
    vaType,
    bankAccount,
    amount,
    bank_code
  }
  API.detailRepayCodeSubmit(params).then(() => {
    showToast('Successful!')
    close()
  })
}
const selectBankCode = (obj) => {
  form.value.bank_code = obj.value
}
watch(() => props.visible, (a) => {
  if (a) getInfo()
})

</script>
<style>
.vcard-container .van-field__control--custom {
  flex-wrap: wrap;
}
</style>
<style lang="scss" scoped>
.vcard-container {
  .wrapper {
    box-sizing: border-box;
    width: 355px;
    padding: 15px;
    background: #ffffff;
    border-radius: 14px;
    font-size: 15px;
    margin: 11vw auto 0;
    // left: 50%;
    // position: absolute;
    // transform: translate(-50%, 20%);
  }
  .flexModule {
    li {
      display: flex;
      padding: 3px 0;
      align-items: center;
      margin-bottom: 10px;
      .flex1 {
        flex: 1;
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
    border-top: 1px solid $border-color;
    padding-top: 10px;
    margin-top: 10px;
    text-align: right;
  }
  .reachAmount {
    width: 100%;
    margin: 0;
  }
  .cellList {
    width: 100%;
    border: 1px solid $border-color;
    border-bottom: 0;
    li {
      display: flex;
      border-bottom: 1px solid $border-color;
      label {
        flex: 3;
        border-right: 1px solid $border-color;
        background: $pink2-color;
        text-align: center;
        padding: 3px;
      }
      span {
        flex: 2;
        text-align: right;
        padding: 3px 10px 3px 3px;
      }
    }
  }
}
</style>
