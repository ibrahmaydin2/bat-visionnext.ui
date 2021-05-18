<template>
  <b-row class="asc__insertPage route-balance">
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
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.RouteBalance.Route')" :class="{ 'form-group--error': $v.form.FromRouteId.$error }">
              <v-select :options="fromRoutes" @search="onSearchFromRoute" @input="selectedSearchType('FromRouteId', $event)" label="Description1" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.RouteBalance.Route')" :class="{ 'form-group--error': $v.form.ToRouteId.$error }">
              <v-select :options="toRoutes" @search="onSearchToRoute" @input="selectedSearchType('ToRouteId', $event)" label="Description1" :filterable="false">
                <template slot="no-options">
                  {{$t('insert.min3')}}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.RouteBalance.Detail')" active>
          <b-row>
            <b-col cols="4" class="m-auto">
              <b-form-input type="text" v-model="searchFromRoute" @input="fromRouteFilter" placeholder="Search Route" />
            </b-col>
            <b-col cols="12" class="mt-2">
              <b-table
                :items="filteredFromRoutes"
                :fields="fields"
                select-mode="multi"
                responsive
                ref="selectableTable"
                selectable
                bordered
                :busy="fromLoadingTable"
                tbody-tr-class="bg-white"
                @row-selected="onRowFromSelected"
              >
                <!-- Example scoped slot for select state illustrative purposes -->
                <template #cell(selected)="{ rowSelected }">
                  <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                  </template>
                  <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                  </template>
                </template>
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Tablo içeriği için rota seçiniz</strong>
                  </div>
                </template>
                <template #cell(Day1Value)="row">
                  <NextCheckBox v-model="row.item.Day1Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day2Value)="row">
                  <NextCheckBox v-model="row.item.Day2Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day3Value)="row">
                  <NextCheckBox v-model="row.item.Day3Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day4Value)="row">
                  <NextCheckBox v-model="row.item.Day4Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day5Value)="row">
                  <NextCheckBox v-model="row.item.Day5Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day6Value)="row">
                  <NextCheckBox v-model="row.item.Day6Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day7Value)="row">
                  <NextCheckBox v-model="row.item.Day7Value" type="number" :showText="false"/>
                </template>
              </b-table>
            </b-col>
            <b-col cols="12" class="route-balance-button-box mb-2 mt-2">
              <b-button variant="success" class="mr-2" @click="moveFromRoute">
                <b-icon icon="arrow-down"></b-icon>
              </b-button>
              <b-button variant="success" class="ml-2" @click="moveToRoute">
                <b-icon icon="arrow-up"></b-icon>
              </b-button>
            </b-col>
            <b-col cols="4" class="m-auto">
              <b-form-input type="text" v-model="searchToRoute" @input="toRouteFilter" placeholder="Search Route" />
            </b-col>
            <b-col cols="12" class="mt-2">
              <b-table
                :items="filteredToRoutes"
                :fields="fields"
                select-mode="multi"
                responsive
                ref="selectableTable"
                :busy="toLoadingTable"
                selectable
                bordered
                @row-selected="onRowToSelected"
              >
                <!-- Example scoped slot for select state illustrative purposes -->
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
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner type="grow" class="align-middle"></b-spinner>
                    <strong>Tablo içeriği için rota seçiniz</strong>
                  </div>
                </template>
                <template #cell(Day1Value)="row">
                  <NextCheckBox v-model="row.item.Day1Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day2Value)="row">
                  <NextCheckBox v-model="row.item.Day2Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day3Value)="row">
                  <NextCheckBox v-model="row.item.Day3Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day4Value)="row">
                  <NextCheckBox v-model="row.item.Day4Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day5Value)="row">
                  <NextCheckBox v-model="row.item.Day5Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day6Value)="row">
                  <NextCheckBox v-model="row.item.Day6Value" type="number" :showText="false"/>
                </template>
                <template #cell(Day7Value)="row">
                  <NextCheckBox v-model="row.item.Day7Value" type="number" :showText="false"/>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        FromRouteId: null,
        ToRouteId: null,
        FromRouteDetails: [],
        ToRouteDetails: []
      },
      fields: [
        {key: 'CustomerCode', label: this.$t('insert.RouteBalance.CustomerCode'), sortable: false},
        {key: 'CustomerDesc', label: this.$t('insert.RouteBalance.CustomerDesc'), sortable: false},
        {key: 'LocationDesc', label: this.$t('insert.RouteBalance.LocationDesc'), sortable: false},
        {key: 'Day1Value', label: this.$t('insert.RouteBalance.Day1'), sortable: false},
        {key: 'Day2Value', label: this.$t('insert.RouteBalance.Day2'), sortable: false},
        {key: 'Day3Value', label: this.$t('insert.RouteBalance.Day3'), sortable: false},
        {key: 'Day4Value', label: this.$t('insert.RouteBalance.Day4'), sortable: false},
        {key: 'Day5Value', label: this.$t('insert.RouteBalance.Day5'), sortable: false},
        {key: 'Day6Value', label: this.$t('insert.RouteBalance.Day6'), sortable: false},
        {key: 'Day7Value', label: this.$t('insert.RouteBalance.Day7'), sortable: false}
      ],
      fromSelecteds: [],
      toSelecteds: [],
      routeName: this.$route.meta.baseLink,
      fromLoadingTable: true,
      toLoadingTable: true,
      searchFromRoute: null,
      searchToRoute: null,
      fromText: '',
      toText: ''
    }
  },
  computed: {
    ...mapState(['fromRoutes', 'toRoutes', 'fromRouteBalances', 'toRouteBalances']),
    filteredFromRoutes () {
      if (this.fromText.length > 0) {
        return this.fromRouteBalances.filter((route) => {
          return route.CustomerCode.toLocaleLowerCase('tr').includes(this.fromText) || (route.CustomerDesc.toLocaleLowerCase('tr').includes(this.fromText)) || (route.LocationDesc.toLocaleLowerCase('tr').includes(this.fromText))
        })
      }
      return this.fromRouteBalances
    },
    filteredToRoutes () {
      if (this.toText.length > 0) {
        return this.toRouteBalances.filter((route) => {
          return route.CustomerCode.toLocaleLowerCase('tr').includes(this.toText) || (route.CustomerDesc.toLocaleLowerCase('tr').includes(this.toText)) || (route.LocationDesc.toLocaleLowerCase('tr').includes(this.toText))
        })
      }
      return this.toRouteBalances
    }
  },
  mounted () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/Search', name: 'routes'})
    },
    onSearchFromRoute (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextRoute/api/Route/AutoCompleteSearch',
          name: 'fromRoutes',
          andConditionModel: {
            Description1: search,
            StatusIds: [1]
          }
        }).then(res => {
          loading(false)
        })
      }
    },
    onSearchToRoute (search, loading) {
      if (search.length >= 3) {
        loading(true)
        this.$store.dispatch('getSearchItems', {
          ...this.query,
          api: 'VisionNextRoute/api/Route/AutoCompleteSearch',
          name: 'toRoutes',
          andConditionModel: {
            Description1: search,
            StatusIds: [1]
          }
        }).then(res => {
          loading(false)
        })
      }
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        const props = {
          RouteId: model.RecordId
        }
        if (label === 'FromRouteId') {
          this.fromLoadingTable = true
          this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/RouteBalanceSearch', name: 'fromRouteBalances', props: props})
        } else {
          this.toLoadingTable = true
          this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/RouteBalanceSearch', name: 'toRouteBalances', props: props})
        }
      } else {
        this.form[label] = null
      }
    },
    tabValidation () {
      if (this.$v.form.$invalid) {
        this.$nextTick(() => {
          this.tabValidationHelper()
        })
      }
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.$store.dispatch('createRouteBalance', {...this.query, api: `VisionNextRoute/api/Route/${this.routeName}`, formdata: this.form, return: this.routeName})
        this.form.FromRouteDetails = []
        this.form.ToRouteDetails = []
      }
    },
    onRowFromSelected (items) {
      this.fromSelecteds = items
    },
    onRowToSelected (items) {
      this.toSelecteds = items
    },
    moveFromRoute () {
      if (this.fromSelecteds.length < 1 || !this.form.FromRouteId || !this.form.ToRouteId) {
        alert('rota seç')
        return
      }
      this.fromSelecteds.forEach(i => {
        var check = false
        this.toRouteBalances.forEach(s => {
          if (s.CustomerCode === i.CustomerCode) {
            check = true
            alert(`${i.CustomerCode} zaten mevcut`)
            this.fromSelecteds.splice(this.fromSelecteds.indexOf(i), 1)
          }
        })
        if (!check) {
          i.RecordState = 2
          this.toRouteBalances.push(i)
          this.fromRouteBalances.splice(this.fromRouteBalances.indexOf(i), 1)
        }
        this.form.FromRouteDetails.push({
          'DetailId': i.RouteDetailId,
          'Day1Value': this.checkConvertDayToNumber(i.Day1Value),
          'Day2Value': this.checkConvertDayToNumber(i.Day2Value),
          'Day3Value': this.checkConvertDayToNumber(i.Day3Value),
          'Day4Value': this.checkConvertDayToNumber(i.Day4Value),
          'Day5Value': this.checkConvertDayToNumber(i.Day5Value),
          'Day6Value': this.checkConvertDayToNumber(i.Day6Value),
          'Day7Value': this.checkConvertDayToNumber(i.Day7Value)
        })
      })
      this.fromSelecteds = []
      this.$refs.selectableTable.clearSelected()
    },
    moveToRoute () {
      if (this.toSelecteds.length < 1 || !this.form.FromRouteId || !this.form.ToRouteId) {
        alert('rota seç')
        return
      }
      this.toSelecteds.forEach(i => {
        var check = false
        this.fromRouteBalances.forEach(s => {
          if (s.CustomerCode === i.CustomerCode) {
            check = true
            alert('Zaten mevcut')
            return false
          }
        })
        if (!check) {
          i.RecordState = 2
          this.fromRouteBalances.push(i)
          this.toRouteBalances.splice(this.toRouteBalances.indexOf(i), 1)
        }
        this.form.ToRouteDetails.push({
          'DetailId': i.RouteDetailId,
          'Day1Value': this.checkConvertDayToNumber(i.Day1Value),
          'Day2Value': this.checkConvertDayToNumber(i.Day2Value),
          'Day3Value': this.checkConvertDayToNumber(i.Day3Value),
          'Day4Value': this.checkConvertDayToNumber(i.Day4Value),
          'Day5Value': this.checkConvertDayToNumber(i.Day5Value),
          'Day6Value': this.checkConvertDayToNumber(i.Day6Value),
          'Day7Value': this.checkConvertDayToNumber(i.Day7Value)
        })
      })
      this.toSelecteds = []
    },
    fromRouteFilter (text) {
      this.fromText = text.toLocaleLowerCase('tr')
    },
    toRouteFilter (text) {
      this.toText = text.toLocaleLowerCase('tr')
    }
  },
  validations () {
    return {
      form: {
        FromRouteId: {
          required
        },
        ToRouteId: {
          required
        }
      }
    }
  },
  watch: {
    fromRouteBalances (e) {
      if (e) {
        this.fromLoadingTable = false
      }
    },
    toRouteBalances (e) {
      if (e) {
        this.toLoadingTable = false
      }
    }
  }
}
</script>
<style lang="sass">
  .route-balance
    .route-balance-button-box
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      button
        border-radius: unset
    table tbody
      color: black
      .table-active
        background-color: #28a745 !important
        color: white
</style>
