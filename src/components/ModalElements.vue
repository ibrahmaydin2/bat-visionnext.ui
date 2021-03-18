<template>
  <b-row>
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
        <b-form-group v-if="element.ColumnType === 'Select' && element.DefaultValue" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <v-select
            label="Label"
            :readonly="!element.Enabled"
            :options="lookup[element.DefaultValue]"
            @input="selectedValue(element.EntityProperty, $event, 'lookup')"
          >
          </v-select>
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Id' || element.ColumnType === 'String' || element.ColumnType === 'LabelValue'" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <b-form-input
            type="text"
            v-model="form[fieldName]"
            :readonly="!element.Enabled" />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Radio'" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <NextCheckBox v-model="form[fieldName]" type="number" toggle />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Check'" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <NextCheckBox v-model="form[fieldName]" type="number" />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'DateTime'" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <b-form-datepicker v-model="form[fieldName]" :placeholder="$t('insert.chooseDate')"/>
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Text'" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <b-form-textarea v-model="form[fieldName]" placeholder="" />
        </b-form-group>
        <b-form-group v-else-if="element.ColumnType === 'Time'" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <b-form-timepicker
            :placeholder="$t('insert.chooseTime')"
            :locale="($i18n.locale === 'tr') ? 'tr-Tr' : 'en-US'"
            :label-no-time-selected="$t('insert.chooseTime')"
            :label-close-button="$t('insert.close')"
            close-button-variant="outline-danger"
            v-model="form[fieldName]"
          />
        </b-form-group>
        <b-form-group v-else :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[fieldName].$error }" >
          <v-select
            label="Description1"
            :readonly="!element.Enabled"
            :options="searchItems[element.EntityProperty]"
            @input="selectedValue(element, $event, 'search')"
          >
          </v-select>
        </b-form-group>
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
    <b-button size="sm" variant="success" @click="save()">
        ONAYLA
    </b-button>
  </b-row>
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
      insertRules: []
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
    this.$api.get('UIOperations', `UIOperationGroupUser/GetPopupFormInits?name=${this.$route.name}`).then((res) => {
      let autoLookups = ''
      this.formElements = res.FormColumns
      console.log(this.$route)
      this.formElements.map(item => {
        const fieldName = item.EntityProperty
        this.$set(this.form, fieldName, null)

        this.insertRules[fieldName] = item.Required === true ? { required } : { not }

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
  },
  methods: {
    selectedValue (label, model, type) {
      if (model) {
        if (type === 'lookup') {
          this.form[label] = model.DecimalValue
        } else {
          this.form[label] = model.RecordId
        }
        // this.searchOnTable()
      } else {
        this.form[label] = null
        // this.searchOnTable()
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
