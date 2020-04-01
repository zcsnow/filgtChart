
var color = ['#46bee9', '#ffa022', '#a6c84c']; //公用颜色
var startRoll = null;
//在飞航班飞行路线图表
var mapEcharts = echarts.init(document.getElementById("flightChart")); 
var series = [];
//城市经纬度数据
var geoCoordMap = {
    '上海': [121.4648,31.2891],
    '上海虹桥':[121.33429699999999,31.192209],
    '上海浦东':[121.80827299999999,31.1443439],
    '东莞': [113.8953,22.901],
    '东营': [118.7073,37.5513],
    '中山': [113.4229,22.478],
    '临汾': [111.4783,36.1615],
    '临沂': [118.3118,35.2936],
    '丹东': [124.541,40.4242],
    '丽水': [119.5642,28.1854],
    '乌鲁木齐': [87.9236,43.5883],
    '佛山': [112.8955,23.1097],
    '保定': [115.0488,39.0948],
    '兰州': [103.5901,36.3043],
    '包头': [110.3467,41.4899],
    '北京': [116.4551,40.2539],
    '北海': [109.314,21.6211],
    '南京': [118.8062,31.9208],
    '南宁': [108.479,23.1152],
    '南昌': [116.0046,28.6633],
    '南通': [121.1023,32.1625],
    '厦门': [118.1689,24.6478],
    '台州': [121.1353,28.6688],
    '合肥': [117.29,32.0581],
    '呼和浩特': [111.4124,40.4901],
    '咸阳': [108.4131,34.8706],
    '哈尔滨': [127.9688,45.368],
    '唐山': [118.4766,39.6826],
    '嘉兴': [120.9155,30.6354],
    '大同': [113.7854,39.8035],
    '大连': [122.2229,39.4409],
    '天津': [117.4219,39.4189],
    '太原': [112.3352,37.9413],
    '威海': [121.9482,37.1393],
    '宁波': [121.5967,29.6466],
    '宝鸡': [107.1826,34.3433],
    '宿迁': [118.5535,33.7775],
    '常州': [119.4543,31.5582],
    '广州': [113.5107,23.2196],
    '廊坊': [116.521,39.0509],
    '延安': [109.1052,36.4252],
    '张家口': [115.1477,40.8527],
    '徐州': [117.5208,34.3268],
    '德州': [116.6858,37.2107],
    '惠州': [114.6204,23.1647],
    '成都': [103.9526,30.7617],
    '扬州': [119.4653,32.8162],
    '承德': [117.5757,41.4075],
    '拉萨': [91.1865,30.1465],
    '无锡': [120.3442,31.5527],
    '日照': [119.2786,35.5023],
    '昆明': [102.9199,25.4663],
    '杭州': [119.5313,29.8773],
    '枣庄': [117.323,34.8926],
    '柳州': [109.3799,24.9774],
    '株洲': [113.5327,27.0319],
    '武汉': [114.3896,30.6628],
    '汕头': [117.1692,23.3405],
    '江门': [112.6318,22.1484],
    '沈阳': [123.1238,42.1216],
    '沧州': [116.8286,38.2104],
    '河源': [114.917,23.9722],
    '泉州': [118.3228,25.1147],
    '泰安': [117.0264,36.0516],
    '泰州': [120.0586,32.5525],
    '济南': [117.1582,36.8701],
    '济宁': [116.8286,35.3375],
    '海口': [110.3893,19.8516],
    '淄博': [118.0371,36.6064],
    '淮安': [118.927,33.4039],
    '深圳': [114.5435,22.5439],
    '清远': [112.9175,24.3292],
    '温州': [120.498,27.8119],
    '渭南': [109.7864,35.0299],
    '湖州': [119.8608,30.7782],
    '湘潭': [112.5439,27.7075],
    '滨州': [117.8174,37.4963],
    '潍坊': [119.0918,36.524],
    '烟台': [120.7397,37.5128],
    '玉溪': [101.9312,23.8898],
    '珠海': [113.7305,22.1155],
    '盐城': [120.2234,33.5577],
    '盘锦': [121.9482,41.0449],
    '石家庄': [114.4995,38.1006],
    '福州': [119.4543,25.9222],
    '秦皇岛': [119.2126,40.0232],
    '绍兴': [120.564,29.7565],
    '聊城': [115.9167,36.4032],
    '肇庆': [112.1265,23.5822],
    '舟山': [122.2559,30.2234],
    '苏州': [120.6519,31.3989],
    '莱芜': [117.6526,36.2714],
    '菏泽': [115.6201,35.2057],
    '营口': [122.4316,40.4297],
    '葫芦岛': [120.1575,40.578],
    '衡水': [115.8838,37.7161],
    '衢州': [118.6853,28.8666],
    '西宁': [101.4038,36.8207],
    '西安': [109.1162,34.2004],
    '贵阳': [106.6992,26.7682],
    '连云港': [119.1248,34.552],
    '邢台': [114.8071,37.2821],
    '邯郸': [114.4775,36.535],
    '郑州': [113.4668,34.6234],
    '鄂尔多斯': [108.9734,39.2487],
    '重庆': [107.7539,30.1904],
    '金华': [120.0037,29.1028],
    '铜川': [109.0393,35.1947],
    '银川': [106.3586,38.1775],
    '镇江': [119.4763,31.9702],
    '长春': [125.8154,44.2584],
    '长沙': [113.0823,28.2568],
    '长治': [112.8625,36.4746],
    '阳泉': [113.4778,38.0951],
    '青岛': [120.4651,36.3373],
    '韶关': [113.7964,24.7028],
    '旧金山':[-122.41941550000001,37.7749295],
    '东京羽田':[139.77983859999995,35.55483999692202],
    '巴黎':[2.3522219000000177,48.856614],
    '洛杉矶':[-118.2436849,34.0522342],
    '伦敦':[-0.12775829999998223,51.5073509],
    '纽约':[-74.0059728,40.7127753],
    '台北桃园':[121.23421699999994,25.0796514],
    '奥克兰':[174.76333150000005,-36.8484597],
    '科伦坡':[79.86124300000006,6.9270786],
    '马德里':[-3.7037901999999576,40.4167754],
    '悉尼':[151.20929550000005,-33.8688197],
    '新加坡':[103.81983600000001,1.352083],
    '罗马':[12.496365500000024,41.9027835],
    '法兰克福':[8.682126700000026,50.1109221],
    '布里斯班':[153.02512350000006,-27.4697707],
    '温哥华':[-123.12073750000002,49.2827291],
    '香港':[114.10949700000003,22.396428],
    '布拉':[29.359878200000026,-3.361378],
    '墨尔本':[144.96305759999996,-37.8136276],
    '莫斯科':[37.617299900000035,55.755826],
    '台北松山':[121.56386210000005,25.0541591],
    '巴厘岛':[115.18891600000006,-8.4095178],
    '圣彼得堡':[30.335098600000038,59.9342802],
    '多伦多':[-79.38318429999998,43.653226],
    '阿姆斯特丹':[4.768274399999996,52.3105386],
    '阿姆':[4.768274399999996,52.3105386],
    '芝加哥':[-87.62979819999998,41.8781136],
    '新德里':[77.20902120000005,28.6139391],
    '那格浦尔':[79.08815460000005,21.1458004],
    '北海道':[141.3468074,43.06461470000001],
    '雅加达':[106.86503949999997,-6.17511],
    '檀香山':[-157.85833330000003,21.3069444],
    '首尔':[126.97796919999996,37.566535],
    '塞班':[145.7467259,15.1850483],
    '曼谷':[100.50176510000006,13.7563309],
    '马尔代夫':[73.22068000000002,3.202778],
    '迪拜':[55.270782800000006,25.2048493],
    '布拉格':[14.43780049999998,50.0755381]
   

};
//在飞航班起飞和降落城市数据
/*var flghtCityData = [
    [{name:'上海虹桥'},{name:'东京羽田'}],
    [{name:'上海浦东'},{name:'莫斯科'}],
    [{name:'莫斯科'},{name:'上海浦东'}],
    [{name:'上海浦东'},{name:'新加坡'}],
    [{name:'上海浦东'},{name:'香港'}],
    [{name:'北京'},{name:'上海浦东'}],
    [{name:'北京'},{name:'上海虹桥'}],
    [{name:'上海浦东'},{name:'墨尔本'}],
    [{name:'北京'},{name:'多伦多'}],
	[{name:'上海虹桥'},{name:'巴黎'}],
    [{name:'上海虹桥'},{name:'昆明'}],
    [{name:'上海虹桥'},{name:'广州'}],
    [{name:'上海虹桥'},{name:'郑州'}],
    [{name:'上海虹桥'},{name:'长春'}],
    [{name:'上海虹桥'},{name:'重庆'}],
    [{name:'上海虹桥'},{name:'长沙'}],
    [{name:'上海虹桥'},{name:'北京'}],
    [{name:'上海虹桥'},{name:'丹东'}],
    [{name:'上海虹桥'},{name:'大连'}],
	[{name:'上海浦东'},{name:'伦敦'}],
    [{name:'上海浦东'},{name:'洛杉矶'}],
    [{name:'上海浦东'},{name:'旧金山'}],
    [{name:'上海浦东'},{name:'温哥华'}],
    [{name:'上海浦东'},{name:'悉尼'}],
    [{name:'上海浦东'},{name:'福州'}],
    [{name:'上海浦东'},{name:'芝加哥'}],
    [{name:'拉萨'},{name:'台北松山'}],
    [{name:'南宁'},{name:'深圳'}],
    [{name:'昆明'},{name:'南京'}],
    [{name:'武汉'},{name:'悉尼'}],
    [{name:'悉尼'},{name:'武汉'}],
    [{name:'广州'},{name:'北京'}]
];*/
//飞机svg图标
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

