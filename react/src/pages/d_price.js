class Globalprice {
  print_price = 0;
  basic_price = 0;
  paper_price = 0;
  cutting_price = 0;
  normal_price = 0;
  fixed_price = -1;
  spare_price = 0;

  $_machine_grid = [
    {
      machine: "indigo7000",
      width: 306,
      height: 443,
      width2: 315,
      height2: 465,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "indigo10000",
      width: 740,
      height: 510,
      width2: 530,
      height2: 750,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "minolta4",
      width: 306,
      height: 450,
      width2: 315,
      height2: 465,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "indigoa2",
      width: 445,
      height: 625,
      width2: 445,
      height2: 625,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "revoria2",
      width: 306,
      height: 910,
      width2: 315,
      height2: 910,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "revoria3",
      width: 304,
      height: 620,
      width2: 315,
      height2: 620,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
  ];

  $_machine_grid2 = [
    {
      machine: "indigo7000",
      width: 306,
      height: 443,
      width2: 315,
      height2: 465,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "indigo10000",
      width: 740,
      height: 510,
      width2: 530,
      height2: 750,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "minolta4",
      width: 306,
      height: 450,
      width2: 315,
      height2: 465,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "indigoa2",
      width: 445,
      height: 625,
      width2: 445,
      height2: 625,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "revoria2",
      width: 306,
      height: 910,
      width2: 315,
      height2: 910,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
    {
      machine: "revoria3",
      width: 304,
      height: 620,
      width2: 315,
      height2: 620,
      max: 0,
      maesu: 0,
      total_maesu: 0,
      paper_price: 0,
      print_price: 0,
      pp: 0,
      basic_price: 0,
      print_maesu: 0,
      oprice: 0,
      cnt: 0,
      dc: 0,
      total_price: 0,
      spare: 0,
      spare_price: 0,
      cutting_price: 0,
      coating_price: 0,
      total_price2: 0,
      etc_max1: 0,
      etc_max2: 0,
      cut_spare: 0,
    },
  ];

  $_hp7000 = [
    { mm: 1, gugan: 0, val: 1000, total: 0 },
    { mm: 5, gugan: 0, val: 600, total: 0 },
    { mm: 10, gugan: 0, val: 290, total: 0 },
    { mm: 30, gugan: 0, val: 290, total: 0 },
    { mm: 100, gugan: 0, val: 170, total: 0 },
    { mm: 500, gugan: 0, val: 150, total: 0 },
    { mm: 1000, gugan: 0, val: 140, total: 0 },
    { mm: 5000, gugan: 0, val: 130, total: 0 },
    { mm: 1000000, gugan: 0, val: 124, total: 0 },
  ];

  $_hp7000_cutting = [
    { mm: 1, gugan: 0, val: 110, total: 0 },
    { mm: 2, gugan: 0, val: 100, total: 0 },
    { mm: 3, gugan: 0, val: 80, total: 0 },
    { mm: 4, gugan: 0, val: 70, total: 0 },
    { mm: 5, gugan: 0, val: 60, total: 0 },
    { mm: 10, gugan: 0, val: 50, total: 0 },
    { mm: 20, gugan: 0, val: 45, total: 0 },
    { mm: 30, gugan: 0, val: 40, total: 0 },
    { mm: 1000, gugan: 0, val: 30, total: 0 },
  ];

  $_hp10000 = [
    { mm: 1, gugan: 0, val: 3000, total: 0 },
    { mm: 5, gugan: 0, val: 700, total: 0 },
    { mm: 10, gugan: 0, val: 600, total: 0 },
    { mm: 30, gugan: 0, val: 500, total: 0 },
    { mm: 100, gugan: 0, val: 350, total: 0 },
    { mm: 500, gugan: 0, val: 240, total: 0 },
    { mm: 1000, gugan: 0, val: 240, total: 0 },
    { mm: 5000, gugan: 0, val: 240, total: 0 },
    { mm: 1000000, gugan: 0, val: 240, total: 0 },
  ];

  $_hp10000_cutting = [
    { mm: 1, gugan: 0, val: 300, total: 0 },
    { mm: 2, gugan: 0, val: 200, total: 0 },
    { mm: 3, gugan: 0, val: 150, total: 0 },
    { mm: 4, gugan: 0, val: 140, total: 0 },
    { mm: 10, gugan: 0, val: 130, total: 0 },
    { mm: 30, gugan: 0, val: 100, total: 0 },
    { mm: 50, gugan: 0, val: 80, total: 0 },
    { mm: 100, gugan: 0, val: 70, total: 0 },
    { mm: 1000, gugan: 0, val: 60, total: 0 },
  ];

  $_hpa2 = [
    { mm: 1, gugan: 0, val: 2850, total: 0 },
    { mm: 5, gugan: 0, val: 665, total: 0 },
    { mm: 10, gugan: 0, val: 570, total: 0 },
    { mm: 30, gugan: 0, val: 475, total: 0 },
    { mm: 100, gugan: 0, val: 333, total: 0 },
    { mm: 500, gugan: 0, val: 228, total: 0 },
    { mm: 1000, gugan: 0, val: 228, total: 0 },
    { mm: 5000, gugan: 0, val: 228, total: 0 },
    { mm: 1000000, gugan: 0, val: 228, total: 0 },
  ];

  $_hpa2_cutting = [
    { mm: 1, gugan: 0, val: 300, total: 0 },
    { mm: 2, gugan: 0, val: 200, total: 0 },
    { mm: 3, gugan: 0, val: 150, total: 0 },
    { mm: 4, gugan: 0, val: 140, total: 0 },
    { mm: 10, gugan: 0, val: 130, total: 0 },
    { mm: 30, gugan: 0, val: 100, total: 0 },
    { mm: 50, gugan: 0, val: 80, total: 0 },
    { mm: 100, gugan: 0, val: 70, total: 0 },
    { mm: 1000, gugan: 0, val: 60, total: 0 },
  ];

  $_minolta4 = [
    { mm: 1, gugan: 0, val: 1000, total: 0 },
    { mm: 5, gugan: 0, val: 300, total: 0 },
    { mm: 10, gugan: 0, val: 200, total: 0 },
    { mm: 30, gugan: 0, val: 150, total: 0 },
    { mm: 100, gugan: 0, val: 130, total: 0 },
    { mm: 500, gugan: 0, val: 100, total: 0 },
    { mm: 1000, gugan: 0, val: 80, total: 0 },
    { mm: 5000, gugan: 0, val: 70, total: 0 },
    { mm: 1000000, gugan: 0, val: 60, total: 0 },
  ];

  $_minolta4_cutting = [
    { mm: 1, gugan: 0, val: 110, total: 0 },
    { mm: 2, gugan: 0, val: 100, total: 0 },
    { mm: 3, gugan: 0, val: 80, total: 0 },
    { mm: 4, gugan: 0, val: 70, total: 0 },
    { mm: 5, gugan: 0, val: 60, total: 0 },
    { mm: 10, gugan: 0, val: 50, total: 0 },
    { mm: 20, gugan: 0, val: 45, total: 0 },
    { mm: 30, gugan: 0, val: 40, total: 0 },
    { mm: 1000, gugan: 0, val: 30, total: 0 },
  ];

  $_revoria2 = [
    { mm: 1, gugan: 0, val: 3000, total: 0 },
    { mm: 5, gugan: 0, val: 1000, total: 0 },
    { mm: 20, gugan: 0, val: 800, total: 0 },
    { mm: 50, gugan: 0, val: 600, total: 0 },
    { mm: 100, gugan: 0, val: 400, total: 0 },
    { mm: 500, gugan: 0, val: 300, total: 0 },
    { mm: 1000, gugan: 0, val: 270, total: 0 },
    { mm: 5000, gugan: 0, val: 230, total: 0 },
    { mm: 1000000, gugan: 0, val: 220, total: 0 },
  ];

  $_revoria2_cutting = [
    { mm: 1, gugan: 0, val: 400, total: 0 },
    { mm: 2, gugan: 0, val: 300, total: 0 },
    { mm: 3, gugan: 0, val: 200, total: 0 },
    { mm: 4, gugan: 0, val: 150, total: 0 },
    { mm: 10, gugan: 0, val: 140, total: 0 },
    { mm: 30, gugan: 0, val: 130, total: 0 },
    { mm: 50, gugan: 0, val: 100, total: 0 },
    { mm: 100, gugan: 0, val: 80, total: 0 },
    { mm: 1000, gugan: 0, val: 70, total: 0 },
  ];

  $_revoria3 = [
    { mm: 1, gugan: 0, val: 2700, total: 0 },
    { mm: 5, gugan: 0, val: 900, total: 0 },
    { mm: 20, gugan: 0, val: 720, total: 0 },
    { mm: 50, gugan: 0, val: 540, total: 0 },
    { mm: 100, gugan: 0, val: 360, total: 0 },
    { mm: 500, gugan: 0, val: 270, total: 0 },
    { mm: 1000, gugan: 0, val: 243, total: 0 },
    { mm: 5000, gugan: 0, val: 207, total: 0 },
    { mm: 1000000, gugan: 0, val: 198, total: 0 },
  ];

  $_revoria3_cutting = [
    { mm: 1, gugan: 0, val: 300, total: 0 },
    { mm: 2, gugan: 0, val: 200, total: 0 },
    { mm: 3, gugan: 0, val: 150, total: 0 },
    { mm: 4, gugan: 0, val: 140, total: 0 },
    { mm: 10, gugan: 0, val: 130, total: 0 },
    { mm: 30, gugan: 0, val: 100, total: 0 },
    { mm: 50, gugan: 0, val: 80, total: 0 },
    { mm: 100, gugan: 0, val: 70, total: 0 },
    { mm: 1000, gugan: 0, val: 60, total: 0 },
  ];

  $_coating_maesu = [
    { mm: 1, gugan: 0, val: 1, total: 0 },
    { mm: 10000, gugan: 0, val: 0.99, total: 0 },
    { mm: 30000, gugan: 0, val: 0.95, total: 0 },
    { mm: 60000, gugan: 0, val: 0.85, total: 0 },
    { mm: 100000, gugan: 0, val: 0.8, total: 0 },
    { mm: 150000, gugan: 0, val: 0.75, total: 0 },
    { mm: 200000, gugan: 0, val: 0.72, total: 0 },
    { mm: 300000, gugan: 0, val: 0.7, total: 0 },
    { mm: 5000000, gugan: 0, val: 0.68, total: 0 },
  ];

  $_coating_price = [
    { name: "단면유광", price: 300 },
    { name: "단면무광", price: 300 },
    { name: "양면유광", price: 600 },
    { name: "양면무광", price: 600 },
    { name: "단면벨벳", price: 1200 },
    { name: "양면벨벳", price: 2400 },
  ];

  $_coating_add_price = [
    { machine: "indigo7000", name: "단면유광", price: 3000 },
    { machine: "indigo7000", name: "단면무광", price: 3000 },
    { machine: "indigo7000", name: "양면무광", price: 4000 },
    { machine: "indigo7000", name: "양면유광", price: 4000 },
    { machine: "indigo7000", name: "단면벨벳", price: 7000 },
    { machine: "indigo7000", name: "양면벨벳", price: 8000 },

    { machine: "indigo10000", name: "단면유광", price: 3500 },
    { machine: "indigo10000", name: "단면무광", price: 3500 },
    { machine: "indigo10000", name: "양면무광", price: 4500 },
    { machine: "indigo10000", name: "양면유광", price: 4500 },
    { machine: "indigo10000", name: "단면벨벳", price: 10000 },
    { machine: "indigo10000", name: "양면벨벳", price: 10000 },

    { machine: "minolta4", name: "단면유광", price: 3000 },
    { machine: "minolta4", name: "단면무광", price: 3000 },
    { machine: "minolta4", name: "양면무광", price: 4000 },
    { machine: "minolta4", name: "양면유광", price: 4000 },
    { machine: "minolta4", name: "단면벨벳", price: 7000 },
    { machine: "minolta4", name: "양면벨벳", price: 8000 },

    { machine: "revoria2", name: "단면유광", price: 3500 },
    { machine: "revoria2", name: "단면무광", price: 3500 },
    { machine: "revoria2", name: "양면무광", price: 4500 },
    { machine: "revoria2", name: "양면유광", price: 4500 },
    { machine: "revoria2", name: "단면벨벳", price: 7000 },
    { machine: "revoria2", name: "양면벨벳", price: 8000 },

    { machine: "revoria3", name: "단면유광", price: 3500 },
    { machine: "revoria3", name: "단면무광", price: 3500 },
    { machine: "revoria3", name: "양면무광", price: 4500 },
    { machine: "revoria3", name: "양면유광", price: 4500 },
    { machine: "revoria3", name: "단면벨벳", price: 7000 },
    { machine: "revoria3", name: "양면벨벳", price: 8000 },

    { machine: "indigoa2", name: "단면유광", price: 3500 },
    { machine: "indigoa2", name: "단면무광", price: 3500 },
    { machine: "indigoa2", name: "양면무광", price: 4500 },
    { machine: "indigoa2", name: "양면유광", price: 4500 },
    { machine: "indigoa2", name: "단면벨벳", price: 7000 },
    { machine: "indigoa2", name: "양면벨벳", price: 8000 },
  ];

  $_coating_job_price = [
    { machine: "indigo7000", name: "단면유광", price: 120 },
    { machine: "indigo7000", name: "단면무광", price: 120 },
    { machine: "indigo7000", name: "양면무광", price: 240 },
    { machine: "indigo7000", name: "양면유광", price: 240 },
    { machine: "indigo7000", name: "단면벨벳", price: 120 },
    { machine: "indigo7000", name: "양면벨벳", price: 240 },

    { machine: "indigo10000", name: "단면유광", price: 200 },
    { machine: "indigo10000", name: "단면무광", price: 200 },
    { machine: "indigo10000", name: "양면무광", price: 400 },
    { machine: "indigo10000", name: "양면유광", price: 400 },
    { machine: "indigo10000", name: "단면벨벳", price: 240 },
    { machine: "indigo10000", name: "양면벨벳", price: 400 },

    { machine: "minolta4", name: "단면유광", price: 120 },
    { machine: "minolta4", name: "단면무광", price: 120 },
    { machine: "minolta4", name: "양면무광", price: 240 },
    { machine: "minolta4", name: "양면유광", price: 240 },
    { machine: "minolta4", name: "단면벨벳", price: 120 },
    { machine: "minolta4", name: "양면벨벳", price: 240 },

    { machine: "revoria2", name: "단면유광", price: 240 },
    { machine: "revoria2", name: "단면무광", price: 240 },
    { machine: "revoria2", name: "양면무광", price: 400 },
    { machine: "revoria2", name: "양면유광", price: 400 },
    { machine: "revoria2", name: "단면벨벳", price: 240 },
    { machine: "revoria2", name: "양면벨벳", price: 400 },

    { machine: "revoria3", name: "단면유광", price: 240 },
    { machine: "revoria3", name: "단면무광", price: 240 },
    { machine: "revoria3", name: "양면무광", price: 400 },
    { machine: "revoria3", name: "양면유광", price: 400 },
    { machine: "revoria3", name: "단면벨벳", price: 240 },
    { machine: "revoria3", name: "양면벨벳", price: 400 },

    { machine: "indigoa2", name: "단면유광", price: 200 },
    { machine: "indigoa2", name: "단면무광", price: 200 },
    { machine: "indigoa2", name: "양면무광", price: 400 },
    { machine: "indigoa2", name: "양면유광", price: 400 },
    { machine: "indigoa2", name: "단면벨벳", price: 200 },
    { machine: "indigoa2", name: "양면벨벳", price: 400 },
  ];

  width = 0;
  height = 0;

  //jobsize
  width2 = 0;
  height2 = 0;
  maesu = 0;
  quantity = 0;
  paper_name = "";
  color = "";
  add_color = "";

  //할증
  add_rate = 1;
  dosu = 1;

  division = 0;
  print_maesu = 0;

  $_selected_arr = [];

  $_selected_one = {};

  selected_dc = null;

  if_fixed_price = "N";

  sel_machine = "";

  constructor($spec, $paper, flag = true) {
    this.width = Number($spec.width);
    this.height = Number($spec.height);
    this.width2 = this.width + 2;
    this.height2 = this.height + 2;
    this.maesu = Number($spec.maesu);
    this.fixed_maesu = $spec.fixed_maesu;
    this.quantity = Number($spec.quantity);
    this.is_spc = $spec.is_spc;
    this.machine = $paper.machine;
    this.paper_name = $paper.name;
    this.color = $paper.color;
    this.color_val = Number($paper.color_val);
    this.add_color = $paper.add_color;
    this.add_color_val = Number($paper.add_color_val);
    this.is_toner = $paper.is_toner;
    this.is_indigo = $paper.is_indigo;
    this.is_fixed = $paper.is_dc;
    this.is_class = $spec.is_class;
    this.coating = $spec.coating;
    this.is_spec_custom = $spec.is_spec_custom;

    this.debug = false;

    if (this.debug) console.clear();

    if (this.color.indexOf("양면") > -1) {
      this.dosu = 2;
    }

    if (this.is_spec_custom == "Y") {
      this.$_machine_grid[1]["width"] = 738;
      this.$_machine_grid[1]["height"] = 508;

      this.$_machine_grid2[1]["width"] = 738;
      this.$_machine_grid2[1]["height"] = 508;
    }

    this.add_rate = this.color_val + this.add_color_val;
    this.selected_paper = JSON.parse(
      JSON.parse(decodeURIComponent($paper.obj))
    );

    if (!this.howMany()) {
      //console.log('지원하지 않는 용지이거나 규격입니다.');
      alert("해당용지에서 지원하지 않는 규격입니다.\n옵션을 변경해 주세요.");
      location.reload();
      return;
    }

    if (flag) {
      this.paperPrice();
      this.printPrice();
      this.cuttingPrice();
      if ($paper.is_dc == "Y") {
        if (this.machine == "toner") {
          this.selected_dc = JSON.parse(
            JSON.parse(decodeURIComponent($paper.toner))
          );
        } else {
          this.selected_dc = JSON.parse(
            JSON.parse(decodeURIComponent($paper.indigo))
          );
        }
        this.dcPrice();
      }
    }
  }

  makeMachinegrid(grid, p) {
    const afterprocs_spare_sum = 0;
    let width2 = this.width + 2;
    let height2 = this.height + 2;

    if (p == "2") {
      width2 = this.width + 5;
      height2 = this.height + 5;
    }

    for (let i = 0; i < grid.length; i++) {
      const v1 = Math.floor(grid[i]["width"] / width2);
      const v2 = Math.floor(grid[i]["height"] / height2);
      const v3 = Math.floor(grid[i]["width"] / height2);
      const v4 = Math.floor(grid[i]["height"] / width2);
      grid[i]["max"] = Math.max(
        Number(v1) * Number(v2),
        Number(v3) * Number(v4)
      );

      if (afterprocs_spare_sum > 0) {
        const t_max = grid[i]["max"];
        grid[i]["spare"] = Math.ceil(afterprocs_spare_sum / t_max);
      }

      if (grid[i]["max"] == 0) {
        grid[i]["maesu"] = 0;
        grid[i]["total_maesu"] = 0;
        grid[i]["total_price"] = 9999999;
        grid[i]["total_price2"] = 9999999;
      } else {
        let fixed_maesu = "N";
        let p1 = Math.ceil(this.maesu / grid[i]["max"]) * this.quantity;

        grid[i]["maesu"] = p1;

        /* 여분 정매적용 보류
        if( grid[i]['spare'] >= 1) {
          if (grid[i]['maesu'] > grid[i]['spare']) {
            fixed_maesu = 'Y';
            p1 = (Math.ceil(this.maesu / grid[i]['max']) + grid[i]['spare']) * this.quantity;
          }
        }
        */

        grid[i]["total_maesu"] = p1 * this.dosu;
        const t = this.guganPrintprice(
          grid[i]["total_maesu"],
          grid[i]["max"],
          i,
          this.add_rate
        );
        const tt2 = this.guganPrintprice(
          grid[i]["total_maesu"],
          grid[i]["max"],
          i,
          1
        );

        grid[i]["print_price"] = t.toFixed(0);
        grid[i]["pp"] = tt2.toFixed(0);

        grid[i]["basic_price"] = t / this.add_rate;
        grid[i]["print_maesu"] =
          (Math.ceil(this.maesu / grid[i]["max"]) + grid[i]["spare"]) *
          this.quantity;

        const add2 = Math.max(p1 / 100, 1);

        const tt1 = this.guganCuttingprice(grid[i]["max"], p1, i, add2);

        grid[i]["cutting_price"] = tt1;

        let hh = grid[i];

        let obj2 = _.find(this.selected_paper, function (o) {
          return o.width == hh["width2"] && o.height == hh["height2"];
        });

        //고시가
        let oprice = 0;
        let cnt = 0;
        let dc = 0;

        if (obj2) {
          oprice = Number(obj2["price"]);
          cnt = Number(obj2["cnt"]);
          dc = Number(obj2["dc"]);
        }

        grid[i]["oprice"] = oprice;
        grid[i]["cnt"] = cnt;
        grid[i]["dc"] = dc;

        let spare_price = (oprice / cnt) * Number(grid[i]["spare"]);
        spare_price = Math.ceil(spare_price / 100) * 100;

        grid[i]["spare_price"] = spare_price;

        let etc = 0;

        //indigo10000 일때만
        /*
        if( i == 1 || i == 2 || i == 4) {
          etc = 2;
        }
         */

        if (i == 1 || i == 3) {
          etc = 2;
        }

        /* 여분 정매적용 보류 */
        fixed_maesu = "N";

        let m_maesu = grid[i]["maesu"];
        if (fixed_maesu == "N") {
          m_maesu = grid[i]["maesu"];
        } else {
          m_maesu = grid[i]["print_maesu"];
        }

        //etc = 0;
        const t2 = ((Number(m_maesu) + etc) / cnt) * oprice * dc;

        grid[i]["paper_price"] = t2.toFixed(0);
        grid[i]["total_price"] =
          Number(grid[i]["paper_price"]) + Number(grid[i]["print_price"]);

        if (this.coating == undefined || this.coating == "") {
          grid[i]["coating_price"] = 0;
        } else {
          const coating = this.coating;
          const machine = grid[i]["machine"];
          let coating_add_price = 0;
          let coating_job_price = 0;

          let table = this.$_coating_price;

          let obj = _.find(table, function (o) {
            return o.name == coating;
          });

          const p = obj["price"];

          let m = (grid[i]["width"] / 1000) * (grid[i]["height"] / 1000) * p;
          m = Math.ceil(m / 10) * 10;

          table = this.$_coating_add_price;
          obj = _.find(table, function (o) {
            return o.name == coating && o.machine == machine;
          });
          coating_add_price = obj["price"];

          table = this.$_coating_job_price;
          obj = _.find(table, function (o) {
            return o.name == coating && o.machine == machine;
          });
          coating_job_price = obj["price"];

          const dd = Number(grid[i]["max"]);

          if (dd == 0) {
            grid[i]["coating_price"] = 0;
          } else {
            const q_maesu = (this.maesu * this.quantity) / dd;

            const p1 = (m + coating_job_price) * q_maesu + coating_add_price;
            const p2 = Math.ceil(p1 / 100) * 100;
            grid[i]["coating_price"] = p2;
          }
        }

        //grid[i]['total_price2'] = Number(tt1) + Number(grid[i]['print_price']);
        grid[i]["total_price2"] =
          Number(grid[i]["paper_price"]) +
          Number(grid[i]["basic_price"]) +
          Number(grid[i]["cutting_price"]) +
          Number(grid[i]["coating_price"]);

        let et1 = Math.floor(grid[i]["width"] / (this.width + 2));
        let et2 = Math.floor(grid[i]["height"] / (this.height + 2));
        let et3 = Math.floor(grid[i]["height"] / (this.height + 2));
        let et4 = Math.floor(grid[i]["width"] / (this.width + 2));
        //grid[i]['etc_max1'] = Math.max((et1 * et2),(et3 * et4));
        grid[i]["etc_max1"] = grid[i]["max"];

        et1 = Math.floor(grid[i]["width"] / (this.width + 5));
        et2 = Math.floor(grid[i]["height"] / (this.height + 5));
        et3 = Math.floor(grid[i]["height"] / (this.height + 5));
        et4 = Math.floor(grid[i]["width"] / (this.width + 5));
        grid[i]["etc_max2"] = Math.max(et1 * et2, et3 * et4);

        const b1 = grid[i]["etc_max1"];
        const b2 = grid[i]["etc_max2"];

        if (b1 == b2) {
          grid[i]["cut_spare"] = 5;
        } else {
          grid[i]["cut_spare"] = 2;
        }
      }
    }
  }

  howMany() {
    //후가공별 여분 계산
    const arr_after_procs_spare = [
      { name: "is_cutting", val: 0 },
      { name: "is_coating", val: 2 },
      { name: "is_osi", val: 5 },
      { name: "is_mising", val: 5 },
      { name: "is_folding", val: 5 },
      { name: "is_osifold", val: 5 },
      { name: "is_rounding", val: 0 },
      { name: "is_tomson", val: 5 },
      { name: "is_punching", val: 2 },
      { name: "is_press", val: 10 },
      { name: "is_foil", val: 10 },
      { name: "is_numbering", val: 0 },
      { name: "is_qrcode", val: 0 },
      { name: "is_quick", val: 0 },
      { name: "is_embo", val: 10 },
      { name: "is_barcode", val: 0 },
      { name: "is_ramicoating", val: 2 },
      { name: "is_uvscodix", val: 3 },
      { name: "is_foilscodix", val: 3 },
    ];

    let afterprocs_spare_sum = 0;

    $("input.afterproc:checkbox").each(function (e) {
      if ($(this).prop("checked")) {
        const nm = $(this).attr("name");

        const tmp = _.find(arr_after_procs_spare, function (o) {
          return o.name == nm;
        });

        afterprocs_spare_sum += Number(tmp["val"]);
      }
    });

    this.makeMachinegrid(this.$_machine_grid, "1");
    this.makeMachinegrid(this.$_machine_grid2, "2");

    if (this.machine == "indigo") {
      if (
        this.$_machine_grid[0]["max"] != 0 &&
        !isNaN(this.$_machine_grid[0]["paper_price"])
      ) {
        this.$_selected_arr.push(this.$_machine_grid[0]);
      }
      if (
        this.$_machine_grid[1]["max"] != 0 &&
        !isNaN(this.$_machine_grid[1]["paper_price"])
      ) {
        this.$_selected_arr.push(this.$_machine_grid[1]);
      }
      if (
        this.$_machine_grid[3]["max"] != 0 &&
        !isNaN(this.$_machine_grid[3]["paper_price"])
      ) {
        this.$_selected_arr.push(this.$_machine_grid[3]);
      }
    } else if (this.machine == "toner") {
      if (
        this.$_machine_grid[2]["max"] != 0 &&
        !isNaN(this.$_machine_grid[2]["paper_price"])
      ) {
        this.$_selected_arr.push(this.$_machine_grid[2]);
      }
      //레보리아 2개
      if (
        this.$_machine_grid[4]["max"] != 0 &&
        !isNaN(this.$_machine_grid[4]["paper_price"])
      ) {
        this.$_selected_arr.push(this.$_machine_grid[4]);
      }
      if (
        this.$_machine_grid[5]["max"] != 0 &&
        !isNaN(this.$_machine_grid[5]["paper_price"])
      ) {
        this.$_selected_arr.push(this.$_machine_grid[5]);
      }
    }

    let ret = _.sortBy(this.$_selected_arr, "total_price2");

    if (ret.length < 1) {
      return false;
    }

    this.division = ret[0]["max"];
    this.print_maesu = ret[0]["print_maesu"];

    this.$_selected_one = ret[0];
    this.sel_machine = ret[0]["machine"];

    const tobj1 = _.find(this.$_machine_grid, function (o) {
      return o.machine == ret[0]["machine"];
    });

    const tobj2 = _.find(this.$_machine_grid2, function (o) {
      return o.machine == ret[0]["machine"];
    });

    if (tobj1["max"] == tobj2["max"]) {
      this.$_selected_one["cut_spare"] = 5;
    } else {
      this.$_selected_one["cut_spare"] = 2;
    }

    //console.log(this.$_machine_grid);
    return true;
  }

  guganPrintprice(print_maesu, max, idx, add_rate) {
    let $data = null;

    if (idx == 0) {
      $data = this.$_hp7000;
    } else if (idx == 1) {
      $data = this.$_hp10000;
    } else if (idx == 2) {
      $data = this.$_minolta4;
    } else if (idx == 3) {
      $data = this.$_hpa2;
    } else if (idx == 4) {
      $data = this.$_revoria2;
    } else if (idx == 5) {
      $data = this.$_revoria3;
    }

    let total = 0;

    for (let x = 0; x < 9; x++) {
      let y = x - 1;
      try {
        if (print_maesu < $data[x].mm && print_maesu > $data[y].mm)
          $data[x].gugan = print_maesu;
        else $data[x].gugan = $data[x].mm;
      } catch (e) {
        //console.log(e);
      }

      if (y > -1) {
        $data[x].total =
          Number($data[x].val) *
          (Number($data[x].gugan) - Number($data[y].gugan));
      } else {
        $data[x].total = Number($data[x].gugan) * Number($data[x].val);
      }
    }

    for (const t in $data) {
      total += Number($data[t]["total"]);
      if ($data[t]["gugan"] == print_maesu) break;
    }

    total = total * add_rate;
    return total;
  }

  guganCuttingprice(print_maesu, total_maesu, idx, add_rate) {
    let $data = this.$_hp7000_cutting;

    if (idx == 0) {
      $data = this.$_hp7000_cutting;
    } else if (idx == 1) {
      $data = this.$_hp10000_cutting;
    } else if (idx == 2) {
      $data = this.$_minolta4_cutting;
    } else if (idx == 3) {
      $data = this.$_hpa2_cutting;
    } else if (idx == 4) {
      $data = this.$_revoria2_cutting;
    } else if (idx == 5) {
      $data = this.$_revoria3_cutting;
    }

    let total = 0;

    for (let x = 0; x < 9; x++) {
      let y = x - 1;
      try {
        if (print_maesu < $data[x].mm && print_maesu > $data[y].mm)
          $data[x].gugan = print_maesu;
        else $data[x].gugan = $data[x].mm;
      } catch (e) {
        //console.log(e);
      }

      if (y > -1) {
        $data[x].total =
          Number($data[x].val) *
          (Number($data[x].gugan) - Number($data[y].gugan));
      } else {
        $data[x].total = Number($data[x].gugan) * Number($data[x].val);
      }
    }

    for (const t in $data) {
      total += Number($data[t]["total"]);
      if ($data[t]["gugan"] == print_maesu) break;
    }

    total = total * add_rate;
    return Math.max(total, 1000);
  }

  printPrice() {
    this.basicPrice();

    //분류비
    let class_price = 300;
    const unit_class_price = 300;

    // 분류비는 명함 && 해당 사이즈
    // 명함 분류비 다시 받는가?
    if (goods_code == "dmynamecard") {
      if (this.width == "90" && this.height == "50") {
        class_price = 0;
      } else if (this.width == "50" && this.height == "90") {
        class_price = 0;
      } else if (this.width == "85" && this.height == "55") {
        class_price = 0;
      } else if (this.width == "55" && this.height == "85") {
        class_price = 0;
      } else if (this.width == "86" && this.height == "52") {
        class_price = 0;
      } else if (this.width == "52" && this.height == "86") {
        class_price = 0;
      } else {
        if (this.quantity > 1 && this.is_class == "Y") {
          class_price = this.quantity * unit_class_price;
        }
      }
    } else {
      if (this.quantity > 1 && this.is_class == "Y") {
        class_price = this.quantity * unit_class_price;
      }
    }

    this.class_price = class_price;

    let postcard_sale = 0;

    if (this.isPostcard()) {
      if (this.machine == "indigo") {
        postcard_sale = Math.min(this.basic_price * 0.2, 3000);
      } else {
        postcard_sale = Math.min(this.basic_price * 0.1, 3000);
      }
    }

    const p1 = this.basic_price * this.add_rate - postcard_sale + 600;

    this.print_price = Math.ceil(p1 / 100) * 100;

    if (this.debug) console.log("인쇄비=>" + this.print_price);
  }

  isPostcard() {
    if (this.width == 100 && this.height == 148) {
      return true;
    } else if (this.width == 105 && this.height == 148) {
      return true;
    } else {
      return false;
    }
  }

  etcMaesu(p, m) {
    //구간사이 작은값과 큰값 구하기
    let maesus = [
      { maesu: 96 },
      { maesu: 192 },
      { maesu: 288 },
      { maesu: 384 },
      { maesu: 480 },
    ];
    let obj = null;
    let ret = 0;

    if (p > 480) return p;

    if (m == "small") {
      obj = _.filter(maesus, function (o) {
        return o.maesu <= p;
      });

      const newobj = _.maxBy(obj, "maesu");
      try {
        ret = newobj["maesu"];
      } catch (e) {
        return -1;
      }
    } else {
      maesus = _.sortBy(maesus, "maesu").reverse();
      obj = _.filter(maesus, function (o) {
        return o.maesu >= p;
      });

      const newobj = _.minBy(obj, "maesu");

      try {
        ret = newobj["maesu"];
      } catch (e) {
        return -1;
      }
    }

    return ret;
  }

  etcPrice($data, val) {
    const obj = _.find($data, function (o) {
      return o.maesu == val;
    });

    try {
      return Number(obj["price"]);
    } catch (e) {
      return -1;
    }
  }

  dcPrice() {
    const $data = this.selected_dc;

    let $_gugan = [
      {
        width: 92,
        height: 52,
        width2: this.width2,
        height2: this.height2,
        v1: 0,
        v2: 0,
        v3: 0,
        v4: 0,
        max: 0,
        rate: 1,
      },
      {
        width: 88,
        height: 54,
        width2: this.width2,
        height2: this.height2,
        v1: 0,
        v2: 0,
        v3: 0,
        v4: 0,
        max: 0,
        rate: 1,
      },
      {
        width: 87,
        height: 57,
        width2: this.width2,
        height2: this.height2,
        v1: 0,
        v2: 0,
        v3: 0,
        v4: 0,
        max: 0,
        rate: 1.15,
      },
      {
        width: 92,
        height: 54,
        width2: this.width2,
        height2: this.height2,
        v1: 0,
        v2: 0,
        v3: 0,
        v4: 0,
        max: 0,
        rate: 1.15,
      },
    ];

    for (let i = 0; i < 4; i++) {
      $_gugan[i]["v1"] = Math.ceil($_gugan[i]["width2"] / $_gugan[i]["width"]);
      $_gugan[i]["v2"] = Math.ceil(
        $_gugan[i]["height2"] / $_gugan[i]["height"]
      );
      $_gugan[i]["v3"] = Math.ceil($_gugan[i]["width2"] / $_gugan[i]["height"]);
      $_gugan[i]["v4"] = Math.ceil($_gugan[i]["height2"] / $_gugan[i]["width"]);
      const max =
        Math.min(
          Number($_gugan[i]["v1"]) * Number($_gugan[i]["v2"]),
          Number($_gugan[i]["v3"]) * Number($_gugan[i]["v4"])
        ) * Number($_gugan[i]["rate"]);

      $_gugan[i]["max"] = max;
    }

    const p_maesu = Math.max(this.maesu, 96);
    //const p_maesu = this.maesu;
    //console.log('p_maesu=>' + p_maesu);

    const small_val = this.etcMaesu(p_maesu, "small");

    if (small_val < 0) {
      this.fixed_price = 0;
      return;
    }

    const big_val = this.etcMaesu(p_maesu, "big");

    if (big_val < 0) {
      this.fixed_price = 0;
      return;
    }

    const spare_maesu = big_val - small_val;

    const obj_small_price = _.find($data, function (o) {
      return o.maesu == small_val;
    });

    const small_price = this.etcPrice($data, Math.min(small_val, 480));
    if (small_price < 0) {
      //this.fixed_price = 0;
      //return;
    }

    //매단가
    let unit_price_maesu = 0;

    const big_price = this.etcPrice($data, Math.min(big_val, 480));
    if (big_price < 0) {
      //this.fixed_price = 0;
      //return;
    }

    //차액
    const cha_price = big_price - small_price;

    if (cha_price < 1) {
      //this.fixed_price = 0;
      //return;
    }

    try {
      unit_price_maesu = (cha_price / spare_maesu).toFixed(2);
    } catch (e) {
      unit_price_maesu = 0;
    }

    if (unit_price_maesu.indexOf("NaN") > -1) unit_price_maesu = 0;

    //차액단가
    const unit_price_cha = Math.ceil((big_val - this.maesu) * unit_price_maesu);

    //단가 : 해당단가 - 차액단가
    const unit_price = Math.ceil(big_price - unit_price_cha);

    //자리값
    const newobj = _.minBy($_gugan, "max");
    const jari = Number(newobj["max"]);

    //단가 * 자리 => 최종단가
    const final_unit_price = unit_price * jari;

    //추가비용 1매
    let obj = _.find($data, function (o) {
      return o.maesu == 480;
    });

    const maesu_ch_price = (Number(obj["price"]) / 500) * jari;

    const ch_price = Math.max((this.maesu - 480) * maesu_ch_price, 0);
    let ch_dosu_minus = 0;

    if (this.dosu == "1") {
      ch_dosu_minus = this.maesu * 4;
    }

    let yy_price = 0;

    let ki_maesu = this.maesu;

    if (this.maesu > 480) {
      ki_maesu = this.maesu;
    } else {
      ki_maesu = big_val;
    }

    /*
    let obj2 = _.find($data, function(o) {
      return (o.maesu == ki_maesu);
    });

    yy_price = Number(obj2['price']);
    */

    yy_price = big_price;

    let final_ch_price = jari * (yy_price - ch_dosu_minus) + ch_price;

    const final_unit_price2 = Math.max(final_unit_price, final_ch_price);

    if (this.debug) {
      console.log("주문수량=>" + ki_maesu);
      console.log("추가비용(1매)=>" + maesu_ch_price);
      console.log("추가비용=>" + ch_price);
      console.log("금액=>" + yy_price);
      console.log("최종추가비용=>" + final_ch_price);
      console.log("작은금액=>" + small_price);
      console.log("큰금액=>" + big_price);
      console.log("작은값=>" + small_val);
      console.log("큰값=>" + big_val);
      console.log("자리=>" + jari);
      console.log("단가=>" + unit_price);
      console.log("잔여수량=>" + spare_maesu);
      console.log("스몰단가=>" + small_price);
      console.log("빅단가=>" + big_price);
      console.log("차액=>" + cha_price);
      console.log("매단가=>" + unit_price_maesu);
      console.log("차액단가=>" + unit_price_cha);
      console.log("단가=>" + unit_price);
      console.log("최종단가=>" + final_unit_price2);
      console.log("별색=>" + this.add_color_val);
      console.log("할증(별색포함)=>" + this.add_rate);
    }

    const q = unit_price * jari + ch_price;
    //건수에 따른 분류비

    //기본인쇄비 * 별색할증
    const add_price = this.basic_price * this.add_rate;

    //별색비용
    const add_color_price = Math.max(
      Math.ceil((add_price - this.basic_price) / 100) * 100,
      0
    );

    //this.fixed_price = (Math.ceil( (final_unit_price2 + add_color_price) / 100) * 100) * this.quantity;
    this.fixed_price =
      Math.ceil((q + add_color_price) / 100) * 100 * this.quantity;

    //this.fixed_price = Math.ceil((unit_price * jari) / 100) * 100;
    //this.fixed_price = Math.ceil(final_unit_price2/100) * 100;

    //console.log('고정비=>' + this.fixed_price);
  }

  basicPrice() {
    let ret = _.sortBy(this.$_selected_arr, "total_price2");
    this.basic_price = Number(ret[0]["basic_price"]);

    //console.log( this.$_selected_arr);

    if (this.debug) console.log("기본비용=>" + this.basic_price);
  }

  paperPrice() {
    let ret = _.sortBy(this.$_selected_arr, "total_price2");
    let add_price = 0;

    if (this.is_spc) {
      this.paper_price = 0;
    } else {
      if (this.paper_name.indexOf("선방용지") > -1) {
        add_price = 10000;
        this.paper_price = add_price;
      } else {
        this.paper_price =
          Math.ceil(Number(ret[0]["paper_price"]) / 100) * 100 +
          200 +
          add_price;
      }
    }

    if (this.debug) console.log("용지비=>" + this.paper_price);
  }

  cuttingPrice() {
    let ret = _.sortBy(this.$_selected_arr, "total_price2");
    let p1 = Math.ceil(ret[0]["cutting_price"] / 100) * 100;
    p1 = Math.max(p1, 1000);

    this.cutting_price = p1;
  }

  checkFixedprice() {
    let t = this.paper_price + this.print_price;

    if (goods_code == "dmynamecard") {
      t += this.cutting_price;
    }

    if (t < this.fixed_price) {
      return "n";
    } else {
      return "f";
    }
  }

  get get_paper_price() {
    return this.paper_price;
  }

  get get_print_price() {
    return this.print_price;
  }

  get get_basic_price() {
    return this.print_price / this.add_rate;
  }

  get get_fixed_price() {
    return this.fixed_price;
  }

  get get_cutting_price() {
    return this.cutting_price;
  }

  get get_division() {
    return this.division;
  }

  get get_selmachine() {
    return this.sel_machine;
  }

  get get_price() {
    if (this.is_spc) {
      const m1 = this.maesu;
      const m2 = this.quantity;
      const up = 5500;
      const fp = (m1 * m2 * up) / 300 - this.cutting_price;
      return fp;
    }

    let p1 = 0;

    //인쇄 건할증
    const add_q1 = (this.quantity - 1) * 1000;

    //재단 건할증
    const add_q2 = (this.quantity - 1) * 500;

    const b2 = this.fixed_price;

    //고정가 있는 경우
    if (b2 > 1) {
      //console.log('class_price=>' + this.class_price);

      const b1 =
        this.paper_price +
        this.print_price +
        this.cutting_price +
        this.class_price +
        add_q1 +
        add_q2;
      p1 = Math.min(b1, b2);

      //일반가로 선택된 경우 재단비 제외해야 한다.
      if (p1 == b1) {
        p1 =
          this.paper_price +
          this.print_price +
          this.class_price +
          add_q1 +
          add_q2;
      } else if (p1 == b2) {
        p1 = b2 - this.cutting_price + this.class_price;
      }
    } else {
      p1 =
        this.paper_price +
        this.print_price +
        this.class_price +
        add_q1 +
        add_q2;
    }

    return Math.ceil(p1 / 100) * 100;
  }

  get get_machine_selected() {
    return this.$_selected_one;
  }

  get get_machine_grids() {
    return this.$_machine_grid;
  }

  get get_coating_price() {
    let $data = this.$_coating_maesu;

    const print_maesu = this.$_selected_one["coating_price"];

    let total = 0;

    for (let x = 0; x < 9; x++) {
      let y = x - 1;
      try {
        if (print_maesu < $data[x].mm && print_maesu > $data[y].mm)
          $data[x].gugan = print_maesu;
        else $data[x].gugan = $data[x].mm;
      } catch (e) {
        //console.log(e);
      }

      if (y > -1) {
        $data[x].total =
          Number($data[x].val) *
          (Number($data[x].gugan) - Number($data[y].gugan));
      } else {
        $data[x].total = Number($data[x].gugan) * Number($data[x].val);
      }
    }

    for (const t in $data) {
      total += Number($data[t]["total"]);
      if ($data[t]["gugan"] == print_maesu) break;
    }

    total = Math.ceil(total / 100) * 100;
    //return this.$_selected_one['coating_price'];
    return total;
  }

  checklog() {
    console.clear();
    console.log("paper_price=>" + this.paper_price);
    console.log("print_price=>" + this.print_price);
    console.log("cutting_price=>" + this.cutting_price);
    console.log("fixed_price=>" + this.fixed_price);
    console.log("비교가격=>" + this.normal_price);
    console.log("분류비=>" + this.class_price);
    console.log("별색비=>" + this.add_price);
    console.log("selected_one=>" + JSON.stringify(this.$_selected_one));
  }
}

//판,절수구하기
function setPan() {
  const _ww = Number($("#cutsize-w").val());
  const _hh = Number($("#cutsize-h").val());

  $_sizes = [
    {
      pan: "a1",
      width: 910,
      height: 315,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "a3",
      width: 445,
      height: 306,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "a4",
      width: 301,
      height: 218,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "a5",
      width: 218,
      height: 148,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "a6",
      width: 148,
      height: 107,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "a2",
      width: 636,
      height: 465,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "b2",
      width: 738,
      height: 508,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "b3",
      width: 506,
      height: 366,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "b4",
      width: 366,
      height: 251,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "b5",
      width: 251,
      height: 181,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
    {
      pan: "b6",
      width: 181,
      height: 123,
      w_div_cw: 0,
      h_div_ch: 0,
      w_div_ch: 0,
      h_div_cw: 0,
      max: 0,
      w_mul_h: 0,
      cw_mul_ch: 0,
      minus: 0,
    },
  ];

  //스코딕스 있을때 참조
  $_sizes_scodix = [];

  $_howmany_trnas = [
    { pan: "a3", howmany: 1 },
    { pan: "a4", howmany: 2 },
    { pan: "a5", howmany: 4 },
    { pan: "a6", howmany: 8 },
    { pan: "a1", howmany: 1 },
    { pan: "a2", howmany: 1 },
    { pan: "b2", howmany: 1 },
    { pan: "b3", howmany: 2 },
    { pan: "b4", howmany: 4 },
    { pan: "b5", howmany: 8 },
    { pan: "b6", howmany: 16 },
  ];

  $_pan_trans = [
    { pan: "a3", to: "a3" },
    { pan: "a4", to: "a3" },
    { pan: "a5", to: "a3" },
    { pan: "a6", to: "a3" },
    { pan: "b2", to: "b2" },
    { pan: "b3", to: "b2" },
    { pan: "a1", to: "b2" },
    { pan: "b4", to: "a3" },
    { pan: "b5", to: "a3" },
    { pan: "b6", to: "a3" },
  ];

  if (goods_code == "dpostcard") {
    $_sizes = [
      {
        pan: "a1",
        width: 910,
        height: 315,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a3",
        width: 441,
        height: 301,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a4",
        width: 301,
        height: 218,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a5",
        width: 218,
        height: 148,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a6",
        width: 148,
        height: 107,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a2",
        width: 636,
        height: 465,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "b2",
        width: 736,
        height: 506,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "b3",
        width: 506,
        height: 366,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "b4",
        width: 366,
        height: 251,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "b5",
        width: 251,
        height: 181,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "b6",
        width: 181,
        height: 123,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
    ];

    $_size_scodix = [
      {
        pan: "a3",
        width: 416,
        height: 286,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a4",
        width: 286,
        height: 206,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a5",
        width: 206,
        height: 141,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
      {
        pan: "a6",
        width: 141,
        height: 101,
        w_div_cw: 0,
        h_div_ch: 0,
        w_div_ch: 0,
        h_div_cw: 0,
        max: 0,
        w_mul_h: 0,
        cw_mul_ch: 0,
        minus: 0,
      },
    ];

    $_pan_trans = [
      { pan: "a3", to: "a3" },
      { pan: "a4", to: "a3" },
      { pan: "a5", to: "a3" },
      { pan: "a6", to: "a3" },
      { pan: "b2", to: "b2" },
      { pan: "a1", to: "b2" },
      { pan: "b3", to: "b2" },
      { pan: "b4", to: "b2" },
      { pan: "b5", to: "b2" },
      { pan: "b6", to: "b2" },
    ];

    $_howmany_trnas = [
      { pan: "a3", howmany: 1 },
      { pan: "a4", howmany: 2 },
      { pan: "a5", howmany: 4 },
      { pan: "a6", howmany: 8 },
      { pan: "b2", howmany: 1 },
      { pan: "a1", howmany: 1 },
      { pan: "b3", howmany: 2 },
      { pan: "b4", howmany: 4 },
      { pan: "b5", howmany: 8 },
      { pan: "b6", howmany: 16 },
    ];
  }

  let arr = $_sizes;

  /*
  if( goods_code == 'dpostcard') {
    let is_scodix = false;
    let is_tomson = false;

    if ($('input:checkbox[name="is_uvscodix"]').prop('checked')) {
      is_scodix = true;
    }

    if ($('input:checkbox[name="is_foilscodix"]').prop('checked')) {
      is_scodix = true;
    }

    if( $('input:checkbox[name="is_tomson"]').prop('checked')) {
      is_tomson = true;
    }

    if( is_scodix || is_tomson) {
      arr = $_size_scodix;
    }
  }

   */

  for (let i = 0; i < arr.length; i++) {
    let t1 = Math.floor(arr[i]["width"] / _ww);
    let t2 = Math.floor(arr[i]["height"] / _hh);
    let t3 = Math.floor(arr[i]["width"] / _hh);
    let t4 = Math.floor(arr[i]["height"] / _ww);
    let t5 = Math.max(t1 * t2, t3 * t4);
    let t6 = 0;

    if (t5 == 0) {
      t6 = -1;
    } else {
      t6 = Number(arr[i]["width"]) * Number(arr[i]["height"]);
    }

    let t7 = Math.round(_ww * _hh);

    let t8 = 0;

    if (t5 == 0) {
      t8 = -1;
    } else {
      t8 = t6 - t7;
    }

    arr[i]["w_div_cw"] = t1;
    arr[i]["h_div_ch"] = t2;
    arr[i]["w_div_ch"] = t3;
    arr[i]["h_div_cw"] = t4;
    arr[i]["max"] = t5;
    arr[i]["w_mul_h"] = t6;
    arr[i]["cw_mul_ch"] = t7;
    arr[i]["minus"] = t8;
  }

  let obj = _.filter(arr, function (o) {
    return o.minus > -1;
  });

  let ret = _.sortBy(obj, "minus");

  let tmp_pan = ret[0]["pan"];
  let tmp_pan_howmany = ret[0]["max"];

  _tmp_pan = tmp_pan;
  _tmp_pan_howmany = tmp_pan_howmany;

  let obj2 = _.find($_pan_trans, function (o) {
    return o.pan == tmp_pan;
  });

  try {
    _pan = obj2["to"];
    _pan_ori = obj2["to"];
  } catch (e) {}

  obj2 = _.find($_howmany_trnas, function (o) {
    return o.pan == tmp_pan;
  });

  let final_pan_howmany = Math.max(obj2["howmany"], _tmp_pan_howmany);
  _pan_howmany = final_pan_howmany;

  let t0 = Math.ceil(_maesu / _pan_howmany);
  _print_maesu = t0;

  t0 = Math.ceil((_maesu * _quantity) / _pan_howmany);
  _total_maesu = Math.max(t0, 1);
}

//재단가격
function priceCutting() {
  if (goods_code != "dmynamecard") {
    if ($('input:checkbox[name="is_cutting"]').prop("checked")) {
      $("#fp-cutting-row").show();
      /*
      var cutting = new Cutting(_quantity, _pan, _pan_howmany, _maesu);
      const p1 = Math.round(cutting.get_price / 10) * 10;
      $('#fp-cutting').text(comma3(p1));
      $('.fp-cutting').text(comma3(p1));
       */
    } else {
      $("#fp-cutting").text("0");
      $(".fp-cutting").text("0");
      $("#fp-cutting-row").hide();
    }
  }
}

function makeOsiDisplay() {
  let maesu = $('select[name="maesu"] option:selected').val();
  let quantity = $('select[name="quantity"] option:selected').val();
  let lines = $('input:radio[name="osi_line"]:checked').attr("data-val");
  let cutsize_w = Number($("#cutsize-w").val());
  let cutsize_h = Number($("#cutsize-h").val());
  let sizemode = $("#toggle-afterproc-osi .btn-switch-psize").attr(
    "data-sizemode"
  );
  let big = Math.max(cutsize_w, cutsize_h);
  let small = Math.min(cutsize_w, cutsize_h);
  let tmp_pan = _tmp_pan;
  let device = "pc";

  if (is_mobile == "Y") device = "mobile";

  const mg = 60;
  const bw = 170;
  const rate = ((bw * 100) / (big + mg)) * 0.01;

  if (sizemode == "large") {
    $("#osi-container").css({
      zoom: rate,
      width: big + "px",
      height: small + "px",
    });
  } else {
    $("#osi-container").css({
      zoom: rate,
      width: small + "px",
      height: big + "px",
    });
  }

  if (goods_code == "dmynamecard") {
    $_osi = new OsiNamecard(
      _maesu,
      _quantity,
      lines,
      "#osi-item",
      "#osi-input",
      _cutsize_w,
      _cutsize_h,
      sizemode,
      device
    );
  } else {
    $_osi = new Osi(
      tmp_pan,
      maesu,
      quantity,
      lines,
      "#osi-item",
      "#osi-input",
      cutsize_w,
      cutsize_h,
      sizemode,
      device
    );
  }
}

function makeOsifoldDisplay() {
  let lines = $('input:radio[name="osifold_line"]:checked').attr("data-line");
  let val = $('input:radio[name="osifold_line"]:checked').val();
  var maesu = $('select[name="maesu"] option:selected').val();
  var quantity = $('select[name="quantity"] option:selected').val();
  var $dan = $('input:radio[name="osifold_line"]:checked');
  let cutsize_w = Number($("#cutsize-w").val());
  let cutsize_h = Number($("#cutsize-h").val());
  let sizemode = $("#toggle-afterproc-osifold .btn-switch-psize").attr(
    "data-sizemode"
  );
  let big = Math.max(cutsize_w, cutsize_h);
  let small = Math.min(cutsize_w, cutsize_h);
  let device = "pc";

  if (is_mobile == "Y") device = "mobile";

  const mg = 60;
  const bw = 170;
  const rate = ((bw * 100) / (big + mg)) * 0.01;

  if (sizemode == "large") {
    $("#osifold-container").css({
      zoom: rate,
      width: big + "px",
      height: small + "px",
    });
  } else {
    $("#osifold-container").css({
      zoom: rate,
      width: small + "px",
      height: big + "px",
    });
  }

  $_osifold = new Osifold(
    _tmp_pan,
    maesu,
    quantity,
    $dan,
    "#osifold-item",
    "#osifold-input",
    cutsize_w,
    cutsize_h,
    sizemode,
    lines,
    val,
    device
  );
}

function makefoldingDisplay() {
  let lines = $('input:radio[name="fold_line"]:checked').attr("data-line");
  let val = $('input:radio[name="fold_line"]:checked').val();
  let maesu = $('select[name="maesu"] option:selected').val();
  let quantity = $('select[name="quantity"] option:selected').val();
  let $dan = $('input:radio[name="fold_line"]:checked');
  let cutsize_w = Number($("#cutsize-w").val());
  let cutsize_h = Number($("#cutsize-h").val());
  let rate = $('select[name="paper_size"] option:selected').attr("data-zoom");
  let sizemode = $("#toggle-afterproc-folding .btn-switch-psize").attr(
    "data-sizemode"
  );
  let big = Math.max(cutsize_w, cutsize_h);
  let small = Math.min(cutsize_w, cutsize_h);
  let device = "pc";

  if (is_mobile == "Y") device = "mobile";

  if (sizemode == "large") {
    $("#folding-container").css({
      zoom: rate,
      width: big + "px",
      height: small + "px",
    });
  } else {
    $("#folding-container").css({
      zoom: rate,
      width: small + "px",
      height: big + "px",
    });
  }

  $_folding = new Folding(
    _tmp_pan,
    maesu,
    quantity,
    $dan,
    "#folding-item",
    "#folding-input",
    cutsize_w,
    cutsize_h,
    sizemode,
    lines,
    val,
    device
  );
}

function makeMisingDisplay() {
  let maesu = $('select[name="maesu"] option:selected').val();
  let quantity = $('select[name="quantity"] option:selected').val();
  let lines = $('input:radio[name="mising_line"]:checked').attr("data-val");
  let cutsize_w = Number($("#cutsize-w").val());
  let cutsize_h = Number($("#cutsize-h").val());
  let sizemode = $("#toggle-afterproc-mising .btn-switch-psize").attr(
    "data-sizemode"
  );
  let big = Math.max(cutsize_w, cutsize_h);
  let small = Math.min(cutsize_w, cutsize_h);
  let tmp_pan = _tmp_pan;
  let device = "pc";

  if (is_mobile == "Y") device = "mobile";

  const mg = 60;
  const bw = 170;
  const rate = ((bw * 100) / (big + mg)) * 0.01;

  if (sizemode == "large") {
    $("#mising-container").css({
      zoom: rate,
      width: big + "px",
      height: small + "px",
    });
  } else {
    $("#mising-container").css({
      zoom: rate,
      width: small + "px",
      height: big + "px",
    });
  }

  //미싱금액 명함상관없이 똑같게
  if (goods_code == "dmynamecard1") {
    $_mising = new MisingNamecard(
      _maesu,
      _quantity,
      lines,
      "#mising-item",
      "#mising-input",
      _cutsize_w,
      _cutsize_h,
      sizemode,
      device
    );
  } else {
    $_mising = new Mising(
      tmp_pan,
      maesu,
      quantity,
      lines,
      "#mising-item",
      "#mising-input",
      cutsize_w,
      cutsize_h,
      sizemode,
      device
    );
  }
}

//코팅 가격계산
function priceCoating() {
  if ($('input:checkbox[name="is_coating"]').prop("checked")) {
    $("#fp-coating-row").show();

    /*
    setPan();

    let coating = null;
    const val = $('input:radio[name="coating"]:checked').attr('data-val');

    const $spec = {
      'maesu': Number($('#maesu').val()),
      'quantity': Number($('#quantity').val()),
      'cutwidth': Number($('#cutsize-w').val()),
      'cutheight': Number($('#cutsize-h').val()),
    };

    coating = new Coating($spec, val,g_division);

    $('#fp-coating').text(comma3(coating.get_price));
    $('.fp-coating').text(comma3(coating.get_price));

     */
  } else {
    $("#fp-coating").text("0");
    $(".fp-coating").text("0");
    $("#fp-coating-row").hide();
  }
}

//오시 가격계산
function priceOsi() {
  setPan();

  if ($('input:checkbox[name="is_osi"]').prop("checked")) {
    $("#fp-osi-row").show();
    makeOsiDisplay();

    $("#fp-osi").text(comma3($_osi.get_price));
    $(".fp-osi").text(comma3($_osi.get_price));
  } else {
    $("#fp-osi").text("0");
    $(".fp-osi").text("0");
    $("#fp-osi-row").hide();
  }
}

//미싱 가격계산
function priceMising() {
  setPan();

  if ($('input:checkbox[name="is_mising"]').prop("checked")) {
    $("#fp-mising-row").show();
    makeMisingDisplay();
    $("#fp-mising").text(comma3($_mising.get_price));
    $(".fp-mising").text(comma3($_mising.get_price));
  } else {
    $("#fp-mising").text("0");
    $(".fp-mising").text("0");
    $("#fp-mising-row").hide();
  }
}

//도무송 가격계산
function priceTomson() {
  setPan();

  if ($('input:checkbox[name="is_tomson"]').prop("checked")) {
    $("#fp-tomson-row").show();

    var tomson_total = 0;

    let no = 1;

    $("#toggle-afterproc-tomson .tomson-row").each(function () {
      let $width = $(this).find(".tomson-width");
      let $height = $(this).find(".tomson-height");
      let $unit_cnt = $(this).find(".tomson-cnt");
      let $shape = $(this).find(".tomson-shape option:selected");
      let is_scodix = false;

      if ($('input:checkbox[name="is_uvscodix"]').prop("checked")) {
        is_scodix = true;
      }

      if ($('input:checkbox[name="is_foilscodix"]').prop("checked")) {
        is_scodix = true;
      }

      let tomson = null;

      const max_cnt = $(this).find(".max-cnt").text();

      tomson = new Tomson(
        _pan,
        _pan_howmany,
        _cutsize_w,
        _cutsize_h,
        _maesu,
        _quantity,
        $width,
        $height,
        $unit_cnt,
        $shape,
        is_scodix,
        no,
        max_cnt
      );

      no++;

      $(this).find(".fp-tomson").text(comma3(tomson.get_price));

      tomson_total += Number(tomson.get_price);

      $(this).find(".tomson-price").text(tomson.get_price);
      $(this).find(".max-cnt").text(tomson.get_max_cnt);
    });

    const p1 = Math.round(tomson_total / 100) * 100;

    $("#fp-tomson").text(comma3(p1));
    $(".fp-tomson").text(comma3(p1));

    if ($.urlParam("work_id") == "376414") {
      $("#fp-tomson").text("68,200");
      $(".fp-tomson").text("68,200");
    }
  } else {
    $("#fp-tomson").text("0");
    $(".fp-tomson").text("0");
    $("#fp-tomson-row").hide();
  }
}

//타공 가격계산
function pricePunching() {
  if ($('input:checkbox[name="is_punching"]').prop("checked")) {
    $("#fp-punching-row").show();

    let cnt = $('select[name="punching_cnt"] option:selected').val();

    let punching = null;

    /*
    if( goods_code == 'dmynamecard') {
      punching = new PunchingNamecard(_maesu, cnt, _quantity);
    }
    else {
      punching = new Punching(_maesu, cnt, _quantity);
    }

     */

    punching = new Punching(_maesu, cnt, _quantity);

    $("#fp-punching").text(comma3(punching.get_price));
    $(".fp-punching").text(comma3(punching.get_price));
  } else {
    $("#fp-punching").text("0");
    $(".fp-punching").text("0");
    $("#fp-punching-row").hide();
  }
}

//형압 가격계산
function pricePress() {
  if ($('input:checkbox[name="is_press"]').prop("checked")) {
    $("#fp-press-row").show();

    let $way = null;
    let $kind = null;
    let width = $('input[name="press_width"]').val();
    let height = $('input[name="press_height"]').val();
    const cutsize_w = $("#cutsize-w").val();
    const cutsize_h = $("#cutsize-h").val();
    const is_have = $("#toggle-afterproc-press .press-row").attr("data-have");
    const paper = $("#cover-gram").val();

    let press = new Bak(
      _maesu,
      $way,
      $kind,
      width,
      height,
      _quantity,
      cutsize_w,
      cutsize_h,
      "Y",
      paper
    );

    let price = press.get_price;

    if (price <= 0) {
      alert("형압 가능한 사이즈가 아닙니다.");
      $('input[name="press_width"]').val("10");
      $('input[name="press_height"]').val("10");
      $("#toggle-afterproc-press").hide();
      $('input:checkbox[name="is_press"]').prop("checked", false).change();
      return false;
    }

    const dongpan_price = press.get_dongpan_price;
    const film_price = press.get_film_price;

    if (is_have == "Y") {
      price = price - dongpan_price;
    }

    $("#toggle-afterproc-press .pan-price").text(dongpan_price);
    $("#toggle-afterproc-press .film-price").text(film_price);

    $("#fp-press").text(comma3(price));
    $(".fp-press").text(comma3(price));
  } else {
    $("#fp-press").text("0");
    $(".fp-press").text("0");
    $("#fp-press-row").hide();
  }
}

//귀도리 가격계산
function priceRounding() {
  if ($('input:checkbox[name="is_rounding"]').prop("checked")) {
    $("#fp-rounding-row").show();

    let width = $('input[name="press_width"]').val();
    let height = $('input[name="press_height"]').val();

    let rounding = new Rounding(_maesu, _quantity);

    $("#fp-rounding").text(comma3(rounding.get_price));
    $(".fp-rounding").text(comma3(rounding.get_price));
  } else {
    $("#fp-rounding").text("0");
    $(".fp-rounding").text("0");
    $("#fp-rounding-row").hide();
  }
}

//동판박 가격계산
function priceFoil() {
  if ($('input:checkbox[name="is_foil"]').prop("checked")) {
    $("#fp-foil-row").show();
    let total_price = 0;
    $(".foil-row").each(function () {
      let $way = $(this).find(".foil-way option:selected");
      let $kind = $(this).find(".foil option:selected");
      let width = $(this).find(".foil-width").val();
      let height = $(this).find(".foil-height").val();
      const cutsize_w = $("#cutsize-w").val();
      const cutsize_h = $("#cutsize-h").val();

      const is_have = $(this).attr("data-have");
      const paper = $("#cover-gram").val();

      let foil = new Bak(
        _maesu,
        $way,
        $kind,
        width,
        height,
        _quantity,
        cutsize_w,
        cutsize_h,
        "N",
        paper
      );

      let price = foil.get_price;

      if (price <= 0) {
        alert("동판박 가능한 사이즈가 아닙니다.");
        $('input[name="foil_width1"]').val("10");
        $('input[name="foil_height1"]').val("10");

        $("#toggle-afterproc-foil").hide();
        $('input:checkbox[name="is_foil"]').prop("checked", false).change();
        return false;
      }

      const dongpan_price = foil.get_dongpan_price;
      const film_price = foil.get_film_price;

      if (is_have == "Y") {
        price = price - dongpan_price;
      }

      total_price += price;

      $(this).find(".foil-price").text(price);
      $(this).find(".pan-price").text(dongpan_price);
      $(this).find(".film-price").text(film_price);
    });

    $("#fp-foil").text(comma3(total_price));
    $(".fp-foil").text(comma3(total_price));
  } else {
    $("#fp-foil").text("0");
    $(".fp-foil").text("0");
    $("#fp-foil-row").hide();
  }
}

//즉석명함 가격계산
function priceQuick() {
  if ($('input:checkbox[name="is_quick"]').prop("checked")) {
    $("#fp-quick-mynamecard-row").show();

    let quick = new QuickBusinessCard(_maesu, _quantity);

    $("#fp-quick-mynamecard").text(comma3(quick.get_price));
    $(".fp-quick-mynamecard").text(comma3(quick.get_price));
  } else {
    $("#fp-quick-mynamecard-row").hide();

    $("#fp-quick-mynamecard").text("0");
    $(".fp-quick-mynamecard").text("0");
  }
}

//넘버링 가격계산
function priceNumbering() {
  if ($('input:checkbox[name="is_numbering"]').prop("checked")) {
    $("#fp-numbering-row").show();
    let numbering = new Numbering(_maesu, _quantity);
    $("#fp-numbering").text(comma3(numbering.get_price));
    $(".fp-numbering").text(comma3(numbering.get_price));
  } else {
    $("#fp-numbering").text("0");
    $(".fp-numbering").text("0");
    $("#fp-numbering-row").hide();
  }
}

//바코드 가격계산
function priceBarcode() {
  if ($('input:checkbox[name="is_barcode"]').prop("checked")) {
    $("#fp-barcode-row").show();

    let barcode = new Barcode(_maesu, _quantity);
    $("#fp-barcode").text(comma3(barcode.get_price));
    $(".fp-barcode").text(comma3(barcode.get_price));
  } else {
    $("#fp-barcode").text("0");
    $(".fp-barcode").text("0");
    $("#fp-barcode-row").hide();
  }
}

//QR코드 가격계산
function priceQRcode() {
  if ($('input:checkbox[name="is_qrcode"]').prop("checked")) {
    $("#fp-qrcode-row").show();
    let qrcode = new QRCode(_maesu, _quantity);
    $("#fp-qrcode").text(comma3(qrcode.get_price));
    $(".fp-qrcode").text(comma3(qrcode.get_price));
  } else {
    $("#fp-qrcode").text("0");
    $(".fp-qrcode").text("0");
    $("#fp-qrcode-row").hide();
  }
}

//송진엠보 가겨계산
function priceEmbo() {
  if ($('input:checkbox[name="is_embo"]').prop("checked")) {
    $("#fp-embo-row").show();
    let sides = $('input:radio[name="embo"]:checked').attr("data-sides");
    let embo = new Embo(_maesu, _quantity, sides);
    $("#fp-embo").text(comma3(embo.get_price));
    $(".fp-embo").text(comma3(embo.get_price));
  } else {
    $("#fp-embo").text("0");
    $(".fp-embo").text("0");
    $("#fp-embo-row").hide();
  }
}

//오시+접지가격
function priceOsifold() {
  setPan();

  if ($('input:checkbox[name="is_osifold"]').prop("checked")) {
    $("#fp-osifold-row").show();
    makeOsifoldDisplay();
    const p1 = Math.round($_osifold.get_price / 10) * 10;
    $("#fp-osifold").text(comma3(p1));
    $(".fp-osifold").text(comma3(p1));
  } else {
    $("#fp-osifold").text("0");
    $(".fp-osifold").text("0");
    $("#fp-osifold-row").hide();
  }
}

//접지가격
function priceFolding() {
  if ($('input:checkbox[name="is_folding"]').prop("checked")) {
    $("#fp-folding-row").show();
    makefoldingDisplay();
    const p1 = Math.round($_folding.get_price / 10) * 10;
    $("#fp-folding").text(comma3(p1));
    $(".fp-folding").text(comma3(p1));
  } else {
    $("#fp-folding").text("0");
    $(".fp-folding").text("0");
    $("#fp-folding-row").hide();
  }

  /*
  if ($('input:checkbox[name="is_folding"]').prop('checked')) {
    $('#fp-folding-row').show();
    let price = $('input:radio[name="folding"]:checked').attr('data-price');
    let quantity = $('#quantity').val();
    let maesu = $('#maesu').val();

    var folding = new Folding(_tmp_pan, quantity, maesu, price);
    $('#fp-folding').text(comma3(folding.get_price));
    $('.fp-folding').text(comma3(folding.get_price));
  } else {
    $('#fp-folding').text('0');
    $('.fp-folding').text('0');
    $('#fp-folding-row').hide();
  }
  */
}

function priceUVscodix() {
  setPan();

  if ($('input:checkbox[name="is_uvscodix"]').prop("checked")) {
    $("#fp-uvscodix-row").show();

    const ww = $('input[name="uvscodix_width"]').val();
    const hh = $('input[name="uvscodix_height"]').val();

    const cutwidth = Number($("#cutsize-w").val());
    const cutheight = Number($("#cutsize-h").val());
    const maesu = Number($("#maesu").val());
    const quantity = Number($("#quantity").val());

    const $spec = {
      cutwidth: cutwidth,
      cutheight: cutheight,
      maesu: maesu,
      quantity: quantity,
    };

    const uvscodix = new UVscodix($spec, ww, hh);

    if (uvscodix.get_error) {
      alert("지원하지 않는 사이즈 입니다.(디지털 부분UV)");
      setTimeout(() => {
        $("#is-uvscodix").trigger("click");
      }, 200);
    } else {
      $("#fp-uvscodix").text(comma3(uvscodix.get_price));
      $(".fp-uvscodix").text(comma3(uvscodix.get_price));
    }
  } else {
    $("#fp-uvscodix").text("0");
    $(".fp-uvscodix").text("0");
    $("#fp-uvscodix-row").hide();
  }
}

//스코딕스박 가격계산
function priceFoilscodix() {
  setPan();
  if ($('input:checkbox[name="is_foilscodix"]').prop("checked")) {
    $("#fp-foilscodix-row").show();
    let total_price = 0;

    $(".foilscodix-row").each(function () {
      const sides = $(this)
        .find(".foilscodix-way option:selected")
        .attr("data-val");
      const foil = $(this).find(".foilscodix option:selected").attr("data-val");
      const ww = $(this).find(".foilscodix-ww").val();
      const hh = $(this).find(".foilscodix-hh").val();

      const cutwidth = Number($("#cutsize-w").val());
      const cutheight = Number($("#cutsize-h").val());
      const maesu = Number($("#maesu").val());
      const quantity = Number($("#quantity").val());

      const $spec = {
        cutwidth: cutwidth,
        cutheight: cutheight,
        maesu: maesu,
        quantity: quantity,
      };

      const foilcodix = new Foilscodix($spec, sides, foil, ww, hh);

      if (foilcodix.get_error) {
        alert("지원하지 않는 사이즈 입니다.(디지털 박)");
        setTimeout(() => {
          $("#is-foilscodix").trigger("click");
          return false;
        }, 200);
      } else {
        $(this).find(".foilscodix-price").text(foilcodix.get_price);
        total_price += foilcodix.get_price;
      }
    });

    const p1 = Math.round(total_price / 100) * 100;
    $("#fp-foilscodix").text(comma3(p1));
    $(".fp-foilscodix").text(comma3(p1));
  } else {
    $("#fp-foilscodix").text("0");
    $(".fp-foilscodix").text("0");
    $("#fp-foilscodix-row").hide();
  }
}

//라미넥스코팅가격
function priceRamicoating() {
  setPan();

  if ($('input:checkbox[name="is_ramicoating"]').prop("checked")) {
    $("#fp-ramicoating-row").show();
    const ww = $("#jobsize-w").val();
    const hh = $("#jobsize-h").val();
    const maesu = $('select[name="maesu"] option:selected').val();
    const quantity = $('select[name="quantity"] option:selected').val();
    //var coating = new Ramicoating(_pan_ori, _total_maesu, val,maesu,quantity);
    var coating = new Ramicoating(ww, hh, maesu, quantity);

    $("#fp-ramicoating").text(comma3(coating.get_price));
    $(".fp-ramicoating").text(comma3(coating.get_price));
  } else {
    $("#fp-ramicoating").text("0");
    $(".fp-ramicoating").text("0");
    $("#fp-ramicoating-row").hide();
  }
}

function priceToday() {
  if ($('input:checkbox[name="is_today"]').prop("checked")) {
    $("#fp-todayprice-row").show();

    let supply = 0;

    $(".mny").each(function () {
      let v = Number($(this).text().replace(/,/g, ""));
      if (
        $(this).attr("id") == "fp-todayprice" ||
        $(this).attr("id") == "fp-tomorrowprice"
      ) {
      } else {
        supply += v;
      }
    });

    const price = Math.ceil((supply * 0.15 + 1000) / 100) * 100;

    $("#fp-todayprice").text(comma3(price));
    $(".fp-todayprice").text(comma3(price));
  } else {
    $("#fp-todayprice").text("0");
    $(".fp-todayprice").text("0");
    $("#fp-todayprice-row").hide();
  }
}

function priceTomorrow() {
  if ($('input:checkbox[name="is_tomorrow"]').prop("checked")) {
    $("#fp-tomorrowprice-row").show();
    let supply = 0;

    $(".mny").each(function () {
      let v = Number($(this).text().replace(/,/g, ""));
      if (
        $(this).attr("id") == "fp-todayprice" ||
        $(this).attr("id") == "fp-tomorrowprice"
      ) {
      } else {
        supply += v;
      }
    });

    const price = Math.ceil((supply * 0.15 + 1000) / 100) * 100;

    $("#fp-tomorrowprice").text(comma3(price));
    $(".fp-tomorrowprice").text(comma3(price));
  } else {
    $("#fp-tomorrowprice").text("0");
    $(".fp-tomorrowprice").text("0");
    $("#fp-tomorrowprice-row").hide();
  }
}

function priceEmergency() {
  if ($('input:checkbox[name="is_emerprice"]').prop("checked")) {
    $("#fp-emerprice-row").show();

    let supply = 0;

    $(".mny").each(function () {
      let v = Number($(this).text().replace(/,/g, ""));
      if (
        $(this).attr("id") == "fp-todayprice" ||
        $(this).attr("id") == "fp-tomorrowprice" ||
        $(this).attr("id") == "fp-emerprice"
      ) {
      } else {
        supply += v;
      }
    });

    let price = Math.ceil((supply * 0.15 + 1000) / 100) * 100;
    price = Math.max(price, 1000);

    $("#fp-emerprice").text(comma3(price));
    $(".fp-emerprice").text(comma3(price));
  } else {
    $("#fp-emerprice").text("0");
    $(".fp-emerprice").text("0");
    $("#fp-emerprice-row").hide();
  }
}
