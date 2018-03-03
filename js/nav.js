$(function () {

    $('.module').eq(0).show().siblings('.module').hide();

    remove_or_show_nav_buttons();

    $("#slide").slider({});
});



$("#next_module").click(function () {
    $next_module_tab =  $("li.table-active").next();
    $("li.table-active").attr("class", "app-nav nav-item");
    $next_module_tab.attr("class", "table-active nav-item");

    var index = $next_module_tab.index();
    $('.module').eq(index).show().siblings('.module').hide();


    remove_or_show_nav_buttons();


});



$("#previous_module").click(function () {
    $prev_module =  $("li.table-active").prev();
    $("li.table-active").attr("class", "app-nav nav-item");
    $prev_module.attr("class", "table-active nav-item");

    var index = $prev_module.index();
    $('.module').eq(index).show().siblings('.module').hide();


    remove_or_show_nav_buttons();

});


//Checks to see if at beginning or end of modules, if so, hides the appropriate buttons.
function  remove_or_show_nav_buttons() {

    if( !$("li.table-active").prev('li')[0] ) {
        console.log("doesnt exist");
        $("#previous_module").hide();
    }
    else{
        $("#previous_module").show();
    }
    if(! $("li.table-active").next('li')[0] ) {
        $("#next_module").hide();
    }
    else{
        $("#next_module").show();
    }


}
