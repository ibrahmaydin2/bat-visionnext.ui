<template>
  <b-row class="asc__dashboard">
    <b-col cols="12" sm="6" lg="6" xl="6">
      <!--<b-card shadow class="mb-4">
        <b-row>
          <b-col cols="12" md="3">
            <b-card-text align="center">
              <img height="50" src="../../../static/gene2info_black.svg">
            </b-card-text>
          </b-col>
          <b-col cols="6">
            <Search />
          </b-col>
        </b-row>
      </b-card>-->
      <b-card shadow class="mb-4 asc__card-dashboard-zindexarea">
        <h5 class="asc__card-mainTitle"><i>Test Talebi Oluştur</i></h5>
        <b-form-input class="asc__reference-search" v-model="referenceOrName" placeholder="Name or Ref no" trim ref="referanceOrName" @keypress.enter="handleSubmit()" />
        <b-alert show variant="light">
          <p>{{$t('dashboard.primaryTestDesc')}}<br>
          {{$t('dashboard.secondTestDesc')}}</p>
        </b-alert>
        <b-button v-if="showKitTable || showKitTypes" class="asc__card-dashboard-zindexarea-close" @click="closeMiniModal()">
          <i class="fas fa-times" />
        </b-button>
        <b-card v-if="showKitTable" class="asc__card-dashboard-zindexarea-table">
          <b-alert v-if="errorMessage" show variant="danger">{{errorMessage}}</b-alert>
          <template v-else>
            <b-alert show variant="info">{{$t('dashboard.secondTestSelect')}}</b-alert>
            <b-table
              striped
              hover
              :items="kitTableItems"
              :fields="fields3"
              sticky-header="true"
              :no-border-collapse="false"
              responsive
              class="asc__kit-table"
            >
              <template v-slot:cell(id)="row">
                <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                  <b-icon icon="grid3x3-gap-fill" variant="dark" aria-hidden="true"></b-icon>
                </template>
                <template v-slot:cell(name)="row">
                  {{row.item.PatientName}}
                </template>
                <template v-slot:cell(surname)="row">
                  {{row.item.PatientSurname}}
                </template>
                <template v-slot:cell(referenceNo)="row">
                  {{row.item.SerialNumber}}
                </template>
                  <b-dropdown-item @click="getSecondaryKits(row.item.PatientName, row.item.PatientSurname, row.item)"><b-icon icon="clipboard-plus" variant="dark" aria-hidden="true"></b-icon> <span> Ek Test Talebi </span></b-dropdown-item>
                </b-dropdown>
              </template>
              <template v-slot:cell(name)="row">
                {{row.item.PatientName}}
              </template>
              <template v-slot:cell(surname)="row">
                {{row.item.PatientSurname}}
              </template>
              <template v-slot:cell(referenceNo)="row">
                {{row.item.SerialNumber}}
              </template>
              <template v-slot:cell(kitType)="row">
                {{(row.item.KitType) ? row.item.KitType.Label : ''}}
              </template>
              <template v-slot:cell(createdDate)="row">
                {{dateConvertToTimestamp(row.item.CreatedDateTime)}}
              </template>
              <!-- <template v-slot:cell(id)="row"> -->
                <!-- <a @click="getSecondaryKits(row.item)" class="asc__table-create-btn btn-sm"><i class="fas fa-plus-square"></i></a> -->
              <!-- </template> -->
            </b-table>
          </template>
        </b-card>
        <b-card v-if="showKitTypes" class="asc__card-dashboard-zindexarea-table">
          <b-alert v-if="errorMessage" show variant="danger">{{errorMessage}}</b-alert>
          <b-row>
            <b-col cols="12">
              <h5 class="asc__card-mainTitle"><b>{{ patientNS }}</b> için ikincil test talebi oluştur</h5>
            </b-col>
            <b-col v-for="(gene, g) in kitTypes" :key="'gene' + g" cols="12" sm="12" md="12" lg="6">
              <div class="asc__card-dashboard">
                <b-row>
                  <b-col cols="9">
                    <span class="f-s-1"><i>{{gene.Description1}}</i></span>
                  </b-col>
                  <b-col cols="3" class="text-right">
                    <router-link :to="{name: gene.ProvisionClass ? 'WorkOrderProvisionInsert' : 'WorkOrderInsert', params: {type: gene.EncryptedKey}, query: { kitTypeId: gene.RecordId, encrypted: encryptedKey }}" class="asc__create-btn btn-sm">
                      <i class="fas fa-plus-square" />
                    </router-link>
                  </b-col>
                  <b-col cols="12" xl="6" md="5" class="mt-2">
                    <ul class="asc__card-dashboard-genesList">
                      <li v-for="(row, i) in gene.Genes" :key="'genes' + i">{{ row.Code.trim() }}</li>
                    </ul>
                  </b-col>
                  <b-col cols="12" xl="6" md="7" class="mt-2 asc__card-dashboard-geneInfo">
                    <p>{{gene.Genexp1}}</p>
                    <p><b>{{gene.UniqueName}}</b></p>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-card>
          <!-- <b-card class="mt-3" v-show="kitTypes.length === 0">
            <b-card-group class="asc__card-group">
              {{kitText}}
            </b-card-group>
          </b-card> -->
      </b-card>
      <b-card shadow class="mb-4">
        <h5 class="asc__card-mainTitle"><i>Patojen/Tüm Testler</i></h5>
        <dashboard-chart :items="workOrderLineCharts" />
      </b-card>
    </b-col>
    <b-col cols="12" sm="6" lg="6" xl="6">
      <b-card shadow class="mb-4">
        <h5 class="asc__card-mainTitle"><i>Son Raporlar</i></h5>
        <b-table striped hover :items="items1" :fields="fields1" responsive>
          <template v-slot:cell(referenceNo)="row">
            {{row.item.SerialNumber}}
          </template>
          <template v-slot:cell(testName)="row">
            {{row.item.KitType}}
          </template>
          <template v-slot:cell(reportDate)="row">
            {{(row.item.SampleDate) ? dateConvertToTimestamp(row.item.SampleDate) : ''}}
          </template>
          <template v-slot:cell(patientName)="row">
            {{row.item.PatientName}}
          </template>
          <template v-slot:cell(patientSurname)="row">
            {{row.item.PatientSurname}}
          </template>
          <template v-slot:cell(id)="row">
            <router-link :to="{name: 'Report', params: {type: row.item.EncryptedKey }}" class="asc__table-create-btn btn-sm">
              <i class="fas fa-eye"></i>
            </router-link>
          </template>
        </b-table>
      </b-card>
      <b-card shadow class="mb-4">
        <h5 class="asc__card-mainTitle">
          <span class="float-left"><i>Son Test Talepleri</i></span>
          <router-link :to="{name: 'WorkOrder'}" class="float-right"><i>Tümünü Görüntüle</i></router-link>
          <div class="clearfix"></div>
        </h5>
        <b-table striped hover :items="items2" :fields="fields2" responsive>
          <template v-slot:cell(referenceNo)="row">
            {{row.item.SerialNumber}}
          </template>
          <template v-slot:cell(testName)="row">
            {{row.item.KitType}}
          </template>
          <template v-slot:cell(reportDate)="row">
            {{dateConvertToTimestamp(row.item.SampleDate)}}
          </template>
          <template v-slot:cell(patientName)="row">
            {{row.item.PatientName}}
          </template>
          <template v-slot:cell(patientSurname)="row">
            {{row.item.PatientSurname}}
          </template>
          <template v-slot:cell(id)="row">
            <test-status :status="row.item.WorkOrderStatus" :allStatus="allStatus" />
          </template>
        </b-table>
      </b-card>
    </b-col>
    <!--  <b-col cols="12" class="mb-3">
      <b-card>
       <Carousel :item="carousel" />
      </b-card>
    </b-col>
    <b-col cols="12" lg="12" xl="6" class="mb-3">
      <b-card>
        <DxChart id="chart" :data-source="barChart" :title="$t('index.commingEvents')">
          <DxCommonSeriesSettings argument-field="itemName" type="stackedbar" />
          <DxValueAxis position="right">
            <DxTitle text="Adet" />
          </DxValueAxis>
          <DxSeries value-field="shipmentQuantity" :name="$t('index.commingEvents')" />
          <DxSeries value-field="balanceShipmentQuantity" :name="$t('index.commingEvents')" />
          <DxLegend vertical-alignment="bottom" horizontal-alignment="center" item-text-position="top" />
          <DxExport :enabled="true" />
          <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" location="edge" />
        </DxChart>
      </b-card>
    </b-col> -->
    <!-- <b-col v-for="(gene, g) in favouriteKitTypes" :key="'gene' + g" cols="12" sm="12" md="12" lg="6">
      <div class="asc__card-dashboard">
        <b-row>
          <b-col cols="9">
            <span class="f-s-1"><i>{{gene.Description1}}</i></span>
          </b-col>
          <b-col cols="3" class="text-right">
            <router-link :to="{name: gene.ProvisionClass ? 'WorkOrderProvisionInsert' : 'WorkOrderInsert', params: {type: gene.EncryptedKey}, query: { kitTypeId: gene.RecordId }}" class="asc__create-btn btn-sm">
              <i class="fas fa-plus-square" />
            </router-link>
          </b-col>
          <b-col cols="12" xl="6" md="5" class="mt-2">
            <ul class="asc__card-dashboard-genesList">
              <li v-for="(row, i) in gene.Genes" :key="'genes' + i">{{ row.Code.trim() }}</li>
            </ul>
          </b-col>
          <b-col cols="12" xl="6" md="7" class="mt-2 asc__card-dashboard-geneInfo">
            <p>{{gene.Genexp1}}</p>
            <p><b>{{gene.UniqueName}}</b></p>
          </b-col>
        </b-row>
      </div>
    </b-col> -->

  </b-row>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Search from '../../components/Search'
