<template>
  <div class="form-wrap">
    <form action="" class="form">
      <h2 class="form__item form__title">Добавить новую заметку</h2>
      <div class="form__item row">
        <div class="col-6">
          <input type="text" class="input" v-model="title" placeholder="Заголовок">
        </div>
        <div class="col-6">
          <datepicker
            v-model="deadline"
            placeholder="Срок"
            :monday-first="true"
            :format="format"
          />
        </div>
      </div>
      <div class="form__item task-list text-left">
        <div class="task-list__item row align-items-center" v-for="(item, index) in taskList" :key="item.id">
          <div class="col">
            <input type="text" class="input" v-model="item.title">
          </div>
          <div class="col-auto">
            <span class="icon icon_remove" v-on:click="removeItem(index)">
              <font-awesome-icon icon="trash-alt"/>
            </span>
          </div>
        </div>
      </div>
      <div class="text-left form__item">
        <span class="icon" v-on:click="addItem">
          <span class="icon_add">
            <font-awesome-icon icon="plus-circle"/>
          </span>
          Добавить пункт
        </span>
      </div>
      <div class="text-right">
        <button class="btn btn-cancel" v-on:click.prevent="cancelCreate">Отмена</button>
        <button class="btn btn-success" v-on:click.prevent="addTask">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    name: "Add",
    data: () => {
      return {
        title: '',
        taskList: [],
        deadline: null,
        format: 'yyyy-MM-dd',
      }
    },
    computed: {
      ...mapState({

      })
    },
    methods: {
      addTask() {
        const taskModel = {
          title : this.title,
          taskList: this.taskList,
          deadline: this.deadline,
        };
        this.$store.commit('task/createNewTask', taskModel)
        this.$emit('onCancel');
      },
      cancelCreate() {
        this.$emit('onCancel');
      },
      addItem() {
        this.taskList.push({
          title: 'Пункт',
          id: Math.random() * 100,
          isCheck: false
        });
      },
      removeItem(index) {
        this.taskList.splice(index, 1);
      },
    }
  }
</script>

<style scoped lang="stylus">
  .form-wrap
    padding 15px
    background #fff
    border-radius 3px
</style>