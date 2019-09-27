#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const xlsx = require('xlsx');
const program = require('commander');

program
  // .option('-d, --debug', 'output extra debugging')
  // .option('-s, --small', 'small pizza size')
  // .option('-p, --pizza-type <type>', 'flavour of pizza')
  .option('-f, --file <file>', '需要导入的excel文件');

program.parse(process.argv);

// if (program.debug) console.log(program.opts());
// console.log('pizza details:');
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(program.pizzaType);
if (program.file === undefined) {
  console.log('请输入需要导入的excel文件');
}
