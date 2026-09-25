<div dir="rtl">
# راهنمای جامع اتصال فرانت‌اند (React) به سیستم RBAC
# Frontend Integration Guide for RBAC & Server-Driven Permissions

این راهنما ویژه **تیم فرانت‌اند (React / Next.js)** آماده شده است تا نحوه دریافت داده‌های سطوح دسترسی، تولید خودکار منوی سایدبار (Server-Driven Menu)، گاردبندی روت‌ها، و نمایش شرطی دکمه‌ها و فرم‌ها را به شکل عملیاتی و با کدهای آماده توضیح دهد.

---

## ۱. مدل ذهنی RBAC برای فرانت‌اند (Core Mental Model)

در معماری زیرا مارکت، سیستم دسترسی‌ها به صورت **Server-Driven (هدایت‌شده از سمت بک‌اند)** طراحی شده است:

1. **فرانت‌اند لاجیک دسترسی‌ها را هاردکد نمی‌کند:** فرانت‌اند نیازی ندارد در کدهای خود شرط بگذارد که «اگر کاربر حسابدار بود دکمه فلان را نشان بده و اگر مدیر بود منوی بهمان را». فرانت‌اند فقط بر اساس کدهای استاندارد مجوزها (Permissions) و ساختار درختی که از سرور می‌گیرد رفتار می‌کند.
2. **امنیت دو لایه (Defense in Depth):**
    - **وظیفه فرانت‌اند (UX):** مخفی کردن یا غیرفعال کردن دکمه‌ها، تب‌ها و منوهایی که کاربر به آن‌ها دسترسی ندارد تا تجربه کاربری مرتب و بدون سردرگمی باشد.
    - **وظیفه بک‌اند (Security):** بررسی قطعی توکن و مجوزها در هر درخواست API؛ حتی اگر کاربری با ابزار DevTools دکمه‌ای را فعال کند، بک‌اند بلافاصله خطای `403 Forbidden` صادر می‌کند.

---

## ۲. فرمت استاندارد پرمیشن‌ها (Permission Code Format)

تمامی دسترسی‌ها در سراسر سیستم از یک قالب ۳ بخشی تبعیت می‌کنند:

```
<domain>.<resource>.<action>
```

- **دامنه (`domain`):** نام دامنه بیزنس (مانند `catalog`, `orders`, `rbac`, `finance`)
- **منبع (`resource`):** موجودیت یا صفحه تحت حفاظت (مانند `products`, `roles`, `invoices`)
- **اکشن (`action`):** عملیات مورد نظر:
    - اکشن‌های خواندنی: `list` (مشاهده جدول/فهرست)، `read` (مشاهده فرم جزئیات)
    - اکشن‌های نوشتنی: `create` (افزودن)، `update` (ویرایش)
    - اکشن‌های با ریسک بالا: `delete` (حذف)، `export` (خروجی اکسل)، `approve` (تایید نهایی)
    - اکشن‌های سفارشی: مانند `publish`، `refund`، `cancel`

**مثال‌ها:**

- `catalog.products.list`: اجازه مشاهده جدول کالاها
- `catalog.products.create`: اجازه دیدن دکمه «افزودن محصول جدید» و ارسال فرم
- `rbac.roles.delete`: اجازه کلیک روی آیکون سطل زباله و حذف نقش

---

## ۳. هدرهای ارسالی در درخواست‌های HTTP (Request Headers)

فرانت‌اند در کلیه درخواست‌های ارسالی به درگاه ادمین (`/api/v1/admin/*`) باید هدرهای زیر را تنظیم کند:

```http
Authorization: Bearer <ACCESS_TOKEN>
X-Branch-ID: <BRANCH_UUID>   # اختیاری - در صورت انتخاب شعبه فعال توسط کاربر
Content-Type: application/json
```

> [!TIP]
> **پشتیبانی از چندشعبه‌ای (Multi-Tenancy):**
> اگر کاربر در هدر `X-Branch-ID` شناسه شعبه را ارسال کند، سیستم پرمیشن‌های کاربر را بر اساس آن شعبه خاص می‌سنجد. اگر کاربر دسترسی سراسری داشته باشد، بدون ارسال این هدر نیز درخواست مجاز خواهد بود.

