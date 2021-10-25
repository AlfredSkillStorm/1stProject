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

//function to dynamically set path for adding a warehouse to a specific company
function setUpWarehouseButton(){
    const addWarehouseButton = document.getElementById('addWarehouseButton');
    const companyString = window.location.href.split('\/')[4].replace('%20',' ');
    addWarehouseButton.href = `${companyString}/add`;
}

function deleteWarehouse(e){
    console.log('Inside deleteWarehouse function');

    const companyName = document.getElementById('companyName').textContent;

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        
        if (xhr.status === 200 & xhr.readyState === 4) {
            location.reload();
        }
    }

    xhr.open('DELETE', `/warehouse/${companyName}&${e.target.value}`);
    xhr.send();
}

//url to form dynamic path to adding an item
const myURL = 'http://localhost:8081/item/';

//function to dynamically path to company and warehouse
function addItemModal(e){

    const companyHeader = document.getElementById('companyName');
    const itemForm = document.getElementById('addItemForm');

    console.log(itemForm.action);
    itemForm.action = `${myURL}${companyHeader.textContent}&${e.target.value}`;
    console.log(itemForm.action);
}

function getWarehouses(){
    //set header to company name
    const companyHeader = document.getElementById('companyName');
    const companyString = window.location.href.split('\/')[4].replace('%20',' ');
    companyHeader.innerText = companyString;

    //create req.body and JSON.stringify
    let data = {};
    data.name = companyString;
    const jsonData = JSON.stringify(data);

    //create container to house warehouses
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

                //Max space of warehouse
                let maxQuantity = wr.maxLoad;

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

                //div to show available warehouse space
                const progressContainer = document.createElement('div');
                progressContainer.className = 'progress';

                const itemQuanity = getItemQuantity(wr);

                const progress = document.createElement('div');
                progress.id=`${wr.warehouseName}Quantity`;
                progress.className="progress-bar";
                progress.setAttribute('role','progressbar');
                progress.style.width = `${(itemQuanity/maxQuantity)*100}%`;
                progress.setAttribute('aria-valuemin', 0);
                progress.setAttribute('aria-valuemax', 100);
                progress.textContent = `${itemQuanity}/${maxQuantity}`;
                progressContainer.append(progress);

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

                //call function that builds items table
                const itemsContainer = getItems(wr);

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

                //append individual button and tabContent to holders
                navDiv.append(navButton);
                tabContent.append(progressContainer);
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
    setUpWarehouseButton();
    assignOnClick();
    getWarehouses();
});