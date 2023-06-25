import React, { Fragment ,useRef,useState ,useEffect} from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader"
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import {useDispatch,useSelector} from "react-redux";
import {clearerrors,login,register} from "../../actions/useraction";
import {useAlert} from "react-alert";

const LoginSignup = () => {

  const dispatch=useDispatch();
  const alert = useAlert();
  const {error, loading, isauthenticated} = useSelector(state=>state.user)
  
  const logintab= useRef(null);
  const registertab= useRef(null);
  const switchertab= useRef(null);

 const [loginemail, setloginemail] = useState("")
 const [loginpassword, setloginpassword] = useState("")

 const [user, setuser] = useState({name:"",email:"",password:""})
 const {name,email,password}= user;

 const [avatar, setavatar] = useState("/Profile.png");
const [avatarpreview, setavatarpreview] = useState("/Profile.png");


  const loginsubmit=(e)=>
  {
    e.preventDefault();
    dispatch(login(loginemail,loginpassword));
  }

  const registersubmit =(e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
   
    dispatch(register(myForm));
  }

  const registerdatachange=(e)=>{
    if(e.target.name==="avatar"){
        const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarpreview(reader.result);
          setavatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    else{
        setuser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const navigate = useNavigate();
  const location =useLocation();

  const redirect = location.search?location.search.split("=")[1] : "/account";
  
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearerrors());
    }
   
    if(isauthenticated){
      navigate(redirect);
    }

  }, [dispatch,error,alert,navigate,isauthenticated,redirect])
  
  const switchtab=(e,tab)=>{
    if(tab==="login"){
        switchertab.current.classList.add("shiftToNeutral");
        switchertab.current.classList.remove("shiftToRight");

        registertab.current.classList.remove("shiftToNeutralForm");
        logintab.current.classList.remove("shiftToLeft");
    }
    if(tab==="register"){
        switchertab.current.classList.add("shiftToRight");
        switchertab.current.classList.remove("shiftToNeutral");

        registertab.current.classList.add("shiftToNeutralForm");
        logintab.current.classList.add("shiftToLeft");
    }
  }

  return (
    <Fragment>
      {
        loading?<Loader/>:(
          <Fragment>
        <div className="loginsignupcontainer">
            <div className='loginsignupbox'>
                <div>
                    <div className='login_signup_toggle'>
                        <p onClick={(e)=>switchtab(e,"login")}>Login</p>
                        <p onClick={(e)=>switchtab(e,"register")}>Register</p>
                    </div>
                    <button ref={switchertab}></button>
                </div>

                <form className='loginform' ref={logintab} onSubmit={loginsubmit}>
                    <div className='loginemail'>
                        <MailOutlineIcon/>
                        <input
                        type='email'
                        placeholder='Email'
                        required
                        value={loginemail}
                        onChange={(e)=>setloginemail(e.target.value)}
                        />
                    </div>
                    <div className='loginpassword'>
                        <LockOpenIcon/>
                        <input
                        type='password'
                        placeholder='Password'
                        required
                        value={loginpassword}
                        onChange={(e)=>setloginpassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forgot">Forget Password</Link>
                    <input type='submit' value="Login" className='loginbtn'/>
                </form>

                <form className='signupform' ref={registertab} encType="multipart/form-data"
                onSubmit={registersubmit}>

                    <div className="signupname">
                     <FaceIcon />
                     <input
                     type="text"
                     placeholder="Name"
                     required
                     name="name"
                     value={name}
                     onChange={registerdatachange}
                     />
                    </div>

                    <div className="signupemail">
                    <MailOutlineIcon />
                    <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerdatachange}
                  />
                </div>

                <div className="signuppassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerdatachange}
                  />
                </div>

                <div id="registerimage">
                  <img src={avatarpreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerdatachange}
                  />
                </div>

                <input type="submit" value="Register" className="signupbtn" />
                </form>

            </div>
        </div>
    </Fragment>
        )
      }
    </Fragment>
  )
}

export default LoginSignup