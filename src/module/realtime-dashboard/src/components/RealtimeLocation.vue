<template>
  <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 400px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-geoloc>
        <template>
          <vl-feature :id="`position-feature${index}`" v-for="(point, index) in points" :key="index">
            <vl-geom-point :coordinates="[point.y, point.x]"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="../../../static/marker.png" :scale="0.3" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>

export default {
  name: 'location',
  props: {
    points: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      zoom: 6,
      rotation: 0,
      center: []
    }
  },
  mounted () {
    this.center = [35.2433, 38.9637]
  }
}
</script>
