// Show only specific layout and hide others
function showOnly(imgLayoutNum)
{
    for (var i = 1; i < imgLayoutNum; ++i) {
        $('#img'.concat(i).concat('-layout')).hide();
    }

    for (var j = imgLayoutNum+1; j < 7 ; ++j) {
        $('#img'.concat(j).concat('-layout')).hide();
    }

    $('#img'.concat(imgLayoutNum).concat('-layout')).show();
}

// Check if one of the radio buttons per row is checked
// Return the row numbers which have not been checked
function checkForms(imgLayoutNum, numTags)
{
    var uncheckedRows = [];
    for (var i = 1; i <= numTags; i++) {
        var baseStr = '#img'.concat(imgLayoutNum).concat('-option-').concat(i);
        var firstChecked = $(baseStr.concat('-1')).is(':checked');
        var secondChecked = $(baseStr.concat('-2')).is(':checked');

        // XOR vals
        var oneChecked = firstChecked ? !secondChecked : secondChecked;
        
        if (!oneChecked) {
            uncheckedRows.push(i);
        }
    }
    return uncheckedRows;
}

function infoInvalidSelection() {
    alert("Please make a selection for every tag!");
}

function nextButtonLogic(imgLayoutNum, numTags) {

    var numPics = 5; // magic number...
    var uncheckedRows = checkForms(imgLayoutNum, numTags);

    if (uncheckedRows.length !== 0) {
        infoInvalidSelection();
    } else if (imgLayoutNum === numPics) {
        postSelectedValues(imgLayoutNum, numTags);
    } else {
        postSelectedValues(imgLayoutNum, numTags);
        showOnly(imgLayoutNum+1);
    }
}

function grabSelection(imgLayoutNum, tagNum)
{
    var goodBtnID = '#img'.concat(imgLayoutNum).concat('-option-').concat(tagNum).concat('-1');
    if ($(goodBtnID).is(':checked')) {
        return 'Good';
    }

    return 'Bad';
}

function postSelectedValues(imgLayoutNum, numTags) {
    data = [];
    tagnames = ["Airplane", "Ship", "Car", "Vehicle", "Sport"];
    for (var i = 1; i <= numTags; i++) {
        var obj = {};
        obj[tagnames[i-1]] = grabSelection(imgLayoutNum, i);
        data.push(obj);
    }
    
    $.ajax({
        url: 'process.php',
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        dataType:'json'
    });
}