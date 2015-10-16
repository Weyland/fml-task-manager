# fml-task-manager

## Installation
Simply use `npm install fmp-task-manager` to install.

## Example
The following example shows you how to register a new task:

	var TaskManager = require('fml-task-manager').TaskManager;
	var taskManager = new TaskManager();
	
	taskManager.createTask('build-test', [], () => {
		return new Promise((resolve, reject) => {
			resolve({
				value: true
			});
		});
	});
	taskManager.createTask('package', ['build-test'], (buildTest) => {
		console.log('Building package has completed.', buildTest);
	});
	
After registration, you can execute the tasks in the correct order by calling a package.

	taskManager
		.startTask('package')
		.then(() => {
			console.log('Task completed successfully.');
		})
		.catch(error => {
			console.error(error);
		});
