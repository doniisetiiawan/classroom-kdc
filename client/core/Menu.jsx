import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { Home as HomeIcon } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import auth from '../auth/auth-helper';

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: '#f57c00' };
  return { color: '#fffde7' };
};

const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) {
    return {
      color: '#fffde7',
      backgroundColor: '#f57c00',
      marginRight: 10,
    };
  }
  return {
    color: '#616161',
    backgroundColor: '#fffde7',
    border: '1px solid #f57c00',
    marginRight: 10,
  };
};

function Menu({ history }) {
  return (
    <AppBar position="static" style={{ zIndex: 12343455 }}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Classroom
        </Typography>
        <div>
          <Link to="/">
            <IconButton
              aria-label="Home"
              style={isActive(history, '/')}
            >
              <HomeIcon />
            </IconButton>
          </Link>
        </div>
        <div
          style={{ position: 'absolute', right: '10px' }}
        >
          <span style={{ float: 'right' }}>
            {!auth.isAuthenticated() && (
              <span>
                <Link to="/signup">
                  <Button
                    style={isActive(history, '/signup')}
                  >
                    Sign up
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button
                    style={isActive(history, '/signin')}
                  >
                    Sign In
                  </Button>
                </Link>
              </span>
            )}

            {auth.isAuthenticated() && (
              <span>
                {auth.isAuthenticated().user.educator && (
                  <Link to="/teach/courses">
                    <Button
                      style={isPartActive(
                        history,
                        '/teach/',
                      )}
                    >
                      {/* <Library /> */}
                      {' '}
Teach
                    </Button>
                  </Link>
                )}

                <Link
                  to={`/user/${
                    auth.isAuthenticated().user._id
                  }`}
                >
                  <Button
                    style={isActive(
                      history,
                      `/user/${
                        auth.isAuthenticated().user._id
                      }`,
                    )}
                  >
                    My Profile
                  </Button>
                </Link>
                <Button
                  color="inherit"
                  onClick={() => {
                    auth.clearJWT(() => history.push('/'));
                  }}
                >
                  Sign out
                </Button>
              </span>
            )}
          </span>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Menu);
