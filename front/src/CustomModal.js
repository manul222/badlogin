import { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';

export default function CustomModal(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  console.log(props.showLink);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description">
          {props.desc}
        </Typography>
        {props.showLink ? <a href="https://hackmd.io/@nyTr4h5oRGKcHA0ei7WF1g/badLogin" style={{color: "#33C1FF"}}>answer link</a> : <a href="https://hackmd.io/@nyTr4h5oRGKcHA0ei7WF1g/badLogin" style={{color: "#33C1FF"}}>give up🤮</a>}
      </Box>
    </Modal>
  );
};