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
              <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="Period" :error="$v.form.Period">
              <NextInput v-model="form.Period" type="number" :disabled="insertReadonly.Period" />
          </NextFormGroup>
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <NextInput v-model="form.Description1" type="text" :disabled="insertReadonly.Description1" />
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
import updateMixin from '../../mixins/update'
export default {
  mixins: [updateMixin],
  data () {
    return {
      form: {
        Code: null,
        Period: null,
        Description1: null,
        Deleted: 0
      },
      routeName1: 'CommonApi'
    }
  },
  mounted () {
    this.getData().then(() => {
      this.setModel()
    })
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
        this.updateData()
      }
    },
    setModel () {
      let e = this.rowData
      if (e) {
        this.form = {
          Code: e.Code,
          Description1: e.Description1,
          Period: e.Period,
          StatusId: e.StatusId === null ? 0 : e.StatusId,
          RecordId: e.RecordId,
          Deleted: e.Deleted
        }
      }
    }
  }
}
</script>
