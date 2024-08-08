import React from 'react'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import menuConfigs from '../../configs/menu.configs'
import { setUser } from '../../redux/features/userSlice'

const UserMenu = () => {
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const [anchoerEl, setanchoerEl] = useState(null)

  const toggleMenu = e => setanchoerEl(e.currentTarget) //如果點擊以外的地方 會為空null，把菜單隱藏

  return (
    <>
      {user && (
        <>
          <Typography variant="h6" sx={{ cursor: 'Pointer', userSelect: 'none' }} onClick={toggleMenu}>
            {user.displayName}
          </Typography>
          <Menu //可替換為Popover
            open={Boolean(anchoerEl)}
            anchorEl={anchoerEl}
            onClose={() => setanchoerEl(null)}
            slotProps={{
              paper: {
                sx: { padding: 0 },
              },
            }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton component={Link} to={item.path} key={index} onClick={() => setanchoerEl(null)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography textTransform="uppercase">{item.display}</Typography>}
                />
              </ListItemButton>
            ))}
            <ListItemButton sx={{ borderRadius: '10px' }} onClick={() => dispatch(setUser(null))}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary={<Typography textTransform="uppercase">sign out</Typography>} />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  )
}

export default UserMenu
