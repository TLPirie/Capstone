class window.RecommendationView extends Backbone.View

  template: '
      <div>
      <a class="tip" data-toggle="tooltip" data-placement="left">
        </a>
      <div class="row">
        <div class="col-lg-6">
          <h2>Your Recommendations
          <a class="tip2" data-toggle="tooltip" data-placement="left" title="Here are your recommendations! They change after every new rating based on what similar users like and dislike.">
            <i class="icon-info-sign smallicon"></i>
          </a>
          </h2>
        </div>
          <div id="userBox" class="col-lg-5">
          </div>
        <div class="col-lg-1">
        </div>
        </div>
      <div id="container">
      </div>
      </div>
      '

  topRatedTemplate:
    '<div class="topRated">
    </div>'

  loadingTemplate:
    '<div class="loading">
      <i class="icon-spinner icon-spin icon-large"></i> please enter more ratings...
    </div>'

  initialize: ->
    setTimeout ->
      @$('.tip').tooltip({placement: 'auto'}).tooltip('show')
    , 1000
    @oldSubjects
    @initial = false
    @$el.append @template
    @$('#userBox').html '<div class="pull-right">'+@model.userObj.username+' <i class="icon-caret-down"></i></div>'
    @$el.append @loadingTemplate
    @$('#container').isotope({
      itemSelector : '.element',
      animationEngine: 'jquery'
    })
    setTimeout( ->
      @$('#container').isotope('reLayout')
    , 100 )

  events:
    "click .element": (e) ->

  handleRating: (ratingObject) ->
    _(@model).extend({idFetch: ratingObject.id, likeFetch: ratingObject.like})
    @model.fetch(
      error: (model, response) =>
        console.log('error model', model)
      success: (model, response) =>
        if @initial is false
          @handleFirstRating()
          @initial = true
        console.log('success res', response)
        @render(response)
    )

  handleFirstRating: ->
    @initialRender()
    @$('.loading').hide('slow')
    setTimeout( ->
      @$('.tip').tooltip('hide')
      @$('.tip2').tooltip({placement: 'bottom'}).tooltip('show')
    , 1000)
    setTimeout( ->
      @$('.tip2').tooltip('hide')
    , 10000)

  initialRender: ->
    @$el.append @topUsersTemplate
    @topUsersView = new TopUsersView(model: @model)
    @$('.topUsers').html @topUsersView.el
    @$el.append @topRatedTemplate
    @topRatedView = new TopRatedView(model: @model)
    @$('.topRated').html @topRatedView.el

  render: (res) ->
    @topUsersView.reRender(res)
    @topRatedView.translateRes(res)
    subsToAdd = _.difference(res.recommendations, @oldSubjects)
    subsToRemove = _.difference(@oldSubjects, res.recommendations)
    @oldSubjects = res.recommendations
    @$('#container').isotope( 'shuffle')
    for index, subjectid of subsToAdd
      newSubject = $('<div id="'+subjectid+'" class="element sprites '+(@model.userObj.subLookup[subjectid]).replace(/\s+/g, '').toLowerCase()+'">'+@model.userObj.subLookup[subjectid]+'</div>')
      @$('#container').isotope('insert', newSubject)
    for index, subjectid of subsToRemove
      removeSubject = @$('.'+(@model.userObj.subLookup[subjectid]).replace(/\s+/g, '').toLowerCase())
      @$('#container').isotope('remove', removeSubject)
    @$('#container').isotope( 'shuffle')
