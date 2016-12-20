// Show only specific layout and hide others
function showOnly(img-layout-num) {
        for var i = 1; i < img-layout-num; ++i)
            $('#img'.concat(i).concat('-layout')).hide();

        $('#img'.concat(img-layout-num).concat('-layout')).show();

        for var i = img-layout-num+1; i < 6 ; ++i)
            $('#img'.concat(i).concat('-layout')).hide();
    }
    
$(document).ready(function () {
    showOnly(1);

    $('#img1-btn').click(function () {
        showOnly(2);
    });
    $('#img2-btn').click(function () {
        showOnly(3);
    });
    $('#img3-btn').click(function () {
        showOnly(4);
    });
    $('#img4-btn').click(function () {
        showOnly(5);
    });
})