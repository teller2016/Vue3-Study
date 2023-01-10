<template>
  <div class="modal-wrapper">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Delete Todo
          </h5>
          <button type="button" class="close">
            <span @click="onClose">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          삭제하시겠습니까?
        </div>
        <div class="modal-footer">
          <button 
            type="button"
            class="btn btn-secondary" 
            @click="onClose"
            >Close
          </button>

          <button 
            type="button" 
            class="btn btn-danger"
            @click="onDelete"
            >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, {emit}) {
    const onClose = () => {
      emit('close');
    };

    const onDelete = () => {
      emit('delete');
    };

    return {
      onClose,
      onDelete,
    }
  }
}
</script>

<style scoped>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>