const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workloadSchema = new Schema(
  {
    // 姓名
    name: {
      type: String,
      required: true
    },
    // 部门
    dept: {
      type: String,
      required: true
    },
    // 职称
    zhicheng: {
      type: String,
      required: true
    },
    // 年度
    year: {
      type: Number,
      required: true
    },
    // 额定工作量
    eding: {
      type: Number,
      required: true
    },
    // 工作量
    workloads: [
      {
        // 学期
        xueqi: {
          type: String,
          required: true
        },
        // 当量学时
        dangliangxueshi: {
          type: Number,
          required: true
        },
        // 就业指导
        jiuyezhidao: {
          type: Number,
          required: true
        },
        // 社团指导
        shetuanzhidao: {
          type: Number,
          required: true
        },
        // 心理健康
        xinlijiankang: {
          type: Number,
          required: true
        },
        // 公选课
        gongxuanke: {
          type: Number,
          required: true
        },
        // 专升本
        zhuanshengben: {
          type: Number,
          required: true
        },
        // 备注
        comment: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workload', workloadSchema);
