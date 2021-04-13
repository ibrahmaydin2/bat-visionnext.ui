<template>
  <b-modal id="kmModal" @show="show()" @hide="hide()" ref="kmModal" :title="modalAction && modalAction.Title" size="md" hide-footer no-close-on-backdrop>
    <div class="container">
      <b-row>
        <NextFormGroup :title="$t('insert.vehicles.oldKm')">
          <b-form-input type="text" v-model="oldKm" readonly />
        </NextFormGroup>
      </b-row>
      <b-row>
        <NextFormGroup :title="$t('insert.vehicles.newKm')" :error="$v.newKm">
          <b-form-input type="text" v-model="newKm" />
        </NextFormGroup>
      </b-row>
      <b-row class="mt-3">
        <div class="w-100 text-right">
          <b-button
            variant="danger"
            size="sm"
            @click="closeModal()"
          >
            {{$t('index.close')}}
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            @click="save()"
          >
            {{$t('list.save')}}
          </b-button>
        </div>
      </b-row>
    </div>
  </b-modal>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
export default {
  name: 'KmModal',
  mixins: [mixin],
  components: {
  },
  computed: {
    ...mapState([''])
  },
  props: {
    modalAction: {
      type: Object,
      default: () => {}
    },
    modalItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      oldKm: 0,
      newKm: 0,
      recordId: null
    }
  },
  validations () {
    return {
      newKm: {
        required
      }
    }
  },
  methods: {
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      let request = {
        'recordIds': [this.recordId],
        'model': {
          'EndKm': +this.newKm
        }
      }
      this.$api.postByUrl(request, 'VisionNextVehicle/api/VehicleKM/CustomUpdate').then((res) => {
        // if (res.IsCompleted === true) {
        //   this.$toasted.show(this.$t('insert.success'), {
        //     type: 'success',
        //     keepOnHover: true,
        //     duration: '3000'
        //   })
        //   setTimeout(() => {
        //     this.$router.go()
        //   }, 1000)
        // } else {
        //   this.$toasted.show(this.$t(res.Message), {
        //     type: 'error',
        //     keepOnHover: true,
        //     duration: '3000'
        //   })
        // }
      })
    },
    show () {
      let request = {
        'AndConditionModel': {
          'VehicleIds': [this.modalItem.RecordId]
        },
        'pagerecordCount': 1,
        'page': 1,
        'OrderByColumns': [
          {
            'column': 'OperationDate',
            'nestedColumn': 'OperationDate',
            'orderByType': 1
          }
        ]
      }
      this.$api.postByUrl(request, 'VisionNextVehicle/api/VehicleKM/Search').then((res) => {
        if (res.ListModel.BaseModels[0]) {
          this.oldKm = res.ListModel.BaseModels[0].EndKm
          this.recordId = res.ListModel.BaseModels[0].RecordId
        }
      })
    },
    hide () {
      this.oldKm = 0
      this.newKm = 0
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'kmModal')
    }
  }
}
</script>
<style scoped>
</style>
