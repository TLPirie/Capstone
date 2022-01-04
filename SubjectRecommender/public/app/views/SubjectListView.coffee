class window.SubjectListView extends Backbone.View

  template:
    '<div>
    <h2>What&#39s Next?</h2>
    <div class="scrollBox">
    <tbody>
      <table class="table">
      </table>
    </tbody>
    </div>
    </div>'

  initialize: ->
    @render()

  events:
    "click .btn": (e) ->
      if e.currentTarget.classList[0] isnt 'notseen'
        @newRating(e.currentTarget.id, e.currentTarget.classList[0])
      @$('#'+e.currentTarget.id).hide('slow')

  newRating: (id, like) ->
    console.log('id', id, like)
    @trigger 'newRating', {id: id, like:like}

  render: ->
    @$el.append @template
    for index, subject of _.shuffle(@model.userObj.allSubjects)
      @$('.table').append '<tr id="'+subject.id+'"><td>
        '+subject.name+'</td>
        <td>
        <button type="button" class="liked btn btn-success btn-xs" id="'+subject.id+'"><i class="icon-thumbs-up"></i></button>
        <button type="button" class="disliked btn btn-danger btn-xs" id="'+subject.id+'"><i class="icon-thumbs-down"></i></button>
        <button type="button" class="notseen btn btn-warning btn-xs" id="'+subject.id+'"><i class="icon-chevron-right"></i></button>
        </td>
        </tr>'
