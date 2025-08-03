<script setup>
  import { ref, reactive, computed } from 'vue';
  import Task from './components/Task.vue';
  import Filter from './components/Filter.vue';
  import ModalWindow from './components/modal/ModalWindow.vue';
  import AddTaskModal from './components/modal/AddTaskModal.vue';
  // import { useTasksStore } from "./stores/tasksStore.js";
  import { useTasksStore } from '@/stores/tasksStore.js';


  // ref for Primitives : number, strings, boolean etc
  const appName = 'Task Manager with Pinia';
  // access the `store` variable anywhere in the component ✨
  const store = useTasksStore();

  store.$subscribe((mutation, state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  });

</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>{{ appName }}</h1>      
      </div>
      <div class="header-side">
        <button class="btn secondary" @click="store.opneModal">+ Add Task</button>  
      </div>
    </div>

    <!-- Filters -->
    <!-- <Filter :filterBy="filterBy" @setFilter="setFilter"></Filter> -->
    <Filter />
     
    <!-- Tasks -->
    <div class="tasks">
      <!-- <Task @toggleCompleted="toggleCompleted" v-for="(task, index) in tasks" :key="index" :task="task"></Task> -->
        <Task 
          v-for="task in store.filteredTasks" 
          :key="task.id" 
          :task="task" 
          @toggleCompleted="toggleCompleted">
        </Task>
    </div>

    
    <!-- Add Task Form -->    
    <ModalWindow v-if="store.modalIsActive">
      <AddTaskModal></AddTaskModal>
    </ModalWindow>

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
