# Everything You Need to Know About Liquid Argon Properties

This website is constructed using the [Twitter Bootstrap](http://getbootstrap.com/) framework to make it [responsive](https://en.wikipedia.org/wiki/Responsive_web_design) across a wide range of devices. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Download and Set Up a Webserver](#download-and-set-up-a-webserver)
- [Add Static Contents](#add-static-contents)
  - [Table](#table)
  - [Panel](#panel)
  - [Panel Title](#panel-title)
  - [Simple paragraph](#simple-paragraph)
  - [Two-column text + image](#two-column-text--image)
  - [Math formula](#math-formula)
- [Add Interactive Plots](#add-interactive-plots)
  - [Prepare data](#prepare-data)
  - [Convert to JSON format](#convert-to-json-format)
  - [Load into webpage](#load-into-webpage)
- [Add Dynamic Contents](#add-dynamic-contents)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Download and Set Up a Webserver

```bash
git clone https://github.com/czczc/LArProperties
cd LArProperties
python -m SimpleHTTPServer
```

Now open a web browser and go to <http://localhost:8000>

## Add Static Contents

The static contents can be directly added to the [index.html](index.html) file inside the corresponding `<section></section>` tag. To make the format consistent, please use the following guidelines:

### Table
```html
<table class="table table-bordered table-striped">
  <caption>Caption</caption>
  <thead>
    <tr>
      <th>field1</th>
      <th>field2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>value1</td>
      <td>value2</td>
    </tr>
  </tbody>
</table>
```

### Panel
```html
<div class="panel panel-primary">
  <div class="panel-heading">
    <h3 class="panel-title">Panel Title</h3>
  </div>
  <div class="panel-body">
    Panel text.
  </div>
</div>
```

### Simple paragraph
```html
<div class="row">
  <div class="col-md-12">
    Text.
  </div>
</div>
```

### Two-column text + image
```html
<div class="row">
  <div class="col-md-8">
    Text.
  </div>
  <div class="col-md-4">
    <img src="img/xxx.xxx" alt="" width="100%">
  </div>
</div>
```

### Math formula
Latex math formula can be inserted into the html directly. It is then automatically rendered by [MathJax](https://www.mathjax.org/).
- Inline: wrap latex formula in `$ ... $`
- Block: wrap latex formula in `\[ ... \]`


## Add Interactive Plots
Interactive plots can be added as shown in [this example](http://lar.bnl.gov/properties/#particle-pass). The plots are rendered by the [Highchharts](http://lar.bnl.gov/properties/#particle-pass) library.

### Prepare data
Suppose you want to overlay three curves with the names: `data-1`, `data-2`, `data-3`, respectively. Suppose you name this plot `myplot`. You should then create a text file `myplot.txt` with the following content:
```
# data-1 data-2 data-3
data-1-x1 data-1-x2 data-1-x3 data-1-x4 ...
data-1-y1 data-1-y2 data-1-y3 data-1-y4 ...
data-2-x1 data-2-x2 data-2-x3 data-2-x4 ...
data-2-y1 data-2-y2 data-2-y3 data-2-y4 ...
data-3-x1 data-3-x2 data-3-x3 data-3-x4 ...
data-3-y1 data-3-y2 data-3-y3 data-3-y4 ...
```
Note that `data-1`, `data-2` and `data-3` don't need to have the same number of points, but within each curve, the `x` and `y` array must have the same length.

To reduce the size of the data to be transfered, one should consider use less number of points when possible. In general, ~200 data points is enough. For the same reason, one should print out less significant digits when possible.

### Convert to JSON format
Use the [data/convert.py](data/convert.py) script to convert your `myplot.txt` file into a JSON format that [Highcharts](http://api.highcharts.com/highcharts#series<line>.data) understands.
```bash
cd data/
python convert.py path/to/myplot.txt
```
This will then create a `myplot.json` file inside the `data/` directory.

### Load into webpage
Finally, we need to load the data into the webpage.
First, add a place to host the plot in [index.html](index.html)
```html
<div class="list-group">
  <a href="" class="list-group-item list-group-item-success">Plot Description</a>
  <div id="myplot" class='plot'></div>
</div>
```
Make sure that the `id` attribute in `<div id="myplot" class='plot'></div>` is the same as the name of the `.json` file. The structure is set up such that this `<div>` tag to host the plot must be inside a `<div.list-group>` tag and preceded by an `<a>` tag. Multiple plots inside the list-group are allowed.

Then, add an entry to configure the properties of the plot, such as axis title, axis range, etc., to the `plot_dispatcher` object in the [js/plot-dispacher.js](js/plot-dispacher.js) file:
```javascript
var plot_dispatcher = {
  ...

  'myplot' : {
    xAxis: {title: {text: 'xxx'}, min: xxx, max: xxx},
    yAxis: {title: {text: 'xxx'}, min: xxx, max: xxx}
  },
  
  ...
}
```
Please refer to the [Highcharts API](http://api.highcharts.com/highcharts) for the full configurable properties of the plots.

## Add Dynamic Contents
Dynamic contents (content changes with inputs) can be added as shown in [this example](http://lar.bnl.gov/properties/#e-trans).
The dynamic contents are added using the [Vue.js](http://vuejs.org/) framework. Please follow the [example](js/app.js) to add your own `Vue` models.

