<template>
  <div>
    <b-row>
      <b-col cols="12">
        <header>
          <Breadcrumb :title="workOrder.Code" :route="'workOrder'" />
          <span><i class="fas fa-code" />  <b>Reference:</b> {{workOrder.SerialNumber}}</span>
          <span><i class="fas fa-calendar" />  <b>Date:</b> {{workOrder.SampleDate}}</span>
          <span><i class="fas fa-user" />  <b>Patient:</b> {{workOrder.PatientName + ' ' + workOrder.PatientSurname}}</span>
          <div class="clearfix"></div>
        </header>
      </b-col>
    </b-row>
    <b-tabs>
      <b-tab :title="$t('get.detail')" active>
        <b-row>
          <b-col cols="12" md="6" lg="4" xl="4">
            <div class="asc__getPage-detailPart">
              <h3>Analysis Request Info </h3>
              <ul>
                <li><i class="fas fa-user" />PatientName<span>{{workOrder.PatientName + ' ' + workOrder.PatientSurname}}</span></li>
                <li><i class="far fa-circle" />Patient ID Number <span>{{workOrder.ContactId}}</span></li>
                <li><i class="far fa-circle" />PatientBirthDate<span>{{workOrder.PatientBirthDate}}</span></li>
                <li><i class="far fa-circle" />Patient Phone <span>{{workOrder.PatientPhone}}</span></li>
                <li><i class="far fa-circle" />PatientGsm<span>{{workOrder.PatientGsm}}</span></li>
                <li><i class="far fa-circle" />Contact Name <span>{{workOrder.ContactName + ' ' + workOrder.ContactSurname}}</span></li>
                <li><i class="far fa-circle" />Contact Phone <span>{{workOrder.ContactPhone}}</span></li>
                <li><i class="far fa-circle" />Contact Hospital <span>{{workOrder.ContactOrganization}}</span></li>
                <li><i class="far fa-circle" />Contact Department <span>{{workOrder.ContactDepartment}}</span></li>
                <li><i class="far fa-circle" />Contact Email <span>{{workOrder.ContactEmail}}</span></li>
                <li><i class="far fa-circle" />Sample Status <span>{{workOrder.WorkOrderStatus.Label}}</span></li>
                <li><i class="far fa-circle" />Kit <span>{{workOrder.KitType.Label}}</span></li>
                <li><i class="far fa-circle" />Sample Type <span>{{workOrder.SampleType.Label}}</span></li>
                <li><i class="far fa-circle" />Patient Gender <span>{{workOrder.PatientGender.Label}}</span></li>
                <li><i class="far fa-circle" />PatientCountry <span>{{workOrder.PatientCountry.Label + ' / ' + workOrder.PatientCity.Label}}</span></li>
                <li><i class="far fa-circle" />PatientCountry <span>{{workOrder.PatientCountry.Label + ' / ' + workOrder.PatientCity.Label}}</span></li>
                <li><i class="far fa-circle" />Code <span>{{workOrder.Code}}</span></li>
                <li><i class="far fa-circle" />Reference Number <span>{{workOrder.SerialNumber}}</span></li>
              </ul>
            </div>
          </b-col>
          <b-col cols="12" md="12" lg="4" xl="4">
            <div class="asc__getPage-detailPart">
              <h3>Sharing</h3>
              <ul>
                <li v-for="(shr, i) in workOrder.WorkOrderReceivers" :key="i">
                  {{ shr.Contact.Email }}
                </li>
              </ul>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4" xl="4">
            <div class="asc__getPage-detailPart">
              <h3>Family Information</h3>
              <ul>
                <li>Parental Consanguinity<span>{{workOrder.ParentConsanMarriage === 1 ? 'evet' : 'hayır' }}</span></li>
                <li>Disease in Family History <span>{{workOrder.HasRelativesDisease === 1 ? 'evet' : 'hayır'}}</span></li>
              </ul>
            </div>
            <div class="asc__getPage-detailPart">
              <h3>Symptoms</h3>
              <ul>
                <li v-for="(syms, i) in workOrder.WorkOrderSymptoms" :key="i">
                  {{ syms.Symptom.Label }}
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['dataKey'],
  data () {
    return {
      showLoader: false,
      encryptedKey: this.$route.params.url
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['workOrder', 'style'])
  },
  methods: {
    getData () {
      let workorderKey = {
        'Authentication': {
          'Key': localStorage.getItem('Key'),
          'LanguageId': localStorage.getItem('LanguageId')
        },
        'EncryptedKey': this.encryptedKey
      }
      this.$store.dispatch('getWorkOrder', {...this.query, info: workorderKey})
    },
    dateFormat (e) {
      if (e) {
        const splDate = e.split('T')
        const newDate = splDate[0].split('-')
        const newTime = splDate[1].split(':')
        return newDate[2] + '-' + newDate[1] + '-' + newDate[0] + ' / ' + newTime[0] + ':' + newTime[1]
      }
    }
  }
}
</script>
<style lang="sass">
</style>
