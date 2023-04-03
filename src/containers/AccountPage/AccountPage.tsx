import Label from "components/Label/Label";
import { FC, useState, useEffect } from "react";
import axios from "axios";

import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "store";
import { updateProfile } from "state/profile/action";
import api from "utils/api";
import { ImagePath } from "utils/index";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {

  const dispatch = useAppDispatch();

  const userData = useSelector(
    (state: AppState) => state.auth.user
  );

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    address: "",
    phone_number: "",
    birthday: "",
    about_me: "",
    credit_card_number: "",
    holder_name: "",
    client_address: "",
  });

  const [image, setImage] = useState({ preview: '', data: '' })

  useEffect(() => {
    const origin_name = userData.first_name + " " + userData.last_name;
    const origin_address = userData.country + " " + userData.city;
    const origin_gender = userData.gender;
    const origin_email = userData.email;
    const origin_phone_number = userData.phone_number;
    const origin_birthday = userData.birthday;
    const origin_about_me = userData.about_me;
    const origin_credit_card_number = userData.billing_data === undefined ? '' : userData.billing_data.credit_card_number;
    const origin_holder_name = userData.billing_data !== undefined ? userData.billing_data.holder_name : "";
    const origin_client_address = userData.billing_data !== undefined ? userData.billing_data.client_address : "";
    setFormData({
      name: origin_name ? origin_name : "",
      gender: origin_gender ? origin_gender : "",
      email: origin_email ? origin_email : "",
      address: origin_address ? origin_address : "",
      phone_number: origin_phone_number ? origin_phone_number : "",
      birthday: origin_birthday ? origin_birthday : "",
      about_me: origin_about_me ? origin_about_me : "",
      credit_card_number: origin_credit_card_number ? origin_credit_card_number : "",
      holder_name: origin_holder_name ? origin_holder_name : "",
      client_address: origin_client_address ? origin_client_address : "",
    })
    setImage({ preview: (userData?.avatar ? ImagePath(userData?.avatar) : ""), data: image.data })
  }, [userData]);



  const { name, gender, email, address, phone_number, birthday, about_me, credit_card_number, holder_name, client_address } = formData;

  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];

  const country = address.split(" ")[0];
  const city = address.split(" ")[1];

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSetGender = (e: any) => {
    setFormData({ ...formData, gender: e.target.value });
  }

  const handleSetBirthday = (e: any) => {
    setFormData({ ...formData, birthday: e.target.value });
  }

  const update = async (e: any) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();

    formData.append("image", image.data);

    const { data } = await api.post('http://localhost:5000/api/upload', formData, config);

    const userInfo = {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      email: email,
      country: country,
      city: city,
      avatar: data[0]?.filename,
      birthday: birthday,
      about_me: about_me,
      phone_number: phone_number,
      credit_card_number: credit_card_number,
      holder_name: holder_name,
      client_address: client_address,
    }
    updateProfile(userInfo)(dispatch);
  }

  const handleFileChange = async (e: any) => {
    e.preventDefault();

    if (!e.target.files?.length) {
      return;
    }

    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking React Template</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start flex-col" >
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar imgUrl={image.preview} sizeClass="w-32 h-32" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                {/* image upload */}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  name="fileupload"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <form className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6" action="#" method="post" onSubmit={update}>
              <div>
                <Label>Name</Label>
                <Input
                  className="mt-1.5"
                  value={name}
                  name="name"
                  onChange={onChange}
                />
              </div>
              {/* ---- */}
              <div>
                <Label>Gender</Label>
                <Select className="mt-1.5" onChange={handleSetGender} value={gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              {/* ---- */}
              <div>
                <Label>Email</Label>
                <Input
                  className="mt-1.5"
                  value={email}
                  name="email"
                  onChange={onChange}
                />
              </div>
              {/* ---- */}
              <div className="max-w-lg">
                <Label>Date of birth</Label>
                <Input
                  className="mt-1.5"
                  type="date"
                  value={birthday}
                  name="birthdyay"
                  onChange={handleSetBirthday}
                />
              </div>
              {/* ---- */}
              <div>
                <Label>Addess</Label>
                <Input
                  className="mt-1.5"
                  value={address}
                  name="address"
                  onChange={onChange}
                />
              </div>
              {/* ---- */}
              <div>
                <Label>Phone number</Label>
                <Input
                  className="mt-1.5"
                  defaultValue="003 888 232"
                  name="phone_number"
                />
              </div>
              {/* ---- */}
              <div>
                <Label>About you</Label>
                <Textarea
                  className="mt-1.5"
                  value={about_me}
                  name="about_me"
                  onChange={onChange}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Credit Card Number</Label>
                  <Input
                    className="mt-1.5"
                    value={credit_card_number}
                    name="credit_card_number"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <Label>Holder Name</Label>
                  <Input
                    className="mt-1.5"
                    name="holder_name"
                    value={holder_name}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <Label>Client Address</Label>
                  <Input
                    className="mt-1.5"
                    name="client_address"
                    value={client_address}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="pt-2">
                <ButtonPrimary>Update info</ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