//航班城市赋值坐标
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    console.log(res);
    return res;
};


//console.log(series);
var mapOption = {
    title : {
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        //orient: 'vertical',
        top: 'bottom',
        left: 'center',
        data:['国内', '国际'],
        textStyle: {
            color: '#fff'
        },
    },
    geo: {
        map: 'world',
        zoom:1.40,
        //left: 0,
        //center:[121.4648,31.2891], 
        top:'30%', 
        //aspectScale:0.7,
        label: {
            show: false,
            textStyle: {
                color: '#fff'
            },
        },
        layoutCenter:['46%', '65%'],
        layoutSize:'100%',  
        roam: true,
        itemStyle: {
            areaColor: 'rgba(5, 5, 5,.8)',
            borderColor: '#404a59'
        },
        emphasis: {
            label:{
                show: false
            },
            itemStyle:{
                areaColor: 'rgba(5, 5, 5,1)'
            }
        }

    },
    series: series
};

//列表滚动
function textAutoRoll(){
	$(".scroll-text").animate({
		marginTop:"-46px"
	},500,function(){
		$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
	});
};

//日期时间获取
function getNowDate() {
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day  = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    var week = weekArr[date.getDay()-1];
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
     month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
     day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
     hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
     minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
     seconds = "0" + seconds;
    }
    //var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
    var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + " " + week;
    return currentdate;
}

