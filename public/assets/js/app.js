const url = "http://localhost:3000/"

// $ (() => {
//   getNotes()
//   getEvent()
// })

function getNotes() {
  $('.appendNotes').empty();

  $.get("http://localhost:3000/users", (data) => {
    for (var i = 0; i < data.length; i++) {
      $(".appendNotes").append(
        `<div id="displayNote"> ${data[i].id}</div>
        <button type="button" name="edit" class="${data[i].id}" value="${data[i].id}">Edit</button>
        <button type="button" name="delete" class="${data[i].id}" value="${data[i].id}">Delete</button>`
      );
    }
  })
}
function getEvents() {
  $('.appendEvents').empty();

  $.get("http://localhost:3000/events", (data) => {
    for (var i = 0; i < data.length; i++) {
      $(".appendEvents").append(`<div> ${data[i].title}</div>
                                <div> ${data[i].date}</div>
                                <div> ${data[i].content}</div>
                                <button type="button" name="edit" class="${data[i].id}" value="${data[i].id}">Edit</button>
                                <button type="button" name="delete" class="${data[i].id}" value"${data[i].id}">Delete</button>`
    );
    }
  })
}
