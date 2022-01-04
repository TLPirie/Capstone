class window.SubModal extends Backbone.Model

  url: ->
    "/subjectLikes/?:subjectId=" + @subjectId

  initialize: ->

  render: ->
