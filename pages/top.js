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
} from "@material-tailwind/react";

const Options = () => {
  const [openaddop, setOpenaddop] = useState(false);
  const [openCvari, setOpencvari] = useState(false);
  const [openedit, setOpenedit] = useState(false);
  const [openaddva, setOpenaddva] = useState(false);
  const [openaddUn, setOpenaddUn] = useState(false);
  const [openaddatt, setOpenaddatt] = useState(false);

  const [tab, settab] = useState(null);
  const [size, setSize] = useState(null);
  const [size3, setSize3] = useState(null);
  const [textatt, setTextatt] = useState(false);
  const [selectionatt, setSelectionatt] = useState(false);
  const [numberatt, setNumberatt] = useState(false);
  const [toggleatt, setToggleatt] = useState(false);

  const [arr, setArr] = useState([]);
  const [clonet, setClonet] = useState([]);
  const [opName, setopName] = useState("");
  const [option, setoption] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [priceover, setPriceover] = useState(0);
  const [location, setLocation] = useState("");
  const [vname, setVname] = useState("");

  const handleChange = (value) => {
    // console.log('handleChange: ', value)
    setLocation(value);
  };

  const variationdata = [
    {
      VName: vname,
      SKU: sku,
      Unit: unit,
      Price: price,
      PriceOver: priceover,
      Location: location,
    },
  ];

  const inputOptionName = (event) => {
    setopName(event.target.value);
  };
  const inputOption = () => {
    arr.push(option);
    setArr([...arr]);
    console.log(arr);
  };

  const handleOpen = () => setOpenaddop(!openaddop);
  const handleOpenaddUn = (value) => {
    setOpenaddUn(!openaddUn), setSize3(value), setUnit(value);
  };
  const handleOpenV = () => {
    const itemData = {
      opName: opName,
      option: arr,
    };
    setOpencvari(!openCvari), setOpenaddop(!openaddop);
    setClonet(itemData.option);
  };
  const handleconfirm = () => setOpencvari(!openCvari);
  const handleOpenE = (value) => {
    setOpenedit(!openedit),
      { variationdata },
      console.log(variationdata),
      setSize(value),
      settab(value);
  };
  const handleOpenadd = () => {
    setOpenaddva(!openaddva), { variationdata }, console.log(variationdata);
  };

  const handleOpenaddatt = (value) => {
    setOpenedit(!openedit), setSize(value), setOpenaddatt(!openaddatt);
  };

  return (
    <>
      <div>
        <Typography variant="h4">Option</Typography>
        <p>
          Add a custom set of options to an item to create variations. For
          example, a size option set can create<br></br>
          variations small, medium, and large. Learn more
        </p>
        <Button
          onClick={handleOpen}
          className="w-1/2 bg-gray-200 border-gray-50 text-indigo-500"
          variant="outlined"
        >
          Add Options
        </Button>

        {/* Add options */}
        <Dialog
          open={openaddop}
          handler={handleOpen}
          className="overflow-visible"
        >
          <DialogHeader>
            <div>Add options</div>
          </DialogHeader>
          <DialogBody divider>
            <div>
              <p>
                Create option sets to group options. For example, a set called
                “Primary Color” may contain Black and White options.
              </p>
              <Typography variant="h6">Option set name </Typography>
              <Input size="lg" label="Search" onChange={inputOptionName} />
              <div>
                <Typography variant="h6">Option</Typography>
                <Input
                  size="lg"
                  label="Add option"
                  onChange={(e) => setoption(e.target.value)}
                  onBlur={inputOption}
                />
                {arr.map((todo, index) => {
                  return (
                    <Input
                      key={index}
                      size="lg"
                      label="Add option"
                      onChange={(e) => setoption(e.target.value)}
                      onBlur={inputOption}
                    />
                  );
                })}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpenV}>
              <span>Next</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {/* Create variations */}
        <Dialog
          open={openCvari}
          handler={handleOpenV}
          className="overflow-visible"
        >
          <DialogHeader>
            <div>Create variations</div>
          </DialogHeader>
          <DialogBody divider>
            <div>
              <label>
                The variations below will be created from your options.
              </label>
              <div className="divide-y-2 divide-slate-400 ">
                <Checkbox defaultChecked />
                All variations
                <div>
                  {clonet.map((todo, index) => {
                    return <Checkbox key={todo} label={clonet[index]} />;
                  })}
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={handleconfirm}>
              <span>Create variations</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {/* Edit variations */}
        <Dialog
          open={size === "lg" || tab === "1"}
          handler={handleOpenE}
          size={size || "md"}
          tab={tab || "2"}
          className="overflow-visible"
        >
          <Tabs value="1" className="overflow-visible">
            <DialogHeader>
              <div className="felx felx-col w-full">
                Edit variations
                <div>
                  <TabsHeader>
                    <Tab value="1">Details</Tab>
                    <Tab value="2">Manage stock</Tab>
                    <Tab value="3">Custom attributes</Tab>
                  </TabsHeader>
                </div>
              </div>
            </DialogHeader>
            <DialogBody divider>
              <TabsBody className="overflow-visible">
                <TabPanel value="1">
                  <div className="w-full">
                    <div className="flex">
                      <label className="w-40">Variation name</label>
                      <Input onChange={(e) => setVname(e.target.value)} />
                    </div>
                    <div className="font-semibold">Sales Information</div>
                    <div className="flex flex-col ">
                      <label className="w-40">SKU</label>
                      <Input onChange={(e) => setSku(e.target.value)} />
                      <label className="w-40">Unit</label>
                      <Select
                        size="lg"
                        value={unit}
                        onChange={(value) => handleOpenaddUn("md", value)}
                      >
                        <Option value="per item">Per Item</Option>
                        <Option value="per hour">Per Hour (Add Unit)</Option>
                        <Option value="per liter">Per Liter (Add Unit)</Option>
                        <Option value="per ounce">Per Ounce (Add Unit)</Option>
                        <Option value="per pound">Per Pound (Add Unit)</Option>
                        <Option value="per yard">Per Yard (Add Unit)</Option>
                      </Select>
                      <label className="w-40">Price</label>
                      <Input
                        placeholder="฿0.00"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="pl-5 pt-4 ">
                      <header className="border-dashed border border-gray-300 py-3 ">
                        <label className="pl-3">Drag image here, </label>
                        <label
                          htmlFor="uploadImage"
                          className="text-blue-700 cursor-pointer font-semibold"
                        >
                          upload
                        </label>
                        <input
                          id="uploadImage"
                          type="file"
                          className="no-underline hidden"
                          accept="image/"
                          name="image"
                          // onChange={imageChange}
                        />

                        <label> or </label>
                        <label
                          className="text-blue-700 cursor-pointer font-semibold"
                          // onClick={openbrowseimagelibraryModal}
                        >
                          browse image library
                        </label>
                        <input
                          id="browseImage"
                          type="file"
                          className="no-underline hidden"
                        />
                        {/* { {selectedImage && (
                <div className="pl-3 pt-4">
                  <div className="h-20 w-20 rounded-md border border-gray-300 hover:border-blue-600">
                    <img
                      className="h-12 w-20 pl-2 pr-2 pt-2"
                      src={URL.createObjectURL(selectedImage)}
                      alt="Thumb"
                    />
                    <button onClick={removeSelectedImage} className="pl-2.5">
                      Remove
                    </button>
                  </div>
                </div>
              )} } */}
                      </header>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="w-full">
                    <div className="divide-y-2 divide-slate-400">
                      <Typography variant="h6">Locations and stock</Typography>
                      <div>
                        <Checkbox defaultChecked />
                        <a>Available at 1 of 1 locations</a>
                      </div>
                    </div>
                    <div className="border border-current">
                      <Checkbox defaultChecked />
                      <a>Available at My Business</a>
                    </div>
                    <div className="border border-t-0 border-current">
                      <Switch id="Tracking" label="Tracking" />
                    </div>
                    <div className="border border-t-0 border-current">
                      <label className="w-40">Current stock</label>
                      <Input />
                    </div>
                    <div className="border border-t-0 border-current">
                      <Switch
                        id="Mark"
                        label="Mark as sold out on Point of Sale and Online"
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div>
                    <Button
                      className="w-full bg-inherit border-slate-400 text-indigo-500 text-justify"
                      variant="outlined"
                      onClick={handleOpenaddatt}
                    >
                      Add custom attribute
                    </Button>
                  </div>
                </TabPanel>
              </TabsBody>
            </DialogBody>
            <DialogFooter>
              <Button variant="gradient" color="green" onClick={handleOpenE}>
                <span>Done</span>
              </Button>
            </DialogFooter>
          </Tabs>
        </Dialog>
        {/* Add variations button */}
        <Dialog
          open={openaddva}
          handler={handleOpenadd}
          className="overflow-visible"
        >
          <DialogHeader>
            <div>
              <label>Add variations </label>
            </div>
          </DialogHeader>
          <DialogBody divider>
            <div>
              <div className="flex">
                <label className="w-40">Variation name</label>
                <Input onChange={(e) => setVname(e.target.value)} />
              </div>
              <div className="font-semibold">Sales Information</div>
              <div className="flex flex-col">
                <label className="w-40">SKU</label>
                <Input onChange={(e) => setSku(e.target.value)} />
                <label className="w-40">Unit</label>
                <Select size="lg" className="">
                  <Option>Per Item</Option>
                  <Option>Per Hour (Add Unit)</Option>
                  <Option>Per Liter (Add Unit)</Option>
                  <Option>Per Ounce (Add Unit)</Option>
                  <Option>Per Pound (Add Unit)</Option>
                  <Option>Per Yard (Add Unit)</Option>
                </Select>
                <label className="w-40">Price</label>
                <Input
                  placeholder="฿0.00"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="pl-5 pt-4">
                <header className="w-[30.8rem] border-dashed border border-gray-300 py-3 ">
                  <label className="pl-3">Drag image here, </label>
                  <label
                    htmlFor="uploadImage"
                    className="text-blue-700 cursor-pointer font-semibold"
                  >
                    upload
                  </label>
                  <input
                    id="uploadImage"
                    type="file"
                    className="no-underline hidden"
                    accept="image/"
                    name="image"
                    // onChange={imageChange}
                  />

                  <label> or </label>
                  <label
                    className="text-blue-700 cursor-pointer font-semibold"
                    // onClick={openbrowseimagelibraryModal}
                  >
                    browse image library
                  </label>
                  <input
                    id="browseImage"
                    type="file"
                    className="no-underline hidden"
                  />
                  {/* { {selectedImage && (
                <div className="pl-3 pt-4">
                  <div className="h-20 w-20 rounded-md border border-gray-300 hover:border-blue-600">
                    <img
                      className="h-12 w-20 pl-2 pr-2 pt-2"
                      src={URL.createObjectURL(selectedImage)}
                      alt="Thumb"
                    />
                    <button onClick={removeSelectedImage} className="pl-2.5">
                      Remove
                    </button>
                  </div>
                </div>
              )} } */}
                </header>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={handleOpenadd}>
              <span>Done</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {/* Add a Unit */}
        <Dialog
          open={size3 === "md"}
          handler={handleOpenaddUn}
          size={size3 || "md"}
          className="overflow-visible"
        >
          <DialogHeader>
            <div>Add a Unit</div>
          </DialogHeader>
          <DialogBody divider>
            <div className="flex flex-col w-full">
              <Typography variant="h6">Unit </Typography>
              <Select size="lg">
                <Option> Acre (ac)</Option>
                <Option> Centimeter (cm)</Option>
                <Option> Cubic Foot (cu ft)</Option>
                <Option> Cubic Inch (cu in)</Option>
                <Option> Cubic Yard (cu yd)</Option>
                <Option> Cup (c)</Option>
                <Option> Day (day)</Option>
                <Option> Fluid Ounce (fl oz)</Option>
                <Option> Foot (ft)</Option>
                <Option> Gallon (gal)</Option>
                <Option> Gram (g)</Option>
                <Option> Hour (hr)</Option>
                <Option> Inch (in)</Option>
                <Option> Kilogram (kg)</Option>
                <Option> Kilometer (km)</Option>
                <Option> Liter (L)</Option>
                <Option> Meter (m)</Option>
                <Option> Mile (mi)</Option>
                <Option> Milligram (mg)</Option>
                <Option> Milliliter (mL)</Option>
                <Option> Millimeter (mm)</Option>
                <Option> Milisecond (ms)</Option>
                <Option> Minute (min)</Option>
                <Option> Ounce (oz)</Option>
                <Option> Pint (pt)</Option>
                <Option> Pound (lb)</Option>
                <Option> Quart (qt)</Option>
                <Option> Second (sec)</Option>
                <Option> Shot (sh)</Option>
                <Option> Square Centimeter (sq cm)</Option>
                <Option> Square Foot (sq ft)</Option>
                <Option> Square Inch (sq in)</Option>
                <Option> Square Kilometer (sq km)</Option>
                <Option> Square Meter (sq m)</Option>
                <Option> Square Mile (sq mi)</Option>
                <Option> Square Yard (sq yd)</Option>
                <Option> Stone (st)</Option>
                <Option> Yard (yd)</Option>
              </Select>
              <div>
                <Typography variant="h6">Precision</Typography>
                <Select size="lg">
                  <Option> 1</Option>
                  <Option> .0</Option>
                  <Option> .00</Option>
                  <Option> .000</Option>
                  <Option> .0000</Option>
                  <Option> .00000</Option>
                </Select>
              </div>
              <Typography variant="small">
                Precision is the number of decimal places that appear in
                checkout and reports. Remove a unit or edit precision in Items{" "}
                {">"} Units.
              </Typography>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={handleOpenaddUn}>
              <span>Create</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {/* Add custom attribute */}
        <Dialog
          open={openaddatt}
          handler={handleOpenaddatt}
          className="overflow-visible"
        >
          <DialogHeader>
            <div>Add custom attribute</div>
          </DialogHeader>
          <DialogBody divider>
            <div className="w-full">
              <Typography variant="h6">Custom attribute </Typography>
              <Input size="lg" label="Attribute Name" />
              <Typography variant="h6">Option</Typography>
              <Select id="items">
                <Option
                  value="Text"
                  onClick={() => {
                    setTextatt(!textatt);
                    setSelectionatt(selectionatt);
                  }}
                >
                  {" "}
                  Text{" "}
                </Option>
                <Option
                  value="Selection"
                  onClick={() => {
                    setSelectionatt(!selectionatt);
                    setTextatt(textatt);
                  }}
                >
                  {" "}
                  Selection
                </Option>
                <Option
                  value="Number"
                  onClick={() => {
                    setNumberatt(!numberatt);
                  }}
                >
                  {" "}
                  Number
                </Option>
                <Option
                  value="Toggle"
                  onClick={() => {
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
                  <Input size="lg" label="Value" />
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
                  />
                  <Radio
                    id="react"
                    name="type"
                    label="Allow single selection"
                    defaultChecked
                  />
                  <Typography variant="h6">Value </Typography>
                  <Input size="lg" label="Value" />
                </div>
              ) : (
                <></>
              )}
              {numberatt ? (
                <div>
                  <Typography variant="h6">Precision</Typography>
                  <Select size="lg">
                    <Option> 1</Option>
                    <Option> .0</Option>
                    <Option> .00</Option>
                    <Option> .000</Option>
                    <Option> .0000</Option>
                    <Option> .00000</Option>
                  </Select>

                  <Typography variant="h6">Value </Typography>
                  <Input size="lg" label="12345" />
                </div>
              ) : (
                <></>
              )}
              {toggleatt ? (
                <div>
                  <Typography variant="h6">Toggle</Typography>
                  <Switch />
                </div>
              ) : (
                <></>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={handleOpenaddatt}>
              <span>Next</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <div>
          <div className="flex">
            <Typography variant="h4" className="flex-1">
              variations
            </Typography>
            <label
              className="text-blue-700 cursor-pointer font-semibold flex-1 hover:underline "
              onClick={() => handleOpenE("lg")}
            >
              Edit variation details
            </label>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-1 w-1/2">
            <Input
              size="lg"
              label="SKU"
              placeholder="SKU"
              className="focus:placeholder-gray-500 placeholder-white"
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
          <div className="flex w-1/2">
            <Select
              size="lg"
              label="unit"
              value={unit}
              onChange={(value) => handleOpenaddUn("md", value)}
            >
              <Option value="per item">Per Item</Option>
              <Option value="per hour">Per Hour (Add Unit)</Option>
              <Option value="per liter">Per Liter (Add Unit)</Option>
              <Option value="per ounce">Per Ounce (Add Unit)</Option>
              <Option value="per pound">Per Pound (Add Unit)</Option>
              <Option value="per yard">Per Yard (Add Unit)</Option>
            </Select>
            <Input
              size="lg"
              label="price"
              placeholder="฿0.00"
              className="focus:placeholder-gray-500 placeholder-white"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <br></br>
          <div className="flex w-1/2">
            <Input
              size="lg"
              label="Price Override"
              placeholder="฿0.00"
              className="focus:placeholder-gray-500 placeholder-white"
              onChange={(e) => setPriceover(e.target.value)}
            />
            <Select
              size="lg"
              label="Location"
              value={location}
              onChange={(value) => handleChange(value)}
            >
              <Option value="location">Location</Option>
              <Option value="my Business">My Business</Option>
            </Select>
          </div>
        </div>

        <div>
          <div className="flex">
            <Typography variant="h6" className="flex-1">
              Stock
            </Typography>
            <label className="text-blue-700 cursor-pointer font-semibold hover:underline">
              Add low stock alert
            </label>
            |
            <label
              className="text-blue-700 cursor-pointer font-semibold flex-1 hover:underline"
              onClick={() => handleOpenE("lg", "1")}
            >
              Manage stock
            </label>
          </div>
        </div>

        <div>
          <Button
            onClick={handleOpenadd}
            className="w-1/2 bg-gray-200 border-gray-50 text-indigo-500"
            variant="outlined"
          >
            Add Variation
          </Button>
        </div>

        <div>
          <Typography variant="h6" className="flex-1">
            Custom Attributes
          </Typography>
          <Button
            onClick={handleOpenaddatt}
            className="w-1/2 bg-gray-200 border-gray-50 text-indigo-500"
            variant="outlined"
          >
            Add Attribute
          </Button>
        </div>
      </div>
    </>
  );
};

export default Options;
