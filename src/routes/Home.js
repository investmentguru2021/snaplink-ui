import { Component, useState, useEffect } from "react";
import {IconButton,TextField, Box, Tooltip, Radio,RadioGroup} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ForwardIcon from '@mui/icons-material/Forward';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Input,Row,Col} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import './application.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddNewUrl from './AddNewUrl';
import EditUrl from './EditUrl';
import { useParams } from "react-router-dom";


function Home(props) {

  const [searchQuery, setSearchQuery] = useState("");

    const [soeId, setSoeId] = useState("");
    const [myLinks, setMyLinks] = useState("Y");
    const [userData, setUserData] = useState([]);
    const [publicLinks, setPublicLinks] = useState("N");
    const [followingLinks, setFollowingLinks] = useState("N");
    const [matchCaseCheck, setMatchCaseCheck] = useState(false);
    const [matchWordCheck, setMatchWordCheck] = useState(false);
    const [advancedSearchCondition, setAdvancedSearchCondition] = useState("none");
    const [searchedData, setSearchedData] = useState([]);

    const [myLinksCheck, setMyLinksCheck] = useState(false);
    const [publicLinksCheck, setPublicLinksCheck] = useState(false);
    const [followingLinksCheck, setFollowingLinksCheck] = useState(false);
    
    const loginStatus = props.authenticationStatus;

    const [ addURLStatus, setAddURLStatus] = useState({
      addUrlStatus:'false'
    })
  
    const sendStatus = ( data) => {
      setAddURLStatus(data);
    }

    const openInNewTab = (urlLink) => {
      window.open(urlLink.urlLink, '_blank', 'noreferrer');
    };

    useEffect(() => {
      setUserData(props.data);
      if(props.data.authenticationStatus=='true'){
        setSoeId(props.data.soeId);
        setMyLinksCheck(true);
        setPublicLinksCheck(false);
        setFollowingLinksCheck(false);
        userDataSearch({soeId:props.data.soeId,publicLinksCheck:'false',followingLinksCheck:'false',myLinksCheck:'true',
        matchCaseCheck:'false', matchWordCheck:'false', advancedSearchCondition:'none'}); 
      }
  },[props]);



  useEffect(() => {
      userDataSearch({soeId:props.data.soeId,publicLinksCheck:'false',followingLinksCheck:'false',myLinksCheck:'true',
        matchCaseCheck:'false', matchWordCheck:'false', advancedSearchCondition:'none'}); 
},[addURLStatus]);


  const handleUserDataSearch = async e => {

       await userDataSearch({
            soeId,publicLinksCheck,followingLinksCheck,myLinksCheck,searchQuery,matchCaseCheck,matchWordCheck,advancedSearchCondition 
        });
      }

      async function userDataSearch(credentials){
	    try {
          fetch('/snaplink/api/searchForUserLinks',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
              }).then((response) => response.json())
                .then((responseData) => {
                  setSearchedData(responseData.userLinks);
                    });
      } catch (error) {
           }
    }

  const recommMultipleActions = (params) => {
    const urlLink = params.row.url;
    return (
      <>
      <strong>
         <Tooltip title="Edit Url" arrow>
          <EditUrl url={urlLink} description={params.row.userLinkDescription} tags={params.row.userLinkTags}
                type={params.row.type} keywords={params.row.userLinkTags}  soeId={soeId}/>
         </Tooltip>
         </strong>
         <strong>
         <Tooltip title="Forward Url" arrow>
          <IconButton edge="end" aria-label="redirect" onClick={() => {openInNewTab({urlLink:urlLink});}} >
              <ForwardIcon  style={{ fill: "blue" }} />
          </IconButton>
         </Tooltip>
      </strong>
      </>
      
  )
   } 

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: '',
      headerName: '',
      width: 110,
      renderCell: recommMultipleActions,
    },
    {
      field: 'url',
      headerName: 'URL',
      width: 250,
    },
    {
      field: 'userLinkDescription',
      headerName: 'Description',
      width: 250,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
    },
    {
      field: 'userLinkTags',
      headerName: 'Tags',
      width: 150,
    },
    {
      field: 'soeId',
      headerName: 'Owner',
      width: 150,
    },
    {
      field: 'createDate',
      headerName: 'Create Date',
      width: 150,
    },
    {
      field: 'lastAccessDate',
      headerName: 'Last Access Date',
      width: 150,
      
    }
  ];

 
  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };


  return (
    <div class="content">
      <Row>
          <Col md="1">
                  <Row>
                 
                  </Row>
            </Col>
            <Col md="8">
                  <Row>
                    <Col md="1">
                    <AddNewUrl  sendStatus={sendStatus} soeId={props.data.soeId}/>
                    </Col>
                    <Col md="10">
                  <Input
                          value={searchQuery}
                          type="text"
                          label="Enter a city name"
                          variant="outlined"
                          placeholder="Search..."
                            onInput={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                 />
                 </Col>
                 </Row>
             </Col>    
              <Col md="1">
                 <Row>
                 <IconButton type="submit" aria-label="search" onClick={handleUserDataSearch}>
                    <SearchIcon style={{ fill: "green",  width: 20, height: 20, margin:"1rem -1rem -1rem -10rem" }} />
                  </IconButton> 
                  </Row>
                </Col>
             </Row> 
      <Row>
        <Col md="5">
          <Row>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={myLinks}
                    control={<Checkbox checked={myLinksCheck} onChange={(e) => {setMyLinksCheck(e.target.checked)}}/>}
                    label="My Links"
                    onInput={(e) => {
                      setMyLinks(e.target.value);
                    }}
                    labelPlacement="right"
                  />
                  <FormControlLabel
                    value={publicLinks}
                    control={<Checkbox checked={publicLinksCheck} onChange={(e) => {setPublicLinksCheck(e.target.checked)}}/>}
                    label="Public"
                    labelPlacement="right"
                    onInput={(e) => {
                      setPublicLinks(e.target.value);
                    }}
                  />
                  <FormControlLabel
                    value={followingLinks}
                    control={<Checkbox checked={followingLinksCheck} onChange={(e) => {setFollowingLinksCheck(e.target.checked)}}/>}
                    label="Following"
                    labelPlacement="right"
                    onInput={(e) => {
                      setFollowingLinks(e.target.value);
                    }}
                  />
                </FormGroup>
            </FormControl>
            </Row>
            </Col>
            <Col md="4">
              <Row>
                <Col md="6">
                <FormControlLabel 
                      value={matchWordCheck} 
                      control={<Checkbox  checked={matchWordCheck} onChange={(e) => {setMatchWordCheck(e.target.checked)}}/>} 
                      label="Matchword" 
                      />

                    <FormControlLabel 
                      value={matchCaseCheck} 
                      control={<Checkbox  checked={matchCaseCheck} onChange={(e) => {setMatchCaseCheck(e.target.checked)}}/>} 
                      label="Matchcase" 
                    />
                </Col>
                <Col md="6">

                <FormControl>
                    <RadioGroup row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="none"
                      onChange={(e) => {setAdvancedSearchCondition(e.target.value)}}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="none" control={<Radio/>} label="None" />
                      <FormControlLabel value="and" control={<Radio/>} label="AND" />
                      <FormControlLabel value="or" control={<Radio/>} label="OR" />
                    </RadioGroup>
                  </FormControl>
                </Col>
              
          
          </Row>
        </Col>
        <Col md="3"></Col>
      </Row>
          
     <div>

    </div>   
    <div>
     
    </div>   
    <div className="appDataGrid">   
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={searchedData}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </div>   
    </div>
  );
}

export default Home;
