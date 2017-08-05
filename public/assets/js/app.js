const url = ‘http://localhost:3000/'

$ (() => {
  getNotes()
  getEvent()
})

function getNotes() {
  $.get(“http://localhost:3000/users”, (data) => {
    for (var i = 0; i < data.length; i++) {
      $(“.displayNote”).append(`<div id="displayNote"> ${data[i].id}</div>`)
    }
  })
}
function getEvent() {
  $.get(“http://localhost:3000/events”, (data) => {
    for (var i = 0; i < data.length; i++) {
      $(“.displayEvent”).append(`<div> ${data[i].title}</div>
                                <div> ${data[i].date}</div>
                                <div> ${data[i].content}</div>`
    )
    }
  })
}
