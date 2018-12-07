import { generate as id } from 'shortid';
import { Dispatcher, ReduceStore } from './flux';

const taskDispatcher = new Dispatcher();

const CREATE_TASK = `CREATE_TASK`;
const COMPLETE_TASK = `COMPLETE_TASK`;
const SHOW_TASK = `SHOW_TASK`;

const createNewTaskAction = content => {
  return {
    type: CREATE_TASK,
    value: content
  };
};

const showTasksAction = show => {
  return {
    type: SHOW_TASK,
    value: show
  };
};

const compleTaskAction = (id, isComplete) => {
  return {
    type: COMPLETE_TASK,
    id,
    value: isComplete
  };
};

class TaskStore extends ReduceStore {
  getInitialState() {
    return {
      tasks: [
        {
          id: id(),
          content: 'Update css style',
          complete: false
        },
        {
          id: id(),
          content: 'Add unit test',
          complete: false
        },
        {
          id: id(),
          content: 'Post to social media',
          complete: false
        }
      ],
      showComplete: true
    };
  }

  reduce(state, action) {
    console.log('Reducing...', state, action);
    return state;
  }
  getState() {
    return this.__state;
  }
}

const TaskComponent = ({ content, complete, id }) =>
  `<section>${content}<input type="checkbox" name="taskCompleteCheck" data-taskid=${id} ${
    complete ? 'checked' : ''
  }/></section>`;

const taskStore = new TaskStore(taskDispatcher);

const render = () => {
  const tasksSection = document.getElementById(`tasks`);
  const state = taskStore.getState();
  const rendered = state.tasks
    .filter(task => (state.showComplete ? true : !task.complete))
    .map(TaskComponent)
    .join('');
  tasksSection.innerHTML = rendered;
};

document.forms.newTask.addEventListener(`submit`, e => {
  e.preventDefault();
  const name = e.target.newTaskName.value;
  if (name) {
    taskDispatcher.dispatch(createNewTaskAction(name));
    e.target.newTaskName.value = null;
  }
});

document
  .getElementById(`showComplete`)
  .addEventListener(`change`, ({ target }) => {
    const showComplete = target.checked;
    taskDispatcher.dispatch(showTasksAction(showComplete));
  });

taskDispatcher.dispatch(`TEST_DISPATCH`);
render();
