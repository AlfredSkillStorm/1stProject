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
                div.className = 'container rounded companyContainer';
                div.id = company.name;

                //creating button group; two buttons
                //viewButton to view warehouses
                //deleteButton to delete company
                const buttonGroup = document.createElement('div');
                buttonGroup.className= 'd-grid gap-2 col-6 mx-auto';

                //Button to delete smallCompany
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-primary btn-lrge';

                //setting value of button
                deleteButton.value = company.name;

                //adding Bootstrap attributes to button
                deleteButton.setAttribute('data-bs-toggle','modal');
                deleteButton.setAttribute('data-bs-target','#exampleModal');
            
                //setting text of button
                deleteButton.innerText = "DELETE COMPANY";

                //creating horizontal line to separate companies
                const hr = document.createElement('hr');
                
                //appending elements
                buttonGroup.append(deleteButton);
                div.append(companyName);
                div.append(buttonGroup);
                companiesContainer.append(div);
                companiesContainer.append(hr);
            }

        } else {
            // Handles error
            companiesContainer.innerText = `${companies.error}`;
        }
    }
    xhr.open('GET', '/smallCompany');
    xhr.send();
}

window.addEventListener('DOMContentLoaded', () => {
    //setUpCompanyForm();
    getCompanies();
});