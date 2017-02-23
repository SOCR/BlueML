/**
 * Created by jakeclose on 2/14/17.
 */
$(function () {
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


        $('#add_another_upload_button').attr("disabled", false);



    });

    $('[data-toggle="tooltip"]').tooltip();



});






function add_upload_row() {
    var currentFile_Num =  $('#file_upload_table tr').length;
    console.log(currentFile_Num);

    $deleteBTN = '<button type= "button" class="btn btn-default btn-sm" id = "delete_file_upload" onclick="deletetr(this)">  <span class="glyphicon glyphicon-minus"></span> Remove  </button>';

    console.log($deleteBTN);
    $("#file_upload_table").append('<tr><td>' + currentFile_Num  + '</td><td><input type="file" name="file" id = "file_upload_button"> </td><td> </td> <td>' + $deleteBTN + ' </td></tr>');
    $(".file_upload tr *:nth-child(3)").show();
    $(".file_upload tr *:nth-child(4)").show();

}

function deletetr(obj) {
    $(obj).parents("tr").remove();
}










