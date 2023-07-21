<template>
  <b-row class="asc__insertPage">
    <SalesMaximumExcelModal @success="successExcelImport"></SalesMaximumExcelModal>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'SalesMaximumQuantity' }">
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
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.Code')" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="true" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.Description1')" :error="$v.form.Description1">
            <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.StatusId')" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" :disabled="insertReadonly.StatusId" toggle/>
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.BeginDate')" :error="$v.form.BeginDate">
            <NextDatePicker v-model="form.BeginDate" :disabled="insertReadonly.BeginDate" />
          </NextFormGroup>
          <NextFormGroup :title="$t('insert.SalesMaximumQuantity.EndDate')" :error="$v.form.EndDate">
            <NextDatePicker v-model="form.EndDate" :disabled="insertReadonly.EndDate" />
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.SalesMaximumQuantity.CustomerList')">
          <b-row>
            <NextFormGroup :title="$t('insert.SalesMaximumQuantity.Code')" :error="$v.salesMaximum.Code">
              <NextInput v-model="salesMaximum.Code" :disabled="false" type="text" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.SalesMaxQuantity.CustomerId')" :error="$v.salesMaximum.CustomerId" :required="true">
              <NextDropdown
                v-model="salesMaximum.CustomerId"
                url="VisionNextCustomer/api/Customer/AutoCompleteSearch"
                :dynamicAndCondition="{ StatusId: [1] }"
                :custom-option="true"
                :is-customer="true"
                label="Description1"
              ></NextDropdown>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.SalesMaxQuantity.Quantity')" :error="$v.salesMaximum.Quantity">
              <NextInput v-model="salesMaximum.Quantity" type="number" />
            </NextFormGroup>
            <b-col cols="12" md="2" lg="2" class="text-right">
              <b-form-group>
                <AddDetailButton @click.native="addSalesMaximumQuantityCustomers" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2">
              <b-form-group>
                <b-button class="mt-4" size="sm" variant="success" v-b-modal.sales-maximum-excel-modal><i class="fas fa-file-pdf"/> {{$t('insert.creditBudget.uploadExcel')}}</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table-simple bordered small>
              <b-thead>
                <b-th><span>{{$t('insert.SalesMaximumQuantity.Code')}}</span></b-th>
                <b-th><span>{{$t('insert.SalesMaxQuantity.CustomerId')}}</span></b-th>
                <b-th><span>{{$t('insert.SalesMaxQuantity.Quantity')}}</span></b-th>
                <b-th><span>{{$t('list.operations')}}</span></b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(f, i) in (SalesMaximum ? SalesMaximum.filter(f => f.RecordState !== 4) : [])" :key="i">
                  <b-td>{{f.Code}}</b-td>
                  <b-td>{{f.Customer ? f.Customer.Label : f.CustomerName}}</b-td>
                  <b-td>{{f.Quantity}}</b-td>
                  <b-td class="text-center">
                    <b-button @click="editSalesMaximum(f)" class="btn mr-2 btn-warning btn-sm">
                      <i class="fa fa-pencil-alt"></i>
                    </b-button>
                    <b-button @click="removeSalesMaximum(f)" class="btn mr-2 btn-danger btn-sm">
                      <i class="far fa-trash-alt"></i>
                    </b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import updateMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
