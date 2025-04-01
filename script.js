let currentPage = 1;

// Initializes the API
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: "Bearer sk_6cd914fbb2c682a0626e85de06faed40"
    }
  };

// Pulls up any individual page, controlled by nextPage & prevPage
// Provides API Responses in json, 
// Adds data.subscribers to subscriberTable() function
function getSubscriberPage(page) { 
    fetch(`https://api.postscript.io/api/v2/subscribers?page=${page}`, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            subscriberTable(data.subscribers);
        })
        .catch(err => console.error(err));
}

// Creates the actual <tbody> in index.html. Loads <td> values with API responses.
// Creates 2 <td> values dedicated to input field and button.
function subscriberTable(subscribers){

        const tableBody = document.getElementById("subscriber_table")
        // tableBody.innerHTML needed to stop loading
        tableBody.innerHTML = ''
        
        subscribers.forEach(subscriber => {
            const row = document.createElement("tr")
            row.innerHTML = 
            `
            <td>${subscriber.phone_number || "N/A"}</td>
            <td>${subscriber.email_address || "N/A"}</td>
            <td>${subscriber.created_at || "N/A"}</td>
            <td>${subscriber.tags || "N/A"}</td>
            <td><input id="tagInput_${subscriber.id}" type="text" placeholder="Enter new tag..."></td>
            <td><button onclick="updateTag('${subscriber.id}')" type="button">Submit New Tag!</button></td>
            `
            tableBody.append(row);
        });
        
        // Disabled prevPage for Page 1, causing bugs.
        document.getElementById("prevPage").disabled = currentPage === 1;
}

// When button click in subscriberTable()...
// updateTag() adds a new tag to subcriber_id.
function updateTag(subscriber_id){
    const tagInput = document.getElementById(`tagInput_${subscriber_id}`);
    console.log(tagInput)
    const newTag = tagInput.value;

    // Fires if nothing entered, but button clicked >:(
    if (!newTag){
        alert("Please enter a valid field.")
        return;
    }

    const options = {
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer sk_6cd914fbb2c682a0626e85de06faed40`
        },
        body: JSON.stringify({tags: [newTag]})
      };
      
      fetch(`https://api.postscript.io/api/v2/subscribers/${subscriber_id}`, options)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            // Reloads the page so you don't have to.
            location.reload();
        })
        .catch(err => console.error(err));
}

// Controls the nextPage button.
document.getElementById("nextPage").addEventListener('click', function(){
    currentPage++
    getSubscriberPage(currentPage)
})

// Controls the prevPage button.
document.getElementById("prevPage").addEventListener('click', function(){
    if (currentPage > 1){
        currentPage--
        getSubscriberPage(currentPage)
    }
})

getSubscriberPage(currentPage)
