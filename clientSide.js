function togglePopUp() {//done
    if (document.getElementById('popUp').style.display == "none") {
        document.getElementById('popUp').style.display = "inline-block";
    } else {
        document.getElementById('popUp').style.display = "none";
    }

}

function searchArtist(searchInput) {//done
    let table = document.getElementById('mainTable');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    getArtists(searchInput);

}

function deleteArtist(btn) {
    let id = btn.parentNode.parentNode.id;
    let table = document.getElementById('mainTable');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    fetch('/deleteArtist?id=' + id)
        .then(res => res.json())
        .then(function (data) {
            for (let i = 0; i < data.length; i++)
                addArtist(data[i].name, data[i].about, data[i].url, data[i], id);
        })


}


function addArtist(nameArtist, aboutArtist, url, rowId) {   //done
    var tableRef = document.getElementById('mainTable');
    var newRow = tableRef.insertRow();
    newRow.id = rowId;

    // Insert a cell in the row at index 0
    var imgCell = newRow.insertCell(0);
    imgCell.className = "imgTd";
    var infoCell = newRow.insertCell(1);
    infoCell.className = "infoTd"
    var delCell = newRow.insertCell(2);
    delCell.className = "delTd";

    //img cell
    var img = document.createElement('img');
    if(url){
        img.src = url;
    }
    img.width = "82"
    img.alt = "Artist Picture"
    // img.setAttribute(height, "86");  
    img.height = "86"

    imgCell.appendChild(img);

    //info cell
    var divCon = document.createElement('div');
    divCon.className = "tdDiv";
    infoCell.appendChild(divCon);

    //h3 in divCon
    var nameH3 = document.createElement('h3');
    let nameText = document.createTextNode(nameArtist);
    nameH3.appendChild(nameText);
    divCon.appendChild(nameH3);

    //p in divCon
    var aboutP = document.createElement('p');
    let aboutText = document.createTextNode(aboutArtist);
    aboutP.appendChild(aboutText);
    divCon.appendChild(aboutP);

    //del button
    var delB = document.createElement('button');
    delB.type = "button";
    delB.innerText = "Delete";
    delB.className = "deleteBtn"
    delCell.appendChild(delB);

    delB.addEventListener('click', function (e) {

        deleteArtist(this);    
    
      });


}

function getArtists(str) {//done
    if (str){
        fetch('/getArtists?name=' + str)
        .then(res => res.json())
        .then(function (data) {
            for (let i = 0; i < data.length; i++)
                addArtist(data[i].name, data[i].about, data[i].url, data[i].id);
        })
        .catch(err => console.log(err));
    }
    
}




