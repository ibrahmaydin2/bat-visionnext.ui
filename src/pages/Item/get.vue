<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb title="Title" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.item.Model_Code')}}:</b></span> 
            <span><i class="fas fa-check" />  <b>{{$t('insert.item.Model_Description1')}}:</b></span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.item.Model_CardTypeId')}}:</b></span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.item.Model_StatusId')}}:</b></span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.item.Detail')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.item.product')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_ShortDescription')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_ExportDescription1')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_ProducerCodeId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_TypeId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_GroupId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Code')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_ShelfLife')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_TimeFrameId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_IsBarterAllowed')}}</span><p><i :class="true ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_CategoryId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_SortOrder')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_ClassId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_ColorId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_IsOrderAllowed')}}</span><p><i :class="true ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_IsSaleAllowed')}}</span><p><i :class="true ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_UseSalesAnalysis')}}</span><p><i :class="true ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_IsSpGiftItem')}}</span><p><i :class="true ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_IsPhysicalBom')}}</span><p><i :class="true ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p> 
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.item.ItemFinancialInfo')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_FinanceCode')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_UnitSetId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_DiscountGroup1Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_RecurrenceTypeId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_KindId')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_MaxDiscountRate')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category1Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category2Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category3Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category4Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category5Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category6Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category7Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category8Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category9Id')}}</span><p></p>
                <span><i class="far fa-circle" /> {{$t('insert.item.Model_Category10Id')}}</span><p></p>
                
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemCustomers')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="customerItems" :fields="customerFields">
                  <!-- <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template> -->
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemBarcodes')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="barcodeItems" :fields="barcodeFields">
                  <!-- <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template> -->
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemOrderQuotas')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="orderItems" :fields="orderFields">
                  <!-- <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template> -->
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemAttachments')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.item.ItemAttachments')}}</h6>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.deposit')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="depositsItems" :fields="depositsFields">
                  <!-- <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template> -->
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.item.ItemBoms')">
          <b-row>
            <b-col cols="12" md="12">
              <b-card class="m-3 asc__showPage-card">
                <b-table responsive :items="productGroupItems" :fields="productGroupFields">
                  <!-- <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template> -->
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
      customerFields: [
        {
          key: 'customer',
          label: this.$t('insert.item.Model_CustomerId'),
          sortable: true
        },
        {
          key: 'code',
          label: this.$t('insert.item.CustomerItemCode'),
          sortable: true
        },
        {
          key: 'description',
          label: this.$t('insert.item.Model_CustomerItemDescription'),
          sortable: true
        }
      ],
      barcodeFields: [
        {
          key: 'barcode',
          label: this.$t('insert.item.Model_Barcode'),
          sortable: true
        },
        {
          key: 'defination',
          label: this.$t('insert.item.customerUnitDefinition'),
          sortable: true
        }
      ],
      orderFields: [
        {
          key: 'quotaQuantity',
          label: this.$t('insert.item.Model_QuotaQuantity'),
          sortable: true
        },
        {
          key: 'quotaRegion',
          label: this.$t('insert.item.Model_QuotaRegionId'),
          sortable: true
        },
        {
          key: 'quotaDate',
          label: this.$t('insert.item.Model_BeginDate') ,
          sortable: true
        }
      ],
      depositsFields: [
        {
          key: 'deposit',
          label: this.$t('insert.item.deposit') ,
          sortable: true
        },
        {
          key: 'quantity',
          label: this.$t('insert.item.quantity') ,
          sortable: true
        },
        {
          key: 'unit',
          label: this.$t('insert.item.unit') ,
          sortable: true
        }
      ],
      productGroupFields: [
        {
          key: 'lineNumber',
          label: this.$t('insert.item.LineNumber') ,
          sortable: true
        },
        {
          key: 'bomItem',
          label: this.$t('insert.item.bomItem') ,
          sortable: true
        },
        {
          key: 'quantity',
          label: this.$t('insert.item.quantity') ,
          sortable: true
        }
      ],
      customerItems: [
        { customer: 'CIHAN BUFE- ALI ATAN', description: 'CIHAN BUFE- ALI ATAN', visit: 1, code: '312' },
        { customer: 'UGUR BUFE', description: 'UGUR BUFE', visit: 1, code: '260' },
        { customer: 'ENGIN MARKET-ENGIN SIT', description: 'ENGIN MARKET-ENGIN SIT', visit: 0, code: '312' },
        { customer: 'MOKKI', description: 'MOKKI', visit: 0 },
        { customer: 'CAN BÜFE SERKAN ÇALIŞKAN', description: 'CAN BÜFE SERKAN ÇALIŞKAN', visit: 0, code: '312' },
        { customer: 'YAVUZ BÜFE', description: 'YAVUZ BÜFE', visit: 0, code: '312' },
        { customer: 'MASLAK ARENA', description: 'MASLAK ARENA', visit: 1, code: '312' },
        { customer: 'CUMHURİYET BÜFE-MUSTAFA BOZOK', description: 'CUMHURİYET BÜFE-MUSTAFA BOZOK', visit: 1, code: '312' },
        { customer: 'TEKEL 61-İDRİS BAŞALI', description: 'TEKEL 61-İDRİS BAŞALI', visit: 1, code: '312' },
        { customer: 'ARZU GIDA-AHMET AKSU', description: 'ARZU GIDA-AHMET AKSU', visit: 1, code: '312' },
        { customer: 'BARBADOS TÜTÜN', description: 'BARBADOS TÜTÜN', visit: 1, code: '312' }
      ],
      barcodeItems: [
        {barcode: '', defination: ''},
        {barcode: '', defination: ''},
        {barcode: '', defination: ''},
        {barcode: '', defination: ''},
        {barcode: '', defination: ''},
        {barcode: '', defination: ''},
        {barcode: '', defination: ''}
      ],
      orderItems: [
        {quotaQuantity: '', quotaRegion: '', quotaDate: ''},
        {quotaQuantity: '', quotaRegion: '', quotaDate: ''},
        {quotaQuantity: '', quotaRegion: '', quotaDate: ''},
        {quotaQuantity: '', quotaRegion: '', quotaDate: ''},
        {quotaQuantity: '', quotaRegion: '', quotaDate: ''},
        {quotaQuantity: '', quotaRegion: '', quotaDate: ''},
        {quotaQuantity: '', quotaRegion: '', quotaDate: ''}
      ],
      depositsItems: [
        {deposit: '', quantity: '', unit: ''},
        {deposit: '', quantity: '', unit: ''},
        {deposit: '', quantity: '', unit: ''},
        {deposit: '', quantity: '', unit: ''},
        {deposit: '', quantity: '', unit: ''},
        {deposit: '', quantity: '', unit: ''},
        {deposit: '', quantity: '', unit: ''}
      ],
      productGroupItems: [
        {lineNumber: '', bomItem: '', quantity: ''},
        {lineNumber: '', bomItem: '', quantity: ''},
        {lineNumber: '', bomItem: '', quantity: ''},
        {lineNumber: '', bomItem: '', quantity: ''},
        {lineNumber: '', bomItem: '', quantity: ''},
        {lineNumber: '', bomItem: '', quantity: ''},
        {lineNumber: '', bomItem: '', quantity: ''}
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextItem/api/Item', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
