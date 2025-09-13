// src/pages/Settings/Settings.jsx
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import Input from '../../components/ui/Input.jsx'
import { useToast } from '../../context/ToastContext.jsx'

const Settings = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('account')
  const [isLoading, setIsLoading] = useState(false)
  
  const [accountData, setAccountData] = useState({
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleAccountUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Account settings updated successfully!', {
        title: 'Settings Updated'
      })
    } catch (error) {
      toast.error('Failed to update account settings', {
        title: 'Update Failed'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'account'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  👤 Account Settings
                </button>
                <button
                  onClick={() => setActiveTab('restaurant')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'restaurant'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  🏪 Restaurant Settings
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'security'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  🔒 Security
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-8">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  
                  <form onSubmit={handleAccountUpdate} className="space-y-6">
                    <Input
                      label="Email Address"
                      type="email"
                      value={accountData.email}
                      onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                      disabled
                      helperText="Contact support to change your email address"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Current Password"
                        type="password"
                        value={accountData.currentPassword}
                        onChange={(e) => setAccountData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="New Password"
                        type="password"
                        value={accountData.newPassword}
                        onChange={(e) => setAccountData(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Enter new password"
                      />
                      
                      <Input
                        label="Confirm New Password"
                        type="password"
                        value={accountData.confirmPassword}
                        onChange={(e) => setAccountData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm new password"
                      />
                    </div>

                    <Button
                      type="submit"
                      loading={isLoading}
                      className="w-full md:w-auto"
                    >
                      Update Account
                    </Button>
                  </form>
                </div>
              )}

              {/* Restaurant Settings */}
              {activeTab === 'restaurant' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Restaurant Settings</h2>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏗️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-600 mb-6">Restaurant management features are under development.</p>
                    <Button onClick={() => navigate('/restaurant-setup')}>
                      Edit Restaurant Info
                    </Button>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-yellow-400 text-xl">⚠️</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Security Features
                          </h3>
                          <p className="mt-1 text-sm text-yellow-700">
                            Advanced security features like two-factor authentication are coming soon.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        onClick={logout}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Logout from All Devices
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
