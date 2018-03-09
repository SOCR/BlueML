$(function () {

    $('.module').eq(0).show().siblings('.module').hide();

    remove_or_show_nav_buttons();

    $('#Slide').slider({});
});











$("#next_module").click(function () {
    $next_module_tab =  $("li.active").next();
    $("li.active").removeClass("active");
    $next_module_tab.attr("class", "active");

    var index = $next_module_tab.index();
    $('.module').eq(index).show().siblings('.module').hide();


    remove_or_show_nav_buttons()


});








$("#previous_module").click(function () {
    $prev_module =  $("li.active").prev();
    $("li.active").removeClass("active");
    $prev_module.attr("class", "active");

    var index = $prev_module.index();
    $('.module').eq(index).show().siblings('.module').hide();


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
    //load data page
    if($("li.active").attr('id') == "load_data_page"){
        //if data uploaded
        if($('input[type="file"]').val() !== ''){
            $("#next_module").show();
        }
        else{
            $("#next_module").hide();
        }
    }
    /*//if analysis page
    else if($("li.active").attr('id') == "analysis_page"){
        if($()){
            $("#next_module").hide();
        }
        else{
            $("#next_module").show();
        }
    }*/
    //if nothing next
    else if(! $("li.active").next('li')[0] ) {
        $("#next_module").hide();
    }
    else{
        $("#next_module").show();
    }


}