---

## ۴. اندپوینت‌های کلیدی بک‌اند برای فرانت‌اند (Endpoints Catalog)

### اندپوینت ۱: دریافت درخت منوی پویای سایدبار

```http
GET /api/v1/admin/rbac/me/menu
```

این اندپوینت ساختار سلسله‌مراتبی سایدبار را **فقط برای آیتم‌هایی که کاربر جاری حداقل یکی از مجوزهای آن‌ها را دارد** برمی‌گرداند:

#### نمونه خروجی سرور (JSON Response):

```json
[
    {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        "parent_id": null,
        "code": "catalog",
        "full_code": "catalog",
        "name": "کاتالوگ و کالاها",
        "kind": "PAGE",
        "route": "/catalog",
        "icon": "box-seam",
        "order": 1,
        "children": [
            {
                "id": "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
                "parent_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
                "code": "products",
                "full_code": "catalog.products",
                "name": "محصولات",
                "kind": "PAGE",
                "route": "/catalog/products",
                "icon": "bag-check",
                "order": 1,
                "children": []
            },
            {
                "id": "c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
                "parent_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
                "code": "categories",
                "full_code": "catalog.categories",
                "name": "دسته‌بندی‌ها",
                "kind": "PAGE",
                "route": "/catalog/categories",
                "icon": "folder",
                "order": 2,
                "children": []
            }
        ]
    },
    {
        "id": "d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44",
        "parent_id": null,
        "code": "rbac",
        "full_code": "rbac",
        "name": "نقش‌ها و دسترسی‌ها",
        "kind": "PAGE",
        "route": "/rbac",
        "icon": "shield-lock",
        "order": 2,
        "children": [
            {
                "id": "e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55",
                "parent_id": "d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44",
                "code": "roles",
                "full_code": "rbac.roles",
                "name": "مدیریت نقش‌ها",
                "kind": "PAGE",
                "route": "/rbac/roles",
                "icon": "user-tag",
                "order": 1,
                "children": []
            }
        ]
    }
]
```

---

### اندپوینت ۲: دریافت لیست مسطح پرمیشن‌های مؤثر کاربر

```http
GET /api/v1/admin/rbac/me/permissions
```

این اندپوینت یک آرایه فلت از تمامی کدهای دسترسی کاربر (حاصل ترکیب نقش‌های مستقیم، نقش‌های موروثی و گروه‌های کاری) را برمی‌گرداند:

#### نمونه خروجی سرور (JSON Response):

```json
[
    "catalog.products.list",
    "catalog.products.read",
    "catalog.products.create",
    "catalog.products.update",
    "catalog.categories.list",
    "catalog.categories.read",
    "rbac.roles.list",
    "rbac.roles.read"
]
```

---

### اندپوینت ۳: دریافت ماتریس کامل دسترسی‌های یک نقش (برای صفحه مدیریت نقش‌ها)

```http
GET /api/v1/admin/rbac/roles/{role_id}/matrix
```

این اندپوینت درخت کامل تمام دامنه‌ها، منابع و اکشن‌ها را به همراه وضعیت فعال بودن (`is_granted`) برای نقش مشخص‌شده برمی‌گرداند تا در صفحه ویرایش نقش به صورت درخت چک‌باکس نمایش داده شود.

---

## ۵. کدهای آماده و استاندارد فرانت‌اند (Production-Ready React Snippets)

### ۱. کانتکست و ذخیره‌سازی دسترسی‌ها (`AuthContext.tsx` یا Zustand Store)

```typescript
// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  permissions: string[];
  menuTree: any[];
  hasPermission: (perm: string) => boolean;
  hasAnyPermission: (perms: string[]) => boolean;
  hasAllPermissions: (perms: string[]) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [menuTree, setMenuTree] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const [permsRes, menuRes] = await Promise.all([
          axios.get('/api/v1/admin/rbac/me/permissions'),
          axios.get('/api/v1/admin/rbac/me/menu'),
        ]);
        setPermissions(permsRes.data);
        setMenuTree(menuRes.data);
      } catch (err) {
        console.error('Failed to load RBAC context', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  const hasPermission = (perm: string) => permissions.includes(perm);
  const hasAnyPermission = (perms: string[]) => perms.some((p) => permissions.includes(p));
  const hasAllPermissions = (perms: string[]) => perms.every((p) => permissions.includes(p));

  return (
    <AuthContext.Provider
      value={{ permissions, menuTree, hasPermission, hasAnyPermission, hasAllPermissions, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
```

