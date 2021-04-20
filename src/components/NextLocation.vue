<template>
  <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 600px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-geoloc>
        <template>
          <vl-feature id="position-feature">
            <vl-geom-point v-if='location' :coordinates="location"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="../../static/marker.png" :scale="0.3" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
    <div style="padding: 20px">
      {{$t('insert.customer.Model_Code')}}: {{Location.Code}}<br>
      {{$t('insert.customer.Model_Location_Description1')}}: {{Location.Description1}}<br>
      {{$t('insert.customer.Model_XPosition')}} - {{$t('insert.customer.Model_YPosition')}}: {{ Location.XPosition }} - {{ Location.YPosition }}<br>
      {{$t('insert.warehouse.Address')}}: {{ Location.AddressDetail }}<br>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    Location: {}
  },
  data () {
    return {
      zoom: 16,
      center: [],
      rotation: 0,
      geolocPosition: undefined,
      location: []
    }
  },
  mounted () {
    this.location = [this.Location.YPosition, this.Location.XPosition]
    this.center = [this.Location.YPosition, this.Location.XPosition]
  }
}
</script>
