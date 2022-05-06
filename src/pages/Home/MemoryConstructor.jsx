import styled from "styled-components";
import { useState, useContext } from "react";
import { Context } from "../../context";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function MemoryConstructor() {
  const [context] = useContext(Context);
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [memoryLocation, setMemoryLocation] = useState("");
  const [memoryDate, setMemoryDate] = useState(new Date());

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {context.coupleStatus === "accepted" ? (
        <div>
          <FormStyle onSubmit={submitHandler}>
            <div>
              <h4>Enter memory title</h4>
              <input
                onChange={(e) => {
                  setMemoryTitle(e.target.value);
                }}
                type="text"
                value={memoryTitle}
              />
            </div>
          </FormStyle>
          <FormStyle onSubmit={submitHandler}>
            <div>
              <h4>Location</h4>
              <input
                onChange={(e) => {
                  setMemoryLocation(e.target.value);
                }}
                type="text"
                value={memoryLocation}
              />
            </div>
          </FormStyle>
          <FormStyle onSubmit={submitHandler}>
            <div>
              <h4>Memory text</h4>
              <input
                onChange={(e) => {
                  setMemoryText(e.target.value);
                }}
                type="text"
                value={memoryText}
              />
            </div>
          </FormStyle>
          <DatePickerBlock>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableFuture
                format="yyyy/MM/dd"
                label="Memoty date"
                views={["year", "month", "date"]}
                inputVariant="outlined"
                value={memoryDate}
                onChange={setMemoryDate}
              />
            </MuiPickersUtilsProvider>
          </DatePickerBlock>
          <Button>
            <button
              onClick={() => {
                console.log(
                  memoryTitle +
                    " " +
                    memoryText +
                    " " +
                    memoryLocation +
                    " " +
                    memoryDate
                );
                let data = {
                  coupleId: context.coupleId,
                  title: memoryTitle,
                  description: memoryText,
                  date: memoryDate,
                  location: memoryLocation,
                  photosId: 0,
                };

                fetch("http://localhost:3001/api/memory", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }).then((res) => {
                  console.log("Request complete! response:", res);
                });
                setMemoryTitle("");
                setMemoryText("");
                setMemoryLocation("");
                setMemoryDate(new Date());
              }}
            >
              Create
            </button>
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const FormStyle = styled.form`
  margin: 0rem 10rem;

  h4 {
    margin-bottom: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  div {
    width: 100%;
    position: relative;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

const DatePickerBlock = styled.div`
  margin: 0rem 10rem;
  margin-top: 2rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0rem 10rem;

  button {
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
    margin: 1rem;
  }
`;


export default MemoryConstructor;
