<template>
  <b-modal id="route-location-modal" @show="show" :title="$t('insert.route.locationDetail')" size="xl" hide-footer no-close-on-backdrop>
    <b-row>
      <b-table-simple bordered small responsive>
          <b-thead>
            <b-tr>
              <b-th>{{$t('insert.route.Day1VisitOrder')}} <NextCheckBox v-model="model.Day1Value" type="number"></NextCheckBox></b-th>
              <b-th>{{$t('insert.route.Day2VisitOrder')}} <NextCheckBox v-model="model.Day2Value" type="number"></NextCheckBox></b-th>
              <b-th>{{$t('insert.route.Day3VisitOrder')}} <NextCheckBox v-model="model.Day3Value" type="number"></NextCheckBox></b-th>
              <b-th>{{$t('insert.route.Day4VisitOrder')}} <NextCheckBox v-model="model.Day4Value" type="number"></NextCheckBox></b-th>
              <b-th>{{$t('insert.route.Day5VisitOrder')}} <NextCheckBox v-model="model.Day5Value" type="number"></NextCheckBox></b-th>
              <b-th>{{$t('insert.route.Day6VisitOrder')}} <NextCheckBox v-model="model.Day6Value" type="number"></NextCheckBox></b-th>
              <b-th>{{$t('insert.route.Day7VisitOrder')}} <NextCheckBox v-model="model.Day7Value" type="number"></NextCheckBox></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day1VisitOrder" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day1Frequency" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day1FreStartDate" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day2VisitOrder" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day2Frequency" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day2FreStartDate" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day3VisitOrder" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day3Frequency" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day3FreStartDate" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day4VisitOrder" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day4Frequency" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day4FreStartDate" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day5VisitOrder" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day5Frequency" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day5FreStartDate" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day6VisitOrder" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day6Frequency" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day6FreStartDate" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day7VisitOrder" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day7Frequency" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day7FreStartDate" />
                  </NextFormGroup>
                </b-row>
              </b-td>
            </b-tr>
          </b-tbody>
      </b-table-simple>
      <b-col cols="12" class="text-right">
        <b-button
          @click="save"
          class="mt-4"
          size="sm"
          variant="success">
            <span><i class="fa fa-save"> </i> {{$t('list.save')}}</span>
        </b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/index'
import index from '../index.vue'

export default {
  components: { index },
  name: 'RouteLocationDetail',
  mixins: [mixin],
  props: {
    detail: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      model: {}
    }
  },
  methods: {
    show () {
      this.model = this.detail
    },
    save () {
      this.model.DayFreStartDate = this.model.Day1FreStartDate
      this.$emit('save', this.model, this.index)
      this.$bvModal.hide('route-location-modal')
    }
  }
}
</script>
<style>
.detail-width {
  width: 150px;
}
</style>
