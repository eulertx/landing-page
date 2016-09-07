// 创建商品说明页对象avalon对象
var vm = avalon.define({
    $id: "service",
    product: {}
});

// 初始化leancloud
function init() {
    // 应用 ID，用来识别应用
    var APP_ID = 'SK9RWaTzy9kh69i1Fbo9sJvc-gzGzoHsz';

    // 应用 Key，用来校验权限（Web 端可以配置安全域名来保护数据安全）
    var APP_KEY = '1V2JugfbH5wYflzSgTpuOA1F';

    // 初始化
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}

// 获取产品说明数据
function getProductData() {
    // 儿童神经系统疾病 的 ID 是 57cd4fed0e3dd90063fe6e02
    var product = AV.Object.createWithoutData('Product', '57cd4fed0e3dd90063fe6e02');

    // 获取当前产品说明对象
    product.fetch().then(function(product){

            productData.name = product.get('name');
            productData.descript = product.get('descript');
            productData.dialogue = product.get('dialogue');
            productData.causesPic = product.get('causesPic');
            productData.testingFlowPic = product.get('testingFlowPic');

            vm.product = productData;

        }, function(error){console.info(error);}
    );

    // 获取当前产品下的所有文章
    var blogsQuery = product.relation('blogs').query();
    blogsQuery.find().then(function (response) {

            var i, currentItem, item,
                len = response.length;

            for (i = 0; i < len; i++) {
                item = {};
                currentItem = response[i];
                item.name = currentItem.get('name');
                item.pic = currentItem.get('pic');
                item.descript = currentItem.get('descript');
                blogs.push(item);
            }
            productData.blogs = blogs;

            vm.product = productData;

        }, function (error) {console.info(error);}
    );

    // 获取当前产品下所有案例
    var casesQuery = product.relation('cases').query();
    casesQuery.find().then(function (response) {

        var i, currentItem, item,
            len = response.length;

        for (i = 0; i < len; i++) {
            item = {};
            currentItem = response[i];
            item.pic = currentItem.get('pic');
            item.descript = currentItem.get('descript');
            cases.push(item);
        }
        productData.cases = cases;

        vm.product = productData;

        }, function (error) {console.info(error);}
    );
}

// 数据缓冲对象
var productData = {};

var blogs = [];
var cases = [];

this.init();
this.getProductData();
