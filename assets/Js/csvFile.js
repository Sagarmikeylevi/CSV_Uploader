const search = ()=>{
    const filter = document.getElementById('project-search-bar-input').value.toUpperCase();
    const tableRow = document.getElementsByTagName('tr');
    
    for(let i = 1; i <tableRow.length; i++){
        const tableCol = tableRow[i].getElementsByTagName('td');
        var isSame = false;
        for(let j = 0; j <tableCol.length; j++){
            var index = tableCol[j].innerText.toUpperCase().indexOf(filter);
            if(index != -1){
                isSame = true;
            }
        }
        if(isSame == true){
            tableRow[i].style.display = "";
        }else{
            tableRow[i].style.display = "none";
        }
       
    }
    
    
        
    
}