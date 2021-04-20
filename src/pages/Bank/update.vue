<template>
  <b-row>
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
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.bank.code')"
            >
              <b-form-input type="text" v-model="form.model.code" readonly />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.bank.financeCode')"
            >
              <b-form-input type="text" v-model="form.model.financeCode"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.bank.description1')"
            >
              <b-form-input type="text" v-model="form.model.description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              :label="$t('insert.status')"
            >
              <b-form-checkbox v-model="dataStatus" name="check-button" switch>
                {{(dataStatus) ? $t('insert.active'): $t('insert.passive')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.detail')" active>
          <b-table-simple bordered small>
            <b-thead>
              <b-th width="20%">
                <b-form-group :label="$t('insert.bank.branchCode')">
                  <b-form-input type="text" v-model="branchCode" readonly />
                </b-form-group>
              </b-th>
              <b-th width="30%">
                <b-form-group :label="$t('insert.bank.description1')">
                  <b-form-input type="text" v-model="branchDescription1"/>
                </b-form-group>
              </b-th>
              <b-th width="30%">
                <b-form-group :label="$t('insert.bank.financeCode')">
                  <b-form-input type="text" v-model="branchFinansCode"/>
                </b-form-group>
              </b-th>
              <b-th width="20%">
                <b-form-group :label="$t('insert.bank.defaultAccountNumber')">
                  <b-form-input type="text" v-model="defaultAccountNumber"/>
                </b-form-group>
              </b-th>
              <b-th width="10%">
                <b-form-group :label="$t('insert.bank.isDefaultBranch')">
                  <b-form-checkbox v-model="isDefaultBranch">
                  </b-form-checkbox>
                </b-form-group>
              </b-th>
              <b-th width="10%">
                <b-form-group>
                  <b-button @click="addDetailList" class="mt-4" variant="success" size="sm"><i class="fa fa-plus"></i>{{$t('insert.add')}}</b-button>
                </b-form-group>
              </b-th>
            </b-thead>
            <b-tbody>
              <!-- <b-tr v-for="(r, i) in form.model.bankBranches" :key="i" v-if="r.RecordState !== 4"> -->
              <b-tr v-for="(r, i) in form.model.bankBranches" :key="i">
                <b-td>{{r.Code}}</b-td>
                <b-td>{{r.Description1}}</b-td>
                <b-td>{{r.FinanceCode}}</b-td>
                <b-td>{{r.DefaultAccountNumber}}</b-td>
                <b-td><p><i :class="r.IsDefaultBranch === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p></b-td>
                <b-td class="text-center"><i @click="removeBankBranch(r)" class="far fa-trash-alt text-danger"></i></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
        model: {
          code: '',
          description1: '',
          recordState: 2,
          statusId: null,
          financeCode: null,
          bankBranches: [],
          recordId: null,
          deleted: null
        }
      },
      dataStatus: null,
      detailListData: [],
      branchCode: null,
      branchDescription1: null,
      branchFinansCode: null,
      defaultAccountNumber: null,
      isDefaultBranch: null
    }
  },
  computed: {
    ...mapState(['rowData'])
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextBank/api/Bank', record: this.$route.params.url})
    },
    save () {
      this.$store.dispatch('updateData', {...this.query, api: 'VisionNextBank/api/Bank', formdata: this.form, return: this.$route.meta.baseLink})
    },
    addDetailList () {
      this.form.model.bankBranches.push({
        Code: this.branchCode,
        Description1: this.branchDescription1,
        FinanceCode: this.branchFinansCode,
        DefaultAccountNumber: this.defaultAccountNumber,
        IsDefaultBranch: this.isDefaultBranch,
        RecordState: 2,
        StatusId: 1
      })
      this.branchDescription1 = null
      this.branchFinansCode = null
      this.defaultAccountNumber = null
      this.isDefaultBranch = null
      this.branchCode++
    },
    removeBankBranch (item) {
      this.form.model.bankBranches[this.form.model.bankBranches.indexOf(item)].RecordState = 4
    }
  },
  watch: {
    rowData: function (e) {
      if (e) {
        this.branchCode = `${e.Code} - ${(e.BankBranches.length ? e.BankBranches.length : 1) + 1}`
        this.form.model = {
          code: e.Code,
          description1: e.Description1,
          recordState: 3,
          statusId: e.StatusId,
          financeCode: e.FinanceCode,
          bankBranches: e.BankBranches,
          recordId: e.RecordId,
          deleted: e.Deleted
        }
        this.dataStatus = !!e.StatusId
      }
    },
    dataStatus: function (e) {
      if (e === true) {
        this.form.model.statusId = 1
      } else {
        this.form.model.statusId = 0
      }
    },
    isDefaultBranch: function (e) {
      if (e) {
        this.isDefaultBranch = 1
      } else {
        this.isDefaultBranch = 0
      }
    }
  }
}
</script>
<style lang="sass" scope>
  table
    i
      cursor: pointer
</style>
