<template>
  <div style="padding:20px;">
    <h1>Leaflet</h1>
    <hr>
    <ol>
        <li><router-link to="/OtherMap">切换地图</router-link></li><br />
        <li><router-link to="/BaiduMap">百度地图</router-link></li>
        <p>加载的在线地图分别是 OSM 地图、ArcGIS 地图、天地图、高德地图、谷歌地图以及百度地图。
          由于加载百度地图比较特殊，它采用的投影坐标系方案定义，跟其他在线地图不一致，需要自定义 L.Proj.CRS。
          所以，为了简单化测试，加载百度地图是在另一个地图页面来的。</p>
        <li><router-link to="/SplitScreenMap">地图分屏对比且联动</router-link></li><br />
        <li><router-link to="/EchartsInMap">leaflet 结合 Echarts4 实现统计图</router-link></li><br />
    </ol>
    <hr>
  </div>
</template>
<script>
export default {
  
}
</script>