$(function () {
    remove_or_show_nav_buttons();



});











$("#next_module").click(function () {
    $next_module_tab =  $("li.active").next();
    $("li.active").removeClass("active");
    $next_module_tab.attr("class", "active");



    $next_module_page =  $("li.module").next();
    $("li.module").css("visibility","hidden");
    $("li.module").removeClass("module");
    $next_module_page.attr("class", "module");
    $next_module_page.css("visibility","visible");


    remove_or_show_nav_buttons()


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

    remove_or_show_nav_buttons()

});


//Checks to see if at beginning or end of modules, if so, hides the appropriate buttons.
function  remove_or_show_nav_buttons() {

    if( !$("li.active").prev('li')[0] ) {
        console.log("doesnt exist");
        $("#previous_module").hide();
    }
    else{
        $("#previous_module").show()
    }
    if(! $("li.active").next('li')[0] ) {
        $("#next_module").hide();
    }
    else{
        $("#next_module").show();
    }


}