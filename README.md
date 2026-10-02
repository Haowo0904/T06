# T06 — TV Energy Consumption

A responsive D3 v7 histogram and scatterplot using the January 2025 TV dataset.

Run from this directory with `python -m http.server 8000`, then open
<http://localhost:8000>. A web server is required to fetch the CSV.

Choose All, LED, LCD or OLED above the chart, and a screen size below it.
Both filters apply together. Each group’s All button resets that group.
Bars animate for 500 ms (unless reduced motion is enabled). The chart uses
200 kWh/year bins from 0 to 2,800 and keeps both axes fixed for comparison.
All finite, nonnegative consumption values are included, including the outlier.

The scatterplot shows annual energy consumption versus star rating for all TVs,
independently of the histogram filters. LED is blue, LCD orange, and OLED green.
Hover or tap a point to display screen size in inches; move away or tap the chart
background to dismiss the tooltip. Native point titles also include brand and model.

Files are split into shared chart constants, CSV loading, histogram rendering,
and filter interactions. D3 loads from d3js.org and requires internet access.

