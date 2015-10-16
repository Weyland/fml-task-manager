'use strict';

var DependencyManager = require('fml-dependency-manager').DependencyManager;

var TaskNode = require('./TaskNode');

/**
 * TaskManager
 */
class TaskManager extends DependencyManager {

	constructor() {
		super();
	}

	/**
	 * Create a new task.
	 * @param  {String}   taskName
	 * @param  {Array}    dependencies
	 * @param  {Function} _callback
	 * @return {TaskNode}
	 */
	createTask(taskName, dependencies, _callback) {
		var task = new TaskNode(taskName, dependencies, _callback);
		return this.createNode(task);
	}

	/**
	 * Start the task using it's name as identifier.
	 * @param  {String}  taskName The name of the task you want to start
	 * @return {Promise}
	 */
	startTask(taskName) {
		var taskResultCache = {};
		return this.getChain(taskName)
			.reduce((chain, task) => chain.then(() => {
				return task.start.apply(task, task.dependencies.map(depName => taskResultCache[depName]))
					.then((taskResult) => {
						taskResultCache[task.name] = taskResult;
					});
			}), Promise.resolve());
	}
}

module.exports = TaskManager;
