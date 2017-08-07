const url = "http://localhost:3000/"

// $ (() => {
//   getNotes()
//   getEvent()
// })

function getNotes() {
  $('.notesTableBody').empty();

  $.get("http://localhost:3000/events", (data) => {
      for (var i = 0; i < data.length; i++) {
        $(".notesTableBody").append(
                                  `<tr class="${data[i].id}">
                                    <th scope="row">${data[i].date.slice(0,10)}</th>
                                    <td class="title">${data[i].title}</td>
                                    <td class="content">${data[i].content}</td>
                                    <td>
                                    <button type="button" name="edit" data-toggle="modal" data-target="#editNoteModal${data[i].id}">Edit</button>

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
                                                            <label for="dateInput" class="col-sm-2 control-label">Date (Optional)</label>
                                                            <div class="col-sm-10">
                                                            <input type="date" name="date" class="form-control" value="${data[i].date.slice(0,10)}" id="dateInput${data[i].id}" placeholder="Date">
                                                            </div>
                                                        </div>

                                                        <div class="form-group animated fadeIn">
                                                            <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                            <div class="col-sm-10">
                                                            <textarea type="content" name="content" class="form-control" id="contentInput${data[i].id}" placeholder="Content" required>${data[i].content}</textarea>
                                                            </div>
                                                        </div>

                                                        <div class="form-group animated fadeIn">
                                                          <label><input type="checkbox" name="event" id="eventCheck${data[i].id}">Event?</label>
                                                        </div>

                                            <div class="modal-footer">
                                              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                              <button class="btn btn-default" type="submit" name="submit" value="Submit">Save</button>
                                            </div>
                                          </div>
                                         </div>
                                         </form>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <button type="button" name="delete" class="${data[i].id}" value"${data[i].id}">Delete</button>
                                    </td>
                                  </tr>`
                                );
                                if(data[i].isEvent)
                                {
                                  $(`#eventCheck${data[i].id}`).attr('checked',true)
                                }

            $(`#editNote${data[i].id}`).submit(function(data) {

              data.preventDefault();

              let id = parseInt($(this).attr('id').slice(-1))

              let title = $(`#titleInput${id}`).val();
              let content = $(`#contentInput${id}`).val();
              let date = $(`#dateInput${id}`).val();

              let isEvent = $(`#eventCheck${id}`).is(':checked');

              let input = { title:title,
                            content:content,
                            date: date,
                            isEvent: isEvent
                          }

              if (!isEvent)
              {
                isEvent = false;
                date = null;
              }

              $.ajax({
                url:"http://localhost:3000/events/" + id,
                type: "PUT",
                data: input,
                success: function(data){
                  alert("Your Event has been successfully updated, put that cookie down!")
                }
              })
              location.reload();
            })
      }
    })
  $('.allNotes').hide()
}

function getEvents() {
  $('.eventsTableBody').empty();

  $.get("http://localhost:3000/events", (data) => {
    for (var i = 0; i < data.length; i++) {
      if(data[i].isEvent){
        $(".eventsTableBody").append(
                                  `<tr class="${data[i].id}">
                                    <th scope="row">${data[i].date.slice(0,10)}</th>
                                    <td class="title">${data[i].title}</td>
                                    <td class="content">${data[i].content}</td>
                                    <td>
                                    <button type="button" name="edit" data-toggle="modal" data-target="#editEventModal${data[i].id}">Edit</button>

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
                                                            <label for="titleInput" class="col-sm-2 control-label">Title</label>
                                                            <div class="col-sm-10">
                                                            <input type="title" name="title" class="form-control" value="${data[i].title}" id="titleInput${data[i].id}" placeholder="Title" required>
                                                            </div>
                                                        </div>

                                                        <div class="form-group animated fadeIn">
                                                            <label for="dateInput" class="col-sm-2 control-label">Date (Optional)</label>
                                                            <div class="col-sm-10">
                                                            <input type="date" name="date" class="form-control" value="${data[i].date.slice(0,10)}" id="dateInput${data[i].id}" placeholder="Date">
                                                            </div>
                                                        </div>

                                                        <div class="form-group animated fadeIn">
                                                            <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                            <div class="col-sm-10">
                                                            <textarea type="content" name="content" class="form-control" id="contentInput${data[i].id}" placeholder="Content" required>${data[i].content}</textarea>
                                                            </div>
                                                        </div>

                                                        <div class="form-group animated fadeIn">
                                                          <label><input type="checkbox" name="event" id="eventCheck${data[i].id}">Event?</label>
                                                        </div>

                                            <div class="modal-footer">
                                              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                              <button class="btn btn-default" type="submit" name="submit" value="Submit">Save</button>
                                            </div>
                                          </div>
                                         </div>
                                         </form>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <button type="button" name="delete" class="${data[i].id}" value"${data[i].id}">Delete</button>
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

            let id = parseInt($(this).attr('id').slice(-1))

            let title = $(`#titleInput${id}`).val();
            let content = $(`#contentInput${id}`).val();
            let date = $(`#dateInput${id}`).val();

            let isEvent = $(`#eventCheck${id}`).is(':checked');

            let input = { title:title,
                          content:content,
                          date: date,
                          isEvent: isEvent
                        }

            if (!isEvent)
            {
              isEvent = false;
              date = null;
            }

            $.ajax({
              url:"http://localhost:3000/events/" + id,
              type: "PUT",
              data: input,
              success: function(data){
                alert("Your Event has been successfully updated, put that cookie down!")
              }
            })
            location.reload();
          })
    }
  })
}

