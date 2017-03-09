/**
 * Created by jakeclose on 2/14/17.
 */
 var current_row_num =  $('#file_upload_table tr').length - 1;
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
     $('#file_upload_button_' + current_row_num).change(function(e){
        console.log("file selected");
        var fileName = e.target.files[0].name;
      //  alert('The file "' + fileName +  '" has been selected.');
      console.log("filename" + fileName);
        $(".file_upload tr *:nth-child(3)").show();
      //  $(".file_upload tr td:nth-child(3)").text(fileName);
      //  $("#file_upload_table").rows[current_row_num].cellIndex[3].text("test");
         //var x = document.getElementById("file_upload_table").rows[current_row_num].cells[2].firstChild.data;
         var x = document.getElementById("file_upload_table").rows[current_row_num].cells[2];
         fileName = fileName.toString();
         x.innerHTML = fileName;
         console.log("test" + x);
         $(".file_upload tr *:nth-child(4)").show();

        $('#add_another_upload_button').attr("disabled", false);

    });

    $('[data-toggle="tooltip"]').tooltip();


});

function update_file_name_after_file_selected(current_row_num) {
    console.log("changing");
    console.log(current_row_num);
     $('#file_upload_button_' + current_row_num).change(function(e){

        console.log("file selected");
        var fileName = e.target.files[0].name;
        console.log("filename" + fileName);
        $(".file_upload tr *:nth-child(3)").show();
         var file_cell = document.getElementById("file_upload_table").rows[current_row_num].cells[2];
         fileName = fileName.toString();
         file_cell.innerHTML = fileName;
        $(".file_upload tr *:nth-child(4)").show();

        $('#add_another_upload_button').attr("disabled", false);


    });
}



function add_upload_row() {
    current_row_num +=1;
    var currentFile_Num =  $('#file_upload_table tr').length;

    $deleteBTN = '<button type= "button" class="btn btn-default btn-sm" id = "delete_file_upload" onclick="deletetr(this)">  <span class="glyphicon glyphicon-minus"></span> Remove  </button>';

    $("#file_upload_table").append('<tr><td>' + currentFile_Num  + '</td><td><input type="file" name="file" id = "file_upload_button_' + currentFile_Num  + '"> </td><td> </td> <td>' + $deleteBTN + ' </td></tr>');
    $(".file_upload tr *:nth-child(3)").show();
    $(".file_upload tr *:nth-child(4)").show();
    $('#add_another_upload_button').attr("disabled", true);

    update_file_name_after_file_selected(current_row_num);
    
}

function deletetr(obj) {
    var num = $(obj).closest('tr').index() + 1;
    $(obj).parents("tr").remove();
    console.log("deleting" + num);
    current_row_num -=1;
    update_file_num(num);
}





function update_file_num(update_num) {
    console.log("updating file num");
    var table=document.getElementById("file_upload_table");
    var r= update_num;

    while(row=table.rows[r++])
    {
        var c=0;
        cell=row.cells[c].innerHTML -=1;

            // do sth with cell
    }
}



