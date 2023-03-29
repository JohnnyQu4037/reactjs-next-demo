<template>
    <a-form ref="formRef" layout="vertical" :model="state.form" :rules="rules">
        <a-row :gutter="16">
            <a-col :span="8">
                <a-form-item label="Email" name="email">
                    <a-input v-model:value="state.form.email" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Password" name="password">
                    <a-input-password v-model:value="state.form.password" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Username" name="username">
                    <a-input v-model:value="state.form.username" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="First Name" name="first_name">
                    <a-input v-model:value="state.form.first_name" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Last Name" name="last_name">
                    <a-input v-model:value="state.form.last_name" />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Mobile" name="mobile">
                    <a-input v-model:value="state.form.mobile" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
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
            </a-col>
            <a-col :span="24">
                <a-form-item label="Permission" name="permission">
                    <ace-editor v-model:value="state.permission" readonly />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import AceEditor from '@/components/AceEditor/index.vue';
import { validateEmail } from '@/utils/validator';
import { usePermissionStore } from '@/store/modules/permission';
const rules = {
    email: [
        {
            required: true,
            message: 'Please input Email',
            trigger: 'blur',
        },
        { validator: validateEmail, trigger: 'blur' },
    ],
    password: [],
    username: [
        {
            required: true,
            message: 'Please input Username',
            trigger: 'blur',
        },
    ],
};

const props = defineProps<{
    account: ACCOUNT.AccountData | {};
}>();

const formRef = ref();
const permissionStore = usePermissionStore();

const state: {
    form: ACCOUNT.AccountData;
    roles: PERMISSION.PermissionData[];
    permission: string;
} = reactive({
    form: {
        email: '',
        password: '',
        last_login: '',
        username: '',
        first_name: '',
        last_name: '',
        access_token: null,
        refresh_token: null,
        role: null,
        jti: null,
        mobile: null,
        broker_id: null,
        created_at: null,
        updated_at: null,
        is_active: true,
        permission_id: null,
    },
    roles: [],
    permission: '',
});

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
        state.permission = JSON.stringify(permission, null, 2);
    }
};

const validate = async () => {
    await formRef.value.validate();
    return state.form;
};

onMounted(async () => {
    await handleGetRoles();
    state.form = { ...props.account, password: '' };
    if (state.form.permission_id) {
        handleSetPermission(state.form.permission_id);
    }
});

defineExpose({
    validate,
});
</script>
