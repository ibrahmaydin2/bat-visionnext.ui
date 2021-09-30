<template>
  <b-container>
    <b-row v-if="formElements">
      <b-col cols="6" v-for="(element, i) in formElements" :key="i">
        <b-form-group v-if="element.ColumnType === 'Select' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <div v-if="element.modelControlUtil.InputType === 'AutoComplete'">
            <!-- <autocomplete
              @click="onClickAutoComplete(element.modelControlUtil)"
              :search="onAutoCompleteSearch"
              class="autocomplete-search"
              :get-result-value="getResultValue"
              @submit="handleSubmit(element.modelControlUtil.ModelProperty, $event)"
            /> -->
            <NextDropdown
              @input="selectedValue(element.modelControlUtil.ModelProperty, $event, 'search')"
              :url="element.modelControlUtil.ServiceUrl"
              :searchable="true" :custom-option="true"
              or-condition-fields="Code,Description1,CommercialTitle"
              :dynamic-and-condition="getAndConditionModel(element.AndConditions)"/>
          </div>
          <div v-else>
            <v-select
              v-if="element.modelControlUtil.IsLookupTable"
              label="Label"
              :options="lookup[element.modelControlUtil.Code]"
              @input="selectedValue(element.EntityProperty, $event, 'lookup')"
            >
            </v-select>
            <v-select
              v-else
              label="Description1"
              :options="gridField[element.EntityProperty]"
              @input="selectedValue(element.EntityProperty, $event, 'search')"
            >
            </v-select>
          </div>
        </b-form-group>
        <b-form-group v-else-if="(element.ColumnType === 'Id' || element.ColumnType === 'String' || element.ColumnType === 'LabelValue') && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <b-form-input
            type="text"
            v-model="form[element.EntityProperty]"
            :readonly="!element.Enabled" />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Radio' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <NextCheckBox v-model="form[element.EntityProperty]" type="number" toggle />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Check' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <NextCheckBox v-model="form[element.EntityProperty]" type="number" />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'DateTime' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <b-form-datepicker
          v-model="form[element.EntityProperty]"
          :placeholder="$t('insert.chooseDate')"
          @input="filterDate(element.EntityProperty, $event)"
        />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Text' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <b-form-textarea v-model="form[element.EntityProperty]" placeholder="" />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Time' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <b-form-timepicker
            :placeholder="$t('insert.chooseTime')"
            :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
            :label-no-time-selected="$t('insert.chooseTime')"
            :label-close-button="$t('insert.close')"
            close-button-variant="outline-danger"
            v-model="form[element.EntityProperty]"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <div class="element-modal-footer text-right" v-if="formActions">
      <b-button size="md" variant="warning" @click="closeModal">
        {{$t('header.cancel')}}
      </b-button>
      <b-button v-for="(action, i) in formActions" :key="i" size="md" :variant="action.Action === 'Approve' ? 'success': 'danger'" @click="save(action)">
        {{action.Title}}
      </b-button>
    </div>
  </b-container>
