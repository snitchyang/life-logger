import { diaries, tags } from "../../data/data";
import { IDiary, ITag } from "../../interface";

const chartTypes = {
  bar: "bar",
  bubble: "bubble",
  doughnut: "doughnut",
  pie: "pie",
  line: "line",
  polarArea: "polarArea",
  radar: "radar",
};
const chartType = chartTypes.pie;
const diaryList = diaries;
const tagList: string[] = tags.map((item: ITag) => item.content);
const getData = () => {
  let list: number[] = [];
  for (let i = 0; i < tagList.length; i++) {
    list.push(0);
  }
  diaryList.forEach((diary: IDiary) => {
    diary.tag.forEach((tag: ITag) => {
      const tagIndex = tagList.indexOf(tag.content);
      if (tagIndex >= 0 && tagIndex < list.length) list[tagIndex]++;
    });
  });
  return list;
};
const data = getData();
const label = tagList.map((item: string) => `\"${item}\"`);
export const chartHTML = `
<html lang="en-us">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<div>
    <canvas id="myChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script> 
const data = {
      labels: [${label}],
      datasets: [
        {
          label: "tag出现次数",
          data: [${data}],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(200,86,86)',
            'rgb(241,111,61)',
            'rgb(25,246,6)',
            'rgb(143,99,225)',
            'rgb(86,255,204)',
            'rgb(52,0,255)',
            'rgb(194,185,167)',
            'rgb(199,7,239)',
            'rgb(96,197,69)',
          ],
          hoverOffset: 4,
        },
      ],
    };
    const config = {
      type: "${chartType}",
      data: data,
    };
    const ctx = document.getElementById("myChart");
    new Chart(ctx, config);
</script>
</html>
  `;
export const mapHTML = `
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<style>
    #map-container {
        width:  100%;
        height: 100%;
    }
</style>
<div id="map-container"></div>
<script type="text/javascript">
  window._AMapSecurityConfig = {
      securityJsCode:'db5328e87d8d93c1552d4773b7624c04',
  }
</script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=751df63e511df1470816c41d9a4f0ae4"></script> 
<script>
    var map = new AMap.Map('map-container', {
        viewMode: '2D',
        zoom: 10,
        resizeEnable: true,
    });
     AMap.plugin(['AMap.ToolBar','AMap.Driving'],function(){//异步同时加载多个插件
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar);
    });
    AMap.plugin('AMap.Geolocation', function() {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      buttonOffset: new AMap.Pixel(10, 20),
      zoomToAccuracy: true,     
      buttonPosition: 'LB'
    })
    map.addControl(geolocation);
    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', onComplete)
    AMap.event.addListener(geolocation, 'error', onError)
  
    function onComplete (data) {
      window.ReactNativeWebView.postMessage(data);
    }
  
    function onError (data) {
      window.ReactNativeWebView.postMessage(data.message);
    }
  })
</script>  
`;
export const getPositionHTML = `
<html lang="en-us">
<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>location.html</title>
</head>
<body style="height: 0;">
<script>
    function sendData(data) {
        window.ReactNativeWebView.postMessage(data)
    }
    function getGPS() {
        var geoOptions = {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 5
        }
        var geoSuccess = function (position) {
            sendData(position);
        };
        var errMessage = {
            0: 'unknown error',
            1: 'permission denied',
            2: 'position unavailable (error response from location provider)',
            3: 'timed out'
        }
        var geoError = function (error) {
            sendData(error.message);
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    }
    getGPS();
    </script> 
    </body>
</html>`;
export const getGeoLocationJS = () => {
  const getCurrentPosition = `
    navigator.geolocation.getCurrentPosition = (success, error, options) => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'getCurrentPosition', options: options }));

      window.addEventListener('message', (e) => {
        let eventData = {}
        try {
          eventData = JSON.parse(e.data);
        } catch (e) {}

        if (eventData.event === 'currentPosition') {
          success(eventData.data);
        } else if (eventData.event === 'currentPositionError') {
          error(eventData.data);
        }
      });
    };
    true;
  `;

  const watchPosition = `
    navigator.geolocation.watchPosition = (success, error, options) => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'watchPosition', options: options }));

      window.addEventListener('message', (e) => {
        let eventData = {}
        try {
          eventData = JSON.parse(e.data);
        } catch (e) {}

        if (eventData.event === 'watchPosition') {
          success(eventData.data);
        } else if (eventData.event === 'watchPositionError') {
          error(eventData.data);
        }
      });
    };
    true;
  `;

  const clearWatch = `
    navigator.geolocation.clearWatch = (watchID) => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'clearWatch', watchID: watchID }));
    };
    true;
  `;

  return `
    (function() {
      ${getCurrentPosition}
      ${watchPosition}
      ${clearWatch}
    })();
  `;
};
