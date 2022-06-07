module.exports = {
  menuList: [
    {
      "mfName": "首页",
      "mfCode": "1",
      "mfLinkUrl": "/statistics/home",
      "img": "bank"
    },
    {
      "mfName": "实时统计",
      "mfCode": "2",
      "childMenu": [
        {
          "mfName": "报告检索",
          "mfCode": "21",
          "mfLinkUrl": "/country/realtime/search"
        },
        {
          "mfName": "报告统计",
          "mfCode": "22",
          "mfLinkUrl": "/country/realtime/statistic"
        },
        {
          "mfName": "周汇总",
          "mfCode": "23",
          "mfLinkUrl": "/country/realtime/weeksum"
        }
      ]
    },
    {
      "mfName": "品种分析",
      "mfCode": "3",
      "childMenu": [
        {
          "mfName": "固化分析",
          "mfCode": "31",
          "mfLinkUrl": "/country/home"
        },
        {
          "mfName": "分工管理",
          "mfCode": "32",
          "mfLinkUrl": "/country/home"
        }
      ]
    },
    {
      "mfName": "关注品种",
      "mfCode": "4",
      "mfLinkUrl": "/country/home"
    },
    {
      "mfName": "信号检测",
      "mfCode": "5",
      "mfLinkUrl": "/country/home"
    },
    {
      "mfName": "年度报告",
      "mfCode": "6",
      "childMenu": [
        {
          "mfName": "季度报告",
          "mfCode": "61",
          "mfLinkUrl": "/country/home"
        },
        {
          "mfName": "年度报告",
          "mfCode": "62",
          "mfLinkUrl": "/country/home"
        }
      ]
    },
    {
      "mfName": "数据共享",
      "mfCode": "7",
      "mfLinkUrl": "/country/home"
    }, {
      "mfName": "系统管理",
      "mfCode": "8",
      "mfLinkUrl": "/country/system/tool/statistic"
    }
  ],
  // 系统管理二级菜单
  systemMenuList: [
    {
      "mfName": "分析工具统计",
      "mfCode": "2",
      "img": "bank",
      "childMenu": [
        {
          "mfName": "统计工具配置",
          "mfCode": "21",
          "mfLinkUrl": "/country/system/tool/statistic",
        },
        {
          "mfName": "主动监测模型管理",
          "mfCode": "22",
          "mfLinkUrl": "/country/system/tool/activemonitor",
        },
        {
          "mfName": "预警模型管理",
          "mfCode": "23",
          "mfLinkUrl": "/country/system/tool/earlywarn",
        }
      ]
    },
    {
      "mfName": "组织架构管理",
      "mfCode": "org",
      "img": "bank",
      "childMenu": [
        {
          "mfName": "政府机构管理",
          "mfCode": "org1",
          "mfLinkUrl": "/country/system/organ/govern/list",
        },
        {
          "mfName": "医疗机构管理",
          "mfCode": "org2",
          "mfLinkUrl": "/country/system/organ/medical/list",
        }
      ]
    },
    {
      "mfName": "用户权限管理",
      "mfCode": "3",
      "img": "bank",
      "childMenu": [
        {
          "mfName": "用户管理",
          "mfCode": "31",
          "mfLinkUrl": "/country/system/author/user",
        },
        {
          "mfName": "菜单管理",
          "mfCode": "32",
          "mfLinkUrl": "/country/system/menufun/list",
        },
        {
          "mfName": "常量管理",
          "mfCode": "33",
          "mfLinkUrl": "/country/system/conts/list",
        },
        {
          "mfName": "角色管理",
          "mfCode": "34",
          "mfLinkUrl": "/country/system/role/list",
        }
      ]
    },
  ],
  // 广东中心菜单
  
  provinceMenuList: [
    {
      "mfName": "首页",
      "mfCode": "1",
      "mfLinkUrl": "/statistics/home",
      "img": "bank"
    },
    {
      "mfName": "工作",
      "mfCode": "2",
      "mfLinkUrl": "",
      "img": "bank"
    },
    {
      "mfName": "数据管理",
      "mfCode": "3",
      "mfLinkUrl": "/deliver/adr/list",
      "img": "bank"
    },
    {
      "mfName": "风险管控",
      "mfCode": "4",
      "img": "bank",
      "childMenu": [
        {
          "mfName": "主动监测",
          "mfCode": "41",
          "mfLinkUrl": "/country/home",
          "img": "bank"
        },
        {
          "mfName": "预警及风险信号监测",
          "mfCode": "42",
          "mfLinkUrl": "/country/home",
          "img": "bank"
        },
        {
          "mfName": "报表质量监测",
          "mfCode": "43",
          "mfLinkUrl": "/country/home",
          "img": "bank"
        },
        {
          "mfName": "合理用药PASS智能监测",
          "mfCode": "44",
          "mfLinkUrl": "/country/home",
          "img": "bank"
        }
      ]
    },
    {
      "mfName": "统计",
      "mfCode": "5",
      "mfLinkUrl": "/country/home",
      "img": "bank"
    },
    {
      "mfName": "资料库",
      "mfCode": "6",
      "mfLinkUrl": "/base/expert",
      "img": "bank"
    },
    {
      "mfName": "数据共享",
      "mfCode": "7",
      "mfLinkUrl": "/country/home",
      "img": "bank"
    }, {
      "mfName": "系统管理",
      "mfCode": "8",
      "mfLinkUrl": "/country/system/tool/statistic",
      "img": "bank"
    }
  ],
  // 数据管理二级菜单
  datamanagerMenuList: [
    {
      "mfName": "药品",
      "mfCode": "1",
      "childMenu": [
        {
          "mfName": "个例报告检索",
          "mfCode": "11",
          "mfLinkUrl": "/deliver/adr/list"
        },
        {
          "mfName": "群体报告检索",
          "mfCode": "12",
          "mfLinkUrl": "/datamanager/drug/event"
        },
        {
          "mfName": "定期安全性更新报告检索",
          "mfCode": "13",
          "mfLinkUrl": "/datamanager/drug/psur"
        },
        {
          "mfName": "持有人年度版报告检索",
          "mfCode": "14",
          "mfLinkUrl": "/datamanager/drug/year"
        }
      ]
    },
    {
      "mfName": "疫苗",
      "mfCode": "2",
      "childMenu": [
        {
          "mfName": "AEFI个案报告检索",
          "mfCode": "21",
          "mfLinkUrl": "/country/system/author/user"
        },
        {
          "mfName": "AEFI群体报告检索",
          "mfCode": "22",
          "mfLinkUrl": "/country/system/menufun/list"
        }
      ]
    },
  ],
  //资料库二级菜单
  baseMenuList: [
    {
      "mfName": "业务设置",
      "mfCode": "1",
      "childMenu": [
        {
          "mfName": "专家库信息",
          "mfCode": "12",
          "mfLinkUrl": "/base/expert"
        },
      ]
    },
    {
      "mfName": "药品基础数据",
      "mfCode": "2",
      "childMenu": [
        {
          "mfName": "药品产品信息管理",
          "mfCode": "21",
          "mfLinkUrl": "/base/drug/product/drugProduct"
        },
        {
          "mfName": "药品说明书管理",
          "mfCode": "22",
          "mfLinkUrl": "/base/drug/directions"
        },
        {
          "mfName": "药品分类管理",
          "mfCode": "23",
          "mfLinkUrl": "/base/drug/label/drugClass"
        },
        {
          "mfName": "药品组管理",
          "mfCode": "24",
          "mfLinkUrl": "/base/drug/lable/genericDrug"
        },
        {
          "mfName": "药品成分管理",
          "mfCode": "25",
          "mfLinkUrl": "/base/drug/lable/ingredientGroup"
        },
        {
          "mfName": "药品通用名管理",
          "mfCode": "26",
          "mfLinkUrl": "/base/drug/product/drugStGeneralForm"
        },
        {
          "mfName": "年龄分组管理",
          "mfCode": "27",
          "mfLinkUrl": "/base/drug/agegroup"
        },
        {
          "mfName": "百万人口城市库",
          "mfCode": "28",
          "mfLinkUrl": "/base/drug/other/millionCity"
        },
        {
          "mfName": "标准商品名称管理",
          "mfCode": "29",
          "mfLinkUrl": "/base/drug/product/productStTradeName"
        },
        {
          "mfName": "系统器官信息管理",
          "mfCode": "210",
          "mfLinkUrl": "/base/drug/other/organClass"
        },
        {
          "mfName": "权威资料管理",
          "mfCode": "211",
          "mfLinkUrl": "/base/drug/other/literature"
        },
        {
          "mfName": "药品不良反应信息通报管理",
          "mfCode": "212",
          "mfLinkUrl": "/base/drug/other/notification"
        },
        {
          "mfName": "标准生产厂家管理",
          "mfCode": "213",
          "mfLinkUrl": "/base/drug/product/stFactory"
        },
        {
          "mfName": "商品名称规则库管理",
          "mfCode": "214",
          "mfLinkUrl": "/base/drug/product/productNameRule"
        },
        {
          "mfName": "WHO-ART术语集",
          "mfCode": "215",
          "mfLinkUrl": "/base/whoart"
        },
        {
          "mfName": "MedDRA术语集",
          "mfCode": "216",
          "mfLinkUrl": "/base/meddra"
        },
        {
          "mfName": "ICD术语集",
          "mfCode": "217",
          "mfLinkUrl": "/base/icd"
        },
        {
          "mfName": "医学参考值模板管理",
          "mfCode": "218",
          "mfLinkUrl": "/base/drug/other/modelItems"
        },
        {
          "mfName": "药品已知不良反应信息管理",
          "mfCode": "219",
          "mfLinkUrl": "/base/drug/other/knownInfo"
        },
        {
          "mfName": "标准厂家核对",
          "mfCode": "220",
          "mfLinkUrl": ""
        },
      ]
    },
    {
      "mfName": "基本药物管理",
      "mfCode": "3",
      "childMenu": [
        {
          "mfName": "中成药",
          "mfCode": "31",
          "mfLinkUrl": "/base/drug/basicdrug/zhDrug"
        },
        {
          "mfName": "化药和生物制品",
          "mfCode": "32",
          "mfLinkUrl": "/base/drug/basicdrug/chDrug"
        },
      ]
    },
  ],
}