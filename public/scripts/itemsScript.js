function getItems(wr){
    //grab items and store them in variable
    const items = wr.items;
    const itemsContainer = document.createElement('table');
    itemsContainer.className = 'table table-striped';

    const itemsTableBody = document.createElement('tbody');
    
    //below code to create first row headers
    const firstRow = document.createElement('tr');
    const itemNameHeader = document.createElement('th');
    itemNameHeader.textContent = "Item Name";
    const itemPriceHeader = document.createElement('th');
    itemPriceHeader.textContent = "Price";
    const updateHeader = document.createElement('th');
    updateHeader.textContent = "Update";
    const deleteItem = document.createElement('th');
    deleteItem.textContent = 'Delete';

    if(items.length !== 0){
        console.log(items);

        //Appending headers to first row
        firstRow.append(itemNameHeader);
        firstRow.append(itemPriceHeader);
        firstRow.append(updateHeader);
        firstRow.append(deleteItem);
        
        for(item of items){
            //item details initialization
            const itemDetails = document.createElement('tr');
            itemDetails.id = wr.warehouseName+item.itemName;
            const itemName = document.createElement('td');
            itemName.textContent = item.itemName;
            const itemPrice = document.createElement('td');
            itemPrice.textContent = item.price;

            //button to pull up update item modal
            const updateItemCell = document.createElement('td');
            const updateButton = document.createElement('button');
            //const updateIcon = document.createElement('i');
            //updateIcon.className ='bi bi-pencil-square';

            updateButton.value = `${wr.warehouseName}&${item.itemName}`;
            updateButton.type = 'button';
            updateButton.className = 'btn-success';
            updateButton.setAttribute('data-bs-toggle','modal');
            updateButton.setAttribute('data-bs-target','#updateItemModal');
            updateButton.onclick = updateItemModal;
            //updateButton.append(updateIcon);
            updateButton.innerHTML = '<i class="bi bi-pencil-square"></i>';

            //delete button to delete item
            const deleteButton = document.createElement('td');
            const deleteAction = document.createElement('button');
            deleteAction.value = `${wr.warehouseName}&${item.itemName}`;
            deleteAction.type='button';
            deleteAction.className = 'btn-danger';
            deleteAction.innerText = 'X';
            deleteAction.onclick = deleteWarehouseItem;

            //appending
            updateItemCell.append(updateButton);
            deleteButton.append(deleteAction);
            itemDetails.append(itemName);
            itemDetails.append(itemPrice);
            itemDetails.append(updateItemCell);
            itemDetails.append(deleteButton);
            itemsTableBody.append(itemDetails);
        }
        //itemsContainer.textContent = `There are ${items.length} in the warehouse!`;
    }
    else{
        itemsContainer.textContent = 'No items to display! Add an item!';
    }

    //append table elements
    itemsContainer.append(firstRow);
    itemsContainer.append(itemsTableBody);
    return itemsContainer;
}

//updateURL 
const updateURL = 'http://localhost:8081/item/update/';
function updateItemModal(e){

    const companyHeader = document.getElementById('companyName');
    const itemForm = document.getElementById('updateItemForm');
    const updateItemName = document.getElementById('updateItemName');
    const updatePrice = document.getElementById('updatePrice');

    console.log(itemForm.action);

    //onclick function passes the clicked element.
    //below code type checks to make get correct value to 
    if(e.target.tagName === 'I'){
        itemForm.action = `${updateURL}${companyHeader.textContent}&${e.target.parentNode.value}`;
        const values = e.target.parentNode.value.split('&');
        let warehouseName = values[0];
        let itemName = values[1];
        const itemRow = document.getElementById(warehouseName+itemName);
        const children = itemRow.querySelectorAll('td');
        console.log(children);

        updateItemName.value = children[0].innerText;
        updatePrice.value = children[1].innerText;
    }
    else{ //we clicked the button
        itemForm.action = `${updateURL}${companyHeader.textContent}&${e.target.value}`;
        const values = e.target.value.split('&');
        let warehouseName = values[0];
        let itemName = values[1];
        const itemRow = document.getElementById(warehouseName+itemName);
        const children = itemRow.querySelectorAll('td');
        console.log(children);

        updateItemName.value = children[0].innerText;
        updatePrice.value = children[1].innerText;
    }
    
    console.log(itemForm.action);
}

function deleteWarehouseItem(e){
    //value of button
    //console.log(e.target.value);

    /**
     * e.target.value has 2 parameters stuck together for simplicity
     * 
     * following code splits them into warehouseName and itemName
     */
    const values = e.target.value.split('&');
    const warehouseName = values[0];
    const itemName = values[1];

    //grab company name;
    const companyName = document.getElementById('companyName').textContent;

    const xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            //button -> td -> tr -> tbody 
            //remove the item from the table
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        }
    }

    xhr.open('DELETE', `/item/${companyName}&${warehouseName}&${itemName}`);
    xhr.send();
}

function assignOnClick(){
    const updateButton = document.getElementById('updateButton');
    updateButton.onclick = checkItemExists;
}

function checkItemExists(e){
    console.log('INSIDE THE FUNCTION!!!');

    const companyHeader = document.getElementById('companyName').textContent;
    const values = document.getElementById('updateItemForm').action.split('&');
    const updateItemName = document.getElementById('updateItemName').value;

    const itemExists = document.getElementById(values[1]+updateItemName);

    console.log(itemExists);

    //console.log(values[2]);
    //console.log(updateItemName);
    //console.log(values[2] === updateItemName);
    
    if(itemExists !== null && updateItemName !== values[2]){
        const error = document.getElementById('errorMessage');
        error.textContent = 'Item already exists!';
        e.preventDefault();
    }

    //console.log(values[2]);
    //console.log(updateItemName);

    // const xhr = new XMLHttpRequest();

    // xhr.onload = function() {
    //     if(xhr.status === 500 && values[2] !== updateItemName){
    //         console.log('Item exists!');
    //         const p = document.getElementById('errorMessage');
    //         p.textContent = 'Item already exists!';
    //         e.preventDefault();
    //     }
    // }

    // xhr.open('GET',`/item/find/${companyHeader}&${values[1]}&${updateItemName}`);
    // xhr.send();
}