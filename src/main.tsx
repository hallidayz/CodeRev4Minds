/**
 * CodeRev4Minds - AI-Powered Code Review Automation Tool
 * 
 * PROPRIETARY SOFTWARE - AC MiNDS, LLC
 * Copyright (c) 2024 AC MiNDS, LLC. All rights reserved.
 * 
 * This software is proprietary and confidential. Unauthorized copying, 
 * distribution, or modification is strictly prohibited.
 * 
 * For licensing inquiries: legal@acminds.com
 * 
 * @file main.tsx
 * @description Application entry point
 * @author AC MiNDS, LLC
 * @version 1.0.0
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
