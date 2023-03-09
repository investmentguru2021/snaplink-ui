import React from 'react';
import {Input,Row,Col} from "reactstrap";
import {AppBar,Avatar,Toolbar,Typography, Menu,MenuItem }from "@mui/material";
import {IconButton,TextField, Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import LoginPop from './LoginPop';
import "bootstrap/dist/css/bootstrap.css";

export default function AppMenu(props) {

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };

      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };

      
  const handleUserLogout = async e => {
    e.preventDefault();
  }


      const renderMenu = (
   
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
                <LoginPop sendData={props.sendData}/>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}></MenuItem>
        </Menu>
      
    );

    return (

       <div>
        
 <Toolbar>

    <div  className="applicationLabel">
            SNAPLINK
     </div>       
   <div  className="applicationMenuHeader">
        
     <IconButton
       edge="end"
       aria-label="account of current user"
       aria-controls={menuId}
       aria-haspopup="true"
       color="inherit"
     >
      <Avatar></Avatar>
     </IconButton>
   </div>
   <div>
     <IconButton
       aria-label="show more"
       aria-controls={mobileMenuId}
       aria-haspopup="true"
       onClick={handleProfileMenuOpen}
       color="inherit"
     >
       <MoreIcon />
     </IconButton>
   </div>
 </Toolbar>

{renderMenu}
</div> 

    );

    

}




 