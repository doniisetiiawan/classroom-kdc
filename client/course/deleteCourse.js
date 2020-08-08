import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { remove } from './api-course';
import auth from '../auth/auth-helper';

function DeleteCourse(props) {
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteCourse = () => {
    remove(
      {
        courseId: props.course._id,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        props.onRemove(props.course);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <IconButton
        aria-label="Delete"
        onClick={clickButton}
        color="secondary"
      >
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>
          {`Delete ${props.course.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your course
            {' '}
            {props.course.name}
.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRequestClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={deleteCourse}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export default DeleteCourse;
