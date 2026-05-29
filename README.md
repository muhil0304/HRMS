# Enterprise HRMS Dashboard

A modern, responsive, and highly interactive **Human Resource Management System (HRMS) Dashboard** built with React, TypeScript, Tailwind CSS, and Vite.

## Features

- **KPI Scorecard**: Real-time metrics showing Total Employees, Active Leaves, Pending Requests, and Onboarding Progress.
- **Interactive Analytics**: Visual representations of weekly attendance trends and department resource distribution using Recharts.
- **Leave Management Workflow**: Review, approve, or reject pending leave requests with instant UI and state updates.
- **Employee Directory**: Searchable, filterable directory of active employees with status indicators and quick status controls.
- **Global State Management**: Powered by React Context acting as an in-memory database engine for seamless data flow.
- **Add Employee & Request Leave Modals**: Fully interactive forms to add new employees or submit leave requests on the fly.

## Tech Stack

- **Frontend Library**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher) and npm installed.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── types/
│   └── hrms.ts              # TypeScript interfaces
├── context/
│   └── HRMSContext.tsx      # Global state and mock database
├── hooks/
│   └── useHRMS.ts           # Custom context consumer hook
├── components/
│   ├── ui/
│   │   ├── Card.tsx         # Reusable Card container
│   │   ├── Button.tsx       # Reusable Button component
│   │   └── Badge.tsx        # Reusable Badge component
│   ├── Sidebar.tsx          # Navigation panel
│   ├── Header.tsx           # Top bar with search and profile
│   ├── DashboardOverview.tsx# KPI metrics and activity logs
│   ├── AnalyticsCharts.tsx  # Recharts visualizations
│   ├── LeaveRequests.tsx    # Leave approval workflow
│   └── EmployeeList.tsx     # Searchable employee directory
├── App.tsx                  # Layout & View Coordinator
├── main.tsx                 # App bootstrap
└── index.css                # Global styles & Tailwind directives
```
