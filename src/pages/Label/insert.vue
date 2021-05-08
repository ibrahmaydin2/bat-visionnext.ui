<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
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
          <NextFormGroup item-key="Description1" :error="$v.form.Description1">
            <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" :active="!developmentMode">
          <b-row>
            <NextFormGroup :title="$t('insert.Label.Code')" :error="$v.LabelDetails.Code" :required="true" md="3" lg="3">
              <b-form-input type="text" v-model="LabelDetails.Code" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.Label.Description1')" :error="$v.LabelDetails.Description1" :required="true" md="3" lg="3">
              <b-form-input type="text" v-model="LabelDetails.Description1" />
            </NextFormGroup>
            <b-col cols="12" md="2" class="ml-auto">
              <b-form-group>
                <AddDetailButton @click.native="addLabelDetails()" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="form.LabelDetails">
            <b-table :items="form.LabelDetails" :fields="fields" striped responsive>
              <template #cell(Operations)="r">
                <i @click="removeLabelDetails(r.item)" class="far fa-trash-alt text-danger"></i>
              </template>
            </b-table>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/insert'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [insertMixin],
  data () {
    return {
      routeName1: 'CommonApi',
      routeName2: 'Label',
      form: {
        Description1: null,
        Code: null,
        StatusId: 1,
        LabelDetails: []
      },
      LabelDetails: {
        Code: null,
        Description1: null
      },
      fields: [
        {key: 'Code', label: this.$t('insert.Label.Code'), sortable: false},
        {key: 'Description1', label: this.$t('insert.Label.Description1'), sortable: false},
        {key: 'Operations', label: this.$t('list.operations'), sortable: false}
      ]
    }
  },
  mounted () {
    this.createManualCode()
  },
  methods: {
    addLabelDetails () {
      this.$v.LabelDetails.$touch()
      if (this.$v.LabelDetails.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.form.LabelDetails.push({
          Deleted: 0,
          System: 0,
          RecordState: 2,
          StatusId: 1,
          Code: this.LabelDetails.Code,
          Description1: this.LabelDetails.Description1
        })
        this.LabelDetails = {
          Code: null,
          Description1: null
        }
      }
    },
    removeLabelDetails (r) {
      this.form.LabelDetails.splice(this.form.LabelDetails.indexOf(r), 1)
    },
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
  },
  validations () {
    return {
      form: this.insertRules,
      LabelDetails: {
        Code: {
          required
        },
        Description1: {
          required
        }
      }
    }
  }
}
</script>
