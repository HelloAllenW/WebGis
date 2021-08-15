<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>
<script>
import * as echarts from 'echarts';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      var map = L.map("map", { attributionControl: false }).setView(
        [23.111233437208057, 113.27007293701172],
        13
      );
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox.streets",
        }
      ).addTo(map);
      //添加地图控件control形式加载统计图
      initControl_Chart(map);
      //Marker形式叠加统计图
      initControl_Marker(map);
      //Popup点击弹窗形式加载统计图
      initControl_Popup(map);

      function initControl_Marker(map) {
        L.marker([23.11, 113.27], {
          icon: L.divIcon({
            className: "leaflet-echart-icon",
            iconSize: [160, 160],
            html: '<div id="cMark" style="width:160px;height:160px;position:relative;background-color:transparent;"></div>',
          }),
        }).addTo(map);

        var ChartMarker = echarts.init(document.getElementById("cMark"));
        var option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            x: "left",
            data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold",
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 234, name: "联盟广告" },
                { value: 135, name: "视频广告" },
                { value: 1548, name: "搜索引擎" },
              ],
            },
          ],
        };
        ChartMarker.setOption(option);
      }

      function initControl_Chart(map) {
        var chartCtr = L.control({ position: "bottomright" });
        chartCtr.onAdd = function () {
          var div = L.DomUtil.create("div", "info chart");
          div.id = "chartControl";
          return div;
        };
        chartCtr.addTo(map);
        var myChartControl = echarts.init(
          document.getElementById("chartControl")
        );
        var option = null;
        option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ["蒸发量", "降水量", "平均温度"],
          },
          xAxis: [
            {
              type: "category",
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "水量",
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: "{value} ml",
              },
            },
            {
              type: "value",
              name: "温度",
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: "{value} °C",
              },
            },
          ],
          series: [
            {
              name: "蒸发量",
              type: "bar",
              data: [
                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
                3.3,
              ],
            },
            {
              name: "降水量",
              type: "bar",
              data: [
                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
                2.3,
              ],
            },
            {
              name: "平均温度",
              type: "line",
              yAxisIndex: 1,
              data: [
                2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0,
                6.2,
              ],
            },
          ],
        };
        myChartControl.setOption(option);
      }

      function initControl_Popup(map) {
        var popChartMarker = L.marker([23.15, 113.25]).addTo(map);
        //配置弹出框
        var content = '<div style="width:500px;height:300px" id="mark"></div>';
        popChartMarker.bindPopup(content, { maxWidth: 2000 });
        popChartMarker.on("popupopen", function () {
          var myChart = echarts.init(document.getElementById("mark"));
          var option = {
            title: {
              text: "",
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
            },
            legend: {
              data: [
                "邮件营销",
                "联盟广告",
                "视频广告",
                "直接访问",
                "搜索引擎",
              ],
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
              },
            ],
            yAxis: [
              {
                type: "value",
              },
            ],
            series: [
              {
                name: "邮件营销",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210],
              },
              {
                name: "联盟广告",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310],
              },
              {
                name: "视频广告",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410],
              },
              {
                name: "直接访问",
                type: "line",
                stack: "总量",
                areaStyle: { normal: {} },
                data: [320, 332, 301, 334, 390, 330, 320],
              },
              {
                name: "搜索引擎",
                type: "line",
                stack: "总量",
                label: {
                  normal: {
                    show: true,
                    position: "top",
                  },
                },
                areaStyle: { normal: {} },
                data: [820, 932, 901, 934, 1290, 1330, 1320],
              },
            ],
          };
          myChart.setOption(option);
        });
      }
    },
  },
};
</script>
<style scoped>
.chart {
  width: 600px;
  height: 300px;
  background-color: #fff;
}
</style>