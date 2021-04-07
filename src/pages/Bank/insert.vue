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
            <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Code + (insertRequired.Code === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Code.$error }">
                <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.FinanceCode != null ? insertVisible.FinanceCode : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.FinanceCode">
                <b-form-input type="text" v-model="form.FinanceCode" :readonly="insertReadonly.FinanceCode" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
              <b-form-group :label="insertTitle.Description1 + (insertRequired.Description1 === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.Description1.$error }">
                <b-form-input type="text" v-model="form.Description1" :readonly="insertReadonly.Description1" />
              </b-form-group>
            </b-col>
            <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" md="4" lg="3">
              <b-form-group :label="insertTitle.StatusId + (insertRequired.StatusId === true ? ' *' : '')" :class="{ 'form-group--error': $v.form.StatusId.$error }">
                <NextCheckBox v-model="form.StatusId" type="number" toggle />
              </b-form-group>
            </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-row>
              <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.bank.branchCode')">
                <b-form-input type="text" v-model="bankBranches.Code" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.bank.description1')">
                <b-form-input type="text" v-model="bankBranches.Description1" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.bank.financeCode')">
                <b-form-input type="text" v-model="bankBranches.FinanceCode" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.bank.defaultAccountNumber')">
                <b-form-input type="text" v-model="bankBranches.DefaultAccountNumber" />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group :label="$t('insert.bank.isDefaultBranch')">
                  <b-form-checkbox v-model="bankBranches.IsDefaultBranch">
                  </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-th width="10%">
              <b-form-group>
                <b-button @click="addbankBranches" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
              </b-form-group>
            </b-th>
          </b-row>
            <b-row v-if="form.bankBranches.length > 0">
              <b-table-simple responsive bordered small>
                <b-thead>
                  <b-th><span>{{$t('insert.bank.description1')}}</span></b-th>
                  <b-th><span>{{$t('insert.bank.financeCode')}}</span></b-th>
                  <b-th><span>{{$t('insert.bank.defaultAccountNumber')}}</span></b-th>
                  <b-th><span>{{$t('insert.bank.isDefaultBranch')}}</span></b-th>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(r, i) in form.bankBranches" :key="i">
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
        <b-tab v-if="developmentMode" :active="developmentMode" title="all inputs">
          <b-row>
            <b-col>
              <pre v-if="developmentMode" class="asc__codeHTML">
                <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
                  {{codeInCode}}
                </span>
              </pre>
            </b-col>
          </b-row>
          <b-row>
          </b-row>
          <b-row>
            <b-col>
              <code>{{form}}</code>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <h3>Form Elements</h3>
              <p>
                {{insertFormdata}}
              </p>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'
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
      },
      routeName: this.$route.meta.baseLink,
      dataStatus: null,
      branchCode: null,
      branchDescription1: null,
      branchFinansCode: null,
      defaultAccountNumber: null

    }
  },
  computed: {
    ...mapState(['developmentMode', 'insertHTML', 'insertDefaultValue', 'insertRules', 'insertRequired', 'insertFormdata', 'insertVisible', 'insertTitle', 'insertReadonly', 'lookup', 'createCode'])
  },
  mounted () {
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      // bu fonksiyonda güncelleme yapılmayacak!
      // her insert ekranının kuralları ve createCode değerini alır.
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        let model = {
          'model': this.form
        }
        this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName}/api/${this.routeName}`, formdata: model, return: this.routeName})
      }
    },
    addbankBranches () {
      let filteredArr = this.form.bankBranches.filter(i => i.code === this.bankBranches.Code)
      if (filteredArr.length < 1) {
        this.form.bankBranches.push({
          Code: this.bankBranches.Code,
          Description1: this.bankBranches.Description1,
          FinanceCode: this.bankBranches.FinanceCode,
          DefaultAccountNumber: this.bankBranches.DefaultAccountNumber,
          IsDefaultBranch: this.bankBranches.IsDefaultBranch ? 1 : 0,
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
          IsDefaultBranch: this.bankBranches.IsDefaultBranch ? 1 : 0,
          RecordState: 2,
          StatusId: 1
        }
      }

      this.bankBranches.Code = `${this.form.Code} - ${this.form.bankBranches.length ? this.form.bankBranches.length + 1 : 1}`
      this.bankBranches.Description1 = null
      this.bankBranches.FinanceCode = null
      this.bankBranches.DefaultAccountNumber = null
      this.bankBranches.IsDefaultBranch = 0
      console.log(this.form.bankBranches)
      console.log(this.bankBranches)
    },
    removeBankBranch (item) {
      this.form.bankBranches.splice(this.form.bankBranches.indexOf(item), 1)
    }
  },
  validations () {
    // bu fonksiyonda güncelleme yapılmayacak!
    // servisten tanımlanmış olan validation kurallarını otomatik olarak içeriye alır.
    return {
      form: this.insertRules
    }
  },
  watch: {
    // bu fonksiyonda güncelleme yapılmayacak!
    // her insert ekranı sistemden gelen kodla çalışır.
    createCode (e) {
      if (e) {
        this.form.Code = e
        this.bankBranches.Code = `${this.form.Code} - ${this.form.bankBranches.length ? this.form.bankBranches.length : 1}`
      }
    },
    // bu fonksiyonda güncelleme yapılmayacak!
    // sistemden gönderilen default değerleri inputlara otomatik basacaktır.
    insertDefaultValue (value) {
      Object.keys(value).forEach(el => {
        if (el !== 'Code') {
          this.form[el] = value[el]
        }
      })
    }
  }
}
</script>
<style lang="sass">
</style>
