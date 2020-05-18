<template>
  <div class="main-wrap container-fluid">
    <div class="row main-wrap__row">
      <Header />
      <div class="col">
        <div class="content-pad">
          <div v-if="!taskList.length" class="text-center">
            <h1 class="form__item">Создайте свою первую заметку</h1>
            <span v-on:click="showModal = true" class="icon home__empty-icon"><font-awesome-icon icon="plus-circle"/></span>
          </div>
          <div v-else>
            <div class="form__item">
              <h1 class="page__title">Список заметок</h1>
            </div>
            <div class="row">
              <div v-for="(item, index) in taskList" :key="index" class="col-md-3 col-sm-12">
                <div class="form__item">
                  <div class="form__elem">
                    <h2><router-link :to="`/edit/${index}`" class="home__link">{{ item.title }}</router-link></h2>
                  </div>
                  <div class="form__elem">
                    <span v-for="(el, index) in item.taskList" :key="el.id">
                      <span v-if="index < 3">
                        {{ el.title }}{{ index === 2 ? '.' : ',' }}
                      </span>
                    </span>
                  </div>
                  <div>
                    <i>{{ item.deadline | moment("DD.MM.YYYY") }}</i>
                    <span class="icon icon_remove" style=" margin-left: 10px" v-on:click="openRemoveModal(index)">
                      <font-awesome-icon icon="trash-alt" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <transition name="slide-fade">
            <Modal
                v-if="showModal"
            >
              <Add @onCancel="showModal = false"/>
            </Modal>
          </transition>
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
                  <button class="btn btn-remove" v-on:click="removeItem">Удалить</button>
                </div>
              </div>
            </Modal>
          </transition>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
  import Modal from '@/components/Modal.vue';
  import Add from '@/components/Add.vue';

  export default {
    name: "Home",
    data() {
      return {
        showModal: false,
        showModalDelete: false,
        currentItemToRemove: null,
      };
    },
    computed: {
      ...mapState({
        taskList: state => state.task.taskList,
      })
    },
    methods: {
      openRemoveModal(id) {
        this.showModalDelete = true;
        this.currentItemToRemove = id;
      },
      removeItem() {
        this.$store.commit('task/deleteTask',{
          taskId: this.currentItemToRemove
        });
        this.showModalDelete = false;
      }
    },
    components: {
      Footer,
      Header,
      Modal,
      Add,
    }
  }
</script>

<style scoped lang="stylus">
  .home
    &__link
      color #333
    &__empty-icon
      font-size 60px
      color #ee6e73
    &__descr
      &-item + .home__descr-item
        margin-left 10px
</style>