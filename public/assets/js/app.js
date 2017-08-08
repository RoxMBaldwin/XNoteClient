const url = "http://localhost:8080/"
const token = localStorage.getItem('token')
const serverToken = parseJwt(token)


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64))
};

// $ (() => {
//   getNotes()
//   getEvent()
// })

// <th scope="row">${data[i].date.slice(0,10)}</th>

function getNotes() {
  $('.notesTableBody').empty();
  let date;

  $.ajax({
    method: 'GET',
    url: `http://localhost:8080/userJoins/${serverToken.id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((data) => {
    console.log(data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        if(data[i].date){
           date = data[i].date.slice(0,10)
        }  else {
           date = null;
        }
        $(".notesTableBody").append(
                                  `<tr class="${data[i].id} notesAll">
                                    <td class="title">${data[i].title}</td>
                                    <td class="content">${data[i].content}</td>
                                    <td>
                                    <button class="editNoteButton" type="button" name="edit" data-toggle="modal" data-target="#editNoteModal${data[i].id}">Edit</button>
                                    <!-- Modal -->
                                    <div class="modal fade" id="editNoteModal${data[i].id}" role="dialog">
                                      <div class="modal-dialog" role="document">
                                      <form class="form-horizontal" method="POST" id="editNote${data[i].id}" role="form">
                                      <input type="hidden" name="_method" value="PUT">
                                        <!-- Modal content-->
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">Edit Note</h4>
                                          </div>
                                          <div class="modal-body">
                                                        <div class="form-group animated fadeIn">
                                                            <label for="titleInput" class="col-sm-2 control-label">Title</label>
                                                            <div class="col-sm-10">
                                                            <input type="title" name="title" class="form-control" value="${data[i].title}" id="titleInput${data[i].id}" placeholder="Title" required>
                                                            </div>
                                                        </div>
                                                        <div class="form-group animated fadeIn">
                                                            <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                            <div class="col-sm-10">
                                                            <textarea type="content" name="content" class="form-control" id="contentInput${data[i].id}" placeholder="Content" required>${data[i].content}</textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group animated fadeIn">
                                                          <label><input class="eventCheckBox" type="checkbox" name="event" id="eventCheck${data[i].id}">Event?</label>
                                                        </div>
                                            <div class="modal-footer">
                                              <button type="button" class="btn btn-default closeNoteButton" data-dismiss="modal">Close</button>
                                              <button class="btn btn-default submitNoteButton" type="submit" name="submit" value="Submit">Save</button>
                                            </div>
                                          </div>
                                         </div>
                                         </form>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <button type="button" name="delete" class="${data[i].id} deleteNoteButton" value"${data[i].id}" onclick="deleteNote(${data[i].id})">Delete</button>
                                    </td>
                                  </tr>`
                                );
            if(data[i].isEvent)
            {
              $(`#eventCheck${data[i].id}`).attr('checked',true)
            }

            $(`#editNote${data[i].id}`).submit(function(data) {

              data.preventDefault();

              let id = parseInt(($(this).attr('id')).match(/\d+/g));

              let title = $(`#titleInput${id}`).val();
              let content = $(`#contentInput${id}`).val();

              let isEvent = $(`#eventCheck${id}`).is(':checked');

              let input = { title:title, date: date, content:content, isEvent: isEvent}

              $.ajax({
                url:"http://localhost:8080/events/" + id,
                type: "PUT",
                data: input,
                success: function(data){
                  $(`#editNoteModal${id}`).modal('hide');
                  $('.modal-backdrop').remove();
                  getNotes();
                }
              })
            })
      }
    })
$('.allNotes').hide();
}

