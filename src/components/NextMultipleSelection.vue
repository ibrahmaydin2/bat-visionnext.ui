<template>
  <div>
    <b-form-group>
      <b-button class="mt-4" @click="showModal" variant="success" size="sm" :disabled="disabledButton">
        <i class="fa fa-plus"></i> {{$t('insert.multipleGrid.title')}}
      </b-button>
    </b-form-group>
    <b-modal :id="`modal${id}`" size="xl" @hide="hide">
      <template #modal-title>
        {{action.Title}}
      </template>
      <b-row>
        <NextFormGroup v-for="(item,i) in searchItems" :key="i" :title="item.Label" :required="item.Required" :error="$v.form[item.modelControlUtil ? item.modelControlUtil.ModelProperty : item.EntityProperty]">
          <div v-if="item.modelControlUtil != null">
            <NextDropdown
              v-if="item.modelControlUtil.InputType === 'AutoComplete'"
              :default-value="item.DefaultValue"
              :url="item.modelControlUtil.ServiceUrl" searchable :disabled="item.disabled"
              @input="selectDropdown($event, item)"
              custom-option
              :dynamic-and-condition="getCondtionModel(item.modelControlUtil.AndConditions)">
            </NextDropdown>
             <NextDropdown
              v-else-if="item.modelControlUtil.IsLookupTable"
              :default-value="item.DefaultValue"
              :lookup-key="item.modelControlUtil.Code" :disabled="item.disabled"
              :get-lookup="true"
              @input="selectDropdown($event, item)">
            </NextDropdown>
             <NextDropdown
              v-else
              :default-value="item.DefaultValue"
              :url="item.modelControlUtil.ServiceUrl" :disabled="item.disabled"
              @input="selectDropdown($event, item)"
              custom-option
              :dynamic-and-condition="getCondtionModel(item.modelControlUtil.AndConditions)">
            </NextDropdown>
          </div>
          <NextCheckBox v-if="item.ColumnType === 'Boolean'" v-model="form[item.EntityProperty]" type="number" toggle ></NextCheckBox>
          <NextDatePicker v-if="item.ColumnType === 'DateTime'" v-model="form[item.EntityProperty]"></NextDatePicker>
          <NextTimePicker v-if="item.ColumnType === 'Time'" v-model="form[item.EntityProperty]"></NextTimePicker>
          <NextInput v-if="item.ColumnType === 'String'" type="text" v-model="form[item.EntityProperty]"></NextInput>
          <NextInput v-if="item.ColumnType === 'Decimal'" type="number" v-model="form[item.EntityProperty]"></NextInput>
        </NextFormGroup>
        <b-col cols="12" md="12">
          <b-form-group class="float-right">
            <b-button size="sm" variant="success" @click="getList()" :disabled="isLoading">
              <span v-if="isLoading"><b-spinner small></b-spinner> {{$t('index.loading')}}</span>
              <span v-else><i class="fa fa-search"></i> {{$t('insert.multipleGrid.search')}}</span></b-button>
            <b-button :disabled="selectedList.length === 0" class="ml-2" size="sm" variant="success" @click="addItems()"><i class="fa fa-plus"></i> {{$t('insert.multipleGrid.add')}}</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-table
          :ref="`multipleGrid${id}`"
          :fields="fields"
          :items="list"
          striped
          small
          sticky-header="300px"
          responsive
          :current-page="currentPage"
          select-mode="multi"
          :selectable="true"
          @row-selected="rowSelected"
          :per-page="0"
          :busy="tableBusy">
          <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
          <template #cell(selection)="row">
            <span>
              <i :class="row.rowSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
            </span>
          </template>
          <template v-slot:head()="data">
            <b-link v-if="data.field.key == 'selection'" variant="white" size="sm" @click="selectAll">
              <span>
                <i :class="allSelected ? 'fa fa-check-circle success-color' : 'fa fa-check-circle gray-color'"></i>
              </span>
            </b-link>
            <b-link v-else-if="showClickableColumn(data)" variant="white" size="sm" @click="columnClick(data.field.key)">
              <span>
                {{data.field.label}}
              </span>
            </b-link>
            <span v-else>{{data.field.label}}</span>
          </template>
          <template #cell()="data">
            <div v-if="data.field.column && data.field.column.Enabled">
              <div v-if="data.field.column.modelControlUtil != null">
                 <NextDropdown
                  :tabindex="data.index+1"
                  v-if="data.field.column.modelControlUtil.IsLookupTable"
                  v-model="data.item[data.field.key]"
                  :lookup-key="data.field.column.modelControlUtil.Code"
                  reduce-value="DecimalValue"
                  @input="setConvertedValues($event, data)" :get-lookup="true">
                </NextDropdown>
                 <NextDropdown
                  v-else
                  :tabindex="data.index+1"
                  v-model="data.item[data.field.key]"
                  :url="data.field.column.modelControlUtil.ServiceUrl"
                  @input="setConvertedValues($event, data)"
                  reduce-value="RecordId"
                  custom-option>
                </NextDropdown>
              </div>
              <NextCheckBox :tabindex="data.index+1" v-if="data.field.column.ColumnType === 'Boolean'" type="number" toggle v-model="data.item[data.field.key]" @input="setConvertedValues($event, data)"></NextCheckBox>
              <NextDatePicker :tabindex="data.index+1" v-if="data.field.column.ColumnType === 'DateTime'" v-model="data.item[data.field.key]" @input="setConvertedValues($event, data)"></NextDatePicker>
              <NextTimePicker :tabindex="data.index+1" v-if="data.field.column.ColumnType === 'Time'" v-model="data.item[data.field.key]" @input="setConvertedValues($event, data)"></NextTimePicker>
              <NextInput
                :tabindex="data.index+1"
                :ref="`NextInput${data.index}`"
                v-if="data.field.column.ColumnType === 'String' || data.field.column.ColumnType === 'Decimal'"
                v-model="data.item[data.field.key]"
                @input="setConvertedValues($event, data)"
                type="number"
                :input-class="data.item.class"></NextInput>
            </div>
            <span v-else v-html="data.value"></span>
          </template>
        </b-table>
        <b-pagination
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
import { requiredIf } from 'vuelidate/lib/validators'
export default {
  name: 'NextMultipleSelection',
  mixins: [mixin],
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
      description: 'v-model'
    },
    name: {
      type: String,
      description: 'Konfigurasyon Adı'
    },
    disabledButton: {
      type: Boolean,
      default: false,
      description: 'Toplu Ekle butonu için disabled özelliği'
    },
    hiddenValues: {
      type: Array,
      default: () => {
        return []
      },
      description: 'Gridde olmayan ancak listede olması gereken extra alanlar'
    },
    convertedValues: {
      type: Array,
      default: () => { return [] },
      description: 'Griddeki input girişine göre setlenen alanlar'
    },
    dynamicAndCondition: {
      type: Object,
      default: () => { return {} },
      description: 'Search apisi için sayfaya özel and condition bilgisi'
    },
    validations: {
      type: Array,
      default: () => { return [] },
      description: 'Grid inputları için işletilmesi gereken sayfa validasyonları'
    },
    clickableColumns: {
      type: Array,
      default: () => { return [] },
      description: 'Grid kolonlarının hangilerinin tıklanabildiği bilgisi'
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      form: {},
      action: {},
      searchItems: [],
      listItems: [],
      fields: [],
      list: [],
      id: Math.random().toString(36).substring(2),
      currentPage: 1,
      selectedList: [],
      isLoading: false,
      allSelected: false,
      totalRowCount: 0,
      pagingRequest: {},
      allList: {},
      tableBusy: false
    }
  },
  methods: {
    getFormFields () {
      this.$api.getByUrl(`VisionNextUIOperations/api/UiOperationGroupUser/GetFormMultipleSelectFields?name=${this.name}`).then(response => {
        this.action = response.Action
        this.searchItems = response.SearchItems
        this.listItems = response.ListItems
        this.fields = this.listItems.sort((a, b) => {
          return a.UiControlOrder < b.UiControlOrder
        }).map(item => {
          return {
            key: item.EntityProperty,
            label: item.Label,
            formatter: (value, key, obj) => {
              if (item.ColumnType === 'Object') {
                if (obj[item.EntityProperty]) {
                  return obj[item.EntityProperty].Label
                } else {
                  let filteredArr = this.hiddenValues.filter(h => h.mainProperty === item.EntityProperty)
                  let value = ''
                  filteredArr.forEach(f => {
                    if (obj[f.targetProperty]) {
                      value = obj[f.targetProperty]
                    }
                  })
                  return value
                }
              } else {
                if (obj[item.EntityProperty] || obj[item.EntityProperty] === 0) {
                  return obj[item.EntityProperty]
                } else {
                  let filteredArr = this.hiddenValues.filter(h => h.mainProperty === item.EntityProperty)
                  let value = ''
                  filteredArr.forEach(f => {
                    if (obj[f.targetProperty]) {
                      value = obj[f.targetProperty]
                    }
                  })
                  return value
                }
              }
            },
            column: item
          }
        })
        this.fields.unshift({
          key: 'selection',
          label: ''
        })
      })
    },
    selectDropdown (data, item) {
      let isLookupTable = item.modelControlUtil.IsLookupTable
      let valueProperty = isLookupTable ? 'DecimalValue' : 'RecordId'
      if (data) {
        this.form[item.modelControlUtil.ModelProperty] = [data[valueProperty]]
      } else {
        this.form[item.modelControlUtil.ModelProperty] = null
      }
    },
    getList (isPaging) {
      this.$v.form.$touch()
      let request = null

      if (!isPaging) {
        if (this.$v.form.$error) {
          this.$toasted.show(this.$t('insert.requiredFields'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }

        request = {
          andConditionModel: {
            ...this.form,
            ...this.dynamicAndCondition,
            ...this.getCondtionModel(this.action.AndConditionModels)
          },
          orConditionModel: this.getCondtionModel(this.action.OrConditionModels)
        }

        this.isLoading = true
        request.page = 1
        this.currentPage = 1
        this.pagingRequest = request
        this.allList = {}
      } else {
        request = this.pagingRequest
        request.page = this.currentPage
      }

      if (this.allList[this.currentPage]) {
        this.list = this.allList[this.currentPage]
        return
      }

      this.$store.commit('setDisabledLoading', true)
      this.tableBusy = true
      this.$api.postByUrl(request, this.action.ActionUrl, 100).then((response) => {
        this.isLoading = false
        this.$store.commit('setDisabledLoading', false)
        this.tableBusy = false

        if (response.ListModel) {
          this.totalRowCount = response.ListModel.TotalRowCount
          this.list = response.ListModel.BaseModels.map(item => {
            this.hiddenValues.forEach(h => {
              if (h.defaultValue) {
                item[h.targetProperty] = h.defaultValue
              } else {
                item[h.targetProperty] = item[h.mainProperty]
              }
            })

            return item
          })
          this.allList[this.currentPage] = this.list
        }
      })
    },
    hide () {
      this.list = []
      this.form = {}
      this.$v.form.$reset()
    },
    showModal () {
      this.getFormFields()
      this.$bvModal.show(`modal${this.id}`)
      setTimeout(() => {
        this.list = this.value
        setTimeout(() => {
          this.$refs[`multipleGrid${this.id}`].selectAllRows()
        }, 10)
      }, 10)
    },
    closeModal () {
      this.$bvModal.hide(`modal${this.id}`)
    },
    setConvertedValues (value, data) {
      let property = data.field.key
      let index = data.index

      if (this.convertedValues.length > 0) {
        let list = [...this.list]
        this.list = []

        this.convertedValues.forEach(c => {
          if (c.mainProperty === property) {
            list[index][c.targetProperty] = c.getValue(value, list[index])
          }
        })

        this.list = list

        setTimeout(() => {
          let filteredList = this.listItems ? this.listItems.filter(l => l.Enabled) : []
          let validCount = 0

          filteredList.forEach(item => {
            let itemValue = this.list[data.index][item.EntityProperty]
            if (itemValue && itemValue !== '' && itemValue !== '0') {
              validCount++
            }
          })

          if (validCount === filteredList.length) {
            this.$refs[`multipleGrid${this.id}`].selectRow(data.index)
          } else {
            this.$refs[`multipleGrid${this.id}`].unselectRow(data.index)
          }
        }, 10)

        if (this.validations.length > 0) {
          this.validations.forEach(c => {
            if (c.mainProperty === property) {
              let result = c.validation(value, list[index])
              list[index].class = result ? '' : 'error'
              this.$forceUpdate()
            }
          })
        }
      }
    },
    rowSelected (data) {
      this.selectedList = data
    },
    selectAll () {
      if (this.allSelected) {
        this.$refs[`multipleGrid${this.id}`].clearSelected()
      } else {
        this.$refs[`multipleGrid${this.id}`].selectAllRows()
      }

      this.allSelected = !this.allSelected
    },
    addItems () {
      for (let i = 0; i < this.list.length; i++) {
        let ref = this.$refs[`NextInput${i}`]
        if (ref && ref.inputClass === 'error') {
          this.$toasted.show(this.$t('insert.multipleGrid.validationError'), {
            type: 'error',
            keepOnHover: true,
            duration: '3000'
          })
          return
        }
      }
      this.selectedList = this.selectedList.map(s => {
        s.Deleted = 0
        s.System = 0
        s.RecordState = 2
        s.StatusId = 1
        return s
      })
      this.$emit('valuechange', this.selectedList)
      this.closeModal()
    },
    getCondtionModel (conditionModel) {
      let model = {}
      if (conditionModel) {
        model = JSON.parse(`{${decodeURI(conditionModel)}}`)
      }
      return model
    },
    columnClick (column) {
      let clickableColumn = this.clickableColumns.find(f => f.mainProperty === column)
      let listItem = this.listItems.find(l => l.EntityProperty === clickableColumn.targetProperty)
      this.list = this.list.map(l => {
        let value = l[clickableColumn.mainProperty]
        l[clickableColumn.targetProperty] = !value && listItem.ColumnType === 'Decimal' ? 0 : value
        return l
      })
    },
    showClickableColumn (data) {
      return this.clickableColumns.some(c => c.mainProperty === data.field.column.EntityProperty)
    }
  },
  validations () {
    let form = {}
    this.searchItems.forEach(item => {
      let property = item.modelControlUtil ? item.modelControlUtil.ModelProperty : item.EntityProperty
      form[property] = {
        required: requiredIf(function () {
          return item.Required
        })
      }
    })
    return {
      form: form
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
