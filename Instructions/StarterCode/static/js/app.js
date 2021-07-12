// Read samples.json using D3 library
function buildCharts(sample){
    d3.json("samples.json").then((data)=> {
        // var data = data.data;
        var sampleData = data.samples;
        var metaData = data.metadata;
        var nameData = data.names;

        // filter data by id
        var buildingArray = metaData.filter(sampleObj => sampleObj.id == sample);
        var result = buildingArray[0];
        // select the  panel
        var panelData = d3.select("#sample-metadata");

        // Clear the data in html
        panelData.html("");

        Object.entries(result).forEach((key)=>{
            panelData.append("p").text(key[0] + ":" + key[1]);
        });
      

        var buildingSample = sampleData.filter(sampleObj => sampleObj.id == sample);
        var resultSample = buildingSample[0];
        var otuid = resultSample.otu_ids;
        var otulabel = resultSample.otu_labels;
        var sampleval = resultSample.sample_values;

        var barTrace = [{
            y: otuid.slice(0,10).map(x => `OTU ${x}`).reverse(),
            x: sampleval.slice(0,10).reverse(),
            text: otulabel.slice(0,10).reverse(),
            marker: {
                color: otuid,
                colorscale: "Jet",
            },

            type: "bar",
            orientation: "h"
        }]

        var barLayout = {
            title: "Top 10 Bacteria"
        }

        var config = {
            responsive:true
        }

        Plotly.newPlot("bar", barTrace, barLayout, config)

        var trace1 = [{
            x: otuid,
            y: sampleval,
            text: otulabel,
            mode: 'markers',
            marker: {
              size: sampleval,
              color: otuid,
              colorscale:"Jet"
            }
          }];
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample"
        }
        Plotly.newPlot("bubble", trace1, bubbleLayout, config)
    }); 
        // var washFrequency = data.data.filter(f => f.id.toString() === id)[0];
        // washFrequency = washFrequency.washFrequency;
        // console.log("Washing Freq: " + washFrequency);
      }
// Create plot function
function createDropdown() {
    d3.json("samples.json").then((data)=> {
       var selDataset = d3.select("#selDataset")
       data.names.forEach (x =>{
           selDataset.append("option").property("value", x).text(x)
       })

    })} 
buildCharts(940)
createDropdown()