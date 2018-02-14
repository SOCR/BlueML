$(function() {
    // Handler for .ready() called.

    $("#next_module").click(function () {

        update_progress_bar();
    });








    $("#previous_module").click(function () {
        update_progress_bar();


    });

    function update_progress_bar() {

        var index_here = $("li.active").index();
        var new_progress = "" + (index_here + 1) * 25 + "%";
        console.log(new_progress);

        $("#current_progress").html = index_here;
        $('.progress-bar').attr('aria-valuenow', new_progress).css('width',new_progress)

    }




});