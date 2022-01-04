class window.TopRatedView extends Backbone.View

  template: '
      <div>
      <h2>Top Rated
      <a class="tip5" data-toggle="tooltip" data-placement="right" title="These are the best rated subjects overall with the exclusion of outliers.">
        <i class="icon-info-sign smallicon"></i>
      </a>
      </h2>
      <div id="toprated">
      </div>
      </div>
      '

  initialize: ->
    @oldRated
    @$el.append @template
    @$('.tip5').tooltip('hide')
    @$('#toprated').isotope({
      itemSelector : '.element',
      animationEngine: 'jquery'
    })
    setTimeout( ->
      @$('#toprated').isotope('reLayout')
    , 100 )

  translateRes: (res) ->
    @scoreImport = res.bestScores
    @subjectArray = []
    @scoreArray = []
    @scoreLength = @scoreImport.length
    for index, value of @scoreImport
      if index%2 is 0
        @subjectArray.push(value)
      else
        @scoreArray.push(value)
    @reRender()


  reRender: ->
    @$('#toprated').isotope('remove', @$('#toprated').children())
    for index, subjectid of @subjectArray
      @subject = @model.userObj.subLookup[subjectid] || 'newSubject'
      newSubject = $('<div id="'+subjectid+'" class="element sprites '+@subject.replace(/\s+/g, '').toLowerCase()+'">'+@subject+'</br><div class="rating">'+@scoreArray[index].substring(0,4)+'</div></div>')
      @$('#toprated').isotope('insert', newSubject)
    @$('#toprated').isotope({ sortBy : 'rating' });

