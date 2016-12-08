# Magnify Online

"Magnify Online" is an interactive waveform display hosted at [http://lar.bnl.gov/magnify](http://lar.bnl.gov/magnify).

If you are interested in running it locally, place your data in the `data/` directory with the following structure:

```
data
└── eventId
    ├── planeId
    │   ├── orig.json
    │   ├── nf.json
    │   ├── decon.json
```

, where `eventId` is a unique string identifying an event; `planeId` is a number representing a wire plane (by convention 0, 1, or 2 for the U, V, Y plane respectively); and the three JSON files are waveform data of the original, after noise-filtering, and after deconvolution waveforms of that wire plane. It is expected all three JSON files being present. The schema of the JSON files should follow:

```json
{
    "x"    : [0, 0, 0, 1, 1, 1],
    "y"    : [0, 1, 2, 0, 1, 2],
    "value": [3.0, 7.0, 4.5, 2.0, 10.0, 15.0],
    "scalingToADC": 0.004
}
```

, where the descriptions of the variables are summerized below

| Name | Description | Comments |
| ---- | ----------- | -------- |
| x | array of wire numbers | sorted, starting from 0 |
| y | array of time bin numbers | sorted for fixed x, starting from 0 |
| value | array of values at (x, y) | |
| scalingToADC | scaling factor to convert the value to ADC | 1.0 for the original and after noise filter waveforms |

. Then, you can load the waveform display at `http://localhost/magnify/#/event/{eventId}/plane/{planeId}/wire/{wireId}` . You can omit parts of the url, and the default `eventId`, `planeId`, and `wireId` will be set to `uboone-3493-1`, `0`, and `40`, respectively.
