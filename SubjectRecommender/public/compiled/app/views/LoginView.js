// Generated by CoffeeScript 1.12.2
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.LoginView = (function(superClass) {
    extend(LoginView, superClass);

    function LoginView() {
      return LoginView.__super__.constructor.apply(this, arguments);
    }

    LoginView.prototype.template = '<div class="row" style="margin-top:100px;"> <div class="col-lg-4"></div> <div class="col-lg-4"> <h1 class="coverheader">What&#39s Next?</h1> <blockquote style="font-size: 1.5em;"> a subject recommendation system for UTS students</blockquote> <h1></h1> <div class="well"> <div class="input-group"> <input type="text" class="form-control" placeholder="enter a new or existing username"> <span class="input-group-btn"> <button id="submitButton" class="btn btn-default" type="button">Go</button> </a> </span> </div> </div> <div class="col-lg-4"></div> </div> </div> <div class="row" style="margin-top:50px;"> <div class="col-lg-2"></div> <div class="col-lg-8"> <div class="row"> <div class="col-lg-3"> <div class="coversprites fimage cover1"> <div class="coverlayer"> <p class="covertext ct1"> <i class="icon-edit"></i> Enter a Username </p> </div> </div> </div> <div class="col-lg-3"> <div class="coversprites fimage cover2"> <div class="coverlayer"> <p class="covertext ct2"> <i class="icon-check-sign"></i> Rate your classes! </p> </div> </div> </div> <div class="col-lg-3"> <div class="coversprites fimage cover4"> <div class="coverlayer"> <p class="covertext ct3"> <i class="icon-group"></i> See similar classes </p> </div> </div> </div> <div class="col-lg-3"> <div class="coversprites fimage cover3"> <div class="coverlayer"> <p class="covertext ct4"> <i class="icon-book"></i> Get recommendations from similar users </p> </div> </div> </div> </div> </div> <div class="col-lg-2"></div> </div>';

    LoginView.prototype.initialize = function() {
      this.render();
      return $(document).ready(function() {
        var mosimg;
        mosimg = new Image();
        return mosimg.src = "/img/collage2.png";
      });
    };

    LoginView.prototype.events = {
      "click #submitButton": 'getUser',
      "keyup :input": 'checkEnter'
    };

    LoginView.prototype.checkEnter = function(e) {
      console.log(e);
      if (e.which === 13) {
        return this.getUser();
      }
    };

    LoginView.prototype.getUser = function() {
      this.username = this.$('input').val();
      _(this.model).extend({
        name: this.username
      });
      return this.model.fetch({
        error: (function(_this) {
          return function(model, response) {
            return console.log('model', model);
          };
        })(this),
        success: (function(_this) {
          return function(model, response) {
            return _this.userInfoReceived(response);
          };
        })(this)
      });
    };

    LoginView.prototype.userInfoReceived = function(userObject) {
      console.log('userinfo');
      return this.trigger('userInfoReceived', userObject);
    };

    LoginView.prototype.render = function() {
      return this.$el.append(this.template);
    };

    return LoginView;

  })(Backbone.View);

}).call(this);