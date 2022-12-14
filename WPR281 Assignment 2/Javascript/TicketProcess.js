function openTicket() {
  document.getElementById("myTicket").style.display = "block";
  document.getElementById("innerBody").style.opacity = "0.5"
}

function closeTicket() {
  document.getElementById("myTicket").style.display = "none";
  document.getElementById("innerBody").style.opacity = "1"
}

// Getting current date.
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var today = yyyy + '-' + mm + '-' + dd;

//Adding elements and using local storage below:
const TicketForm = document.getElementById("TicketForm");
const TicketContainer = document.querySelector(".TicketContainer");
const inputTitle = TicketForm["TicketTitle"];
const inputAuthor = TicketForm["TicketAuthor"];
const inputDescription = TicketForm["TicketDescription"];
const inputType = TicketForm["TicketType"];
const inputStatus = TicketForm["TicketStatus"];
const dateIssued = String(today);
const inputDateETA = TicketForm["TicketDateETACompleted"];

const Tickets = JSON.parse(localStorage.getItem("Tickets")) || [];

const addTicket = (ProjectNumber, TicketNumber, TicketTitle, TicketAuthor, TicketDescription, TicketType, TicketStatus, TicketDateIssued, TicketDateETACompleted, TicketDateCompleted) => {
  Tickets.push({
    ProjectNumber,
    TicketNumber,
    TicketTitle,
    TicketAuthor,
    TicketDescription,
    TicketType,
    TicketStatus,
    TicketDateIssued,
    TicketDateETACompleted,
    TicketDateCompleted

  });
  localStorage.setItem("Tickets", JSON.stringify(Tickets));

  return { ProjectNumber, TicketNumber, TicketTitle, TicketAuthor, TicketDescription, TicketType, TicketStatus, TicketDateIssued, TicketDateETACompleted };
};

const CreateTicketElement = ({ ProjectNumber, TicketNumber, TicketTitle, TicketAuthor, TicketDescription, TicketType, TicketStatus, TicketDateIssued, TicketDateETACompleted, TicketDateCompleted }) => {

  // create the ticket if the ProjectNumber matches the current page.
  if (document.location.href.split('/').pop() == ProjectNumber) {
    //create the elements
    const TicketElement = document.createElement("div");
    TicketElement.classList.add("TicketElement");
    TicketElement.id = `${TicketNumber}`;
    const tTicketDiv = document.createElement('div');
    tTicketDiv.classList.add('ticket');
    const tTicketTitle = document.createElement('h3');
    const tTicketAuthor = document.createElement('p');
    const tTicketDescription = document.createElement('p');
    const tTicketType = document.createElement('p');
    const tTicketStatus = document.createElement('p');
    const tTicketDateETACompleted = document.createElement('p');

    // Ticket button to open ticket elements
    const tbTicketButton = document.createElement('button');
    tbTicketButton.classList.add('ticketButton');
    if (TicketStatus == "High") {
      tbTicketButton.id = "highPriority";
    }
    else if (TicketStatus == "Medium") {
      tbTicketButton.id = "mediumPriority";
    }
    else if (TicketStatus == "Low") {
      tbTicketButton.id = "lowPriority";
    }
    else if (TicketStatus == "Completed") {
      tbTicketButton.id = "completedPriority";
    }

    const tbTicket = document.createElement('div');
    tbTicket.classList.add('Ticket');

    const tbPriority = document.createElement('div');
    tbPriority.innerHTML = TicketStatus;
    tbPriority.classList.add('btnTitles');

    const tbTicketHeading = document.createElement('div');
    tbTicketHeading.innerHTML = TicketTitle;
    tbTicketHeading.classList.add('btnTitles');

    const tbAuthor = document.createElement('div');
    tbAuthor.innerHTML = TicketAuthor;
    tbAuthor.classList.add('btnTitles');

    const tbDateCreated = document.createElement('div');
    tbDateCreated.innerHTML = TicketDateIssued;
    tbDateCreated.classList.add('btnTitles');

    const tbDateCompleted = document.createElement('div');
    tbDateCompleted.innerHTML = TicketDateCompleted;
    tbDateCompleted.classList.add('btnTitles');

    const deleteBtn = document.createElement('button');
    deleteBtn.addEventListener('click', deleteTicket);
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerHTML = "<img src='images/trash_can.png' class = 'noPointer' alt='trash' width='20' height='20'>";

    const editBtn = document.createElement('button');
    editBtn.addEventListener('click', onEdit)
    editBtn.classList.add('editBtn');
    editBtn.innerHTML = "<img src='images/edit.png' alt='edit' class = 'noPointer' width='20' height='20'>";

    const tickMark = document.createElement('button');
    tickMark.addEventListener('click', onComplete)
    tickMark.classList.add('tickMark');
    tickMark.innerHTML = "<img src='images/tick.png' alt='tick' class = 'noPointer' width='20' height='20'>";

    tbTicket.appendChild(tbPriority);
    tbTicket.appendChild(tbTicketHeading);
    tbTicket.appendChild(tbAuthor);
    tbTicket.appendChild(tbDateCreated);
    tbTicket.appendChild(tbDateCompleted);
    tbTicketButton.appendChild(tbTicket);

    //Fill the content
    tTicketTitle.innerText = "Title: " + TicketTitle;
    tTicketAuthor.innerText = "Author: " + TicketAuthor;
    tTicketDescription.innerText = "Description: " + TicketDescription;
    tTicketType.innerText = "Type: " + TicketType;
    tTicketStatus.innerText = "Priority: " + TicketStatus;
    tTicketDateETACompleted.innerText = "Estimated Date of Completion: " + TicketDateETACompleted;

    //Add to the Domain
    //The order it is appended is the order it will be displayed in.
    tTicketDiv.append(tTicketTitle, tTicketAuthor, tTicketDescription, tTicketType, tTicketStatus, tTicketDateETACompleted, editBtn);
    TicketElement.appendChild(deleteBtn);
    TicketElement.appendChild(tickMark);
    TicketElement.appendChild(tbTicketButton);
    TicketElement.appendChild(tTicketDiv);
    TicketContainer.appendChild(TicketElement);
  }
}

