/**
 * Created by jakeclose on 2/14/17.
 */
 var new_file_row_number =  $('#file_upload_table tr').length - 1;
$(function () {
    


    $("#add_another_upload_button").click(function () {
        if( $('input[type="file"]').val() !== '') {
            add_upload_row();
        }
        console.log("no upload")
    });
   // check_for_select_file();

   //input[type="file"]
   //console.log("checking fileNameToChange")
   //console.log(fileNameToChange);
   //update_file_name_after_file_selected(fileNameToChange);
     $('#file_upload_button_' + new_file_row_number).change(function(e){
        console.log("file selected");
        var fileName = e.target.files[0].name;

      //  alert('The file "' + fileName +  '" has been selected.');
      console.log("filename" + fileName);
        $(".file_upload tr *:nth-child(3)").show();
        $(".file_upload tr td:nth-child(3)").text(fileName);
        $(".file_upload tr *:nth-child(4)").show();


        $('#add_another_upload_button').attr("disabled", false);
       

    });




});

function update_file_name_after_file_selected(new_file_row_number) {
    console.log("changing");
    console.log(new_file_row_number);
     $('#file_upload_button_' + new_file_row_number).change(function(e){
        console.log("file selected");
        var fileName = e.target.files[0].name;

      //  alert('The file "' + fileName +  '" has been selected.');
      console.log("filename" + fileName);
        $(".file_upload tr *:nth-child(3)").show();
        $(".file_upload tr td:nth-child(3)").text(fileName);
        $(".file_upload tr *:nth-child(4)").show();


        $('#add_another_upload_button').attr("disabled", false);


    });
}




function add_upload_row() {
     new_file_row_number +=1;
    var currentFile_Num =  $('#file_upload_table tr').length;

    console.log(currentFile_Num);

    $deleteBTN = '<button type= "button" class="btn btn-default btn-sm" id = "delete_file_upload" onclick="deletetr(this)">  <span class="glyphicon glyphicon-minus"></span> Remove  </button>';

    $("#file_upload_table").append('<tr><td>' + currentFile_Num  + '</td><td><input type="file" name="file" class = "file_upload_button_' + currentFile_Num  + '"> </td><td> </td> <td>' + $deleteBTN + ' </td></tr>');
    $(".file_upload tr *:nth-child(3)").show();
    $(".file_upload tr *:nth-child(4)").show();

    
}

function deletetr(obj) {
    $(obj).parents("tr").remove();
}