import DashboardChart from '../../components/DashboardChart'
import mixin from '../../mixins/index'
import TestStatus from '../../components/TestStatus'

export default {
  mixins: [mixin],
  components: {
    Search,
    DashboardChart,
    TestStatus
  },
  data () {
    return {
      workOrderTable: [],
      dataSource: [],
      patientNS: null,
      fields1: [
        {
          key: 'referenceNo',
          label: 'Referans No​'
        },
        {
          key: 'testName',
          label: 'Test Adı​'
        },
        {
          key: 'reportDate',
          label: 'Rapor Tarihi​'
        },
        {
          key: 'patientName',
          label: 'Hasta Adı​'
        },
        {
          key: 'patientSurname',
          label: 'Hasta Soyadı​'
        },
        {
          key: 'id',
          label: ''
        }
      ],
      fields2: [
        {
          key: 'referenceNo',
          label: 'Referans No​'
        },
        {
          key: 'testName',
          label: 'Test Adı​'
        },
        {
          key: 'reportDate',
          label: 'Rapor Tarihi​'
        },
        {
          key: 'patientName',
          label: 'Hasta Adı​'
        },
        {
          key: 'patientSurname',
          label: 'Hasta Soyadı​'
        },
        {
          key: 'id',
          label: ''
        }
      ],
      fields3: [
        {
          key: 'id',
          label: ''
        },
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'surname',
          label: 'Surname'
        },
        {
          key: 'kitType',
          label: 'Kit Type'
        },
        {
          key: 'referenceNo',
          label: 'Serial Number'
        },
        {
          key: 'createdDate',
          label: 'Created Date'
        }
      ],
      items1: [],
      items2: [],
      referenceOrName: '',
      kitType: [],
      kitText: 'Buraya açıklama yazılacak ve hata mesajarı gösterilecek',
      kitTableItems: [],
      workOrderLineCharts: [],
      resultList: [],
      showKitTypes: false,
      showKitTable: false,
      encryptedKey: null
    }
  },
  mounted () {
    this.showWorkOrderDashboard()
    this.showFavouriteKitTypes()
    this.hamburger('open')
    this.getAllStatus1()
  },
  computed: {
    ...mapState(['workOrderDashboard', 'favouriteKitTypes', 'workOrderPortalDashboard', 'referenceNoStatus', 'kitTypes', 'searchRes', 'allStatus', 'errorMessage'])
  },
  watch: {
    workOrderDashboard: function (e) {
      if (e) {
        this.workOrderTable = e.AllWorkOrders
      }
    },
    workOrderPortalDashboard: function (e) {
      if (e) {
        this.items1 = e.WorkOrderLastReports
        this.items2 = e.WorkOrderLastTestOrders
        this.workOrderLineCharts = e.WorkOrderLineCharts
        // this.fillChartData()
      }
    },
    referenceNoStatus: function (e) {
      if (e.IsCompleted) {
        this.kitType = {
          'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
          'SponsorId': e.SponsorTestKitModel.SponsorId,
          'UserId': JSON.parse(localStorage.getItem('UserModel')).UserId
        }

        if (e.SponsorTestKitModel.UsingStatus) {
          let dataSearchRes = {
            'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
            'AndConditionModel': {
              'CreatedUser': localStorage.getItem('UserModel').UserId,
              'Deleted': 0
            },
            'OrConditionModels':
            [
              {
                'SerialNumber': e.SponsorTestKitModel.Code
              }
            ]
          }
          this.$store.dispatch('getSearchRes', {...this.query, info: dataSearchRes})
        } else {
          this.referenceNo = null
          this.$store.dispatch('getContactPrimaryKitTypes', {...this.query, info: this.kitType})
        }
      } else {
        // this.kitText = e.Message
      }
    },
    searchRes: function (e) {
      if (Object.keys(e).length > 0) {
        this.ResultList = e.ResultList
        e.ResultList.filter(item => item.ParentWorkOrderId === null)
        this.kitTableItems = e.ResultList
        this.showKitTable = true
        this.showKitTypes = false
      }
    },
    kitTypes: function (e) {
      if (e) {
        this.showKitTypes = true
      }
    }
  },
  methods: {
    ...mapMutations(['hamburger']),
    closeMiniModal () {
      this.patientNS = null
      this.showKitTable = false
      this.showKitTypes = false
    },
    showWorkOrderDashboard () {
      this.$store.dispatch('getWorkOrderDashboard')
      this.$store.dispatch('getWorkOrderPortalDashboard')
    },
    showFavouriteKitTypes () {
      this.$store.dispatch('getFavouriteKitTypes')
    },
    showWorkOrderStatus () {
      this.$store.dispatch('getWorkOrderStatus')
    },
    handleSubmit () {
      this.$store.dispatch('removeKitTypes')
      this.showKitTable = false
      this.showKitTypes = false
      this.encryptedKey = null
      let input = this.$refs.referanceOrName.value
      let isReferenceNo = /[0-9]/.test(input)
      input = input.toUpperCase()
      if (isReferenceNo) {
        this.$store.dispatch('getSponsorTestKitBySerialNumber', {...this.query, param: input})
      } else {
        let dataSearchKit = {
          'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
          'AndConditionModel': {
            'CreatedUser': localStorage.getItem('UserModel').UserId
          },
          'OrConditionModels': [
            {
              'PatientName': input,
              'PatientSurname': input
            }
          ]
        }
        this.$store.dispatch('getSearchRes', {...this.query, info: dataSearchKit})
      }
    },
    getSecondaryKits (n, s, data) {
      // this.$store.dispatch('getContactSecondaryKitTypes', {...this.query, info: this.kitType})
      // Önce serial number'a göre filtrele ( servisten gelen ham data) ve 3ten küçükse kitler gelecek.
      // HK0001
      this.patientNS = n + ' ' + s
      this.showKitTable = false
      this.showKitTypes = false
      let arr = this.ResultList.filter(item => item.SerialNumber === data.SerialNumber)
      if (arr.length < 3) {
        let secondaryKitType = {
          'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
          'SponsorId': data.SponsorId,
          'UserId': JSON.parse(localStorage.getItem('UserModel')).UserId,
          'UpperKitTypeId': 7
        }
        this.encryptedKey = data.EncryptedKey

        this.$store.dispatch('getContactSecondaryKitTypes', {...this.query, info: secondaryKitType})
        this.kitTableItems = []
      } else {
        console.log('test talebi aşıldı')
      }
    },
    getAllStatus1 () {
      let status = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')}
      }
      this.$store.dispatch('getAllStatus', {...this.query, info: status})
    }
  }
}
</script>
<style lang="sass">
  // #chart
  //   height: 240px
  // #pie
  //     height: 440px

  // #pie *
  //     margin: 0 auto
  .asc__dashboard
    height: calc(100vh - 55px)
    margin-top: -5px
    padding: 15px 0
    .asc__create-req-btn
      color: #f08c00 !important
      border-color: #f08c0 !important
      &:hover
        color: white !important
        background-color: #f08c00 !important
        border-color: #f08c00 !important
    .asc__reference-search
      outline: none
      font-size: 24px !important
      width: 75%
      border:none !important
      border-bottom: 1px solid #bfbbbb !important
      border-radius: 5px
      padding: 5px
      font-weight: 600
      padding-left: 10px
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+)
      background-repeat: no-repeat
      background-position: center right 10px
      margin-left: auto
      margin-right: auto
      input::-webkit-input-placeholder
        color: #656665
        text-transform: initial !important
    .asc__kit-table
      td
        vertical-align:middle !important
        .dropdown-item
          display: flex
          align-items: center
          justify-content: space-around
          padding: 0
  .f-s-1
    font-size: 16px
    font-weight: bold
  .asc__card-dashboard
    font-size: 14px
    border-radius: 3px
    border: 1px solid #ececec !important
    height: 140px
    overflow: hidden
    margin-bottom: 20px
    padding: 10px 10px
    position: relative
    transition: .1s
    background: #fbfbfb
    &:hover
      background: #ffffff
      transition: .1s
      box-shadow: 0 0 50px #999
    @media (max-width: 1440px)
      height: 150px
    @media (max-width: 992px)
      height: inherit
    .asc__create-btn
      background-color: #f59300
      border: none
      color: #ffffff
      border-radius: 0px !important
      &:hover
        background-color: darken(#f59300, 2)
        color: #fff
  .asc__card-dashboard-geneInfo
    text-align: right
    & p
      margin: 0px
      padding: 0px
  .asc__card-dashboard-genesList
    list-style: none
    padding: 0px 10px 15px 0px
    height: 100px
    overflow: auto
    &::-webkit-scrollbar
      width: 5px
    &::-webkit-scrollbar-track
      background: #f1f1f1
    &::-webkit-scrollbar-thumb
      background: #e88000
    &::-webkit-scrollbar-thumb:hover
      background: #ffa300
    @media (max-width: 1440px)
      height: 100px
      padding-bottom: 5px
    & li
      display: inline-block
      margin-right: 5px
      &::after
        content: ','
      &:last-child
        margin-right: 0px
        &::after
          content: ''
  .asc__card-mainTitle
    font-weight: bold
    font-style: italic
    margin: 5px 0 15px 0
    border-bottom: 1px #ddd solid
    padding: 0 0 15px 0px
    & a
      font-size: 14px
      color: #000
      font-weight: light
      text-decoration: underline
  .asc__table-create-btn
    background-color: #f59300
    border: none
    color: #ffffff
    border-radius: 0px !important
    &:hover
      background-color: darken(#f59300, 2)
      color: #fff
      cursor: pointer
  .asc__card-dashboard-zindexarea
    position: relative
    .asc__card-dashboard-zindexarea-table
      position: absolute
      left: 0
      right: 0
      margin: auto
      width: calc(100% - 30px)
      z-index: 99
      top: 110px
      box-shadow: 0 20px 40px #3e3e3e
    .asc__card-dashboard-zindexarea-close
      position: absolute
      top: 80px
      right: -20px
      background: #000
      border-radius: 50px
      width: 30px
      height: 30px
      color: #fff
      text-align: center
      line-height: 0px
      & i
        margin-left: -3px
</style>
<style scope>
.table th, .table td {
  border-top: none;
}
</style>
