import { Link } from 'react-router-dom'
import './Signin.css'
import BackgroundFog from '../../components/Backgrounds/BackgroundFog'

const Signin = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement signin logic
  }

  return (
    <>
      <BackgroundFog highlightColor='#ff00ff' midtoneColor='#00ffff' lowlightColor='#7fff00' baseColor='#000000' />
      <div className="signin-container">
        <div className="content-section signin-form-container">
          <form onSubmit={handleSubmit} className="signin-form">
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
              />
            </div>

            <button
              type="submit"
              className="signin-submit-button"
            >
              Sign in
            </button>
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