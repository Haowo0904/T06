# T06 — TV Energy Consumption

A responsive D3 v7 histogram using the January 2025 TV dataset.

Run from this directory with `python -m http.server 8000`, then open
<http://localhost:8000>. A web server is required to fetch the CSV.

Choose All, LED, LCD or OLED above the chart, and a screen size below it.
Both filters apply together. Each group’s All button resets that group.
Bars animate for 500 ms (unless reduced motion is enabled). The chart uses
200 kWh/year bins from 0 to 1,800 and keeps both axes fixed for comparison.
Only finite, nonnegative consumption values below 1,800 are included.

Files are split into shared chart constants, CSV loading, histogram rendering,
and filter interactions. D3 loads from d3js.org and requires internet access.

