import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {Input,Row,Col} from "reactstrap";
import { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./application.css";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function LoginPop(props) {
  const [open, setOpen] = React.useState(false);
  const [soeId, setSoeId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleLogin = async e => {
    e.preventDefault();
        await loginUser({
            soeId,password
        });
      }

      async function loginUser(credentials){
	    try {
          fetch('/snaplink/api/loginUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
              }).then((response) => response.json())
                .then((responseData) => {
                    setMessage(responseData.message)
                    if (responseData.authenticationStatus = 'true'){
                        props.sendData(
                            {
                                soeId:responseData.soeId,
                                authenticationStatus:responseData.authenticationStatus
                            }
                        );
                        handleClose();
                    }else{

                    }
                    });
      } catch (error) {
           }
    }
  

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        LogIn
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <div className="userLoginHeader">
          User Login
          </div>
        </DialogTitle>
        <DialogContent>
          <Row>
          <Col md="12">
                  <Row>
                     <Col className="px-md-1" md="12">
                
                        <label>SOEID</label>
                        <Input
                          value={soeId}
                          type="text"
                          onInput={(e) => {
                            setSoeId(e.target.value);
                          }}
                        />
                      
                    </Col>
                    <Col className="pr-md-1" md="12">
                        <label>Password</label>
                        <Input
                          value={password}
                          type="password"
                          onInput={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                    </Col>
                </Row>
          </Col>
          </Row>
        </DialogContent>
        <DialogActions>
            <div className="dialogactionbutton">
            <Button autoFocus onClick={handleLogin}>Login</Button>
            <Button onClick={handleClose}>Cancel</Button>
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
