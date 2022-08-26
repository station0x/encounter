// setInterval(() => {
//     console.log(new Date().getTime())
// }, 1000)

// let n = prompt('how much do you want to swap? ')
// while(n !== 'stop') {
//     // code
//     const y =  getY(Number(n))
//     s += y
//     console.log(y)
//     n = prompt('how much do you want to swap? ')
// }

const r = 1
const deploymentTimestamp = Math.floor(Date.now()/1000)
let s = 0

function getY(x) {
    return (x*r*getT() - x*s)/(1+x)
}

function getX(y) {
    return y / (r*getT() - s - y)
}

function getT() {
    return Math.floor(Date.now()/1000) - deploymentTimestamp + 1
}
var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen()

screen.key(['escape'], function(ch, key) {
    return process.exit(0);
});

screen.key(['r', 'R'], (ch, key) => {
    refinery.focus();
    refinery.setContent('Welcome to the refinery, type any amount of ores to refine then press enter.\n');
    refinery.setLine(1, 'Amount: ');
    screen.render();
})

// refinery.on('keypress', (ch, key) => {
//     log.log()
// })


//create layout and widgets
var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

var donut = grid.set(8, 8, 4, 2, contrib.donut, 
  {
  label: 'Material Utilization (Out/Supply)',
  radius: 16,
  arcWidth: 4,
  yPadding: 2,
  data: [{label: 'Out/Supply', percent: 0}]
})

// var latencyLine = grid.set(8, 8, 4, 2, contrib.line, 
//   { style: 
//     { line: "yellow"
//     , text: "green"
//     , baseline: "black"}
//   , xLabelPadding: 3
//   , xPadding: 5
//   , label: 'Network Latency (sec)'})

var gauge = grid.set(8, 10, 2, 2, contrib.gauge, {label: 'Storage', percent: [80,20]})
var gauge_two = grid.set(2, 9, 2, 3, contrib.gauge, {label: 'Deployment Progress', percent: 80})

var sparkline = grid.set(10, 10, 2, 2, contrib.sparkline, 
  { label: 'Throughput (bits/sec)'
  , tags: true
  , style: { fg: 'blue', titleFg: 'white' }})

// var bar = grid.set(4, 6, 4, 3, contrib.bar, 
//   { label: 'Server Utilization (%)'
//   , barWidth: 4
//   , barSpacing: 6
//   , xOffset: 2
//   , maxHeight: 9})

var table =  grid.set(4, 9, 4, 3, contrib.table, 
  { keys: true
  , fg: 'green'
  , label: 'Refinery History'
  , columnSpacing: 1
  , columnWidth: [15, 15, 15, 15]})

var lcdLineOne = grid.set(0,9,2,3, contrib.lcd,
  {
    label: "LCD Test",
    segmentWidth: 0.06,
    segmentInterval: 0.11,
    strokeWidth: 0.1,
    elements: 5,
    display: 3210,
    elementSpacing: 4,
    elementPadding: 2
  }
);

var priceAndSupply = grid.set(0, 0, 6, 6, contrib.line, 
    { showNthLabel: 5
    , maxY: 100
    , label: 'Price and Supply'
    , showLegend: true
    , legend: {width: 10}})

var refinery = grid.set(8, 6, 4, 2, blessed.textbox, {
    label: 'Refine your Ores (Press (R) to refine)',
    inputOnFocus: true
})

refinery.key('enter', (ch, key) => {
    amountIn = refinery.getValue()
    s = Number(s) + getY(Number(amountIn))
    log.log('Refined: ' + amountIn + 'new Supply is' + (r*getT() - s).toFixed(2).toString())
    refinery.clearValue()
    refinery.cancel()
    refinery.setContent('Press (R) to start refining your ores...\n');
    screen.render();
})

refinery.key(['q', 'Q'], (ch, key) => {
    refinery.clearValue()
    refinery.cancel()
    refinery.setContent('Press (R) to start refining your ores...\n');
    screen.render();
})

var log = grid.set(6, 0, 6, 6, contrib.log, 
  { fg: "green"
  , selectedFg: "green"
  , label: 'General Log'})


//dummy data
var servers = ['US1', 'US2', 'EU1', 'AU1', 'AS1', 'JP1']
var commands = ['grep', 'node', 'java', 'timer', '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']


//set dummy data on gauge
var gauge_percent = 0
setInterval(function() {
  gauge.setData([gauge_percent, 100-gauge_percent]);
  gauge_percent++;
  if (gauge_percent>=100) gauge_percent = 0  
}, 200)

