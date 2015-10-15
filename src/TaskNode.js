'use strict';

var DependencyNode = require('fml-dependency-manager').DependencyNode;

/**
 * The different kind of state a task can be in.
 * @type {Object}
 */
const TASK_STATE = {
	STARTED: 'started',
	STOPPED: 'stopped',
	BUSY: 'busy',
	ERROR: 'error'
};

/**
 * TaskNode
 */
class TaskNode extends DependencyNode {

	/**
	 * Default constructor.
	 * @param  {String}   name
	 * @param  {Array}    dependencies
	 * @param  {Function} _callback
	 */
	constructor(name, dependencies, _callback) {
		super(name, dependencies);

		/**
		 * The callback that run's on start.
		 * @type {Function}
		 */
		this._callback = _callback;

		/**
		 * The state of the task.
		 * @type {const}
		 */
		this._state = TASK_STATE.STOPPED;
	}

	/**
	 * Start the task.
	 * @return {Promise}
	 */
	start() {
		this._state = TASK_STATE.STARTED;
		console.log(`Executing task ${this.name}`);

		return Promise
			.resolve(this._callback.apply(this, arguments))
			.then(value => {
				this._state = TASK_STATE.STOPPED;
				console.log(`Task ${this.name} completed`);
				return value;
			});
	}
}

module.exports = TaskNode;
