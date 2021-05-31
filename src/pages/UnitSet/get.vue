<template>
  <div class="asc__showPage">
    <div class="asc__showPage-times">
      <i class="fas fa-times-circle" @click="closeQuick()" />
    </div>
    <div class="asc__showPage-container">
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
            <span><i class="far fa-circle" />  <b>{{$t('insert.unitSet.code')}}:</b> {{rowData.Code}}</span>
            <span><i class="far fa-circle" />  <b>{{$t('insert.unitSet.status')}}:</b> {{(rowData.Status) ? rowData.Status.Label : ''}}</span>
          </section>
        </b-col>
      </b-row>
      <b-tabs>
        <b-tab :title="$t('insert.unitSet.title')" active>
          <b-row class="p-4">
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.Description1, 'text', 'insert.unitSet.description1')"></div>
            </b-card>
            <b-card class="col-md-6 col-12 asc__showPage-card">
              <div v-html="getFormatDataByType(rowData.CardType, 'object', 'insert.unitSet.cardType')"></div>
            </b-card>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.unitSet.units')">
          <b-row>
            <b-col>
              <b-card class="m-3 asc__showPage-card">
                <b-table-simple responsive bordered small>
                  <b-thead>
                    <b-tr>
                      <b-th><span>{{$t('insert.unitSet.unitDefinitions')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.convFact1')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.convFact2')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.length')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.lengthUnit')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.width')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.widthUnit')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.height')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.heightUnit')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.area')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.areaUnit')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.volume')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.volumeUnit')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.weight')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.weightUnit')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.isMainUnit')}}</span></b-th>
                      <b-th><span>{{$t('insert.unitSet.isDivUnit')}}</span></b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <tr v-for="(unit, i) in rowData.Units" :key="i">
                      <b-td>{{unit.Unit ? unit.Unit.Label : ''}}</b-td>
                      <b-td>{{unit.ConvFact1}}</b-td>
                      <b-td>{{unit.ConvFact2}}</b-td>
                      <b-td>{{unit.Length}}</b-td>
                      <b-td>{{unit.LengthUnit ? unit.LengthUnit.Label : ''}}</b-td>
                      <b-td>{{unit.Width}}</b-td>
                      <b-td>{{unit.WidthUnit ? unit.WidthUnit.Label : ''}}</b-td>
                      <b-td>{{unit.Height}}</b-td>
                      <b-td>{{unit.HeightUnit ? unit.HeightUnit.Label : ''}}</b-td>
                      <b-td>{{unit.Area}}</b-td>
                      <b-td>{{unit.AreaUnit ? unit.AreaUnit.Label : ''}}</b-td>
                      <b-td>{{unit.Volume}}</b-td>
                      <b-td>{{unit.VolumeUnit ? unit.VolumeUnit.Label : ''}}</b-td>
                      <b-td>{{unit.Weight}}</b-td>
                      <b-td>{{unit.WeightUnit ? unit.WeightUnit.Label : ''}}</b-td>
                      <b-td>
                        <span v-if="unit.isMainUnit == 1"><i class="fa fa-check text-success"></i></span>
                        <span v-if="unit.isMainUnit != 1"><i class="fa fa-times text-danger"></i></span>
                      </b-td>
                      <b-td>
                        <span v-if="unit.isDivUnit == 1"><i class="fa fa-check text-success"></i></span>
                        <span v-if="unit.isDivUnit !== 1"><i class="fa fa-times text-danger"></i></span>
                      </b-td>
                    </tr>
                  </b-tbody>
                </b-table-simple>
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
  mounted () {
    this.getRowData()
  },
  computed: {
    ...mapState(['rowData', 'style'])
  },
  methods: {
    closeQuick () {
      this.$router.push({name: this.$route.meta.base})
    },
    getRowData () {
      this.$store.dispatch('getData', {...this.query, api: 'VisionNextUnit/api/UnitSet', record: this.$route.params.url})
    }
  }
}
</script>
