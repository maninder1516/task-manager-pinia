<script setup>
import { reactive } from 'vue';
import Task from './components/Task.vue';


// ref for Primitives : number, strings, boolean etc
const appName = 'Task Manager with Pinia';

// reactive for array, objects, etc
let tasks= reactive([
    {
      name: "Website design",
      description: "Define the style guide, branding and create the webdesign on Figma.",
      completed: true,
      id: 1
    },
    {
      name: "Website development",
      description: "Develop the portfolio website using Vue JS.",
      completed: false,
      id: 2
    },
    {
      name: "Hosting and infrastructure",
      description: "Define hosting, domain and infrastructure for the portfolio website.",
      completed: false,
      id: 3
    },
    {
      name: "Composition API",
      description: "Learn how to use the composition API and how it compares to the options API.",
      completed: true,
      id: 4
    },
    {
      name: "Pinia",
      description: "Learn how to setup a store using Pinia.",
      completed: true,
      id: 5
    },
    {
      name: "Groceries",
      description: "Buy rice, apples and potatos.",
      completed: false,
      id: 6
    },
    {
      name: "Bank account",
      description: "Open a bank account for my freelance business.",
      completed: false,
      id: 7
    }
]);

const newTask = { completed: false, name: '', description: '' };

function addTask(){
  if(newTask.name && newTask.description) {
    // Create a new task object
    const task = {
      id: Math.max(...tasks.map(task => task.id)) + 1, // Generate a new ID based on existing tasks
      name: newTask.name,
      description: newTask.description,
      completed: newTask.completed
    };

    // Push the new task to the tasks array
    tasks.push(task);
    
    // Reset the newTask object
    newTask.name = '';
    newTask.description = '';
  } else {
    alert('Please enter the title and description for the task.');
  }
}

function toggleCompleted(taskId) {
  tasks.forEach(task => {
    if (task.id === taskId) {
      task.completed = !task.completed; // Toggle the completed status
    }
  });
}

</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>{{ appName }}</h1>      
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div>
          <p>Filters</p>
          <div class="badges">
            <span class="badge">To-Do</span>
            <span class="badge">Done</span>
            <span class="clear">x clear</span>
          </div>
      </div>
    </div>
     
    <!-- Tasks -->
    <div class="tasks">
      <Task @toggleCompleted="toggleCompleted" v-for="(task, index) in tasks" :key="index" :task="task"></Task>      
    </div>

    <div class="add-task">
      <h3>Add a new task</h3>
      <input v-model="newTask.name" type="text" name="title" placeholder="Enter a title..."><br />
      <textarea v-model="newTask.description" name="description" rows="4" placeholder="Enter a description..." /><br />
      <button @click="addTask" class="btn gray">Add Task</button>

    </div>
    
  </main>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }

}

.filters {
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 14px 0;
    align-items: center;
  }

  .clear {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
  }

}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input, textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}

</style>
