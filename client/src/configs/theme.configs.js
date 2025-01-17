import { createTheme } from '@mui/material/styles'
import { colors } from '@mui/material'

export const themeModes = {
  dark: 'dark',
  light: 'light',
}

const themeConfig = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
          primary: {
            main: '#ff0000', //red
            contrastText: '#ffffff', //white
          },
          secondary: {
            main: '#f44336',
            contrastText: '#ffffff',
          },
          background: {
            default: '#000000',
            paper: '#131313',
          },
        }
        : {
          primary: {
            main: '#ff0000',
          },
          secondary: {
            main: '#ffff00',
          },
          background: {
            default: colors.grey['100'],
          },
        }
    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    })
  },
}

export default themeConfig
