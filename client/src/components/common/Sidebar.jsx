import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
<<<<<<< Updated upstream
import menuConfigs from '../../configs/menu.configs.js'
import uiConfigs from '../../configs/ui.configs.js'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
=======
import menuConfigs from '../../configs/menu.configs'
import uiConfigs from '../../configs/ui.config'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlined from '@mui/icons-material/WbSunnyOutlined'
import { themeModes } from '../../configs/theme.config'
import { setThemeMode } from '../../redux/features/themeModeSlice'
import Logo from './Logo'
>>>>>>> Stashed changes

import { themeModes } from '../../configs/theme.configs.js'
import { setThemeMode } from '../../redux/features/themeModeSlice.js'
import Logo from './Logo.jsx'
export const Sidebar = ({ open, toggleSidebar }) => {
<<<<<<< Updated upstream
  const { user } = useSelector(state => state.appState)
  const { appState } = useSelector(state => state.user)
  const { themeMode } = useSelector(state => state.themeMode)
  const sideBarWidth = uiConfigs.size.sidebarWith

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
    // const dispatch = useDispatch()
=======
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { appState } = useSelector(state => state.appState)
  const { themeMode } = useSelector(state => state.themeMode)

  const sidebarWidth = uiConfigs.size.sidebarWith

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
    dispatch(setThemeMode(theme))
>>>>>>> Stashed changes
  }

  const drawer = (
    <>
<<<<<<< Updated upstream
      <Toolbar sx={{ padding: '20px', color: 'text.primary' }}>
        <Typography variant="h6">Sidebar</Typography>
=======
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
>>>>>>> Stashed changes
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: '30px' }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
<<<<<<< Updated upstream
            key="index"
=======
            key={index}
>>>>>>> Stashed changes
            sx={{
              borderRadius: '10px',
              marginY: 1,
              backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset',
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
<<<<<<< Updated upstream
            <ListItemText disableTypography primary={<Typography textTransform="uppercase">item.display</Typography>} />
          </ListItemButton>
        ))}
        {user && (
          <>
            <Typography variant="h6" marginBottom="20px">
              PERSONAL
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key="index"
                sx={{
                  borderRadius: '10px',
                  marginY: 1,
                  backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset',
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography textTransform="uppercase">item.display</Typography>}
                />
              </ListItemButton>
            ))}
          </>
        )}
        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeModes.dark ? 'dark mode' : 'light mode'}
              </Typography>
            }
          ></ListItemText>
        </ListItemButton>
=======
            <ListItemText
              disableTypography
              primary={<Typography textTransform="uppercase">{item.display}</Typography>}
            />
          </ListItemButton>
        ))}
>>>>>>> Stashed changes
      </List>
    </>
  )

<<<<<<< Updated upstream
  return <Drawer open={open} onClose={() => toggleSidebar(false)}></Drawer>
=======
  return <div>Sidebar</div>
>>>>>>> Stashed changes
}
