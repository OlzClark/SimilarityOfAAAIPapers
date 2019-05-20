// URL: https://beta.observablehq.com/d/f187a439496f4759
// Title: Force Directed Graph of Similarity for AAAI 2014 Accepted Papers
// Author: olzclark (@olzclark)
// Version: 624
// Runtime version: 1

const m0 = {
  id: "f187a439496f4759@624",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Force Directed Graph of Similarity for AAAI 2014 Accepted Papers`
)})
    },
    {

    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`Select nodes in the graph and press the button to display titles`
)})
    },
    {
      name: "viewof genTitles",
      inputs: ["button"],
      value: (function(button){return(
button("Click to Generate Selected Paper Titles")
)})
    },
    {
      name: "genTitles",
      inputs: ["Generators","viewof genTitles"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof selectedPapers",
      inputs: ["genTitles","chosenPapers","html"],
      value: (function(genTitles,chosenPapers,html)
{
  if(genTitles){
    let div = `<div>`
  div += `<div style="font-weight: bold;">Papers Selected:</div>`
    for (let item of chosenPapers){
    div += `<div>${item}</div>`
  }

  div += `</div>`
  return html`${div}`
  }
}
)
    },
    {
      name: "selectedPapers",
      inputs: ["Generators","viewof selectedPapers"],
      value: (G, _) => G.input(_)
    },
    {

    },
    {
      name: "chart",
      inputs: ["data","forceSimulation","d3","DOM","width","height","color","drag","chosenPapers"],
      value: (function(data,forceSimulation,d3,DOM,width,height,color,drag,chosenPapers)
{

  const links = data.links.map(d => Object.create(d));
  const nodes = data.nodes.map(d => Object.create(d));
  const simulation = forceSimulation(nodes, links).on("tick", ticked);
  const size = 7;
  const svg = d3.select(DOM.svg(width + 600, height))
      .attr("viewBox", [-width / 2, -height / 2, width+600, height]);
  
  const headline = svg.append('text').text('test').attr('x', -width + 400).attr('y', -400)
  
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("r", size)
      .attr("fill", color)
      .call(drag(simulation));

  
  node.append("title")
      .text(d => d.id)
  
 node.on('click', function(d) {
      if(d3.select(this).attr('r') == 7){
        
        // dispatch.call("clicked",chosenPapers, d.id);
        // listPapers();
        
         d3.select(this).attr('r', 15)
        .attr("fill", "red");
          this.append("text")
        chosenPapers.add(d.id);
        
        

      }else{
        d3.select(this).attr('r', 7)
        .attr("fill", "blue")
      chosenPapers.delete(d.id)

     }
    return this;
        });

        

  
  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
//    label
 //       .attr("x", d => d.x)
   //     .attr("y", d => d.y);
    
  }

  return svg.node();
}
)
    },
    {

    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`Select nodes in the graph and press the button to display a word cloud of up to 7 `
)})
    },
    {
      name: "viewof genClouds",
      inputs: ["button"],
      value: (function(button){return(
button("Click to Generate Word Clouds")
)})
    },
    {
      name: "genClouds",
      inputs: ["Generators","viewof genClouds"],
      value: (G, _) => G.input(_)
    },
    {
      name: "legendColor",
      inputs: ["d3","legendInfo","colors","d3Ez"],
      value: (function(d3,legendInfo,colors,d3Ez)
{  
  let minValue = 3;
  let maxValue = 9;
  let minRadius = 5;
  let maxRadius = 25;
  
  let colorScale = d3.scaleOrdinal()
    .domain(legendInfo)
    .range(colors);
  
  let myLegend = d3Ez.component.legendColor()
    .colorScale(colorScale)
    .width(500)
    .height(150)
    .itemType("rect");
  
  const chartHolder = d3.select(document.createElement("div"));
  
  chartHolder.append("svg")
    .attr("width", 800)
    .attr("height", 150)
    .call(myLegend);
  
  return chartHolder.node();
}
)
    },
    {

    },
    {
      inputs: ["makeCloud","wordCloudData"],
      value: (function(makeCloud,wordCloudData){return(
makeCloud(wordCloudData)
)})
    },
    {
      name: "viewof similarity",
      inputs: ["html"],
      value: (function(html){return(
html`<select>
<option value=highest>Highest Similarity Papers
<option value=lowest>Lowest Similarity Papers
</select>`
)})
    },
    {
      name: "similarity",
      inputs: ["Generators","viewof similarity"],
      value: (G, _) => G.input(_)
    },
    {
      name: "barChart",
      inputs: ["d3","DOM","height","barGraphData","x","y","format","xAxis","yAxis"],
      value: (function(d3,DOM,height,barGraphData,x,y,format,xAxis,yAxis)
{
  const width = 1500;

  const svg = d3.select(DOM.svg(width, height));
  
    svg.append("g")
        .attr("fill", "steelblue")
      .selectAll("rect")
      .data(barGraphData)
      .enter().append("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.title))
        .attr("width", d => x(d.score) - x(0))
        .attr("height", y.bandwidth())

    
    
    svg.append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .style("font", "12px sans-serif")
      .selectAll("text")
      .data(barGraphData)
      .enter().append("text")
        .attr("x", d => x(d.score) - 4)
        .attr("y", d => y(d.title) + y.bandwidth() / 2)
        .attr("dy", "0.4em")
        .text(d => format.bar(d.score));
      
     
    svg.append("g")
       .call(xAxis);

     svg.append("g")
        .call(yAxis);

    
   return svg.node();

  
}
)
    },
    {
      name: "wordCloudData",
      inputs: ["genClouds","chosenPapers","jsonAAAI","top25tfidf","colors"],
      value: (function(genClouds,chosenPapers,jsonAAAI,top25tfidf,colors)
{
var words = []
  
if(genClouds){
  var count = 0;
  for(var paper of chosenPapers){
    
    if(count < 7){
      var index =  jsonAAAI.map(function(e) { return e.title; }).indexOf(paper);
      var wordCount = 0;
      for(var key in top25tfidf[index]){
      if(wordCount < 20){  
        var wordScore = top25tfidf[index][key].split(":");
            words.push({
              text: wordScore[0],
              size: wordScore[1] * 250,
              fill: colors[count],
              paperIndex: index
            });
          wordCount++;
      }
      }
      count++;
    }
  }
  return words
}
}
)
    },
    {
      name: "legend",
      inputs: ["d3","DOM","width","height","legendInfo"],
      value: (function(d3,DOM,width,height,legendInfo)
{
   
   const svg = d3.select(DOM.svg(width, height))
   
   
   const legend = svg.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("text-anchor", "end")
  .selectAll("g")
  .data(legendInfo)
  .enter().append("g")
  .attr("transform", function(d, i) {
    return "translate(0," + i * 20 + ")";
  });

  //append legend colour blocks
  legend.append("rect")
    .attr("x", 10)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", function(d) {
    return d.colour;
  });

  //append legend texts
  legend.append("text")
    .attr("x", 35)
    .attr("y", 12)
    .attr("dy", "0.32em")
    .attr("text-anchor", "start")
    .text(function(d) {
    return d.title;
  });
   
   return svg;
 }
)
    },
    {
      name: "legendInfo",
      inputs: ["wordCloudData","jsonAAAI"],
      value: (function(wordCloudData,jsonAAAI)
{
  var data = []
  for(var i = 0; i < wordCloudData.length; i = i + 20){
            data.push(jsonAAAI[wordCloudData[i].paperIndex].title);
  }
  
  return data
}
)
    },
    {

    },
    {
      name: "colors",
      value: (function(){return(
["#95c11e","#e64c3d","#2fa7df","#fbc31c","#aa81f3","#4667cc","#60667a"]
)})
    },
    {
      name: "makeCloud",
      inputs: ["DOM","cloud","width","wordCloudData","d3"],
      value: (function(DOM,cloud,width,wordCloudData,d3){return(
function makeCloud(words) {
  var a = DOM.svg();
  
     
  
  var layout = cloud()
    .size([width, 700])
    .words(wordCloudData)
    .padding(5)
    .rotate(d => 0)
    .font("Impact")
    .fontSize(d => d.size)
    .on("end", draw);

  layout.start();

  function draw(words) {
    d3.select(a)
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
      .append("g")
      .attr(
        "transform",
        "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
      )
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", d => `${d.size}px`)
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
      .attr("fill", d => d.fill)
      .text(d => d.text);
  }

  return a;
}
)})
    },
    {
      name: "chosenPapers",
      value: (function(){return(
new Set()
)})
    },
    {
      name: "forceSimulation",
      inputs: ["d3"],
      value: (function(d3){return(
function forceSimulation(nodes, links) {
  return d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter());
}
)})
    },
    {
      name: "height",
      value: (function(){return(
1000
)})
    },
    {
      name: "color",
      value: (function()
{
  return "blue"
}
)
    },
    {
      name: "drag",
      inputs: ["d3"],
      value: (function(d3){return(
simulation => {
  
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
   
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;

  }
  

  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

}
)})
    },
    {
      name: "data",
      inputs: ["jsonAAAI","cosineDistances"],
      value: (function(jsonAAAI,cosineDistances)
{
  var threshold = 0.1 //Any node above this angle does not recieve an edge
  
  var nodes = [];
  var edges = [];
  for(var doc of jsonAAAI){
      
    nodes.push({
            id: doc.title,
            group: 1 
    });
  }

  for(var i = 0; i < cosineDistances.length; i++){
    for (var key in cosineDistances[i]) {
      if (cosineDistances[i].hasOwnProperty(key)) {
        
        var value = parseFloat(cosineDistances[i][key]);
        if(value > threshold && value != 1){
          edges.push({
             source: jsonAAAI[i].title,
             target: jsonAAAI[key].title,
             value: value
          });
        }
        
        
      }
    }
  }
  var final = {
            nodes: nodes,
            links: edges
  };
  
  return final;
}
)
    },
    {
      name: "barGraphData",
      inputs: ["cosineDistances","similarity","jsonAAAI"],
      value: (function(cosineDistances,similarity,jsonAAAI)
{
  var averages = []
  
for(var i = 0; i < cosineDistances.length; i++){
  var rowTotal = 0;
    for (var key in cosineDistances[i]) {
      if (cosineDistances[i].hasOwnProperty(key)) {
         rowTotal += parseFloat(cosineDistances[i][key]);
        
      }
    }
  averages.push(rowTotal / cosineDistances.length)
}
  var indexes = []
 
  if(similarity === "highest"){
    indexes = findIndicesOfMax(averages, 25);
  }else{
    indexes = findIndicesOfMin(averages, 25);
  }
  
  
  var barChartData = [];
  for(var i = 0; i < indexes.length; i++){
  barChartData.push({
      title: jsonAAAI[indexes[i]].title,
      score: averages[indexes[i]]

    });
  }
  return barChartData;
  
  function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}
  
    function findIndicesOfMin(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function(b, a) { return inp[b] - inp[a]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp
   }
}
)
    },
    {
      name: "x",
      inputs: ["d3","barGraphData","margin","width"],
      value: (function(d3,barGraphData,margin,width){return(
d3.scaleLinear()
      .domain([0, d3.max(barGraphData, d => d.score)])
      .range([margin.left, width - margin.right])
)})
    },
    {
      name: "xAxis",
      inputs: ["margin","d3","x","width"],
      value: (function(margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80))
    .call(g => g.select(".domain").remove())
)})
    },
    {
      name: "y",
      inputs: ["d3","barGraphData","margin","height"],
      value: (function(d3,barGraphData,margin,height){return(
d3.scaleBand()
    .domain(barGraphData.map(d => d.title))
    .range([margin.top, height - margin.bottom])
    .padding(0.1)
)})
    },
    {
      name: "yAxis",
      inputs: ["margin","d3","y"],
      value: (function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 30, right: 0, bottom: 10, left: 500}
)})
    },
    {
      name: "format",
      inputs: ["d3"],
      value: (function(d3){return(
{
  bar: d3.format(".6f")
  
}
)})
    },
    {
      name: "cosineDistances",
      inputs: ["d3"],
      value: (async function(d3)
{
  var rawData = await(d3.csv("https://gist.githubusercontent.com/OlzClark/3f14548a3bdb1238a3bd808534777421/raw/e1178bae9213cee971fb0c5e843b9d260334ad98/CosineSimilarityHeaderFixed.csv"));
  
return rawData;
}
)
    },
    {
      name: "jsonAAAI",
      inputs: ["d3"],
      value: (async function(d3)
{
  var rawData = await(d3.csv("https://gist.githubusercontent.com/OlzClark/4e784bc96ece5b5a809e4e251fb6d6eb/raw/25a67bb35211e86ba67122d77bd3328fc497a61d/AAAI%2520ACCEPTED%2520PAPERS.csv"));
  
return rawData;
}
)
    },
    {

    },
    {
      name: "top25tfidf",
      inputs: ["d3"],
      value: (async function(d3)
{
  var rawData = await(d3.csv("https://gist.githubusercontent.com/OlzClark/cb7e60b2fd167ba0aa3c1dec22c8e48a/raw/b7774c8ab64c1e2cc3d3b9c6232a4b11e795ce96/gistfile1.txt"));
  
return rawData;
}
)
    },
    {

    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    },
    {

    },
    {
      name: "cloud",
      inputs: ["require"],
      value: (function(require){return(
require('d3-cloud@1.2.5/build/d3.layout.cloud.js')
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "button",
      remote: "button"
    },
    {
      name: "d3Ez",
      inputs: ["require"],
      value: (function(require){return(
require('d3-ez')
)})
    },
    {
      name: "$",
      inputs: ["require"],
      value: (function(require){return(
require("jquery")
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "button",
      inputs: ["input"],
      value: (function(input){return(
function button(config = {}) {
  let {value, title, description, disabled} = config;
  if (typeof config == "string") value = config;
  if (!value) value = "Ok";
  const form = input({
    type: "button", title, description,
    attributes: {disabled, value}
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
        ? "onclick"
        : type == "checkbox" || type == "radio"
          ? "onchange"
          : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output)
        form.output.value = display
          ? display(value)
          : format
            ? format(value)
            : value;
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    }
  ]
};

const notebook = {
  id: "f187a439496f4759@624",
  modules: [m0,m1]
};

export default notebook;
