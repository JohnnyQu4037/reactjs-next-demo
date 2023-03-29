<template>
    <a-modal
        v-model:visible="visible"
        width="800px"
        :title="state.title"
        :mask-closable="false"
        :ok-text="state.okText"
        :confirm-loading="state.loading"
        destroy-on-close
        @ok="handleOk"
    >
        <single-account-form ref="formRef" :account="props.account" />
    </a-modal>
</template>
<script setup lang="ts">
import { ref, reactive, watch, getCurrentInstance } from 'vue';
import SingleAccountForm from './SingleAccountForm.vue';
import { updateAccount, createAccount } from '@/api/user';

const app = getCurrentInstance();
const $message = app.appContext.config.globalProperties.$message;

const props = defineProps<{
    account: ACCOUNT.AccountData | {};
}>();

const formRef = ref();
const emit = defineEmits(['submit']);
const visible = ref(false);

const state: {
    title: string;
    okText: string;
    loading: boolean;
} = reactive({
    title: 'Add New User',
    okText: 'Save',
    loading: false,
});

const toggle = () => {
    visible.value = !visible.value;
};

const handleOk = async () => {
    try {
        const formData = await formRef.value.validate();
        state.loading = true;
        const {
            email,
            username,
            first_name,
            last_name,
            mobile,
            is_active,
            password,
            permission_id,
        } = formData;
        const params = {
            email,
            username,
            first_name,
            last_name,
            mobile,
            password,
            is_active,
            permission_id,
        };
        if (formData.id) {
            const { id } = formData;
            params.id = id;
            const { msg } = await updateAccount([params]);
            $message.success(msg);
        } else {
            const { msg } = await createAccount(params);
            $message.success(msg);
        }
        state.loading = false;
        toggle();
        emit('submit');
    } catch (e) {
        state.loading = false;
        console.log(e);
    }
};

watch(
    () => props.account,
    (val) => {
        if (val.id) {
            state.title = 'Update Existing User';
            state.okText = 'Update';
        } else {
            state.title = 'Add New User';
            state.okText = 'Save';
        }
    },
);

defineExpose({
    toggle,
});
</script>
