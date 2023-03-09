import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Input,Row,Col} from "reactstrap";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

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

export default function AddNewUrl(props) {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [shared, setShared] = React.useState(false);
  const [type, setType] = React.useState(false);
  const [keywords, setKeywords] = React.useState("");
  const soeId = props.soeId;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddURL = async e => {
    e.preventDefault();
        await addURL({
            url,description,tags,shared, keywords, soeId
        });
      }

      async function addURL(credentials){
	    try {
          fetch('/snaplink/api/addUrl',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
              }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.success == 'true'){
                      props.sendStatus(
                        {
                          addUrlStatus:responseData.success
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
    <div className="AddLinkContent">
      <Button onClick={handleClickOpen}>
        <AddCircleIcon style={{ fill: "green",  width: 30, height: 30}} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        fullWidth
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Add Url
        </DialogTitle>
        <DialogContent>
        
                  <Row>
                     <Col className="px-md-1" md="12">
                
                        <label>URL(*URLs must start with http or https to work properly)</label>
                        <Input
                          value={url}
                          type="text"
                          onInput={(e) => {
                            setUrl(e.target.value);
                          }}
                        />
                      
                    </Col>
                </Row>
                 <Row>
                    <Col className="pr-md-1" md="12">
                      
                        <label>Description</label>
                        <Input
                          value={description}
                          type="text"
                          onInput={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="12">
                      
                      <label>Tags (*must start with #)</label>
                      <Input
                        value={tags}
                        type="text"
                        onInput={(e) => {
                          setTags(e.target.value);
                        }}
                      />
                    
                  </Col>

                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="2">
                      <label>Shared</label>
                      </Col>
                    <Col className="pr-md-1" md="4">
                    <FormControlLabel
                      value={shared}
                      control={<Checkbox checked={shared} onChange={(e) => {setShared(e.target.checked)}}/>}
                    />
                    </Col>
                  </Row>
        </DialogContent>
        <DialogActions>
          <div className="dialogactionbutton">
          <Button autoFocus onClick={handleAddURL}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
          </div>  
        </DialogActions>

      </Dialog>
    </div>
  );
}