//天气
function findWeather(city) {
            $('.weather .type>.icon').hide();
            $('.weather .type-text').remove();
            $('.weather>p').remove();
            var curCity = city? city:'北京'
            $.ajax({
                type: "GET",
                url: "http://wthrcdn.etouch.cn/weather_mini?city="+curCity,
                data: "",
                success: function(data){
                    var data = JSON.parse(data);
                    var city = data.data.city;
                    var forecast = data.data.forecast[0];
                    var type = forecast.type;
                    var low = forecast.low;
                    var high = forecast.high;
                    var fengxiang = forecast.fengxiang;
                    var fengli = forecast.fengli.slice(9,-3);
                    switch(type){
                        case '晴':
                            $('.weather .type>.sunny').show();
                            var typeHtml = '<span class="type-text">' + type +'</span>';
                            var html = '<p>'+city+'<span>|</span>'+fengxiang+'('+fengli+')'+'<span>|</span>'+low+'-'+high+'</p>'
                            $('.weather').append(typeHtml)
                            $('.weather').append(html)
                        break;
                        case '小雨'||'中雨'||'大雨'||'暴雨'||'大暴雨'||'特大暴雨'||'冻雨':
                            $('.weather .type>.rainy').show();
                            var typeHtml = '<span class="type-text">' + type +'</span>';
                            var html = '<p>'+city+'<span>|</span>'+fengxiang+'('+fengli+')'+'<span>|</span>'+low+'-'+high+'</p>'
                            $('.weather').append(typeHtml)
                            $('.weather').append(html)
                        break;
                        case '多云':
                            $('.weather .type>.cloudy').show();
                            var typeHtml = '<span class="type-text">' + type +'</span>';
                            var html = '<p>'+city+'<span>|</span>'+fengxiang+'('+fengli+')'+'<span>|</span>'+low+'-'+high+'</p>'
                            $('.weather').append(typeHtml)
                            $('.weather').append(html)
                        break;
                        case '小雪'||'中雪'||'大雪'||'暴雪'||'阵雪'||'特大暴雨':
                            $('.weather .type>.flurries').show();
                            var typeHtml = '<span class="type-text">' + type +'</span>';
                            var html = '<p>'+city+'<span>|</span>'+fengxiang+'('+fengli+')'+'<span>|</span>'+low+'-'+high+'</p>'
                            $('.weather').append(typeHtml)
                            $('.weather').append(html)
                        break;
                        case '雷阵雨':
                            $('.weather .type>.thunder-storm').show();
                            var typeHtml = '<span class="type-text">' + type +'</span>';
                            var html = '<p>'+city+'<span>|</span>'+fengxiang+'('+fengli+')'+'<span>|</span>'+low+'-'+high+'</p>'
                            $('.weather').append(typeHtml)
                            $('.weather').append(html)
                        break;
                        case '阵雨':
                            $('.weather .type>.sun-shower').show();
                            var typeHtml = '<span class="type-text">' + type +'</span>';
                            var html = '<p>'+city+'<span>|</span>'+fengxiang+'('+fengli+')'+'<span>|</span>'+low+'-'+high+'</p>'
                            $('.weather').append(typeHtml)
                            $('.weather').append(html)
                        break;
                        default:
                            var typeHtml = '<span class="type-text" style="margin-left:0"><em>' + type +'</em></span>';
                            var html = '<p>'+city+'<span>|</span>'+fengxiang+'('+fengli+')'+'<span>|</span>'+low+'-'+high+'</p>'
                            $('.weather').append(typeHtml)
                            $('.weather').append(html)
                    }
                    //console.log(forecast);
                }
            });
}

