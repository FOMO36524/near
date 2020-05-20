
let echartEvent=function(data){
    var dom = document.getElementById("canvas");
    var myChart = echarts.init(dom);
    option = null;
    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                silent: true,
                radius: ['52%', '70%'],
                center:['50%', '50%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                label: { //  饼图图形上的文本标签

                    normal: { // normal 是图形在默认状态下的样式
                        show: true,
                        position: 'center',
                        color: '#fff',
                        fontSize: 14,
                        formatter: (data[0]/data[1]).toFixed(3)+'%' // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
                    }
                },
                // label: {
                //     show: false,
                //     position: 'center',
                //     fontSize: '14'
                // },
                color:['#0fb2f2','#f6c94a'],
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: data[0], name: 'Staking Share'},
                    {value: data[1], name: 'Total Share'}
                ]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
};
