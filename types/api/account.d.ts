declare namespace ACCOUNT {
    interface ModifyAccountData {
        id: number;
        email?: string;
        password?: string | null;
        username?: string;
        first_name?: string;
        last_name?: string;
        permission_id?: number | null;
        is_active?: boolean;
        mobile?: string | null;
        role?: string | null;
    }

    interface AccountData extends ModifyAccountData {
        last_login: string | null;
        access_token: string | null;
        refresh_token: string | null;
        jti: string | null;
        broker_id: number | null;
        home_page_profile_id?: number | null;
        alert_page_profile_id?: number | null;
        created_at: string | null;
        updated_at: string | null;
    }
}
