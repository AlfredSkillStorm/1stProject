function deleteSmallCompany(e) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        //console.log(JSON.parse(xhr.response));
        if (xhr.status === 200) {
            //e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            location.reload();
        }
    }
    xhr.open('DELETE', `/smallCompany/${e.target.value}`);
    console.log(e.target);
    console.log(e.target.value);
    xhr.send();
}

// for future use
// function findWarehouse(e){
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         console.log(JSON.parse(xhr.response));
//         if (xhr.status === 200) {
//             //e.target.parentNode.parentNode.removeChild(e.target.parentNode);
//         }
//     }
//     xhr.open('GET', `/warehouse/${e.target.value}`);
//     xhr.send();
// 

function closeWarning(){
    const warningModal = document.getElementById('exampleModal');
    warningModal.style.display = 'none';
}

function getCompanies() {

    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {

        const warningModal = document.getElementById('exampleModal');
        const companies = JSON.parse(xhr.response);
        const companiesContainer = document.getElementById('container');
        const deleteCompany = document.getElementById('deleteButton');
        deleteCompany.onclick = deleteSmallCompany;
        console.log(companies);
        if (xhr.status === 200) {
            for (company of companies) {
                const textCompName = company.name;
                const div = document.createElement('div');
                const companyName = document.createElement('h2');
                companyName.textContent = company.name;
                companyName.style.textAlign = 'center';
                //div.innerText = `Name: \n\n`;
                div.className = 'container rounded companyContainer';
                div.id = company.name;

                //get warehouses for each company
                //const warehouses = getWarehouses(company);
                const buttonGroup = document.createElement('div');
                buttonGroup.className= 'd-grid gap-2 col-6 mx-auto';

                //Button to delete smallCompany
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-primary btn-lrge';

                deleteButton.value = company.name;
                deleteButton.setAttribute('data-bs-toggle','modal');
                deleteButton.setAttribute('data-bs-target','#exampleModal');
                deleteButton.onclick = function(){
                    warningModal.style.display = 'block';
                    const tempDeleteComp = document.getElementById('deleteButton');
                    tempDeleteComp.value = textCompName;
                    console.log(tempDeleteComp.value);
                }
                //deleteButton.onclick = deleteSmallCompany;
                deleteButton.innerText = "DELETE COMPANY";

                //Button to add a form that creates a warehouse
                //const button2 = document.createElement('button');
                //button2.value = company.name;
                //button2.onclick = addWarehouseForm;
                //button2.innerText = "ADD WAREHOUSE";

                //appending HTML elements

                const hr = document.createElement('hr');
                buttonGroup.append(deleteButton);
                div.append(companyName);
                div.append(buttonGroup);
                //div.append(button2);
                //div.append(warehouses);
                companiesContainer.append(div);
                companiesContainer.append(hr);
            }

            //following code test findWarehouse functionality
            // const button3 = document.createElement('button');
            // button3.value = 'myWarehouse';
            // button3.onclick = findWarehouse;
            // button3.innerText = "Find Warehouse";

            // warehousesContainer.append(button3);
        } else {
            // Handles error
            companiesContainer.innerText = `${companies.error}`;
        }
    }
    xhr.open('GET', '/smallCompany');
    xhr.send();
}

function setUpCompanyForm(){

    const addCompany = document.createElement('h1');
    addCompany.textContent = 'Add Company';

    const companyForm = document.createElement('form');
    companyForm.method='POST';
    companyForm.action='smallCompany';

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Company Name:';

    const companyName = document.createElement('input');
    companyName.type = 'text';
    companyName.name = 'name'; 

    const submitForm = document.createElement('input');
    submitForm.type = 'submit';
    submitForm.value = 'Submit';

    companyForm.append(nameLabel);
    companyForm.append(companyName);
    companyForm.append(submitForm);
    companyForm.style.display = 'none';
    
    const openForm = document.createElement('div');
    openForm.className = 'companyForm';
    
    addCompany.onclick = () => {
        if(companyForm.style.display === 'none'){
            companyForm.style.display = 'block';
            addCompany.textContent = 'Cancel'
        }
        else{
            companyForm.style.display = 'none';
            addCompany.textContent = 'Add Content';
        }
    }
    
    openForm.append(addCompany);
    openForm.append(companyForm);
    document.body.append(openForm);
}

window.addEventListener('DOMContentLoaded', () => {
    //setUpCompanyForm();
    getCompanies();
});