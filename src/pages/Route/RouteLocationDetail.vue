<template>
  <b-modal id="route-location-modal" @show="show" :title="$t('insert.route.locations')" size="xl" hide-footer no-close-on-backdrop>
    <b-row>
      <b-table-simple bordered hover small caption-top responsive>
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
              <b-td></b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      <b-col cols="12" md="6" lg="6">
        <b-form-group>
          <b-button
            @click="edit"
            class="mt-4 text-right"
            size="sm"
            variant="success">
              <span><i class="fa fa-pencil-alt"> </i> {{$t('list.edit')}}</span>
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
  </b-modal>
</template>
<script>
import mixin from '../../mixins/index'

export default {
  name: 'RouteLocationDetail',
  mixins: [mixin],
  props: {
    detail: {
      type: Object,
      default: () => {}
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
    edit () {

    }
  }
}
</script>
