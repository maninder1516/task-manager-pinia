<script setup>
  import { useTasksStore } from '@/stores/tasksStore.js';
  // access the `store` variable anywhere in the component ✨
  const store = useTasksStore();
 
</script>

<template>
    <div class="filters">
      <div>
          <p>Filters</p>
          <div class="badges">
            <!-- <span @click="$emit('setFilter', 'todo')" class="badge" :class="{ selected: filterBy === 'todo' }">To-Do</span> -->
            <span @click="store.setFilter('todo')"class="badge" :class="{ selected: store.filterBy === 'todo' }">To-Do</span>
            <span @click="store.setFilter('done')" class="badge" :class="{ selected: store.filterBy === 'done' }">Done</span>
            <span @click="store.setFilter('')" class="clear" v-if="store.filterBy">x clear</span>
          </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
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

    .badge {
      padding: 8px 7px;
      background-color: var(--gray-color);
      color: var(--black-color);
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;

      &.selected {
        background-color: #e42c5f;
        color: var(--white-color);
      }
    }
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
</style>