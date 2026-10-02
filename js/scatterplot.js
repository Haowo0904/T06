const drawScatterplot = data => {
  // Separate scales and chart group prevent interference with the histogram.
  const starExtent = d3.extent(data, d => d.star);
  xScaleS.domain([Math.max(0, (starExtent[0] ?? 0) - 0.5), (starExtent[1] ?? 8) + 0.5]);
  yScaleS.domain([0, d3.max(data, d => d.energyConsumption) || 1]).nice();
  const svg = d3.select('#scatterplot').append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img').attr('aria-labelledby', 'scatterplot-title scatterplot-description');
  svg.append('title').attr('id', 'scatterplot-title').text('TV energy consumption by star rating');
  svg.append('desc').attr('id', 'scatterplot-description')
    .text(`${data.length.toLocaleString()} TVs. Star rating on the horizontal axis and annual energy consumption on the vertical axis. Blue: LED; orange: LCD; green: OLED. Hover or tap a point to see screen size in inches. Histogram filters apply only to the histogram.`);
  innerChartS = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  innerChartS.append('g').attr('class', 'scatter-points').selectAll('circle')
    .data(data).join('circle').attr('class', 'tv-point')
    .attr('cx', d => xScaleS(d.star)).attr('cy', d => yScaleS(d.energyConsumption))
    .attr('r', 4).attr('fill', d => colorScale(d.screenTech)).attr('opacity', 0.5)
    .append('title').text(d => `${d.brand} ${d.model}: ${d.screenSize} inches, ${d.screenTech}, ${d.star} stars, ${d.energyConsumption} kWh/year`);
  innerChartS.append('g').attr('class', 'axis')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS).ticks(8));
  innerChartS.append('g').attr('class', 'axis')
    .call(d3.axisLeft(yScaleS).ticks(13).tickFormat(d3.format(',d')));
  svg.append('text').attr('class', 'axis-label').attr('text-anchor', 'end')
    .attr('x', width - 20).attr('y', height - 5).text('Star Rating');
  svg.append('text').attr('class', 'axis-label').attr('text-anchor', 'middle')
    .attr('transform', `translate(20,${margin.top + innerHeight / 2}) rotate(-90)`)
    .text('Labeled Energy Consumption (kWh/year)');
  const legend = svg.append('g').attr('class', 'legend')
    .attr('transform', `translate(${width - 150},${margin.top})`);
  colorScale.domain().forEach((tech, index) => {
    const row = legend.append('g').attr('transform', `translate(0,${index * 22})`);
    row.append('rect').attr('width', 10).attr('height', 10).attr('fill', colorScale(tech));
    row.append('text').attr('class', 'axis-label').attr('x', 20).attr('y', 12).text(tech);
  });
};
