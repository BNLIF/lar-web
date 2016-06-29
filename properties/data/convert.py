#!/usr/bin/env python
import sys, json, os

def main(filename):
    series = [];
    names = [];
    data = [];
    with open(filename) as f:
        for line in f:
            if (line.startswith('#')):
                names = line.split()[1:]
            else:
                data.append([float(x) for x in line.split()])
    print names
    for i in range(len(data)/2):
        series.append({
            'name': names[i],
            'data': zip(data[i*2], data[i*2+1])
        })
    # print series;
    newname = os.path.splitext(os.path.basename(filename))[0] + '.json'
    print 'data saved at', newname
    with open(newname, 'w') as out:
        json.dump(series, out)

if __name__ == "__main__":
    main(sys.argv[1])