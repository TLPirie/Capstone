class window.RecommendationList extends Backbone.Model

  url: ->
    "/newRating/?:userId=" + @userObj.userId + "&subject[id]=" + @idFetch + "&subject[like]=" + @likeFetch

  initialize: ->
    @set 'subModal', subModal = new SubModal()

  render: ->
