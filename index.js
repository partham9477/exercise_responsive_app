if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(searchElement, fromIndex) {

                  
                var k;

                   // 1. Let o be the result of calling ToObject passing
                   //    the this value as the argument.
                  
                if (this == null) {   
                    throw new TypeError('"this" is null or not defined');  
                }

                  
                var o = Object(this);

                   // 2. Let lenValue be the result of calling the Get
                   //    internal method of o with the argument "length".
                   // 3. Let len be ToUint32(lenValue).
                  
                var len = o.length >>> 0;

                   // 4. If len is 0, return -1.
                  
                if (len === 0) {   
                    return -1;  
                }

                   // 5. If argument fromIndex was passed let n be
                   //    ToInteger(fromIndex); else let n be 0.
                  
                var n = +fromIndex || 0;

                  
                if (Math.abs(n) === Infinity) {   
                    n = 0;  
                }

                   // 6. If n >= len, return -1.
                  
                if (n >= len) {   
                    return -1;  
                }

                   // 7. If n >= 0, then Let k be n.
                   // 8. Else, n<0, Let k be len - abs(n).
                   //    If k is less than 0, then let k be 0.
                  
                k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                   // 9. Repeat, while k < len
                  
                while (k < len) {    // a. Let Pk be ToString(k).
                        //   This is implicit for LHS operands of the in operator
                        // b. Let kPresent be the result of calling the
                        //    HasProperty internal method of o with argument Pk.
                        //   This step can be combined with c
                        // c. If kPresent is true, then
                        //    i.  Let elementK be the result of calling the Get
                        //        internal method of o with the argument ToString(k).
                        //   ii.  Let same be the result of applying the
                        //        Strict Equality Comparison Algorithm to
                        //        searchElement and elementK.
                        //  iii.  If same is true, return k.
                       
                    if (k in o && o[k] === searchElement) {    
                        return k;   
                    }   
                    k++;  
                }  
                return -1; 
            };
        }

function ajax(url, method, callback, params) {   
    var obj;    
    try {      
        obj = new XMLHttpRequest();      
      //  console.log('You are using a modern browser');    
    } catch (e) {      
        try {          
            obj = new ActiveXObject("Msxml2.XMLHTTP");         
       //     console.log('You are using an older browser');     
        } catch (e) {          
            try {         
                obj = new ActiveXObject("Microsoft.XMLHTTP");        
            } catch (e) {            
         //       console.log("Your browser does not support Ajax.");            
                return false;           
            }       
        }     
    }    
    obj.onreadystatechange = function() {     
        if (obj.readyState == 4) {        
            callback(obj);
          //  console.log(obj);     
        }    
    }    
    obj.open(method, url, true);    
    obj.send(params);    
    return obj;
 //   console.log(obj);
}

function fetchdata() {
    ajax('data.json', 'get', function(obj) {               
        emp = obj.responseText;        
    //    console.log(emp);                
        employee = JSON.parse(emp);
    //    console.log(employee);
        //return employee;
        GenerateTable(employee);        
    });
}

function GenerateTable(customers) {

    //Create a HTML Table element.
    var datacol = [];
    var index;

    for (i = 0; i < customers.length; i++) {
        for (index in customers[i]) {
            if (datacol.indexOf(index) === -1)
                datacol.push(index);
        }
    }
    var table = document.getElementById("demoTable");
    table.border = "1";


    //Add the header row.
    var row = table.insertRow(-1);
    row.className = "header";

    for (var i = 0; i < datacol.length; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = datacol[i];
        row.appendChild(headerCell);

      //  console.log(headerCell);
    }

    //Add the data rows.
    for (var i = 0; i < customers.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < datacol.length; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][datacol[j]];
       //     console.log(customers[i][datacol[j]]);
        }
    }

    var dvTable = document.getElementById("demo");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}


//pagination

function Pager(tableName, itemsPerPage) {
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;
    
    this.showRecords = function(from, to) {        
        var rows = document.getElementById(tableName).rows;
        // i starts from 1 to skip table header row
        for (var i = 1; i < rows.length; i++) {
            if (i < from || i > to)  
                rows[i].style.display = 'none';
            else
                rows[i].style.display = '';
        }
    }
    
    this.showPage = function(pageNumber) {
     if (! this.inited) {
      alert("not inited");
      return;
     }
        var oldPageAnchor = document.getElementById('pg-'+this.currentPage); 
        console.log("pg"+this.currentPage);
        //oldPageAnchor.className = 'pg-normal';
        
        this.currentPage = pageNumber;
        var newPageAnchor = document.getElementById('pg'+this.currentPage);
        newPageAnchor.className = 'pg-selected';
        
        var from = (pageNumber - 1) * itemsPerPage + 1;
        var to = from + itemsPerPage - 1;
        this.showRecords(from, to);
    }   
    
    this.prev = function() {
        if (this.currentPage > 1)
            this.showPage(this.currentPage - 1);
    }
    
    this.next = function() {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    }                        
    
    this.init = function() {
        console.log("init function has been called");
        var rows = document.getElementById('demoTable').rows;
        var records = (rows.length - 1); 
        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
        console.log("initiated variable: " + this.inited);
    }
    this.showPageNav = function(pagerName, positionId) {
        console.log("pagerName : "+ pagerName + " "+ "Position :" + positionId)
     if (! this.inited) {
         console.log("reached the if part of showPageNav")
      return;
         
     }
        console.log("outside the if check");
     var element = document.getElementById(positionId);
        console.log(element);
     
     var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> &#171 Prev </span> | ';
        for (var page = 1; page <= this.pages; page++) 
            pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> | ';
        console.log("pg"+page)
        pagerHtml += '<span onclick="'+pagerName+'.next()" class="pg-normal"> Next &#187;</span>';            
        
        element.innerHTML = pagerHtml;
    }
}


     
