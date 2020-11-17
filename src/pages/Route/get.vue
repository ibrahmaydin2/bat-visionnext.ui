<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
      <b-row>
        <b-col cols="12">
          <header>
            <Breadcrumb :title="rowData.Description1" />
            <div class="clearfix"></div>
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-code" />  <b>{{$t('insert.route.reference')}}:</b> {{rowData.EncryptedKey}}</span> 
            <span><i class="fas fa-check" />  <b>{{$t('insert.route.status')}}:</b> {{(rowData.StatusId) ? $t('insert.active'): $t('insert.passive')}}</span>
            <span><i class="fas fa-code" />  <b>{{$t('insert.route.routeCode')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.route.routeType')}}:</b> {{(rowData.RouteType) ? rowData.RouteType.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.route.title')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.title')}}</h6>
                <span><i class="far fa-circle" /> {{$t('insert.routeGroup')}}</span>
                <p>{{(rowData.routeGroup) ? rowData.routeGroup.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.routeClass')}}</span>
                <p>{{(rowData.RouteClass) ? rowData.RouteClass.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.vehicle')}}</span>
                <p>{{(rowData.Vehicle) ? rowData.Vehicle.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.personel')}}</span>
                <p>{{(rowData.Representative) ? rowData.Representative.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.supervisor')}}</span>
                <p>{{(rowData.Supervisor) ? rowData.Supervisor.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.control')}}</span>
                <p>{{(rowData.VisitStartControl) ? rowData.VisitStartControl.Label : ''}}</p>
                <!-- <span><i class="far fa-circle" /> {{$t('insert.city')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.distirict')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.town')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.route.type')}}</span>
                <p></p>
                <span><i class="far fa-circle" /> {{$t('insert.route.customerArea')}}</span>
                <p></p> -->
                <span><i class="far fa-circle" /> {{$t('insert.multiDayRoute')}}</span>
                <p>{{(rowData.IsMultidayRoute) ? $t('insert.yes') : $t('insert.no')}}</p>
                <span><i class="far fa-circle" /> {{$t('insert.superRoute')}}</span>
                <p>{{(rowData.IsSuperRoute) ? $t('insert.yes') : $t('insert.no')}}</p>
              </b-card>
            </b-col>
            <b-col cols="12" md="8">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('insert.route.locations')}}</h6>
                <b-table :items="tempItems" :fields="fields">
                  <template #cell(customer)="data">
                    <kbd>{{data.item.code}}</kbd> {{data.value}}
                  </template>
                  <template #cell(visit)="data">
                    <i :class="data.value === 1 ? 'fa fa-check text-success' : 'fa fa-times text-danger'"></i>
                  </template>
                </b-table>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
      // fields: ['Müşteri', 'Lokasyon', 'Ziyaret Başlama Kontrolü Yapılmayacak'],
      fields: [
        {
          key: 'customer',
          label: 'Müşteri',
          sortable: true
        },
        {
          key: 'location',
          label: 'Lokasyon',
          sortable: true
        },
        {
          key: 'visit',
          label: 'Ziyaret Başlama Kontrolü Yapılmayacak',
          sortable: true
        }
      ],
      tempItems: [
        { customer: 'CIHAN BUFE- ALI ATAN', location: 'CIHAN BUFE- ALI ATAN', visit: 1, code: '312' },
        { customer: 'UGUR BUFE', location: 'UGUR BUFE', visit: 1, code: '260' },
        { customer: 'ENGIN MARKET-ENGIN SIT', location: 'ENGIN MARKET-ENGIN SIT', visit: 0, code: '312' },
        { customer: 'MOKKI', location: 'MOKKI', visit: 0 },
        { customer: 'CAN BÜFE SERKAN ÇALIŞKAN', location: 'CAN BÜFE SERKAN ÇALIŞKAN', visit: 0, code: '312' },
        { customer: 'YAVUZ BÜFE', location: 'YAVUZ BÜFE', visit: 0, code: '312' },
        { customer: 'MASLAK ARENA', location: 'MASLAK ARENA', visit: 1, code: '312' },
        { customer: 'CUMHURİYET BÜFE-MUSTAFA BOZOK', location: 'CUMHURİYET BÜFE-MUSTAFA BOZOK', visit: 1, code: '312' },
        { customer: 'TEKEL 61-İDRİS BAŞALI', location: 'TEKEL 61-İDRİS BAŞALI', visit: 1, code: '312' },
        { customer: 'ARZU GIDA-AHMET AKSU', location: 'ARZU GIDA-AHMET AKSU', visit: 1, code: '312' },
        { customer: 'BARBADOS TÜTÜN', location: 'BARBADOS TÜTÜN', visit: 1, code: '312' }
      ]
    }
  },
  mounted () {
    this.getData()
    this.$store.commit('bigLoaded', false)
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: this.$route.meta.baseLink, record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
