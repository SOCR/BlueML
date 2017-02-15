/**
 * Created by jakeclose on 2/14/17.
 */
$("#add_upload_button").click(function () {
    $upload_form = $("<input>");
    $upload_form.attr("type", "file");
    $upload_form.attr("class", "file_num");

    $(".file_upload").append($upload_form);
})