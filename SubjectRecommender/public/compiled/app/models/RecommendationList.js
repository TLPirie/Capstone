// Generated by CoffeeScript 1.12.2
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.RecommendationList = (function(superClass) {
    extend(RecommendationList, superClass);

    function RecommendationList() {
      return RecommendationList.__super__.constructor.apply(this, arguments);
    }

    RecommendationList.prototype.url = function() {
      return "/newRating/?:userId=" + this.userObj.userId + "&subject[id]=" + this.idFetch + "&subject[like]=" + this.likeFetch;
    };

    RecommendationList.prototype.initialize = function() {
      var subModal;
      return this.set('subjectModal', subModal = new SubjectModal());
    };

    RecommendationList.prototype.render = function() {};

    return RecommendationList;

  })(Backbone.Model);

}).call(this);
