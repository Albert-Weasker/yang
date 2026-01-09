# 项目管理系统 - 政府端

基于 React + TypeScript + Vite + Ant Design 构建的政府端项目管理系统。

## 功能特性

- ✅ 登录/权限验证
- ✅ 项目入库管理
- ✅ 项目状态流转（注册 → 到资 → 开工 → 投产）
- ✅ 项目附件管理
- ✅ 月度提醒
- ✅ 管理员功能（用户管理、状态审核）

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Ant Design 5** - UI 组件库
- **React Router 6** - 路由管理
- **Axios** - HTTP 客户端

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发运行

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── api/              # API 接口
├── components/       # 通用组件
│   ├── ProjectStatusTag/
│   ├── FileUploader/
│   ├── StatusActionCard/
│   ├── ProjectTable/
│   ├── ProtectedRoute/
│   └── AdminRoute/
├── layouts/          # 布局组件
│   └── AppLayout/
├── pages/            # 页面组件
│   ├── Login/
│   ├── Projects/
│   │   ├── Create/
│   │   └── Detail/
│   ├── Reminder/
│   └── Admin/
│       └── Users/
├── router/           # 路由配置
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

## 路由结构

- `/login` - 登录页
- `/projects` - 项目列表
- `/projects/create` - 项目入库
- `/projects/:id` - 项目详情
- `/reminder` - 月度提醒
- `/admin` - 管理员首页
- `/admin/users` - 用户管理

## 环境变量

创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:8080/api
# 启用模拟登录（开发模式，无需后端）
VITE_USE_MOCK=true
```

## 测试账号

**开发模式下（启用 VITE_USE_MOCK=true）可使用以下测试账号：**

### 管理员账号
- 用户名：`admin`
- 密码：`admin123`
- 权限：管理员（可访问所有功能，包括用户管理）

### 普通用户账号
- 用户名：`user1` 或 `user2`
- 密码：`user123`
- 权限：普通政府用户（可管理项目，无法访问管理员功能）

## 开发说明

### API 接口

所有 API 接口定义在 `src/api/` 目录下，使用 Axios 进行封装。

### 状态管理

当前使用 React Hooks 进行状态管理，如需更复杂的状态管理可集成 Redux 或 Zustand。

### 权限控制

- `ProtectedRoute` - 保护需要登录的路由
- `AdminRoute` - 保护仅管理员可访问的路由

## License

MIT
