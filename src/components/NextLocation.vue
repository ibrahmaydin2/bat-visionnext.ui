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
      Zoom: {{ zoom }}<br>
      Center: {{ center }}<br>
      Rotation: {{ rotation }}<br>
      My geolocation: {{ geolocPosition }}
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      zoom: 15,
      center: [ 29.01728824244658, 41.114476264356966 ],
      rotation: 0,
      geolocPosition: undefined,
      test: [29.01728824244658, 41.114476264356966]
    }
  },
  mounted () {
    console.log('test')
  }
}
</script>
