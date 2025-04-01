let currentPage = 1;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  };

function getSubscriberPage(page) { 
    fetch(`/api/subscribers?page=${page}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            subscriberTable(data.subscribers);
        })
        .catch(err => console.error(err));
}

function subscriberTable(subscribers){

        const tableBody = document.getElementById("subscriber_table")
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

        document.getElementById("prevPage").disabled = currentPage === 1;
}

function updateTag(subscriber_id){
    const tagInput = document.getElementById(`tagInput_${subscriber_id}`);
    console.log(tagInput)
    const newTag = tagInput.value;

    if (!newTag){
        alert("Please enter a valid field.")
        return;
    }

    const options = {
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({tags: [newTag]})
      };
      
      fetch(`/api/subscribers?page=${page}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            location.reload();
        })
        .catch(err => console.error(err));
}

document.getElementById("nextPage").addEventListener('click', function(){
    currentPage++
    getSubscriberPage(currentPage)
})

document.getElementById("prevPage").addEventListener('click', function(){
    if (currentPage > 1){
        currentPage--
        getSubscriberPage(currentPage)
    }
})

getSubscriberPage(currentPage)
