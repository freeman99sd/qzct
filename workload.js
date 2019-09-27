#!/usr/bin/env node
const mongoose = require('mongoose');
// const chalk = require('chalk');
const xlsx = require('xlsx');
const program = require('commander');

const Workload = require('./models/workload');

program
  //   // .option('-d, --debug', 'output extra debugging')
  //   // .option('-s, --small', 'small pizza size')
  //   // .option('-p, --pizza-type <type>', 'flavour of pizza')
  .option('-f, --file <file>', '需要导入的excel文件');

program.parse(process.argv);

// // if (program.debug) console.log(program.opts());
// // console.log('pizza details:');
// // if (program.small) console.log('- small pizza size');
// // if (program.pizzaType) console.log(program.pizzaType);
// if (program.file === undefined) {
//   console.log('请输入需要导入的excel文件');
// }
let currentRow;

mongoose
  .connect('mongodb://localhost:27017/qzct')
  .then(() => {
    const workbook = xlsx.readFile(program.file);
    // const workbook = xlsx.readFile('医学院2018年度教学工作量汇总表.xls');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = xlsx.utils.decode_range(worksheet['!ref']);

    const YEAR = 2018;
    const XUEQI1_START_POSITION = 5;
    const XUEQI2_START_POSITION = 12;
    const XUEQI1_XUEQI2_OFFSET = 7;

    const yearWorkloads = [];

    for (let row = 3; row <= range.e.r; row += 1) {
      currentRow = row;
      const nameCell = worksheet[xlsx.utils.encode_cell({ c: 1, r: row })];
      if (!nameCell) {
        break;
      }
      const name = nameCell.v;
      const dept = worksheet[xlsx.utils.encode_cell({ c: 2, r: row })].v;
      const zhicheng = worksheet[xlsx.utils.encode_cell({ c: 3, r: row })].v;
      // 额定工作量
      const edingCell = worksheet[xlsx.utils.encode_cell({ c: 4, r: row })];
      const eding = edingCell ? edingCell.v : 0;

      const value = {
        name,
        dept,
        zhicheng,
        year: YEAR,
        eding,
        workloads: []
      };
      for (
        let startPosition = XUEQI1_START_POSITION;
        startPosition <= XUEQI2_START_POSITION;
        startPosition += XUEQI1_XUEQI2_OFFSET
      ) {
        // 学期
        const xueqi =
          worksheet[xlsx.utils.encode_cell({ c: startPosition, r: 1 })].v;

        // 当量学时
        const dangliangxueshiCell =
          worksheet[xlsx.utils.encode_cell({ c: startPosition, r: row })];
        const dangliangxueshi = dangliangxueshiCell ? dangliangxueshiCell.v : 0;

        // 就业指导
        const jiuyezhidaoCell =
          worksheet[xlsx.utils.encode_cell({ c: startPosition + 1, r: row })];
        const jiuyezhidao = jiuyezhidaoCell ? jiuyezhidaoCell.v : 0;

        // 社团指导
        const shetuanzhidaoCell =
          worksheet[xlsx.utils.encode_cell({ c: startPosition + 2, r: row })];
        const shetuanzhidao = shetuanzhidaoCell ? shetuanzhidaoCell.v : 0;

        // 心理健康
        const xinlijiankangCell =
          worksheet[xlsx.utils.encode_cell({ c: startPosition + 3, r: row })];
        const xinlijiankang = xinlijiankangCell ? xinlijiankangCell.v : 0;

        // 公选课
        const gongxuankeCell =
          worksheet[xlsx.utils.encode_cell({ c: startPosition + 4, r: row })];
        const gongxuanke = gongxuankeCell ? gongxuankeCell.v : 0;

        // 专升本
        const zhuanshengbenCell =
          worksheet[xlsx.utils.encode_cell({ c: startPosition + 5, r: row })];
        const zhuanshengben = zhuanshengbenCell ? zhuanshengbenCell.v : 0;

        value.workloads.push({
          xueqi,
          dangliangxueshi,
          jiuyezhidao,
          shetuanzhidao,
          xinlijiankang,
          gongxuanke,
          zhuanshengben
        });
        yearWorkloads.push(value);
      }
    }
    console.log(yearWorkloads.length);
    return Workload.insertMany(yearWorkloads);
  })
  .then(() => {})
  .catch(err => {
    console.log(err);
    console.log(`Row ${currentRow} has an error!`);
  })
  .finally(() => {
    process.exit();
  });
