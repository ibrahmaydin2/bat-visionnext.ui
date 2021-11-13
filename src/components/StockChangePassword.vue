<template>
  <b-row>
    <b-col cols="12" class="mb-3">
      <h3>{{$t('nav.stockChangePassword')}}</h3>
    </b-col>
    <b-col cols="12" md="6">
      <b-row>
        <b-col class="text-right" cols="3">
          Stok Sayım Şifresi
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group>
            <b-form-input v-model="changeStockPassword" disabled type="text" placeholder="Stok sayım şifreniz" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="3">
        </b-col>
        <b-col class="text-left" cols="6">
          <b-form-group class="text-right">
            <b-btn @click="ChangeStockPassword" variant="success">Şifre Oluştur</b-btn>
          </b-form-group>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>

export default {
  data () {
    return {
      changeStockPassword: null
    }
  },
  mounted () {
    this.ChangeStockPassword()
  },
  methods: {
    ChangeStockPassword () {
      this.$api.post({}, 'MobileApi', 'StockChangePassword/CreatePassword').then((res) => {
        this.changeStockPassword = res.Password
      })
    }
  }
}
</script>
