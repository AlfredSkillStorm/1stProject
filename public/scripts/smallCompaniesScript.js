function deleteSmallCompany(e) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if (xhr.status === 200) {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
    }
    xhr.open('DELETE', `/smallCompany/${e.target.value}`);
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

function getCompanies() {

    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const companies = JSON.parse(xhr.response);
        const companiesContainer = document.getElementById('smallCompanies');
        console.log(companies);
        if (xhr.status === 200) {
            for (company of companies) {
                const div = document.createElement('div');
                const companyName = document.createElement('h2');
                companyName.textContent = company.name;
                companyName.style.textAlign = 'center';
                //div.innerText = `Name: \n\n`;
                div.className = 'companyContainer';
                div.id = company.name;

                //get warehouses for each company
                const warehouses = getWarehouses(company);

                //Button to delete smallCompany
                const button = document.createElement('button');
                button.value = company.name;
                button.onclick = deleteSmallCompany;
                button.innerText = "DELETE COMPANY";

                //Button to add a form that creates a warehouse
                const button2 = document.createElement('button');
                button2.value = company.name;
                button2.onclick = addWarehouseForm;
                button2.innerText = "ADD WAREHOUSE";

                //appending HTML elements
                div.append(companyName);
                div.append(button);
                div.append(button2);
                div.append(warehouses);
                companiesContainer.append(div);
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
    setUpCompanyForm();
    getCompanies();
});