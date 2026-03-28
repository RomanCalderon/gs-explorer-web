import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../Signin/Signin.css'
import BackgroundFog from '../../components/Backgrounds/BackgroundFog'
import { UserAuth } from '../../context/AuthContext'

const UpdatePassword = () => {
  const auth = UserAuth()!
  const { session, isAuthLoading, isPasswordRecovery, updatePassword } = auth
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    update: '',
  })
  const [loading, setLoading] = useState(false)

  const validatePasswords = () => {
    const next = { ...errors, password: '', confirmPassword: '' }
    let isValid = true

    if (formData.password.length < 8) {
      next.password = 'Password must be at least 8 characters long'
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      next.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(next)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePasswords()) return

    setErrors((prev) => ({ ...prev, update: '' }))
    setLoading(true)
    try {
      const result = await updatePassword(formData.password)
      if (result.isErr()) {
        setErrors((prev) => ({ ...prev, update: result.error.message }))
        return
      }
      navigate('/signin', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'password' || name === 'confirmPassword') {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (errors.update) {
      setErrors((prev) => ({ ...prev, update: '' }))
    }
  }

  if (isAuthLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Checking session...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <>
        <BackgroundFog highlightColor="#ff00ff" midtoneColor="#00ffff" lowlightColor="#7fff00" baseColor="#000000" />
        <div className="signin-container">
          <Link to="/" className="title">
            Gaussian Explorer
          </Link>
          <div className="content-section signin-form-container">
            <div className="signin-form">
              <h2 className="signin-title">Link invalid or expired</h2>
              <p className="signin-text" style={{ textAlign: 'center' }}>
                Open the reset link from your email, or request a new password reset.
              </p>
              <div className="signin-footer">
                <Link to="/forgot-password" className="signin-link">
                  Request a new link
                </Link>
                {' · '}
                <Link to="/signin" className="signin-link">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Updating password...</div>
      </div>
    )
  }

  return (
    <>
      <BackgroundFog highlightColor="#ff00ff" midtoneColor="#00ffff" lowlightColor="#7fff00" baseColor="#000000" />
      <div className="signin-container">
        <Link to="/" className="title">
          Gaussian Explorer
        </Link>
        <div className="content-section signin-form-container">
          <form onSubmit={handleSubmit} className="signin-form">
            <h2 className="signin-title">Choose a new password</h2>
            {!isPasswordRecovery && (
              <p className="signin-text" style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                You can update your password while signed in.
              </p>
            )}

            <div className="signin-form-group">
              <label htmlFor="password" className="signin-form-label">
                New password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className={`signin-form-input ${errors.password ? 'signin-form-input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="signin-error-message">{errors.password}</span>}
            </div>

            <div className="signin-form-group">
              <label htmlFor="confirmPassword" className="signin-form-label">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                className={`signin-form-input ${errors.confirmPassword ? 'signin-form-input-error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="signin-error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="signin-submit-button">
              Update password
            </button>
            {errors.update && <span className="signin-error-message">{errors.update}</span>}
          </form>

          <div className="signin-footer">
            <p className="signin-text">
              <Link to="/signin" className="signin-link">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword
