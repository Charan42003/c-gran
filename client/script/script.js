
// PRE LOADER 

window.addEventListener('load', function() {
    document.querySelector('.preloader').style.display = 'none';
});


// CLOSE BUTTON 

let c = document.getElementById('close');
c.addEventListener('click', function(){
    let a = document.getElementById('navBar');
    a.style.right = "-100vw";
});

// OPEN BUTTON 

let o = document.getElementById('open');
o.addEventListener('click', function(){
    let a = document.getElementById('navBar');
    a.style.right = "0";
});

// CLOSE ON CLICK 

let d = document.querySelectorAll('.close');

for(let i of d)
{
    i.addEventListener('click', function(){
        let a = document.getElementById('navBar');
        a.style.right = "-100vw";
    });
}

//Update current time and date 
const now = new Date();

const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const formattedTime = `${hours}:${minutes}`;

document.getElementById('date').value = formattedDate;
document.getElementById('time').value = formattedTime;

//api call
const submit = document.querySelector(".submit")
const formSubmit = document.querySelector("#submit")
submit.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const time = document.querySelector("#time").value;
  const date = document.querySelector("#date").value;
  const no_of_people = document.querySelector("#people").value;
  const phoneNo = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  if(name != "" && ((phoneNo > 999999999)  && (phoneNo < 9999999999)) && email != "") {
    submitBooking(name, time, date, no_of_people, phoneNo, email)
  } else {
    alert("All fields are needed")
  }
})
function submitBooking(name, time, date, no_of_people, phoneNo, email) {
    let postData = {
        fullName: name,
        email: email,
        phoneNo: phoneNo,
        people: no_of_people,
        time: time,
        date: date
    }
    document.querySelector('.preloader').style.display = 'flex';
  
    fetch('https://c-gran-server.onrender.com/postBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
      .then(response => {
        document.querySelector('.preloader').style.display = 'none';
  
        if (!response.ok) {
          alert('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert(data.msg);
        window.location.reload()
      })
      .catch(error => {
        alert('Error:', error.message);
      });
}
