function getItemQuantity(wr){
    let total = 0;
    for(item of wr.items){
        total += item.amount;
    }
    return total;
}

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
    const amountHeader = document.createElement('th');
    amountHeader.textContent = "Amount";
    const updateHeader = document.createElement('th');
    updateHeader.textContent = "Update";
    const deleteItem = document.createElement('th');
    deleteItem.textContent = 'Delete';

    if(items.length !== 0){
        console.log(items);

        //Appending headers to first row
        firstRow.append(itemNameHeader);
        firstRow.append(itemPriceHeader);
        firstRow.append(amountHeader);
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
            const itemAmount = document.createElement('td');
            itemAmount.textContent = item.amount;
            itemAmount.id = wr.warehouseName+item.itemName+'amount';

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
            itemDetails.append(itemAmount);
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
    const updateAmount = document.getElementById('updateAmount');

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
        updateAmount.value = children[2].innerText;
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
        updateAmount.value = children[2].innerText;
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
            
            //array of 2 numbers; number of items in warehouse / total items warehouse can hold
            const itemQuantities = document.getElementById(warehouseName+'Quantity').textContent.split('/');
            const amt = document.getElementById(warehouseName+itemName+'amount').textContent;

            const numItems = parseInt(itemQuantities[0]);
            const totalItems = parseInt(itemQuantities[1]);
            const count = parseInt(amt);
            const result = numItems - count;

            //update progressBar
            document.getElementById(warehouseName+'Quantity').textContent = `${result}/${totalItems}`;
            document.getElementById(warehouseName+'Quantity').style.width = `${(result/totalItems)*100}%`;

            //button -> td -> tr -> tbody 
            //remove the item from the table
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        }
    }

    xhr.open('DELETE', `/item/${companyName}&${warehouseName}&${itemName}`);
    xhr.send();
}

function assignOnClick(){
    const addButton = document.getElementById('addButton');
    addButton.onclick = checkItemExistsAdd;
    const updateButton = document.getElementById('updateButton');
    updateButton.onclick = checkItemExists;
}

function checkItemExistsAdd(e){
    console.log('INSIDE THE FUNCTION!!!');

    const values = document.getElementById('addItemForm').action.split('&');
    const addItemName = document.getElementById('itemName').value;
    const addItemAmount = document.getElementById('amount').value;

    const itemExists = document.getElementById(values[1]+addItemName);

    //array of 2 numbers; number of items in warehouse / total items warehouse can hold
    const itemQuantities = document.getElementById(values[1]+'Quantity').textContent.split('/');

    let numItems = parseInt(itemQuantities[0]);
    let totalItems = parseInt(itemQuantities[1]);
    let amt = parseInt(addItemAmount);

    if(itemExists !== null){
        const error = document.getElementById('errorMessageAdd');
        error.textContent = 'Item already exists!';
        e.preventDefault();
    }
    else if((numItems + amt) > totalItems){
        const error = document.getElementById('errorMessageAdd');
        error.textContent = `Not enough space! ${totalItems-numItems} left in warehouse!`;
        e.preventDefault();
    }
}

function checkItemExists(e){
    console.log('INSIDE THE Update FUNCTION!!!');

    const values = document.getElementById('updateItemForm').action.split('&');
    const updateItemName = document.getElementById('updateItemName').value;
    const updateItemAmount = document.getElementById('updateAmount').value;

    const itemExists = document.getElementById(values[1]+updateItemName);

    //array of 2 numbers; number of items in warehouse / total items warehouse can hold
    const itemQuantities = document.getElementById(values[1]+'Quantity').textContent.split('/');

    let numItems = parseInt(itemQuantities[0]);
    let totalItems = parseInt(itemQuantities[1]);
    let amt = parseInt(updateItemAmount);
    //console.log(itemExists);
    
    if(itemExists !== null && updateItemName !== values[2]){
        const error = document.getElementById('errorMessage');
        error.textContent = 'Item already exists!';
        e.preventDefault();
    }
    else if((numItems + amt) > totalItems){
        const error = document.getElementById('errorMessageUpdate');
        error.textContent = `Not enough space! ${totalItems - numItems} left in warehouse!`;
        e.preventDefault();
    }
}