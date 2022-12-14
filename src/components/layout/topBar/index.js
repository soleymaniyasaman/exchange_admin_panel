import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { removeToken } from '../../../utils/utils';
import { UserContext } from '../../../context/provider';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        height: '4vw'
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
        height: '30px',
        direction: 'rtl',
        textAlign: 'inherit'
        },
}))(MenuItem);
const TopBar = () => {

    const contextData = React.useContext(UserContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="topbar container-fluid justify-content-end d-flex align-items-center">
            <div className="topbarProfile">
                <img src="/assets/drawer/profilepicture.svg" id="imageProfile" />
                <p id="nameProfile">وحید حسینی</p>
                <div
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleClick}
                >
                    <img
                        src="/assets/drawer/deactive/dashboard-24px.svg"
                        id="spanProfile"
                    />
                </div>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem>
                        <ListItemIcon>
                            <SendIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="پروفایل" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="خروج از حساب" onClick={ () => {
                            removeToken()
                            contextData.setIsLoggedIn(false)
                        }} />
                    </StyledMenuItem>
                </StyledMenu>
            </div>
        </div>
    );
}

export default TopBar;