function getEvents() {
  $('.eventsTableBody').empty();

  let setDate;

  $.get("http://localhost:8080/events", (data) => {
    for (var i = 0; i < data.length; i++) {
      if(data[i].isEvent){
        if(parseInt(data[i].date.slice(0,4)) > 1){
          setDate = data[i].date.slice(0,10)
        }
        else {
          setDate = "No Date";
        }
        $(".eventsTableBody").append(
                                  `<tr class="${data[i].id}" eventsAll>
                                    <th scope="row">${setDate}</th>
                                    <td class="title">${data[i].title}</td>
                                    <td class="content">${data[i].content}</td>
                                    <td>
                                    <button class="editEventButton" type="button" name="edit" data-toggle="modal" data-target="#editEventModal${data[i].id}">Edit</button>
                                    <!-- Modal -->
                                    <div class="modal fade" id="editEventModal${data[i].id}" role="dialog">
                                      <div class="modal-dialog" role="document">
                                      <form class="form-horizontal" method="POST" id="editEvent${data[i].id}" role="form">
                                      <input type="hidden" name="_method" value="PUT">
                                        <!-- Modal content-->
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">Edit Note</h4>
                                          </div>
                                          <div class="modal-body">
                                                        <div class="form-group animated fadeIn">
                                                            <label class="eventTitleInput" for="titleInput" class="col-sm-2 control-label">Title</label>
                                                            <div class="col-sm-10">
                                                            <input type="title" name="title" class="form-control" value="${data[i].title}" id="titleInput${data[i].id}" placeholder="Title" required>
                                                            </div>
                                                        </div>
                                                        <div class="form-group animated fadeIn">
                                                            <label for="dateInput" class="col-sm-2 control-label">Date (Optional)</label>
                                                            <div class="col-sm-10">
                                                            <input type="date" name="date" class="form-control" value="${setDate}" id="dateInput${data[i].id}" placeholder="Date">
                                                            </div>
                                                        </div>
                                                        <div class="form-group animated fadeIn">
                                                            <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                            <div class="col-sm-10">
                                                            <textarea type="content" name="content" class="form-control eventFormContent" id="contentInput${data[i].id}" placeholder="Content" required>${data[i].content}</textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group animated fadeIn">
                                                          <label><input class="eventCheckBox" type="checkbox" name="event" id="eventCheck${data[i].id}">Event?</label>
                                                        </div>
                                            <div class="modal-footer">
                                              <button type="button" class="btn btn-default closeEventButton" data-dismiss="modal">Close</button>
                                              <button class="btn btn-default submitEventButton" type="submit" name="submit" value="Submit">Save</button>
                                            </div>
                                          </div>
                                         </div>
                                         </form>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <button type="button" name="delete" class="${data[i].id} deleteEventButton" value"${data[i].id}" onclick="deleteEvent(${data[i].id})">Delete</button>
                                    </td>
                                  </tr>`
                                );
           }
          if(data[i].isEvent)
          {
            $(`#eventCheck${data[i].id}`).attr('checked',true)
          }

          $(`#editEvent${data[i].id}`).submit(function(data) {

            data.preventDefault();

            let id = parseInt(($(this).attr('id')).match(/\d+/g));



            let title = $(`#titleInput${id}`).val();
            let content = $(`#contentInput${id}`).val();
            let date = $(`#dateInput${id}`).val();

            let isEvent = $(`#eventCheck${id}`).is(':checked');

            if(date == ""){
              date = "01/01/0001";
            }

            let input = { title:title,
                          content:content,
                          date: date,
                          isEvent: isEvent
                        }



            $.ajax({
              url:"http://localhost:8080/events/" + id,
              type: "PUT",
              data: input,
              success: function(data){
                $(`#editEventModal${id}`).modal('hide'); //or  $('#IDModal').modal('hide');
                $('.modal-backdrop').remove();
                getEvents();
              }
            })
          })
    }
  })
$('.allEvents').hide();
}

function addNote() {
  $('.notesTableBody').append(
    `<!-- Modal -->
                                  <div class="modal fade" id="addModal" role="dialog">
                                    <div class="modal-dialog" role="document">
                                    <form class="form-horizontal" method="POST" id="addForm" role="form">
                                      <!-- Modal content-->
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <button type="button" class="close closeNoteAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                          <h4 class="modal-title" id="myModalLabel">Add Note</h4>
                                        </div>
                                        <div class="modal-body">
                                                      <div class="form-group animated fadeIn">
                                                          <label for="titleInput" class="col-sm-2 control-label">Title</label>
                                                          <div class="col-sm-10">
                                                          <input type="title" name="title" class="form-control" id="titleInput" placeholder="Title" required>
                                                          </div>
                                                      </div>
                                                      <div class="form-group animated fadeIn">
                                                          <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                          <div class="col-sm-10 noteAddContent">
                                                          <textarea type="content" name="content" class="form-control" id="contentInput" placeholder="Content" required></textarea>
                                                          </div>
                                                      </div>
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-default closeNoteAddButton" data-dismiss="modal">Close</button>
                                            <button class="btn btn-default submitNoteAddButton" type="submit" name="submit" value="Submit">Save</button>
                                          </div>
                                        </div>
                                       </div>
                                       </form>
                                      </div>
                                    </div>`)
  //default to isEvent = false;
  $('#addForm').submit(function(e) {
    e.preventDefault();

    let url = 'http://localhost:8080/events'
    let newNote = {
      title: $("#titleInput").val(),
      content: $("#contentInput").val(),
      isEvent: false
    };

    let data = JSON.stringify(newNote)

    $.ajax({
      url:'http://localhost:8080/events',
      type: 'POST',
      data: data,
      dataType: "json",
      processData: false,
      contentType: 'application/json',
      success: function(data) {
        $('#addModal').modal('hide'); //or  $('#IDModal').modal('hide');
        $('.modal-backdrop').remove();
      }
    })
  })

}

