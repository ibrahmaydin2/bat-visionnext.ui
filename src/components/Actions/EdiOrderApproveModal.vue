<template>
  <b-modal v-if="modalAction" id="edi-order-approve-modal" :title="modalAction.Title" size="xl" no-close-on-backdrop>
    <section>
      <b-row>
        <NextFormGroup :title="$t('insert.ediOrder.customer')" md="3" lg="3">
          <NextDropdown url="VisionNextCustomer/api/Customer/AutoCompleteSearch" searchable @input="selectedSarchType('CustomerId', $event)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.orderNumber')" md="3" lg="3">
          <NextInput type="text" v-model="form.OrderNumber" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.description1')" md="3" lg="3">
          <NextInput type="text" v-model="form.Description1" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.documentNumber')" md="3" lg="3">
          <NextInput type="text" v-model="form.DocumentNumber" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.documentDate')" md="3" lg="3">
          <NextDatePicker v-model="form.DocumentDate" :range="true" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.representative')" md="3" lg="3">
          <NextDropdown url="VisionNextEmployee/api/Employee/AutoCompleteSearch" searchable @input="selectedSarchType('RepresentativeId', $event)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.state')" md="3" lg="3">
          <NextDropdown url="VisionNextOrder/api/OrderState/AutoCompleteSearch" @input="selectedSarchType('StateId', $event)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.status')" md="3" lg="3">
          <NextDropdown url="VisionNextOrder/api/OrderStatus/AutoCompleteSearch" @input="selectedSarchType('StatusId', $event)"/>
        </NextFormGroup>
        <b-col class="pull-right" md="12" lg="12">
          <b-button size="sm" variant="success" @click="getList"> <i class="fa fa-search"></i>{{$t('index.Convert.find')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            id="order-list"
            :items="list"
            :fields="fields"
            sticky-header
            selection-mode="multi"
            @row-selected="onRowSelected"
            selectable
            :busy="tableBusy"
            :current-page="currentPage"
            :per-page="10"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
          </b-table>
          <b-pagination
            :total-rows="list ? list.length : 0"
            v-model="currentPage"
            :per-page="10"
            aria-controls="order-list"
          ></b-pagination>
        </b-col>
      </b-row>
    </section>
    <template #modal-footer>
      <div class="w-100 text-right">
        <b-button
          variant="danger"
          size="sm"
          @click="closeModal()"
        >
          {{$t('index.close')}}
        </b-button>
        <b-button
          :disabled="!form || !form.RecordId  || form.RecordId === 0"
          variant="primary"
          size="sm"
          @click="submitModal()"
        >
          {{$t('index.approve')}}
          <b-spinner v-if="showLoading" small variant="primary"></b-spinner>
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/index'
export default {
  name: 'EdiOrderApproveModal',
  mixins: [mixin],
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    recordIds: {
      type: Array,
      default: () => []
    },
    documentDate: null
  },
  data () {
    return {
      list: [],
      form: {},
      tableBusy: false,
      showLoading: false,
      fields: [
        {
          key: 'Customer.Label',
          label: this.$t('insert.ediOrder.customer')
        },
        {
          key: 'OrderNumber',
          label: this.$t('insert.ediOrder.orderNumber'),
          sortable: true
        },
        {
          key: 'Description1',
          label: this.$t('insert.ediOrder.description1'),
          sortable: true
        },
        {
          key: 'DocumentNumber',
          label: this.$t('insert.ediOrder.documentNumber'),
          sortable: true
        },
        {
          key: 'DocumentDate',
          label: this.$t('insert.ediOrder.documentDate'),
          sortable: true,
          formatter: (value, key, item) => {
            return this.dateConvertFromTimezone(item.DocumentDate)
          }
        },
        {
          key: 'Representative.Label',
          label: this.$t('insert.ediOrder.representative'),
          sortable: true
        },
        {
          key: 'State.Label',
          label: this.$t('insert.ediOrder.state'),
          sortable: true
        },
        {
          key: 'Status.Label',
          label: this.$t('insert.ediOrder.status'),
          sortable: true
        }
      ],
      currentPage: 1
    }
  },
  mounted () {
    debugger
    this.form.DocumentDate = this.documentDate
  },
  methods: {
    getList () {
      let documentDate = null
      if (this.form.DocumentDate && this.form.DocumentDate.length === 2) {
        documentDate = {
          BeginValue: this.form.DocumentDate[0],
          EndValue: this.form.DocumentDate[1]
        }
      }
      let request = {
        andConditionModel: {
          DocumentDate: documentDate,
          RecordIds: this.recordIds,
          CustomerIds: this.form.CustomerId ? [this.form.CustomerId] : null,
          OrderNumber: this.form.OrderNumber,
          Description1: this.form.Description1,
          DocumentNumber: this.form.DocumentNumber,
          RepresentativeIds: this.form.RepresentativeId ? [this.form.RepresentativeId] : null,
          StateIds: this.form.StateId ? [this.form.StateId] : null,
          StatusIds: this.form.StatusId ? [this.form.StatusId] : null
        }
      }
      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, 'VisionNextOrder/api/EdiOrder/Search').then((response) => {
        this.tableBusy = false
        this.$store.commit('setDisabledLoading', false)
        if (response.ListModel) {
          this.list = response.ListModel.BaseModels
        } else {
          this.$toasted.show(this.$t('general.noRecord'), { type: 'error', keepOnHover: true, duration: '3000' })
        }
      })
    },
    onRowSelected (data) {

    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'edi-order-approve-modal')
    }
  }
}
</script>
