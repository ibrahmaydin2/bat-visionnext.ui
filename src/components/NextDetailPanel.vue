<template>
  <div>
    <b-row>
      <NextFormGroup v-for="(item,i) in (items ? items.filter(i => i.visible === true): [])" :key="i" :title="item.label" :required="item.required" :error="item.required ? $v.form[item.modelProperty] : {}">
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Autocomplete'" :url="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event)" :searchable="true" :disabled="item.disabled" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && !item.parentId" :url="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event)" :disabled="item.disabled" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Dropdown' && item.parentId" :source="source[item.modelProperty]" @input="additionalSearchType(item.id, item.modelProperty, $event)" :disabled="item.disabled" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'Lookup'" :lookup-key="item.url" @input="selectedType(item.modelProperty, $event)" :disabled="item.disabled" :get-lookup="true" />
        <NextDropdown v-model="model[item.modelProperty]" v-if="item.type === 'LookupWithUrl'" :url="item.url" @input="additionalSearchType(item.id, item.modelProperty, $event)" label="Label" :disabled="item.disabled" :dynamicRequest="{paramId: 'ITEM_CRITERIA'}"  />
        <NextInput v-model="label[item.modelProperty]" v-if="item.type === 'Label'" :type="item.inputType" :readonly="item.disabled" />
        <NextInput v-model="form[item.modelProperty]" v-if="item.type === 'Text'" :type="item.inputType" :readonly="item.disabled" />
        <NextCheckBox v-model="form[item.modelProperty]" v-if="item.type === 'Check'" type="number" toggle/>
      </NextFormGroup>
      <b-col cols="12" md="2">
        <b-form-group>
          <AddDetailButton @click.native="addItems()" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-table :fields="fields" :items="values ? values.filter(i => i.RecordState !== 4) : []" bordered responsive>
        <template #cell()="data">
          <span v-html="data.value"></span>
        </template>
        <template #cell(operations)="data">
          <i @click="removeItem(data)" class="far fa-trash-alt text-danger"></i>
        </template>
      </b-table>
    </b-row>
  </div>
</template>
<script>
import mixin from '../mixins/index'
import { required } from 'vuelidate/lib/validators'
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
    type: {
      type: String,
      default: 'insert'
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      // selectedValue: null
      form: {},
      model: {},
      label: {},
      source: {},
      values: []
    }
  },
  computed: {
    fields () {
      let fields = []
      this.items.map(item => {
        if (!item.hideOnTable) {
          fields.push({
            key: this.getKey(item),
            label: item.label,
            formatter: (value, key, obj) => {
              if (item.type === 'Check') {
                value = value === 1 ? '<i class="fa fa-check text-success"></i>' : '<i class="fa fa-times text-danger"></i>'
              }
              return value
            }
          })
        }
      })
      fields.push({
        key: 'operations',
        label: this.$t('list.operations')
      })
      return fields
    }
  },
  mounted () {
    this.items.forEach(item => {
      if (item.required) {
        this.$set(this.form, item.modelProperty, null)
      } else {
        let defaultValue = null
        if (item.defaultValue) {
          defaultValue = item.defaultValue
        }
        if (item.type === 'Label') {
          this.$set(this.label, item.modelProperty, defaultValue)
        }
        if (item.type === 'Text') {
          this.$set(this.form, item.modelProperty, defaultValue)
        }
      }
    })
  },
  methods: {
    getKey (item) {
      if (item.type === 'Autocomplete' || item.type === 'Dropdown' || item.type === 'Lookup' || 'LookupWithUrl') {
        return item.objectKey ? `${item.objectKey}.Label` : item.modelProperty + 'Desc'
      }
      return item.modelProperty
    },
    addItems () {
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
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if (item.isUnique) {
          let filteredList = this.values.filter(i => i[item.modelProperty] === this.form[item.modelProperty] && i.RecordState !== 4)
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
      this.form.RecordState = 2
      this.form.StatusId = 1
      const model = Object.keys(this.model)
      for (let index = 0; index < model.length; index++) {
        let item = model[index]
        console.log(this.model[item])
        let key = item + 'Desc'
        this.form[key] = this.model[item].Description1 ? this.model[item].Description1 : this.model[item].Label
      }
      console.log(this.form)
      this.values.push({...this.form})
      this.$emit('valuechange', this.values)
      this.form = {}
      this.items.map(item => {
        if (item.defaultValue) {
          this.form[item.modelProperty] = item.defaultValue
        }
      })
      this.model = {}
      this.label = {}
      this.$v.form.$reset()
    },
    removeItem (data) {
      const item = data.item
      const index = data.index

      if (item.RecordId) {
        this.values[index].RecordState = 4
      } else {
        this.values.splice(index, 1)
      }
      this.$emit('valuechange', this.values)
    },
    additionalSearchType (id, label, model) {
      if (model) {
        this.form[label] = model.RecordId
        const filteredArr = this.items.filter(item => item.parentId === id)
        if (filteredArr) {
          filteredArr.map(item => {
            switch (item.type) {
              case 'Label':
                if (item.url) {
                  this.$api.postByUrl({recordId: model[item.parentProperty]}, item.url).then((res) => {
                    this.label[item.modelProperty] = res.Model.Description1
                  })
                } else {
                  this.label[item.modelProperty] = model[item.parentProperty]
                }
                break
              case 'Dropdown':
                if (item.url && item.request) {
                  let request = JSON.parse(item.request.replace('val', model[item.parentProperty]))
                  this.$api.postByUrl(request, item.url).then((res) => {
                    if (typeof res.ListModel !== 'undefined') {
                      this.source[item.modelProperty] = res.ListModel.BaseModels
                    } else {
                      let i = 0
                      this.source[item.modelProperty] = []
                      res.Values.map(data => {
                        this.source[item.modelProperty][i] = this.convertLookupValueToSearchValue(data)
                        i++
                      })
                      this.$forceUpdate()
                    }
                  })
                  this.$forceUpdate()
                }
                break
              case 'LookupWithUrl':
                this.form[item.modelProperty] = model[item.parentProperty]
                break
              case 'Text':
                this.form[item.modelProperty] = model[item.parentProperty]
                break
              default:
                break
            }
          })
        }
      } else {
        this.form[label] = null
      }
    }
  },
  validations () {
    let form = {}
    this.items.forEach(item => {
      if (item.required) {
        form[item.modelProperty] = { required }
      }
    })
    return {
      form: form
    }
  },
  watch: {
    // selectedValue (newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     this.$emit('valuechange', newValue)
    //   }
    // },
    value (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.values = newValue
      }
    }
  }
}
</script>
