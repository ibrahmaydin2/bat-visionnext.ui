<template>
  <b-modal v-if="modalAction" id="edi-order-approve-modal" @show="show" :title="modalAction.Title" size="xl" no-close-on-backdrop>
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
        <b-col md="12" lg="12">
          <b-button class="float-right mb-2" size="sm" variant="success" @click="getList"> <i class="fa fa-search"></i>{{$t('index.Convert.find')}}</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            id="order-list"
            ref="orderList"
            :items="list"
            :fields="fields"
            sticky-header
            select-mode="multi"
            :busy="tableBusy"
            @row-selected="onRowSelected"
            selectable
            :current-page="currentPage"
            :per-page="10"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
            <template v-slot:head(selection)>
              <b-link variant="white" size="sm" @click="selectAll">
                <span>
                  <i :class="allSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
              </span>
              </b-link>
            </template>
            <template #cell(selection)="row">
              <span>
                <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
              </span>
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
      <b-row v-if="showCancel" class="footer-input">
        <NextFormGroup :title="$t('insert.ediOrder.cancelType')" :required="true" :error="$v.cancelForm.cancelType" md="6" lg="6">
          <NextDropdown v-model="cancelForm.cancelType" url="VisionNextCommonApi/api/CancelReason/Search" />
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.ediOrder.cancelDate')" :required="true" :error="$v.cancelForm.cancelDate" md="6" lg="6">
          <NextDatePicker v-model="cancelForm.cancelDate"/>
        </NextFormGroup>
      </b-row>
      <div class="w-100 text-right">
        <b-button
          variant="danger"
          size="sm"
          @click="closeModal()"
        >
          {{$t('index.close')}}
        </b-button>
        <b-button
          :disabled="selectedList.length === 0 || showLoadingCancel"
          variant="warning"
          size="sm"
          @click="cancel()"
        >
          <span v-if="!showLoadingCancel">{{$t('index.cancel')}}</span>
          <b-spinner v-else small variant="default"></b-spinner>
        </b-button>
        <b-button
          :disabled="selectedList.length === 0 || showLoadingApprove"
          variant="primary"
          size="sm"
          @click="approve()"
        >
          <span v-if="!showLoadingApprove">{{$t('index.approve')}}</span>
          <b-spinner v-else small variant="default"></b-spinner>
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/index'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'EdiOrderApproveModal',
  mixins: [mixin],
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    documentDate: null
  },
  data () {
    return {
      list: [],
      form: {},
      selectedList: [],
      showLoadingCancel: false,
      showLoadingApprove: false,
      showCancel: false,
      cancelForm: {},
      tableBusy: false,
      fields: [
        {key: 'selection', label: ''},
        {
          key: 'Customer.Label',
          label: this.$t('insert.ediOrder.customer')
        },
        {
          key: 'OrderNumber',
          label: this.$t('insert.ediOrder.orderNumber')
        },
        {
          key: 'Description1',
          label: this.$t('insert.ediOrder.description1')
        },
        {
          key: 'DocumentNumber',
          label: this.$t('insert.ediOrder.documentNumber')
        },
        {
          key: 'DocumentDate',
          label: this.$t('insert.ediOrder.documentDate'),
          formatter: (value, key, item) => {
            return this.dateConvertFromTimezone(item.DocumentDate)
          }
        },
        {
          key: 'Representative.Label',
          label: this.$t('insert.ediOrder.representative')
        },
        {
          key: 'State.Label',
          label: this.$t('insert.ediOrder.state')
        },
        {
          key: 'Status.Label',
          label: this.$t('insert.ediOrder.status')
        }
      ],
      currentPage: 1,
      allSelected: false
    }
  },
  methods: {
    show () {
      this.form = {
        DocumentDate: this.documentDate
      }
      this.cancelForm = {}
      this.$v.cancelForm.$reset()
      this.list = []
      this.selectedList = []
      this.showLoadingCancel = false
      this.showLoadingApprove = false
      this.showCancel = false
      this.tableBusy = false
    },
    getList () {
      let documentDate = null
      this.allSelected = false
      this.$refs.orderList.clearSelected()
      this.selectedList = []
      if (this.form.DocumentDate && this.form.DocumentDate.length === 2) {
        documentDate = {
          BeginValue: this.form.DocumentDate[0],
          EndValue: this.form.DocumentDate[1]
        }
      }
      let request = {
        andConditionModel: {
          DocumentDate: documentDate,
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
    onRowSelected (list) {
      this.selectedList = list
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'edi-order-approve-modal')
    },
    approve () {
      this.$store.commit('setDisabledLoading', true)
      this.showLoadingApprove = true
      let request = {
        RecordIds: this.selectedList.map(s => s.RecordId)
      }
      this.$api.postByUrl(request, 'VisionNextOrder/api/EdiOrder/ApproveEdiOrder').then((response) => {
        this.showLoadingApprove = false
        this.$store.commit('setDisabledLoading', false)
        this.closeModal()
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('insert.ediOrder.successApprove'), { type: 'success', keepOnHover: true, duration: '3000' })
        }
      })
    },
    cancel () {
      this.showCancel = true
      this.$v.cancelForm.$touch()
      if (this.$v.cancelForm.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      this.$store.commit('setDisabledLoading', true)
      this.showLoadingCancel = true
      let request = {
        RecordIds: this.selectedList.map(s => s.RecordId),
        Model: {
          CancelReasonId: this.cancelForm.cancelType.RecordId,
          CanceledDatetime: this.cancelForm.cancelDate
        }
      }
      this.$api.postByUrl(request, 'VisionNextOrder/api/EdiOrder/Cancel').then((response) => {
        this.showLoadingCancel = false
        this.$store.commit('setDisabledLoading', false)
        this.showCancel = false
        this.$v.cancelForm.$reset()
        this.closeModal()
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('insert.ediOrder.successCancel'), { type: 'success', keepOnHover: true, duration: '3000' })
        }
      })
    },
    selectAll () {
      if (this.allSelected) {
        this.$refs.orderList.clearSelected()
      } else {
        this.$refs.orderList.selectAllRows()
      }

      this.allSelected = !this.allSelected
    }
  },
  validations: {
    cancelForm: {
      cancelType: {
        required
      },
      cancelDate: {
        required
      }
    }
  }
}
</script>
<style scoped>
.success-color {
  color: #28a745;
  font-size: medium;
}
.gray-color {
  color: lightgray;
  font-size: medium;
}
.footer-input {
  width: 100%;
}
</style>
