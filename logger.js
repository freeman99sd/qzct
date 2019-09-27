#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const chalk = require('chalk');
const xlsx = require('xlsx');

const Workload = require('./models/workload');

mongoose.connect('mongodb://localhost:27017/qzct');
mongoose.connection.on('error', err => {
  console.error(err);
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.',
    chalk.red('✗')
  );
  process.exit();
});

const workbook = xlsx.readFile('医学院2018年度教学工作量汇总表.xls');
console.log(workbook.SheetNames);
const worksheet = workbook.Sheets['医学院'];
const xueqi1 = worksheet.F2.v;
const xueqi2 = worksheet.M2.v;

const range = xlsx.utils.decode_range(worksheet['!ref']);
console.log(range);

const workloads = [];

for (let row = 3; row <= range.e.r; row += 1) {
  let name = worksheet[xlsx.utils.encode_cell({ c: 1, r: row })];
  if (!name) {
    continue;
  }
  name = worksheet[xlsx.utils.encode_cell({ c: 1, r: row })].v;
  const dept = worksheet[xlsx.utils.encode_cell({ c: 2, r: row })].v;
  const zhicheng = worksheet[xlsx.utils.encode_cell({ c: 3, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 3, r: row })].v
    : 0;
  const eding = worksheet[xlsx.utils.encode_cell({ c: 4, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 4, r: row })].v
    : 0;
  const dangliangxueshi = worksheet[xlsx.utils.encode_cell({ c: 5, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 5, r: row })].v
    : 0;
  const jiuyezhidao = worksheet[xlsx.utils.encode_cell({ c: 6, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 6, r: row })].v
    : 0;
  const shetuanzhidao = worksheet[xlsx.utils.encode_cell({ c: 7, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 7, r: row })].v
    : 0;
  const xinlijiankang = worksheet[xlsx.utils.encode_cell({ c: 8, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 8, r: row })].v
    : 0;
  const gongxuanke = worksheet[xlsx.utils.encode_cell({ c: 9, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 9, r: row })].v
    : 0;
  const zhuanshengben = worksheet[xlsx.utils.encode_cell({ c: 10, r: row })]
    ? worksheet[xlsx.utils.encode_cell({ c: 10, r: row })].v
    : 0;
  const value = {
    xueqi: xueqi1,
    name,
    dept,
    zhicheng,
    eding,
    workload: {
      dangliangxueshi,
      jiuyezhidao,
      shetuanzhidao,
      xinlijiankang,
      gongxuanke,
      zhuanshengben
    }
  };
  console.log(value);
  workloads.push(value);
}

Workload.insertMany(workloads)
  .then(docs => {})
  .catch(err => {
    console.log(err);
  });

// const program = require('commander');

// program
//   // .option('-d, --debug', 'output extra debugging')
//   // .option('-s, --small', 'small pizza size')
//   // .option('-p, --pizza-type <type>', 'flavour of pizza')
//   .option('-f, --file <file>', '需要导入的excel文件');

// program.parse(process.argv);

// // if (program.debug) console.log(program.opts());
// // console.log('pizza details:');
// // if (program.small) console.log('- small pizza size');
// // if (program.pizzaType) console.log(program.pizzaType);
// if (program.file === undefined) {
//   console.log('请输入需要导入的excel文件');
// }
