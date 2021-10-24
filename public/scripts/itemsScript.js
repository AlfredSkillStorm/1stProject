function getItems(warehouse, companyName){
    const items = document.createElement('div');
    const tableDiv = document.createElement('div');
    const itemTable = document.createElement('table');
    const tableBody = document.createElement('tbody');

    //itemTable.id = companyName;

    //below code to create first row headers
    const firstRow = document.createElement('tr');
    const itemNameHeader = document.createElement('th');
    itemNameHeader.textContent = "Item Name";
    const itemPriceHeader = document.createElement('th');
    itemPriceHeader.textContent = "Price";
    const deleteItem = document.createElement('th');
    deleteItem.textContent = 'Delete';

    //Appending headers to first row
    firstRow.append(itemNameHeader);
    firstRow.append(itemPriceHeader);
    firstRow.append(deleteItem);
    
    //tableDiv.className = 'tableData';
    //console.log(itemTable);
    //console.log(items);

    // items.style.display = "none"
    // //console.log('Printing warehouse details \n');
    // //console.log(warehouse);
    // if (warehouse.items.length === 0){
    //     items.textContent = 'No items in warehouse!';
    //     return items;
    // }
    

    for(item of warehouse.items){
        console.log(item);

        //item details initialization
        const itemDetails = document.createElement('tr');
        const itemName = document.createElement('td');
        itemName.textContent = item.itemName;
        const itemPrice = document.createElement('td');
        itemPrice.textContent = item.price;

        //delete button to delete item
        const deleteButton = document.createElement('td');
        const deleteAction = document.createElement('button');
        deleteAction.value = warehouse.warehouseName;
        deleteAction.innerText = 'X';

        deleteAction.onclick = deleteWarehouseItem;

        deleteButton.append(deleteAction);

        itemDetails.append(itemName);
        itemDetails.append(itemPrice);
        itemDetails.append(deleteButton);
        tableBody.append(itemDetails);
        

        //itemTable.append(itemDetails);
        //items.textContent = `${warehouse.items.length} items in warehouse!!`;
        //const itemDiv = document.createElement('');
    }

    itemTable.append(firstRow);
    itemTable.append(tableBody);
    tableDiv.append(itemTable);
    items.append(tableDiv);
    return items;
}

function addItem(e){
    console.log('Inside addItem');

    const xhr = new XMLHttpRequest();

    const itemName = document.getElementById("itemName").value;
    const itemPrice = document.getElementById("itemPrice").value;
    const companyName = e.target.parentNode.parentNode.parentNode.parentNode.id;

    console.log(itemName);
    console.log(itemPrice);
    console.log(companyName);

    let data = {};
    data.itemName = itemName;
    data.price = itemPrice;
    data.companyName = companyName;

    let jsonData = JSON.stringify(data);

    //console.log(e.target.value);
    xhr.onload = function() {
        
        if (xhr.status === 200 & xhr.readyState === 4) {
            
            //Following code to go back to the webpage without creating a new company
            const xhrReload = new XMLHttpRequest();
            xhrReload.open('GET', `/`);
            xhrReload.send();
            
            location.reload();
        }
    }
    xhr.open('POST', `/item/${e.target.value}`);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(jsonData);
}

function cancelItemForm(e){
    console.log('Inside cancelItemForm');

    console.log(e.target.parentNode.parentNode.id);
    // button -> div -> div
    const itemDiv = e.target.parentNode.parentNode;
    const itemForm = document.getElementById('addItemForm');

    console.log(itemDiv);
    console.log(itemForm);
    
    //console.log(warehouseDiv);
    itemDiv.removeChild(itemForm);
}

function addItemForm(e){
    console.log('Inside addItem function');
    console.log(e.target.value);

    const div = e.target.parentNode;
    console.log(div);
    // console.log("Inside addWarehouseForm!");

    //creating a Form for adding an item
    const div2 = document.createElement('div');
    div2.id = "addItemForm";
    div2.className = "addItemForm";
    div2.method="POST";

    //creating a label for item name
    const label1 = document.createElement('label');
    label1.innerText = "Item name:";

    //creating an input for item name
    const input1 = document.createElement('input');
    input1.type = "text";
    input1.id = "itemName";
    input1.name = "itemName";

    //creating a label for item price
    const label2 = document.createElement('label');
    label2.innerText = "Price:";

    //creating an input for warehouse load
    const input2 = document.createElement('input');
    input2.type = "number";
    input2.id = "itemPrice"
    input2.name = 'price';

    const br = document.createElement('br');

    // creating a button to add item
    const addButton = document.createElement('button');
    addButton.innerText = "Add Item";
    addButton.value = e.target.value;
    addButton.onclick = addItem;

    // creating a button to cancel form
    const cancelButton = document.createElement('button');
    cancelButton.innerText = "Cancel";
    cancelButton.onclick = cancelItemForm;

    div2.append(label1);
    div2.append(input1);
    div2.append(br);
    div2.append(label2);
    div2.append(input2);
    div2.append(addButton);
    div2.append(cancelButton);
    div.append(div2);
}