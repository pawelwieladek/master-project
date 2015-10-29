function createChart(learningRate, granularity, data, showPoints) {
  $(function () {
    $('.container').highcharts({
        title: {
            text: 'Learning rate: ' + learningRate
        },
        subtitle: {
            text: 'Granularity: ' + granularity
        },
        chart: {
          width: 1000,
          height: 400
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: showPoints
                }
            }
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true,
          filename: 'chart-' + learningRate + '-' + granularity
        },
        tooltip: {
          valueSuffix: '%'
        },
        yAxis: {
            title: {
                text: 'Winning rate',
                style: {
                    fontSize: '14px'
                }
            },
            labels: {
                format: "{value}%",
                style: {
                    fontSize: '13px'
                }
            },
            tickInterval: 10
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '13px'
                }
            }
        },
        legend: {
          enabled: false
        },
        series: [{
            name: 'Winning rate',
            data: data
        }]
    });
  });
}
