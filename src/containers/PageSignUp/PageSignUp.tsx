import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, Navigate } from "react-router-dom";
import Select from "shared/Select/Select";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-input-2';
import { setAlert } from "state/alert/actions";
import { AppState, useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { register } from "state/auth/action";
import Label from "components/Label/Label";


export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
  icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const dispatch = useAppDispatch();

  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  );

  const [formData, setFormData] = useState({
    first_name    : "",
    last_name     : "",
    gender        : "Male",
    email         : "",
    password      : "",
    confirm       : "",
    country       : "",
    city          : "",
    phone_number  : "",  
  });
  
  const [ errMsg, setErrMsg ] = useState('');


  const { first_name, last_name, gender, email, password, confirm, country, city, phone_number } = formData;

  const onChange = (e: any) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSetCountry = (e: any) => {
    setFormData({...formData, country : e.target.value});
  }

  const handleSetGender = (e: any) => {
    setFormData({...formData, gender : e.target.value});
  }

  const handleSetPhoneNumber = (e: any) => {
    setFormData({...formData, phone_number : e.target.value});
  }

  const signUp = async (e:any) => {
    e.preventDefault();
    const data = {
      first_name: first_name,
      last_name:  last_name,
      gender: gender,
      email:  email,
      password: password,
      confirm:  confirm,
      country:  country,
      city: city,
      phone_number: phone_number,
    }
    if(password !== confirm) {
      // setAlert("Paswords do not match", "danger")(dispatch);
      setErrMsg('Paswords do not match');
    } else {
      register(data)(dispatch);
    }
  } 

  if(isAuthenticated == true) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post" onSubmit={signUp}>
            <div className="columns-2">
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input 
                  type="text" 
                  className="mt-1" 
                  name="first_name"
                  value={first_name}
                  onChange={onChange}
                  required
                />
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input 
                  type="text" 
                  className="mt-1" 
                  name="last_name"
                  value={last_name}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div> 
              <Label>Gender</Label>
              <Select className="mt-1.5" onChange={handleSetGender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Repeat Password
              </span>
              <Input 
                type="password" 
                className="mt-1" 
                name="confirm"
                value={confirm}
                onChange={onChange}
                required  
              />
            </label>
            {errMsg && <div className="alert alert-warning text-red-500">
                <strong>Oops!
                </strong> {errMsg}
            </div>}
            <div className="columns-2">
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Select Country
                </span>
                <Select className="mt-1" value={country} onChange={handleSetCountry}>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Thailand">Thailand</option>
                  <option value="France">France</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Jappan">Jappan</option>
                  <option value="Korea">Korea</option>
                  <option value="...">...</option>
                </Select>
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  City
                </span>
                <Input 
                  type="text" 
                  className="mt-1" 
                  name="city"
                  value={city}
                  onChange={onChange}
                />
              </label>
            </div>
            <label className="block">
              <PhoneInput
                placeholder="Enter phone number"
                value={phone_number}
                // onChange={handleSetPhoneNumber}
              />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
