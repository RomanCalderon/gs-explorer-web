import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import './Signup.css'
import BackgroundFog from '../components/Backgrounds/BackgroundFog'
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    signup: ''
  })
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = UserAuth()!;
  const { signUp } = auth;

  const validatePasswords = () => {
    const newErrors = { ...errors }
    let isValid = true

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSignUp = async (e: React.FormEvent) => {
    if (!validatePasswords()) {
      console.log('Passwords do not match');
      return;
    }

    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    try {
      const result = await signUp(email, password);
      if (result.isErr()) {
        console.warn(result.error);
        setErrors(prev => ({
          ...prev,
          signup: result.error.message
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
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'password' || name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Signing up...</div>
      </div>
    )
  }

  return (
    <>
      <BackgroundFog highlightColor='#ff00ff' midtoneColor='#00ffff' lowlightColor='#7fff00' baseColor='#000000' />
      <div className="signup-container">
        <Link to="/" className="title">Gaussian Explorer</Link>
        <div className="content-section signup-form-container">
          <form onSubmit={handleSignUp} className="signup-form">
            <h2 className="signup-title">Let's get started</h2>

            <div className="signup-form-group">
              <label htmlFor="email" className="signup-form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="signup-form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="signup-form-group">
              <label htmlFor="password" className="signup-form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`signup-form-input ${errors.password ? 'signup-form-input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="signup-error-message">{errors.password}</span>}
            </div>

            <div className="signup-form-group">
              <label htmlFor="confirmPassword" className="signup-form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`signup-form-input ${errors.confirmPassword ? 'signup-form-input-error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="signup-error-message">{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              className="signup-submit-button"
            >
              Join for free
            </button>
            {errors.signup && <span className="signup-error-message">{errors.signup}</span>}
          </form>

          <div className="signup-footer">
            <p className="signup-text">
              Already have an account?{' '}
              <Link to="/signin" className="signup-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup