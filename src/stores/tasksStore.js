import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

// We can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useTasksStore = defineStore('tasks', () => {
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

    let filterBy = ref(''); // This will hold the filter value


    function setFilter(value) {
        filterBy.value = value;
    }

    // A computed ref
    const filteredTasks = computed(() => {
        switch (filterBy.value) {
            case "todo":
                return tasks.filter((task) => !task.completed);
            case "done":
                return tasks.filter((task) => task.completed);
            default:
                return tasks;
        }
    });

    function addTask(newTask){
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

    
    return { tasks, filterBy, setFilter, filteredTasks, addTask, toggleCompleted };
});