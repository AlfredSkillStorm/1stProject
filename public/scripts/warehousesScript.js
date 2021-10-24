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

function setUpWarehouseButton(){
    const addWarehouseButton = document.getElementById('addWarehouseButton');
    const companyString = window.location.href.split('\/')[4].replace('%20',' ');
    addWarehouseButton.href = `${companyString}/add`;
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

    const values = e.target.value.split('&');
    const warehouseName = values[0];
    const itemName = values[1];

    console.log(warehouseName, itemName);

    const companyName = document.getElementById('companyName').textContent;

    console.log(companyName);

    //id of button -> td -> tr -> tbody -> table
    //console.log(e.target.parentNode.parentNode.parentNode.parentNode.id);
    

    // button -> td -> tr
    //const row = e.target.parentNode.parentNode;

    //console.log(row.firstChild.textContent);

    //id of button -> td -> tr -> tbody -> table
    //const company = e.target.parentNode.parentNode.parentNode.parentNode.id;

    //value of button
    //const warehouse = e.target.value;
    //const item = row.firstChild.textContent;

    const xhr = new XMLHttpRequest();

    //const warehouseName = document.getElementById("warehouseName").value;
    //const warehouseLoad = document.getElementById("warehouseLoad").value;

    //console.log(warehouseName);
    //console.log(warehouseLoad);

    //let data = {};
    //data.name = company;
    //data.warehouseName = warehouse;
    //data.itemName = item;

    //let jsonData = JSON.stringify(data);
    
    xhr.onload = function() {
        //console.log(JSON.parse(xhr.response));
        if (xhr.status === 200) {
            //button -> td -> tr -> tbody 
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        }
    }

    xhr.open('DELETE', `/item/${companyName}&${warehouseName}&${itemName}`);
    //xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send();
}

function deleteWarehouse(e){
    console.log('Inside deleteWarehouse function');
    //console.log(e.target.parentNode.parentNode.parentNode.id);
    //console.log(e.target.value);

    const companyName = document.getElementById('companyName').textContent;

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        
        if (xhr.status === 200 & xhr.readyState === 4) {
            
            //Following code to go back to the webpage
            // const xhrReload = new XMLHttpRequest();
            // xhrReload.open('GET', `/`);
            // xhrReload.send();
            
            location.reload();
        }
    }

    xhr.open('DELETE', `/warehouse/${companyName}&${e.target.value}`);
    //xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send();
}


const myURL = 'http://localhost:8081/item/';

function addItemModal(e){

    const companyHeader = document.getElementById('companyName');
    const itemForm = document.getElementById('addItemForm');

    console.log(itemForm.action);
    itemForm.action = `${myURL}${companyHeader.textContent}&${e.target.value}`;
    console.log(itemForm.action);
}

