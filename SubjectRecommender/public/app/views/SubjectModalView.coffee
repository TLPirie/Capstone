class window.SubjectModalView extends Backbone.View

  template:
    '<div>
    <h1>appended<h2>
    </div>'

  initialize: ->
    @$el.append @template

  render: (res) ->