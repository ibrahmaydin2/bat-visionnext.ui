<template>
  <b-modal id="assign-employee-modal" @show="checkServiceStateControl()" @hide="hide" :title="modalAction.Title" size="md" hide-footer no-close-on-backdrop>
    <b-row>
      <NextFormGroup :title="$t('insert.assetService.employee')" md="6" lg="6" :required="true" :error="$v.employee">
        <NextDropdown v-model="employee" :source="employees"/>
      </NextFormGroup>
      <b-col cols="12" md="6" lg="6">
        <b-form-group>
          <b-button
            @click="assignEmployee"
            id="assignButton"
            class="mt-4"
            size="sm"
            variant="success"
            :disabled="isLoading">
              <span v-if="isLoading"><b-spinner small></b-spinner></span>
              <span v-else><i class="fa fa-list"> </i> {{$t('insert.assetService.assignEmployee')}}</span>
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/index'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AssignEmployeeModal',
  mixins: [mixin],
  props: {
    modalAction: {
      type: Object,
      default: () => {},
      description: 'Sayfadan seçilen action bilgisi'
    },
    modalItem: {
      type: Object,
      default: () => {},
      description: 'Listeden seçilen eleman bilgisi'
    }
  },
  mounted () {
    this.checkServiceStateControl()
  },
  data () {
    return {
      employee: null,
      employees: [],
      isLoading: false
    }
  },
  methods: {
    checkServiceStateControl () {
      let request = {
        ServiceId: this.modalItem.RecordId
      }

      this.$api.postByUrl(request, 'VisionNextAsset/api/Service/ServiceStateControl').then((response) => {
        if (response.IsCompleted) {
          this.getEmployees()
        } else {
          this.closeModal()
        }
      })
    },
    getEmployees () {
      let request = {
        model: {
          CustomerId: this.modalItem.CustomerId
        }
      }

      this.$api.postByUrl(request, 'VisionNextEmployee/api/Employee/GetServiceEmployeeList').then((response) => {
        this.employees = response.Employees
      })
    },
    assignEmployee () {
      this.$v.employee.$touch()
      if (this.$v.employee.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }

      let request = {
        model: {
          ServiceId: this.modalItem.RecordId,
          EmployeeId: this.employee.RecordId
        }
      }
      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.$api.postByUrl(request, 'VisionNextAsset/api/Service/AssignStaffToService').then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        if (response.IsCompleted) {
          this.$toasted.show(this.$t('insert.assetService.successAssignEmployee'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          this.closeModal()
        }
      }).catch(() => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
      })
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'assign-employee-modal')
    },
    hide () {
      this.employee = null
      this.employees = []
    }
  },
  validations () {
    return {
      employee: {
        required
      }
    }
  }
}
</script>