---

### ۲. هوک سفارشی `usePermission.ts`

```typescript
// src/hooks/usePermission.ts
import { useAuth } from "../context/AuthContext";

export const usePermission = () => {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

    return {
        can: (permissionCode: string) => hasPermission(permissionCode),
        canAny: (permissionCodes: string[]) =>
            hasAnyPermission(permissionCodes),
        canAll: (permissionCodes: string[]) =>
            hasAllPermissions(permissionCodes),
    };
};
```

---

### ۳. کامپوننت گیت دسترسی (`<Can>` یا `<PermissionGate>`)

از این کامپوننت برای **نمایش یا عدم نمایش شرطی دکمه‌ها، تب‌ها و المان‌های صفحه** استفاده کنید:

```tsx
// src/components/common/Can.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

interface CanProps {
    do: string | string[];
    mode?: "any" | "all";
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({
    do: perm,
    mode = "any",
    fallback = null,
    children,
}) => {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

    let isAllowed = false;
    if (typeof perm === "string") {
        isAllowed = hasPermission(perm);
    } else if (mode === "all") {
        isAllowed = hasAllPermissions(perm);
    } else {
        isAllowed = hasAnyPermission(perm);
    }

    if (!isAllowed) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
```

#### نحوه استفاده در صفحات فرانت:

```tsx
import { Can } from "../components/common/Can";

function ProductListPage() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">فهرست محصولات</h1>

                {/* دکمه افزودن فقط در صورت داشتن دسترسی ساخت نمایش داده می‌شود */}
                <Can do="catalog.products.create">
                    <button className="btn btn-primary">
                        + افزودن محصول جدید
                    </button>
                </Can>
            </div>

            {/* جدول محصولات */}
            <ProductTable />

            {/* دکمه خروجی اکسل با کامپوننت جایگزین (دکمه غیرفعال) */}
            <Can
                do="catalog.products.export"
                fallback={
                    <button disabled className="opacity-50">
                        خروجی اکسل (غیرمجاز)
                    </button>
                }
            >
                <button onClick={handleExportExcel}>دانلود فایل اکسل</button>
            </Can>
        </div>
    );
}
```

---

### ۴. گارد محافظت از روت‌های React Router (`<ProtectedRoute>`)

اگر کاربری سعی کند با تایپ مستقیم URL وارد صفحه‌ای شود که مجوز آن را ندارد، این کامپوننت او را به صفحه `403 Access Denied` هدایت می‌کند:

```tsx
// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    requiredPermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredPermission,
}) => {
    const { hasPermission, isLoading } = useAuth();

    if (isLoading) {
        return <div className="loading-spinner">در حال بررسی دسترسی...</div>;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
};
```

#### تعریف روت‌ها در `AppRoutes.tsx`:

```tsx
<Routes>
    {/* روت‌های محافظت‌شده پنل ادمین */}
    <Route element={<AdminLayout />}>
        {/* صفحه مدیریت نقش‌ها */}
        <Route
            element={<ProtectedRoute requiredPermission="rbac.roles.list" />}
        >
            <Route path="/rbac/roles" element={<RolesPage />} />
        </Route>

        {/* صفحه محصولات کاتالوگ */}
        <Route
            element={
                <ProtectedRoute requiredPermission="catalog.products.list" />
            }
        >
            <Route path="/catalog/products" element={<ProductsPage />} />
        </Route>

        {/* صفحه خطای عدم دسترسی */}
        <Route path="/403" element={<Forbidden403Page />} />
    </Route>
</Routes>
```

---

### ۵. رندر داینامیک منوی سایدبار (`<DynamicSidebar>`)

