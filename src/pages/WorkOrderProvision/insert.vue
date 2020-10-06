<template>
  <div>
    <b-row>
      <b-col cols="12">
        <header>
          <Breadcrumb title="Yeni Kayıt" :route="'workOrder'" />
          <div class="clearfix"></div>
        </header>
      </b-col>
    </b-row>
    <b-tabs>
      <b-tab :title="$t('insert.detail')" active>
        <b-row>
          <b-col cols="12" md="6" lg="4" xl="4">
            <h3>Analysis Request Info </h3>
            <b-row>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('sampleType')">
                  <v-select :options="sampleType" label="Label1" @input="selectSampleType" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('sampleDate')">
                  <b-form-datepicker id="example-datepicker" v-model="form.sampleDate" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('referenceNo')">
                  <b-form-input type="text" v-model="form.referenceNo" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('noKitsReceived')">
                  <b-form-checkbox v-model="form.noKitsReceived" name="noKitsReceived" value="1" unchecked-value="" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientIDNumber')">
                  <b-form-input type="text" v-model="form.patientIDNumber" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('notTurkishCitizen')">
                  <b-form-checkbox v-model="form.notTurkishCitizen" name="notTurkishCitizen" value="1" unchecked-value="" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('note')">
                  <b-form-input type="text" v-model="form.note" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('projectId')">
                  <v-select :options="projects" label="Label1" @input="selectProject" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientName')">
                  <b-form-input type="text" v-model="form.patientName" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientSurName')">
                  <b-form-input type="text" v-model="form.patientSurName" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientGender')">
                  <v-select :options="gender" label="Label1" @input="selectGender" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientBirthDate')">
                  <b-form-datepicker id="" v-model="form.patientBirthDate" />
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('patientPhone')">
                  <b-form-input type="tel" v-model="form.patientPhone" masked="true" v-mask="'05## ### ## ##'" placeholder="05__ ___ __ __" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="6" lg="8" xl="8">
            <h3>Family Information</h3>
            <b-row>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('parentalConsanguinity')">
                  <b-form-radio v-model="form.parentalConsanguinity" name="parentalConsanguinity" value="1">Yes</b-form-radio>
                  <b-form-radio v-model="form.parentalConsanguinity" name="parentalConsanguinity" value="0">No</b-form-radio>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6">
                <b-form-group :label="$t('diseaseinFamilyHistory')">
                  <b-form-radio v-model="form.diseaseinFamilyHistory" name="diseaseinFamilyHistory" value="1">Yes</b-form-radio>
                  <b-form-radio v-model="form.diseaseinFamilyHistory" name="diseaseinFamilyHistory" value="0">No</b-form-radio>
                </b-form-group>
              </b-col>
            </b-row>
            <h3>Symptoms</h3>
            <b-row>
              <b-col v-for="(s, i) in symptoms" :key="i" cols="12" lg="6">
                <b-form-checkbox
                  v-model="status"
                  name="symptoms"
                  :value="s.Symptom.Value"
                  unchecked-value=""
                >
                {{ s.Symptom.Label }}
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab :title="$t('insert.sharing')">
        <b-row>
          <b-col cols="12" md="6" lg="4" xl="4">
            <h3>Sharing </h3>
            <b-row>
              <b-col>{{ userData.Email }}</b-col>
              <b-col>{{ userData.Name }}</b-col>
              <b-col>{{ userData.Surname }}</b-col>
              <b-col>{{ userData.Phone }}</b-col>
              <b-col>{{ userData.Organization }}</b-col>
              <b-col>{{ userData.Department.Label }}</b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showLoader: false,
      form: {
        sampleType: '',
        sampleDate: '',
        gender: ''
      }
    }
  },
  computed: {
    ...mapState(['workOrder', 'style', 'sampleType', 'gender', 'projects', 'symptoms', 'userData'])
  },
  mounted () {
    this.getType()
  },
  methods: {
    getType () {
      let sampletype = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'Code': 350
      }
      this.$store.dispatch('getWOSampleType', {...this.query, info: sampletype})
      let gender = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'Code': 351
      }
      this.$store.dispatch('getWOGender', {...this.query, info: gender})
      let symptoms = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'EncryptedKey': this.$route.params.type
      }
      this.$store.dispatch('getSymptoms', {...this.query, info: symptoms})
      let userData = {
        'Authentication': {'Key': localStorage.getItem('Key'), 'LanguageId': localStorage.getItem('LanguageId')},
        'RecordId': JSON.parse(localStorage.getItem('UserModel')).UserId
      }
      this.$store.dispatch('getUserData', {...this.query, info: userData})
    },
    selectSampleType (e) {
      this.form.sampleType = e
    },
    selectGender (e) {
      this.form.gender = e
    },
    selectProject (e) {
      this.form.projectId = e
    }
  }
}
</script>
<style lang="sass">
</style>
