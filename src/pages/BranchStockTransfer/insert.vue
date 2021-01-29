<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col v-if="insertVisible.MovementNumber != null ? insertVisible.MovementNumber : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.MovementNumber + (insertRequired.MovementNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementNumber.$error }">
              <b-form-input type="text" v-model="form.MovementNumber" :readonly="insertReadonly.MovementNumber" />
            </b-form-group>
          </b-col>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select :options="employees" @input="selectedSearchType('RepresentativeId', $event)" label="Description1"></v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.DocumentDate != null ? insertVisible.DocumentDate : developmentMode" :start-weekday="1" cols="12" md="2">
              <b-form-group :label="insertTitle.DocumentDate + (insertRequired.DocumentDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.DocumentDate.$error }">
                <b-form-datepicker v-model="form.DocumentDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.MovementTime != null ? insertVisible.MovementTime : developmentMode" :start-weekday="1" cols="12" md="2">
              <b-form-group :label="insertTitle.MovementTime + (insertRequired.MovementTime === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.MovementTime.$error }">
                <b-form-datepicker v-model="form.MovementTime" />
              </b-form-group>
            </b-col>
          <b-col v-if="insertVisible.GenExp1 != null ? insertVisible.GenExp1 : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.GenExp1 + (insertRequired.GenExp1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GenExp1.$error }">
              <b-form-input type="text" v-model="form.GenExp1" :readonly="insertReadonly.GenExp1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <b-form-checkbox v-model="form.StatusId" name="check-button" switch>
                {{(form.StatusId) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
       </b-row>
       <b-row>
        <b-col v-if="insertVisible.FromBranchId != null ? insertVisible.FromBranchId : developmentMode" cols="12" md="4">
          <b-form-group :label="insertTitle.FromBranchId + (insertRequired.FromBranchId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromBranchId.$error }">
            <v-select :options="branches" @input="selectedSearchType('FromBranchId', $event)" label="Description1"></v-select>
          </b-form-group>
        </b-col>
         <b-col v-if="insertVisible.FromWarehouseId != null ? insertVisible.FromWarehouseId : developmentMode" cols="12" md="4">
          <b-form-group :label="insertTitle.FromWarehouseId + (insertRequired.FromWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromWarehouseId.$error }">
            <v-select :options="warehouseList" @input="selectedSearchType('FromWarehouseId', $event)" label="Description1"></v-select>
           </b-form-group>
         </b-col>
         <b-col v-if="insertVisible.FromStatusId != null ? insertVisible.FromStatusId : developmentMode" cols="12" md="4">
           <b-form-group :label="insertTitle.FromStatusId + (insertRequired.FromStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.FromStatusId.$error }">
            <v-select :options="stockStatus" @input="selectedSearchType('FromStatusId', $event)" label="Description1"></v-select>
           </b-form-group>
         </b-col>
         <b-col v-if="insertVisible.ToBranchId != null ? insertVisible.ToBranchId : developmentMode" cols="12" md="4">
           <b-form-group :label="insertTitle.ToBranchId + (insertRequired.ToBranchId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToBranchId.$error }">
            <v-select :options="branches" @input="selectedSearchType('ToBranchId', $event)" label="Description1"></v-select>
           </b-form-group>
         </b-col>
         <b-col v-if="insertVisible.ToWarehouseId != null ? insertVisible.ToWarehouseId : developmentMode" cols="12" md="4">
           <b-form-group :label="insertTitle.ToWarehouseId + (insertRequired.ToWarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToWarehouseId.$error }">
            <v-select :options="warehouseList" @input="selectedSearchType('ToWarehouseId', $event)" label="Description1"></v-select>
           </b-form-group>
         </b-col>
         <b-col v-if="insertVisible.ToStatusId != null ? insertVisible.ToStatusId : developmentMode" cols="12" md="4">
           <b-form-group :label="insertTitle.ToStatusId + (insertRequired.ToStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ToStatusId.$error }">
            <v-select :options="stockStatus" @input="selectedSearchType('ToStatusId', $event)" label="Description1"></v-select>
           </b-form-group>
         </b-col>
       </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
       <b-tab :title="$t('insert.BranchStockTransfer.Items')" active>
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.BranchStockTransfer.ItemCode')">
              <v-select :options="items" @input="selectedItem" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.BranchStockTransfer.Items')">
              <v-select :options="items" @input="selectedItem" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.BranchStockTransfer.FromWhStockQuantity')">
              <b-form-input type="text" v-model="BranchStockTransferItems.FromWhStockQuantity" readonly/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.BranchStockTransfer.ToWhStockQuantity')">
              <b-form-input type="text" v-model="BranchStockTransferItems.ToWhStockQuantity" readonly/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.BranchStockTransfer.PlanQuantity')">
              <b-form-input type="text" v-model="BranchStockTransferItems.PlanQuantity" />
                </b-form-group>
              </b-col>
            <b-col cols="12" md="2" class="ml-auto">
                  <b-form-group>
                    <b-button @click="addItems()" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-table-simple responsive bordered small>
                    <b-thead>
                      <b-th><span>{{$t('insert.BranchStockTransfer.ItemCode')}}</span></b-th>
                      <b-th><span>{{$t('insert.BranchStockTransfer.Items')}}</span></b-th>
                      <b-th><span>{{$t('insert.BranchStockTransfer.FromWhStockQuantity')}}</span></b-th>
                      <b-th><span>{{$t('insert.BranchStockTransfer.ToWhStockQuantity')}}</span></b-th>
                      <b-th><span>{{$t('insert.BranchStockTransfer.PlanQuantity')}}</span></b-th>
                      <b-th><span>{{$t('list.operations')}}</span></b-th>
                    </b-thead>
                    <b-tbody>
                      <b-tr v-for="(r, i) in form.BranchStockTransferItems" :key="i">
                        <b-td>{{r.Description1}}</b-td>
                        <b-td>{{r.FromWhStockQuantity}}</b-td>
                        <b-td>{{r.ToWhStockQuantity}}</b-td>
                        <b-td>{{r.PlanQuantity}}</b-td>
                        <b-td class="text-center"><i @click="removeItems(r)" class="far fa-trash-alt text-danger"></i></b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        MovementNumber: null,
        GenExp1: null,
        StatusId: null,
        FromBranchId: null,
        FromWarehouseId: null,
        FromStatusId: null,
        ToBranchId: null,
        ToWarehouseId: null,
        ToStatusId: null,
        RepresentativeId: null,
        DocumentDate: null,
        MovementTime: null,
        BranchStockTransferItems: []
      },
      BranchStockTransferItems: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: null,
        Code: null,
        Description1: null,
        ItemId: null,
        LineNumber: 0,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: null,
        ConvFact2: null,
        FromWhStockQuantity: null,
        FromWhUnitId: null,
        ToWhStockQuantity: null,
        ToWhUnitId: null,
        Quantity: null
      },
      routeName: this.$route.meta.baseLink,
      dataStatus: null,
      tmpSelectedItem: [],
      planQuantity: null,
      detailPanelRecordId: 0
    }
  },
  computed: {
    ...mapState(['items', 'employees', 'stockStatus', 'BranchId', 'warehouseList', 'branches', 'developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNextBranch/api/${e}/GetCode`})

      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextBranch/api/Branch/Search', name: 'branches'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextStockManagement/api/StockStatus/Search', name: 'stockStatus'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextEmployee/api/Employee/Search', name: 'employees'})
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextItem/api/Item/Search', name: 'items'})
    },
    selectedType (label, model) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // standart dropdownların select işleminde alacağı değeri belirler.
      if (model) {
        this.form[label] = model.DecimalValue
      } else {
        this.form[label] = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        if (label === 'FromBranchId') {
          this.$store.dispatch('acWarehouse', {...this.query, searchField: 'BranchId', searchText: model.RecordId})
        }
        if (label === 'ToBranchId') {
          this.$store.dispatch('acWarehouse', {...this.query, searchField: 'BranchId', searchText: model.RecordId})
        } else {
          this.form[label] = null
        }
      } else {
        this.form[label] = null
      }
    },
    selectedItem (e) {
      if (e) {
        this.tmpSelectedItem = e
      } else {
        this.tmpSelectedItem = null
      }
    },
    addItems () {
      if (this.tmpSelectedItem.length < 1 || !this.BranchStockTransferItems.PlanQuantity) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        return
      }
      this.detailPanelRecordId++
      this.form.BranchStockTransferItems.push({
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        Code: this.tmpSelectedItem.Code,
        ItemId: this.tmpSelectedItem.RecordId,
        UnitSetId: this.tmpSelectedItem.UnitSetId,
        UnitId: null,
        PlanQuantity: this.BranchStockTransferItems.PlanQuantity,
        ConvFact1: 1,
        ConvFact2: 1,
        RecordId: this.detailPanelRecordId
      })
    },
    removeItems (item) {
      this.form.BranchStockTransferItems.splice(this.form.BranchStockTransferItems.indexOf(item), 1)
    },
    // Tablerin içerisinde eğer validasyon hatası varsa tabların kenarlarının kırmızı olmasını sağlayan fonksiyon
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
        this.tabValidation()
      } else {
        this.form.StatusId = this.checkConvertToNumber(this.form.StatusId)
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNextBranch/api/${this.routeName}`, formdata: model, return: this.routeName})
      }
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.MovementNumber = e
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        if (el !== 'MovementNumber') {
          this.form[el] = value[el]
        }
      })
    },
    // Status'un değerini true'dan 1'e çeviriyor
    dataStatus: function (e) {
      if (e === true) {
        this.form.StatusId = 1
      } else {
        this.form.StatusId = 0
      }
    }
  }
}
</script>
<style lang="sass">
</style>