import { mapState } from 'vuex'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Delete: 0,
        System: 0,
        RecordState: 2,
        Code: null,
        Description1: null,
        StatusId: 1,
        CustomerId: null,
        BeginDate: null,
        EndDate: null,
        SalesMaximumQuantityCustomers: []
      },
      salesMaximumQuantityCustomersItems: detailData.salesMaximumQuantityCustomersItems,
      routeName1: 'Invoice',
      SalesMaximum: [],
      routeName2: 'SalesMaximumQuantity',
      importedExcel: false,
      insertedDetails: [],
      updatedDetails: [],
      salesMaximum: {
        Code: null,
        CustomerId: null,
        Quantity: null,
        isUpdated: false
      }
    }
  },
  computed: {
    ...mapState(['createCode'])
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    successExcelImport (data) {
      if (data) {
        let list = []
        console.log(data)
        console.log(this.SalesMaximum)
        Object.keys(data).map(d => {
          let obj = data[d]
          let existIndex = this.SalesMaximum.findIndex(c => c.CustomerId === obj.CustomerId)
          if (existIndex > -1) {
            let exist = this.SalesMaximum[existIndex]
            obj.RecordState = exist.RecordId ? 3 : 2
            obj.RecordId = exist.RecordId
            obj.CustomerId = exist.CustomerId
            obj.CustomerName = exist.CustomerName
            this.SalesMaximum.splice(existIndex, 1)
          } else {
            obj.RecordState = 2
          }
          obj.StatusId = 1
          obj.Deleted = 0
          obj.System = 0
          obj.isUpdated = true
          list.push(obj)
        })
        this.SalesMaximum = [...this.SalesMaximum, ...list]
        this.insertedDetails = this.SalesMaximum.filter(c => c.RecordState === 2)
        this.updatedDetails = this.SalesMaximum.filter(c => c.RecordState === 3 || c.RecordState === 4)
        this.totalRowCount = this.SalesMaximum.length
        this.importedExcel = true
        this.filterCustomer = null
      }
    },
    addSalesMaximumQuantityCustomers () {
      this.$v.salesMaximum.$touch()
      if (this.$v.salesMaximum.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      }
      let filteredArrSame = this.SalesMaximum.filter(i => i.CustomerId === this.salesMaximum.CustomerId.RecordId && !this.salesMaximum.isUpdated)
      if (filteredArrSame.length > 0) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.sameRecordError') })
        return false
      } else {
        let item = {
          Deleted: 0,
          System: 0,
          StatusId: 1,
          RecordId: this.salesMaximum.RecordId,
          RecordState: 2,
          CustomerId: this.salesMaximum.CustomerId.RecordId,
          CustomerName: this.salesMaximum.CustomerId.Description1,
          Code: this.salesMaximum.Code,
          Quantity: this.salesMaximum.Quantity
        }
        if (this.salesMaximum.isUpdated) {
          this.SalesMaximum[this.selectedIndex] = item
          this.selectedIndex = -1
          let filteredList = this.updatedDetails.filter(u => u.CustomerId === this.salesMaximum.CustomerId)
          if (filteredList.length > 0) {
            this.updatedDetails[this.updatedDetails.indexOf(filteredList[0])] = item
          } else {
            let data = {...item}
            this.updatedDetails.push(data)
          }
        } else {
          let filteredList = this.insertedDetails.filter(u => u.CustomerId === this.salesMaximum.CustomerId)
          if (!filteredList) {
            this.insertedDetails = item
          } else {
            let data = {...item}
            this.insertedDetails.push(data)
          }
          console.log(this.insertedDetails)
          console.log(item)
          this.SalesMaximum.push(item)
        }
        console.log(this.SalesMaximum)
        this.salesMaximum = {}
        this.$v.salesMaximum.$reset()
      }
    },
    editSalesMaximum (item) {
      this.selectedIndex = this.SalesMaximum.indexOf(item)
      this.salesMaximum = {
        Code: item.Code,
        CustomerId: item.CustomerId,
        RecordId: item.RecordId,
        Quantity: item.Quantity,
        isUpdated: true
      }
    },
    removeSalesMaximum (item) {
      this.selectedIndex = this.SalesMaximum.indexOf(item)
      if (item.RecordId > 0) {
        this.SalesMaximum[this.selectedIndex].RecordState = 4
        let filteredList = this.updatedDetails.filter(u => u.CustomerId === item.CustomerId)
        if (filteredList.length > 0) {
          this.updatedDetails[this.updatedDetails.indexOf(filteredList[0])].RecordState = 4
        } else {
          let data = {...item}
          data.RecordState = 4
          this.updatedDetails.push(data)
        }
      } else {
        this.SalesMaximum.splice(this.selectedIndex, 1)
        let filteredList = this.insertedDetails.filter(u => u.CustomerId === item.CustomerId)
        if (filteredList.length > 0) {
          this.insertedDetails.splice(this.insertedDetails.indexOf(filteredList[0]), 1)
        }
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.SalesMaximum = rowData.SalesMaximumQuantityCustomers
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        let list = [...this.insertedDetails, ...this.updatedDetails]
        this.form.SalesMaximumQuantityCustomers = list.map((item) => {
          let salesMaximumQuantity = {
            Code: item.Code,
            Quantity: item.Quantity,
            CustomerId: item.CustomerId,
            CustomerName: item.CustomerName,
            RecordState: item.RecordState === 4 ? 4 : item.RecordId > 0 ? 3 : 2,
            StatusId: 1,
            Deleted: 0,
            System: 0,
            RecordId: item.RecordId,
            SalesMaximum: item
          }

          return salesMaximumQuantity
        })
        this.updateData()
      }
    }
  },
  validations () {
    return {
      form: this.insertRules,
      salesMaximum: {
        Code: {
          required
        },
        CustomerId: {
          required
        },
        Quantity: {
          required
        }
      }
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.salesMaximum.Code = e
      }
    }
  }
}
</script>
