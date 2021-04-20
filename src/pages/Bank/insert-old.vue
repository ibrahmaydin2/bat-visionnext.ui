<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
              <b-button size="sm" variant="outline-danger">{{$t('header.cancel')}}</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">{{$t('header.save')}}</b-button>
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
              <b-form-input type="text" v-model="form.model.code"  />
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
                  <b-form-input type="text" v-model="branchCode"  />
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
              <b-tr v-for="(r, i) in form.model.bankBranches" :key="i">
                <b-td></b-td>
                <b-td>{{r.description1}}</b-td>
                <b-td>{{r.financeCode}}</b-td>
                <b-td>{{r.defaultAccountNumber}}</b-td>
                <b-td><p><i :class="r.isDefaultBranch === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'" /></p></b-td>
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
          bankBranches: []
        }
      },
      dataStatus: null,
      detailListData: [],
      branchCode: null,
      branchDescription1: null,
      branchFinansCode: null,
      defaultAccountNumber: null
    }
  },
  computed: {
    ...mapState(['createCode'])
  },
  mounted () {
    this.getCode()
  },
  methods: {
    getCode () {
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: 'VisionNextBank/api/Bank/GetCode'})
    },
    save () {
      this.$store.dispatch('createData', {...this.query, api: 'VisionNextBank/api/Bank', formdata: this.form, return: this.$route.meta.baseLink})
    },
    addDetailList () {
      this.form.model.bankBranches.push({
        code: this.branchCode,
        description1: this.branchDescription1,
        financeCode: this.branchFinansCode,
        defaultAccountNumber: this.defaultAccountNumber,
        isDefaultBranch: this.isDefaultBranch ? 1 : 0,
        recordState: 2,
        statusId: 1
      })
      this.branchDescription1 = null
      this.branchFinansCode = null
      this.defaultAccountNumber = null
      this.isDefaultBranch = 0
      this.branchCode++
    },
    removeBankBranch (item) {
      this.form.model.bankBranches.splice(this.form.model.bankBranches.indexOf(item), 1)
    }
  },
  watch: {
    createCode: function (e) {
      if (e) {
        this.form.model.code = e
        this.branchCode = Number(e) + 1
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
    & i
      cursor: pointer
</style>