//流量单位转换
function bytesToSize(bytes) {
    if (bytes == 0) return '0 B';
    var k = 1024, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
        //console.log(i);
   return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
   //toPrecision(3)把数字格式化为指定的长度
}

//2018-06-09 11:50:00 转换时间戳
function dateChangeTime(startTime,endTime){
    var startYear = startTime.substring(0,4);
    var startMonth = startTime.substring(5,7);
    var startDate = startTime.substring(8,10);
    var startHour = startTime.substring(11,13);
    var startMinute = startTime.substring(14,16);
    var startSecond = startTime.substring(17,19);
    var start_time = new Date(startYear,startMonth-1,startDate,startHour,startMinute,startSecond);
    var startTimeStamp = start_time.getTime();

    var endYear = endTime.substring(0,4);
    var endMonth = endTime.substring(5,7);
    var endDate = endTime.substring(8,10);
    var endHour = endTime.substring(11,13);
    var endMinute = endTime.substring(14,16);
    var endSecond = endTime.substring(17,19);

    var end_time = new Date(endYear,endMonth-1,endDate,endHour,endMinute,endSecond);
    var endTimeStamp = end_time.getTime();

    var curDate = new Date();
    var curTimeStamp = curDate.getTime();
    if(curTimeStamp>=endTimeStamp){
        curTimeStamp = endTimeStamp;
    }
    flyAllTimeStamp = endTimeStamp - startTimeStamp;
    flyedTimeStamp = curTimeStamp - startTimeStamp;
    flyProgress =(flyedTimeStamp/flyAllTimeStamp).toFixed(2)*100 +'%';

    var flyAlltime = parseFloat(flyAllTimeStamp) / 1000;  

    if (flyAlltime > 60 && flyAlltime < 60 * 60) {  
        flyAlltime = parseInt(flyAlltime / 60) + "分钟"
    }  
    else if (flyAlltime >= 60 * 60) {  
        flyAlltime = parseInt(flyAlltime / 3600) + "小时" + parseInt((parseFloat(flyAlltime / 3600) -  
            parseInt(flyAlltime / 3600)) * 60) + "分钟";
    }  
    else {  
        flyAlltime = parseInt(flyAlltime) + "秒";  
    }  

    var flightFlyTime = {
        flyAllTime: flyAlltime,
        flyProgress:flyProgress
    }

    return flightFlyTime;
}


