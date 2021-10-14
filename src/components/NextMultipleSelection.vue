<template>
  <div>
    <b-modal :id="`confirm-edit-modal${unique}`">
      <template #modal-title>
        {{$t('list.editConfirm')}}
      </template>
      {{$t('list.rowEditConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide(`confirm-edit-modal${unique}`)">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="editItem()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-modal :id="`confirm-delete-modal${unique}`">
      <template #modal-title>
        {{$t('list.deleteConfirm')}}
      </template>
      {{$t('list.rowDeleteConfirm')}}
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="$bvModal.hide(`confirm-delete-modal${unique}`)">{{$t('insert.cancel')}}</b-button>
        <b-button size="sm" class="float-right ml-2" variant="success" @click="removeItem()">{{$t('insert.okay')}}</b-button>
      </template>
    </b-modal>
    <b-row v-if="editable">
      <NextFormGroup v-for="(item,i) in (items ? items.filter(i => i.visible === true): [])" :key="i" :title="item.label" :required="isRequired(item)" :error="isRequired(item) ? $v.form[item.modelProperty] : {}">
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Autocomplete'" :url="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :searchable="true" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" :label="item.labelProperty ? item.labelProperty : 'Description1'" :custom-option="item.customOption" :is-customer="item.isCustomer" :or-condition-fields="item.orConditionFields"/>
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && !item.parentId" :source="item.source" :url="item.url" :label="item.labelProperty ? item.labelProperty : 'Description1'" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" :filter="item.filter" :custom-option="item.customOption" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && item.parentId" :source="source[item.modelProperty]" :label="item.labelProperty ? item.labelProperty : 'Description1'" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :dynamic-and-condition="item.dynamicAndCondition" :dynamic-request="item.dynamicRequest" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Lookup'" :lookup-key="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event, item.valueProperty)" :disabled="isDisabled(item)" :get-lookup="true" :label="item.labelProperty ? item.labelProperty : 'Label'" :filter="item.filter" />
        <NextInput v-model="label[item.modelProperty]" v-if="item.type === 'Label'" :type="item.inputType" :readonly="isDisabled(item)" />
        <NextInput v-model="form[item.modelProperty]" v-if="item.type === 'Text'" :type="item.inputType" :readonly="isDisabled(item)" @input="enterValue(item.id, $event)" :maxLength="item.maxLength" :oninput="item.isPostCode ? postCodeControl : maxLengthControl" />
        <NextCheckBox v-model="form[item.modelProperty]" v-if="item.type === 'Check'" type="number"  toggle :disabled="isDisabled(item)" />
        <NextCheckBox v-model="form[item.modelProperty]" v-if="item.type === 'Radio'" type="number" radio :disabled="isDisabled(item)" />
        <NextDatePicker v-model="form[item.modelProperty]" v-if="item.type === 'Date'" :disabled="isDisabled(item)" />
      </NextFormGroup>
      <b-col cols="12" md="2">
        <b-form-group>
          <AddDetailButton v-if="!isUpdated" @click.native="addItems()" />
          <b-button v-if="isUpdated" class="mt-4" size="sm" variant="success" @click="addItems()">
            <i class="fa fa-pencil-alt"></i> {{$t('insert.edit')}}
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        :id="id"
        :fields="fields"
        :items="values ? values.filter(i => i.RecordState !== 4) : []"
        bordered
        responsive
        :current-page="currentPage"
        :per-page="10">
        <template #cell()="data">
          <span v-html="data.value"></span>
        </template>
        <template #cell(operations)="data">
          <b-button :title="$t('list.edit')" v-b-tooltip.hover.bottom v-if="showEdit && editable" @click="$bvModal.show(`confirm-edit-modal${unique}`); selectedItem = data.item;" class="btn mr-2 btn-warning btn-sm">
            <i class="fa fa-pencil-alt"></i>
          </b-button>
          <b-button :title="$t('list.delete')" v-b-tooltip.hover.bottom v-if="editable" @click="$bvModal.show(`confirm-delete-modal${unique}`); selectedItem = data.item;" type="button" class="btn mr-2 btn-danger btn-sm">
            <i class="far fa-trash-alt ml-1"></i>
          </b-button>
          <i v-if="getDetail" @click="getDetail(data.item)" :title="$t('get.detail')" class="ml-3 fa fa-arrow-down text-success"></i>
          <i v-for="(detail,i) in detailButtons" :key="i" @click="detail.getDetail(data.item)" :title="detail.title" :class="`ml-3 text-success ${detail.icon}`"></i>
        </template>
        <template #cell(show_details)="row">
          <div>
            <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="success">
              <i class="fa fa-arrow-down"></i>{{detailButtonText}}
            </b-button>
          </div>
       </template>
        <template #row-details v-if="hasDetail">
          <div class="p-4">
            <h2><slot name="title" /></h2>
            <hr>
            <slot name="body" />
          </div>
        </template>
      </b-table>
      <b-pagination
        :total-rows="values ? values.length : 0"
        v-model="currentPage"
        :per-page="10"
        :aria-controls="id"
      ></b-pagination>
    </b-row>
  </div>
</template>
<script>
import mixin from '../mixins/index'
import { requiredIf } from 'vuelidate/lib/validators'
export default {
  name: 'NextDetailPanel',
  mixins: [mixin],
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    name: {
      type: String
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      form: {},
      model: {},
      label: {},
      source: {},
      values: [],
      action: {},
      searchItems: [],
      listItems: []
    }
  },
  mounted () {
    this.getFormFields()
  },
  methods: {
    getFormFields () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }

      this.form = {
        ...this.form,
        ...this.label
      }

      if (!this.values) {
        this.values = []
      }

      if (this.beforeAdd && !this.beforeAdd(this.form, this.values, this.isUpdated)) {
        return
      }

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if (item.isUnique) {
          let filteredList = this.values.filter(i => i[item.modelProperty] === this.form[item.modelProperty] && !this.isUpdated && i.RecordState !== 4)
          if (filteredList.length > 0) {
            this.$toasted.show(this.$t('insert.sameRecordError'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            return
          }
        }
      }

      this.form.Deleted = 0
      this.form.System = 0
      this.form.RecordState = this.form.RecordId ? 3 : 2
      this.form.StatusId = this.form.StatusId ? this.form.StatusId : 1
      const model = Object.keys(this.model)

      for (let index = 0; index < model.length; index++) {
        let item = model[index]
        if (this.model[item]) {
          let key = item + 'Desc'
          let properties = this.items.filter(i => i.modelProperty === item)
          if (properties && properties.length === 1) {
            let property = properties[0]
            if (property.labelProperty) {
              this.form[key] = this.model[item][properties[0].labelProperty]
            } else {
              this.form[key] = this.model[item].Description1 ? this.model[item].Description1 : this.model[item].Label
            }
            if (property.gridCustomOption) {
              let codeKey = item + 'Code'
              this.form[codeKey] = this.model[item]['Code']
            }
          } else {
            this.form[key] = this.model[item].Description1 ? this.model[item].Description1 : this.model[item].Label
          }
        }
      }
      if (this.hasLineNumber) {
        this.form.LineNumber = this.lineNumber
        this.lineNumber++
      }
      if (this.editForm) {
        this.form = this.editForm(this.form)
      }
      if (this.isUpdated) {
        this.values[this.selectedIndex] = {...this.form}
        this.selectedIndex = null
        this.isUpdated = false
      } else {
        this.values.push({...this.form})
      }
      this.$emit('valuechange', this.values)
      this.form = {}
      this.items.map(item => {
        if (item.defaultValue) {
          this.form[item.modelProperty] = item.defaultValue
        }
        if (item.createCode) {
          this.form[item.modelProperty] = this.createNewCode(item.modelProperty)
        }
      })

      this.model = {}
      this.label = {}
      this.$v.form.$reset()
    }
  },
  validations () {
    let form = {}
    this.items.forEach(item => {
      form[item.modelProperty] = {
        required: requiredIf(function () {
          return this.isRequired(item)
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
    createCode (newValue) {
      if (newValue) {
        this.items.map(item => {
          if (item.createCode) {
            this.form[item.modelProperty] = this.createNewCode(item.modelProperty)
          }
        })
      }
    }
  }
}
</script>
