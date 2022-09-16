import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";

import { useEffect } from "react";

const AllowMultipleModal = (props) => {
  const [open, setOpen] = useState(false);
  const [arrmulti, setArrmulti] = useState([]);
  const [boxname, setBoxname] = useState("");
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState([]);
  const [newarr, setNewarr] = useState([]);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = newarr.filter((el) => {
    if (inputText == "") {
      return el;
    } else {
      return el.value.toLowerCase().includes(inputText);
    }
  });
  console.log("filter", filter);
  console.log("newarr", newarr);

  // let filterD = props.dataArr.filter((x) => x !== "");

  const push = (e) => {
    let count1 = newarr[newarr.length - 1].id + 1;
    if (boxname !== "") {
      arrmulti.push({ id: count1, value: boxname, isChecked: true });
      setArrmulti([...arrmulti]);
      setBoxname("");
    }
  };

  useEffect(() => {
    setFilter(props.dataArr);
    setNewarr([...props.dataArr, ...arrmulti]);
  }, [props.open, arrmulti]);

  const removeItem = (item) => {
    if (boxname.value !== "") {
      const remove = arrmulti.filter((x) => x.id !== item);
      setArrmulti([...remove]);
      console.log("new remove", arrmulti);
    }
  };

  const handleOpen = () => props.handle(!props.open);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = filteredData.map((user) => {
        return { ...user, isChecked: checked };
      });
      setNewarr(tempUser);
    } else {
      let tempUserold = filteredData.map((item) =>
        item.id == name ? { ...item, isChecked: checked } : item
      );
      setNewarr(tempUserold);
    }
  };

  let checkT = newarr.filter((checked) => checked.isChecked == true);

  return (
    <Fragment>
      <Dialog
        open={props.open}
        handler={handleOpen}
        className="overflow-visible"
        size="md"
      >
        <DialogHeader className="flex justify-between">
          <div>
            <Button
              className=" bg-gray-200"
              variant="text"
              onClick={handleOpen}
            >
              {" "}
              x{" "}
            </Button>
          </div>
          <div>{props.name}</div>
          <div className="w-16" />
        </DialogHeader>

        <DialogBody
          className="overflow-auto  h-auto"
          style={{ maxHeight: "75vh" }}
          divider
        >
          <div className="flex-col  w-full space-y-2  mt-4 ">
            <div className="h-12  pl-5  pr-5 ">
              <div className="h-12 w-full pl-6 pr-6  border-b-2  ">
                <Input
                  className="h-12  "
                  size="lg"
                  id="outlined-basic"
                  onChange={inputHandler}
                  label="Search values"
                />
              </div>
            </div>

            <div className="h-12  pl-5  pr-5">
              <div className="h-12 w-full pl-6 border-b-2 border-gray-500 ">
                <div className="form-check">
                  <Checkbox
                    className="form-check-input"
                    name="allSelect"
                    id="allSelect"
                    checked={
                      !filteredData.some((user) => user?.isChecked !== true)
                    }
                    onChange={handleChange}
                    label={`All Select (${checkT.length} selected)`}
                  />
                </div>
              </div>
            </div>
            <div className="pl-5 pr-5 ">
              {filteredData.map((item, index) => {
                return item.id > filter[filter.length - 1].id ? (
                  <div className="border-b-2 pl-6 flex flex-row">
                    <div className="form-check" key={index}>
                      <Checkbox
                        type="checkbox"
                        label={item.value}
                        name={item.id}
                        checked={item?.isChecked || false}
                        onChange={handleChange}
                        id={`arrmult${index}`}
                      />
                    </div>

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
                ) : (
                  <div className="border-b-2 pl-6 flex flex-row">
                    <div className="form-check" key={index}>
                      <Checkbox
                        label={item.value}
                        name={item.id}
                        checked={item?.isChecked || false}
                        onChange={handleChange}
                        id={`filter${index}`}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-row h-12 w-full pl-6 border-b-2 ">
                <input
                  className="focus:outline-none "
                  value={boxname}
                  size="lg"
                  type="text"
                  onChange={(e) => setBoxname(e.target.value)}
                  onBlur={(e) => push(e)}
                  placeholder="Add value"
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              handleOpen();
            }}
          >
            <span>Done</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};
export default AllowMultipleModal;
