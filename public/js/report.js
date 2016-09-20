var vm = avalon.define({
    $id: "report",
    cnv: {},
    cnvLen: 0,
    snv: {},
    snvLen: 0,
    variants: {},
    variantsTables: [],
    conclusion: {},
    tableChange: undefined,
    showConclusion: false,
    report: {
        companyInfo: {},
        reportInfo: {
            sampleInformation: {},
            diseasePhenotype: {},
            sequencingAnalysis: {},
            analysisResult: {},
        },
        references: [],
    },

    init: function () {
        $.ajax({
            type : "get",
            async:false,
            url : "http://127.0.0.1:4000/api/1/report/123",
            dataType : "jsonp",
            jsonpCallback:"callBack",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(json){
                vm.report = json;
            },
            error:function(){
                console.info('fail');
            }
        });
    },

    // 添加select variants table
    addVariantsTable: function() {
        if (variantsTables.length < variants.length) {
            variantsTables.push(variants);
            vm.variantsTables = variantsTables;
            initJson();
        }
    },

    // 移除select variants table
    removeVariantsTable: function($index) {
        if (variantsTables.length > 1) {
            var remove = confirm("移除表格的同时也会移除表格对应的所选结论，确认移除么？");
            if (remove) {

                // 移除所选表格
                variantsTables.splice($index, 1);
                vm.variantsTables = variantsTables;
                initJson();

                //移除未确认的结论
                var data = snv;

                for (var key in data) {
                    var keyList = key.split('-');
                    if (keyList[0] == $index) {
                        delete data[key];
                        continue;
                    }
                }
                vm.snv = data;
                vm.snvLen = JSON.stringify(data).length;
            } else {
                return;
            }
        }
    },

    // 改变tables选项时触发
    changeVariant: function($index, $event) {
        var elValue = $event.currentTarget.value;
        var valueList = elValue.split('-');

        // 判断当前表格第几个被选中
        var tableIndex = valueList[0];
        var variantIndex = valueList[1];

        var i,
            currentTable = variantsTables[tableIndex],
            variantLen = currentTable.length;

        for (i = 0 ; i < variantLen; i++) {
            var currentItem = currentTable[i];

            if (i == variantIndex) {
                currentItem.isShow = true;
            } else {
                currentItem.isShow = false;
            }
        }

        vm.variantsTables = variantsTables;
    },

    // 展示是否展示相应表格
    showItem: function(item) {
        if (item.isShow == 'true' || (typeof item.isShow == 'boolean' && item.isShow)) {
            return true;
        } else {
            return false;
        }
    },

    // 操作cnv snv决定结论如何展示
    operationItem: function(item, $index, type) {
        item.seleted = !item.seleted;
        var data = snv;
        if (item.seleted) {
            data[$index] = {
                disease_description: item.disease_description,
                disease_inheritance_mode: item.disease_inheritance_mode,
                gene_description: item.gene_description,
                mutation_description: item.mutation_description,
                disease_management: item.disease_management,
            };
        } else {
            delete data[$index];
        }

        vm.snv = data;
        vm.snvLen = JSON.stringify(data).length;
    },

    // 所选结论选择
    selectedConclusion: function(item, type, $index) {
        item.seleted = !item.seleted;
        var key = type + $index;
        if (item.seleted) {
            conclusion[key] = item;
        } else {
            delete conclusion[key];
        }
        vm.conclusion = conclusion
    },

    // 确认所选结论
    confirmConclusion: function() {
        vm.showConclusion = true;
    }
});

var snv = {};
var cnv = {};
var conclusion = {};
// vm.init();

