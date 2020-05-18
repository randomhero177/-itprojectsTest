<template>
  <div class="main-wrap container-fluid">
    <div class="row main-wrap__row">
      <Header />
      <div class="col">
        <div class="content-pad">
          <div class="container" v-if="!Object.keys(currentTask).length">
            <div class="alert alert-error">
              <h1 class="page__title">Ошибка!</h1>
              <p>Кажется такой заметки не существует</p>
            </div>
          </div>
          <div v-else>
            <div class="form__item">
              <div class="heading row">
                <div class="col">
                  <h1 class="page__title">Редактировать заметку</h1>
                </div>
                <div class="col-auto">
                  <span
                      class="input input_inline icon"
                      v-if="canUndo"
                      v-tooltip.right="'Отменить предыдущее действие'"
                      v-on:click="unDo"
                  >
                    <font-awesome-icon icon="arrow-left" />
                  </span>
                  <span
                      class="input input_inline icon icon_back"
                      v-if="canRedo"
                      v-tooltip.bottom-start="'Вернуть отмененное действие'"
                      v-on:click="reDo"
                  >
                    <font-awesome-icon icon="arrow-left" />
                  </span>
                </div>
              </div>
              <div class="form__item">
                <div>
                  <span class="heading__title" >
                    <template v-if="isTitleEditable">
                      <input type="text" :value="taskList[taskId].title" @input="changeTitle($event)" class="input input_inline">
                    </template>
                    <template v-else>{{ taskList[taskId].title }}</template>
                  </span>

                  <span> - {{ taskList[taskId].deadline | moment("DD.MM.YYYY") }}</span>
                  <span v-if="!isTitleEditable" v-on:click="isTitleEditable = true" style="font-size: 20px; margin-left: 10px">
                    <font-awesome-icon icon="edit"/>
                  </span>
                  <span v-else v-on:click="isTitleEditable = false" style="font-size: 20px; margin-left: 10px"><font-awesome-icon icon="check-square"/></span>
                </div>
              </div>
              <ul class="task-list" v-for="(item, index) in this.taskList[this.taskId].taskList" :key="item.id">
                <li>
                  <span class="input-checkbox">
                    <input type="checkbox" :checked="item.active" @input="changeActiveStatus($event, index)">
                    <span class="input-checkbox__checked">
                      <font-awesome-icon icon="check" />
                    </span>
                  </span>
                  <input type="text" :value="item.title" @input="updateItem($event, index)" class="input input_inline">
                  <span class="icon icon_remove ml10" v-on:click="removeItem(index)">
                    <font-awesome-icon icon="trash-alt"/>
                  </span>
                </li>
              </ul>
              <div class="text-left form__item">
                <span class="icon" v-on:click="addItem">
                  <span class="icon_add">
                    <font-awesome-icon icon="plus-circle"/>
                  </span>
                  Добавить пункт
                </span>
              </div>
              <div>
                <div>
                  <button class="btn btn-remove" v-on:click.prevent="showModalDelete = true">
                    <span class="white"><font-awesome-icon icon="trash-alt"/></span>
                    Удалить задачу
                  </button>
                  <button class="btn btn-default" v-on:click="showModalDeleteChanges = true">
                    Отменить изменения
                  </button>
                  <button class="btn btn-success" v-on:click="saveEdits">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
            v-if="showModal"
        >
          <div>
            <div class="form__item">
              <h2>На странице остались не сохраненные данные.<br /> Все равно покинуть страницу?</h2>
            </div>
            <div class="text-right">
              <button class="btn btn-cancel" v-on:click.prevent="showModal = false">Отмена</button>
              <button class="btn btn-remove" v-on:click.prevent="leavePageWithoutSaving">Все равно покинуть</button>
              <button class="btn btn-success" v-on:click.prevent="saveEdits">Сохранить данные</button>
            </div>
          </div>
        </Modal>
        <transition name="slide-fade">
          <Modal
              v-if="showModalDelete"
          >
            <div>
              <div class="heading">
                <h2 class="heading__title">
                  Подтвердите удаление заметки
                </h2>
              </div>
              <div class="text-right">
                <button class="btn btn-cancel" v-on:click="showModalDelete = false">Отмена</button>
                <button class="btn btn-remove" v-on:click="deleteCurrentTask">Удалить</button>
              </div>
            </div>
          </Modal>
        </transition>
        <transition name="slide-fade">
          <Modal
              v-if="showModalDeleteChanges"
          >
            <div>
              <div class="heading">
                <h2 class="heading__title">
                  Отменить внесенные изменения?
                </h2>
              </div>
              <div class="text-right">
                <button class="btn btn-cancel" v-on:click="showModalDeleteChanges = false">Назад</button>
                <button class="btn btn-remove" v-on:click="backToOriginal">Отменить</button>
              </div>
            </div>
          </Modal>
        </transition>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
  import Modal from '@/components/Modal.vue';
  export default {
    name: "Edit",
    data: () => {
      return {
        taskId: null,
        currentTask: {},
        done: [],
        undone: [],
        original: null,
        isTitleEditable: false,
        isTaskSaved: false,
        showModal: false,
        showModalDelete: false,
        showModalDeleteChanges: false,
      };
    },
    computed: {
      ...mapState({
        originalTask: state => state.task.currentTask,
        taskList: state => state.task.taskList,
      }),
      canUndo() {
        return this.done.length > 1
      },
      canRedo() {
        return this.undone.length > 0
      },
      isTaskNeedToBeSaved() {
        return this.done.length > 1
      }
    },
    mounted() {
      this.taskId = this.$route.params.id;
      this.currentTask = this.taskList[this.taskId] ? this.taskList[this.taskId] : {};
      const original = JSON.parse(JSON.stringify(this.currentTask));
      this.$store.commit('task/updateOriginalTask', {id: this.taskId, data: original });
    },
    created() {
      this.$store.subscribe((mutation) => {
        this.done.push(mutation);
      })
    },
    methods: {
      ...mapActions({
        updateCurrentTask: 'task/updateCurrentTask',
        addItemToTaskList: 'task/addItemToTaskList',
        updateCurrentTaskListText: 'task/updateCurrentTaskListText',
        deleteItemFromTask: 'task/deleteItemFromTask',
      }),
      unDo() {
        this.undone.push(this.done.pop());
        this.done.forEach((mutation, index) => {
          const mutationName = mutation.type === 'task/updateOriginalTask' && index === 0
            ? 'task/changeCurrentTask' : mutation.type;
          this.$store.commit(mutationName, JSON.parse(JSON.stringify(mutation.payload)));
          this.done.pop();
        });
      },
      reDo() {
        let commit = this.undone.pop();
        this.$store.commit(commit.type, commit.payload);
      },
      changeTitle(e) {
        this.$store.commit('task/changeCurrentTaskTitle', {
          id: this.taskId,
          title: e.target.value,
        });
      },
      changeActiveStatus(e, index) {
        this.$store.commit('task/changeCurrentTaskStatus', {
          id: this.taskId,
          currentTaskId: index,
          active: e.target.checked,
        })
      },
      addItem() {
        this.addItemToTaskList({
          taskId: this.taskId,
          data: {
            title: 'Пункт',
            id: Math.random() * 100,
            active: true
          }
        });
      },
      updateItem(e, index) {
        this.updateCurrentTaskListText({
          id: this.taskId,
          currentTaskId: index,
          text: e.target.value,
        });
      },
      deleteCurrentTask() {
        this.$store.commit('task/deleteTask',{
          taskId: this.taskId
        });
        this.isTaskSaved = true;
        this.$router.push('/');
      },
      saveEdits() {
        this.isTaskSaved = true;
        this.$router.push('/');
      },
      removeItem(index) {
        this.deleteItemFromTask({
          currentTaskId: index,
          taskId: this.taskId,
        })
      },
      backToOriginal() {
        const data  = {
          id: this.taskId,
          data: JSON.parse(JSON.stringify(this.originalTask)),
        };
        this.done = [];
        this.undone = [];
        this.$store.commit('task/changeCurrentTask', data);
        this.showModalDeleteChanges = false;
      },
      leavePageWithoutSaving() {
        this.backToOriginal();
        this.isTaskSaved = true;
        this.$router.push('/');
      }
    },
    components: {
      Header,
      Footer,
      Modal,
    },
    beforeRouteLeave (to, from, next) {
      if (!this.isTaskNeedToBeSaved || this.isTaskNeedToBeSaved && this.isTaskSaved) {
        next()
      } else {
        next(false)
        this.showModal = true;
      }
    }
  }
</script>

<style scoped lang="stylus">
  .form-wrap
    padding 15px
    background #fff
    border-radius 3px
  .alert
    border-radius 3px
    border 1px solid #3e3e3e
    padding 30px
    &-error
      background #ee6e731f
  .white
    color white
  .task-list
    padding 0
    list-style none
  .ml10
    margin-left 10px
</style>