$(window).load(function() {

    // 选中的栏目样式（针对1级目录）
    var menus = {
        index: ['index'],
        about: ['about'],
        contact: ['contact'],
        cases: ['case-nervous-item','case-immune-item','case-cardiovascular-item','case-metabolic-item','case-multisystem-item'],
        technology_service: ['service-exome-sequencing', 'service-target-capture-sequencing', 'service-data-analysis-sequencing', 'service-whole-genome-sequencing'],
        disease_diagnosing: ['diagnosing'],
        disease_screening: ['screening'],
        outreach: ['invite']
    };

    var path = window.location.pathname;
    var pathName = path.substring(1, path.length - 5);

    var selectorName;

    for (var key in menus) {
        if (selectorName) {
            break;
        }
        var value = menus[key];
        for (var i = 0, len = value.length; i < len; i++) {
            if (pathName === value[i]) {
                selectorName = key;
                break;
            }
        }
    }

    // 判断当前是否为手机访问
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isIPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1; //是否为iPhone或者QQHD浏览器
    var isMobile = isAndroid || isIPhone;



    if (isMobile) {
        $('#mobile_' + selectorName).addClass('active');
    } else {
        $('#pc_' + selectorName).addClass('actived');
    }




    // pc 已计算过3级菜单的left
    var calculated = {};

    $('#menu-panel').on('mouseover', function(event) {

        var target = event.target || event.srcElement,
            $target = $(target);


        // 是二级菜单
        if ($target.hasClass('submenu-title')) {

            var offset = $target.offset(),
                key = offset.top + 'key' + offset.left;

            // 未曾计算过三级相应位置

            if (!calculated[key]) {

                var menuSubmenu = $target.closest('.menu-submenu');

                var menuTarget = $target.next('.menu-target')

                var $left = $(menuSubmenu).width();

                $(menuTarget).css("left", $left);

                $(menuTarget).css("top", target.offsetTop);

                calculated[key] = key;
            } else {
                return;
            }
        } else {
            return;
        }
    });

    // mobile 已计算过点击的菜单
    var mobileCalculated = {};

    $('#mobile-nav').on('click', function(event) {
        var target = event.target || event.srcElement,
            $target = $(target);

        // 二级手机目录
        if ($target.hasClass('mobile-submenu-title')) {

            var offset = $target.offset(),
                key = offset.top + 'key' + offset.left;

            var mobileMenuContent = $target.next('.mobile-menu-content');
            var iconContent = $target.children('i');

            var $iconContent = $(iconContent);
            var $mobileMenuContent = $(mobileMenuContent);


            if (!mobileCalculated[key]) {

                $iconContent.removeClass('mdi-content-add').addClass('mdi-content-remove');
                $mobileMenuContent.show();
                mobileCalculated[key] = key;

            } else {
                $iconContent.removeClass('mdi-content-remove').addClass('mdi-content-add');
                $mobileMenuContent.hide();
                delete mobileCalculated[key];
            }

        } else {
            return;
        }
    });
});
