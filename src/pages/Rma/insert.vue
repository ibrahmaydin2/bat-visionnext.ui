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
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="4" lg="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('firsttab')" :active="!developmentMode">
          <b-row>
            <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.CustomerId + (insertRequired.CustomerId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                <v-select :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.WarehouseId != null ? insertVisible.WarehouseId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.WarehouseId + (insertRequired.WarehouseId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.WarehouseId.$error }">
                <v-select :options="warehouses"  @search="searchWarehouse" @input="selectedSearchType('WarehouseId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RepresentativeId != null ? insertVisible.RepresentativeId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.RepresentativeId + (insertRequired.RepresentativeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RepresentativeId.$error }">
                <v-select :options="employees"  @search="searchEmployee" @input="selectedSearchType('RepresentativeId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RmaStatusId != null ? insertVisible.RmaStatusId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.RmaStatusId + (insertRequired.RmaStatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RmaStatusId.$error }">
                <v-select
                  :options="lookup.RMA_STATUS"
                  @input="selectedType('RmaStatusId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ApproveEmployeeId != null ? insertVisible.ApproveEmployeeId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ApproveEmployeeId + (insertRequired.ApproveEmployeeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ApproveEmployeeId.$error }">
                <v-select :options="employees"  @search="searchEmployee" @input="selectedSearchType('ApproveEmployeeId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ApproveNumber != null ? insertVisible.ApproveNumber : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ApproveNumber + (insertRequired.ApproveNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ApproveNumber.$error }">
                <b-form-input type="text" v-model="form.ApproveNumber" :readonly="insertReadonly.ApproveNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RmaTypeId != null ? insertVisible.RmaTypeId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.RmaTypeId + (insertRequired.RmaTypeId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RmaTypeId.$error }">
                <v-select
                  :options="lookup.RETURN_TYPE"
                  @input="selectedType('RmaTypeId', $event)"
                  label="Label"
                />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.ApproveDate != null ? insertVisible.ApproveDate : developmentMode" :start-weekday="1" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.ApproveDate + (insertRequired.ApproveDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.ApproveDate.$error }">
                <b-form-datepicker v-model="form.ApproveDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.PriceDate != null ? insertVisible.PriceDate : developmentMode" :start-weekday="1" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.PriceDate + (insertRequired.PriceDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.PriceDate.$error }">
                <b-form-datepicker v-model="form.PriceDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Genexp1 != null ? insertVisible.Genexp1 : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.Genexp1 + (insertRequired.Genexp1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Genexp1.$error }">
                <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RmaDate != null ? insertVisible.RmaDate : developmentMode" :start-weekday="1" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.RmaDate + (insertRequired.RmaDate === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RmaDate.$error }">
                <b-form-datepicker v-model="form.RmaDate" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.GrvNumber != null ? insertVisible.GrvNumber : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.GrvNumber + (insertRequired.GrvNumber === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.GrvNumber.$error }">
                <b-form-input type="text" v-model="form.GrvNumber" :readonly="insertReadonly.GrvNumber" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RouteId != null ? insertVisible.RouteId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.RouteId + (insertRequired.RouteId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RouteId.$error }">
                <v-select :options="routes"  @search="searchRoute" @input="selectedSearchType('RouteId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.RmaReasonId != null ? insertVisible.RmaReasonId : developmentMode" cols="12" md="4" lg="3">
              <b-form-group :label="insertTitle.RmaReasonId + (insertRequired.RmaReasonId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.RmaReasonId.$error }">
                <v-select :options="rmaReasons"  @search="searchRmaReason" @input="selectedSearchType('RmaReasonId', $event)" label="Description1">
                  <template slot="no-options">
                    {{$t('insert.min3')}}
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab v-if="developmentMode" :active="developmentMode" title="all inputs">
          <b-row>
            <b-col>
              <pre v-if="developmentMode" class="asc__codeHTML">
                <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
                  {{codeInCode}}
                </span>
              </pre>
            </b-col>
          </b-row>
          <b-row>
          </b-row>
          <b-row>
            <b-col>
              <code>{{form}}</code>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <h3>Form Elements</h3>
              <p>
                {{insertFormdata}}
              </p>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        CustomerId: null,
        WarehouseId: null,
        RepresentativeId: null,
        RmaStatusId: null,
        ApproveEmployeeId: null,
        ApproveNumber: null,
        RmaTypeId: null,
        ApproveDate: null,
        PriceDate: null,
        Genexp1: null,
        RmaDate: null,
        GrvNumber: null,
        RouteId: null,
        RmaReasonId: null,
        RmaLines: []
      },
      RmaLines: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        StatusId: 1,
        LineNumber: 0,
        ItemId: null,
        RmaReasonId: null,
        UnitSetId: null,
        UnitId: null,
        ConvFact1: 1,
        ConvFact2: 1,
        Quantity: null,
        RmaQuantity1: null,
        RmaUnit1Id: null,
        Price: null
      }
    }
  },
  computed: {
    // search items gibi yapılarda state e maplemek için kullanılır. İhtiyaç yoksa silinebilir.
    ...mapState(['customers', 'employees', 'warehouses', 'routes', 'rmaReasons'])
  },
  mounted () {
    this.createManualCode()
    // update işlemiyse
    // this.getData().then(() => {})
    this.getInsertPage(this.routeName)
  },
  methods: {
    searchEmployee (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextEmployee/api/Employee/Search', 'employees', model).then(res => {
        loading(false)
      })
    },
    searchWarehouse (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextWarehouse/api/Warehouse/Search', 'warehouses', model).then(res => {
        loading(false)
      })
    },
    searchRoute (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextRoute/api/Route/Search', 'routes', model).then(res => {
        loading(false)
      })
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextCustomer/api/Customer/Search', 'customers', model).then(res => {
        loading(false)
      })
    },
    searchRmaReason (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      let model = {
        Description1: search
      }
      this.searchItemsByModel('VisionNextRma/api/RmaReason/Search', 'rmaReasons', model).then(res => {
        loading(false)
      })
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.createData()
        // update işlemiyse
        // this.updateData()
      }
    }
  },
  validations () {
    // Eğer Detay Panelde validasyon yapılacaksa kullanılmalı. Detay Panel yoksa silinebilir.
    return {
      form: this.insertRules
    }
  }
}
</script>
