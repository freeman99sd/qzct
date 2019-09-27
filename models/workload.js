const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workloadSchema = new Schema({
  xueqi: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  zhicheng: {
    type: String,
    required: true
  },
  workload: {
    dangliangxueshi: {
      type: Number,
      required: true
    },
    jiuyezhidao: {
      type: Number,
      required: true
    },
    shetuanzhidao: {
      type: Number,
      required: true
    },
    xinlijiankang: {
      type: Number,
      required: true
    },
    gongxuanke: {
      type: Number,
      required: true
    },
    zhuanshengben: {
      type: Number,
      required: true
    },
    comment: {
      type: String
    }
  }
});

module.exports = mongoose.model('Workload', workloadSchema);
