







$("#next_module").click(function () {
    $next_module_tab =  $("li.active").next();
    $("li.active").removeClass("active");
    $next_module_tab.attr("class", "active");




    $next_module_page =  $("li.module").next();
    $("li.module").css("visibility","hidden");
    $("li.module").removeClass("module");
    $next_module_page.attr("class", "module");
    $next_module_page.css("visibility","visible");




});








$("#previous_module").click(function () {
    $prev_module =  $("li.active").prev();
    $("li.active").removeClass("active");
    $prev_module.attr("class", "active");



    $prev_module_page =  $("li.module").prev();
    $("li.module").css("visibility","hidden");
    $("li.module").removeClass("module");
    $prev_module_page.attr("class", "module");
    $prev_module.css("visibility","visible")


});