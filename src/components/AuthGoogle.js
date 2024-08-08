import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from './GoogleButton';

const AuthGoogle = () => {
    const login = useGoogleLogin({
      onSuccess: codeResponse => console.log(codeResponse),
      flow: 'auth-code',
    });
  
    return (
      <GoogleButton onClick={() => login()}>
        Sign in with Google 🚀
      </GoogleButton>
    );
  };
  
  export default AuthGoogle;