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
            deleteAction.type='button';
            deleteAction.className = 'btn-danger';
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

    //append table elements
    itemsContainer.append(firstRow);
    itemsContainer.append(itemsTableBody);
    return itemsContainer;
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