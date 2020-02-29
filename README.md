## Explanations

* componentDidMount- When browsers is reloaded all the todo items from the local storage will mount. 

* handleSubmit- This resets the input field after its been submitted.

* addTodo- The variable todoItems is how the state is set up, and gets pushed into the array todos and sent to local storage. 

* taskCompleted- When the checkbox is completed, the state changes the task complete from false to true. 

id- Id is generated from a library called shortid. Here is is grabbing the current id of selected task.

value- captures the value of the input. Grabbing the current value of the input.

complete- the state of a task is being changed to complete when clicked.

children- Set as array for multiple children of the parent to do. Grabbing the current array of children.

*  ChildTaskCompleted- Taking in the index of the todos. childIndex of the child. 

<!-- finish later-->