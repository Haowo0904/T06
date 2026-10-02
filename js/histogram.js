const drawHistogram = data => {
  const bins = binGenerator(data);
  yScale.domain([0, d3.max(bins, d => d.length) || 1]).nice();
  const svg = d3.select('#histogram').append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img').attr('aria-labelledby', 'histogram-title histogram-description');
  svg.append('title').attr('id', 'histogram-title').text('TV annual energy consumption histogram');
  svg.append('desc').attr('id', 'histogram-description');
  const innerChart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  barsGroup = innerChart.append('g');
  innerChart.append('g').attr('class', 'axis')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).tickValues(d3.range(0, 2801, 200)).tickFormat(d3.format(',')));
  innerChart.append('g').attr('class', 'axis').call(d3.axisLeft(yScale).ticks(13).tickFormat(d3.format(',d')));
  svg.append('text').attr('class', 'axis-label').attr('x', width - 20).attr('y', height - 5)
    .attr('text-anchor', 'end').text('Labeled Energy Consumption (kWh/year)');
  svg.append('text').attr('class', 'axis-label').attr('x', 30).attr('y', 20).text('Frequency');
  updateHistogram(data, false);
};

const updateHistogram = (data, animate = true) => {
  const filteredData = data.filter(tv =>
    (selectedFilters.screen === 'all' || tv.screenTech === selectedFilters.screen) &&
    (selectedFilters.size === 'all' || tv.screenSize === selectedFilters.size));
  const bins = binGenerator(filteredData);
  const bars = barsGroup.selectAll('rect').data(bins, d => d.x0).join('rect')
    .attr('class', 'bar').attr('x', d => xScale(d.x0))
    .attr('width', d => xScale(d.x1) - xScale(d.x0));
  bars.selectAll('title').data(d => [d]).join('title')
    .text(d => `${d.x0}–${d.x1} kWh/year: ${d.length} TVs`);
  bars.interrupt();
  const selection = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? bars.transition().duration(500).ease(d3.easeCubicInOut) : bars;
  selection.attr('y', d => yScale(d.length)).attr('height', d => innerHeight - yScale(d.length));
  const description = `${filteredData.length.toLocaleString()} TVs. Technology: ${selectedFilters.screen === 'all' ? 'all' : selectedFilters.screen}. Screen size: ${selectedFilters.size === 'all' ? 'all sizes' : `${selectedFilters.size} inches`}.`;
  d3.select('#histogram-description').text(description);
  d3.select('#chart-status').text(description);
};
