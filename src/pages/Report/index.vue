<template>
  <div>
    <b-row>
      <b-col cols="12">
        <header style="display:flex; align-items:center; justify-content: space-between">
          <Breadcrumb title="Detaylar" route="Report" />
        </header>
      </b-col>
    </b-row>
    <b-tabs content-class="mt-3">
      <b-tab title="Summary">
        <b-row>
          <b-col cols="12">
            <b-card title="Variants">
              <b-table-simple>
                <b-thead>
                  <b-tr>
                    <b-th></b-th>
                    <b-th>Gene Report</b-th>
                    <b-th>Chr</b-th>
                    <b-th>Other Info</b-th>
                    <b-th>Nukleotit Report</b-th>
                    <b-th>Classification</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(row, i) in reportDetails" :key="i">
                    <b-td v-if="i==0" :rowspan="reportDetails.length" style="vertical-align: middle">
                      <b>{{row.Gene}}{{reportDetails.length}}</b>
                    </b-td>
                    <b-td>
                      {{row.GeneReport}}
                    </b-td>
                    <b-td>
                      {{row.Chr}} {{row.Start}}-{{row.End}}
                    </b-td>
                    <b-td>
                      {{row.OtherInfo}}
                    </b-td>
                    <b-td>
                      {{row.NukleotitReport}}
                    </b-td>
                    <b-td>
                      {{row.Classification}}
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="4">
            <b-card :title="'Gene2Var Processor ' + toolVersionTitle">
              <b-list-group>
                <b-list-group-item v-for="(item, i) in toolVersions" :key="i" class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>{{item.Name}}</span>
                  </div>
                  <span>{{item.Version}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card title="Symptoms" v-if="workOrderSymptoms.length > 0">
              <b-list-group>
                <b-list-group-item v-for="(item, i) in workOrderSymptoms" :key="i" class="d-flex align-items-center">
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>{{item.Symptom.Label}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col cols="4" v-if="Object.keys(this.kitType).length > 0">
            <b-card :title="kitType.Code">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Catalog Name</span>
                  </div>
                  <span>{{kitType.CatalogName}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Genexp1</span>
                  </div>
                  <span>{{kitType.Genexp1}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Platform</span>
                  </div>
                  <span>{{kitType.Platform.Label}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Genes</span>
                  </div>
                  <span v-for="(item, i) in kitType.KitTypeGeneDetails" :key="i">{{item.Gene.Label}}
                    <span v-if="kitType.KitTypeGeneDetails.length - 1 !== i">-</span>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-2" v-if="typeof reportWorkOrderData.WorkOrder !== 'undefined'">
          <b-col cols="4">
            <b-card title="Work Order Details">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Name</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientName}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Surname</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientSurname}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient ID Number</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientIdentifier}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Birthdate</span>
                  </div>
                  <span>{{dateConvertToTimestamp(reportWorkOrderData.WorkOrder.PatientBirthDate)}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Gender</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientGender.Label}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Phone</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientPhone}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Country</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientCountry.Label}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient City</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientCity.Label}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card title="Contact Info">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Name</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactName}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Surname</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactSurname}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Email</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactEmail}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Phone</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactPhone}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Phone 2</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactGsm}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card title="Work Order Receivers">
              <table class="table table-striped table-hover asc__sharing-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in reportWorkOrderData.WorkOrder.WorkOrderReceivers" :key="i">
                    <td>{{item.Email}}</td>
                    <td>{{item.Title}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.Surname}}</td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Info">
        <b-row class="mt-2" v-if="typeof reportWorkOrderData.WorkOrder !== 'undefined'">
          <b-col cols="4">
            <b-card title="Work Order Details">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Name</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientName}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Surname</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientSurname}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient ID Number</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientIdentifier}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Birthdate</span>
                  </div>
                  <span>{{dateConvertToTimestamp(reportWorkOrderData.WorkOrder.PatientBirthDate)}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Gender</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientGender.Label}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Phone</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientPhone}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient Country</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientCountry.Label}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Patient City</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.PatientCity.Label}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card title="Contact Info">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Name</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactName}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Surname</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactSurname}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Email</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactEmail}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Phone</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactPhone}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Contact Phone 2</span>
                  </div>
                  <span>{{reportWorkOrderData.WorkOrder.ContactGsm}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card title="Work Order Receivers">
              <table class="table table-striped table-hover asc__sharing-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in reportWorkOrderData.WorkOrder.WorkOrderReceivers" :key="i">
                    <td>{{item.Email}}</td>
                    <td>{{item.Title}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.Surname}}</td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Symptoms">
        <b-row v-if="typeof workOrderSymptoms !== 'undefined'">
          <b-col cols="4">
            <b-card title="Symptoms">
              <b-list-group>
                <b-list-group-item v-for="(item, i) in workOrderSymptoms" :key="i" class="d-flex align-items-center">
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>{{item.Symptom.Label}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Kit Info">
        <b-row>
          <b-col cols="4" v-if="Object.keys(this.kitType).length > 0">
            <b-card :title="kitType.Code">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Catalog Name</span>
                  </div>
                  <span>{{kitType.CatalogName}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Genexp1</span>
                  </div>
                  <span>{{kitType.Genexp1}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Platform</span>
                  </div>
                  <span>{{kitType.Platform.Label}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <div>
                    <i class="fa fa-circle-notch text-warning mr-1"></i>
                    <span>Genes</span>
                  </div>
                  <span v-for="(item, i) in kitType.KitTypeGeneDetails" :key="i">{{item.Gene.Label}}
                    <span v-if="kitType.KitTypeGeneDetails.length - 1 !== i">-</span>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Report" active>
        <b-row v-html="html">
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mixin from '../../mixins/index'

export default {
  mixins: [mixin],
  data () {
    return {
      // Burası şimdilik statik şuanda son test taleplerinde tamamlanmış olmadığı için
      key: '-X1EdmbO0JY1',
      reportDetails: [],
      toolVersions: [],
      toolVersionTitle: [],
      workOrderSymptoms: [],
      html: '',
      fields: [
        {
          key: 'gene',
          label: ''
        },
        {
          key: 'geneReport',
          label: 'Gene Report'
        },
        {
          key: 'chr',
          label: 'Chr'
        },
        {
          key: 'otherInfo',
          label: 'Other Info'
        },
        {
          key: 'nukleotitReport',
          label: 'Nukleotit Report'
        },
        {
          key: 'classsification',
          label: 'Classification'
        }
      ]
    }
  },
  created () {
    // this.key = this.$route.params.type
    let getReport = {
      'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
      'EncryptedKey': this.key
    }
    this.$store.dispatch('getReport', {...this.query, info: getReport}).then(res => {
      let encryptedKey = this.reportWorkOrderData.WorkOrder.Samples[0].EncryptedKey
      this.workOrderSymptoms = this.reportWorkOrderData.WorkOrder.WorkOrderSymptoms

      let kitType = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'RecordId': this.reportWorkOrderData.WorkOrder.KitTypeId
      }
      this.$store.dispatch('getKitType', {...this.query, info: kitType})

      let getReportData = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'EncryptedKey': encryptedKey
      }
      this.$store.dispatch('getReportData', {...this.query, info: getReportData})
      let getReportPdf = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'EncryptedKey': this.reportWorkOrderData.WorkOrder.Samples[0].EncryptedKey
      }
      this.$store.dispatch('getReportPdf', {...this.query, info: getReportPdf})
    })
  },
  computed: {
    ...mapState(['reportWorkOrderData', 'samples', 'kitType', 'reportPdf'])
  },
  watch: {
    samples (e) {
      if (e) {
        this.reportDetails = e.ReportData.ReportDetails
        let tmpArr = e.ReportData.ToolVersions.filter(item => item.Code === 'gene2info.processor')
        this.toolVersionTitle = tmpArr[0].Version
        this.toolVersions = e.ReportData.ToolVersions.filter(item => item.Code !== 'gene2info.processor')
      }
    },
    reportPdf (e) {
      if (e) {
        let bytes = new Uint8Array(e.PDFs[0]) // pass your byte response to this constructor
        let blob = new Blob([bytes], {type: 'application/pdf'}) // change resultByte to bytes
        let href = window.URL.createObjectURL(blob)
        this.html = `<embed src="${href}" height="800" width="100%" type="application/pdf">`
      }
    },
    kitType (e) {
      console.log(Object.keys(this.kitType).length)
    }
  }
}
</script>
