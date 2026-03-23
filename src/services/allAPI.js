import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

// register api

export const registerAPI = async (userDetails)=>{
    return await commonAPI("POST",`${serverURL}/register`,userDetails)
}

export const loginAPI = async (userDetails)=>{
    return await commonAPI("POST",`${serverURL}/login`,userDetails)
}

export const googleLoginAPI = async (userDetails) => {
  return await commonAPI("POST", `${serverURL}/google-login`, userDetails);
};