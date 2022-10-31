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
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.CustomerTarget.Code')}}:</b> {{ rowData.Code }}</span>
            <span><i class="fas fa-check" />  <b>{{$t('insert.CustomerTarget.StatusId')}}:</b> {{(rowData.StatusId) ? $t('insert.active') : $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.CustomerTarget.Description1')}}:</b> {{ rowData.Description1 }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.CustomerTarget.title')">
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ErpCode, 'text', 'insert.CustomerTarget.ErpCode')"></div>
              <div v-html="getFormatDataByType(rowData.TciBreak1, 'object', 'insert.CustomerTarget.TciBreak1Id')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.ItemColumnName, 'text', 'insert.CustomerTarget.ItemColumnName')"></div>
              <div v-html="getFormatDataByType(rowData.ItemColumnValue, 'text', 'insert.CustomerTarget.ItemColumnValue')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.CustomerTarget.CustomerTargetDetails')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-4 asc__showPage-card">
                <b-table
                  :items="CustomerTarget"
                  :fields="customerGuaranteeFields"
                  striped
                  small
                  sticky-header="300px"
                  responsive
                  bordered
                  :current-page="currentPage"
                  :per-page="0"
                >
                  <template #head()="data">
                    {{$t(data.label)}}
                  </template>
                </b-table>
              <b-pagination
                :total-rows="totalRowCount"
                v-model="currentPage"
                :per-page="50"
                aria-controls="customer-target-list"
              ></b-pagination>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <!-- <b-tab :title="$t('insert.CustomerTargetDetails')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerTargetDetails" :items="customerTargetDetailsItems" />
              </b-card>
            </b-col>
          </b-row>
        </b-tab> -->
        <b-tab :title="$t('insert.CustomerTarget.CustomerTargetDates')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CustomerTargetDates" :items="customerTargetDatesItems" />
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
import mixin from '../../mixins/index'
import { detailData } from './detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      // customerTargetDetailsItems: detailData.customerTargetDetailsItems,
      customerTargetDatesItems: detailData.customerTargetDatesItems,
      currentPage: 1,
      totalRowCount: 0,
      allList: {},
      CustomerTarget: [],
      customerGuaranteeFields: [
        {
          key: 'Customer',
          label: 'insert.CustomerTarget.CustomerId',
          sortable: false,
          formatter (value, key, obj) {
            return `${obj.Customer ? obj.Customer.Code : ''} - ${obj.Customer ? obj.Customer.Label : ''}`
          }
        },
        {key: 'TargetQuantity', label: 'insert.CustomerTarget.TargetQuantity', sortable: false},
        {key: 'TargetUnitId',
          label: 'insert.CustomerTarget.TargetUnitId',
          formatter (value, key, obj) {
            return `${obj.TargetUnit ? obj.TargetUnit.Label : ''}`
          },
          sortable: false
        },
        {key: 'ReqItem',
          label: 'insert.CustomerTarget.ReqItemId',
          formatter (value, key, obj) {
            return `${obj.ReqItem ? obj.ReqItem.Label : ''}`
          },
          sortable: false
        },
        {key: 'ReqItemQuantity', label: 'insert.CustomerTarget.ReqItemQuantity', sortable: false},
        {key: 'DescriptionReqItem', label: 'insert.CustomerTarget.DescriptionReqItem', sortable: false},
        {key: 'GainAmount', label: 'insert.CustomerTarget.GainAmount', sortable: false},
        {key: 'Currency',
          label: 'insert.CustomerTarget.currencyId',
          formatter (value, key, obj) {
            return `${obj.Currency ? obj.Currency.Label : ''}`
          },
          sortable: false
        },
        {key: 'operations', label: 'list.operations', sortable: false}
      ]
    }
  },
  mounted () {
    this.getData()
    this.getCustomerTargetDetails()
  },
  computed: {
    ...mapState(['rowData'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getCustomerTargetDetails (currentPage) {
      if (currentPage) {
        this.currentPage = currentPage
      }
      let request = {
        andConditionModel: {
          CustomerTargetIds: [this.$route.params.url]
        },
        page: this.currentPage
      }
      this.isLoading = true
      this.allList = {}
      if (this.allList[this.currentPage]) {
        this.rowData.CustomerTarget = this.allList[this.currentPage]
        return
      }
      this.$api.postByUrl(request, 'VisionNextCustomer/api/CustomerTargetDetail/Search', 50).then((response) => {
        if (response && response.ListModel) {
          this.totalRowCount = response.ListModel.TotalRowCount
          this.CustomerTarget = response.ListModel.BaseModels
          this.allList[this.currentPage] = this.CustomerTarget
        }
        this.$forceUpdate()
      })
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextCustomer/api/CustomerTarget', record: this.$route.params.url}).then(() => {

      })
    }
  },
  watch: {
    currentPage () {
      this.getCustomerTargetDetails()
    }
  }
}
</script>
