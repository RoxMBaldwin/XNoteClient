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
  let title = $(this).find(".title").text();
  let content = $(this).find(".content").text();
  let date = $(this).find(".date").val();
  let isEvent = false;
  let id = $(this).parent().before().attr('class')

  if ($(this).is(":checked"))
  {
    isEvent = true;
  }

  $.ajax({
    url:"http://localhost:3000/users/" + id,
    type: "PUT",
    data:{ title:title,
           content:content,
           date:date,
           isEvent:isEvent,
         },
    success: function(data){
      alert("Your Note has been successfully updated, now get to the chopper!")
    }
  })

}

function editEvent() {
  // $(element).attr('class') to get value of event id
  // user MUST enter dat/time for event. no timestapmig of events
  let title = $(this).find(".title").text();
  let content = $(this).find(".content").text();
  let date = $(this).find(".date").val();
  let isEvent = true;
  let id = $(this).parent().before().attr('class')

  if (!$(this).is(":checked"))
  {
    isEvent = false;
  }

  $.ajax({
    url:"http://localhost:3000/events/" + id,
    type: "PUT",
    data:{ title:title,
           content:content,
           date:date,
           isEvent:isEvent,
         },
    success: function(data){
      alert("Your Event has been successfully updated, put that cookie down!")
    }
  })


}

function deleteNote() {

}

function deleteEvent() {

}
