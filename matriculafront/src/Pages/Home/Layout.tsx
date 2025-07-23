import { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
  Button,
  Avatar,
  Text,
  Divider,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from "@fluentui/react-components"
import {
  Navigation20Regular,
  Home20Regular,
  Person20Regular,
  Settings20Regular,
  Document20Regular,

  SignOut20Regular,
  PeopleAdd20Regular,
  BookOpen20Regular,
  Calendar20Regular,
  Payment20Regular,
  ClipboardBrush16Filled,
} from "@fluentui/react-icons"
import "./layout.css"
import { useAuthStore } from "../../hooks/Auth/useAuthContext"

import logo2 from '../../assets/logo2.png'


export default function ClientLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home20Regular, path: "/" },
    { id: "estudiantes", label: "Estudiantes", icon: PeopleAdd20Regular, path: "/estudiantes" },
    { id: "cursos", label: "Cursos", icon: BookOpen20Regular, path: "/cursos" },
    { id: "matriculas", label: "Matrículas", icon: ClipboardBrush16Filled, path: "/matriculas" },
    { id: "horarios", label: "Horarios", icon: Calendar20Regular, path: "/horarios" },
    { id: "pagos", label: "Pagos", icon: Payment20Regular, path: "/pagos" },
    { id: "reportes", label: "Reportes", icon: Document20Regular, path: "/reportes" },
    { id: "configuracion", label: "Configuración", icon: Settings20Regular, path: "/configuracion" },
  ]
 // Determinar el item activo basado en la ruta actual
  const activeItem = navigationItems.find((item) => item.path === location.pathname)?.id || "dashboard"

  const handleNavigation = (itemId: string, path: string) => {
    navigate(path)
    console.log(`Navigating to: ${itemId}`)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <Text size={500}>Please log in to access the application</Text>
      </div>
    )
  }

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={logo2 || "/placeholder.svg"} alt="Logo" className="logo-icon" />

            <Text weight="semibold" size={400} className="logo-text">
              Sistema Matrícula
            </Text>
          </div>
          <Tooltip content={isCollapsed ? "Expandir menú" : "Colapsar menú"} relationship="label">
            <Button
              appearance="subtle"
              icon={<Navigation20Regular />}
              onClick={toggleSidebar}
              className="hamburger-btn"
            />
          </Tooltip>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <li key={item.id} className="nav-item">
                  <Tooltip content={item.label} relationship="label" positioning="after" >
                    <Button
                      appearance={activeItem === item.id ? "primary" : "subtle"}
                      icon={<IconComponent />}
                      onClick={() => handleNavigation(item.id, item.path)}
                      className={`nav-button ${activeItem === item.id ? "active" : ""}`}
                    >
                      {!isCollapsed && item.label}
                    </Button>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="sidebar-footer">
          <Divider />
          <div className="user-section">
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Tooltip content="Perfil de usuario" relationship="label" positioning="after" >
                  <Button appearance="subtle" className="user-button">
                    <div className="user-info">
                      <Avatar name="John Doe" size={32} color="colorful" />
                      {!isCollapsed && (
                        <div className="user-details">
                          <Text size={300} weight="semibold">
                            John Doe
                          </Text>
                          <Text size={200} className="user-email">
                            john.doe@example.com
                          </Text>
                        </div>
                      )}
                    </div>
                  </Button>
                </Tooltip>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<Person20Regular />}>Profile</MenuItem>
                  <MenuItem icon={<Settings20Regular />}>Settings</MenuItem>
                  <Divider />
                  <MenuItem icon={<SignOut20Regular />}>Sign Out</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <Text size={600} weight="semibold">
            {navigationItems.find((item) => item.id === activeItem)?.label || "Dashboard"}
          </Text>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
