<template>
  <b-container>
    <b-row v-if="formElements">
      <!-- <b-col cols="6" v-for="(element, i) in formElements" :key="i" :set="fieldName = element.EntityProperty"> -->
        <!-- <div v-if="element.ColumnType === 'SelectSearch'">
          <autocomplete
            @click="onClickAutoComplete(element)"
            :search="onAutoCompleteSearch"
            class="autocomplete-search"
            :get-result-value="getResultValue"
            @submit="handleSubmit(element, $event)"
          />
        </div> -->
        <b-col cols="6" v-for="(element, i) in formElements" :key="i">
          <b-form-group v-if="element.ColumnType === 'Select' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
            <v-select
              v-if="element.modelControlUtil.isLookupTable"
              label="Label"
              :options="lookup[element.modelControlUtil.code]"
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
      formActions: []
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
        if (item.Visible) {
          this.$set(this.form, fieldName, null)
          this.insertRules[fieldName] = item.Required === true ? { required } : { not }
        }
        if (item.DefaultValue) {
          autoLookups += item.DefaultValue + ','
        }
        if (item.modelControlUtil) {
          this.$store.dispatch('getGridFields', {...this.query, serviceUrl: item.modelControlUtil.serviceUrl, val: fieldName}).then(() => {
            vm.$forceUpdate()
          })
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
          this.$toasted.show(this.$t('insert.success'), {
            type: 'success',
            keepOnHover: true,
            duration: '3000'
          })
          this.$root.$emit('bv::hide::modal', 'confirmModal')
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
