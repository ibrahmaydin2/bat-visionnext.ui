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
          <NextFormGroup item-key="Code" :error="$v.form.Code">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Period" :error="$v.form.Period">
              <b-form-input type="number" v-model="form.Period" :readonly="insertReadonly.Period" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
              <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
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
    console.log(this.insertReadonly)
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
