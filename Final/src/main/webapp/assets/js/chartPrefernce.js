var Ppath = document.body.getAttribute('data-cpath');

$.ajax({
    url: `${Ppath}/getMusic`,
    type: 'POST',
    dataType: 'json',
    success: function(data) {
        console.log('차트 1 데이터 로드 성공');

        const container = document.getElementById('labelsContainer2');
        const containerData = document.getElementById('labelsContainerData2');
        container.innerHTML = '';
        containerData.innerHTML = '';

        const heading = document.createElement('h3');
        heading.textContent = 'My Prefferd Music';
        container.appendChild(heading);

        data.labels.forEach((label, index) => {
            const span = document.createElement('span');
            span.textContent = label;
            containerData.appendChild(span);
            if (index < data.labels.length - 1) {
                containerData.appendChild(document.createElement('br'));
            }
        });

        const prefernce = document.getElementById('myChart2').getContext('2d');
        new Chart(prefernce, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    label: '개수',
                    data: data.counts,
                    backgroundColor: [
                        'rgb(205, 180, 219)',
                        'rgb(255, 200, 221)',
                        'rgb(255, 175, 204)',
                        'rgb(189, 224, 254)',
                        'rgb(162, 210, 255)'
                    ],
                    borderColor: [
                        'rgb(205, 180, 219)',
                        'rgb(255, 200, 221)',
                        'rgb(255, 175, 204)',
                        'rgb(189, 224, 254)',
                        'rgb(162, 210, 255)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                rotation: -90,
        		circumference: 180,
                plugins: {
                    legend: false, // Hide the legend
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + '개';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    },
    error: function() {
        console.log('차트 2 데이터 로드 실패');
    }
});