//飞行航班数量饼状图表
var pieCharts = echarts.init(document.getElementById("pieChart"));  
var inflightNum = 0;
var notInflightNum = 0;
var pieOption = {
    title: {
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        color:'#fff'
    },
    legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['在飞', '不在飞'],
        textStyle : {
            color: '#999'
        }
    },
    series : [
        {
            name:'航班情况',
            type: 'pie',
            radius : '40%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n{b|{b}:}{c|{c}}\n{b|占比:}{per|{d}%}  ',
                    backgroundColor: 'rgba(155,155,155,.2)',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 30,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 14,
                            lineHeight: 30,
                            align: 'left',
                            padding: [0, 5],
                        },
                        c: {
                            padding: [0, 4],
                            align: 'left',
                            fontSize: 13,
                            color:'#fff'
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2,
                            fontSize: 13,
                        }
                    }
                }
            },
            data:[
                {
                    value:inflightNum,
                    name: '在飞',
                    label: {color: '#00AAFF'},
                    itemStyle: {color: '#00AAFF'},
                },
                {
                    value:notInflightNum, 
                    name: '不在飞',
                    label: {color: '#e42010'},
                    itemStyle: {color: '#e42010'},
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

//航班飞行区域环形图表
var pie2Charts = echarts.init(document.getElementById("pieChart2")); 
var internationalNum = 0;
var internalNum = 0;
var pie2Option = {
    title: {
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        bottom: 10,
        left: 'center',
        textStyle : {
            color: '#999'
        },
        data:['国内','国际']
    },
    //roseType: 'angle',
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['30%', '40%'],
            //avoidLabelOverlap: false,
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n{b|{b}:}{c|{c}}\n{b|占比:}{per|{d}%}  ',
                    backgroundColor: 'rgba(155,155,155,.2)',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 30,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 14,
                            lineHeight: 30,
                            align: 'left',
                            padding: [0, 5],
                        },
                        c: {
                            padding: [0, 4],
                            align: 'left',
                            fontSize: 13,
                            color:'#fff'
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2,
                            fontSize: 13,
                        }
                    }
                }
            },
            data:[
                {
                    value:internalNum, 
                    name:'国内',
                    label: {
                        color: '#46bee9'
                    },
                    itemStyle: {
                        color: '#46bee9'
                    }
                },
                {
                    value:internationalNum, 
                    name:'国际',
                    label: {
                        color: '#ffa022'
                    },
                    itemStyle: {
                        color: '#ffa022'
                    }
                }
                
            ]
        }
    ]
};


