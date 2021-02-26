<template>
  <b-overlay :show="status" rounded="sm">
    <b-row class="asc__modal-approveModal">
      <b-col cols="12">
        <h5>{{$t('insert.rejectModal')}}</h5>
      </b-col>
      <b-col v-if="((data.ApproveStateId === null) || (data.ApproveStateId === ''))" cols="12" class="asc__modal-approveModal-body">
        <p>{{$t('insert.approveStateError')}}</p>
      </b-col>
      <b-col v-else cols="12" class="asc__modal-approveModal-body">
        <p style="font-weight: bold">{{title}}</p>
        <p>{{message}}</p>
      </b-col>
      <b-col v-if="((data.ApproveStateId != null) || (data.ApproveStateId != ''))" cols="12" class="asc__modal-approveModal-footer">
        <b-button-group class="w-100">
          <b-button type="button" @click="closeModal()" variant="danger" size="lg" >
            {{$t('insert.cancel')}}
          </b-button>
          <b-button id="submitButton" type="button" size="lg" @click="submit()" variant="success" >
            {{$t('insert.submit')}}
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-overlay>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      status: false,
      title: ''
    }
  },
  props: ['action', 'recordId', 'data', 'query', 'message'],
  computed: {
    ...mapState(['BranchId', 'CompanyId'])
  },
  methods: {
    closeModal () {
      this.$root.$emit('bv::hide::modal', 'approve-reject-modal')
    },
    submit () {
      if ((this.data.ApproveStateId === null) || (this.data.ApproveStateId === '')) {
        this.$toasted.show(this.$t('insert.approveStateError'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
      } else {
        this.status = true
        let update = {
          'BranchId': this.BranchId,
          'CompanyId': this.CompanyId,
          'model': {
            'updatedProperties': [
              'ApproveStateId'
            ],
            'recordId': this.recordId,
            'approveStateId': this.data.ApproveStateId,
            'companyId': this.data.CompanyId,
            'branchId': this.data.BranchId,
            'deleted': 0,
            'system': 0
          }
        }
        return axios.post(this.action, update, {
          headers: {
            'key': localStorage.getItem('Key')
          }
        })
          .then(res => {
            this.status = false
            this.$toasted.show(this.$t('insert.approveRejectSuccess'), {
              type: 'success',
              keepOnHover: true,
              duration: '3000'
            })
            this.closeModal()
          })
          .catch(err => {
            this.status = false
            this.$toasted.show(this.$t('insert.approveRejectError'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
            console.log(err)
          })
      }
    }
  },
  mounted () {
    let q = this.query
    let val = q.split(',')
    let msg = ''
    val.forEach(el => {
      msg += `${this.data[el.trim()]} `
    })
    this.title = msg
  },
  watch: {
  }
}
</script>