نیازی به هاردکد کردن هیچ لینکی در سایدبار نیست! سایدبار مستقیماً از روی آرایه `menuTree` رندر می‌شود:

```tsx
// src/components/layout/DynamicSidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const DynamicSidebar: React.FC = () => {
    const { menuTree, isLoading } = useAuth();

    if (isLoading) return <div>در حال بارگذاری منو...</div>;

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
            <div className="text-xl font-bold mb-6">پنل مدیریت زیرا مارکت</div>

            <nav className="space-y-4">
                {menuTree.map((group) => (
                    <div key={group.id} className="menu-group">
                        <div className="text-xs uppercase text-slate-400 font-semibold mb-2">
                            {group.name}
                        </div>

                        {group.children && group.children.length > 0 && (
                            <ul className="space-y-1 pr-2">
                                {group.children.map((item: any) => (
                                    <li key={item.id}>
                                        <NavLink
                                            to={item.route}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                                                    isActive
                                                        ? "bg-blue-600 text-white font-medium"
                                                        : "text-slate-300 hover:bg-slate-800"
                                                }`
                                            }
                                        >
                                            <i
                                                className={`bi bi-${item.icon || "circle"}`}
                                            />
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};
```

---

### ۶. اینترسپتور Axios و مدیریت سراسری خطای ۴۰۳ (`apiClient.ts`)

اگر توکن منقضی شود یا درخواستی با خطای `403 Forbidden` مواجه گردد، اینترسپتور زیر آن را مدیریت می‌کند:

```typescript
// src/api/apiClient.ts
import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "",
});

// اینجکت توکن احراز هویت و شعبه فعال
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    const activeBranchId = localStorage.getItem("active_branch_id");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (activeBranchId) {
        config.headers["X-Branch-ID"] = activeBranchId;
    }
    return config;
});

// مدیریت خطای ۴۰۳ و ۴۰۱
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 403) {
                toast.error(
                    data.detail ||
                        "شما دسترسی لازم برای انجام این عملیات را ندارید.",
                );
            } else if (status === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    },
);

export default apiClient;
```

---

## ۶. پیاده‌سازی صفحه مدیریت ماتریس نقش‌ها (Role Permissions UI)

هنگامی که ادمین ارشد می‌خواهد به یک نقش (مانند «صندوق‌دار شعبه») دسترسی بدهد:

1. با صدا زدن `GET /api/v1/admin/rbac/roles/{role_id}/matrix` درخت دسترسی‌ها دریافت می‌شود.
2. با تیک زدن هر چک‌باکس:
    - **اگر تیک فعال شد:** فرانت‌اند فراخوانی می‌کند:

        ```http
        POST /api/v1/admin/rbac/roles/{role_id}/permissions
        Content-Type: application/json

        {
          "permission_id": "<PERMISSION_UUID>"
        }
        ```

    - **اگر تیک برداشته شد:** فرانت‌اند فراخوانی می‌کند:
        ```http
        DELETE /api/v1/admin/rbac/roles/{role_id}/permissions/{permission_id}
        ```

3. بک‌اند بلافاصله کش کاربران دارای این نقش را باطل کرده (`bump_version`) و در درخواست بعدی، تغییرات بلافاصله برای آن کاربران اعمال می‌گردد.

---

## 🎯 جمع‌بندی (Cheat Sheet)

| سناریو در فرانت‌اند      | راه‌حل پیشنهادی                                                 |
| ------------------------ | --------------------------------------------------------------- |
| ساخت سایدبار بدون هاردکد | خواندن از `GET /api/v1/admin/rbac/me/menu` و رندر بازگشتی       |
| مخفی کردن یک دکمه یا تب  | استفاده از `<Can do="domain.resource.action">...</Can>`         |
| محافظت از صفحه در URL    | استفاده از `<ProtectedRoute requiredPermission="..."/>`         |
| ارزیابی دستی در کنترلرها | فراخوانی `can("domain.resource.action")` از هوک `usePermission` |
| تغییر شعبه توسط کاربر    | ذخیره شعبه در `localStorage` و ارسال در هدر `X-Branch-ID`       |
</div>