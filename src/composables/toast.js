import { onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();

    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const showToast = computed(() => store.state.showToast);
    const timeout = computed(() => store.state.timeout);

    const triggerToast = (message, type) => {
        showToast.value = true;
        toastMessage.value = message;
        toastAlertType.value = type;

        timeout.value = setTimeout(() => {
            toastMessage.value = '';
            showToast.value = false;
            toastAlertType.value = '';
        }, 3000);
    }

    onUnmounted(() => {
        clearTimeout(timeout.value);
    });

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
};