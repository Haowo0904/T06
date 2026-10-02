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
