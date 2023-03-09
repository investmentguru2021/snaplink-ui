import React from 'react';
import {Input,Row,Col} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Component, useState, useEffect } from "react";
import { IconButton, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function UserProfile (props){

    const [emailId, setEmailId] = useState("");
    const [soeId, setSoeId] = useState("");
    const [fullName, setFullName] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [followstatus, setFollowstatus] = useState("");
    
    useEffect(() => {
      if(props.data.authenticationStatus=='true'){
        setSoeId(props.data.soeId);
        searchUserDetails({soeId:props.data.soeId}); 
      }
  },[props]);

  const handleSearchUserDetails = async e => {
    e.preventDefault();
        await searchUserDetails({
          searchUser
        });
      }

      async function searchUserDetails(credentials){
	    try {
          fetch('/snaplink/api/searchUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
              }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.success == 'true'){
                      setEmailId(responseData.userDetails.emailId);
                      setSoeId(responseData.userDetails.soeId);
                      setFullName(responseData.userDetails.empName);
                      setFollowstatus(responseData.followStatus);
                    }
                    });
      } catch (error) {
           }
    }

    
    return (
<div className="content">
    <Row>
        <Col md="7">
                  <Row>
                  <Input
                          value={searchUser}
                          type="text"
                          label="search soe id"
                          variant="outlined"
                          placeholder="Search..."
                            onInput={(e) => {
                      setSearchUser(e.target.value);
                    }}
                 />
                 </Row>
             </Col>    
              <Col md="1">
                 <Row>
                 <IconButton type="submit" aria-label="search" onClick={handleSearchUserDetails}>
                    <SearchIcon style={{ fill: "blue" }} />
                  </IconButton>
                  </Row>
                </Col>

          <Col md="6">
                  <Row>
                     <Col className="px-md-1" md="4">
                
                        <label>SOEID</label>
                        <Input
                          value={soeId}
                          InputProps={{
                            readOnly: true,
                          }}
                          type="text"
                        />
                      
                    </Col>
                    <Col className="pr-md-1" md="8">
                        <label>Name</label>
                        <Input
                          value={fullName}
                          type="text"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                    </Col>
                </Row>
                  <Row>
                  <Col className="pl-md-1" md="6">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input
                          defaultValue=""
                          placeholder=""
                          value={emailId}
                          InputProps={{
                            readOnly: true,
                          }}
                          type="email"
                        />
                    </Col>
                    <Col md="4">
                    <label>Follow User</label>
                        <Row>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  labelPlacement="right"
                                  value={followstatus}
                                />
                        </Row>
                      </Col>
                  </Row>

                
          </Col>
        </Row>
        </div>
          );

}

