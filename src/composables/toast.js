import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
    // const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
    // const toastAlertType = computed(() => store.state.toast.toastAlertType);
    // const showToast = computed(() => store.state.toast.showToast);
    const toasts = computed(() => store.state.toast.toasts);

    const triggerToast = (message, type) => {
        store.dispatch('toast/triggerToast', {message, type});
    }

    return {
        // toastMessage,
        // toastAlertType,
        // showToast,
        toasts,
        triggerToast,
    }
};