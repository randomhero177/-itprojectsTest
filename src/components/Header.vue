<template>
  <div class="col-auto">
    <ul class="navigation-list">
      <li class="navigation-list__item">
        <router-link to="/" class="navigation-list__item-link" exact-active-class="navigation__item_active">ToDo App</router-link>
      </li>
      <li class="navigation-list__item navigation-list__item-icon">
            <span v-on:click="showModal = true" class="icon">
              <font-awesome-icon icon="plus-square"/> Добавить заметку
            </span>
      </li>
    </ul>
    <transition name="slide-fade">
      <Modal
          v-if="showModal"
      >
        <Add @onCancel="showModal = false"/>
      </Modal>
    </transition>
  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue';
  import Add from '@/components/Add.vue';
  export default {
    name: 'Header',
    data() {
      return {
        showModal: false,
      };
    },
    computed: {

    },
    components: {
      Modal,
      Add,
    },
  }
</script>

<style scoped lang="stylus">

</style>
