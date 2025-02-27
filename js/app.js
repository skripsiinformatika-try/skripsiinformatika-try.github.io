
let topic = ['','Decision','Forecasting','Association','Imaging','Classification']
let page = 0, select = 0, option, evaluate
let t1s = 0, t1o = ['','AHP','SAW','TOPSIS','WP']
let t2o = ['','SMA','DMA','SES','DES']
let t3o = ['','Apriori','FP Growth']
let t4o = ['','Canny','Sobel','Crypto','Biner']
let t5o = ['','KNN','Naïve Bayes','ANN','K Means']
let tp = [], tvchart = [], tchart = []
let chart = new Chart(document.getElementById('chart'), {})
const chartlbl = ['A1','A2','A3']

function muted() {
	const video = document.body.querySelector('video')
	video.muted = false
}

$(document).ready(function() {
	$('.option1').addClass('d-none')
	$('.option2').addClass('d-none')
	$('.option3').addClass('d-none')
	$('.option4').addClass('d-none')
	$('.option5').addClass('d-none')
	$('.evaluate1').addClass('d-none')
	$('.evaluate2').addClass('d-none')
	$('.evaluate3').addClass('d-none')
	$('.evaluate4').addClass('d-none')
	$('.evaluate5').addClass('d-none')
	$('.chart').addClass('d-none')
	$('.btn.outline').addClass('d-none')
})

$(document).on('click', '.btn.outline', function() {	
	$('h5').html('pilih sesuai algoritma kamu')
	$('.select').removeClass('d-none')			
	$('.option1').addClass('d-none')
	$('.option2').addClass('d-none')
	$('.option3').addClass('d-none')
	$('.option4').addClass('d-none')
	$('.option5').addClass('d-none')
	$('.evaluate1').addClass('d-none')
	$('.evaluate2').addClass('d-none')
	$('.evaluate3').addClass('d-none')
	$('.evaluate4').addClass('d-none')
	$('.evaluate5').addClass('d-none')
	$('.chart').addClass('d-none')
	$('button:not(.outline)').html('Lanjutkan')	
	$('button:not(.outline)').removeClass('d-none')	
	$('.btn.outline').addClass('d-none')
	page = 0
	select = 0
	option = ''
	tp = [], tvchart = [], t1s = 0
})

$(document).on('input', 'input[type="tel"]:not(.decimal)', function(e) {
	e.target.value = e.target.value.replace(/[^0-9]/g, '')
})

$(document).on('input', 'input.decimal', function(e) {
	let v = e.target.value.replace(/[^0-9.]/g, '')
	if (v.search(/[.]/g) >= 0 && v.match(/[.]/g).length > 1) {
		e.target.value = v.slice(0, -1)
	} else {
		e.target.value = v
	}
})

$(document).on('change', 'input[type="file"]', function(e) {
	let t = ['bmp','jpg','jpeg','png']
	if (t.indexOf(e.target.files[0].type.split('/')[1]) < 0) {
		e.target.value = ''		
	}
})

