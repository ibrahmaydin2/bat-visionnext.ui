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
        <b-col cols="4" v-for="(element, i) in formElements" :key="i" :set="fieldName = element.EntityProperty">
          <b-form-group v-if="element.ColumnType === 'Select' && element.DefaultValue && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <v-select
              label="Label"
              :readonly="!element.Enabled"
              :options="lookup[element.DefaultValue]"
              @input="selectedValue(element.EntityProperty, $event, 'lookup')"
            >
            </v-select>
          </b-form-group>
          <b-form-group v-else-if="(element.ColumnType === 'Id' || element.ColumnType === 'String' || element.ColumnType === 'LabelValue') && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <b-form-input
              type="text"
              v-model="form[fieldName]"
              :readonly="!element.Enabled" />
          </b-form-group>
          <b-form-group v-else-if="element.ColumnType === 'Radio' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <NextCheckBox v-model="form[fieldName]" type="number" toggle />
          </b-form-group>
          <b-form-group v-else-if="element.ColumnType === 'Check' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <NextCheckBox v-model="form[fieldName]" type="number" />
          </b-form-group>
          <b-form-group v-else-if="element.ColumnType === 'DateTime' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <b-form-datepicker v-model="form[fieldName]" :placeholder="$t('insert.chooseDate')"/>
          </b-form-group>
          <b-form-group v-else-if="element.ColumnType === 'Text' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <b-form-textarea v-model="form[fieldName]" placeholder="" />
          </b-form-group>
          <b-form-group v-else-if="element.ColumnType === 'Time' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <b-form-timepicker
              :placeholder="$t('insert.chooseTime')"
              :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
              :label-no-time-selected="$t('insert.chooseTime')"
              :label-close-button="$t('insert.close')"
              close-button-variant="outline-danger"
              v-model="form[fieldName]"
            />
          </b-form-group>
          <!-- <b-form-group v-if="" v-else :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
            <v-select
              label="Description1"
              :readonly="!element.Enabled"
              :options="searchItems[element.EntityProperty]"
              @input="selectedValue(element, $event, 'search')"
            >
            </v-select>
          </b-form-group> -->
        </b-col>
          <!-- URL gelmiyor -->
          <!-- <v-select
            v-else
            label="Description1"
            :options="searchItems[element.EntityProperty]"
            @input="selectedValue(element, $event, 'search')"
          >
          </v-select> -->
      <!-- </b-col> -->
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
    ...mapState(['lookup'])
  },
  created () {
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
      this.$set(this.form, 'RecordId', this.recordId)
      this.formElements.map(item => {
        const fieldName = item.EntityProperty
        this.$set(this.form, fieldName, null)
        if (item.Visible) {
          this.insertRules[fieldName] = item.Required === true ? { required } : { not }
        }

        if (item.DefaultValue) {
          autoLookups += item.DefaultValue + ','
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
    recordId: Number
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
    save (action) {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.$api.postByUrl(this.form, action.ActionUrl).then(res => {
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
