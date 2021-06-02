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
          </header>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <section>
            <span><i class="fas fa-user-alt" />  <b>{{$t('get.CycleInstruction.Customer')}}:</b> {{ rowData.Customer && rowData.Customer.Label }}</span>
            <span><i class="fas fa-angle-double-right" />  <b>{{$t('get.CycleInstruction.CycleInstruction')}}:</b> {{ rowData.CycleInstruction && rowData.CycleInstruction.Label }}</span>
            <span><i class="fas fa-angle-double-right" />  <b>{{$t('get.CycleInstruction.InstructionState')}}:</b> {{ rowData.InstructionState && rowData.InstructionState.Label }}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.CycleInstruction.CycleInstructionTaskItems')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <NextDetailPanel type="get" v-model="rowData.CycleInstCustomerTasks" :items="taskItems" />
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
import { detailData } from './detailPanelData'
export default {
  props: ['dataKey'],
  mixins: [mixin],
  data () {
    return {
      taskItems: detailData.taskItems
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextFieldManagement/api/CycleInstructionCustomer', record: this.$route.params.url})
    }
  }
}
</script>
