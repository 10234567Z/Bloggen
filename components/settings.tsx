"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { storage } from "../utils/storage"

export function Settings() {
  const [apiKey, setApiKey] = useState("")

  useEffect(() => {
    const credentials = storage.getCredentials()
    if (credentials?.apiKey) {
      setApiKey(credentials.apiKey)
    }
  }, [])

  const handleSave = () => {
    storage.saveCredentials({ apiKey })
    alert("API key saved successfully!")
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">dev.to Settings</h2>
      <div className="space-y-2">
        <label className="text-sm text-gray-600">API Key</label>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your dev.to API key"
        />
      </div>
      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  )
}

