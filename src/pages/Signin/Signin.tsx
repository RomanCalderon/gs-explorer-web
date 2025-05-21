import { Link, useNavigate } from 'react-router-dom'
import './Signin.css'
import BackgroundFog from '../../components/Backgrounds/BackgroundFog'
import { UserAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Signin = () => {
  const auth = UserAuth()!;
  const { signIn } = auth;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    password: '',
    signin: ''
  })
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    try {
      const result = await signIn(email, password);
      if (result.isErr()) {
        console.error(result.error);
        setErrors(prev => ({
          ...prev,
          password: result.error.message
        }));
      }
      if (result.isOk()) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Signing in...</div>
      </div>
    )
  }

  return (
    <>
      <BackgroundFog highlightColor='#ff00ff' midtoneColor='#00ffff' lowlightColor='#7fff00' baseColor='#000000' />
      <div className="signin-container">
        <div className="content-section signin-form-container">
          <form onSubmit={handleSignIn} className="signin-form">
            <h2 className="signin-title">Welcome back</h2>

            <div className="signin-form-group">
              <label htmlFor="email" className="signin-form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="signin-form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="signin-form-group">
              <label htmlFor="password" className="signin-form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="signin-form-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="signin-submit-button"
            >
              Sign in
            </button>
            {errors.signin && <span className="signin-error-message">{errors.signin}</span>}
          </form>

          <div className="signin-footer">
            <p className="signin-text">
              Don't have an account?{' '}
              <Link to="/signup" className="signin-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin