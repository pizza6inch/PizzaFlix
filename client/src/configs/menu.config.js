import HomeOutLinedIcon from '@mui/icons-material/HomeMaxOutlined'
import SlideshowOutlined from '@mui/icons-material/SlideshowOutlined'
import LiveTvOutlined from '@mui/icons-material/LiveTvOutlined'
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import RateReviewOutlined from '@mui/icons-material/RateReviewOutlined'
import LockResetOutlined from '@mui/icons-material/LockResetOutlined'

const main = [
  {
    display: 'home',
    path: '/',
    icon: <HomeOutLinedIcon />,
    state: 'home',
  },
  {
    display: 'movies',
    path: '/movie',
    icon: <SlideshowOutlined />,
    state: 'movie',
  },
  {
    display: 'tv series',
    path: '/tv',
    icon: <LiveTvOutlined />,
    state: 'tv',
  },
  {
    display: 'search',
    path: '/search',
    icon: <SearchOutlined />,
    state: 'search',
  },
]

const user = [
  {
    display: 'favorites',
    path: '/favorites',
    icon: <FavoriteBorderOutlined />,
    state: 'favorite',
  },
  {
    display: 'reviews',
    path: '/reviews',
    icon: <RateReviewOutlined />,
    state: 'reviews',
  },
  {
    display: 'password update',
    path: '/password-update',
    icon: <LockResetOutlined />,
    state: 'password.update',
  },
]

const menuConfigs = { main, user }

export default menuConfigs