var gauge_percent_two = 0
setInterval(function() {
  gauge_two.setData(gauge_percent_two);
  gauge_percent_two++;
  if (gauge_percent_two>=100) gauge_percent_two = 0  
}, 200);


//set dummy data on bar chart
// function fillBar() {
//   var arr = []
//   for (var i=0; i<servers.length; i++) {
//     arr.push(Math.round(Math.random()*10))
//   }
//   bar.setData({titles: servers, data: arr})
// }
// fillBar()
// setInterval(fillBar, 2000)


//set dummy data for table
function generateTable() {
   var data = []

   for (var i=0; i<30; i++) {
     var row = []          
     row.push(commands[Math.round(Math.random()*(commands.length-1))])
     row.push(Math.round(Math.random()*5))
     row.push(Math.round(Math.random()*100))

     data.push(row)
   }

   table.setData({headers: ['Date', 'Ores In(%)', 'Material Out'], data: data})
}

generateTable()
table.focus()
setInterval(generateTable, 3000)

var PriceData = {
    title: 'Price',
    style: {line: 'red'},
    x: [],
    y: []
 }
 
 var SupplyData = {
    title: 'Supply',
    style: {line: 'yellow'},
    x: [],
    y: []
 }

//set log dummy data
setInterval(function() {
    log.log(`Time Elapsed: ${getT()}, Tot. Supply: ${(r*getT() - s).toFixed(2)}, Materials Sold: ${s}, Price of material: ${getX(1).toFixed(2)}`)

    PriceData.x.push(getT())
    SupplyData.x.push(getT())

    PriceData.y.push(getX(1))
    SupplyData.y.push(r*getT()-s)

    priceAndSupply.setData([PriceData, SupplyData])
    updateDonut();
    screen.render()
 }, 1000)


//set spark dummy data
var spark1 = [1,2,5,2,1,5,1,2,5,2,1,5,4,4,5,4,1,5,1,2,5,2,1,5,1,2,5,2,1,5,1,2,5,2,1,5]
var spark2 = [4,4,5,4,1,5,1,2,5,2,1,5,4,4,5,4,1,5,1,2,5,2,1,5,1,2,5,2,1,5,1,2,5,2,1,5]

refreshSpark()
setInterval(refreshSpark, 1000)

function refreshSpark() {
  spark1.shift()
  spark1.push(Math.random()*5+1)       
  spark2.shift()
  spark2.push(Math.random()*5+1)       
  sparkline.setData(['Server1', 'Server2'], [spark1, spark2])  
}



//set map dummy markers
setInterval(function() {

   screen.render()
}, 1000)

setInterval(function(){
  var colors = ['green','magenta','cyan','red','blue'];
  var text = ['A','B','C','D','E','F','G','H','I','J','K','L'];

  var value = Math.round(Math.random() * 100);
  lcdLineOne.setDisplay(value + text[value%12]);
  lcdLineOne.setOptions({
    color: colors[value%5],
    elementPadding: 4
  });
  screen.render()
}, 1500);

var pct = 0.00;

function updateDonut(){
  var color = "green";
  if (pct >= 0.25) color = "cyan";
  if (pct >= 0.5) color = "yellow";
  if (pct >= 0.75) color = "red";  
  donut.setData([
    {percent: parseFloat(s / (r * getT() - s)).toFixed(2), label: 'Out/Supply', 'color': color}
  ]);
//   pct = (s / r * getT() - s).toFixed(2)
 }

// setInterval(function() {   
//    updateDonut();
//    screen.render()
// }, 500)

function setLineData(mockData, line) {
  for (var i=0; i<mockData.length; i++) {
    var last = mockData[i].y[mockData[i].y.length-1]
    mockData[i].y.shift()
    var num = Math.max(last + Math.round(Math.random()*10) - 5, 10)    
    mockData[i].y.push(num)  
  }
  
  line.setData(mockData)
}


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// fixes https://github.com/yaronn/blessed-contrib/issues/10
screen.on('resize', function() {
  donut.emit('attach');
  gauge.emit('attach');
  gauge_two.emit('attach');
  sparkline.emit('attach');
//   bar.emit('attach');
  table.emit('attach');
  lcdLineOne.emit('attach');
  priceAndSupply.emit('attach');
  refinery.emit('attach');
  log.emit('attach');
  refinery.setContent('Press (R) to start refining your ores...\n');
});

screen.render()