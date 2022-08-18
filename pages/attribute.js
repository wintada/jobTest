import React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
  Select,
  Option,
  Switch,
  Radio,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Ontab,
} from "@material-tailwind/react";

const attribute = () => {
  const [open, setOpen] = useState(false);
  const [textatt, setTextatt] = useState(false);
  const [selectionatt, setSelectionatt] = useState(false);
  const [numberatt, setNumberatt] = useState(false);
  const [toggleatt, setToggleatt] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [AllowMultiple, setAllowMultiple] = useState();
  const [AllowSingle, setAllowSingle] = useState();
  const [nameAttribute, setNameAttribute] = useState("");
  const [Text, setText] = useState("");
  const [Quatity, setQuatity] = useState("");
  const [textnumber, setText1] = useState("");
  const [value, setValue] = useState("");
  const [item, setItem] = useState([{}]);
  const [arr, setArr] = useState([]);

  console.log("nameAT" + nameAttribute);

  const selectAllowMultiple = (event) => {
    setAllowMultiple(event);
  };

  const selectAllowSingle = (event) => {
    setAllowSingle(event);
  };
 

  console.log("tt => ", textnumber);
  const count = Number(textnumber);
  let number = null;

  number = count.toFixed(value);

  const inputText = (event) => {
    setText(event.target.value);
  };

  const inputnameAttribute = (event) => {
    setNameAttribute(event.target.value);
  };

  const inputQuatity = (event) => {
    if (Quatity !== "") {
      setQuatity(event.target.value);
      arr.push(Quatity);
      setArr([...arr]);
    }
    setQuatity("");
    console.log(arr);
  };

  const map = item.map((todo, index) => (
    <ul key={index}>
      {/* {console.log("todo", todo)} */}
      {todo.nameAttribute} {todo.count} {todo.Text} {todo.toggle} {todo.Quatity}{" "}
      {todo.number}{" "}
    </ul>
  ));

  useEffect(() => {
    console.log("didUpdate", number, value);
    // setShowModal(false);
    // setShowSubmit(true);
    setNameAttribute("");
    setText("");
    setToggle(Boolean);
    setQuatity("");
    setText1("");
    // number = '';

    console.log("didUpdate2", typeof number);
  }, [item]);
  console.log("111 " + toggle);
  const dataText = {
    nameAttribute,
    Text,
    toggle,
    Quatity,
    number,
  };

  const addsubmit = (event) => {
    event.preventDefault();
    setOpen(!open);

    console.log("test => ", dataText);

    let temp = { ...dataText };
    let tempArr = [];
    tempArr = [...item];

    tempArr.push(temp);

    console.log(temp);

    setItem(tempArr);
  };

  const handleOpenAttribute = () => setOpen(!open);
  // const selectall = () => {
  //   const s = document.getElementById("items").innerHTML;
  //   const item = s.options(s.selectedIndex).value;
  //   setOnTab(item);
  // };
  return (
    <>
      <div>
        {map}
        <Typography variant="h4">Custom Attributes</Typography>
      </div>
      <div>
        <Button
          onClick={handleOpenAttribute}
          className="w-1/2 bg-gray-200 border-gray-50 text-indigo-500"
          variant="outlined"
        >
          Add Attribute
        </Button>

        <Dialog open={open} handler={handleOpenAttribute}>
          <DialogHeader>
            Add custom attribute
            <button
              classname="rigth"
              type="submit"
              onClick={handleOpenAttribute}
            >
              X
            </button>
          </DialogHeader>
          <DialogBody divider>
            <div className="w-full">
              <Typography variant="h6">Custom attribute </Typography>
              <Input
                size="lg"
                label="Attribute Name"
                onChange={inputnameAttribute}
              />
              <Typography variant="h6">Option</Typography>
              <Select id="items">
                <Option
                  value="Text"
                  onClick={() => {
                    setTextatt(!textatt);
                    setSelectionatt(false);
                    setNumberatt(false);
                    setToggleatt(false);
                  }}
                >
                  {" "}
                  Text{" "}
                </Option>
                <Option
                  value="Selection"
                  onClick={() => {
                    setSelectionatt(!selectionatt);
                    setNumberatt(false);
                    setTextatt(false);
                    setToggleatt(false);
                  }}
                >
                  {" "}
                  Selection
                </Option>
                <Option
                  value="Number"
                  onClick={() => {
                    setNumberatt(!numberatt);
                    setSelectionatt(false);
                    setTextatt(false);
                    setToggleatt(false);
                  }}
                >
                  {" "}
                  Number
                </Option>
                <Option
                  value="Toggle"
                  onClick={() => {
                    setNumberatt(false);
                    setSelectionatt(false);
                    setTextatt(false);
                    setToggleatt(!toggleatt);
                  }}
                >
                  {" "}
                  Toggle
                </Option>
              </Select>
              {textatt ? (
                <div>
                  <Typography variant="h6">Value </Typography>
                  <Input size="lg" label="Value" onChange={inputText} />
                </div>
              ) : (
                <></>
              )}
              {selectionatt ? (
                <div className="flex flex-col">
                  <Typography variant="h6">Quantity </Typography>
                  <Radio
                    id="html"
                    name="type"
                    label="Allow multiple selections"
                    onClick={selectAllowMultiple}
                  />
                  <Radio
                    id="react"
                    name="type"
                    label="Allow single selection"
                    defaultChecked
                    onClick={selectAllowSingle}
                  />
                  <Typography variant="h6">Value </Typography>
                  <Input
                    size="lg"
                    label="Value"
                    onChange={(e) => setQuatity(e.target.value)}
                    onBlur={inputQuatity}
                  />

                  {arr.map((todo, index) => {
                    return (
                      <Input
                        key={index}
                        size="lg"
                        label="Value"
                        onChange={(e) => setQuatity(e.target.value)}
                        onBlur={inputQuatity}
                      />
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {numberatt ? (
                <div>
                  <Typography variant="h6">Precision</Typography>
                  <Select size="lg" onChange={(e) => setValue(e)} label="1">
                    <Option value="0"> 1</Option>
                    <Option value="1"> .0</Option>
                    <Option value="2"> .00</Option>
                    <Option value="3"> .000</Option>
                    <Option value="4"> .0000</Option>
                    <Option value="5"> .00000</Option>
                  </Select>

                  <Typography variant="h6">Value </Typography>
                  <Input
                    size="lg"
                    label="12345"
                    onChange={(e) => setText1(e.target.value)}
                  />
                </div>
              ) : (
                <></>
              )}
              {toggleatt ? (
                <div>
                  <Typography variant="h6">Toggle</Typography>
                  <Switch onChange={() => setToggle(!toggle)} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={addsubmit}>
              <span>Add</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};
export default attribute;