function getWarehouses(){
    
    //console.log(window.location.href);

    //set header to company name
    const companyHeader = document.getElementById('companyName');
    const companyString = window.location.href.split('\/')[4].replace('%20',' ');
    companyHeader.innerText = companyString;

    //create req.body and JSON.stringify
    let data = {};
    data.name = companyString;
    const jsonData = JSON.stringify(data);

    const warehousesContainer = document.getElementById('container');

    //XHR request to middleware
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){

        //grab all warehouses within company
        const warehouses = JSON.parse(xhr.response);

        //create warehouse navigation
        const warehouseNavigation = document.createElement('nav');

        //create individual warehouse content container
        const warehouseTabContent = document.createElement('div');
        warehouseTabContent.className = 'tab-content';
        warehouseTabContent.id = 'nav-tabContent';

        //Create div for nav tabs
        const navDiv = document.createElement('div');
        navDiv.className = 'nav nav-tabs';
        navDiv.id = 'nav-tab';
        navDiv.setAttribute('role','tablist');

        if (xhr.status===200){
            let counter = 0;

            for(wr of warehouses){

                //Name of warehouse
                let textWarehouse = wr.warehouseName;

                //modified name for warehouse
                //Bootstrap attributes do not play well with commas, hence the replace function
                let altTextWarehouse = wr.warehouseName.replace(',','-');
                
                //nav button to display warehouse info items
                const navButton = document.createElement('button');

                //tab content to display items of warehouse
                const tabContent = document.createElement('div');

                //setting first warehouse as active
                if(counter == 0){
                    navButton.className = 'nav-link active';
                    tabContent.className = 'tab-pane fade show active';
                    navButton.setAttribute('aria-controls','true');
                }
                else{
                    navButton.className = 'nav-link';
                    tabContent.className = 'tab-pane fade';
                    navButton.setAttribute('aria-controls','false');
                }

                //setting navButton attributes
                navButton.id =`nav-${altTextWarehouse}-tab`;
                navButton.setAttribute('data-bs-toggle','tab');
                navButton.setAttribute('data-bs-target',`#nav-${altTextWarehouse}`);
                navButton.setAttribute('role','tab');
                navButton.type='button';
                navButton.setAttribute('aria-controls',`nav-${altTextWarehouse}`);
                navButton.textContent = `${textWarehouse}`;
                
                //setting tabContent attributes
                tabContent.id = `nav-${altTextWarehouse}`;
                tabContent.setAttribute('role','tabpanel');
                tabContent.setAttribute('aria-labelledby',`nav-${altTextWarehouse}-tab`);

                //grab items and store them in variable
                const items = wr.items;
                const itemsContainer = document.createElement('table');

                const itemsTableBody = document.createElement('tbody');
                
                //below code to create first row headers
                const firstRow = document.createElement('tr');
                const itemNameHeader = document.createElement('th');
                itemNameHeader.textContent = "Item Name";
                const itemPriceHeader = document.createElement('th');
                itemPriceHeader.textContent = "Price";
                const deleteItem = document.createElement('th');
                deleteItem.textContent = 'Delete';

                if(items.length !== 0){
                    console.log(items);

                    //Appending headers to first row
                    firstRow.append(itemNameHeader);
                    firstRow.append(itemPriceHeader);
                    firstRow.append(deleteItem);
                    
                    for(item of items){
                        //item details initialization
                        const itemDetails = document.createElement('tr');
                        const itemName = document.createElement('td');
                        itemName.textContent = item.itemName;
                        const itemPrice = document.createElement('td');
                        itemPrice.textContent = item.price;

                        //delete button to delete item
                        const deleteButton = document.createElement('td');
                        const deleteAction = document.createElement('button');
                        deleteAction.value = `${wr.warehouseName}&${item.itemName}`;
                        deleteAction.innerText = 'X';
                        deleteAction.onclick = deleteWarehouseItem;

                        //appending
                        deleteButton.append(deleteAction);
                        itemDetails.append(itemName);
                        itemDetails.append(itemPrice);
                        itemDetails.append(deleteButton);
                        itemsTableBody.append(itemDetails);
                    }
                    //itemsContainer.textContent = `There are ${items.length} in the warehouse!`;
                }
                else{
                    itemsContainer.textContent = 'No items to display! Add an item!';
                }

                //button to pull up modal for adding an item;
                const addItemButton = document.createElement('button');
                addItemButton.value = `${textWarehouse}`;
                addItemButton.onclick = addItemModal;
                addItemButton.textContent = 'Add Item';
                addItemButton.className = 'btn btn-primary btn-success';
                addItemButton.setAttribute('data-bs-toggle','modal');
                addItemButton.setAttribute('data-bs-target','#addItemModal');

                //button to delete warehouse
                const deleteButton = document.createElement('button');
                deleteButton.value = textWarehouse;
                deleteButton.textContent = 'DELETE WAREHOUSE';
                deleteButton.onclick = deleteWarehouse
                deleteButton.className = 'btn btn-primary btn-danger';

                //append table elements
                itemsContainer.append(firstRow);
                itemsContainer.append(itemsTableBody);

                //append individual button and tabContent to holders
                navDiv.append(navButton);
                tabContent.append(itemsContainer);
                tabContent.append(addItemButton);
                tabContent.append(deleteButton);
                warehouseTabContent.append(tabContent);
                counter++;
            }

            //append contentHolders to container
            warehouseNavigation.append(navDiv);
            warehousesContainer.append(warehouseNavigation);
            warehousesContainer.append(warehouseTabContent);
        }
        else{
            warehousesContainer.innerText = `${warehouses.error}`;
        }
    }

    console.log(jsonData);
    xhr.open('PUT','/warehouse');
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(jsonData);
}

window.addEventListener('DOMContentLoaded', () => {
    //setUpCompanyForm();
    setUpWarehouseButton();
    getWarehouses();
});