import { ref, onUnmounted } from 'vue';

export const useToast = () => {
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeout = ref(null);

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