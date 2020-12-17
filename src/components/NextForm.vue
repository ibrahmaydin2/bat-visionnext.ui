<template>
  <div class="asc__nextform">
    <form>
      <b-row>
        <b-col
          v-for="(r, i) in rules.filter( f => f.Visible === true)"
          :key="'rules' + i"
          cols="12"
          md="2"
        >
          <b-form-group :label="r.Label">
            <v-select
              v-if="r.columnType === 'LabelValue'"
              v-once
              label="title"
              disabled
            >
            </v-select>

            <v-select
              v-else-if="r.columnType === 'Boolean'"
              v-once
              v-model="searchText"
              label="title"
            />

            <b-form-datepicker
              v-else-if="r.columnType === 'Date'"
              v-once
              placeholder=""
            />

            <b-form-datepicker
              v-else-if="r.columnType === 'DateTime'"
              v-once
              placeholder=""
            />

            <b-form-input
              v-else-if="r.columnType === 'String'"
              v-once
              :class="{ 'form-group--error': $v.form[r.EntityProperty].$error }"
              v-model="form[r.EntityProperty]"
              @keydown.enter="searchOnTable(r.dataField, searchText)"
            />

            <b-form-input
              v-else-if="r.columnType === 'Id'"
              v-once
              :class="{ 'form-group--error': $v.form[r.EntityProperty].$error }"
              v-model="form[r.EntityProperty]"
              @keydown.enter="searchOnTable(r.dataField, searchText)"
            />
            <b-form-input
              v-else
              v-model="form[r.EntityProperty]"
              v-once
            />
          </b-form-group>
        </b-col>
      <b-col cols="12">
        {{form}}
      </b-col>
      </b-row>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['rules'],
  data () {
    return {
      form: {},
      requireds: []
    }
  },
  mounted () {

  },
  computed: {
    ...mapState(['tableData', 'tableOperations', 'tableRows', 'nextgrid'])
  },
  methods: {
    generateRequired (e) {

    }
  },
  watch: {
  },
  validations () {
    return {
      form: this.requireds
    }
  }
}
</script>
<style lang="sass">
</style>
