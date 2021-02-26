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
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.RouteBalance.Route')" :class="{ 'form-group--error': $v.form.FromRouteId.$error }">
              <v-select :options="routes" @input="selectedSearchType('FromRouteId', $event)" label="Description1"></v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group :label="$t('insert.RouteBalance.Route')" :class="{ 'form-group--error': $v.form.ToRouteId.$error }">
              <v-select :options="routes" @input="selectedSearchType('ToRouteId', $event)" label="Description1"></v-select>
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
            <b-col cols="5">
              <b-table
                :items="fromRouteBalances"
                :fields="fields"
                select-mode="multi"
                responsive
                ref="selectableTable"
                selectable
                @row-selected="onRowFromSelected"
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
                <template #cell(Day1Value)="row">
                  <b-form-checkbox v-model="row.item.Day1Value"></b-form-checkbox>
                </template>
                <template #cell(Day2Value)="row">
                  <b-form-checkbox v-model="row.item.Day2Value"></b-form-checkbox>
                </template>
                <template #cell(Day3Value)="row">
                  <b-form-checkbox v-model="row.item.Day3Value"></b-form-checkbox>
                </template>
                <template #cell(Day4Value)="row">
                  <b-form-checkbox v-model="row.item.Day4Value"></b-form-checkbox>
                </template>
                <template #cell(Day5Value)="row">
                  <b-form-checkbox v-model="row.item.Day5Value"></b-form-checkbox>
                </template>
                <template #cell(Day6Value)="row">
                  <b-form-checkbox v-model="row.item.Day6Value"></b-form-checkbox>
                </template>
                <template #cell(Day7Value)="row">
                  <b-form-checkbox v-model="row.item.Day7Value"></b-form-checkbox>
                </template>
              </b-table>
            </b-col>
            <b-col cols="2" class="route-balance-button-box">
              <b-button variant="primary mb-2" @click="moveFromRoute">
                <b-icon icon="arrow-right"></b-icon>
              </b-button>
              <b-button variant="primary mb-2" @click="moveToRoute">
                <b-icon icon="arrow-left"></b-icon>
              </b-button>
            </b-col>
            <b-col cols="5">
              <b-table
                :items="toRouteBalances"
                :fields="fields"
                select-mode="multi"
                responsive
                ref="selectableTable"
                selectable
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
                <template #cell(Day1Value)="row">
                  <b-form-checkbox v-model="row.item.Day1Value"></b-form-checkbox>
                </template>
                <template #cell(Day2Value)="row">
                  <b-form-checkbox v-model="row.item.Day2Value"></b-form-checkbox>
                </template>
                <template #cell(Day3Value)="row">
                  <b-form-checkbox v-model="row.item.Day3Value"></b-form-checkbox>
                </template>
                <template #cell(Day4Value)="row">
                  <b-form-checkbox v-model="row.item.Day4Value"></b-form-checkbox>
                </template>
                <template #cell(Day5Value)="row">
                  <b-form-checkbox v-model="row.item.Day5Value"></b-form-checkbox>
                </template>
                <template #cell(Day6Value)="row">
                  <b-form-checkbox v-model="row.item.Day6Value"></b-form-checkbox>
                </template>
                <template #cell(Day7Value)="row">
                  <b-form-checkbox v-model="row.item.Day7Value"></b-form-checkbox>
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
        {key: 'Selected', label: this.$t('insert.RouteBalance.Selected'), sortable: false},
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
      routeName: this.$route.meta.baseLink
    }
  },
  computed: {
    ...mapState(['routes', 'fromRouteBalances', 'toRouteBalances'])
  },
  mounted () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/Search', name: 'routes'})
    },
    selectedSearchType (label, model) {
      if (model) {
        this.form[label] = model.RecordId
        const props = {
          RouteId: model.RecordId
        }
        if (label === 'FromRouteId') {
          this.$store.dispatch('getSearchItems', {...this.query, api: 'VisionNextRoute/api/Route/RouteBalanceSearch', name: 'fromRouteBalances', props: props})
        } else {
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
      // 3723192820
      // 3723192784
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'danger', msg: this.$t('insert.requiredFields') })
      } else {
        this.$store.dispatch('createRouteBalance', {...this.query, api: `VisionNextRoute/api/Route/${this.routeName}`, formdata: this.form, return: this.routeName})
      }
    },
    onRowFromSelected (items) {
      this.fromSelecteds = items
    },
    onRowToSelected (items) {
      this.toSelecteds = items
    },
    moveFromRoute () {
      this.fromSelecteds.forEach(i => {
        var check = false
        this.toRouteBalances.forEach(s => {
          if (s.CustomerCode === i.CustomerCode) {
            check = true
            alert('Zaten mevcut')
            return false
          }
        })
        if (!check) {
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
    },
    moveToRoute () {

    }
    // selectAllRows () {
    //   this.$refs.selectableTable.selectAllRows()
    // }
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
        console.log(e)
      }
    }
  }
}
</script>
<style lang="sass">
 .route-balance-button-box
   display: flex
   flex-direction: column
   align-items: center
   justify-content: center
</style>
