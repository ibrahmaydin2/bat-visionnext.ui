<template>
  <div>
    <b-form-group>
      <b-button class="mt-4" @click="showModal" variant="success" size="sm" :disabled="disabledButton">
        <i class="fa fa-file"></i> {{$t('index.customerMultipleSearch.title')}}
      </b-button>
    </b-form-group>
    <b-modal :id="`modal${id}`" size="lg" @hide="hide">
      <template #modal-title>
        {{$t('index.customerMultipleSearch.title')}}
      </template>
      <b-row>
        <NextFormGroup :title="$t('index.customerMultipleSearch.customerCodes')" md="12" lg="12" :required="true" :error="$v.searchValue">
          <NextTextArea v-model="searchValue" :rows="4"></NextTextArea>
        </NextFormGroup>
        <b-col cols="12" md="12">
          <b-form-group class="float-right">
            <b-button size="sm" variant="success" @click="search()" :disabled="isLoading">
              <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
              <span v-else><i class="fa fa-search"></i> {{$t('index.customerMultipleSearch.search')}}</span>
            </b-button>
            <b-button :disabled="list.length === 0" class="ml-2" size="sm" variant="success" @click="addItems()"><i class="fa fa-plus"></i> {{$t('index.customerMultipleSearch.add')}}</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-table
          :fields="fields"
          :items="list"
          striped
          small
          sticky-header="300px"
          responsive
          :current-page="currentPage"
          :per-page="100"
          :busy="tableBusy">
          <template #head()="data">
            {{$t(data.label)}}
          </template>
          <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
        </b-table>
        <b-pagination
          v-if="list.length > 0"
          :total-rows="totalRowCount"
          v-model="currentPage"
          :per-page="100"
          :aria-controls="id"
          :disabled="tableBusy"
        ></b-pagination>
      </b-row>
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide(`modal${id}`)">{{$t('insert.cancel')}}</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import mixin from '../mixins/index'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'NextCustomerMultipleSearch',
  mixins: [mixin],
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
      description: 'v-model'
    },
    disabledButton: {
      type: Boolean,
      default: false,
      description: 'Toplu Ekle butonu için disabled özelliği'
    },
    dynamicAndCondition: {
      type: Object,
      default: () => { return {} },
      description: 'Search apisi için sayfaya özel and condition bilgisi'
    },
    convertedValues: {
      type: Array,
      default: () => { return [] },
      description: 'Liste set ederken alanların belirlenmesi'
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      fields: [
        {
          key: 'Code',
          label: this.$t('index.customerMultipleSearch.customerCode')
        },
        {
          key: 'CommercialTitle',
          label: this.$t('index.customerMultipleSearch.commercialTitle')
        },
        {
          key: 'DefaultLocation',
          label: this.$t('index.customerMultipleSearch.location'),
          formatter: (value, key, obj) => {
            return obj.DefaultLocation ? obj.DefaultLocation.Label : '-'
          }
        }
      ],
      list: [],
      id: Math.random().toString(36).substring(2),
      currentPage: 1,
      isLoading: false,
      totalRowCount: 0,
      tableBusy: false,
      searchValue: null
    }
  },
  methods: {
    search () {
      this.$v.searchValue.$touch()
      if (this.$v.searchValue.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }

      let request = {
        model: {
          Codes: this.searchValue.split(/\r?\n/),
          ...this.dynamicAndCondition
        }
      }

      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, 'VisionNextCustomer/api/Customer/CustomerCopyPaste', 10000).then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        this.tableBusy = false

        if (response.RecordIds && response.RecordIds.length > 0) {
          this.getList(response.RecordIds)
        } else {
          this.showSearchIsEmptyMessage()
        }
      })
    },
    getList (recordIds) {
      let request = {
        andConditionModel: {
          RecordIds: recordIds,
          ...this.dynamicAndCondition
        }
      }

      this.isLoading = true
      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, 'VisionNextCustomer/api/Customer/GetBranchesCustomerSearch', 10000).then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        this.tableBusy = false

        if (response.ListModel) {
          this.list = response.ListModel.BaseModels
          this.totalRowCount = response.ListModel.TotalRowCount
        } else {
          this.showSearchIsEmptyMessage()
        }
      })
    },
    showSearchIsEmptyMessage () {
      this.$toasted.show(this.$t('index.customerMultipleSearch.emptyMessage'), {
        type: 'error',
        keepOnHover: true,
        duration: '3000'
      })
    },
    hide () {
      this.list = []
      this.searchValue = null
      this.currentPage = 1
      this.totalRowCount = 0
      this.$v.searchValue.$reset()
    },
    showModal () {
      this.$bvModal.show(`modal${this.id}`)
    },
    closeModal () {
      this.$bvModal.hide(`modal${this.id}`)
    },
    addItems () {
      let list = this.list.map(l => {
        let data = {
          ...l,
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1
        }

        if (this.convertedValues.length > 0) {
          this.convertedValues.map(c => {
            data[c.mainProperty] = c.convert(l)
          })
        }

        return data
      })
      this.$emit('valuechange', list)
      this.closeModal()
    }
  },
  validations () {
    return {
      searchValue: {
        required
      }
    }
  },
  watch: {
    value: {
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.values = newValue
        }
      },
      deep: true,
      immediate: true
    },
    currentPage () {
      this.allSelected = false
      this.getList(true)
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
.error, .error input {
  border-color: red;
  border-width: 2px;
}
</style>
