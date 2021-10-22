function addWarehouse(e){
    console.log("Inside addWahreouse: smallCompaniesScript");
    const xhr = new XMLHttpRequest();

    const warehouseName = document.getElementById("warehouseName").value;
    const warehouseLoad = document.getElementById("warehouseLoad").value;

    console.log(warehouseName);
    console.log(warehouseLoad);

    let data = {};
    data.warehouseName = warehouseName;
    data.maxLoad = warehouseLoad;

    let jsonData = JSON.stringify(data);

    xhr.onload = function() {
        
        if (xhr.status === 200 & xhr.readyState === 4) {
            
            //Following code to go back to the webpage without creating a new company
            const xhrReload = new XMLHttpRequest();
            xhrReload.open('GET', `/`);
            xhrReload.send();
            
            location.reload();
        }
    }
    xhr.open('POST', `/warehouse/${e.target.value}`);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(jsonData);
}

function cancelWarehouseForm(e){
    //console.log(e);
    //console.log(e.target.parentNode.parentNode.id);
    //const warehouseForm = document.querySelector(e.target.getElementById());
    const warehouseDiv = document.getElementById(e.target.parentNode.parentNode.id);
    const itemForm = document.getElementById('addWarehouseForm');
    
    //console.log(warehouseDiv);
    warehouseDiv.removeChild(itemForm);
}

function addWarehouseForm(e){

    const div = e.target.parentNode;
    //console.log(div);
    console.log("Inside addWarehouseForm!");

    //creating a Form for adding a warehouse
    const div2 = document.createElement('div');
    div2.id = "addWarehouseForm";
    div2.className = "addWarehouseForm";
    div2.method="POST";

    //creating a label for warehouse name
    const label1 = document.createElement('label');
    label1.innerText = "Warehouse name:";

    //creating an input for warehouse name
    const input1 = document.createElement('input');
    input1.type = "text";
    input1.id = "warehouseName"

    //creating a label for warehouse load
    const label2 = document.createElement('label');
    label2.innerText = "Max Capacity:";

    //creating an input for warehouse load
    const input2 = document.createElement('input');
    input2.type = "number";
    input2.id = "warehouseLoad"

    const br = document.createElement('br');

    const addButton = document.createElement('button');
    addButton.innerText = "Add Warehouse";
    addButton.value = e.target.value;
    addButton.onclick = addWarehouse;

    const cancelButton = document.createElement('button');
    cancelButton.innerText = "Cancel";
    cancelButton.onclick = cancelWarehouseForm;


    div2.append(label1);
    div2.append(input1);
    div2.append(br);
    div2.append(label2);
    div2.append(input2);
    div2.append(addButton);
    div2.append(cancelButton);
    div.append(div2);
}

function deleteWarehouseItem(e){
    //value of button
    console.log(e.target.value);

    //id of button -> td -> tr -> tbody -> table
    console.log(e.target.parentNode.parentNode.parentNode.parentNode.id);

    // button -> td -> tr
    const row = e.target.parentNode.parentNode;

    console.log(row.firstChild.textContent);

    //id of button -> td -> tr -> tbody -> table
    const company = e.target.parentNode.parentNode.parentNode.parentNode.id;

    //value of button
    const warehouse = e.target.value;
    const item = row.firstChild.textContent;

    const xhr = new XMLHttpRequest();

    //const warehouseName = document.getElementById("warehouseName").value;
    //const warehouseLoad = document.getElementById("warehouseLoad").value;

    //console.log(warehouseName);
    //console.log(warehouseLoad);

    let data = {};
    //data.name = company;
    data.warehouseName = warehouse;
    data.itemName = item;

    let jsonData = JSON.stringify(data);
    
    xhr.onload = function() {
        //console.log(JSON.parse(xhr.response));
        if (xhr.status === 200) {
            //button -> td -> tr -> tbody 
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        }
    }

    xhr.open('DELETE', `/item/${company}`);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(jsonData);
}

function deleteWarehouse(e){
    console.log('Inside deleteWarehouse function');
    console.log(e.target.parentNode.parentNode.parentNode.id);
    console.log(e.target.value);

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        
        if (xhr.status === 200 & xhr.readyState === 4) {
            
            //Following code to go back to the webpage
            const xhrReload = new XMLHttpRequest();
            xhrReload.open('GET', `/`);
            xhrReload.send();
            
            location.reload();
        }
    }

    xhr.open('DELETE', `/warehouse/${e.target.parentNode.parentNode.parentNode.id}&${e.target.value}`);
    //xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send();
}

function getWarehouses(){
    //set header to company name
    console.log(window.location.href);
    const companyHeader = document.getElementById('companyName');
    const companyString = window.location.href.split('\/')[4].replace('%20',' ');
    //console.log(companyString[4]);
    companyHeader.innerText = companyString;

    
}

window.addEventListener('DOMContentLoaded', () => {
    //setUpCompanyForm();
    getWarehouses();
});