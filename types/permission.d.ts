declare namespace PERMISSION {
    interface FrontPermission {
        child: string[];
        function: string[];
        channel?: string[];
        bookExcept?: string[];
    }

    interface FrontPermissionObj {
        book: FrontPermission;
        lp?: FrontPermission;
        search?: FrontPermission;
        alert?: FrontPermission;
        validation?: FrontPermission;
        settings?: FrontPermission;
        system?: FrontPermission;
        k8s?: FrontPermission;
        account?: FrontPermission;
        risk?: FrontPermission;
    }

    interface BackendPermission {
        book: string[];
        'book/pk': string[];
        boker: string[];
        server: string[];
        security: string[];
        symbol: string[];
        permission: string[];
        'page-profile': string[];
        'statistic/mtd-pnl': string[];
        'statistic/mtd-volume': string[];
    }

    interface PermissionContent {
        broker?: [];
        frontPermission: FrontPermissionObj;
        backendPermission?: BackendPermission | string; // string -> '*'
        allowJsonEditor?: number;
        whitelist?: string[];
        blocklist?: string[];
    }

    interface PermissionData {
        id: number;
        permission_name: string;
        permission: PermissionContent[];
        created_at?: string | null;
        updated_at?: string | null;
    }
}
