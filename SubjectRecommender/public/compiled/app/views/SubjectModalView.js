// Generated by CoffeeScript 1.12.2
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.SubjectModalView = (function(superClass) {
    extend(SubjectModalView, superClass);

    function SubjectModalView() {
      return SubjectModalView.__super__.constructor.apply(this, arguments);
    }

    SubjectModalView.prototype.template = '<div> <h1>appended<h2> </div>';

    SubjectModalView.prototype.initialize = function() {
      return this.$el.append(this.template);
    };

    SubjectModalView.prototype.render = function(res) {};

    return SubjectModalView;

  })(Backbone.View);

}).call(this);
