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

function editNote() {
  // $(element).attr('class') to get value of note id
  // time is the timestamp when note is created or edited
}

function editEvent() {
  // $(element).attr('class') to get value of event id
  // user MUST enter dat/time for event. no timestapmig of events


}
