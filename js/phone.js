const loadPhones=(inputText,datalimit)=>{

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data,datalimit));







}
const showPhones = (phones,datalimit) => {
    
    const containerField = document.getElementById('container-feild');
    containerField.innerHTML = ``;
    const showAllButton = document.getElementById('show-all');
    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllButton.classList.remove('d-none');
        

    }
    else {
        
        showAllButton.classList.add('d-none'); 
    }
    
    
    
    
    
    const messageDiv = document.getElementById('no-found-message');
    if (phones.length === 0) {
        messageDiv.classList.remove('d-none');

    }
     else {
        
        messageDiv.classList.add('d-none'); 
     }
    
           phones.forEach(phone => {
        const element = document.createElement('div');
        element.classList.add('card');
        element.innerHTML = `
         <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body"
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                  <button onclick="loadphonedetail('${phone.slug}')" href="#" class="btn btn-primary w-50 m-3 h-25" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>

                </div>
        </div>
        
        `;
        containerField.appendChild(element);
        
        
    });
    toggleSpiner(false);
    

    
}



const processData = (datalimit) => {
        
    toggleSpiner(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    loadPhones(inputText,datalimit);






}
const searchButton = (search) => {
    
    processData(10);




}
// enter key handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
    
    if (e.key === 'Enter') {
        processData(10);
    }
});



const toggleSpiner = isLoading => {
    const spinerSection = document.getElementById('loader');
    if (isLoading) {
        
        spinerSection.classList.remove('d-none');
    } 
    
   else {
    
    spinerSection.classList.add('d-none');
}

}
document.getElementById('show-all').addEventListener('click', function () {
    
    processData();


});

 
 const loadphonedetail = async id => {
    
     const url = `https://openapi.programming-hero.com/api/phone/${id}`;
     const res = await fetch(url);
     const data = await res.json();
     displayMobileData(data.data);


}
 
const displayMobileData = phone => {
    console.log(phone);

    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found' }</p>
    <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Memory Found' }</p>
    <p>brand: ${phone.brand ? phone.brand :'No Brand Found' }</p>
    <p> Others: ${phone.others ? phone.others.Bluetooth: 'No Bluetooth Found' }</p>
    
    
    `
    


}

 loadPhones();






