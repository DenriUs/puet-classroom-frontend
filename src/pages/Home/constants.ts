const data = [
  {
    type: 'ПН',
    activity: 38,
  },
  {
    type: 'ВТ',
    activity: 52,
  },
  {
    type: 'СР',
    activity: 61,
  },
  {
    type: 'ЧТ',
    activity: 145,
  },
  {
    type: 'ПТ',
    activity: 48,
  },
  {
    type: 'СБ',
    activity: 38,
  },
  {
    type: 'НД',
    activity: 38,
  },
];

export const configColumn = {
  data,
  height: 250,
  xField: 'type',
  yField: 'activity',
  columnStyle: {
    radius: [10, 10, 0, 0],
  },
  yAxis: {
    label: {
      style: {
        opacity: 0,
      },
      autoHide: true,
      autoRotate: false,
    },
  },
  xAxis: {
    label: {
      style: {
        opacity: 1,
      },
      autoHide: true,
      autoRotate: false,
    },
  },
};

export const configLiquid = {
  percent: 0.25,
  height: 250,
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
};
