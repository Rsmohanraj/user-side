import { clearError,
     forgetPasswordFail,
     forgetPasswordRequest,
     forgetPasswordSuccess,
     loadUserFail,
     loadUserRequest,
     loadUserSuccess,
     loginFail,
     loginRequest, 
     loginSuccess, 
     logoutFail, 
     logoutSuccess, 
     registerFail,
     registerRequest,
     registerSuccess, 
     resetPasswordFail, 
     resetPasswordRequest, 
     resetPasswordSuccess, 
     updatePasswordFail, 
     updatePasswordRequest, 
     updatePasswordSuccess, 
     updateProfileFail, 
     updateProfileRequest,
     updateProfileSuccess} from "../Slices/authSlice"
       
import axios from "axios";
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from "../Slices/userSlice";
export const login =(email, password) => async(dispatch)=>{
    try{
        dispatch(loginRequest())
        const {data} = await axios.post('https://server-side-16.onrender.com/api/v1/login',{email,password});
        dispatch(loginSuccess(data));
    }catch(error){
        dispatch(loginFail(error.response.data.message))

    }


}
export const clearAuthError = dispatch=>{
    dispatch(clearError())
}


export const register =(userData) => async(dispatch)=>{
    try{
        dispatch(registerRequest())
        const  config={
            
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            
        }
       
        const {data} = await axios.post('https://server-side-16.onrender.com/api/v1/register',userData, config);
        dispatch(registerSuccess(data));
    }catch(error){
        dispatch(registerFail(error.response.data.message))

    }


}
export const loadUser = async (dispatch) => {
    try {
        console.log('Loading user profile...'); // Log the request status
        dispatch(loadUserRequest());

        const { data } = await axios.get('https://server-side-16.onrender.com/api/v1/userprofile');
        dispatch(loadUserSuccess(data));
    } catch (error) {
        console.error('Error loading user profile:', error); // Log the error object
        const message = error.response?.data?.message || error.message || 'An error occurred';
        dispatch(loadUserFail(message));
    }
};

export const logout = async(dispatch)=>{
    try{
       
       await axios.get('https://server-side-16.onrender.com/api/v1/logout');
        dispatch(logoutSuccess());
    }catch(error){
        dispatch(logoutFail)

    }


}
export const updateProfile =(userData) => async(dispatch)=>{
    try{
        dispatch(updateProfileRequest())
        const config ={
            headers:{
                'content-type': "multipart/form-data"
            }
        }
    
        const {data} = await axios.put('https://server-side-16.onrender.com/api/v1/update',userData,config);
        dispatch(updateProfileSuccess(data));
    }catch(error){
        dispatch(updateProfileFail(error.response.data.message))

    }


}
export const updatePassword =(formData) => async(dispatch)=>{
    try{
        dispatch(updatePasswordRequest())
        const config ={
            headers:{
                'content-type': "application/json"
            }
        }

         await axios.put('https://server-side-16.onrender.com/api/v1/password/change',formData, config);
        dispatch(updatePasswordSuccess());
    }catch(error){
        dispatch(updatePasswordFail(error.response.data.message))

    }


}
export const forgetPassword =(formData) => async(dispatch)=>{
    try{
        dispatch(forgetPasswordRequest())
        const config ={
            headers:{
                'content-type': "application/json"
            }
        }
        
    
         const {data}  = await axios.post('https://server-side-16.onrender.com/api/v1//Password/forget',formData,config);
        dispatch(forgetPasswordSuccess(data));
    }catch(error){
        dispatch(forgetPasswordFail(error.response.data.message))

    }


}
export const resetPassword =(formData,token) => async(dispatch)=>{
    try{
        dispatch(resetPasswordRequest())
        const config ={
            headers:{
                'content-type': "application/json"
            }
        }
        
    
         const {data}  = await axios.post(  `https://server-side-16.onrender.com/api/v1/password/reset/${token}`,formData,config);
        dispatch(resetPasswordSuccess(data));
    }catch(error){
        dispatch(resetPasswordFail(error.response.data.message))

    }


}
export const getUsers  = async(dispatch)=>{
    try{
        dispatch(usersRequest())
      const {data} = await axios.get('https://server-side-16.onrender.com/api/v1/admin/users');
        dispatch(usersSuccess(data));
    }catch(error){
        dispatch(usersFail(error.response.data.message))

    }


}
export const getUser  = id =>  async(dispatch)=>{
    try{
        dispatch(userRequest())
      const {data} = await axios.get(`https://server-side-16.onrender.com/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data));
    }catch(error){
        dispatch(userFail(error.response.data.message))

    }


}
export const deleteUser  = id =>  async(dispatch)=>{
    try{
        dispatch(deleteUserRequest())
      await axios.delete(`https://server-side-16.onrender.com/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess());
    }catch(error){
        dispatch(deleteUserFail(error.response.data.message))

    }


}
export const updateUser =(id,formData) => async(dispatch)=>{
    try{
        dispatch(updateUserRequest())
        const config ={
            headers:{
                'content-type': "application/json"
            }
        }

         await axios.put(`https://server-side-16.onrender.com/api/v1/admin/user/${id}`,formData, config);
        dispatch(updateUserSuccess());
    }catch(error){
        dispatch(updateUserFail(error.response.data.message))

    }


}