function addEvent() {
  $('.eventsTableBody').append(
    `<!-- Modal -->
                                  <div class="modal fade" id="addEventModal" role="dialog">
                                    <div class="modal-dialog" role="document">
                                    <form class="form-horizontal" method="post" id="addEvent" role="form">
                                      <!-- Modal content-->
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <button type="button" class="close closeAddEvent" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                          <h4 class="modal-title" id="myModalLabel">Add Event</h4>
                                        </div>
                                        <div class="modal-body">
                                                      <div class="form-group animated fadeIn">
                                                          <label for="titleInput" class="col-sm-2 control-label">Title</label>
                                                          <div class="col-sm-10">
                                                          <input type="title" name="title" class="form-control" value="" id="titleInput" placeholder="Title" required>
                                                          </div>
                                                      </div>
                                                      <div class="form-group animated fadeIn">
                                                          <label for="dateInput" class="col-sm-2 control-label">Date (Optional)</label>
                                                          <div class="col-sm-10">
                                                          <input type="date" name="date" class="form-control" value="" id="dateInput" placeholder="Date">
                                                          </div>
                                                      </div>
                                                      <div class="form-group animated fadeIn addEventContent">
                                                          <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                          <div class="col-sm-10">
                                                          <textarea type="content" name="content" class="form-control" id="contentInput" placeholder="Content" required></textarea>
                                                          </div>
                                                      </div>
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-default closeAddEventButton" data-dismiss="modal">Close</button>
                                            <button class="btn btn-default submitAddEventButton" type="submit" name="submit" value="Submit">Save</button>
                                          </div>
                                        </div>
                                       </div>
                                       </form>
                                      </div>
                                    </div>`)
  //default to isEvent = false;
  $('#addEvent').submit(function(e) {
    e.preventDefault();
    let date = $('#dateInput').val()

    if(date == ""){
      date = "01/01/0001"
    }

    let newEvent = {
      title: $('#titleInput').val(),
      date: date,
      content: $('#contentInput').val(),
      isEvent: true
    };

    let url = 'http://localhost:8080/events'

    let data = JSON.stringify(newEvent)

    $.ajax({
      url:'http://localhost:8080/events',
      type: 'POST',
      data: data,
      dataType: "json",
      processData: false,
      contentType: 'application/json',
      success: function(data) {
        $('#addEventModal').modal('hide'); //or  $('#IDModal').modal('hide');
        $('.modal-backdrop').remove();
      }
    })
  })
}

function deleteNote(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:8080/events/${id}`,
    data: {id:id, isEvent:false},
    success: function(){
        getNotes();
    }
});
}

function deleteEvent(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:8080/events/${id}`,
    data: {id:id, isEvent:true},
    success: function(){
        getEvents();
    }
  });
}

function login() {
  event.preventDefault();
  const username = $('#inputUsername').val();
  const password = $('#inputPassword').val();
  const data = {username, password};
  $.post(url + 'login', data)
    .then(res => {
      if (res.error) {
        alert(res.error);
      } else {
        localStorage.setItem('token', res.data);
        location.href = '/';
      }
    })
}


function logout() {
  event.preventDefault();
  localStorage.removeItem('token');
  location.href = '/'
}

function signUp() {

  event.preventDefault();
  const email = $('#createEmail').val();
  const username = $('#createUsername').val();
  const password = $('#createPassword').val();
  const data = {email, username, password};
  console.log(data);
  $.post(url + 'users', data)
    .then(res => {
      if (res.error) {
        alert(res.error);
      } else {
        location.href = '/login.html';
      }
    })
}
