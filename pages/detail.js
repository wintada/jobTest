import react from "React";
import CreatableSelect from "react-select/creatable";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useState } from "react";

const Detail = () => {
  const [selectedImage, setselectedImage] = useState();
  const [bgcolour, setbgcolour] = useState("bg-gray-300");
  const [itemname, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imagename, setImagename] = useState("");
  const [locationinput, setLocationinput] = useState("0");
  const [Locationscheck, setLocationscheck] = useState(false);
  const [Mybusinesscheck, setMyBusinesscheck] = useState(false);
  const [Availableatallfuturelocationscheck, setAvailableatallfuturelocations] =
    useState(false);

  //Modal
  const [LocationDialog, setLocationDialog] = useState(false);
  const OpenLocations = () => {
    setLocationDialog(true);
  };

  const CloseLocations = () => {
    setLocationDialog(false);
  };

  const [EditDialog, setEditDialog] = useState(null);
  const OpenEdit = (value) => setEditDialog(value);

  const [imglibraryDialog, setimglibraryDialog] = useState(false);
  const Openimglibrary = () => {
    setEditDialog(false);
    setimglibraryDialog(true);
  };

  const Closeimglibrary = () => {
    setimglibraryDialog(false);
  };

  // <-- Background colour --> //
  const bggray = (event) => {
    const gray300 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-gray-300 float-right");
    setbgcolour(event.target.value);
    // console.log(gray300);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-gray-300 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgbrown = (event) => {
    const brown600 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-brown-600 float-right");
    setbgcolour(event.target.value);
    // console.log(brown600);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-brown-600 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgorange = (event) => {
    const orange600 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-orange-600 float-right");
    setbgcolour(event.target.value);
    // console.log(orange600);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-orange-600 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgyellow = (event) => {
    const yellow300 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-yellow-300 float-right");
    setbgcolour(event.target.value);
    // console.log(yellow300);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-yellow-600 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bggreen = (event) => {
    const green500 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-green-500 float-right");
    setbgcolour(event.target.value);
    // console.log(green500);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-green-500 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgblue = (event) => {
    const blue400 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-blue-400 float-right");
    setbgcolour(event.target.value);
    // console.log(blue400);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-blue-400 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgindigo = (event) => {
    const indigo700 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-indigo-700 float-right");
    setbgcolour(event.target.value);
    // console.log(indigo700);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-indigo-700 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgpurple = (event) => {
    const purple300 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-purple-300 float-right");
    setbgcolour(event.target.value);
    // console.log(purple300);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-purple-300 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgpink = (event) => {
    const pink300 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-pink-300 float-right");
    setbgcolour(event.target.value);
    // console.log(pink300);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-pink-300 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const bgred = (event) => {
    const red500 = (document.getElementById("bgcolour").className =
      "object-fill h-32 w-48 bg-red-500 float-right");
    setbgcolour(event.target.value);
    // console.log(red500);

    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-red-500 pl-8 pr-8 text-center .hidden";
    setselectedImage(event.target.files);
  };

  const imageChange = (event) => {
    document.getElementById("textinbg").className = "hidden";
    if (event.target.files && event.target.files.length > 0) {
      setselectedImage(event.target.files[0]);
      const filename = event.target.files[0].name;
      setImagename(filename);
      setbgcolour("");
    //   console.log("filename: " + filename);
    }
  };

  const removeSelectedImage = (event) => {
    document.getElementById("textinbg").className =
      "text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-gray-300 pl-8 pr-8 text-center .hidden";
    setbgcolour("bg-gray-300");
    setselectedImage(event.target.files);
  };

  const checkboxLocation = () => {
    const locationCB = document.getElementById("Locations");
    const mybusinessCB = document.getElementById("My Business");
    const aaaflCB = document.getElementById(
      "Available at all future locations"
    );
    const input = document.getElementById("locationbtn");

    if (locationCB?.checked == true) {
      input?.setAttribute("disabled", "");
      setLocationscheck(true);
      mybusinessCB.checked = true;
      setMyBusinesscheck(true);
      aaaflCB.checked = true;
      setAvailableatallfuturelocations(true);
      setLocationinput("All Locations");
    } else {
      input?.removeAttribute("disabled");
      setLocationscheck(false);
      mybusinessCB.checked = false;
      setMyBusinesscheck(false);
      aaaflCB.checked = false;
      setAvailableatallfuturelocations(false);
      setLocationinput("0");
    }
  };

    const checkboxEditLocations = () => {
    const locationCB = document.getElementById("Locations");
    const mybusinessCB = document.getElementById("My Business");
    const aaaflCB = document.getElementById(
      "Available at all future locations"
    );
    const input = document.getElementById("locationbtn");

    if (aaaflCB?.checked == true) {
        input?.removeAttribute("disabled");
        setLocationscheck(true);
        setMyBusinesscheck(false)
        setAvailableatallfuturelocations(true);
        locationCB.checked = true;
        setLocationinput("Available at all future locations");
        if (aaaflCB?.checked == true && mybusinessCB?.checked == true) {
          input?.setAttribute("disabled", "");
          setAvailableatallfuturelocations(true);
          setLocationscheck(true);
          setMyBusinesscheck(true);
          locationCB.checked = true;
          setLocationinput("All locations");
        }
      } else if (aaaflCB?.checked == false && mybusinessCB?.checked == true) {
        input?.removeAttribute("disabled");
        setAvailableatallfuturelocations(false);
        setMyBusinesscheck(true);
        setLocationscheck(true);
        locationCB.checked = true;
        setLocationinput("My Business");
      } else {
        input?.removeAttribute("disabled");
        setAvailableatallfuturelocations(false);
        locationCB.checked = false;
        setLocationscheck(false);
        setLocationinput("0");
      }
  }

  const InputCatagory = (event) => {
    const value = event.value;
    setCategory(value);
  };

//   CatagoryOptions
  const categorySelect = [{ value: "example", label: "Example" }];

  const submit = (event) => {
    event.preventDefault();
    const checkedEditLocation = [{Locationscheck,Mybusinesscheck,Availableatallfuturelocationscheck}]
    const savedata = {
      itemname,
      category,
      description,
      bgcolour,
      selectedImage,
      checkedEditLocation,
    //   Locationscheck,
    //   Mybusinesscheck,
    //   Availableatallfuturelocationscheck,
    //   imagename,
    };
    console.log(savedata);
  };

  return (
    <>
      <form onSubmit={submit}>
        <div className="relative max-w-3xl ">
          <div className="p-5">
            <Typography variant="h5">Create an Item</Typography>
            <Typography variant="h6" className="pt-5">
              Details
            </Typography>
          </div>

          <div
            className="object-fill h-32 w-48 bg-gray-300 float-right"
            id="bgcolour"
          >
            <input
              id="textinbg"
              className="text-white text-2xl font-semibold object-fill h-32 w-48 float-right bg-gray-300 pl-8 pr-8 text-center .hidden"
              type="text"
              name="textinbg"
              onChange={(e) => setItemName(e.target.value)}
              value={itemname}
            ></input>
            {selectedImage && (
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className="object-fill h-32 w-48 float-right "
                  alt="Thumb"
                />
              </div>
            )}
            <div className="pt-32 ">
              <Button
                variant="text"
                EditDialog="md"
                className="w-[12rem]"
                onClick={() => OpenEdit("xs")}
              >
                Edit
              </Button>
            </div>
          </div>

          <div className="w-[34rem] pl-5 ">
            <Input
              EditDialog="lg"
              label="Item name"
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="w-[34rem] pl-5 pt-4">
            <CreatableSelect
              options={categorySelect}
              placeholder="Category"
              //   isClearable
              onChange={InputCatagory}
            />
          </div>

          <div className="w-[34rem] pl-5 pt-4">
            <Textarea
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pl-5 pt-4">
            <header className="w-[32.6rem] border-dashed border border-gray-300 py-3 ">
              <label className="pl-3 text-sm">Drag image here, </label>
              <label
                htmlFor="uploadImage"
                className="text-blue-700 cursor-pointer font-semibold text-sm"
              >
                upload
              </label>
              <input
                id="uploadImage"
                type="file"
                className="no-underline hidden"
                accept="image/*"
                name="image"
                onChange={imageChange}
              />

              <label className="text-sm"> or </label>
              <label
                className="text-blue-700 cursor-pointer font-semibold text-sm"
                onClick={Openimglibrary}
              >
                browse image library
              </label>
              <input
                id="browseImage"
                type="file"
                className="no-underline hidden"
              />
              {selectedImage && (
                <div className="pl-3 pt-4">
                  <div className="h-20 w-20 rounded-md border border-gray-300 hover:border-blue-600">
                    {console.log('selectedImage: ',selectedImage)}
                    <img
                      className="h-12 w-20 pl-2 pr-2 pt-2"
                      src={URL.createObjectURL(selectedImage)}
                      alt="Thumb"
                    />
                    <button
                      onClick={removeSelectedImage}
                      className="pl-2.5 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </header>
          </div>

          <div className="w-[34rem] pl-5 pt-4">
            <Input
              size="lg"
              label="Locations"
              onClick={OpenLocations}
              defaultValue={locationinput}
            />
          </div>

          {/* LocationDialog */}
          <Dialog open={LocationDialog} handler={OpenLocations}>
            <DialogHeader>Edit Locations</DialogHeader>
            <DialogBody divider>
              <div className="flex flex-col pl-8 pr-8">
                <label htmlFor="search" className="sr-only ">
                  Search
                </label>

                <div className="w-[32rem] pt-3 pb-3">
                  <Input
                    size="lg"
                    label="Search"
                    icon={
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    }
                  />
                </div>

                <div className="pt-3">
                  <Checkbox
                    label="Locations"
                    id="Locations"
                    onClick={checkboxLocation}
                    // onChange={e=>{setLocationscheck(e.target.checked)}}
                    defaultChecked={Locationscheck}                    
                  />
                </div>

                <div className="flex justify-center pt-3 pb-3">
                  <div className="border-t border-gray-300 w-[31rem]"></div>
                </div>

                <div className="pt-3">
                  <Checkbox
                    label="My Business"
                    id="My Business"
                    onClick={checkboxEditLocations}
                    // onChange={e=>{setMyBusinesscheck(e.target.checked)}}
                    defaultChecked={Mybusinesscheck}                    
                  />
                </div>

                <div className="pt-3">
                  <Checkbox
                    label="Available at all future locations"
                    id="Available at all future locations"
                    onClick={checkboxEditLocations}
                    // onChange={e=>{setAvailableatallfuturelocations(e.target.checked)}}
                    defaultChecked={Availableatallfuturelocationscheck}                    
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={CloseLocations}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={CloseLocations}
                id="locationbtn"
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>

          {/* EditDialog */}
          <Dialog
            open={EditDialog === "xs"}
            size={EditDialog || "md"}
            handler={OpenEdit}
          >
            <DialogHeader>Edit</DialogHeader>
            <DialogBody divider>
              <div className="flex flex-col">
                <Typography variant="h6" color="black">
                  Image
                </Typography>
                <div className="">
                  <header className="w-[22rem] border-dashed border border-gray-300 py-3 ">
                    <label className="pl-6 text-sm">Drag image here, </label>
                    <label
                      htmlFor="uploadImage"
                      className="text-blue-700 cursor-pointer text-sm"
                    >
                      upload
                    </label>
                    <input
                      id="uploadImage"
                      type="file"
                      className="no-underline hidden"
                      accept="image/*"
                      name="image"
                      onChange={imageChange}
                    />

                    <label> or </label>
                    <label
                      className="text-blue-700 cursor-pointer text-sm"
                      onClick={Openimglibrary}
                    >
                      browse image library
                    </label>
                    <input
                      id="browseImage"
                      type="file"
                      className="no-underline hidden"
                    />
                  </header>
                </div>

                <Typography variant="h6" color="black">
                  Recommended colors
                </Typography>
                <div className="flex w-max gap-4">
                  <Button
                    className="h-12 w-12 bg-gray-300"
                    value="bg-gray-300"
                    onClick={bggray}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-brown-600"
                    value="bg-brown-600"
                    onClick={bgbrown}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-orange-600"
                    value="bg-orange-600"
                    onClick={bgorange}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-yellow-300"
                    value="bg-yellow-300"
                    onClick={bgyellow}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-green-500"
                    value="bg-green-500"
                    onClick={bggreen}
                  ></Button>
                </div>
                <div className="flex w-max gap-4 pt-3">
                  <Button
                    className="h-12 w-12 bg-blue-400"
                    value="bg-blue-400"
                    onClick={bgblue}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-indigo-700"
                    value="bg-indigo-700"
                    onClick={bgindigo}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-purple-300"
                    value="bg-purple-300"
                    onClick={bgpurple}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-pink-300"
                    value="bg-pink-300"
                    onClick={bgpink}
                  ></Button>
                  <Button
                    className="h-12 w-12 bg-red-500"
                    value="bg-red-500"
                    onClick={bgred}
                  ></Button>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={() => OpenEdit(null)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={() => OpenEdit(null)}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>

          {/* imagelibraryDialog */}
          <Dialog open={imglibraryDialog} handler={Openimglibrary}>
            <DialogHeader>Image library</DialogHeader>
            <DialogBody divider>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus ad reprehenderit omnis perspiciatis aut odit! Unde
              architecto perspiciatis, dolorum dolorem iure quia saepe autem
              accusamus eum praesentium magni corrupti explicabo!
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={Closeimglibrary}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                // color="green"
                onClick={Closeimglibrary}
              >
                <span>Update Images</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>

        <div className="pl-5 pt-4">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
};

export default Detail;