Tickets.forEach(CreateTicketElement);

TicketForm.onsubmit = (e) => {
  e.preventDefault();
  location.reload();
  const newTicket = addTicket(
    ProjectNumber = document.location.href.split('/').pop(),
    ticketNumber = Tickets.length + 1,
    inputTitle.value,
    inputAuthor.value,
    inputDescription.value,
    inputType.value,
    inputStatus.value,
    dateIssued,
    inputDateETA.value,
    dateCompleted = "Not Completed"
  )

  CreateTicketElement(newTicket);

  //Clear the inputs 
  inputTitle.value = "";
  inputAuthor.value = "";
  inputDescription.value = "";
  inputType.value = "";
  inputStatus.value = "";
  dateIssued.value = "";
  inputDateETA.value = "";
};

// Click on the ticket button to open the ticket.
document.querySelectorAll(".ticketButton").forEach(button => {
  button.addEventListener("click", () => {
    const ticket = button.nextElementSibling;
    button.classList.toggle('ticket--active');

    if (button.classList.contains('ticket--active')) {
      ticket.style.maxHeight = ticket.scrollHeight + "px";
    }
    else {
      ticket.style.maxHeight = 0;
    }
  });
});

// Delete function.
function deleteTicket(e) {
  if (confirm("Are you sure you want to delete this ticket?")) {
    const ticket = e.target.parentElement;
    const ticketNumber = ticket.id;
    const index = Tickets.findIndex(Ticket => Ticket.TicketNumber == ticketNumber);
    Tickets.splice(index, 1);
    localStorage.setItem("Tickets", JSON.stringify(Tickets));
    ticket.remove();
  }
}

// Ticket completed function.
function onComplete(e) {
  if (confirm("Confirm this ticket is completed?")) {
    const ticket = e.target.parentElement;
    const ticketNumber = ticket.id;
    const index = Tickets.findIndex(Ticket => Ticket.TicketNumber == ticketNumber);
    Tickets[index].TicketStatus = "Completed";
    Tickets[index].TicketDateCompleted = String(today);
    localStorage.setItem("Tickets", JSON.stringify(Tickets));
    location.reload();
  }
}

// Edit function.
function onEdit(e) {
  const ticket = e.target.parentElement.parentElement;
  const ticketNumber = ticket.id;
  const index = Tickets.findIndex(Ticket => Ticket.TicketNumber == ticketNumber);
  const selectedTicket = Tickets[index];
  inputTitle.value = selectedTicket.TicketTitle;
  inputAuthor.value = selectedTicket.TicketAuthor;
  inputDescription.value = selectedTicket.TicketDescription;
  inputType.value = selectedTicket.TicketType;
  dateIssued.value = selectedTicket.TicketDateIssued;
  inputDateETA.value = selectedTicket.TicketDateETACompleted;
  inputStatus.value = "Low";
  openTicket();
  Tickets.splice(index, 1); // remove old ticket from local storage
  // all tickets numbers shift down by 1.
  Tickets.forEach(Ticket => {
    if (Ticket.TicketNumber > selectedTicket.TicketNumber) {
      Ticket.TicketNumber -= 1;
    }
  });

  const newTicket = addTicket(
    // query string for project number
    ProjectNumber = document.location.href.split(':').pop(),
    ticketNumber = Tickets.length + 1,
    inputTitle.value,
    inputAuthor.value,
    inputDescription.value,
    inputType.value,
    inputStatus.value,
    dateIssued.value,
    inputDateETA.value,
    dateCompleted = "Not Completed"
  )
  Tickets.push(newTicket);
  localStorage.setItem("Tickets", JSON.stringify(Tickets));
  location.reload();
}

// Search function.
function searchTicket() {
  const search = document.getElementById("search").value;
  const returnBtn = document.getElementById("returnBtn");
  if (search != "") {
    for (let i = 0; i < Tickets.length; i++) {
      //if the ticket title matches the search, display it.
      if (Tickets[i].TicketTitle.toLowerCase() == search.toLowerCase() || Tickets[i].TicketAuthor.toLowerCase() == search.toLowerCase() || Tickets[i].TicketStatus.toLowerCase() == search.toLowerCase() || Tickets[i].TicketType.toLowerCase() == search.toLowerCase()) {
        document.getElementById(Tickets[i].TicketNumber).style.display = "block";
        returnBtn.style.display = "block";
      }
      else {
        document.getElementById(Tickets[i].TicketNumber).style.display = "none";
        returnBtn.style.display = "block";

      }
    }
    document.getElementById("search").value = "";
    //return button to reload the page
    returnBtn.addEventListener("click", () => {
      location.reload();
    }
    );
  }
}
