<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
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
            <span><i class="fas fa-check" />  <b>{{$t('insert.warehouse.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.warehouse.code')}}:</b> {{rowData.Code}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.warehouse.Model_WarehouseTypeId')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.warehouse.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.warehouse.VehicleId')}}</span> <p>{{rowData.VehicleId}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.warehouse.IsCenterWarehouse')}}</span> <p>{{rowData.IsCenterWarehouse}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.warehouse.WarehouseCapacity')}}</span> <p>{{rowData.WarehouseCapacity}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.warehouse.LicenseNumber')}}</span> <p>{{rowData.LicenseNumber}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.warehouse.FinanceCode')}}</span> <p>{{rowData.FinanceCode}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.warehouse.locations')}}</h6>
                <b-table responsive :items="tempItems" :fields="fields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.other')">
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.other')}}</h6>
                <span><i class="far fa-circle" /> BranchId </span>
                <p>{{ rowData.BranchId }}</p>
                <span><i class="far fa-circle" /> CompanyId </span>
                <p>{{ rowData.CompanyId }}</p>
                <span><i class="far fa-circle" /> CreatedDateTime </span>
                <p>{{ rowData.CreatedDateTime }}</p>
                <span><i class="far fa-circle" /> CreatedUser </span>
                <p>{{ rowData.CreatedUser }}</p>
                <span><i class="far fa-circle" /> CustomerId </span>
                <p>{{ rowData.CustomerId }}</p>
                <span><i class="far fa-circle" /> EncryptedKey </span>
                <p>{{ rowData.EncryptedKey }}</p>
                <span><i class="far fa-circle" /> IsCustomerWarehouse </span>
                <p>{{ rowData.IsCustomerWarehouse }}</p>
                <span><i class="far fa-circle" /> IsVehicle </span>
                <p>{{ rowData.IsVehicle }}</p>
                <span><i class="far fa-circle" /> LocationId </span>
                <p>{{ rowData.LocationId }}</p>
                <span><i class="far fa-circle" /> ModifiedDateTime </span>
                <p>{{ rowData.ModifiedDateTime }}</p>
                <span><i class="far fa-circle" /> ModifiedUser </span>
                <p>{{ rowData.ModifiedUser }}</p>
                <span><i class="far fa-circle" /> RecordId </span>
                <p>{{ rowData.RecordId }}</p>
                <span><i class="far fa-circle" /> RecordState </span>
                <p>{{ rowData.RecordState }}</p>
                <span><i class="far fa-circle" /> RecordStatus </span>
                <p>{{ rowData.RecordStatus }}</p>
                <span><i class="far fa-circle" /> StatusId </span>
                <p>{{ rowData.StatusId }}</p>
                <span><i class="far fa-circle" /> System </span>
                <p>{{ rowData.System }}</p>
                <span><i class="far fa-circle" /> Vehicle </span>
                <p>{{ rowData.Vehicle }}</p>
                <span><i class="far fa-circle" /> WarehouseStocks </span>
                <p>{{ rowData.WarehouseStocks }}</p>
                <span><i class="far fa-circle" /> WarehouseSuppliers </span>
                <p>{{ rowData.WarehouseSuppliers }}</p>
                <span><i class="far fa-circle" /> WarehouseType </span>
                <p>{{ rowData.WarehouseType }}</p>
                <span><i class="far fa-circle" /> WarehouseTypeId </span>
                <p>{{ rowData.WarehouseTypeId }}</p>
                
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
        {key: 'SupplierBranchId', label: 'SupplierBranchId', sortable: true},
        {key: 'PurchaseWarehouseId', label: 'PurchaseWarehouseId', sortable: true},
        {key: 'ReturnWarehouseId', label: 'ReturnWarehouseId', sortable: true}
      ],
      tempItems: [ 
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''},
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''},
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''},
        {SupplierBranchId: '', PurchaseWarehouseId: '', ReturnWarehouseId: ''}
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
      this.$store.dispatch('getData', {...this.query, api: this.$route.meta.baseLink, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
