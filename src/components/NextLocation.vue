<template>
  <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 400px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="test"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="http://maps.google.com/mapfiles/ms/icons/red.png" :scale="1.2" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
    <div style="padding: 20px">
      Lokasyon Kodu: {{Location.Code}}<br>
      Lokasyon Adı: {{Location.Description1}}<br>
      Boylam - Enlem: {{ Location.XPosition }} - {{ Location.YPosition }}<br>
      Adres Detayı: {{ Location.AddressDetail }}<br>
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
      zoom: 15,
      center: [],
      rotation: 0,
      geolocPosition: undefined,
      test: []
    }
  },
  mounted () {
    this.test = [this.Location.YPosition, this.Location.XPosition]
    this.center = [this.Location.YPosition, this.Location.XPosition]
  }
}
</script>
