'use strict';

var $ = require('jquery');
var Handlebars = require('handlebars');
var Router = require('director/build/director').Router;
var util = require('./util');

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

exports.init = function () {
  this.todos = util.store('todos-jquery');
  this.cacheElements();
  this.bindEvents();

  Router({
    '/:filter': function (filter) {
      this.filter = filter;
      this.render();
    }.bind(this)
  }).init('/all');
};

exports.cacheElements = function () {
  this.todoTemplate = Handlebars.compile($('#todo-template').html());
  this.footerTemplate = Handlebars.compile($('#footer-template').html());
  this.$todoApp = $('#todoapp');
  this.$header = this.$todoApp.find('#header');
  this.$main = this.$todoApp.find('#main');
  this.$footer = this.$todoApp.find('#footer');
  this.$newTodo = this.$header.find('#new-todo');
  this.$toggleAll = this.$main.find('#toggle-all');
  this.$todoList = this.$main.find('#todo-list');
  this.$count = this.$footer.find('#todo-count');
  this.$clearBtn = this.$footer.find('#clear-completed');
};

exports.bindEvents = function () {
  var list = this.$todoList;
  this.$newTodo.on('keyup', this.create.bind(this));
  this.$toggleAll.on('change', this.toggleAll.bind(this));
  this.$footer.on('click', '#clear-completed', this.destroyCompleted.bind(this));
  list.on('change', '.toggle', this.toggle.bind(this));
  list.on('dblclick', 'label', this.edit.bind(this));
  list.on('keyup', '.edit', this.editKeyup.bind(this));
  list.on('focusout', '.edit', this.update.bind(this));
  list.on('click', '.destroy', this.destroy.bind(this));
};

exports.render = function () {
  var todos = this.getFilteredTodos();
  this.$todoList.html(this.todoTemplate(todos));
  this.$main.toggle(todos.length > 0);
  this.$toggleAll.prop('checked', this.getActiveTodos().length === 0);
  this.renderFooter();
  this.$newTodo.focus();
  util.store('todos-jquery', this.todos);
};

exports.renderFooter = function () {
  var todoCount = this.todos.length;
  var activeTodoCount = this.getActiveTodos().length;
  var template = this.footerTemplate({
    activeTodoCount: activeTodoCount,
    activeTodoWord: util.pluralize(activeTodoCount, 'item'),
    completedTodos: todoCount - activeTodoCount,
    filter: this.filter
  });

  this.$footer.toggle(todoCount > 0).html(template);
};

exports.toggleAll = function (e) {
  var isChecked = $(e.target).prop('checked');

  this.todos.forEach(function (todo) {
    todo.completed = isChecked;
  });

  this.render();
};

exports.getActiveTodos = function () {
  return this.todos.filter(function (todo) {
    return !todo.completed;
  });
};

exports.getCompletedTodos = function () {
  return this.todos.filter(function (todo) {
    return todo.completed;
  });
};

exports.getFilteredTodos = function () {
  if (this.filter === 'active') {
    return this.getActiveTodos();
  }

  if (this.filter === 'completed') {
    return this.getCompletedTodos();
  }

  return this.todos;
};

exports.destroyCompleted = function () {
  this.todos = this.getActiveTodos();
  this.filter = 'all';
  this.render();
};

// accepts an element from inside the `.item` div and
// returns the corresponding index in the `todos` array
exports.indexFromEl = function (el) {
  var id = $(el).closest('li').data('id');
  var todos = this.todos;
  var i = todos.length;

  while (i--) {
    if (todos[i].id === id) {
      return i;
    }
  }
};

exports.create = function (e) {
  var $input = $(e.target);
  var val = $input.val().trim();

  if (e.which !== ENTER_KEY || !val) {
    return;
  }

  this.todos.push({
    id: util.uuid(),
    title: val,
    completed: false
  });

  $input.val('');

  this.render();
};

exports.toggle = function (e) {
  var i = this.indexFromEl(e.target);
  this.todos[i].completed = !this.todos[i].completed;
  this.render();
};

exports.edit = function (e) {
  var $input = $(e.target).closest('li').addClass('editing').find('.edit');
  $input.val($input.val()).focus();
};

exports.editKeyup = function (e) {
  if (e.which === ENTER_KEY) {
    e.target.blur();
  }

  if (e.which === ESCAPE_KEY) {
    $(e.target).data('abort', true).blur();
  }
};

exports.update = function (e) {
  var el = e.target;
  var $el = $(el);
  var val = $el.val().trim();

  if ($el.data('abort')) {
    $el.data('abort', false);
    this.render();
    return;
  }

  var i = this.indexFromEl(el);

  if (val) {
    this.todos[i].title = val;
  } else {
    this.todos.splice(i, 1);
  }

  this.render();
};

exports.destroy = function (e) {
  this.todos.splice(this.indexFromEl(e.target), 1);
  this.render();
}
