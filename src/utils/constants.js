import {
  HomeOutlined,
  AccountTreeOutlined,
  NotificationsNoneOutlined,
  SupervisorAccountOutlined,
  AccountCircleOutlined,
} from "@material-ui/icons";

export const SUCs = ["Main", "Bustos", "Hagonoy", "Meneses"];

export const colleges = ["COE", "CON", "CSSP", "CAFA", "CS", "COED"];

export const proponents = {
  COE: [

  ],
  CON: [
    
  ]
}

export const accountTypes = ["Admin", "Client"];

export const obligationTypes = ["OO", "MYO"];

export const papLevels = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export const readinessLevels = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    path: "/dashboard",
    for: ["Admin", "Client"],
  },
  {
    text: "Projects",
    icon: <AccountTreeOutlined />,
    path: "/projects",
    for: ["Admin", "Client"],
  },
  {
    text: "Notifications",
    icon: <NotificationsNoneOutlined />,
    path: "/notifications",
    for: ["Admin", "Client"],
  },
  {
    text: "Accounts",
    icon: <SupervisorAccountOutlined />,
    path: "/accounts",
    for: ["Admin"],
  },
  {
    text: "My Account",
    icon: <AccountCircleOutlined />,
    path: "/myaccount",
    for: ["Admin", "Client"],
  },
];
