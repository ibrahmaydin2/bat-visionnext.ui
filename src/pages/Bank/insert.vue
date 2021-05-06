<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="8">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="4" class="text-right">
            <router-link :to="{name: 'Bank' }">
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
           <NextFormGroup item-key="Code" :error="$v.form.Code" md="3" lg="3">
              <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
           </NextFormGroup>
           <NextFormGroup item-key="FinanceCode" :error="$v.form.FinanceCode" md="3" lg="3">
              <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
           </NextFormGroup>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1" md="3" lg="3">
              <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
           </NextFormGroup>
           <NextFormGroup item-key="StatusId" :error="$v.form.StatusId" md="3" lg="3">
              <NextCheckBox v-model="form.StatusId" type="number" toggle />
           </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
            <NextFormGroup :title="$t('insert.bank.branchCode')" md="3" lg="2" :error="$v.bankBranches.Code" :required="true">
              <b-form-input type="text" v-model="bankBranches.Code" disabled/>
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.bank.description1')" md="3" lg="2" :error="$v.bankBranches.Description1" :required="true">
              <b-form-input type="text" v-model="bankBranches.Description1" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.bank.financeCode')" md="3" lg="2">
              <b-form-input type="text" v-model="bankBranches.FinanceCode" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.bank.defaultAccountNumber')" md="3" lg="2">
              <b-form-input type="number" v-model="bankBranches.DefaultAccountNumber" />
            </NextFormGroup>
            <NextFormGroup :title="$t('insert.bank.isDefaultBranch')" md="3" lg="2">
              <NextCheckBox v-model="bankBranches.IsDefaultBranch" type="number" toggle />
            </NextFormGroup>
             <b-col cols="12" md="2" class="text-right">
                <b-form-group>
                  <AddDetailButton @click.native="addbankBranches" />
                </b-form-group>
             </b-col>
          </b-row>
            <b-row v-if="form.bankBranches.length > 0">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.bank.branchCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.bank.description1')}}</span></b-th>
                  <b-th><span>{{$t('insert.bank.financeCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.bank.defaultAccountNumber')}}</span></b-th>
                  <b-th><span>{{$t('insert.bank.isDefaultBranch')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in form.bankBranches" :key="i">
                    <b-td>{{r.Code}}</b-td>
                    <b-td>{{r.Description1}}</b-td>
                    <b-td>{{r.FinanceCode}}</b-td>
                    <b-td>{{r.DefaultAccountNumber}}</b-td>
                    <b-td><p><i :class="r.IsDefaultBranch === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p></b-td>
                    <b-td class="text-center">
                      <i @click="removeBankBranch(r)" class="far fa-trash-alt text-danger"></i>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/insert'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        Delete: 0,
        System: 0,
        RecordState: 2,
        bankBranches: [],
        Code: null,
        Description1: null,
        FinanceCode: null,
        StatusId: 1
      },
      bankBranches: {
        Code: null,
        Description1: null,
        FinanceCode: null,
        DefaultAccountNumber: null,
        IsDefaultBranch: null
      }
    }
  },
  mounted () {
    this.createManualCode().then(() => {
      this.bankBranches.Code = `${this.form.Code} - ${this.form.bankBranches.length ? this.form.bankBranches.length + 1 : 1}`
    })
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.createData()
      }
    },
    addbankBranches () {
      this.$v.bankBranches.$touch()
      if (this.$v.bankBranches.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: this.$t('insert.requiredFields') })
        return
      }
      let filteredArr = this.form.bankBranches.filter(i => i.code === this.bankBranches.Code)
      if (filteredArr.length < 1) {
        this.form.bankBranches.push({
          Code: this.bankBranches.Code,
          Description1: this.bankBranches.Description1,
          FinanceCode: this.bankBranches.FinanceCode,
          DefaultAccountNumber: this.bankBranches.DefaultAccountNumber,
          IsDefaultBranch: this.bankBranches.IsDefaultBranch,
          RecordState: 2,
          StatusId: 1
        })
      } else {
        let arrIndex = this.form.bankBranches.indexOf(filteredArr[0])
        this.form.bankBranches[arrIndex] = {
          Code: this.bankBranches.Code,
          Description1: this.bankBranches.Description1,
          FinanceCode: this.bankBranches.FinanceCode,
          DefaultAccountNumber: this.bankBranches.DefaultAccountNumber,
          IsDefaultBranch: this.bankBranches.IsDefaultBranch,
          RecordState: 2,
          StatusId: 1
        }
      }

      this.bankBranches = {
        Code: `${this.form.Code} - ${this.form.bankBranches.length ? this.form.bankBranches.length + 1 : 1}`
      }
      this.$v.bankBranches.$reset()
    },
    removeBankBranch (item) {
      this.form.bankBranches.splice(this.form.bankBranches.indexOf(item), 1)
    }
  },
  validations () {
    return {
      form: this.insertRules,
      bankBranches: {
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
