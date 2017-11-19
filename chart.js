(function() {

  // Fake JSON data
  var json1 = { "payload": {
    "pubProductCounts": "72431859",
    "pubOfferCounts_3P": "86891316",
    "pubOfferCounts_1P": "6527868",
    "liveSellerCounts_3P": "11862",
    "allSellerCounts": "16451",
    "dsvVendorCounts": "16561",
    "ownedCounts_1P": "2548289",
    "dsvCounts_1P": "11682392",
    "itemOfWalmartOnJetCounts": {
      "TOTAL_COUNT": 4610733,
      "PUBLISHED_COUNT": 4128534
    },
    "twoDayShippingEligibelItemsCounts": {
      "TOTAL_COUNT": 2783274,
      "PUBLISHED_COUNT": 2512189
    },
    "reportDtm": 1510699826480,
    "putEligibleItems_1P": {
      "TOTAL_COUNT": 480619,
      "PUBLISHED_COUNT": 205067
    },
    "s2hItems_1P": {
      "TOTAL_COUNT": 13065126,
      "PUBLISHED_COUNT": 6211176
    },
    "groceryItemsOnPangea_1P": {
      "TOTAL_COUNT": 210411,
      "PUBLISHED_COUNT": 173938
    },
    "walmartItemsOnJet_1P": null,
    "jetItemsOnWalmart_1P": {
      "TOTAL_COUNT": 122712,
      "PUBLISHED_COUNT": 109979
    },
    "googleHomeEligible_1P": {
      "TOTAL_COUNT": 2360421,
      "PUBLISHED_COUNT": 2352763
    }
  }};

	// D3 Bubble Chart 

	var diameter = 600;
	var svg = d3.select('#graph').append('svg')
					.attr('width', diameter)
					.attr('height', diameter);


	var bubble = d3.layout.pack()
				.size([diameter, diameter])
				.value(function(d) {return d.size;})
         // .sort(function(a, b) {
				// 	return -(a.value - b.value)
				// }) 
				.padding(3);
  
  // generate data with calculated layout values
  var nodes = bubble.nodes(processData(json1))
						.filter(function(d) { return !d.children; }); // filter out the outer bubble
 
  var vis = svg.selectAll('circle')
					.data(nodes);
  
  vis.enter().append('circle')
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
			.attr('class', function(d) { return d.className; });
  
  function processData(data) {
    var obj = data.payload;

    var newDataSet = [];

    for(var prop in obj) {
      if (typeof obj[prop] === "object" && obj[prop] !== null) {
          newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]['PUBLISHED_COUNT']});
      }

      // if (typeof obj[prop] === "object" && obj[prop] !== null) {
          // newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
      // }
      
    }
    return {children: newDataSet};
  }
  
})();