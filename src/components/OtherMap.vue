<template>
  <div id="map" style="width: 100%; height: 100%;"></div>
</template>
<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.chinaProvider';
import config from "@/config/mapConfig";
export default {
  mounted() {
    this.loadMap()
  },
  methods: {
    loadMap() {
      /* This code is needed to properly load the images in the Leaflet CSS */
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('@/assets/marker-icon-2x.png'),
        iconUrl: require('@/assets/marker-icon.png'),
        shadowUrl: require('@/assets/marker-shadow.png'),
      });

      const map = L.map("map", {
        attributionControl: false
      }).setView(config.mapInitParams.center, config.mapInitParams.zoom);

      //创建底图切换数据源
      const baseLayer1 = L.tileLayer(config.baseMaps[0].Url,);//OSM街道图
      const baseLayer2 = L.tileLayer(config.baseMaps[1].Url);//ArcGIS影像图
      const baseLayer3 = L.tileLayer(config.baseMaps[2].Url);//ArcGIS街道图
      const baseLayer4 = L.tileLayer(config.baseMaps[3].Url, {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
      });//天地图街道图
      const baseLayer5 = L.tileLayer(config.baseMaps[4].Url, {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
      });//天地图影像图
      const baseLayer6 = L.tileLayer(config.baseMaps[5].Url);//谷歌街道图
      const baseLayer7 = L.tileLayer(config.baseMaps[6].Url);//谷歌影像图
      const baseLayer8 = L.tileLayer(config.baseMaps[7].Url, {
        subdomains: ["1", "2", "3", "4"]
      });//高德街道图
      const baseLayer9 = L.tileLayer(config.baseMaps[8].Url, {
        subdomains: ["1", "2", "3", "4"]
      });//高德影像图

      map.addLayer(baseLayer2);//地图默认加载的底图
      const baseLayers = {
        OSM街道图: baseLayer1,
        ArcGIS影像图: baseLayer2,
        ArcGIS街道图: baseLayer3,
        天地图街道图: baseLayer4,
        天地图影像图: baseLayer5,
        谷歌街道图: baseLayer6,
        谷歌影像图: baseLayer7,
        高德街道图: baseLayer8,
        高德影像图: baseLayer9
      };
      //底图切换控件
      L.control.layers(baseLayers, null).addTo(map);
      //监听地图点击事件
      // map.on("click",(evt)=>{
      //    console.log(evt);
      // })
      //监听地图底图切换事件
      // map.on("baselayerchange",(e)=>{
      //    //console.log(e);
      // })
    }
  }
}
</script>