function addNote() {
  $('.notesTableBody').append(
    `<!-- Modal -->
                                  <div class="modal fade" id="addModal" role="dialog">
                                    <div class="modal-dialog" role="document">
                                    <form class="form-horizontal" method="post" id="addForm" role="form">
                                      <!-- Modal content-->
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                          <h4 class="modal-title" id="myModalLabel">Add Note</h4>
                                        </div>
                                        <div class="modal-body">
                                                      <div class="form-group animated fadeIn">
                                                          <label for="titleInput" class="col-sm-2 control-label">Title</label>
                                                          <div class="col-sm-10">
                                                          <input type="title" name="title" class="form-control" value="" id="titleInput" placeholder="Title" required>
                                                          </div>
                                                      </div>

                                                      <div class="form-group animated fadeIn">
                                                          <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                          <div class="col-sm-10">
                                                          <textarea type="content" name="content" class="form-control" id="contentInput" placeholder="Content" required></textarea>
                                                          </div>
                                                      </div>

                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                            <button class="btn btn-default" type="submit" name="submit" value="Submit">Save</button>
                                          </div>
                                        </div>
                                       </div>
                                       </form>
                                      </div>
                                    </div>`)
  //default to isEvent = false;
  $('#addForm').submit(function(data) {
    data.preventDefault();

    var newNote = {
      title: $('#titleInput').val(),
      content: $('#contentInput').val()
    };

    $.ajax({
      url: "http://localhost:3000/events",
      type: "POST",
      data: newNote,
      success: function(data) {
        alert('new note added')

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
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                          <h4 class="modal-title" id="myModalLabel">Add Note</h4>
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

                                                      <div class="form-group animated fadeIn">
                                                          <label for="contentInput" class="col-sm-2 control-label">Content</label>
                                                          <div class="col-sm-10">
                                                          <textarea type="content" name="content" class="form-control" id="contentInput" placeholder="Content" required></textarea>
                                                          </div>
                                                      </div>



                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                            <button class="btn btn-default" type="submit" name="submit" value="Submit">Save</button>
                                          </div>
                                        </div>
                                       </div>
                                       </form>
                                      </div>
                                    </div>`)
  //default to isEvent = false;
  $('#addEvent').submit(function(data) {
    data.preventDefault();

    var newEvent = {
      date: $('#dateInput').val(),
      title: $('#titleInput').val(),
      content: $('#contentInput').val()
    };

    $.ajax({
      url: "http://localhost:3000/events",
      type: "POST",
      data: newEvent,
      success: function(data) {
        alert('new note added')

      }
    })
  })
  //default to isEvent = true
}

function editNote(id) {
  // $(element).attr('class') to get value of note id
  // time is the timestamp when note is created or edited
  let title = $("td.title", ".2").text();
  console.log(title);
  let content = $(this).find(".content").text();
  let date = $(this).find(".date").val();
  let isEvent = false;
  // let id = $(this).parent().before().attr('class')

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

function deleteNote(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:3000/events/${id}`,
    data: `"id=${id}"`,
    success: function(){
        getNotes();
    }
});
getNotes();
}

function deleteEvent(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:3000/events/${id}`,
    data: `"id=${id}"`,
    success: function(  ){
        getEvents();
    }
});
}
