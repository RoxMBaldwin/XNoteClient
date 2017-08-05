const url = "http://localhost:3000/"

// $ (() => {
//   getNotes()
//   getEvent()
// })

function getNotes() {
  $('.notesTableBody').empty();

  $.get("http://localhost:3000/users", (data) => {
    for (var i = 0; i < data.length; i++) {
      $(".notesTableBody").append(
        `<tr class="${data[i].id}">
          <th scope="row">
          <td>${data[i].date}</td>
          <td>${data[i].title}</td>
          <td>${data[i].content}</td>
          <td>
            <button type="button" name="edit" class="${data[i].id}" value="${data[i].id}">Edit</button>
          </td>
          <td>
            <button type="button" name="delete" class="${data[i].id}" value="${data[i].id}">Delete</button>
          </td>
        </tr>`
      );
    }
  })
  // $('.allNotes').css("display": "none");
}
function getEvents() {
  $('.eventsTableBody').empty();

  $.get("http://localhost:3000/events", (data) => {
    for (var i = 0; i < data.length; i++) {
      $(".eventsTableBody").append(
                                `<tr class="${data[i].id}">
                                  <th scope="row">${data[i].date}</th>
                                  <td>${data[i].date}</td>
                                  <td>${data[i].title}</td>
                                  <td>${data[i].content}</td>
                                  <td>
                                    <button type="button" name="edit" class="${data[i].id}" value="${data[i].id}">Edit</button>
                                  </td>
                                  <td>
                                    <button type="button" name="delete" class="${data[i].id}" value"${data[i].id}">Delete</button>
                                  </td>
                                </tr>`
                              );
    }
  })
  // $('.allEvents').css("display": "none");
}

function addNote() {
  //default to isEvent = false;
  $.post("http://localhost:3000/notes", )


  //dan working on this function!!!! DO NOT EDIT
}

function addEvent() {
//DAN WORKING ON this

  //default to isEvent = true
}

function editNote() {
  // $(element).attr('class') to get value of note id
  // time is the timestamp when note is created or edited
}

function editEvent() {
  // $(element).attr('class') to get value of event id
  // user MUST enter dat/time for event. no timestapmig of events


}

function deleteNote() {

}

function deleteEvent() {
  
}
