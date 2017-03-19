/**
 * Created by Zixin on 3/9/17.
 */

document.getElementsByClassName('tablinks')[0].click()


function openTab(evt, fileName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(fileName).style.display = "block";
    evt.currentTarget.className += " active";
}

/**
 * Created by Zixin on 3/9/17.
 */
