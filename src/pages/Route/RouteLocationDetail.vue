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
                    <NextInput type="number" v-model="model.Day1VisitOrder" :disabled="!model.Day1Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day1Frequency" :disabled="!model.Day1Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day1FreStartDate" :disabled="!model.Day1Value" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day2VisitOrder" :disabled="!model.Day2Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day2Frequency" :disabled="!model.Day2Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day2FreStartDate" :disabled="!model.Day2Value" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day3VisitOrder" :disabled="!model.Day3Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day3Frequency" :disabled="!model.Day3Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day3FreStartDate" :disabled="!model.Day3Value" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day4VisitOrder" :disabled="!model.Day4Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day4Frequency" :disabled="!model.Day4Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day4FreStartDate" :disabled="!model.Day4Value" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day5VisitOrder" :disabled="!model.Day5Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day5Frequency" :disabled="!model.Day5Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day5FreStartDate" :disabled="!model.Day5Value" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day6VisitOrder" :disabled="!model.Day6Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day6Frequency" :disabled="!model.Day6Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day6FreStartDate" :disabled="!model.Day6Value" />
                  </NextFormGroup>
                </b-row>
              </b-td>
              <b-td class="detail-width">
                <b-row class="detail-width">
                  <NextFormGroup :title="$t('insert.route.visitCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day7VisitOrder" :disabled="!model.Day7Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.weekCount')" md="12" lg="12">
                    <NextInput type="number" v-model="model.Day7Frequency" :disabled="!model.Day7Value" />
                  </NextFormGroup>
                  <NextFormGroup :title="$t('insert.route.startDate')" md="12" lg="12">
                    <NextDatePicker v-model="model.Day7FreStartDate" :disabled="!model.Day7Value" />
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
  },
  watch: {
    'model.Day1Value': {
      handler (newVal, oldVal) {
        if (oldVal === 0 && newVal === 1) {
          this.model.Day1VisitOrder = 1
          this.model.Day1Frequency = 1
        } else if (newVal === 0) {
          this.model.Day1VisitOrder = null
          this.model.Day1Frequency = null
          this.model.Day1FreStartDate = null
        }
      }
    },
    'model.Day2Value': {
      handler (newVal, oldVal) {
        if (oldVal === 0 && newVal === 1) {
          this.model.Day2VisitOrder = 1
          this.model.Day2Frequency = 1
        } else if (newVal === 0) {
          this.model.Day2VisitOrder = null
          this.model.Day2Frequency = null
          this.model.Day2FreStartDate = null
        }
      }
    },
    'model.Day3Value': {
      handler (newVal, oldVal) {
        if (oldVal === 0 && newVal === 1) {
          this.model.Day3VisitOrder = 1
          this.model.Day3Frequency = 1
        } else if (newVal === 0) {
          this.model.Day3VisitOrder = null
          this.model.Day3Frequency = null
          this.model.Day3FreStartDate = null
        }
      }
    },
    'model.Day4Value': {
      handler (newVal, oldVal) {
        if (oldVal === 0 && newVal === 1) {
          this.model.Day4VisitOrder = 1
          this.model.Day4Frequency = 1
        } else if (newVal === 0) {
          this.model.Day4VisitOrder = null
          this.model.Day4Frequency = null
          this.model.Day4FreStartDate = null
        }
      }
    },
    'model.Day5Value': {
      handler (newVal, oldVal) {
        if (oldVal === 0 && newVal === 1) {
          this.model.Day5VisitOrder = 1
          this.model.Day5Frequency = 1
        } else if (newVal === 0) {
          this.model.Day5VisitOrder = null
          this.model.Day5Frequency = null
          this.model.Day5FreStartDate = null
        }
      }
    },
    'model.Day6Value': {
      handler (newVal, oldVal) {
        if (oldVal === 0 && newVal === 1) {
          this.model.Day6VisitOrder = 1
          this.model.Day6Frequency = 1
        } else if (newVal === 0) {
          this.model.Day6VisitOrder = null
          this.model.Day6Frequency = null
          this.model.Day6FreStartDate = null
        }
      }
    },
    'model.Day7Value': {
      handler (newVal, oldVal) {
        if (oldVal === 0 && newVal === 1) {
          this.model.Day7VisitOrder = 1
          this.model.Day7Frequency = 1
        } else if (newVal === 0) {
          this.model.Day7VisitOrder = null
          this.model.Day7Frequency = null
          this.model.Day7FreStartDate = null
        }
      }
    }
  }
}
</script>
<style>
.detail-width {
  width: 150px;
}
</style>
