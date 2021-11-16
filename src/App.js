import {
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import NegOneIcon from "@material-ui/icons/ExposureNeg1";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [mainData, setMainData] = useState([]);
  const [cigCount, setCigCount] = useState(0);
  const [colCount, setColCount] = useState(0);

  const handleCigPlus = () => {
    let c_p_count = cigCount + 1;
    setCigCount(c_p_count);
  };

  const handleColPlus = () => {
    let cl_p_countt = colCount + 1;
    setColCount(cl_p_countt);
  };

  const handleCigNeg = () => {
    if (cigCount === 0) {
      alert("Count cannot be negative values");
    } else {
      let c_n_count = cigCount - 1;
      setCigCount(c_n_count);
    }
  };

  const handleColNeg = () => {
    if (colCount === 0) {
      alert("Count cannot be negative values");
    } else {
      let ci_n_count = colCount - 1;
      setColCount(ci_n_count);
    }
  };


  const handleSubmitBtn = () => {
    let postData = {
      cig_count : cigCount,
      col_count : colCount
    }
    axios.post("http://192.168.1.27:9999/users/add-report" , postData).then((result)=> {
    var respo =   result.data;
    console.log(respo)
    })

    callAllData()
  }

  const callAllData = () => {
    axios.get("http://192.168.1.27:9999/users/view-reports").then((result)=> {
      var respo =   result.data;
      console.log(respo)
      setMainData(respo)
      })
  }

  const getTodayData = () => {
    axios.get("http://192.168.1.27:9999/users/today-report").then((result)=> {
      var respo =  result.data;
      console.log(respo)
      if(respo === null){
        return
      }else{
        console.log(respo.cig_count);
        setCigCount(respo.cig_count)
        setColCount(respo.col_count)
      }
      })
  }

  useEffect(() => {
    callAllData()
  }, [])
  
  useEffect(() => {
    getTodayData()
  }, [])

  return (
    <div>
      {/* Heading */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign:'center',
        }}
      >
        <Typography style={{flex:1 , backgroundColor:'#535353' , color:'white' }} variant="h4">
          Today
        </Typography>
        <Typography style={{flex:1 , backgroundColor:'#B91646' , color:'white'}} variant="h4">Cigarette</Typography>
        <Typography style={{flex:1, color:'white',backgroundColor:'#F58840' }} variant="h4">Drinks</Typography>
      </div>
      {/* textview and buttons */}
      <div
        style={{
          display: "flex",
          height: "450px",
          flexDirection: "column",
       
        }}
      >
        {/* top  */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              flex: "0 0 25%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <TextField
              style={{ flex: 1 }}
              variant="outlined"
              color="primary"
              placeholder="cig_count"
              value={cigCount}
              inputProps={{ readOnly: true }}
            />
            <IconButton
              style={{ flex: 0.5, backgroundColor: "#ff4040", color: "white" }}
              onClick={handleCigPlus}
            >
              <PlusOneIcon />
            </IconButton>
            <IconButton
              style={{ flex: 0.5, backgroundColor: "#34d737", color: "white" }}
              onClick={handleCigNeg}
            >
              <NegOneIcon />
            </IconButton>
          </div>
          <div
            style={{
              flex: "0 0 25%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <TextField
              variant="outlined"
              color="primary"
              placeholder="col_count"
              value={colCount}
              inputProps={{ readOnly: true }}
            />
            <IconButton
              style={{ flex: 0.5, backgroundColor: "#ff4040", color: "white" }}
              onClick={handleColPlus}
            >
              <PlusOneIcon />
            </IconButton>
            <IconButton
              style={{ flex: 0.5, backgroundColor: "#34d737", color: "white" }}
              onClick={handleColNeg}
            >
              <NegOneIcon />
            </IconButton>
          </div>
        </div>
        {/* body  */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2%",
            padding: "1%",
            backgroundColor: "#6B4F4F",
            color: "white",
          }}
        >
          <Typography variant="h5">Weekly Reports</Typography>
        </div>

        {/* RecyclerView */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {mainData.map((data) => (
            <Card
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "1%",
                padding: "1%",
                borderRadius: "10px",
                backgroundColor: "#b3daff",
              }}
            >
              <Typography> {data.date} </Typography>
              <Typography style={{fontWeight:'bold'}}> {data.cig_count} </Typography>
              <Typography style={{fontWeight:'bold'}}> {data.col_count} </Typography>
            </Card>
          ))}
        </div>

        {/* bottom btn */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position:'sticky',
            bottom:0
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "#161E54", color: "white" }}
            variant="contained"
            onClick={handleSubmitBtn}
          >
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
