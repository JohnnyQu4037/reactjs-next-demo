declare namespace AUTH {
    interface LoginForm {
        email: string;
        password: string;
    }
    interface UserInfo {
        username: string;
        permission: object;
        home_page_profile_id: number | null;
        alert_page_profile_id: number | null;
    }
}