$(document).on('submit', 'form', function(e) {
	e.preventDefault()

	if (page < 1) {
		const opt = document.body.querySelector('form select')
		if (opt.value < 1) {
			opt.focus()
		} else {
			$('.select').addClass('d-none')			
			$('.btn.outline').removeClass('d-none')
			select = opt.value
			option = '.option'+select
			$(option).removeClass('d-none')
			page++

			$('h5').html(topic[select])			
			$('button:not(.outline)').html('Evaluasi')
		}
	} else if (page == 1) {
		t1s = 0
		let input
		if (select != 5) {
			input = document.body.querySelectorAll(option+' input')
		} else {
			input = document.body.querySelectorAll(option+' select')
		}
		for (let x=0; x<input.length; x++) {
			if (input[x].value.length < 1) {
				input[x].focus()
				return false
			}
			else {
				if (select != 4) {
					tp.push(parseInt(input[x].value))
				} else {
					tp.push(input[x].files[0])
				}
				if (select == 1) {
					t1s = t1s + parseInt(input[x].value)					
				}
			}
		}

		if (select == 1 && t1s != 100) {
			input[0].focus()
			return false			
		}

		$(option).addClass('d-none')
		$('.evaluate'+select).removeClass('d-none')
		$('button:not(.outline)').html('Hasil')
		page++
	} else if (page == 2) {
		let input
		if (select != 3) {
			input = document.body.querySelectorAll('.evaluate'+select+' input')
		} else {
			input = document.body.querySelectorAll('.evaluate'+select+' select')
		}
		for (let x=0; x<input.length; x++) {
			if (input[x].value.length < 1 || input[x].value < 1) {
				input[x].focus()
				return false
			} else {
				if (select != 4) {
					tvchart.push(parseInt(input[x].value))
				} else {
					tvchart.push(input[x].files[0])
				}
			}
		}

		$('.evaluate'+select).addClass('d-none')

		let topt = []
		if (select == 1) {
			topt = t1o
		}
		else if (select == 2) {
			topt = t2o
		}
		else if (select == 3) {
			topt = t3o
		}
		else if (select == 4) {
			topt = t4o
		}
		else if (select == 5) {
			topt = t5o
		}

		$('.chart select option:not(:first-of-type)').remove()
		for (let y=1; y<topt.length; y++) {
			$('.chart select').append('<option value='+y+'>'+topt[y]+'</option>')
		}

		chart.destroy()
		chart = new Chart(document.getElementById('chart'), {})		
		$('.chart').removeClass('d-none')
		$('button:not(.outline)').addClass('d-none')			
	}

	return
})

$(document).on('change', '.evaluate3 select', function(e) {
	$('.evaluate3 select:eq('+$('.evaluate3 select').index(this)+')').addClass('text-dark')
})

$(document).on('change', '.option5 select', function(e) {
	$('.option5 select').addClass('text-dark')
})

$(document).on('change', '.chart select', function() {
	let type
	if (select == 1) {
		type = 'pie'
		decision($('.chart select').val())		
	}
	else if (select == 2) {
		type = 'line'
		forecasting($('.chart select').val())
	}

	chart.destroy()
	chart = new Chart(document.getElementById('chart'), {
		data: {
		    labels: chartlbl,
		    datasets: [
			    {
			    	type: type,
			    	data: tchart,
			    	borderWidth: 2,
			    	borderColor: '#ca9a36',
			    	backgroundColor: '#ffffff',
			    	hoverBackgroundColor: '#ffffff'
			    }
		    ]
		},
		options: {
			elements: {
				point: {
					pointStyle: false
				}
			},
			scales: {
				x: {
					display: false,
					stacked: true
				},
				y: {
					display: false,
					min: 0,
					max: 100,
					step: 10,
					ticks: {
						beginAtZero: true
					}
				}
			},
			plugins: {
				legend: {
					display: false
				}
			}
		}
	})	
})

function decision(opt) {
	tchart = []
	let t1p = [25,35,40], tvchart = [1,3,2,3,2,1,3,2,2]
	let w = [], vk = [], tk = []

for (let x=0; x<t1p.length; x++) {
    w.push(t1p[x] / 100)
}

for (let c=0; c<t1p.length; c++) {
    vk.push(tvchart.slice(c*t1p.length,(c+1)*t1p.length))
}

for (let v=0; v<vk.length; v++) {
    let mk = []
    for (let y=0; y<vk[v].length; y++) {
        let rk = []
        for (let c=0; c<vk[v].length; c++) {
            rk.push(vk[v][c] / vk[v][y])
        }
        mk[y] = rk
    }
    vk[v] = mk
}

for (let v=0; v<vk.length; v++) {
    let vm = vk[v]
    for (let y=0; y<vm.length; y++) {
        for (let c=0; c<vm[y].length; c++) {
            if (c == v) {
                console.log(vm)
            }
        }
    }
}

function forecasting(opt) {
	tchart = []
}

/*
perbandingan Alt
=> Row total

nilai perbandingan Alt / Row total

=> total bobot kanan

perankingan nilai kanan :
total bobot kanan * bobot Kriteria
*/
	
}
