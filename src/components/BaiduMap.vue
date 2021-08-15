<template>
  <!-- Leaflet加载百度地图 -->
  <div id="map" style="width: 100%; height: 100%"></div>
</template>
<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.chinaProvider";
import config from "@/config/mapConfig";

export default {
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      // This code is needed to properly load the images in the Leaflet CSS
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("@/assets/marker-icon-2x.png"),
        iconUrl: require("@/assets/marker-icon.png"),
        shadowUrl: require("@/assets/marker-shadow.png"),
      });

      //请引入 proj4.js 和 proj4leaflet.js
      L.CRS.Baidu = new L.Proj.CRS(
        "EPSG:900913",
        `+proj=merc
                +a=6378206
                +b=6356584.314245179
                +lat_ts=0.0
                +lon_0=0.0
                +x_0=0
                +y_0=0
                +k=1.0
                +units=m
                +nadgrids=@null
                +wktext
                +no_defs`,
        {
          resolutions: (function () {
            var res = [],
              level = 19;
            res[0] = Math.pow(2, 18);
            for (var i = 1; i < level; i++) {
              res[i] = Math.pow(2, 18 - i);
            }
            return res;
          })(),
          origin: [0, 0],
          bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244]),
        }
      );

      const map = L.map("map", {
        crs: L.CRS.Baidu, // if use baidu  L.CRS.EPSG3857
        attributionControl: false,
      }).setView(config.mapInitParams.center, config.mapInitParams.zoom);

      //创建底图切换数据源
      const baseLayer9 = L.tileLayer(config.baseMaps[9].Url, {
        subdomains: "0123456789",
        styles: ({ bigfont }) => (bigfont ? "ph" : "pl"),
        tms: true,
      }); //百度街道图

      const baseLayer10 = L.tileLayer(config.baseMaps[10].Url, {
        subdomains: "0123456789",
        styles: ({ bigfont }) => (bigfont ? "sh" : "sl"),
        tms: true,
      }); //百度影像图

      map.addLayer(baseLayer9); //地图默认加载的底图
      const baseLayers = {
        百度街道图: baseLayer9,
        百度影像图: baseLayer10,
      };
      //底图切换控件
      L.control.layers(baseLayers, null).addTo(map);
    },
  },
};
</script>
