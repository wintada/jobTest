import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import AllowMultipleModal from "./AllowMultipleModal";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Typography,
  Input,
  Radio,
  Switch,
  Alert,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { useRecoilState } from "recoil";
import { newPageCollections } from "../../../../reducer/items/newItems";

const addCustomAttributes = (props) => {
  const toggleModal = () => props.handle(!props.open);

  const prepareDataBeforeCallback = (event) => {
    toggleModal();
    event.preventDefault();
    console.log("test => ", dataText);
    let temp = { ...dataText };
    let tempArr = [];
    tempArr = [...item];
    tempArr.push(temp);
    setItem(tempArr);
    handleChange();
  };

  const [textatt, setTextatt] = useState(false);
  const [selectionatt, setSelectionatt] = useState(false);
  const [numberatt, setNumberatt] = useState(false);
  const [toggleatt, setToggleatt] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [nameAttribute, setNameAttribute] = useState("");
  const [Text, setText] = useState("");
  const [item, setItem] = useState([{}]);
  const [AllowSingle, setAllowSingle] = useState(false);
  const [AllowMultiple, setAllowMultiple] = useState(true);
  const [Quatity, setQuatity] = useState("");
  const [arr, setArr] = useState([]);
  const [selectArray, setselectArray] = useState([]);
  const [numbervalue, setnumbervalue] = useState(0);
  const [collections, setCollections] = useRecoilState(newPageCollections);
  const [variationsItems, setVariationsItems] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [boxselection, setBoxselection] = useState("");
  const [count1, setCount1] = useState(0);
  const [state, setState] = useState("");
  const [namealert, setNamealert] = useState(false);

  const editNew = (e, index) => {
    const { value } = e.target;
    let editarr = _.cloneDeep([...arr]);
    let obj = editarr.find((x) => x.value === x.value);
    if (obj !== undefined) {
      arr[index].value = value;
    }
    setArr(arr);
  };

  const tofix = (e) => {
    let val = e.target.value;
    val = val.replace(/([^0-9.]+)/, "");
    val = val.replace(/^(0|\.)/, "");
    const re = new RegExp(`(\\d{0,10})[^.]*((?:.\\d{0,${numbervalue}})?)`, "g");
    const newStr = re.exec(val);
    const value = newStr[1] + newStr[2];
    e.target.value = value;
    setState(value);
  };

  const push1 = (e) => {
    if (boxselection !== "") {
      arr.push({ id: count1, value: boxselection });
      setArr([...arr]);

      setBoxselection("");
      setCount1(count1 + 1);
    }
  };

  useEffect(() => {
    let valueArr = arr.map((item) => item.value);
    let isDuplicate = valueArr.some(
      (item, index) => valueArr.indexOf(item) != index
    );
    if (isDuplicate == true) {
      setNamealert(true);
    } else if (isDuplicate !== true) {
      setNamealert(false);
    }
  }, [push1]);

  const handleChange = () => {
    let arr = _.cloneDeep([...variationsItems]);
    arr = dataText;
    setVariationsItems(arr);

    let arrCol = _.cloneDeep({ ...collections });
    arrCol.attributes = arr;
    setCollections(arrCol);
  };

  useEffect(() => {
    setNameAttribute("");
    setText("");
    setQuatity("");
    setToggle(Boolean);
    setArr([]);
    setToggle(false);
    setTextatt(false);
    setSelectionatt(false);
    setNumberatt(false);
    setToggleatt(false);
  }, [item, !props.open]);
  const dataText = [
    {
      nameAttribute,
      Text,
      toggle,
      Quatity,
      state,
      selectArray,
    },
  ];

  const removeItem = (item) => {
    if (boxselection.value !== "") {
      //  remove = arr.filter((x) => x.id !== item);
      setArr(arr.filter((x) => x.id !== item));
      // console.log("new remove", arr);
    }
  };

  const selectAttribute = React.createRef(null);
  let filter = arr.filter((x) => x.value != "");

  return (
    <>
      <Dialog open={props.open} /* handler={toggleModal} */ size="md">
        <DialogHeader className="flex justify-between">
          <div>
            <Button
              className="bg-gray-200"
              variant="text"
              onClick={() => toggleModal()}
            >
              <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
            </Button>
          </div>
          <div>Add custom attribute</div>
          <div className="w-16" />
        </DialogHeader>
        {namealert ? (
          <div>
            <Alert
              className="text-center text-sm"
              color="red"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-exclamation-triangle-fill ml-[9rem]"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              }
            >
              Each value must have a unique name.
            </Alert>
          </div>
        ) : (
          <></>
        )}
        <DialogBody
          className="overflow-auto  h-96"
          style={{ maxHeight: "75vh" }}
          divider
        >
          <div className="  flex-col w-full  ">
            <br></br>
            <div
              className={` flex flex-row items-center border border-gray-300 p-3 bg-gray-200  'mt-2 rounded-t-lg' : 'my-2 rounded'`}
            >
              <div className="grow-0 w-48">
                <div className="grow-0 pl-2 text-gray-700 font-bold ">
                  Custom attribute
                </div>
              </div>
              <div className="grow flex flex-row-reverse ">
                <div className="w-full">
                  <div>
                    <div className="w-full bg-white ">
                      <Input
                        size="lg"
                        label="Attribute name"
                        onChange={(e) => setNameAttribute(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className={` flex flex-row items-center border border-gray-300 p-3 bg-gray-200  'mt-2 rounded-t-lg' : 'my-2 rounded'`}
              >
                <div className="grow-0 w-48 ">
                  <div className="grow-0 pl-2 text-gray-700 font-bold ">
                    Attribute type
                  </div>
                </div>
                <div className="grow flex flex-row-reverse ">
                  <div className="w-full bg-white">
                    <Select id="items" label="Type">
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
                  </div>
                </div>
              </div>
            </div>
            <div>
              {textatt ? (
                <div>
                  <br></br>
                  <br></br>

                  <div
                    className={` flex flex-row items-center border border-gray-300 p-3 bg-gray-200  'mt-2 rounded-t-lg' : 'my-2 rounded'`}
                  >
                    <Typography
                      variant="h6"
                      className="pl-2 text-gray-700 font-bold w-48"
                    >
                      Value{" "}
                    </Typography>
                    <div className="grow flex flex-row-reverse ">
                      <div className="w-full bg-white ">
                        <Input
                          size="lg"
                          label="Value"
                          onChange={(e) => {
                            setText(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div>
              {selectionatt ? (
                <div>
                  <br></br>
                  <br></br>
                  <div>
                    <header className=" border border-gray-300 h-28 flex flex-row ">
                      <div className="bg-gray-200 py-3 pr-[120px] pl-4 text-gray-700 font-bold text-sm pb-20">
                        <Typography variant="h6">Quantity </Typography>
                      </div>
                      <div className="flex flex-col pt-3 pl-1">
                        <div class="flex items-center ">
                          <Radio
                            id="Allow multiple"
                            name="type"
                            label="Allow multiple selections"
                            defaultChecked
                            onClick={() => {
                              setAllowMultiple(!AllowMultiple);
                              setAllowSingle(false);
                            }}
                          />
                        </div>
                        <div class="flex items-center ">
                          <Radio
                            id="Allow single"
                            name="type"
                            label="Allow single selection"
                            onClick={() => {
                              setAllowSingle(!AllowSingle);
                              setAllowMultiple(false);
                            }}
                          />
                        </div>
                      </div>
                    </header>
                  </div>
                  <div>
                    <Typography
                      variant="h6"
                      className="pl-2 text-gray-700 font-bold w-48 pt-6 "
                    >
                      Value{" "}
                    </Typography>

                    <div className="flex flex-row px-2">
                      <div className="grow flex flex-row-reverse"></div>
                    </div>
                  </div>
                  <div className=" space-y-0.5  ">
                    {arr.map((item, index) => {
                      return (
                        <div className="h-11 flex items-center border-y-2 border-x-2 pl-6  flex-row">
                          <input
                            className="focus:outline-none"
                            onChange={(e) => editNew(e, index)}
                            size="lg"
                            value={item.value}
                            type="text"
                          />
                          <div className="w-full flex justify-end pr-2">
                            <button
                              type="submit"
                              onClick={() => {
                                removeItem(item.id);
                              }}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className=" mt-3">
                    <Input
                      value={boxselection}
                      size="lg"
                      type="text"
                      onChange={(e) => setBoxselection(e.target.value)}
                      onBlur={(e) => push1(e)}
                      label="Value"
                    />
                  </div>
                  <br></br>
                  {AllowSingle ? (
                    <>
                      <div
                        className={` flex flex-row items-center border border-gray-300 p-3 bg-gray-200  'mt-2 rounded-t-lg' : 'my-2 rounded'`}
                      >
                        <div className="grow-0 pl-2 text-gray-700 font-bold w-48 ">
                          <Typography variant="h6">Value </Typography>
                        </div>
                        <div className="grow flex flex-row-reverse">
                          <div className="w-full bg-white">
                            <Select
                              onChange={(value) => setselectArray(value)}
                              size="lg"
                              label="select values"
                            >
                              {filter.map((item, index) => (
                                <Option value={item.value} key={index}>
                                  {item.value}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {AllowMultiple ? (
                    <>
                      <div
                        className={` flex flex-row items-center border border-gray-300 p-3 bg-gray-200  'mt-2 rounded-t-lg' : 'my-2 rounded'`}
                      >
                        <div className="grow-0 pl-2 text-gray-700 font-bold w-48 ">
                          <Typography variant="h6">Value </Typography>
                        </div>
                        <div className="grow flex flex-row-reverse">
                          <Button
                            className="flex items-center w-full bg-white pl-4 h-10 text-blue-500 "
                            onClick={() => setopenModal(!openModal)}
                            variant="text"
                          >
                            All values
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              {numberatt ? (
                <div>
                  <div
                    className={`flex flex-row items-center border border-gray-300 p-3 bg-gray-200  'mt-2 rounded-t-lg' : 'my-2 rounded'`}
                  >
                    <div className="h-10 flex items-center grow-0 w-48 ">
                      <div className="grow-0 pl-2 text-gray-700 font-bold ">
                        <Typography variant="h6">Precision</Typography>
                      </div>
                    </div>
                    <div className="grow flex flex-row-reverse ">
                      <div className=" w-full bg-white ">
                        <select
                          className="h-10 w-full"
                          size="lg"
                          onChange={(e) => setnumbervalue(e.target.value)}
                          label="1"
                        >
                          <option value="0"> 1</option>
                          <option value="1"> .0</option>
                          <option value="2"> .00</option>
                          <option value="3"> .000</option>
                          <option value="4"> .0000</option>
                          <option value="5"> .00000</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div
                    className={`flex flex-row items-center border border-gray-300 p-3 bg-gray-200  'mt-2 rounded-t-lg' : 'my-2 rounded'`}
                  >
                    <div className="grow-0 pl-2 text-gray-700 font-bold w-48 ">
                      <Typography variant="h6">Value </Typography>
                    </div>
                    <div className=" grow flex flex-row-reverse">
                      <div className="w-full bg-white">
                        <Input
                          className="focus:outline-none h-10 w-full"
                          inputMode="numeric"
                          type="text"
                          value={state}
                          onChange={tofix}
                          label="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              {toggleatt ? (
                <div>
                  <br></br>
                  <br></br>
                  <div className=" border border-gray-300 h-14 flex flex-row ">
                    <div className="bg-gray-200 py-3 w-52 pr-[120px] pl-4 text-gray-700 font-bold text-sm ">
                      <Typography variant="h6">Value</Typography>
                    </div>
                    <div className="flex flex-col pt-3 pr-10 pl-4 items-center pb-10">
                      <Switch
                        onChange={() => setToggle(!toggle)}
                        label={String(toggle)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="text-right">
            <Button
              className=""
              onClick={prepareDataBeforeCallback}
              disabled={false}
            >
              Add
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      <AllowMultipleModal
        open={openModal}
        handle={setopenModal}
        name={nameAttribute}
        dataArr={arr}
      />
    </>
  );
};

export default addCustomAttributes;
