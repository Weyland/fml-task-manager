'use strict';

var DependencyManager = require('fml-dependency-manager').DependencyManager;
var TaskNode = require('./TaskNode');

class TaskManager extends DependencyManager {
  constructor() {
    super();
  }

  createTask(name, dependencies, options) {
    var task = new TaskNode(name, dependencies, options);
    return this.createNode(task);
  }

  // Starts a new asynchronous chain for a task list, and
  startTask(taskName) {
    var taskResultCache = {};
    return this.getChain(taskName).reduce((chain, task) => chain.then((taskResult) => {
      return task.start.apply(task, task.dependencies.map(depName => taskResultCache[depName]))
        .then((taskResult) => {
          taskResultCache[task.name] = taskResult;
        });
    }), Promise.resolve());
  }
}

module.exports = TaskManager;