</template>
<script>
import { mapState } from 'vuex'
import { required, not } from 'vuelidate/lib/validators'
export default {
  name: 'ModalElements',
  data () {
    return {
      formElements: null,
      form: { ...this.form },
      searchItems: [],
      autoLookups: '',
      insertRules: [],
      formActions: [],
      selectedElement: null
    }
  },
  validations () {
    return {
      form: { ...this.insertRules }
    }
  },
  computed: {
    ...mapState(['lookup', 'gridField'])
  },
  mounted () {
    let vm = this
    this.$api.get('UIOperations', `UIOperationGroupUser/GetPopupFormInits?name=${this.actionUrl}`).then((res) => {
      if (!res.FormColumns && !res.RowActions) {
        this.$toasted.show(res.Message, {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      let autoLookups = ''
      this.formElements = res.FormColumns
      this.formActions = res.RowActions
      this.formElements.map(item => {
        const fieldName = item.EntityProperty
        this.$set(this.form, fieldName, item.DefaultValue)
        if (item.Visible) {
          this.insertRules[fieldName] = item.Required === true ? { required } : { not }
        }

        if (item.modelControlUtil && item.modelControlUtil.InputType !== 'AutoComplete') {
          if (item.modelControlUtil.IsLookupTable) {
            autoLookups += item.DefaultValue + ','
          } else {
            let model = this.getAndConditionModel(item.AndConditions)
            this.$store.dispatch('getGridFields', {...this.query, serviceUrl: item.modelControlUtil.ServiceUrl, val: fieldName, model: model}).then(() => {
              vm.$forceUpdate()
            })
          }
        }
      })

      if (autoLookups.length > 0) {
        autoLookups = autoLookups.slice(0, -1)
        this.$store.dispatch('getAllLookups', {...this.query, type: autoLookups})
      }
    })
  },
  props: {
    actionUrl: String,
    recordId: Array
  },
  methods: {
    selectedValue (label, model, type) {
      if (model) {
        if (type === 'lookup') {
          this.form[label] = model.DecimalValue
        } else {
          this.form[label] = model.RecordId
        }
      } else {
        this.form[label] = null
      }
    },
    filterDate (label, date) {
      this.form[label] = this.dateConvertToISo(date)
    },
    dateConvertToISo: function (date) {
      if (!date || typeof date === 'undefined') {
        return ''
      }
      return new Date(date).toISOString()
    },
    onClickAutoComplete (element) {
      this.selectedElement = element
    },
    onAutoCompleteSearch (input) {
      if (input.length < 3) { return [] }
      const model = {
        'OrConditionModels': [
          {
            Description1: input,
            Code: input
          }
        ]
      }
      if (this.selectedElement.AndConditions) {
        model.AndConditionModel = JSON.parse(JSON.parse(`{ ${this.selectedElement.AndConditions} }`))
      }
      return this.$store.dispatch('getAutoGridFieldsWithOrConditionModel', {...this.query, serviceUrl: this.selectedElement.serviceUrl, val: this.selectedElement.modelProperty, model: model}).then((res) => {
        return res
      })
    },
    getResultValue (result) {
      return result.Description1
    },
    handleSubmit (label, model) {
      if (model) {
        this.form[label] = model.RecordId
      } else {
        this.form[label] = null
      }
    },
    save (action) {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        let model = {
          model: this.form,
          RecordIds: this.recordId
        }
        this.$api.postByUrl(model, action.ActionUrl).then(res => {
          if (res && res.IsCompleted === true) {
            this.$toasted.show(this.$t('insert.success'), {
              type: 'success',
              keepOnHover: true,
              duration: '3000'
            })
            this.$root.$emit('bv::hide::modal', 'confirmModal')
            this.$root.$emit('bv::hide::modal', 'multipleConfirmModal')
            setTimeout(() => {
              this.$store.commit('setReloadGrid', true)
            }, 1000)
          }
          if (res.IsCompleted === false) {
            this.$toasted.show(this.$t(res.Message), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
          }
        })
      }
    },
    getAndConditionModel (andConditionModels) {
      let model = {}
      if (andConditionModels) {
        model = JSON.parse(`{${decodeURI(andConditionModels)}}`)
      }
      return model
    },
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'confirmModal')
      this.$root.$emit('bv::hide::modal', 'multipleConfirmModal')
    }
  }
}
</script>
<style lang="sass">
  .autocomplete-search
    .autocomplete
      text-align: center
    .autocomplete-input
      outline: none
      padding-left: 10px
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+)
      background-repeat: no-repeat
      background-position: center right 10px
      background-size: 16px
      background-color: white
      border-radius: 5px
      border: solid 1px lightgray
    input::-webkit-input-placeholder
      color: #656665
      text-transform: initial !important
    .autocomplete-result-list
      line-height: 1.15
      padding: 0
      margin-top: 5px
    .autocomplete-result
      cursor: pointer
      padding: 10px
      text-align: left
      border-bottom: 0.5px solid rgba(0,0,0,.16)
      background: none
</style>
