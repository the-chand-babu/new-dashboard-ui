"use client";

import React, { ChangeEvent, useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import { Button } from "@/components/ui/button";
import { checkBoxData } from "./helperData";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Switch from "@radix-ui/react-switch";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import "./style.scss";
import Image from "next/image";

const FormsDetails = () => {
  const [progress, setProgress] = useState(40);
  const [images, setImages] = useState<string[]>([]);
  const [isUrlFieldShow, setIsUrlFieldShow] = useState(false);
  const [isReraVisible, setIsReraVisible] = useState("yes");
  const [checkList, setCheckList] = useState(checkBoxData);

  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (event) => {
      const e = event as unknown as ChangeEvent<HTMLInputElement>;
      const files: any = e.target.files;
      const fileUrl = URL.createObjectURL(files[0]);
      setImages((prev) => [...prev, fileUrl]);
      console.log(setProgress);
    };
  };

  return (
    <div id="form-container-wrapper">
      <p className="heading">Update Amenities</p>
      <p className="sub-heading">
        Fill out the Amenities below about this new project
      </p>
      <Progress.Root className="ProgressRoot" value={progress}>
        <Progress.Indicator
          className="ProgressIndicator"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
      <p className="percentage">{progress + "% Completed"}</p>
      <div className="select-all-btn-wrapper">
        <p className="title">Amenities</p>
        <Button
          className="select-all-btn"
          onClick={() => {
            setCheckList((prev) =>
              prev.map((item) => ({ ...item, isChecked: true }))
            );
          }}
        >
          <div className="icon">+</div>
          Select All
        </Button>
      </div>

      <div className="checkbox-container-wrapper">
        {checkList?.map(
          (
            item: { label: string; isChecked: boolean; value: string },
            index
          ) => {
            return (
              <div
                style={{ display: "flex", alignItems: "center" }}
                key={index}
              >
                <Checkbox.Root
                  className="CheckboxRoot"
                  id="c1"
                  checked={item.isChecked}
                  onChange={(value) => {
                    console.log("handle change", value);
                  }}
                  onCheckedChange={(value) => {
                    const isChecked = Boolean(value); // Convert value to boolean
                    setCheckList((prev) =>
                      prev.map((check) =>
                        check.value === item.value
                          ? { ...check, isChecked }
                          : check
                      )
                    );
                  }}
                >
                  <Checkbox.Indicator className="CheckboxIndicator">
                    <CheckIcon style={{ height: "18px", width: "18px" }} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label className="Label" htmlFor="c1">
                  {item.label}
                </label>
              </div>
            );
          }
        )}
      </div>

      <div className="file-upload-wrapper">
        <p className="title">Images</p>
        <div className="file-upload-container" onClick={handleUploadImage}>
          Click or drag image here to upload
        </div>
        <div className="image-prev-wrapper">
          {images?.map((image) => {
            return (
              <Card key={image} className="image-card">
                <div
                  className="close-btn"
                  onClick={() =>
                    setImages((prev) => prev.filter((item) => item !== image))
                  }
                >
                  x
                </div>
                <Image
                  className="image"
                  src={image}
                  alt={image}
                  height={200}
                  width={200}
                />
                <div className="description-wrapper">
                  <p className="text">Description</p>
                  <p className="text">set Primary</p>
                </div>
                <CardFooter className="footer-wrapper">
                  <Input
                    type="text"
                    placeholder="Add label"
                    className="input-field"
                  />
                  <Switch.Root className="SwitchRoot" id="airplane-mode">
                    <Switch.Thumb className="SwitchThumb" />
                  </Switch.Root>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="url-wrapper">
          {isUrlFieldShow ? (
            <div className="input-url-wrapper">
              <p className="text">YouTube URLs</p>
              <Input
                className="input-url"
                type="text"
                placeholder="https://www.yutube.com/watch?v="
              />
            </div>
          ) : null}
          <Button
            className="add-another-url-btn"
            onClick={() => setIsUrlFieldShow((prev) => !prev)}
          >
            <div className="icon">+</div>
            Add another URL
          </Button>
        </div>

        <div className="radio-selection-wrapper">
          <p className="text">Is the project PERA register</p>
          <RadioGroup.Root
            className="RadioGroupRoot"
            defaultValue={isReraVisible}
            aria-label="View density"
            onValueChange={(value) => {
              setIsReraVisible(value);
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item className="RadioGroupItem" value="yes" id="r1">
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r1">
                Yes
              </label>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item className="RadioGroupItem" value="no" id="r3">
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="r3">
                No
              </label>
            </div>
          </RadioGroup.Root>
        </div>

        {/* rera number */}
        {isReraVisible === "yes" ? (
          <div className="rera-number">
            <p className="rera-number-text">Rera Number(s)</p>
            <Input
              placeholder="Add rera number"
              className="rera-number-input"
            />
            <Button className="add-another-url-btn">
              <div className="icon">+</div>
              Add another Rera
            </Button>
          </div>
        ) : null}

        {/* address  card*/}
        <div className="address-card">
          <div className="addres-card-content-wrapper">
            <div className="content-box">
              <p>Landmark</p>
              <Select.Root>
                <Select.Trigger className="SelectTrigger" aria-label="Food">
                  <Select.Value placeholder="Select Landmark" />
                  <Select.Icon className="SelectIcon">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    className="SelectContent-content"
                    style={{
                      background: "white",
                      boxShadow:
                        "0px 10px 38px -10px rgba(22, 23, 24, 0.35),0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
                      padding: "20px",
                    }}
                  >
                    <Select.ScrollUpButton className="SelectScrollButton">
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="SelectViewport">
                      <Select.Group>
                        <SelectItem style={{ outline: "none" }} value="apple">
                          Park
                        </SelectItem>
                        <SelectItem style={{ outline: "none" }} value="banana">
                          Kundalhalli Gate
                        </SelectItem>
                        <SelectItem
                          style={{ outline: "none" }}
                          value="blueberry"
                        >
                          D-Mart
                        </SelectItem>
                        <SelectItem style={{ outline: "none" }} value="grapes">
                          Smart bazar
                        </SelectItem>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className="content-box">
              <p>Distance</p>
              <Input placeholder="add distance" className="distance-field" />
            </div>
          </div>

          <div className="text-aria-box">
            <p>Description</p>
            <textarea className="text-area" />
          </div>

          <div className="address-latitude-box">
            <div className="map-location-box">
              <p>Latitude</p>
              <Input className="latitude" placeholder="18.14.133.131.2" />
            </div>
            <div className="map-location-box">
              <p>Longitute</p>
              <div className="map-icon-box">
                <Input className="latitude" placeholder="18.14.133.131.2" />
                <Modal />
              </div>
            </div>
          </div>
        </div>
        <div className="devider"></div>
        <Button
          className="connectivity-btn"
          onClick={() => setIsUrlFieldShow((prev) => !prev)}
        >
          <div className="icon">+</div>
          Add Connectivity item
        </Button>

        <div className="save-btn-wrapper">
          <Button className="save-btn">Previous</Button>
          <Button className="save-btn">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default FormsDetails;

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

// map icon

const MapPinIcon: React.FC = () => {
  return (
    <div style={styles.iconContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        style={styles.icon}
      >
        <rect width="24" height="24" rx="6" fill="#e0e0e0" />
        <path
          d="M12 2C8.686 2 6 4.686 6 8c0 3.178 4.365 8.281 5.498 9.529.295.325.709.471 1.133.471s.838-.146 1.133-.471C13.635 16.281 18 11.178 18 8c0-3.314-2.686-6-6-6zm0 9a3 3 0 110-6 3 3 0 010 6z"
          fill="#000"
        />
      </svg>
    </div>
  );
};

const styles = {
  iconContainer: {
    display: "inline-block",
  },
  icon: {
    display: "block",
  },
};

const Modal = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <Dialog.Root
      open={isMapOpen}
      onOpenChange={() => setIsMapOpen((prev) => !prev)}
    >
      <Dialog.Trigger asChild>
        <button>
          <MapPinIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <div className="modal-container-map-wrapper">
            <iframe
              title="google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.879295128501!2d-122.0842496846812!3d37.42199997981988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24c5a9a11bb%3A0x676d8d1d11f0f3b3!2sGoogleplex!5e0!3m2!1sen!2sus!4v1673762910193!5m2!1sen!2sus"
              width="450"
              height="400"
              style={{ border: 0 }}
              // allowFullScreen=""
              loading="lazy"
            ></iframe>
            <Button className="save-btn" onClick={() => setIsMapOpen(false)}>
              Save
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
