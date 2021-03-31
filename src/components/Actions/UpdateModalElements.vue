<template>
  <b-container>
    <b-row v-if="formElements">
      <b-col cols="6" v-for="(element, i) in formElements" :key="i">
        <b-form-group v-if="element.ColumnType === 'Select' && element.Visible" :label="element.Label + (element.Required === true ? ' *' : '')" :class="{ 'form-group--error': $v.form[element.EntityProperty].$error }" >
          <div v-if="element.modelControlUtil.inputType === 'AutoComplete'">
             <b-form-input
              type="text"
              @keyup.enter="onAutoCompleteSearch(element, $event)"
              v-model="form[element.EntityProperty]"
              :readonly="!element.Enabled" />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          v-if="searchItems"
          :items="searchItems"
          select-mode="multi"
          selectable
          sticky-header
          ref="selectableTable"
          @row-selected="onRowSelected"
        >
          <template #cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span aria-hidden="true">&check;</span>
              <span class="sr-only">Selected</span>
            </template>
            <template v-else>
              <span aria-hidden="true">&nbsp;</span>
              <span class="sr-only">Not selected</span>
            </template>
          </template>
        </b-table>
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
  name: 'UpdateModalElements',
  data () {
    return {
      formElements: null,
      form: { ...this.form },
      searchItems: [],
      insertRules: [],
      formActions: [],
      selecteds: [],
      model: { ...this.model }
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
    this.$api.get('UIOperations', `UIOperationGroupUser/GetPopupFormInits?name=${this.actionUrl}`).then((res) => {
      if (!res.FormColumns && !res.RowActions) {
        this.$toasted.show(res.Message, {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return false
      }
      this.formElements = res.FormColumns
      this.formActions = res.RowActions
      this.formElements.map(item => {
        const fieldName = item.EntityProperty
        if (item.modelControlUtil && item.modelControlUtil.inputType === 'AutoComplete') {
          this.$set(this.form, fieldName, null)
        } else {
          this.$set(this.model, fieldName, null)
        }
        if (item.Visible) {
          this.insertRules[fieldName] = item.Required === true ? { required } : { not }
        }
      })
    })
  },
  props: {
    actionUrl: String,
    recordId: Array
  },
  methods: {
    onRowSelected (items) {
      this.selecteds = items.RecordId
    },
    onAutoCompleteSearch (element) {
      if (this.form[element.EntityProperty].length < 3) {
        this.$toasted.show(this.$t('insert.min3'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }
      const andConditionModel = {
        Description1: this.form[element.EntityProperty]
      }
      this.$store.dispatch('getAutoGridFields', {...this.query, serviceUrl: element.modelControlUtil.serviceUrl, val: element.modelControlUtil.modelProperty, model: andConditionModel}).then((res) => {
        this.searchItems = res
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
          }
        })
      }
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