var report = {
    "title": "遗传测序分析报告",
    "reprotNumber": "PUSHC-20160728-01",
    "reportCompany": "北京优乐复生科技有限责任公司",
    "reportDate": "2016 年8 月25 日",
    "companyInfo": {
        "name": "北京优乐复生科技有限责任公司",
        "contact": [
            "张翼zy@eulertechnology.com",
            "赵欣zhaoxin@eulertechnology.com"
        ],
        "contactNumber": [
            "13922410099 (张翼)",
            "18610080763 (赵欣)"
        ],
        "contactAddress": "北京市昌平区中关村生命科学园生命园路8 号北大医疗产业园区11 号楼4 层"
    },
    "reportInfo": {
        "sampleInformation": {
            "family": "WGC060707D家系",
            "sex": "男",
            "age": "25",
            "relation": "test",
            "type": "WGS",
            "inspectionAgency": "北京大学第三医院",
            "inspectionPersonnel": "王小竹",
            "inspectionDate": "2016/7/12",
            "number": "001"
        },
        "diseasePhenotype": {
            "proband": "WGC060707D， 并指，多指",
            "diseased": "WGC061554D，并指",
            "maternal": "WGC061555D",
            "paternal": "WGC061554D,可能携带并指兼多指突变"
        },
        "sequencingAnalysis": {
            "detectionMethod": "全基因组测序数据分析",
            "analysis": "基因组测序原始数据经比对分析（bwa-mem/discovardenovo/freebayes）后取SNV 及SV 数据。CNV 数据使用EulerCNV 及CNVnator 综合判断。SNV 数据经in house cohort,dbSNP138 及1000G_OMNI2.5 注释携带率，使用snpEff 及in house 深度神经网络注释功能。剪切位点预测使用in house C++/R 深度神经网络模型。CNV/SV 数据经inhouse cohort, 1000G 及公开CNV 数据库数据过滤携带率，使用Langya 注释。信号转导通路分析使用in house R/Python/Perl package。OMIM/Monarch/exAc 数据库分析使用in house Perl/R API。表型基因型相关神经网络分析使用Langya/Marshes。"
        },
        "analysisResult": {
            "quality":"数据质量合格。",
            "general":"被检测人员SNP 分布率正常。有亲缘关系。",
            "variants": [
                {
                    "isShow": "true",
                    "description": "表一，优先级最高",
                    "variant": [
                        {
                            "gene": "一一一一一一一ABCG8",
                            "chromosomalLocation": "chr2:44079831",
                            "mutationInfo": "NM_022437:exon6",
                            "HGVScDNA": "",
                            "HGVSProtein": "",
                            "frequency": "",
                            "zygoteType": "HET",
                            "diseaseName": "Sitosterolemia",
                            "geneticModel": "AR",
                            "imgList": [
                                "./img/bnner1.jpg",
                                "./img/bnner1.jpg"
                            ],
                            "disease_description": "c手足裂畸形(Split-Hand/Foot Malformation, SHFM)是一种严重影响患者惊喜活动的先天性肢端畸形。",
                            "disease_inheritance_mode": "常染色体显性",
                            "gene_description": "成纤维细胞生长因子受体3(fibroblast growth factor receptor 3, FGFR3)基因",
                            "mutation_description": "经分析，在被检测人基因组中检测到父源10q24.32 基因组扩增。该突变OMIM 报道致splithand/foot malformation（SHFM3）（OMIM #：246560）。另外，在被检测人基因组中检测到FGFR3 罕见突变Thr452Met。该突变在东亚人群中及in house 数据库中占比约1/1000。考虑digenic致病，以10q24.32 区域重复扩增突变为主。",
                            "disease_management": "无"
                        }
                    ]
                },
                {
                    "isShow": "false",
                    "description": "表二，优先级中等",
                    "variant": [
                        {
                            "gene": "二二二二二二二二ABCG8",
                            "chromosomalLocation": "chr2:44079831",
                            "mutationInfo": "NM_022437:exon6",
                            "HGVScDNA": "",
                            "HGVSProtein": "",
                            "frequency": "",
                            "zygoteType": "HET",
                            "diseaseName": "Sitosterolemia",
                            "geneticModel": "AR",
                            "imgList": [
                                "./img/bnner1.jpg",
                                "./img/bnner1.jpg"
                            ],
                            "disease_description": "c手足裂畸形(Split-Hand/Foot Malformation, SHFM)是一种严重影响患者惊喜活动的先天性肢端畸形。",
                            "disease_inheritance_mode": "常染色体显性",
                            "gene_description": "成纤维细胞生长因子受体3(fibroblast growth factor receptor 3, FGFR3)基因",
                            "mutation_description": "经分析，在被检测人基因组中检测到父源10q24.32 基因组扩增。该突变OMIM 报道致splithand/foot malformation（SHFM3）（OMIM #：246560）。另外，在被检测人基因组中检测到FGFR3 罕见突变Thr452Met。该突变在东亚人群中及in house 数据库中占比约1/1000。考虑digenic致病，以10q24.32 区域重复扩增突变为主。",
                            "disease_management": "无"
                        }
                    ]
                },

                {
                    "isShow": "false",
                    "description": "表3，优先级中等",
                    "variant": [
                        {
                            "gene": "三三三三三三三三三三三三三三ABCG8",
                            "chromosomalLocation": "chr2:44079831",
                            "mutationInfo": "NM_022437:exon6",
                            "HGVScDNA": "",
                            "HGVSProtein": "",
                            "frequency": "",
                            "zygoteType": "HET",
                            "diseaseName": "Sitosterolemia",
                            "geneticModel": "AR",
                            "imgList": [
                                "./img/bnner1.jpg",
                                "./img/bnner1.jpg"
                            ],
                            "disease_description": "c手足裂畸形(Split-Hand/Foot Malformation, SHFM)是一种严重影响患者惊喜活动的先天性肢端畸形。",
                            "disease_inheritance_mode": "常染色体显性",
                            "gene_description": "成纤维细胞生长因子受体3(fibroblast growth factor receptor 3, FGFR3)基因",
                            "mutation_description": "经分析，在被检测人基因组中检测到父源10q24.32 基因组扩增。该突变OMIM 报道致splithand/foot malformation（SHFM3）（OMIM #：246560）。另外，在被检测人基因组中检测到FGFR3 罕见突变Thr452Met。该突变在东亚人群中及in house 数据库中占比约1/1000。考虑digenic致病，以10q24.32 区域重复扩增突变为主。",
                            "disease_management": "无"
                        }
                    ]
                },
                {
                    "isShow": "false",
                    "description": "表4，优先级中等",
                    "variant": [
                        {
                            "gene": "四四四四四四四四四四四四四四四四四ABCG8",
                            "chromosomalLocation": "chr2:44079831",
                            "mutationInfo": "NM_022437:exon6",
                            "HGVScDNA": "",
                            "HGVSProtein": "",
                            "frequency": "",
                            "zygoteType": "HET",
                            "diseaseName": "Sitosterolemia",
                            "geneticModel": "AR",
                            "imgList": [
                                "./img/bnner1.jpg",
                                "./img/bnner1.jpg"
                            ],
                            "disease_description": "c手足裂畸形(Split-Hand/Foot Malformation, SHFM)是一种严重影响患者惊喜活动的先天性肢端畸形。",
                            "disease_inheritance_mode": "常染色体显性",
                            "gene_description": "成纤维细胞生长因子受体3(fibroblast growth factor receptor 3, FGFR3)基因",
                            "mutation_description": "经分析，在被检测人基因组中检测到父源10q24.32 基因组扩增。该突变OMIM 报道致splithand/foot malformation（SHFM3）（OMIM #：246560）。另外，在被检测人基因组中检测到FGFR3 罕见突变Thr452Met。该突变在东亚人群中及in house 数据库中占比约1/1000。考虑digenic致病，以10q24.32 区域重复扩增突变为主。",
                            "disease_management": "无"
                        }
                    ]
                }
            ],
            "othercomment":"被检测人员分析未见其余可能致病变异。"
        },
        "conclusion": {},
        "references": ["略"],
        "statement": "本报告只对送检样本负责。受限于科学发展的局限，本报告不能排除被检测人患其它类型疾病的可能性。本中心对以上检测结果保留最终解释权,如有疑义,请在收到结果后的7 个工作日内与我们联系。以上结论均为实验室检测数据,仅用于突变检测之目的,不代表最终诊断结果,仅供临床参考。数据解读规则参考美国医学遗传学和基因组学学院(American College of Medical Genetics and Genomics,ACMG)相关指南。变异命名参照HGVS 建议的规则给出(http://www.hgvs.org/mutnomen/)。"
    }
};

var variants = [];

var variantsTables = [];

var selectVariantsTables = [];

processReportData(report);

vm.report = report;


initJson();


// init clear json
function initJson() {

    variants = JSON.parse(JSON.stringify(vm.$model.variants));

    variantsTables = JSON.parse(JSON.stringify(vm.$model.variantsTables));
}

// 初始化返回数据
function processReportData (response) {

    report = response || report;

    variants = report.reportInfo.analysisResult.variants;

    // 赋值表项数据
    vm.variants = variants;

    // 赋值可选择表数据
    variantsTables.push(variants);

    // 初始化当前选中
    selectVariantsTables.push(0);

    vm.variantsTables = variantsTables;
}
