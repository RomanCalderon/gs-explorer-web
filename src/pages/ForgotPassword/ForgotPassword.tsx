import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import '../Signin/Signin.css'
import BackgroundFog from '../../components/Backgrounds/BackgroundFog'
import { UserAuth } from '../../context/AuthContext'

const ForgotPassword = () => {
  const auth = UserAuth()!
  const { session, isAuthLoading, isPasswordRecovery, resetPasswordForEmail } = auth

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await resetPasswordForEmail(email)
      if (result.isErr()) {
        setError(result.error.message)
        return
      }
      setEmailSent(true)
    } finally {
      setLoading(false)
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

  if (session && isPasswordRecovery) {
    return <Navigate to="/update-password" replace />
  }

  if (session) {
    return <Navigate to="/" replace />
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Sending reset link...</div>
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
          {emailSent ? (
            <div className="signin-form">
              <h2 className="signin-title">Check your email</h2>
              <p className="signin-text" style={{ textAlign: 'center' }}>
                If an account exists for <strong>{email}</strong>, we sent a link to reset your password.
              </p>
              <div className="signin-footer">
                <Link to="/signin" className="signin-link">
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="signin-form">
                <h2 className="signin-title">Reset your password</h2>
                <p className="signin-text" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                  Enter your email and we&apos;ll send you a link to choose a new password.
                </p>

                <div className="signin-form-group">
                  <label htmlFor="email" className="signin-form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="signin-form-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                  />
                </div>

                <button type="submit" className="signin-submit-button">
                  Send reset link
                </button>
                {error && <span className="signin-error-message">{error}</span>}
              </form>

              <div className="signin-footer">
                <p className="signin-text">
                  <Link to="/signin" className="signin-link">
                    Back to sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
