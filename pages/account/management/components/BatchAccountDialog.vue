<template>
    <a-modal
        v-model:visible="visible"
        width="800px"
        title="Batch Update User Permission"
        :mask-closable="false"
        ok-text="update"
        :confirm-loading="state.loading"
        :ok-button-props="{
            disabled: !canSubmit,
        }"
        @ok="handleOk"
    >
        <a-form ref="formRef" layout="vertical" :model="state.form">
            <a-form-item label="Role Selection" name="permission_id">
                <a-select
                    v-model:value="state.form.permission_id"
                    placeholder="Please Select Role"
                    label-in-value
                    @change="handleRoleChange"
                >
                    <a-select-option
                        v-for="role in state.roles"
                        :key="role.id"
                        :value="role.id"
                        >{{ role.permission_name }}</a-select-option
                    >
                </a-select>
            </a-form-item>
            <a-form-item label="Permission" name="permission">
                <ace-editor v-model:value="state.form.permission" readonly />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup lang="ts">
import AceEditor from '@/components/AceEditor/index.vue';
import {
    ref,
    reactive,
    watch,
    onMounted,
    computed,
    getCurrentInstance,
} from 'vue';
import { usePermissionStore } from '@/store/modules/permission';

import { updateAccount } from '@/api/user';

const app = getCurrentInstance();
const $message = app.appContext.config.globalProperties.$message;

const props = defineProps<{
    ids: number[];
}>();

const emit = defineEmits(['submit']);
const formRef = ref();
const visible = ref(false);
const permissionStore = usePermissionStore();

const state: {
    form: {
        permission: string;
        role: string;
        permission_id: number | null;
    };
    loading: boolean;
    roles: PERMISSION.PermissionData[];
} = reactive({
    form: {
        permission: '',
        role: '',
        permission_id: null,
    },
    loading: false,
    roles: [],
});

const canSubmit = computed(() => !!state.form.permission_id);

const toggle = () => {
    visible.value = !visible.value;
};

const handleGetRoles = async () => {
    state.roles = await permissionStore.getPermissions();
};

const handleRoleChange = ({ key, label }) => {
    state.form.role = label[0].children;
    handleSetPermission(key);
};

const handleSetPermission = (key: number) => {
    const permission = state.roles.find(({ id }) => key === id)?.permission;
    if (permission) {
        state.form.permission = JSON.stringify(permission, null, 2);
    }
};

const handleOk = async () => {
    try {
        state.loading = true;
        const { permission_id } = state.form;
        const params = props.ids.map((id) => ({ id, permission_id }));
        const { msg } = await updateAccount(params);
        state.loading = false;
        $message.success(msg);
        toggle();
        emit('submit');
    } catch (e) {
        state.loading = false;
        console.log(e);
    }
};

watch(visible, (val) => {
    if (!val) {
        formRef.value.resetFields();
    }
});

onMounted(() => {
    handleGetRoles();
});

defineExpose({
    toggle,
});
</script>
