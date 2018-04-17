var nextCount = 0;

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

    update_progress_bar();
    remove_or_show_nav_buttons();

    nextCount += 1;
    $("nextCount").innerHTML = nextCount;
});

$("#next_module").mouseover(function() {
    if ($('#file_upload_button').val() == '') {
	if(nextCount == 1) {
		this.style.cursor='not-allowed';
		this.disabled="true";
	}
    }
});


$("#previous_module").click(function () {
    $prev_module =  $("li.table-active").prev();
    $("li.table-active").attr("class", "app-nav nav-item");
    $prev_module.attr("class", "table-active nav-item");

    var index = $prev_module.index();
    $('.module').eq(index).show().siblings('.module').hide();

    update_progress_bar();
    remove_or_show_nav_buttons();

});

$("#add_another_upload_button").click(function () {
        if( $('input[type="file"]').val() !== '') {
            add_upload_row();
        }
        console.log("no upload")
});
// check_for_select_file();


$('input[type="file"]').change(function(e){
     var fileName = e.target.files[0].name;

      //  alert('The file "' + fileName +  '" has been selected.');
      $(".file_upload tr *:nth-child(3)").show();
      $(".file_upload tr :nth-child(3)").text(fileName);
      $(".file_upload tr *:nth-child(4)").show();

      remove_or_show_nav_buttons()
      $('#add_another_upload_button').attr("disabled", false);

      $('next_module').attr("disabled", false);

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
    if($("li.table-active").attr('id') == "load_data_page"){
        //if data uploaded
        if($('input[type="file"]').val() !== ''){
            $("#next_module").show();
        }
        else{
            $("#next_module").hide();
        }
    }
    else if(! $("li.table-active").next('li')[0] ) {
        $("#next_module").hide();
    }
    else{
        $("#next_module").show();
    }
}

function update_progress_bar() {

    var index_here = $("li.table-active").index();
    var new_progress = "" + (index_here + 1) * 25 + "%";
    console.log(new_progress);

    $("#current_progress").html = index_here;
    $('.progress-bar').attr('aria-valuenow', new_progress).css('width',new_progress);

}


