
var color = ['#46bee9', '#ffa022', '#a6c84c']; //公用颜色
var startRoll = null;
//在飞航班飞行路线图表
var mapEcharts = echarts.init(document.getElementById("flightChart")); 
var series = [];
var geoCoordMap = {};//城市机场三字码经纬度

//飞机svg图标
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

//航班城市赋值坐标
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[2].IATACode];
        var toCoord = geoCoordMap[dataItem[3].IATACode];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};


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
        zoom:1.35,
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
        layoutCenter:['48%', '65%'],
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
            name:'飞行情况',
            type: 'pie',
            radius : '30%',
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
            radius: ['20%', '30%'],
            //avoidLabelOverlap: false,
            // labelLine:{
            //     //show:false,
            //     length:5,
            //     length2:50,
            //     //smooth:true,
            // },
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
                    //margin:[0,50],
                    position:'outside',
                    
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
            show: false,
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
    var getDataUrl = "json/loadData.json?2";
    //var getDataUrl = "http://139.217.24.107:9200/eastouan/flight/flightRealTimeData";
    //var getDataUrl = "http://172.23.3.24:8080/monitor/flight/flightRealTimeData";
    
    var fltno = [];        //在飞航班
    var curtraffic = [];   //在飞航班流量
    var cursubdeparture = [];//在飞航班每分钟平均使用流量
    geoCoordMap = {};
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
            //console.log(paxcntSum);
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
                flightInfoHtml +=            '<span>' +value.deptaptname + '</span>';
                flightInfoHtml +=            '<span>' +value.arraptname + '</span>';
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
                flightSwiperInfoHtml +=                    '<p class="time">' + (value.departuredatetime).slice(11,-3) + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl between">';
                flightSwiperInfoHtml +=                    '<i class="ico ico-status-green-l">到达<small class="small"></small></i>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl arrive">';
                flightSwiperInfoHtml +=                    '<p>到达时间</p>';
                flightSwiperInfoHtml +=                    '<p class="time">' + (value.arrivaldatetime).slice(11,-3) + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=            '</div>';
                flightSwiperInfoHtml +=            '<div class="detail-fly detail-route">';
                flightSwiperInfoHtml +=                '<div class="inl departure">';
                flightSwiperInfoHtml +=                    '<p>' + value.deptaptname + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl between">';
                flightSwiperInfoHtml +=                    '<div class="progress-bar">';
                flightSwiperInfoHtml +=                        '<span style="width:'+ flyProgress +'" class="line-green"></span>';
                flightSwiperInfoHtml +=                        '<i style="left:'+ flyProgress +'" class="ico-posi-green"></i>';
                flightSwiperInfoHtml +=                    '</div>';
                flightSwiperInfoHtml +=                    '<p>飞行时长：'+ flyAllTime +'</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=                '<div class="inl arrive">';
                flightSwiperInfoHtml +=                    '<p>' + value.arraptname + '</p>';
                flightSwiperInfoHtml +=                '</div>';
                flightSwiperInfoHtml +=            '</div>';
                flightSwiperInfoHtml +=        '</div>';
                flightSwiperInfoHtml +=     '</div>';
                flightSwiperInfoHtml +=  '</div>';
                }

                fltno.push(value.fltno);
                curtraffic.push((value.curtraffic/1024/1024).toFixed(2));
                cursubdeparture.push(((value.curtraffic/value.cursubdeparture)/1024/1024).toFixed(2));

                
                var arrkey = value.arrcode; 
                var arrkeyValLon = value.arrLon.split(",");
                var arrkeyVal = [];
                arrkeyVal.push(arrkeyValLon[0],arrkeyValLon[1]);
                var depkey = value.deptcode; 
                var depkeyValLon = value.depLon.split(",");
                var depkeyVal = [];
                depkeyVal.push(depkeyValLon[0],depkeyValLon[1]);
                geoCoordMap[arrkey] = arrkeyVal;
                geoCoordMap[depkey] = depkeyVal;
 
                if(value.flightIdentify=='inlandcity'){
                    internationalData.push([{name:value.deptaptname},{name:value.arraptname},{IATACode:value.deptcode},{IATACode:value.arrcode}])					
                }else{
                    internalData.push([{name:value.deptaptname},{name:value.arraptname},{IATACode:value.deptcode},{IATACode:value.arrcode}])
                }
                
                
            });
            //console.log(geoCoordMap);
            //console.log(internationalData);
            //console.log(internalData);

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
                        period: 20,
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
                        period: 20,
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
                            value: geoCoordMap[dataItem[3].IATACode],
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
                        return {
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[2].IATACode],
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
                    mapOption.geo.zoom = 0.98;
                    mapOption.geo.layoutCenter=['50%', '59%'];
                    mapOption.legend.selected={ '国内' : true, '国际' : false}  
                    mapEcharts.setOption(mapOption, true);
                }else if(params.selected['国内']===false&&params.selected['国际']===true){
                    mapOption.geo.map = 'world';
                    mapOption.geo.zoom = 1.35;
                    mapOption.geo.layoutCenter=['48%', '65%'];
                    mapOption.legend.selected={ '国内' : false, '国际' : true}  
                    mapEcharts.setOption(mapOption, true);
                }else{
                    mapOption.geo.map = 'world';
                    mapOption.geo.zoom = 1.35;
                    mapOption.geo.layoutCenter=['48%', '65%'];
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
            //clearInterval(intervalTime);
        },
    });
};


$(function() {
    
    setTimeout(function(){
        $('#loading').fadeOut();
    },3000);
    $('.head-box .date').text(getNowDate());
    getData();
    //findWeather('北京');
    setInterval(function(){
        $('.head-box .date').text(getNowDate());
    },1000*60);
    setInterval(getData,1000*60);
    // setInterval(function(){
    //     findWeather('北京')
    // },1000*60*60);
    
});
  




