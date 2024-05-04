// preLoader
// PRE LOADER 

window.addEventListener('load', function() {
    document.querySelector('.ad-preloader').style.display = 'none';
});


// Admin Pannel Script
const loginBtn = document.querySelector(".login-form button")
loginBtn.addEventListener("click", () => {
    const password = document.querySelector("#admin-password").value
    const username = document.querySelector("#username").value
    if(password==="cgran" && username==="Cgran Admin") {
        document.querySelector(".login-wrap").remove()
        document.querySelector('.ad-preloader').style.display = 'flex';
        getBookingsData()
    } else {
        // document.querySelector(".login-wrap").remove()
        alert("Wrong Credential")
    }
})

//getrequest
var data;
var card = (item) => {

   return `
    <div class="sec1">
        <p>${item.fullName}</p>
        <div>
            <span>${item.people}</span>
            <i class="fa-solid fa-users-between-lines"></i>
        </div>
    </div>
    <div class="sec2">
        <div>
            <i class="fa-solid fa-phone"></i>
            <span>${item.phoneNo}</span>          
        </div>
        <div>
            <i class="fa-regular fa-envelope ml"></i>
            <span>${item.email}</span>
        </div>
    </div>
    <div class="sec3">
        <div>
            <i class="fa-regular fa-clock"></i>
            <span>${item.time}</span>
        </div>
        <div>
            <span>${item.date}</span>
        </div>
    </div>
    <div class="sec4">
        <button onclick="check_out('${item.id}')">Check Out</button>
    </div>
    `
} 

async function getBookingsData() {
    try{
        let response = await fetch("https://c-gran-server.onrender.com/getBookings")
        let result = await response.json();
        data = result.data;
        update(data)
        document.querySelector('.ad-preloader').style.display = 'none';
    } catch(error) {
        alert(error.message)
        window.location.reload()
    }
}
function update(data) {
    data.map(item => {
        const newCard = document.createElement('div');
        newCard.classList.add('booked-card');
        newCard.innerHTML = card(item)
        document.querySelector('.booked-wrap').appendChild(newCard)
    })
}
function clearCards() {
    const elements = document.querySelectorAll(".booked-card")
    for(let i=0; i<elements.length; i++) {
        elements[i].remove()
    }
}
const one = document.querySelector('.nav input')
one.addEventListener("keydown", (e) => {
    if(e.target.value != "" || e.target.value != ""){
        clearCards()
        data.map(item => {
            if(item.fullName.toLowerCase().includes(e.target.value.toLowerCase())){
                const newCard = document.createElement('div');
                newCard.classList.add('booked-card');
                newCard.innerHTML = card(item);
                document.querySelector('.booked-wrap').appendChild(newCard)
            }
        })
    } else {
        clearCards()
        update(data)
    }
})

function check_out(item) {
    document.querySelector('.ad-preloader').style.display = 'flex';
    fetch('https://c-gran-server.onrender.com/checkout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: item
        }),
      })
      .then(response => {
          
        if (!response.ok) {
          alert('Network response was not ok');
        }
        return response.json();
    })
    .then(async(data) => {
        clearCards();
        await getBookingsData()
        document.querySelector('.ad-preloader').style.display = 'none';
        alert(data.msg);
      })
      .catch(error => {
        console.log('Error:', error.message);
      });
}