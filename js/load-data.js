d3.csv('data/Ex6_TVdata.csv', d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech.trim(),
  energyConsumption: d.energyConsumption.trim() === '' ? NaN : +d.energyConsumption,
  star: d.star.trim() === '' ? NaN : +d.star
})).then(rows => {
  const data = rows.filter(d => Number.isFinite(d.energyConsumption) &&
    d.energyConsumption >= 0);
  console.info(`Loaded ${rows.length} TVs; ${data.length} included in the histogram.`);
  drawHistogram(data);
  drawScatterplot(data.filter(d => Number.isFinite(d.star)));
  populateFilters(data);
  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error('Error loading the CSV file:', error);
  d3.select('#histogram').append('p').attr('role', 'alert')
    .text('Unable to load TV data. Serve this folder with a local web server and refresh the page.');
  d3.select('#chart-status').text('TV data could not be loaded.');
});
