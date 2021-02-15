const log = (x) => {
    console.log(x)
}

const navSearchForm = document.getElementById('search-form-nav')
const searchValue = document.getElementById('search-value')
const navSearchFormButton = document.getElementById('search-button')
/*const stockForm = document.getElementById('stock-form')
const stockFormButton = document.getElementById('stock-form-button')*/
const content = document.getElementById('content')

Chart.defaults.global.defaultFontColor = 'white'; 



/*const suggestedSearch = (val) => {
    if (!val) {
        log('Please enter a value')
    } else {
        const API_KEY = $.get("./config/default.json", (data) => {
            $.each(data, (key, value) => {
                const str = value
                return str
            })
        })

        let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=${API_KEY}`

        getSuggestions(url)

        function getSuggestions(a) {
            let xhr = new XMLHttpRequest()
            xhr.open( 'GET', dataURL, true )
            xhr.onerror = function( xhr ) { log( 'error:', xhr  ) }
            xhr.onprogress = function( xhr ) { log( 'bytes loaded:', xhr.loaded  ) } /// or something
            xhr.onload = getSuggJson
            xhr.send( null )

            function getSuggJson(xhr) {
                let response, json

                response = xhr.target.response
                

                json = JSON.parse( response )

                console.log( 'json', json )
            }
        }
    }
        
    
}

searchValue.oninput = suggestedSearch(searchValue.value)*/

