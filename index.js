//json_link = 'data.json';
//
//// Makes an AJAX request and builds the HTML Table out of the returned JSON data
//function buildHtmlTable() {
//    $.getJSON(json_link, function (result_data) {
//        var data = result_data.rows;
//        var columns = addAllColumnHeaders(data);
//
//        for (var i = 0; i < data.length; i++) {
//            var row$ = $('<tr/>');
//            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
//                var cellValue = data[i][columns[colIndex]];
//
//                if (cellValue == null) {
//                    cellValue = "";
//                }
//
//                row$.append($('<td/>').html(cellValue));
//            }
//            $("#excelDataTable").append(row$);
//        }
//    });
//}
//// Adds a header row to the table and returns the set of columns.
//// Need to do union of keys from all records as some records may not contain
//// all records
//function addAllColumnHeaders(myList) {
//    var columnSet = [];
//    var headerTr$ = $('<tr/>');
//
//    for (var i = 0; i < myList.length; i++) {
//        var rowHash = myList[i];
//        for (var key in rowHash) {
//            if ($.inArray(key, columnSet) == -1) {
//                columnSet.push(key);
//                headerTr$.append($('<th/>').html(key));
//            }
//        }
//    }
//    $("#excelDataTable").append(headerTr$);
//
//    return columnSet;
//}