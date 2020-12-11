<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-check" />  <b>{{$t('insert.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.bank.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.bank.financeCode')}}:</b> {{rowData.FinanceCode}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.bank.description1')}}:</b> {{rowData.Description1}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.bank.title')" active>
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="rowData.BankBranches" :fields="fields">
                  <template #cell(BankId)="data">
                    {{data.item.Bank.Label}}
                  </template>
                   <template #cell(IsDefaultBranch)="data">
                    <i :class="data.item.IsDefaultBranch === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" />
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
      // fields: ['Müşteri', 'Lokasyon', 'Ziyaret Başlama Kontrolü Yapılmayacak'],
      fields: [
        {key: 'BankId', label: this.$t('insert.bank.title'), sortable: true},
        {key: 'Code', label: this.$t('insert.bank.code'), sortable: true},
        {key: 'Description1', label: this.$t('insert.bank.description1'), sortable: true},
        {key: 'FinanceCode', label: this.$t('insert.bank.financeCode'), sortable: true},
        {key: 'IsDefaultBranch', label: this.$t('insert.bank.isDefaultBranch'), sortable: true}
      ]
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextBank/api/Bank', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
