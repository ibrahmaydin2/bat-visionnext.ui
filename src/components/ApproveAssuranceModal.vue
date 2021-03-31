<template>
  <b-row>
    <b-col cols="12">
      <section>
        <b-row>
            <NextFormGroup :title="$t('insert.approveAssuranceModal.customerName')" :lg="4">
              <v-select :options="customers"  @search="searchCustomer" @input="selectedSearchType('CustomerId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
                <template v-slot:option="option">
                  {{option.Code + ' - ' + option.CommercialTitle + ' - ' + option.Description1}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.approveAssuranceModal.customerCode')" :lg="4">
              <b-form-input type="text" v-model="CustomerCode" disabled />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.approveAssuranceModal.customerArea')" :lg="4">
              <v-select :options="routeTypeOptions" @input="selectedCustomerRegion" label="Label"></v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.approveAssuranceModal.route')" :lg="4">
              <v-select :options="routes"  @search="searchRoute" @input="selectedSearchType('RoueteId', $event)" label="Description1">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.approveAssuranceModal.approveStateId')" :lg="4">
                <v-select
                  v-model="selectedApproveState"
                  :options="lookup.APPROVE_STATE"
                  @input="selectedType('ApproveStateId', $event)"
                  label="Label"
                />
            </NextFormGroup>
            <b-col>
                <b-button size="sm" class="float-right ml-2" variant="success">{{$t('insert.okay')}}</b-button>
                <b-button size="sm" class="float-right ml-2" variant="outline-danger">{{$t('insert.clean')}}</b-button>
                <b-button size="sm" class="float-right ml-2" variant="success">{{$t('insert.find')}}</b-button>
            </b-col>
        </b-row>
      </section>
    </b-col>
         <b-table
          :items="approveAssurances"
          :fields="approveAssuranceFields"
          select-mode="multi"
          responsive
          id="approveAssurance-list"
          :selectable="true"
          bordered
          tbody-tr-class="bg-white"
          @row-selected="onApproveAssuranceSelected"
        >
        <template #cell(selection)="row">
          <span>
            <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
          </span>
        </template>
      </b-table>
      <b-pagination
        :total-rows="approveAssurances ? approveAssurances.length : 0"
        v-model="currentPage"
        :per-page="10"
        aria-controls="approveAssurance-list"
      ></b-pagination>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import insertMixin from '../mixins/insert'
export default {
  mixins: [insertMixin],
  props: ['dataId'],
  data () {
    return {
      form: {
        CustomerId: null,
        customerRegion5Id: null,
        RouteId: null,
        ApproveStateId: null
      },
      CustomerCode: null,
      selectedApproveState: null,
      approveAssurances: [],
      selectedApproveAssurances: [],
      approveAssuranceFields: [
        {key: 'selection', label: '', sortable: false, visibility: true},
        {key: 'form.CustomerId', label: this.$t('insert.approveAssuranceModal.customerName'), sortable: false},
        {key: 'CustomerCode', label: this.$t('insert.approveAssuranceModal.customerCode'), sortable: false},
        {key: 'form.CustomerArea', label: this.$t('insert.approveAssuranceModal.customerArea'), sortable: false},
        {key: 'form.RouteId', label: this.$t('insert.approveAssuranceModal.route'), sortable: false},
        {key: 'form.ApproveStateId', label: this.$t('insert.approveAssuranceModal.approveStateId'), sortable: false}
      ]
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['customers', 'routes', 'routeTypeOptions'])
  },
  methods: {
    getData () {
      let payload = {
        name: 'routeTypeOptions',
        data: []
      }
      this.$store.dispatch('getLookups', {...this.query, type: 'CUSTOMER_REGION_5', name: payload.name})
    },
    searchCustomer (search, loading) {
      if (search.length < 3) {
        return false
      }
      loading(true)
      this.$store.dispatch('getSearchItems', {
        ...this.query,
        api: 'VisionNextCustomer/api/Customer/Search',
        name: 'customers',
        orConditionModels: [
          {
            Description1: search,
            Code: search,
            CommercialTitle: search
          }
        ]
      }).then(res => {
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
    selectedCustomerRegion (e) {
      if (e) {
        this.form.customerRegion5Id = e.DecimalValue
      } else {
        this.form.customerRegion5Id = null
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        if (label === 'CustomerId') {
          this.CustomerCode = model.Code
        }
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    onApproveAssuranceSelected (items) {
      this.selectedApproveAssurances = items
    }
  },
  watch: {
  }
}
</script>
