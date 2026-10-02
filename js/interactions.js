const populateFilters = data => {
  const createButtons = (container, options, key) => {
    const buttons = d3.select(container).selectAll('button').data(options).join('button')
      .attr('type', 'button').attr('class', 'filter')
      .classed('active', d => d.isActive).attr('aria-pressed', d => String(d.isActive))
      .text(d => d.label);
    buttons.on('click', (event, option) => {
      if (option.isActive) return;
      options.forEach(filter => { filter.isActive = filter.id === option.id; });
      selectedFilters[key] = option.id;
      buttons.classed('active', d => d.isActive).attr('aria-pressed', d => String(d.isActive));
      updateHistogram(data);
    });
  };
  createButtons('#filters_screen', filters_screen, 'screen');
  createButtons('#filters_size', filters_size, 'size');
};

const createTooltip = () => {
  const tooltip = innerChartS.append('g').attr('class', 'tooltip')
    .attr('aria-hidden', 'true').style('opacity', 0).style('pointer-events', 'none');
  tooltip.append('rect').attr('width', tooltipWidth).attr('height', tooltipHeight)
    .attr('rx', 3).attr('fill', '#606464').attr('fill-opacity', 0.75);
  tooltip.append('text').attr('x', tooltipWidth / 2).attr('y', tooltipHeight / 2 + 2)
    .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
    .attr('fill', 'white').attr('font-size', 16).attr('font-weight', 900);
};

const handleMouseEvents = () => {
  const tooltip = innerChartS.select('.tooltip');
  const hideTooltip = () => tooltip.interrupt().style('opacity', 0);
  const showTooltip = (event, d) => {
    const cx = +event.currentTarget.getAttribute('cx');
    const cy = +event.currentTarget.getAttribute('cy');
    // Keep labels inside the SVG, including points along the chart edges.
    const tx = Math.max(-margin.left, Math.min(innerWidth - tooltipWidth, cx - tooltipWidth / 2));
    const ty = Math.max(-margin.top, cy - 1.5 * tooltipHeight);
    tooltip.interrupt().attr('transform', `translate(${tx},${ty})`).raise();
    tooltip.select('text').text(d.screenSize);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tooltip.style('opacity', 1);
    } else {
      tooltip.transition().duration(200).style('opacity', 1);
    }
  };
  innerChartS.selectAll('.tv-point')
    .on('mouseenter', showTooltip).on('mouseleave', hideTooltip)
    .on('click', showTooltip);
  d3.select('#scatterplot svg').on('click.dismiss', event => {
    if (!event.target.classList.contains('tv-point')) hideTooltip();
  }).on('mouseleave', hideTooltip);
};
