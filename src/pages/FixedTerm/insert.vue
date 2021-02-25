<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'FixedTerm' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="3" lg="3">
            <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Period != null ? insertVisible.Period : developmentMode" cols="12" md="3" lg="3">
            <b-form-group :label="insertTitle.Period + (insertRequired.Period === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Period.$error }">
              <b-form-input type="number" v-model="form.Period" :readonly="insertReadonly.Period" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="3" lg="3">
            <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
            </b-form-group>
          </b-col>
          <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="3" lg="3">
            <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
              <NextCheckBox v-model="form.StatusId" type="number" toggle/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Code: null,
        Period: null,
        Description1: null
      },
      routeName1: 'CommonApi'
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.createData()
      }
    }
  }
}
</script>
