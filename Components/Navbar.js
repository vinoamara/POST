import  React, {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {
  CssBaseline,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DrawerComponent from "./DrawerComponents";
import {Link} from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(3),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    borderBottom: "1px solid transparent",
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

//const SearchIconWrapper = styled('div')(({ theme }) => ({
 // padding: theme.spacing(0, 2),
 // height: '100%',
 // position: 'absolute',
 //  pointerEvents: 'none',
 //  display: 'flex',
 // alignItems: 'center',
 // justifyContent: 'center',
 //}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function NavBar({ placeholder,data }) {
 const [filteredData, setFilteredData] = useState([]);
 const [wordEntered, setWordEntered] = useState("");

 const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  const newFilter = data.filter((value) => {
    return value.title.toLowerCase().includes(searchWord.toLowerCase());
  });

  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};

const clearInput = () => {
  setFilteredData([]);
  setWordEntered("");
};
const classes = useStyles();
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <CssBaseline />
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            PROJECT
          </Typography>
          <Search>
      
        
      
      <StyledInputBase
        placeholder={placeholder}
        value={wordEntered}
        onChange={handleFilter} />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ): (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
   )}
    </Search>
          {isMobile ? (
          <DrawerComponent />
        ) : (          
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link> 
            
            
          </div>
        )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}