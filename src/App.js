import "./App.css"
import React, { useState } from 'react'
function App() {

  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [train_A, setTrain_A] = useState("");
  const [train_B, setTrain_B] = useState("");
  const [train_AB, setTrain_AB] = useState("");
  const [inputTrain_A, setInputTrain_A] = useState("");
  const [inputTrain_B, setInputTrain_B] = useState("");




  function getDetails() {

    setToggle(true)

    let mp1 = new Map([
      ["CHN", 0],
      ["SLM", 350],
      ["BLR", 550],
      ["KRN", 900],
      ["HYB", 1200],
      ["NGP", 1600],
      ["ITJ", 1900],
      ["BPL", 2000],
      ["AGA", 2500],
      ["NDL", 2700],
    ]);

    let mp2 = new Map([
      ["TVC", 0],
      ["SRR", 300],
      ["MAQ", 600],
      ["MAO", 1000],
      ["PNE", 1400],
      ["HYB", 2000],
      ["NGP", 2400],
      ["ITJ", 2700],
      ["BPL", 2800],
      ["PTA", 3800],
      ["NJP", 4200],
      ["GHY", 4700]
    ])

    let arr1 = inputTrain_A.split(" ");
    let arr2 = inputTrain_B.split(" ");

    let train_A = [];
    let train_B = [];

    function arrivalDetails(a, b) {
      let output1 = "ARRIVAL TRAIN_A ENGINE";
      let output2 = "ARRIVAL TRAIN_B ENGINE";
      let output3 = "DEPARTURE TRAIN_AB ENGINE ENGINE";

      for (let i = 0; i < a.length; i++) {
        output1 = output1 + " " + a[i].station;
      }
      for (let i = 0; i < b.length; i++) {
        output2 = output2 + " " + b[i].station;
      }
      console.log(output1);
      console.log(output2);
      let A = a.filter((data) => {
        return data.station !== "HYB"
      })

      let B = b.filter((data) => {
        return data.station !== "HYB"
      })
      let newDistanceTrain_A = [];
      let newDistanceTrain_B = [];

      for (let i = 0; i < A.length; i++) {
        let val;
        if (mp1.has(A[i].station)) {
          val = mp1.get(A[i].station) - 1200
        }
        else {
          val = mp2.get(A[i].station) - 2000
        }
        let obj = {
          station: A[i].station,
          value: val
        }

        newDistanceTrain_A.push(obj);
      }
      for (let i = 0; i < B.length; i++) {
        let val;
        if (mp2.has(B[i].station)) {
          val = mp2.get(B[i].station) - 2000
        }
        else {
          val = mp1.get(B[i].station) - 1200
        }
        let obj = {
          station: B[i].station,
          value: val
        }

        newDistanceTrain_B.push(obj);
      }

      let newSortTrain_A = newDistanceTrain_A.sort((x, y) => {
        return y.value - x.value;
      })

      let newSortTrain_B = newDistanceTrain_B.sort((x, y) => {
        return y.value - x.value;
      })


      let p = 0;
      let q = 0;
      while (p < newSortTrain_A.length && q < newSortTrain_B.length) {
        if (newSortTrain_A[p].value > newSortTrain_B[q].value) {
          output3 = output3 + " " + newSortTrain_A[p].station;
          p++;
        } else if (newSortTrain_A[p].value === newSortTrain_B[q].value) {
          output3 = output3 + " " + newSortTrain_A[p].station + " " + newDistanceTrain_B[q].station;
          p++;
          q++;

        } else {
          output3 = output3 + " " + newSortTrain_B[q].station;
          q++;
        }
      }

      for (let i = p; i < newSortTrain_A.length; i++) {
        output3 = output3 + " " + newSortTrain_A[i].station;
      }
      for (let i = q; i < newSortTrain_B.length; i++) {
        output3 = output3 + " " + newSortTrain_B[i].station;
      }
      console.log(output3)

      setTrain_A(output1);
      setTrain_B(output2);
      setTrain_AB(output3)

    }

    for (let i = 2; i < arr1.length; i++) {
      let val;
      if (mp1.has(arr1[i])) {
        val = mp1.get(arr1[i])
      }
      else {
        val = mp2.get(arr1[i])
      }
      let obj = {
        station: arr1[i],
        value: val
      }

      train_A.push(obj);

    }
    for (let i = 2; i < arr2.length; i++) {
      let val;
      if (mp2.has(arr2[i])) {
        val = mp2.get(arr2[i])
      }
      else {
        val = mp1.get(arr2[i])
      }
      let obj = {
        station: arr2[i],
        value: val
      }

      train_B.push(obj);

    }
    let a = train_A.filter((data) => {
      return data.value >= 1200
    })

    let b = train_B.filter((data) => {
      return data.value >= 2000
    })

    let flag = false;


    for (let i = 0; i < a.length; i++) {
      if (a[i].station !== "HYB") {
        flag = true;
        break;
      }
    }

    for (let i = 0; i < b.length; i++) {
      if (b[i].station !== "HYB") {
        flag = true;
        break;
      }
    }

    if (flag) {
      arrivalDetails(a, b);
      setToggle1(false)
    }
    else {
      setToggle1(true);
      console.log('JOURNEY_ENDED')
    }


  }

  return (<>

    <div className="input-box">
      <h1>Input :</h1>
      <div className="body-part">

        <div className="label">
          <div>Input for Train_A :</div>
          <input placeholder="EX:- TRAIN_A ENGINE NDL NDL KRN GHY SLM NJP NGP BLR" onChange={(e) => setInputTrain_A(e.target.value)} />
        </div>
        <div className="label">
          <div>Input for Train_B :</div>
          <input placeholder="EX:- TRAIN_B ENGINE NJP GHY AGA PNE MAO BPL PTA" onChange={(e) => setInputTrain_B(e.target.value)} />
        </div>
        <button onClick={getDetails}>Run</button>

      </div>
    </div>
    {
      toggle && <>
        <div className="output-box">
          <h1>Output :</h1>

          <div className="output-result">
            {
              toggle1 ? <>
                <div>JOURNEY_ENDED</div>
              </>
                : <>  <div>{train_A}</div>
                  <div>{train_B}</div>
                  <div>{train_AB}</div>
                </>


            }

          </div>

        </div>
      </>
    }
  </>

  );
}

export default App;
