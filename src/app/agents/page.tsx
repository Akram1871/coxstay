'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Loader } from 'lucide-react'

interface Agent {
  id: string
  name: string
  status: 'active' | 'inactive' | 'processing'
  tasks: number
  description: string
  createdAt: string
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAgents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulated data - replace with actual API call
        const mockAgents: Agent[] = [
          {
            id: '1',
            name: 'Copilot in VS Code',
            status: 'active',
            tasks: 42,
            description: 'AI-powered code completion and assistance in VS Code',
            createdAt: '2024-01-15',
          },
          {
            id: '2',
            name: 'GitHub Copilot Chat',
            status: 'active',
            tasks: 28,
            description: 'Interactive AI chat for coding help',
            createdAt: '2024-02-10',
          },
          {
            id: '3',
            name: 'Code Review Agent',
            status: 'processing',
            tasks: 15,
            description: 'Automated code review and suggestions',
            createdAt: '2024-03-05',
          },
        ]
        
        setAgents(mockAgents)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load agents')
      } finally {
        setLoading(false)
      }
    }

    loadAgents()
  }, [])

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 border-green-200'
      case 'processing':
        return 'bg-yellow-50 border-yellow-200'
      case 'inactive':
        return 'bg-gray-50 border-gray-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Loader className="w-5 h-5 text-yellow-600 animate-spin" />
      case 'inactive':
        return <AlertCircle className="w-5 h-5 text-gray-600" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: Agent['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agents</h1>
          <p className="text-lg text-gray-600">
            Manage and monitor your AI agents. View their status, tasks, and activity.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading agents...</p>
            </div>
          </div>
        ) : agents.length === 0 ? (
          // Empty State
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h2>
            <p className="text-gray-600">
              No agents are currently configured. Create one to get started.
            </p>
          </div>
        ) : (
          // Agents Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`border rounded-lg p-6 transition hover:shadow-lg ${getStatusColor(agent.status)}`}
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{agent.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">{agent.description}</p>
                  </div>
                  <div className="ml-4">
                    {getStatusIcon(agent.status)}
                  </div>
                </div>

                {/* Agent Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      agent.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : agent.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusLabel(agent.status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Active Tasks</span>
                    <span className="text-sm font-semibold text-gray-900">{agent.tasks}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Created</span>
                    <span className="text-sm text-gray-600">
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Agent Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition">
                    View Details
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded transition">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!loading && agents.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">Total Agents</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{agents.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">Active Agents</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {agents.filter((a) => a.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {agents.reduce((sum, a) => sum + a.tasks, 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
