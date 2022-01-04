class window.App extends Backbone.Model

  initialize: ->
    @set 'loginInfo', loginInfo = new LoginInfo()
    @set 'subjectList', subjectList = new SubjectList()
    @set 'recommendationList', recommendationList = new RecommendationList()