navSearchFormButton.addEventListener('click', (e) => {
    e.preventDefault()

    const searchTerm = searchValue.value

    const API_KEY = $.get("./config/default.json", (data) => {
        $.each(data, (key, value) => {
            const str = value
            return str
        })
    })

    content.innerHTML = ``
    
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchTerm}&outputsize=compact&apikey=${API_KEY}`;

    let urlTwo = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchTerm}&apikey=${API_KEY}`

	quickSearch( url, urlTwo )
    

	function quickSearch( dataURL, overviewURL ) {

		let xhr = new XMLHttpRequest()
		xhr.open( 'GET', dataURL, true )
		xhr.onerror = function( xhr ) { log( 'error:', xhr  ) }
		xhr.onprogress = function( xhr ) { log( 'bytes loaded:', xhr.loaded  ) } /// or something
		xhr.onload = getDataPoints
		xhr.send( null )

		function getDataPoints( xhr ) {

			let response, json

			response = xhr.target.response
			

			json = JSON.parse( response )

            console.log( 'json', json )
            let valuesArray = []
            let keysArray = []
            $.each(json, (key, value) => {
                $.each(value, (keys, values) => {
                    valuesArray.push(values)
                    keysArray.push(keys)
                    //timesets = values.splice(0, 6)
                    //log(timesets)
                })
            })

            
            let timesets = valuesArray.splice(6)
            let labels = keysArray.splice(6)
            let labelsOrdered = labels.reverse()
            let timesetsOrdered = timesets.reverse()
            

            let open = []
            let high = []
            let low = []
            let close = []
            let volume = []

            

            for (let i = 0; i < timesetsOrdered.length; i++) {
                open.push(timesetsOrdered[i]["1. open"])
                high.push(timesetsOrdered[i]["2. high"])
                low.push(timesetsOrdered[i]["3. low"])
                close.push(timesetsOrdered[i]["4. close"])
                volume.push(timesetsOrdered[i]["5. volume"])
            }

            

            

            content.innerHTML += `
            <canvas class="mb-4" id="quick-search-chart"></canvas>
            <a class="btn btn-primary mb-4" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Detailed Charts
            </a>
            <div class="collapse" id="collapseExample">
            <canvas class="mb-4" id="quick-search-chart-high"></canvas>
            <canvas class="mb-4" id="quick-search-chart-low"></canvas>
            <canvas class="mb-4" id="quick-search-chart-open"></canvas>
            <canvas class="mb-4" id="quick-search-chart-close"></canvas>
            <canvas class="mb-4" id="quick-search-chart-volume"></canvas>
            </div>
            `

            let quickSearchChart = document.getElementById('quick-search-chart').getContext('2d')
            let quickSearchChartHigh = document.getElementById('quick-search-chart-high').getContext('2d')
            let quickSearchChartLow = document.getElementById('quick-search-chart-low').getContext('2d')
            let quickSearchChartOpen = document.getElementById('quick-search-chart-open').getContext('2d')
            let quickSearchChartClose = document.getElementById('quick-search-chart-close').getContext('2d')
            let quickSearchChartVolume = document.getElementById('quick-search-chart-volume').getContext('2d')

            let stockPriceChart = new Chart(quickSearchChart, {
                type: 'line',
                data: {
                    labels: [...labels],
                    datasets: [{
                        label: 'High',
                        borderColor: 'green',
                        data: high
                    },
                    {
                        label: 'Low',
                        borderColor: 'red',
                        data: low
                    },
                    {
                        label: 'Open',
                        borderColor: 'blue',
                        data: open
                    },
                    {
                        label: 'Close',
                        borderColor: 'purple',
                        data: close
                    }
                ]
                }
            })

            let stockPriceCharthigh = new Chart(quickSearchChartHigh, {
                type: 'line',
                data: {
                    labels: [...labels],
                    datasets: [{
                        label: 'High',
                        borderColor: 'green',
                        data: high
                    }]
                }
            })
            let stockPriceChartLow = new Chart(quickSearchChartLow, {
                type: 'line',
                data: {
                    labels: [...labels],
                    datasets: [{
                        label: 'Low',
                        borderColor: 'red',
                        data: low
                    }]
                }
            })
            let stockPriceChartOpen = new Chart(quickSearchChartOpen, {
                type: 'line',
                data: {
                    labels: [...labels],
                    datasets: [{
                        label: 'Open',
                        borderColor: 'blue',
                        data: open
                    }]
                }
            })
            let stockPriceChartClose = new Chart(quickSearchChartClose, {
                type: 'line',
                data: {
                    labels: [...labels],
                    datasets: [{
                        label: 'Close',
                        borderColor: 'purple',
                        data: close
                    }]
                }
            })
            let stockPriceChartVolume = new Chart(quickSearchChartVolume, {
                type: 'line',
                data: {
                    labels: [...labels],
                    datasets: [{
                        label: 'Volume',
                        borderColor: 'pink',
                        data: volume
                    }]
                }
            })

		}

        xhr = new XMLHttpRequest()
        xhr.open('GET', overviewURL, true)
        xhr.onerror = function(xhr) {log('error:', xhr)}
        xhr.onprogress = function(xhr) {log('bytes loaded:', xhr.loaded)}
        xhr.onload = getOverview
        xhr.send(null)

        function getOverview(xhr) {
            let response, json

            response = xhr.target.response
            

            json = JSON.parse(response)

            console.log('json', json)
            
            content.innerHTML += `
                <h1>Company Overview</h1>
                <hr>
                <div class="row mb-4">
                    <div class="col-sm-4">
                        <p>Company Name: <span class="text-warning" id="c-name">${json.Name}</span></p>
                    </div>
                    <div class="col-sm-4">
                        <p>Company Symbol: <span class="text-warning" id="c-symbol">${json.Symbol}</span></p>
                    </div>
                    <div class="col-sm-4">
                        <p>Asset Type: <span class="text-warning" id="c-type">${json.AssetType}</span></p>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-sm-12">
                        <h3>Company Description</h3>
                        <p class="lead" id="c-desc">${json.Description}</p>
                    </div>
                </div>
                <div class="row mb-4">
                    <p>Address: <span class="text-warning">${json.Address}</span></p>
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Exchange: <span class="text-warning">${json.Exchange}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Currency: <span class="text-warning">${json.Currency}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Country: <span class="text-warning">${json.Country}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Sector: <span class="text-warning">${json.Sector}</span></p>
                    </div>
                    
                </div>
                
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Industry: <span class="text-warning">${json.Industry}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>FT Employees: <span class="text-warning"${json.FullTimeEmployees}</span></p>
                    </div>

                    <div class="col-sm-3">
                        <p>Fiscal Year End: <span class="text-warning">${json.FiscalYearEnd}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Latest Quarter: <span class="text-warning">${json.LatestQuarter}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                    <p>Market Capitalization: <span class="text-warning">${json.MarketCapitalization}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>EBITDA: <span class="text-warning">${json.EBITDA}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>PE Ratio: <span class="text-warning">${json.PERatio}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>PEG Ratio: <span class="text-warning"${json.PEGRatio}</span></p>
                    </div>
                    
                </div>

                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Book Value: <span class="text-warning">${json.BookValue}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Dividend per Share: <span class="text-warning">${json.DividendPerShare}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Dividend Yield: <span class="text-warning">${json.DividendYield}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>EPS: <span class="text-warning">${json.EPS}</span></p>
                    </div>
                    
                   
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Revenue per Share(TTM): <span class="text-warning">${json.RevenuePerShareTTM}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Profit Margin: <span class="text-warning"${json.ProfitMargin}</span></p>
                    </div>

                    <div class="col-sm-3">
                        <p>Operating Margin(TTM): <span class="text-warning">${json.OperatingMarginTTM}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Return on Assets(TTM): <span class="text-warning">${json.ReturnOnAssetsTTM}</span></p>
                    </div>
                    
                    
                </div>
                
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Return on Equity(TTM): <span class="text-warning">${json.ReturnOnEquityTTM}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Revenue(TTM): <span class="text-warning">${json.RevenueTTM}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Gross Profit(TTM): <span class="text-warning">${json.GrossProfitTTM}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Diluted EPSTTM: <span class="text-warning"${json.DilutedEPSTTM}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Analyst Target Price: <span class="text-warning"${json.AnalystTargetPrice}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Trailing PE: <span class="text-warning">${json.TrailingPE}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Forward PE: <span class="text-warning">${json.ForwardPE}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Price To Sales Ratio(TTM): <span class="text-warning"${json.PriceToSalesRatioTTM}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>price to book Ratio: <span class="text-warning"${json.PriceToBookRatio}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>EV To Revunue: <span class="text-warning">${json.EVToRevenue}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>EV to EBITDA: <span class="text-warning">${json.EVToEBITDA}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Beta: <span class="text-warning"${json.Beta}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>52 Week High: <span class="text-warning"${json["52WeekHigh"]}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>52 Week Low: <span class="text-warning">${json["52WeekLow"]}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>50 Day moving Average: <span class="text-warning">${json["50DayMovingAverage"]}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>200 Day Moving Average: <span class="text-warning"${json["200DayMovingAverage"]}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Shares Outstanding: <span class="text-warning"${json.SharesOutstanding}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Shares Float: <span class="text-warning">${json.SharesFloat}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Shares Short: <span class="text-warning">${json.SharesShort}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Shares Short Prior Month: <span class="text-warning"${json.SharesShortPriorMonth}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Short Ratio: <span class="text-warning"${json.ShortRatio}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Short Percent Outstanding: <span class="text-warning">${json.ShortPercentOutstanding}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Short Percent Float: <span class="text-warning">${json.ShortPercentFloat}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Percent Insiders: <span class="text-warning"${json.PercentInsiders}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>percent Institutions: <span class="text-warning"${json.PercentInstitutions}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Forward Annual Dividend Rate: <span class="text-warning">${json.ForwardAnnualDividendRate}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Forward Annual Dividend Yield: <span class="text-warning">${json.ForwardAnnualDividendYield}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Payout Ratio: <span class="text-warning"${json.PayoutRatio}</span></p>
                    </div>
                    
                </div>
                <div class="row mb-4">
                    <div class="col-sm-3">
                        <p>Dividend Date: <span class="text-warning"${json.DividendDate}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Ex Dividend Date: <span class="text-warning">${json.ExDividendDate}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>LastSplitFactor: <span class="text-warning">${json.LastSplitFactor}</span></p>
                    </div>
                    <div class="col-sm-3">
                        <p>Last Split Date: <span class="text-warning"${json.LastSplitDate}</span></p>
                    </div>
                </div>
            `
        }
	}

    
})

