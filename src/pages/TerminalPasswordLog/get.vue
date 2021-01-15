<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div v-if="rowData" class="asc__showPage-container">
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
            <span><i class="fas fa-check" />  <b>{{$t('insert.warehouse.status')}}:</b> {{rowData.StatusId ? $t('insert.active') : $t('insert.passive') }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('get.detail')" active>
          <b-row>
            <b-col cols="12" md="4">
              <b-card class="m-3 asc__showPage-card">
                <h6>{{$t('get.detail')}}</h6>
                <span><i class="far fa-circle" /> {{$t('get.terminal.Branch')}}</span> <p>{{rowData.Branch ? rowData.Branch.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.OperationType')}}</span> <p>{{rowData.TerminalOperationType ? rowData.TerminalOperationType.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.Representative')}}</span> <p>{{rowData.Representative ? rowData.Representative.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.OperationState')}}</span> <p>{{rowData.TerminalOperationState ? rowData.TerminalOperationState.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.TransferMethod')}}</span> <p>{{rowData.TerminalTransferMethod ? rowData.TerminalTransferMethod.Label : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.OperationDate')}}</span> <p>{{rowData.OperationDate ? dateConvertFromTimezone(rowData.OperationDate) : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.OperationTime')}}</span> <p>{{rowData.OperationTime ? rowData.OperationTime : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.TerminalVersion')}}</span> <p>{{rowData.TerminalVersion ? rowData.TerminalVersion : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.TransferAppVersion')}}</span> <p>{{rowData.TransferAppVersion ? rowData.TransferAppVersion : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.UserDate')}}</span> <p>{{rowData.UserDate ? dateConvertFromTimezone(rowData.UserDate) : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.TransferFileName')}}</span> <p>{{rowData.TransferFileName ? rowData.TransferFileName : ''}}</p>
                <span><i class="far fa-circle" /> {{$t('get.terminal.ErrorMessage')}}</span> <p>{{rowData.ErrorMessage ? rowData.ErrorMessage : ''}}</p>
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
import mixin from '../../mixins/index'
export default {
  mixins: [mixin],
  props: ['dataKey'],
  data () {
    return {
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
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextMobileApi/api/TerminalOperationLog', record: this.$route.params.url})
    }
  }
}
</script>
<style lang="sass">
</style>