//航班流量(M)/分钟使用情况图表
var barEcharts = echarts.init(document.getElementById("barChart"));
var barxAxisData = [];
var baryAxisData = [];
var barOption = {
    title: {
        //text: '航班流量(M)/分钟使用情况',
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    textStyle : {
        color: '#fff'
    },
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '5%',
        right: '10%',
        bottom: '50px',
        containLabel: true
    },
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0,      // 左边在 10% 的位置。
            end: 100,         // 右边在 60% 的位置。
            backgroundColor: 'rgba(5,5,5,0.8)',
            fillerColor:'rgba(80,80,80,0.6)',
            textStyle:'#fff'
        }
    ],
    xAxis : [
        {
            type : 'category',
            data : barxAxisData,
            axisTick: {
                alignWithLabel: true
            },
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '30%',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            },
            data:baryAxisData
        }
    ]
};

//获取接口数据
function getData(){
    var getDataUrl = "json/loadData.json";
    //var getDataUrl = "http://139.217.24.107:9200/eastouan/flight/flightRealTimeData";
    //var getDataUrl = "http://172.23.3.24:8080/eastouan/flight/flightRealTimeData";
    var fltno = [];        //在飞航班
    var curtraffic = [];   //在飞航班流量
    var cursubdeparture = [];//在飞航班每分钟平均使用流量
    var internalData = []; 
    var internationalData = [];
    var flghtSwiper = null; 
    clearInterval(startRoll);
    $.ajax({
        url: getDataUrl,
        type:"get",
        async:true,
        dataType: "json",
        //dataType: "jsonp",
        //jsonp: "callback",
        success: function(data){
            series = [];
            inFlightToal = data.inFlightToal;   //总航班相关信息
            flightNum = inFlightToal.flightNum; //在飞航班数
            paxcntSum = inFlightToal.paxcntSum; //总在线人数
            trafficSum = inFlightToal.trafficSum; //航班总使用流量
            console.log(paxcntSum);
            $('.flight-traffic').html(bytesToSize(trafficSum));
            $('.flight-num').html(flightNum);
            $('.paxcnt-sum').html(paxcntSum);

            inOrNotFlightCount = data.inOrNotFlightCount;  //航班飞行数据
            inflightNum = inOrNotFlightCount.inflightNum;  //在飞航班数
            notInflightNum = inOrNotFlightCount.notInflightNum; //不在飞航班数

            flightAreaTotal = data.flightAreaTotal;     //航班区域分布
            InternationalNum = flightAreaTotal.InternationalNum; //国际航班数
            totalNum = flightAreaTotal.totalNum;   //总航班数
            
            inflightInfos = data.inflightInfos;  //在飞航班信息
            top5DeviceInfos = data.top5DeviceInfos; //终端数排名前5数据

         
            var flightInfoHtml = ""; //在飞航班流量排名html
            var deviceInfoHtml = ""; //在飞航班终端排名html
            var flightSwiperInfoHtml = ""; //在飞航班详情展示html

            if(inflightInfos.length>5){
                startRoll = setInterval(textAutoRoll,3000);
            }
            flightSwiperInfoHtml +='<div class="swiper-wrapper">';
            $.each(inflightInfos,function(index,value){
                flightInfoHtml +=        '<li>';
                flightInfoHtml +=            '<span>' + value.tailno + '</span>';
                flightInfoHtml +=            '<span>' + value.fltno + '</span>';
                flightInfoHtml +=            '<span>' +bytesToSize(value.curtraffic) + '</span>';
                flightInfoHtml +=            '<span>' +value.onlinedevcnt + '</span>';
                flightInfoHtml +=            '<span>' +value.arraptname + '</span>';
                flightInfoHtml +=            '<span>' +value.deptaptname + '</span>';
                flightInfoHtml +=        '</li>';
                
                //arrivalDateTime = (value.arrivaldatetime).slice(11,-3);
                //departureDateTime = (value.departuredatetime).slice(11,-3);
                flyAllTime = dateChangeTime(value.departuredatetime,value.arrivaldatetime).flyAllTime;
                flyProgress = dateChangeTime(value.departuredatetime,value.arrivaldatetime).flyProgress;

                if(index<5){
                flightSwiperInfoHtml +=  '<div class="swiper-slide">';
                flightSwiperInfoHtml +=     '<div class="detail-info">';
                flightSwiperInfoHtml +=        '<div class="detail-t">';
                flightSwiperInfoHtml +=            '<img width="22" src="images/MU.png">';
                flightSwiperInfoHtml +=            '<span>东方航空</span>';
                flightSwiperInfoHtml +=            '<strong>' + value.fltno + '</strong>';
                flightSwiperInfoHtml +=            '<span>' +value.fltdate + '</span>';
                flightSwiperInfoHtml +=        '</div>';
                flightSwiperInfoHtml +=        '<div class="detail-m">';
                flightSwiperInfoHtml +=            '<div class="detail-fly">';
                flightSwiperInfoHtml +=                '<div class="inl departure">';
                flightSwiperInfoHtml +=                    '<p>起飞时间</p>';
                flightSwiperInfoHtml +=                    '<p class="time">' + (value.arrivaldatetime).slice(11,-3) + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl between">';
                flightSwiperInfoHtml +=                    '<i class="ico ico-status-green-l">到达<small class="small"></small></i>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl arrive">';
                flightSwiperInfoHtml +=                    '<p>到达时间</p>';
                flightSwiperInfoHtml +=                    '<p class="time">' + (value.departuredatetime).slice(11,-3) + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=            '</div>';
                flightSwiperInfoHtml +=            '<div class="detail-fly detail-route">';
                flightSwiperInfoHtml +=                '<div class="inl departure">';
                flightSwiperInfoHtml +=                    '<p>' + value.arraptname + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl between">';
                flightSwiperInfoHtml +=                    '<div class="progress-bar">';
                flightSwiperInfoHtml +=                        '<span style="width:'+ flyProgress +'" class="line-green"></span>';
                flightSwiperInfoHtml +=                        '<i style="left:'+ flyProgress +'" class="ico-posi-green"></i>';
                flightSwiperInfoHtml +=                    '</div>';
                flightSwiperInfoHtml +=                    '<p>飞行时长：'+ flyAllTime +'</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl arrive">';
                flightSwiperInfoHtml +=                    '<p>' + value.deptaptname + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=            '</div>';
                flightSwiperInfoHtml +=        '</div>';
                flightSwiperInfoHtml +=     '</div>';
                flightSwiperInfoHtml +=  '</div>';
                }

                fltno.push(value.fltno);
                curtraffic.push((value.curtraffic/1024/1024).toFixed(2));
                cursubdeparture.push(((value.curtraffic/value.cursubdeparture)/1024/1024).toFixed(2));

                
                if(value.flightIdentify=='inlandcity'){
                    internationalData.push([{name:value.arraptname},{name:value.deptaptname}])
                }else{
                    internalData.push([{name:value.arraptname},{name:value.deptaptname}])
                }
                
                
            });
            flightSwiperInfoHtml +='</div>';
            flightSwiperInfoHtml +='<div class="swiper-pagination"></div>';
            $('.swiper-wrapper-js').children().remove();
            //$('.swiper-pagination').children().remove();
            $('.swiper-wrapper-js').append(flightSwiperInfoHtml);
            flghtSwiper = new Swiper('.swiper-container', {
                autoplay:true,
                //loop:true,
                pagination: {
                el: '.swiper-pagination',
                clickable: false,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
                },
            });
            //flghtSwiper.updateSlides();
            if($('.swiper-container .swiper-slide').length<=1){
                flghtSwiper.autoplay.stop();
            }

            $('.flight-info-js').children().remove();
            $('.flight-info-js').append(flightInfoHtml);
            
            [['国内',internalData], ['国际',internationalData]].forEach(function (item, i) {
                
                series.push({
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    },
                    data: convertData(item[1])
                },
                {
                    name: item[0],
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15
                    },
                    lineStyle: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    },
                    data: convertData(item[1])
                },
                {
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        fontSize:12
                    },
                    symbolSize: 8,
                    itemStyle: {
                        color: color[i]
                    },
                    data: item[1].map(function (dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name],
                        };
                    })
                },
                {
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        fontSize:12
                    },
                    symbolSize: 8,
                    itemStyle: {
                        color: color[i]
                    },
                    data: item[1].map(function (dataItem) {
                        console.log({
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[0].name],
                        });
                        return {
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[0].name],
                        };
                    })
                });
            });

            mapOption.series = series;
            
            if (mapOption && typeof mapOption === "object") {
                mapEcharts.setOption(mapOption, true);
            }

            $.each(top5DeviceInfos,function(index,value){
                deviceInfoHtml +=        '<li>';
                deviceInfoHtml +=            '<span>' +(index+1) + '</span>';
                deviceInfoHtml +=            '<span>' + value.tailno + '</span>';
                deviceInfoHtml +=            '<span>' + value.fltno + '</span>';
                deviceInfoHtml +=            '<span>' +value.onlinedevcnt + '</span>';
                deviceInfoHtml +=            '<span>' +value.onlinepaxcnt + '</span>';
                deviceInfoHtml +=            '<span>' +bytesToSize(value.curtraffic) + '</span>';
                deviceInfoHtml +=        '</li>';
            });

            $('.device-info-js').children().remove();
            $('.device-info-js').append(deviceInfoHtml);


            pieCharts.setOption(pieOption);
            pieCharts.setOption({
                series : [{
                    data:[
                        {
                            value:inflightNum,
                            name:'在飞',
                            label: {color: '#00AAFF'},
                            itemStyle: {color: '#00AAFF'},
                        },
                        {
                            value:notInflightNum,
                            name:'不在飞',
                            label: {color: '#999'},
                            itemStyle: {color: '#999'},
                        }
                    ],
                }]
            });

            internationalNum = InternationalNum;
            internalNum = totalNum-internationalNum;
            pie2Charts.setOption(pie2Option);
            pie2Charts.setOption({
                series : [{
                    data:[
                        {
                            value:internalNum,
                            name:'国内',
                            label: {color: '#46bee9'},
                            itemStyle: {color: '#46bee9'},
                        },
                        {
                            value:internationalNum,
                            name:'国际',
                            label: {color: '#ffa022'},
                            itemStyle: {color: '#ffa022'},
                        }
                    ],
                }]
            });

            mapEcharts.on('legendselectchanged', function (params) {
                // 获取点击图例的选中状态
                var isSelected = params.selected[params.name];
                console.log(params.name);
                
                if(params.selected['国内']===true&&params.selected['国际']===false){
                    console.log(1)
                    console.log(params);
                    mapOption.geo.map = 'china';
                    mapOption.geo.zoom = 1.1;
                    mapOption.geo.layoutCenter=['52%', '58%'];
                    mapOption.legend.selected={ '国内' : true, '国际' : false}  
                    mapEcharts.setOption(mapOption, true);
                }else if(params.selected['国内']===false&&params.selected['国际']===true){
                    mapOption.geo.map = 'world';
                    mapOption.geo.zoom = 1.40;
                    mapOption.geo.layoutCenter=['46%', '65%'];
                    mapOption.legend.selected={ '国内' : false, '国际' : true}  
                    mapEcharts.setOption(mapOption, true);
                }else{
                    mapOption.geo.map = 'world';
                    mapOption.geo.zoom = 1.40;
                    mapOption.geo.layoutCenter=['46%', '65%'];
                    mapOption.legend.selected={ '国内' : true, '国际' : true}  
                    mapEcharts.setOption(mapOption, true);
                }
            });
            
            barxAxisData = fltno;
            baryAxisData = cursubdeparture;
            barEcharts.setOption(barOption);
            barEcharts.setOption({
                xAxis: {
                    data: barxAxisData
                },
                series: [{
                    data: baryAxisData
                }]
            });
            
        },
        error:function(){
            //alert("请求失败");
            clearInterval(intervalTime);
        },
    });
};


$(function() {
    
    setTimeout(function(){
        $('#loading').fadeOut();
    },3000);
    $('.head-box .date').text(getNowDate());
    getData();
    findWeather('北京');
    setInterval(function(){
        $('.head-box .date').text(getNowDate());
    },1000*60);
    setInterval(getData,1000*60);
    setInterval(function(){
        findWeather('北京')
    },1000*60*60);
    
});
  




