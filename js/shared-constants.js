// A stable domain and thresholds keep bins comparable across every filter.
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xScale = d3.scaleLinear().domain([0, 2800]).range([0, innerWidth]);
const yScale = d3.scaleLinear().range([innerHeight, 0]);
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 2800])
  .thresholds(d3.range(200, 2800, 200));
const filters_screen = ['all', 'LED', 'LCD', 'OLED'].map(id => ({
  id, label: id === 'all' ? 'All' : id, isActive: id === 'all'
}));
const filters_size = ['all', 24, 32, 55, 65, 98].map(id => ({
  id, label: id === 'all' ? 'All Sizes' : `${id}″`, isActive: id === 'all'
}));
const selectedFilters = { screen: 'all', size: 'all' };
let barsGroup;
let innerChartS;
const tooltipWidth = 65;
const tooltipHeight = 32;
const xScaleS = d3.scaleLinear().range([0, innerWidth]);
const yScaleS = d3.scaleLinear().range([innerHeight, 0]);
const colorScale = d3.scaleOrdinal()
  .domain(['LED', 'LCD', 'OLED'])
  .range(['#1f77b4', '#ff7f0e', '#2ca02c']);
