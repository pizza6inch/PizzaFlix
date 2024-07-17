import HomePage from '../pages/HomePage'
import PersonDetail from '../pages/PersonDetail'
import FavoriteList from '../pages/FavoriteList'
import MediaDetail from '../pages/MediaDetail'
import MediaList from '../pages/MediaList'
import MediaSearch from '../pages/MediaSearch'
import PasswordUpdate from '../pages/PasswordUpdate'
import ReviewList from '../pages/ReviewList'
import ProtectedPage from '../components/common/ProtectedPage'

export const routesGen = {
  home: '/',
  mediaList: type => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: 'search',
  person: id => `/person${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: 'password-update',
}

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home',
  },
  {
    path: '/person/:personId',
    index: true,
    element: <PersonDetail />,
    state: 'person.detail',
  },
  {
    path: '/search',
    index: true,
    element: <MediaSearch />,
    state: 'search',
  },
]
