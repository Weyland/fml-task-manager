'use strict';

var DependencyNode = require('fml-dependency-manager').DependencyNode;

const TASK_STATE = {
  STARTED: 'started',
  STOPPED: 'stopped',
  BUSY: 'busy',
  ERROR: 'error'
};

class TaskNode extends DependencyNode {
  constructor(name, dependencies, _callback) {
    super(name, dependencies);

    this._callback = _callback;
    this._state = TASK_STATE.STOPPED;
  }

  start() {
    this._state = TASK_STATE.STARTED;
    return Promise.resolve(this._callback.apply(this, arguments))
      .then(value => {
        this._state = TASK_STATE.STOPPED;
        return value;
      });
  }
}

module.exports = TaskNode;
