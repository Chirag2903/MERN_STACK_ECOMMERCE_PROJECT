import React, { Fragment ,useState ,useEffect} from 'react'
import {  useNavigate} from 'react-router-dom';
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader"
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import {useDispatch,useSelector} from "react-redux";
import {clearerrors,loaduser,updateprofile} from "../../actions/useraction";
import {useAlert} from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../constants/userconstants';
import  Metdata from "../../component/layout/Metdata";

const UpdateProfile = () => {

    const dispatch=useDispatch();
    const alert = useAlert();


    const {user} = useSelector(state=>state.user)
    const {loading , isupdated , error } = useSelector ((state)=>state.profile);


    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [avatar, setavatar] = useState();
    const [avatarpreview, setavatarpreview] = useState("/Profile.png");


    const updateprofilesubmit =(e)=>{
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
    
        dispatch(updateprofile(myForm));
      }
    
      const updateprofiledatachange=(e)=>{
            const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setavatarpreview(reader.result);
              setavatar(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);

      }
    
      const navigate = useNavigate();
      useEffect(() => {

        if(user){
            setname(user.name);
            setemail(user.email);
            setavatarpreview(user.avatar.url);
        }
        if(error){
          alert.error(error);
          dispatch(clearerrors());
        }
       
        if(isupdated){
            alert.success("Profile Updated Successfully");
            dispatch(loaduser());
          navigate("/account");
          dispatch({
            type:UPDATE_PROFILE_RESET
          })
        }
      }, [dispatch,error,alert,navigate,isupdated,user])
      

  return (
    <Fragment>
        {
            loading?<Loader/>:(
                <Fragment>
                    <Metdata title={"Update Profile"}/>
        <div className="updateprofilecontainer">
            <div className='updateprofilebox'>
                <h2 className='updateprofileheading'>Update Profile</h2>
            <form className='updateprofileform'  encType="multipart/form-data"
                onSubmit={updateprofilesubmit}>

                    <div className="updateprofilename">
                     <FaceIcon />
                     <input
                     type="text"
                     placeholder="Name"
                     required
                     name="name"
                     value={name}
                     onChange={(e)=>setname(e.target.value)}
                     />
                    </div>

                    <div className="updateprofileemail">
                    <MailOutlineIcon />
                    <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                  />
                </div>

                <div id="updateprofileimage">
                  <img src={avatarpreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateprofiledatachange}
                  />
                </div>

                <input type="submit" value="Update" className="updateprofilebtn" />
                </form>

            </div>
        </div>
        </Fragment>
            )
        }
    </Fragment>
  )
}

export default UpdateProfile